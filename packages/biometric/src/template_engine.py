"""
Template Engine
Handles biometric template generation and comparison
"""

import numpy as np
from typing import List, Optional
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from loguru import logger


class TemplateEngine:
    """
    Generates and compares biometric templates.
    Uses dimensionality reduction and normalization for robust matching.
    """

    def __init__(self, pca_components: int = 64):
        self.pca_components = pca_components
        self.scaler = StandardScaler()
        self.pca = PCA(n_components=pca_components)
        self.fitted = False

        # Matching thresholds
        self.match_threshold = 0.85
        self.high_confidence_threshold = 0.95

    def generate_template(self, features: np.ndarray) -> np.ndarray:
        """
        Generate a normalized biometric template from raw features.

        Args:
            features: Raw feature vector from image processing

        Returns:
            Normalized template vector
        """
        # Ensure 2D array
        if len(features.shape) == 1:
            features = features.reshape(1, -1)

        # Fit scaler on first use
        if not self.fitted:
            self.scaler.fit(features)
            self.fitted = True

        # Scale features
        scaled = self.scaler.transform(features)

        # Apply PCA for dimensionality reduction
        if self.fitted:
            # For PCA, we need to fit on accumulated data
            # In production, this would be fit on enrollment data
            template = scaled[0]  # Use scaled features directly for now
        else:
            template = scaled[0]

        # L2 normalize for cosine similarity
        norm = np.linalg.norm(template)
        if norm > 0:
            template = template / norm

        return template

    def compare_templates(
        self,
        template1: np.ndarray,
        template2: np.ndarray,
        method: str = "cosine",
    ) -> float:
        """
        Compare two biometric templates and return similarity score.

        Args:
            template1: First template (probe)
            template2: Second template (gallery)
            method: Comparison method ('cosine', 'euclidean', 'manhattan')

        Returns:
            Similarity score between 0 and 1
        """
        # Ensure 1D arrays
        if len(template1.shape) > 1:
            template1 = template1.flatten()
        if len(template2.shape) > 1:
            template2 = template2.flatten()

        # Check dimensions match
        if len(template1) != len(template2):
            logger.warning(
                f"Template dimension mismatch: {len(template1)} vs {len(template2)}"
            )
            # Pad shorter template with zeros
            max_len = max(len(template1), len(template2))
            t1_padded = np.zeros(max_len)
            t2_padded = np.zeros(max_len)
            t1_padded[: len(template1)] = template1
            t2_padded[: len(template2)] = template2
            template1 = t1_padded
            template2 = t2_padded

        if method == "cosine":
            return self._cosine_similarity(template1, template2)
        elif method == "euclidean":
            return self._euclidean_similarity(template1, template2)
        elif method == "manhattan":
            return self._manhattan_similarity(template1, template2)
        else:
            raise ValueError(f"Unknown comparison method: {method}")

    def _cosine_similarity(
        self, template1: np.ndarray, template2: np.ndarray
    ) -> float:
        """Calculate cosine similarity between templates"""
        dot_product = np.dot(template1, template2)
        norm1 = np.linalg.norm(template1)
        norm2 = np.linalg.norm(template2)

        if norm1 == 0 or norm2 == 0:
            return 0.0

        similarity = dot_product / (norm1 * norm2)

        # Normalize to 0-1 range (cosine similarity is -1 to 1)
        return (similarity + 1) / 2

    def _euclidean_similarity(
        self, template1: np.ndarray, template2: np.ndarray
    ) -> float:
        """Calculate similarity based on Euclidean distance"""
        distance = np.linalg.norm(template1 - template2)

        # Convert distance to similarity (inverse relationship)
        # Using sigmoid-like transformation
        similarity = 1 / (1 + distance)

        return similarity

    def _manhattan_similarity(
        self, template1: np.ndarray, template2: np.ndarray
    ) -> float:
        """Calculate similarity based on Manhattan distance"""
        distance = np.sum(np.abs(template1 - template2))

        # Convert distance to similarity
        similarity = 1 / (1 + distance)

        return similarity

    def is_match(self, score: float) -> bool:
        """Check if similarity score indicates a match"""
        return score >= self.match_threshold

    def is_high_confidence(self, score: float) -> bool:
        """Check if match is high confidence"""
        return score >= self.high_confidence_threshold

    def get_match_level(self, score: float) -> str:
        """Get descriptive match level"""
        if score >= self.high_confidence_threshold:
            return "high_confidence"
        elif score >= self.match_threshold:
            return "match"
        elif score >= 0.7:
            return "possible_match"
        else:
            return "no_match"

    def fuse_scores(
        self, scores: List[float], weights: Optional[List[float]] = None
    ) -> float:
        """
        Fuse multiple similarity scores into a single score.
        Useful for multi-sample or multi-feature matching.

        Args:
            scores: List of similarity scores
            weights: Optional weights for each score

        Returns:
            Fused similarity score
        """
        if not scores:
            return 0.0

        if weights is None:
            weights = [1.0] * len(scores)

        # Normalize weights
        total_weight = sum(weights)
        if total_weight == 0:
            return 0.0

        weights = [w / total_weight for w in weights]

        # Weighted average
        fused_score = sum(s * w for s, w in zip(scores, weights))

        return fused_score

    def adapt_threshold(self, historical_scores: List[float], target_far: float = 0.001):
        """
        Adapt match threshold based on historical scores to achieve target FAR.

        Args:
            historical_scores: List of impostor scores (non-matches)
            target_far: Target False Acceptance Rate
        """
        if not historical_scores:
            return

        # Set threshold at percentile corresponding to target FAR
        percentile = (1 - target_far) * 100
        self.match_threshold = np.percentile(historical_scores, percentile)

        logger.info(f"Adapted threshold to {self.match_threshold} for FAR={target_far}")
