"""
Palm Image Processor
Handles preprocessing of palm images for feature extraction
"""

import numpy as np
import cv2
from typing import Dict, Any, List, Tuple
from loguru import logger


class PalmProcessor:
    """
    Processes palm images for biometric feature extraction.
    Handles normalization, enhancement, and region of interest detection.
    """

    def __init__(self):
        self.target_width = 512
        self.target_height = 512

    def process_image(self, image: np.ndarray) -> Dict[str, Any]:
        """
        Process a palm image and extract features.

        Args:
            image: RGB numpy array of the palm image

        Returns:
            Dictionary with success status and extracted features
        """
        try:
            # Step 1: Convert to grayscale
            gray = self._to_grayscale(image)

            # Step 2: Normalize lighting
            normalized = self._normalize_lighting(gray)

            # Step 3: Detect palm region and crop
            cropped, success = self._detect_and_crop_palm(normalized)

            if not success:
                return {"success": False, "error": "Could not detect palm region"}

            # Step 4: Enhance image
            enhanced = self._enhance_image(cropped)

            # Step 5: Resize to standard dimensions
            resized = cv2.resize(
                enhanced,
                (self.target_width, self.target_height),
                interpolation=cv2.INTER_CUBIC,
            )

            # Step 6: Extract features
            features = self._extract_features(resized)

            return {
                "success": True,
                "features": features,
                "processed_image": resized,
            }

        except Exception as e:
            logger.error(f"Image processing error: {e}")
            return {"success": False, "error": str(e)}

    def _to_grayscale(self, image: np.ndarray) -> np.ndarray:
        """Convert RGB image to grayscale"""
        if len(image.shape) == 3:
            return cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
        return image

    def _normalize_lighting(self, image: np.ndarray) -> np.ndarray:
        """
        Normalize lighting using CLAHE (Contrast Limited Adaptive Histogram Equalization)
        """
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        return clahe.apply(image)

    def _detect_and_crop_palm(
        self, image: np.ndarray
    ) -> Tuple[np.ndarray, bool]:
        """
        Detect palm region and crop to ROI.
        Uses contour detection to find the hand/palm area.
        """
        # Threshold to find hand region
        _, thresh = cv2.threshold(image, 50, 255, cv2.THRESH_BINARY)

        # Find contours
        contours, _ = cv2.findContours(
            thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
        )

        if not contours:
            return image, False

        # Find largest contour (assumed to be the hand)
        largest_contour = max(contours, key=cv2.contourArea)

        # Get bounding box
        x, y, w, h = cv2.boundingRect(largest_contour)

        # Add padding
        padding = 10
        x_start = max(0, x - padding)
        y_start = max(0, y - padding)
        x_end = min(image.shape[1], x + w + padding)
        y_end = min(image.shape[0], y + h + padding)

        # Crop to ROI
        cropped = image[y_start:y_end, x_start:x_end]

        # Check if crop is valid
        if cropped.shape[0] < 50 or cropped.shape[1] < 50:
            return image, False

        return cropped, True

    def _enhance_image(self, image: np.ndarray) -> np.ndarray:
        """
        Enhance image quality for better feature extraction.
        Applies denoising and edge enhancement.
        """
        # Denoise
        denoised = cv2.fastNlMeansDenoising(image, None, 10, 7, 21)

        # Sharpen
        kernel = np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]])
        sharpened = cv2.filter2D(denoised, -1, kernel)

        return sharpened

    def _extract_features(self, image: np.ndarray) -> np.ndarray:
        """
        Extract feature vector from processed palm image.
        Uses a combination of techniques:
        - Gabor filters for texture analysis
        - HOG for structural features
        - Statistical features
        """
        features = []

        # 1. Gabor filter responses (texture)
        gabor_features = self._gabor_features(image)
        features.extend(gabor_features)

        # 2. HOG features (structure)
        hog_features = self._hog_features(image)
        features.extend(hog_features)

        # 3. Statistical features
        stats = self._statistical_features(image)
        features.extend(stats)

        # 4. Palm line features
        line_features = self._palm_line_features(image)
        features.extend(line_features)

        return np.array(features, dtype=np.float32)

    def _gabor_features(self, image: np.ndarray) -> List[float]:
        """Extract Gabor filter features for texture analysis"""
        features = []
        scales = [2, 4, 8]
        orientations = [0, 45, 90, 135]

        for scale in scales:
            for orientation in orientations:
                theta = orientation * np.pi / 180
                gabor_kernel = cv2.getGaborKernel(
                    (21, 21),
                    sigma=scale,
                    theta=theta,
                    lambd=10.0,
                    gamma=0.5,
                    psi=0,
                    ktype=cv2.CV_32F,
                )
                filtered = cv2.filter2D(image, cv2.CV_32F, gabor_kernel)
                features.append(np.mean(filtered))
                features.append(np.std(filtered))

        return features

    def _hog_features(self, image: np.ndarray) -> List[float]:
        """Extract HOG (Histogram of Oriented Gradients) features"""
        # Simple HOG implementation
        gx = cv2.Sobel(image, cv2.CV_32F, 1, 0)
        gy = cv2.Sobel(image, cv2.CV_32F, 0, 1)

        magnitude = np.sqrt(gx**2 + gy**2)
        angle = np.arctan2(gy, gx) * 180 / np.pi

        # Create histogram with 9 bins
        histogram, _ = np.histogram(
            angle,
            bins=9,
            range=(0, 180),
            weights=magnitude,
        )

        # Normalize
        norm = np.linalg.norm(histogram)
        if norm > 0:
            histogram = histogram / norm

        return histogram.tolist()

    def _statistical_features(self, image: np.ndarray) -> List[float]:
        """Extract statistical features"""
        return [
            np.mean(image),
            np.std(image),
            np.var(image),
            np.min(image),
            np.max(image),
            np.median(image),
            self._skewness(image),
            self._kurtosis(image),
        ]

    def _skewness(self, data: np.ndarray) -> float:
        """Calculate skewness"""
        mean = np.mean(data)
        std = np.std(data)
        if std == 0:
            return 0
        return np.mean(((data - mean) / std) ** 3)

    def _kurtosis(self, data: np.ndarray) -> float:
        """Calculate kurtosis"""
        mean = np.mean(data)
        std = np.std(data)
        if std == 0:
            return 0
        return np.mean(((data - mean) / std) ** 4) - 3

    def _palm_line_features(self, image: np.ndarray) -> List[float]:
        """
        Extract palm line features (heart line, head line, life line).
        Uses edge detection and line fitting.
        """
        # Edge detection
        edges = cv2.Canny(image, 50, 150)

        # Find lines using Hough transform
        lines = cv2.HoughLinesP(
            edges,
            rho=1,
            theta=np.pi / 180,
            threshold=50,
            minLineLength=50,
            maxLineGap=10,
        )

        features = []

        if lines is not None:
            # Count lines in different regions
            height = image.shape[0]
            upper_lines = 0
            middle_lines = 0
            lower_lines = 0

            for line in lines:
                x1, y1, x2, y2 = line[0]
                avg_y = (y1 + y2) / 2

                if avg_y < height / 3:
                    upper_lines += 1
                elif avg_y < 2 * height / 3:
                    middle_lines += 1
                else:
                    lower_lines += 1

            features.extend([len(lines), upper_lines, middle_lines, lower_lines])

            # Average line angle
            angles = []
            for line in lines:
                x1, y1, x2, y2 = line[0]
                if x2 != x1:
                    angle = abs(np.arctan((y2 - y1) / (x2 - x1)) * 180 / np.pi)
                    angles.append(angle)
            features.append(np.mean(angles) if angles else 0)
        else:
            features.extend([0, 0, 0, 0, 0])

        return features
