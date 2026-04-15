"""
Palm2Pay Biometric Service
Handles palm recognition, template generation, and liveness detection
"""

from fastapi import FastAPI, HTTPException, Security, Header
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
import numpy as np
import base64
import hashlib
import uuid
from datetime import datetime
import cv2
from PIL import Image
from io import BytesIO
from loguru import logger
import os

from palm_processor import PalmProcessor
from template_engine import TemplateEngine
from liveness_detector import LivenessDetector

# Configuration
API_KEY = os.getenv("BIOMETRIC_API_KEY", "dev-api-key-change-in-production")

app = FastAPI(
    title="Palm2Pay Biometric Service",
    description="Biometric palm recognition service for payment verification",
    version="1.0.0",
)

security = HTTPBearer()

# Initialize components
palm_processor = PalmProcessor()
template_engine = TemplateEngine()
liveness_detector = LivenessDetector()

# In-memory template store (use database in production)
template_store: Dict[str, Dict[str, Any]] = {}


def verify_api_key(credentials: HTTPAuthorizationCredentials = Security(security)) -> bool:
    """Verify API key from authorization header"""
    if credentials.credentials != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API key")
    return True


class ImageRequest(BaseModel):
    imageData: str = Field(..., description="Base64 encoded palm image")


class ImageWithSensorRequest(BaseModel):
    imageData: str = Field(..., description="Base64 encoded palm image")
    sensorData: Optional[Dict[str, float]] = Field(None, description="Sensor data for liveness")


class GenerateTemplateResponse(BaseModel):
    success: bool
    templateId: Optional[str] = None
    templateHash: Optional[str] = None
    templateData: Optional[List[float]] = None
    error: Optional[str] = None


class VerifyResponse(BaseModel):
    match: bool
    score: float
    userId: Optional[str] = None
    templateId: Optional[str] = None


class LivenessResponse(BaseModel):
    isLive: bool
    confidence: float
    details: Optional[Dict[str, Any]] = None


@app.get("/")
async def root():
    return {
        "service": "Palm2Pay Biometric Service",
        "version": "1.0.0",
        "status": "running",
    }


@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
    }


@app.post("/generate-template", response_model=GenerateTemplateResponse)
async def generate_template(
    request: ImageRequest,
    _=Security(verify_api_key),
):
    """
    Generate a biometric template from a palm image.
    This is used during user enrollment.
    """
    try:
        # Decode base64 image
        image_data = base64.b64decode(request.imageData)
        image = Image.open(BytesIO(image_data))
        image_array = np.array(image)

        # Convert to RGB if necessary
        if len(image_array.shape) == 2:
            image_array = cv2.cvtColor(image_array, cv2.COLOR_GRAY2RGB)
        elif image_array.shape[2] == 4:
            image_array = cv2.cvtColor(image_array, cv2.COLOR_RGBA2RGB)

        # Process palm image
        processed = palm_processor.process_image(image_array)

        if not processed["success"]:
            return GenerateTemplateResponse(
                success=False,
                error=processed.get("error", "Failed to process image"),
            )

        # Generate template
        template = template_engine.generate_template(processed["features"])

        # Create template hash for storage
        template_hash = hashlib.sha256(
            np.array(template).tobytes()
        ).hexdigest()

        template_id = str(uuid.uuid4())

        # Store template (in production, store in database)
        template_store[template_id] = {
            "template": template,
            "hash": template_hash,
            "created_at": datetime.utcnow().isoformat(),
        }

        logger.info(f"Generated template {template_id}")

        return GenerateTemplateResponse(
            success=True,
            templateId=template_id,
            templateHash=template_hash,
            templateData=[float(x) for x in template],
        )

    except Exception as e:
        logger.error(f"Template generation error: {e}")
        return GenerateTemplateResponse(
            success=False,
            error="Internal server error",
        )


@app.post("/verify", response_model=VerifyResponse)
async def verify_palm(
    request: ImageRequest,
    _=Security(verify_api_key),
):
    """
    Verify a palm scan against enrolled templates.
    Returns match result and user ID if matched.
    """
    try:
        # Decode base64 image
        image_data = base64.b64decode(request.imageData)
        image = Image.open(BytesIO(image_data))
        image_array = np.array(image)

        # Convert to RGB if necessary
        if len(image_array.shape) == 2:
            image_array = cv2.cvtColor(image_array, cv2.COLOR_GRAY2RGB)
        elif image_array.shape[2] == 4:
            image_array = cv2.cvtColor(image_array, cv2.COLOR_RGBA2RGB)

        # Process palm image
        processed = palm_processor.process_image(image_array)

        if not processed["success"]:
            return VerifyResponse(match=False, score=0.0)

        # Generate template for comparison
        scan_template = template_engine.generate_template(processed["features"])

        # Compare against all enrolled templates
        best_match = None
        best_score = 0.0

        for template_id, template_data in template_store.items():
            score = template_engine.compare_templates(
                scan_template,
                template_data["template"],
            )

            if score > best_score:
                best_score = score
                best_match = template_id

        # Threshold for match (adjust based on testing)
        MATCH_THRESHOLD = 0.85

        if best_score >= MATCH_THRESHOLD and best_match:
            logger.info(f"Match found: {best_match} with score {best_score}")
            return VerifyResponse(
                match=True,
                score=best_score,
                templateId=best_match,
                userId=best_match,  # In production, look up user from template
            )

        logger.info(f"No match found, best score: {best_score}")
        return VerifyResponse(match=False, score=best_score)

    except Exception as e:
        logger.error(f"Verification error: {e}")
        return VerifyResponse(match=False, score=0.0)


@app.post("/liveness", response_model=LivenessResponse)
async def check_liveness(
    request: ImageWithSensorRequest,
    _=Security(verify_api_key),
):
    """
    Perform liveness detection to prevent spoofing.
    """
    try:
        # Decode base64 image
        image_data = base64.b64decode(request.imageData)
        image = Image.open(BytesIO(image_data))
        image_array = np.array(image)

        # Check liveness
        liveness_result = liveness_detector.detect(
            image_array,
            request.sensorData,
        )

        logger.info(f"Liveness check: is_live={liveness_result['is_live']}, confidence={liveness_result['confidence']}")

        return LivenessResponse(
            isLive=liveness_result["is_live"],
            confidence=liveness_result["confidence"],
            details=liveness_result.get("details"),
        )

    except Exception as e:
        logger.error(f"Liveness check error: {e}")
        return LivenessResponse(isLive=False, confidence=0.0)


@app.post("/enroll")
async def enroll_user(
    request: dict,
    _=Security(verify_api_key),
):
    """
    Enroll a new user with their palm template.
    """
    try:
        user_id = request.get("userId")
        image_data = request.get("imageData")

        if not user_id or not image_data:
            raise HTTPException(status_code=400, detail="Missing userId or imageData")

        # Decode and process image
        decoded = base64.b64decode(image_data)
        image = Image.open(BytesIO(decoded))
        image_array = np.array(image)

        if len(image_array.shape) == 2:
            image_array = cv2.cvtColor(image_array, cv2.COLOR_GRAY2RGB)
        elif image_array.shape[2] == 4:
            image_array = cv2.cvtColor(image_array, cv2.COLOR_RGBA2RGB)

        processed = palm_processor.process_image(image_array)

        if not processed["success"]:
            raise HTTPException(status_code=400, detail=processed.get("error", "Failed to process image"))

        template = template_engine.generate_template(processed["features"])
        template_hash = hashlib.sha256(np.array(template).tobytes()).hexdigest()

        # Store with user ID
        template_id = str(uuid.uuid4())
        template_store[user_id] = {
            "template_id": template_id,
            "template": template,
            "hash": template_hash,
            "created_at": datetime.utcnow().isoformat(),
        }

        logger.info(f"Enrolled user {user_id} with template {template_id}")

        return {
            "success": True,
            "userId": user_id,
            "templateId": template_id,
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Enrollment error: {e}")
        raise HTTPException(status_code=500, detail="Enrollment failed")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
