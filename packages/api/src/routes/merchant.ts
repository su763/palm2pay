import { Hono } from 'hono';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

import { db } from '../db';
import { logger } from '../utils/logger';
import { authenticate } from '../middleware/auth';

const merchantRoutes = new Hono();

// Middleware for protected routes
merchantRoutes.use('/*', authenticate);

const createMerchantSchema = z.object({
  name: z.string().min(2),
  businessType: z.string(),
});

const createLocationSchema = z.object({
  name: z.string().min(2),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  terminalId: z.string().optional(),
});

const processPaymentSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().default('USD'),
  description: z.string().optional(),
  palmScanData: z.string(),
});

// Register as merchant
merchantRoutes.post('/register', async (c) => {
  try {
    const userId = c.get('userId');
    const { name, businessType } = await c.req.json();

    // Check if already a merchant
    const existing = await db.selectFrom('merchants')
      .select('id')
      .where('stripeAccountId', '=', userId) // Using userId as stripeAccountId reference
      .executeTakeFirst();

    if (existing) {
      return c.json({ error: 'Already registered as merchant' }, 400);
    }

    const merchantId = uuidv4();

    await db.insertInto('merchants')
      .values({
        id: merchantId,
        name,
        businessType,
        stripeAccountId: userId,
        isActive: true,
        createdAt: new Date(),
      })
      .execute();

    logger.info({ userId, merchantId }, 'Merchant registered');

    return c.json({
      success: true,
      merchant: {
        id: merchantId,
        name,
        businessType,
      },
    });
  } catch (error) {
    logger.error({ error }, 'Merchant registration error');
    return c.json({ error: 'Failed to register merchant' }, 500);
  }
});

// Add merchant location
merchantRoutes.post('/locations', async (c) => {
  try {
    const userId = c.get('userId');
    const { name, address, city, country, terminalId } = await c.req.json();

    // Get merchant ID
    const merchant = await db.selectFrom('merchants')
      .select('id')
      .where('stripeAccountId', '=', userId)
      .executeTakeFirst();

    if (!merchant) {
      return c.json({ error: 'Merchant not found' }, 404);
    }

    const locationId = uuidv4();

    await db.insertInto('merchantLocations')
      .values({
        id: locationId,
        merchantId: merchant.id,
        name,
        address: address || null,
        city: city || null,
        country: country || null,
        terminalId: terminalId || null,
        isActive: true,
        createdAt: new Date(),
      })
      .execute();

    logger.info({ merchantId: merchant.id, locationId }, 'Location added');

    return c.json({
      success: true,
      location: {
        id: locationId,
        name,
        address,
        city,
        country,
      },
    });
  } catch (error) {
    logger.error({ error }, 'Add location error');
    return c.json({ error: 'Failed to add location' }, 500);
  }
});

// Get merchant dashboard data
merchantRoutes.get('/dashboard', async (c) => {
  try {
    const userId = c.get('userId');

    const merchant = await db.selectFrom('merchants')
      .selectAll()
      .where('stripeAccountId', '=', userId)
      .executeTakeFirst();

    if (!merchant) {
      return c.json({ error: 'Merchant not found' }, 404);
    }

    // Get locations
    const locations = await db.selectFrom('merchantLocations')
      .selectAll()
      .where('merchantId', '=', merchant.id)
      .execute();

    // Get today's transactions
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const transactions = await db.selectFrom('transactions')
      .select(['id', 'amount', 'currency', 'status', 'createdAt'])
      .where('merchantId', '=', merchant.id)
      .where('createdAt', '>=', today)
      .orderBy('createdAt desc')
      .limit(50)
      .execute();

    // Calculate totals
    const totalToday = transactions
      .filter(t => t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);

    return c.json({
      merchant: {
        id: merchant.id,
        name: merchant.name,
        businessType: merchant.businessType,
        isActive: merchant.isActive,
      },
      locations,
      todayStats: {
        totalAmount: totalToday,
        transactionCount: transactions.length,
        completedCount: transactions.filter(t => t.status === 'completed').length,
        failedCount: transactions.filter(t => t.status === 'failed').length,
      },
      recentTransactions: transactions.slice(0, 10),
    });
  } catch (error) {
    logger.error({ error }, 'Dashboard error');
    return c.json({ error: 'Failed to fetch dashboard' }, 500);
  }
});

// Process payment (merchant side)
merchantRoutes.post('/process-payment', async (c) => {
  try {
    const userId = c.get('userId');
    const { amount, currency, description, palmScanData } = await c.req.json();

    // Get merchant
    const merchant = await db.selectFrom('merchants')
      .select('id')
      .where('stripeAccountId', '=', userId)
      .executeTakeFirst();

    if (!merchant) {
      return c.json({ error: 'Merchant not found' }, 404);
    }

    // Verify palm biometric
    const biometricResponse = await fetch(`${process.env.BIOMETRIC_SERVICE_URL}/api/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BIOMETRIC_API_KEY}`,
      },
      body: JSON.stringify({ palmScanData }),
    });

    const biometricResult = await biometricResponse.json();

    if (!biometricResult.success || !biometricResult.match) {
      return c.json({
        success: false,
        error: 'Biometric verification failed',
      }, 401);
    }

    const payerUserId = biometricResult.userId;

    // Get payer's default payment method
    const paymentMethod = await db.selectFrom('paymentMethods')
      .selectAll()
      .where('userId', '=', payerUserId)
      .where('isDefault', '=', true)
      .executeTakeFirst();

    if (!paymentMethod) {
      return c.json({ error: 'No payment method available for user' }, 400);
    }

    const transactionId = uuidv4();

    // Create transaction
    await db.insertInto('transactions')
      .values({
        id: transactionId,
        userId: payerUserId,
        merchantId: merchant.id,
        locationId: null,
        amount,
        currency,
        status: 'completed',
        paymentMethodId: paymentMethod.id,
        biometricMatchScore: biometricResult.score,
        description: description || null,
        createdAt: new Date(),
        processedAt: new Date(),
      })
      .execute();

    logger.info({ transactionId, amount, payerUserId }, 'Payment processed');

    return c.json({
      success: true,
      transactionId,
      message: 'Payment successful',
    });
  } catch (error) {
    logger.error({ error }, 'Process payment error');
    return c.json({ error: 'Failed to process payment' }, 500);
  }
});

// Get all locations
merchantRoutes.get('/locations', async (c) => {
  try {
    const userId = c.get('userId');

    const merchant = await db.selectFrom('merchants')
      .select('id')
      .where('stripeAccountId', '=', userId)
      .executeTakeFirst();

    if (!merchant) {
      return c.json({ error: 'Merchant not found' }, 404);
    }

    const locations = await db.selectFrom('merchantLocations')
      .selectAll()
      .where('merchantId', '=', merchant.id)
      .execute();

    return c.json({ locations });
  } catch (error) {
    logger.error({ error }, 'Get locations error');
    return c.json({ error: 'Failed to fetch locations' }, 500);
  }
});

export { merchantRoutes };
