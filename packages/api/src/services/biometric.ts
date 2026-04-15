import { config } from '../config';
import { logger } from '../utils/logger';

interface BiometricTemplate {
  templateId: string;
  templateHash: string;
  templateData: number[];
}

interface VerifyResult {
  match: boolean;
  score: number;
  userId?: string;
}

interface GenerateTemplateResult {
  success: boolean;
  templateId?: string;
  templateHash?: string;
  templateData?: number[];
  error?: string;
}

class BiometricService {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = config.BIOMETRIC_SERVICE_URL;
    this.apiKey = config.BIOMETRIC_API_KEY;
  }

  /**
   * Generate a biometric template from palm image data
   * @param base64ImageData - Base64 encoded palm scan image
   */
  async generateTemplate(base64ImageData: string): Promise<GenerateTemplateResult> {
    try {
      const response = await fetch(`${this.baseUrl}/generate-template`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          imageData: base64ImageData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.error || 'Failed to generate template',
        };
      }

      const result = await response.json();

      return {
        success: true,
        templateId: result.templateId,
        templateHash: result.templateHash,
        templateData: result.templateData,
      };
    } catch (error) {
      logger.error({ error }, 'Biometric template generation failed');
      return {
        success: false,
        error: 'Biometric service unavailable',
      };
    }
  }

  /**
   * Verify a palm scan against enrolled templates
   * @param base64ImageData - Base64 encoded palm scan image
   */
  async verifyPalm(base64ImageData: string): Promise<VerifyResult> {
    try {
      const response = await fetch(`${this.baseUrl}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          imageData: base64ImageData,
        }),
      });

      if (!response.ok) {
        return {
          match: false,
          score: 0,
        };
      }

      const result = await response.json();

      return {
        match: result.match || false,
        score: result.score || 0,
        userId: result.userId,
      };
    } catch (error) {
      logger.error({ error }, 'Biometric verification failed');
      return {
        match: false,
        score: 0,
      };
    }
  }

  /**
   * Perform liveness detection
   * @param base64ImageData - Base64 encoded palm scan image
   * @param sensorData - Optional sensor data (temperature, pulse, etc.)
   */
  async checkLiveness(
    base64ImageData: string,
    sensorData?: { temperature?: number; pulse?: number }
  ): Promise<{ isLive: boolean; confidence: number }> {
    try {
      const response = await fetch(`${this.baseUrl}/liveness`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          imageData: base64ImageData,
          sensorData,
        }),
      });

      if (!response.ok) {
        return { isLive: false, confidence: 0 };
      }

      const result = await response.json();

      return {
        isLive: result.isLive || false,
        confidence: result.confidence || 0,
      };
    } catch (error) {
      logger.error({ error }, 'Liveness check failed');
      return { isLive: false, confidence: 0 };
    }
  }
}

export const biometricService = new BiometricService();
