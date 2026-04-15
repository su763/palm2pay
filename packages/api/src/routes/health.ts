import { Hono } from 'hono';

export const healthRoutes = new Hono();

healthRoutes.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

healthRoutes.get('/ready', (c) => {
  // TODO: Add database and Redis connectivity checks
  return c.json({
    status: 'ready',
    checks: {
      database: 'ok',
      redis: 'ok',
      biometric: 'ok',
    },
  });
});
