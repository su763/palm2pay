import { Hono } from 'hono';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

import { db } from '../db';
import { logger } from '../utils/logger';
import { authenticate } from '../middleware/auth';
import { biometricService } from '../services/biometric';

const paymentRoutes = new Hono();

// Middleware for protected routes
paymentRoutes.use('/*', authenticate);

const paymentSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().default('USD'),
  merchantId: z.string(),
  locationId: z.string().optional(),
  description: z.string().optional(),
});

// Initiate payment
paymentRoutes.post('/initiate', async (c) => {
  try {
    const body = await c.req.json();
    const { amount, currency, merchantId, locationId, description } = body;

    const userId = c.get('userId');

    // Get user's default payment method
    const paymentMethod = await db.selectFrom('paymentMethods')
      .selectAll()
      .where('userId', '=', userId)
      .where('isDefault', '=', true)
      .executeTakeFirst();

    if (!paymentMethod) {
      return c.json({ error: 'No payment method available' }, 400);
    }

    const transactionId = uuidv4();

    // Create pending transaction
    await db.insertInto('transactions')
      .values({
        id: transactionId,
        userId,
        merchantId,
        locationId: locationId || null,
        amount,
        currency,
        status: 'pending',
        paymentMethodId: paymentMethod.id,
        biometricMatchScore: 0,
        description: description || null,
        createdAt: new Date(),
      })
      .execute();

    logger.info({ transactionId, userId, amount }, 'Payment initiated');

    return c.json({
      transactionId,
      status: 'pending_biometric',
      amount,
      currency,
      message: 'Please verify with palm scan',
    });
  } catch (error) {
    logger.error({ error }, 'Payment initiation error');
    return c.json({ error: 'Failed to initiate payment' }, 500);
  }
});

// Verify payment with biometric
paymentRoutes.post('/verify', async (c) => {
  try {
    const { transactionId, palmScanData } = await c.req.json();

    // Verify biometric match
    const biometricResult = await biometricService.verifyPalm(palmScanData);

    if (!biometricResult.match) {
      await db.updateTable('transactions')
        .where('id', '=', transactionId)
        .set({ status: 'failed' })
        .execute();

      return c.json({
        success: false,
        error: 'Biometric verification failed',
      }, 401);
    }

    const userId = biometricResult.userId;

    // Update transaction with biometric score
    await db.updateTable('transactions')
      .where('id', '=', transactionId)
      .set({
        status: 'completed',
        biometricMatchScore: biometricResult.score,
        processedAt: new Date(),
      })
      .execute();

    // Update palm template last used
    await db.updateTable('palmTemplates')
      .where('userId', '=', userId)
      .set({ lastUsedAt: new Date() })
      .execute();

    logger.info({ transactionId, userId, score: biometricResult.score }, 'Payment verified');

    return c.json({
      success: true,
      transactionId,
      status: 'completed',
      message: 'Payment successful',
    });
  } catch (error) {
    logger.error({ error }, 'Payment verification error');
    return c.json({ error: 'Verification failed' }, 500);
  }
});

// Get transaction history
paymentRoutes.get('/history', async (c) => {
  try {
    const userId = c.get('userId');
    const limit = parseInt(c.req.query('limit') || '20');
    const offset = parseInt(c.req.query('offset') || '0');

    const transactions = await db.selectFrom('transactions')
      .innerJoin('merchants', 'transactions.merchantId', 'merchants.id')
      .select([
        'transactions.id',
        'transactions.amount',
        'transactions.currency',
        'transactions.status',
        'transactions.description',
        'transactions.createdAt',
        'merchants.name as merchantName',
      ])
      .where('transactions.userId', '=', userId)
      .orderBy('transactions.createdAt desc')
      .limit(limit)
      .offset(offset)
      .execute();

    const total = await db.selectFrom('transactions')
      .select((eb) => eb.fn.count('id').as('count'))
      .where('userId', '=', userId)
      .executeTakeFirst();

    return c.json({
      transactions,
      pagination: {
        total: Number(total?.count) || 0,
        limit,
        offset,
      },
    });
  } catch (error) {
    logger.error({ error }, 'Transaction history error');
    return c.json({ error: 'Failed to fetch transactions' }, 500);
  }
});

// Get transaction by ID
paymentRoutes.get('/:id', async (c) => {
  try {
    const userId = c.get('userId');
    const transactionId = c.req.param('id');

    const transaction = await db.selectFrom('transactions')
      .innerJoin('merchants', 'transactions.merchantId', 'merchants.id')
      .selectAll('transactions')
      .select('merchants.name as merchantName')
      .where('transactions.id', '=', transactionId)
      .where('transactions.userId', '=', userId)
      .executeTakeFirst();

    if (!transaction) {
      return c.json({ error: 'Transaction not found' }, 404);
    }

    return c.json(transaction);
  } catch (error) {
    logger.error({ error }, 'Transaction fetch error');
    return c.json({ error: 'Failed to fetch transaction' }, 500);
  }
});

export { paymentRoutes };
