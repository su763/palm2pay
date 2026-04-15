import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from 'hono/zod-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import { config } from '../config';
import { logger } from '../utils/logger';
import { db } from '../db';

const authRoutes = new Hono();

// Validation schemas
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  phoneNumber: z.string().optional(),
  fullName: z.string().min(2),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const refreshSchema = z.object({
  refreshToken: z.string(),
});

// JWT token generation
function generateTokens(userId: string) {
  const accessToken = jwt.sign(
    { userId, type: 'access' },
    config.JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { userId, type: 'refresh' },
    config.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
}

// Register new user
authRoutes.post('/register', zValidator('json', registerSchema), async (c) => {
  try {
    const { email, password, phoneNumber, fullName } = c.req.valid('json');

    // Check if user exists
    const existingUser = await db.selectFrom('users')
      .selectAll()
      .where('email', '=', email)
      .executeTakeFirst();

    if (existingUser) {
      return c.json({ error: 'Email already registered' }, 400);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);
    const userId = uuidv4();

    // Create user
    await db.insertInto('users')
      .values({
        id: userId,
        email,
        passwordHash,
        phoneNumber,
        fullName,
        createdAt: new Date(),
      })
      .execute();

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(userId);

    // Store refresh token
    await db.insertInto('refreshTokens')
      .values({
        id: uuidv4(),
        userId,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })
      .execute();

    logger.info({ userId, email }, 'User registered');

    return c.json({
      user: {
        id: userId,
        email,
        fullName,
        phoneNumber,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    logger.error({ error }, 'Registration error');
    return c.json({ error: 'Failed to register user' }, 500);
  }
});

// Login
authRoutes.post('/login', zValidator('json', loginSchema), async (c) => {
  try {
    const { email, password } = c.req.valid('json');

    const user = await db.selectFrom('users')
      .selectAll()
      .where('email', '=', email)
      .executeTakeFirst();

    if (!user) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    const { accessToken, refreshToken } = generateTokens(user.id);

    await db.insertInto('refreshTokens')
      .values({
        id: uuidv4(),
        userId: user.id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })
      .execute();

    logger.info({ userId: user.id, email }, 'User logged in');

    return c.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    logger.error({ error }, 'Login error');
    return c.json({ error: 'Failed to login' }, 500);
  }
});

// Refresh token
authRoutes.post('/refresh', zValidator('json', refreshSchema), async (c) => {
  try {
    const { refreshToken } = c.req.valid('json');

    const payload = jwt.verify(refreshToken, config.JWT_SECRET) as { userId: string };

    const token = await db.selectFrom('refreshTokens')
      .selectAll()
      .where('token', '=', refreshToken)
      .where('expiresAt', '>', new Date())
      .executeTakeFirst();

    if (!token) {
      return c.json({ error: 'Invalid refresh token' }, 401);
    }

    const newTokens = generateTokens(payload.userId);

    return c.json(newTokens);
  } catch (error) {
    logger.error({ error }, 'Token refresh error');
    return c.json({ error: 'Invalid refresh token' }, 401);
  }
});

// Logout
authRoutes.post('/logout', async (c) => {
  const refreshToken = c.req.header('Authorization')?.replace('Bearer ', '');

  if (refreshToken) {
    await db.deleteFrom('refreshTokens')
      .where('token', '=', refreshToken)
      .execute();
  }

  return c.json({ success: true });
});

export { authRoutes };
