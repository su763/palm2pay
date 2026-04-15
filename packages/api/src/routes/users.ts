import { Hono } from 'hono';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

import { db } from '../db';
import { logger } from '../utils/logger';
import { authenticate } from '../middleware/auth';

const userRoutes = new Hono();

// Middleware for protected routes
userRoutes.use('/*', authenticate);

const updateProfileSchema = z.object({
  fullName: z.string().min(2).optional(),
  phoneNumber: z.string().optional(),
});

const addPaymentMethodSchema = z.object({
  type: z.enum(['card', 'bank']),
  stripePaymentMethodId: z.string(),
  last4: z.string(),
  brand: z.string().optional(),
  expiryMonth: z.number().optional(),
  expiryYear: z.number().optional(),
  isDefault: z.boolean().optional(),
});

// Get current user profile
userRoutes.get('/me', async (c) => {
  try {
    const userId = c.get('userId');

    const user = await db.selectFrom('users')
      .select(['id', 'email', 'fullName', 'phoneNumber', 'palmEnrolled', 'createdAt'])
      .where('id', '=', userId)
      .executeTakeFirst();

    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }

    return c.json(user);
  } catch (error) {
    logger.error({ error }, 'Get profile error');
    return c.json({ error: 'Failed to fetch profile' }, 500);
  }
});

// Update user profile
userRoutes.patch('/me', async (c) => {
  try {
    const userId = c.get('userId');
    const { fullName, phoneNumber } = await c.req.json();

    const updateData: Record<string, string> = {};
    if (fullName !== undefined) updateData.fullName = fullName;
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;

    await db.updateTable('users')
      .where('id', '=', userId)
      .set(updateData)
      .execute();

    logger.info({ userId }, 'User profile updated');

    return c.json({ success: true, message: 'Profile updated' });
  } catch (error) {
    logger.error({ error }, 'Update profile error');
    return c.json({ error: 'Failed to update profile' }, 500);
  }
});

// Get payment methods
userRoutes.get('/me/payment-methods', async (c) => {
  try {
    const userId = c.get('userId');

    const methods = await db.selectFrom('paymentMethods')
      .select(['id', 'type', 'last4', 'brand', 'expiryMonth', 'expiryYear', 'isDefault', 'createdAt'])
      .where('userId', '=', userId)
      .orderBy('isDefault desc')
      .orderBy('createdAt desc')
      .execute();

    return c.json({ paymentMethods: methods });
  } catch (error) {
    logger.error({ error }, 'Get payment methods error');
    return c.json({ error: 'Failed to fetch payment methods' }, 500);
  }
});

// Add payment method
userRoutes.post('/me/payment-methods', async (c) => {
  try {
    const userId = c.get('userId');
    const { type, stripePaymentMethodId, last4, brand, expiryMonth, expiryYear, isDefault } = await c.req.json();

    // If this is default, unset other defaults
    if (isDefault) {
      await db.updateTable('paymentMethods')
        .where('userId', '=', userId)
        .set({ isDefault: false })
        .execute();
    }

    const paymentMethodId = uuidv4();

    await db.insertInto('paymentMethods')
      .values({
        id: paymentMethodId,
        userId,
        type,
        stripePaymentMethodId,
        last4,
        brand: brand || null,
        expiryMonth: expiryMonth || null,
        expiryYear: expiryYear || null,
        isDefault: isDefault || false,
        createdAt: new Date(),
      })
      .execute();

    logger.info({ userId, paymentMethodId }, 'Payment method added');

    return c.json({
      success: true,
      paymentMethod: {
        id: paymentMethodId,
        type,
        last4,
        brand,
        isDefault,
      },
    });
  } catch (error) {
    logger.error({ error }, 'Add payment method error');
    return c.json({ error: 'Failed to add payment method' }, 500);
  }
});

// Delete payment method
userRoutes.delete('/me/payment-methods/:id', async (c) => {
  try {
    const userId = c.get('userId');
    const paymentMethodId = c.req.param('id');

    await db.deleteFrom('paymentMethods')
      .where('id', '=', paymentMethodId)
      .where('userId', '=', userId)
      .execute();

    logger.info({ userId, paymentMethodId }, 'Payment method deleted');

    return c.json({ success: true, message: 'Payment method deleted' });
  } catch (error) {
    logger.error({ error }, 'Delete payment method error');
    return c.json({ error: 'Failed to delete payment method' }, 500);
  }
});

// Set default payment method
userRoutes.patch('/me/payment-methods/:id/default', async (c) => {
  try {
    const userId = c.get('userId');
    const paymentMethodId = c.req.param('id');

    // Unset all defaults first
    await db.updateTable('paymentMethods')
      .where('userId', '=', userId)
      .set({ isDefault: false })
      .execute();

    // Set new default
    await db.updateTable('paymentMethods')
      .where('id', '=', paymentMethodId)
      .where('userId', '=', userId)
      .set({ isDefault: true })
      .execute();

    return c.json({ success: true, message: 'Default payment method updated' });
  } catch (error) {
    logger.error({ error }, 'Set default payment method error');
    return c.json({ error: 'Failed to set default payment method' }, 500);
  }
});

export { userRoutes };
