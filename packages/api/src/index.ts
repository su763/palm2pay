import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { errorHandler } from 'hono/error-handler';
import helmet from 'hono/helmet';

import { authRoutes } from './routes/auth';
import { userRoutes } from './routes/users';
import { paymentRoutes } from './routes/payments';
import { biometricRoutes } from './routes/biometric';
import { merchantRoutes } from './routes/merchant';
import { healthRoutes } from './routes/health';

import { config } from './config';
import { logger as pinoLogger } from './utils/logger';

const app = new Hono();

// Global middleware
app.use('*', logger());
app.use('*', cors({
  origin: [config.webAppUrl, config.mobileAppUrl, config.merchantUrl],
  credentials: true,
}));
app.use('*', helmet());

// Error handling
app.onError((err, c) => {
  pinoLogger.error({ err }, 'Unhandled error');
  return c.json({ error: 'Internal server error' }, 500);
});

// Routes
app.route('/api', healthRoutes);
app.route('/api/auth', authRoutes);
app.route('/api/users', userRoutes);
app.route('/api/payments', paymentRoutes);
app.route('/api/biometric', biometricRoutes);
app.route('/api/merchant', merchantRoutes);

// Root endpoint
app.get('/', (c) => {
  return c.json({
    name: 'Palm2Pay API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
  });
});

// Start server
const port = config.port;
pinoLogger.info(`🚀 Palm2Pay API server starting on port ${port}`);

serve({
  fetch: app.fetch,
  port,
}, (info) => {
  pinoLogger.info(`✅ Server ready at http://localhost:${info.port}`);
});

export default app;
