import { Context, MiddlewareHandler } from 'hono';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { logger } from '../utils/logger';

declare module 'hono' {
  interface ContextVariableMap {
    userId: string;
    tokenType: string;
  }
}

export const authenticate: MiddlewareHandler = async (c, next) => {
  try {
    const authHeader = c.req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Missing or invalid authorization header' }, 401);
    }

    const token = authHeader.substring(7);

    const payload = jwt.verify(token, config.JWT_SECRET) as {
      userId: string;
      type: string;
      iat: number;
      exp: number;
    };

    if (payload.type !== 'access') {
      return c.json({ error: 'Invalid token type' }, 401);
    }

    c.set('userId', payload.userId);
    c.set('tokenType', payload.type);

    await next();
  } catch (error) {
    logger.warn({ error }, 'Authentication failed');

    if (error instanceof jwt.TokenExpiredError) {
      return c.json({ error: 'Token expired' }, 401);
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return c.json({ error: 'Invalid token' }, 401);
    }

    return c.json({ error: 'Authentication failed' }, 401);
  }
};

// Optional authentication - doesn't fail if no token
export const optionalAuth: MiddlewareHandler = async (c, next) => {
  try {
    const authHeader = c.req.header('Authorization');

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const payload = jwt.verify(token, config.JWT_SECRET) as { userId: string; type: string };

      if (payload.type === 'access') {
        c.set('userId', payload.userId);
        c.set('tokenType', payload.type);
      }
    }
  } catch (error) {
    // Silently fail - optional auth
    logger.debug({ error }, 'Optional auth failed');
  }

  await next();
};

// Admin-only authentication
export const requireAdmin: MiddlewareHandler = async (c, next) => {
  await authenticate(c, next);

  const userId = c.get('userId');

  // TODO: Check if user has admin role
  const isAdmin = false; // Placeholder

  if (!isAdmin) {
    return c.json({ error: 'Admin access required' }, 403);
  }

  await next();
};
