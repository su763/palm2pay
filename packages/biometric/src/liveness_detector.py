"""
Liveness Detector
Detects whether a palm scan is from a live person or a spoof attempt
"""

import numpy as np
import cv2
from typing import Dict, Any, Optional, List, Tuple
from loguru import logger


class LivenessDetector:
    """
    Detects liveness in palm scans to prevent spoofing attacks.
    Uses multiple cues: texture analysis, motion, and sensor data.
    """

    def __init__(self):
        # Liveness thresholds
        self.texture_threshold = 0.3
        self.motion_threshold = 0.1
        self.temperature_min = 30.0  # Celsius
        self.temperature_max = 38.0
        self.pulse_min = 40  # BPM
        self.pulse_max = 200

        # Weights for different liveness cues
        self.weights = {
            "texture": 0.35,
            "motion": 0.25,
            "temperature": 0.20,
            "pulse": 0.20,
        }

    def detect(
        self,
        image: np.ndarray,
        sensor_data: Optional[Dict[str, float]] = None,
    ) -> Dict[str, Any]:
        """
        Perform liveness detection using multiple cues.

        Args:
            image: RGB numpy array of palm image
            sensor_data: Optional sensor data (temperature, pulse, etc.)

        Returns:
            Dictionary with liveness result and confidence
        """
        results = {}
        confidence_scores = []

        # 1. Texture-based liveness (detect printed/fake palms)
        texture_result = self._check_texture_liveness(image)
        results["texture"] = texture_result
        confidence_scores.append(texture_result["score"])

        # 2. Motion analysis (if multiple frames available)
        # For single image, use spatial analysis
        motion_result = self._check_spatial_variation(image)
        results["motion"] = motion_result
        confidence_scores.append(motion_result["score"])

        # 3. Temperature check (if sensor available)
        if sensor_data and "temperature" in sensor_data:
            temp_result = self._check_temperature(sensor_data["temperature"])
            results["temperature"] = temp_result
            confidence_scores.append(temp_result["score"])

        # 4. Pulse check (if sensor available)
        if sensor_data and "pulse" in sensor_data:
            pulse_result = self._check_pulse(sensor_data["pulse"])
            results["pulse"] = pulse_result
            confidence_scores.append(pulse_result["score"])

        # Calculate weighted confidence
        weights = self.weights.copy()

        # Adjust weights if some sensors are missing
        total_weight = sum(
            v for k, v in weights.items() if k in results
        )
        if total_weight > 0:
            weights = {k: v / total_weight for k, v in weights.items() if k in results}

        # Weighted average confidence
        final_confidence = sum(
            results[k]["score"] * weights[k] for k in results
        )

        # Determine liveness
        is_live = final_confidence >= 0.5

        logger.info(
            f"Liveness detection: is_live={is_live}, confidence={final_confidence:.3f}"
        )

        return {
            "is_live": is_live,
            "confidence": final_confidence,
            "details": results,
        }

    def _check_texture_liveness(self, image: np.ndarray) -> Dict[str, Any]:
        """
        Check texture features to detect printed/fake palms.
        Real skin has specific texture patterns that are hard to reproduce.
        """
        # Convert to grayscale
        if len(image.shape) == 3:
            gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
        else:
            gray = image

        # Calculate Local Binary Pattern (LBP) features
        lbp = self._local_binary_pattern(gray)

        # Calculate LBP histogram
        hist, _ = np.histogram(lbp.flatten(), bins=256, range=(0, 256))
        hist = hist.astype(float) / hist.sum()

        # Analyze histogram uniformity (fake palms tend to have more uniform texture)
        uniformity = np.sum(hist ** 2)

        # Real skin typically has uniformity in a specific range
        # Too uniform = printed image, not uniform enough = poor quality
        if 0.02 < uniformity < 0.15:
            score = 0.9
        elif 0.01 < uniformity < 0.2:
            score = 0.7
        else:
            score = 0.3

        # Additional check: variance in local regions
        local_variances = self._calculate_local_variances(gray)
        variance_score = self._score_variance(local_variances)

        # Combine scores
        final_score = (score + variance_score) / 2

        return {
            "passed": final_score >= 0.5,
            "score": final_score,
            "uniformity": uniformity,
        }

    def _local_binary_pattern(self, image: np.ndarray) -> np.ndarray:
        """
        Compute Local Binary Pattern for texture analysis.
        """
        rows, cols = image.shape
        lbp = np.zeros((rows - 2, cols - 2), dtype=np.uint8)

        for i in range(1, rows - 1):
            for j in range(1, cols - 1):
                center = image[i, j]
                code = 0

                # 8-neighbor LBP
                neighbors = [
                    image[i - 1, j - 1], image[i - 1, j], image[i - 1, j + 1],
                    image[i, j + 1], image[i + 1, j + 1], image[i + 1, j],
                    image[i + 1, j - 1], image[i, j - 1],
                ]

                for k, neighbor in enumerate(neighbors):
                    if neighbor >= center:
                        code |= (1 << k)

                lbp[i - 1, j - 1] = code

        return lbp

    def _calculate_local_variances(
        self, image: np.ndarray, block_size: int = 16
    ) -> List[float]:
        """Calculate variance in local blocks"""
        rows, cols = image.shape
        variances = []

        for i in range(0, rows - block_size, block_size):
            for j in range(0, cols - block_size, block_size):
                block = image[i : i + block_size, j : j + block_size]
                var = np.var(block)
                variances.append(var)

        return variances

    def _score_variance(self, variances: List[float]) -> float:
        """Score based on variance distribution"""
        if not variances:
            return 0.5

        mean_var = np.mean(variances)
        std_var = np.std(variances)

        # Real skin has characteristic variance patterns
        # Too low variance = smooth/fake, too high = noisy
        if 500 < mean_var < 5000 and std_var < mean_var:
            return 0.9
        elif 100 < mean_var < 10000:
            return 0.6
        else:
            return 0.3

    def _check_spatial_variation(self, image: np.ndarray) -> Dict[str, Any]:
        """
        Check spatial variation in the image.
        Real palms have natural variations in color and texture.
        """
        if len(image.shape) == 3:
            gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
        else:
            gray = image

        # Calculate gradient magnitude
        grad_x = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)
        grad_y = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3)
        grad_mag = np.sqrt(grad_x**2 + grad_y**2)

        # Analyze gradient distribution
        grad_mean = np.mean(grad_mag)
        grad_std = np.std(grad_mag)

        # Real palms have moderate gradients with natural variation
        if 5 < grad_mean < 50 and grad_std < grad_mean * 2:
            score = 0.85
        elif 2 < grad_mean < 100:
            score = 0.6
        else:
            score = 0.3

        return {
            "passed": score >= 0.5,
            "score": score,
            "gradient_mean": grad_mean,
            "gradient_std": grad_std,
        }

    def _check_temperature(self, temperature: float) -> Dict[str, Any]:
        """
        Check if temperature is within human skin range.
        """
        if self.temperature_min <= temperature <= self.temperature_max:
            # Calculate how close to optimal (35°C is typical skin temp)
            optimal = 35.0
            deviation = abs(temperature - optimal)
            score = max(0, 1 - deviation / 10)
            return {
                "passed": True,
                "score": score,
                "temperature": temperature,
            }
        else:
            return {
                "passed": False,
                "score": 0.1,
                "temperature": temperature,
                "reason": "Temperature out of range",
            }

    def _check_pulse(self, pulse: float) -> Dict[str, Any]:
        """
        Check if pulse is within human range.
        """
        if self.pulse_min <= pulse <= self.pulse_max:
            # Normal resting heart rate is 60-100 BPM
            if 50 <= pulse <= 110:
                score = 0.95
            else:
                score = 0.7
            return {
                "passed": True,
                "score": score,
                "pulse": pulse,
            }
        else:
            return {
                "passed": False,
                "score": 0.1,
                "pulse": pulse,
                "reason": "Pulse out of range",
            }

    def detect_from_video(
        self, frames: List[np.ndarray], sensor_data: Optional[Dict[str, float]] = None
    ) -> Dict[str, Any]:
        """
        Perform liveness detection using video frames.
        Can detect motion and micro-movements indicative of liveness.
        """
        if len(frames) < 2:
            return self.detect(frames[0] if frames else np.zeros((100, 100)), sensor_data)

        results = []
        for frame in frames:
            result = self.detect(frame, sensor_data)
            results.append(result)

        # Aggregate results
        avg_confidence = np.mean([r["confidence"] for r in results])
        all_live = all(r["is_live"] for r in results)

        # Check for motion between frames
        motion_score = self._check_motion(frames)

        # Final decision
        final_confidence = (avg_confidence + motion_score) / 2
        is_live = final_confidence >= 0.5 and all_live

        return {
            "is_live": is_live,
            "confidence": final_confidence,
            "frame_count": len(frames),
            "motion_detected": motion_score > 0.3,
        }

    def _check_motion(self, frames: List[np.ndarray]) -> float:
        """
        Check for natural motion between frames.
        Real hands have subtle micro-movements.
        """
        if len(frames) < 2:
            return 0.5

        motion_scores = []
        for i in range(1, len(frames)):
            prev = cv2.cvtColor(frames[i - 1], cv2.COLOR_RGB2GRAY)
            curr = cv2.cvtColor(frames[i], cv2.COLOR_RGB2GRAY)

            # Optical flow
            flow = cv2.calcOpticalFlowFarneback(
                prev, curr, None,
                pyr_scale=0.5, levels=3, winsize=15,
                iterations=3, poly_n=5, poly_sigma=1.2,
                flags=0,
            )

            motion_magnitude = np.sqrt(np.sum(flow ** 2))

            # Normalize motion score
            # Too much motion = suspicious, too little = static/fake
            if 100 < motion_magnitude < 10000:
                score = 0.9
            elif motion_magnitude < 50:
                score = 0.2  # Too static
            elif motion_magnitude > 50000:
                score = 0.3  # Too much motion
            else:
                score = 0.6

            motion_scores.append(score)

        return np.mean(motion_scores) if motion_scores else 0.5
