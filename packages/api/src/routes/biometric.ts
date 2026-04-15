import { Hono } from 'hono';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

import { db } from '../db';
import { logger } from '../utils/logger';
import { authenticate } from '../middleware/auth';
import { biometricService } from '../services/biometric';

const biometricRoutes = new Hono();

// Middleware for protected routes
biometricRoutes.use('/*', authenticate);

const enrollSchema = z.object({
  palmImageData: z.string(), // Base64 encoded palm scan
  livenessData: z.object({
    temperature: z.number().optional(),
    pulse: z.number().optional(),
  }).optional(),
});

// Enroll palm biometric
biometricRoutes.post('/enroll', async (c) => {
  try {
    const userId = c.get('userId');
    const { palmImageData, livenessData } = await c.req.json();

    // Check if already enrolled
    const existing = await db.selectFrom('palmTemplates')
      .select('id')
      .where('userId', '=', userId)
      .executeTakeFirst();

    if (existing) {
      return c.json({ error: 'Palm already enrolled' }, 400);
    }

    // Process palm image and generate template
    const templateResult = await biometricService.generateTemplate(palmImageData);

    if (!templateResult.success) {
      return c.json({ error: 'Failed to process palm image', details: templateResult.error }, 400);
    }

    // Store palm template
    await db.insertInto('palmTemplates')
      .values({
        id: uuidv4(),
        userId,
        templateHash: templateResult.templateHash,
        templateData: Buffer.from(templateResult.templateData),
        livenessVerified: livenessData ? true : false,
        enrolledAt: new Date(),
      })
      .execute();

    // Update user palm enrollment status
    await db.updateTable('users')
      .where('id', '=', userId)
      .set({ palmEnrolled: true })
      .execute();

    logger.info({ userId }, 'User enrolled palm biometric');

    return c.json({
      success: true,
      message: 'Palm enrolled successfully',
      templateId: templateResult.templateId,
    });
  } catch (error) {
    logger.error({ error }, 'Palm enrollment error');
    return c.json({ error: 'Failed to enroll palm' }, 500);
  }
});

// Verify palm (for payment)
biometricRoutes.post('/verify', async (c) => {
  try {
    const { palmScanData } = await c.req.json();

    const result = await biometricService.verifyPalm(palmScanData);

    if (!result.match) {
      return c.json({
        success: false,
        match: false,
        score: result.score,
        error: 'No match found',
      });
    }

    return c.json({
      success: true,
      match: true,
      score: result.score,
      userId: result.userId,
    });
  } catch (error) {
    logger.error({ error }, 'Palm verification error');
    return c.json({ error: 'Verification failed' }, 500);
  }
});

// Check enrollment status
biometricRoutes.get('/status', async (c) => {
  try {
    const userId = c.get('userId');

    const template = await db.selectFrom('palmTemplates')
      .select(['id', 'enrolledAt', 'lastUsedAt', 'livenessVerified'])
      .where('userId', '=', userId)
      .executeTakeFirst();

    return c.json({
      enrolled: !!template,
      enrolledAt: template?.enrolledAt,
      lastUsedAt: template?.lastUsedAt,
      livenessVerified: template?.livenessVerified,
    });
  } catch (error) {
    logger.error({ error }, 'Enrollment status error');
    return c.json({ error: 'Failed to check status' }, 500);
  }
});

// Delete palm enrollment
biometricRoutes.delete('/enrollment', async (c) => {
  try {
    const userId = c.get('userId');

    await db.deleteFrom('palmTemplates')
      .where('userId', '=', userId)
      .execute();

    await db.updateTable('users')
      .where('id', '=', userId)
      .set({ palmEnrolled: false })
      .execute();

    logger.info({ userId }, 'User deleted palm enrollment');

    return c.json({ success: true, message: 'Palm enrollment deleted' });
  } catch (error) {
    logger.error({ error }, 'Delete enrollment error');
    return c.json({ error: 'Failed to delete enrollment' }, 500);
  }
});

export { biometricRoutes };
