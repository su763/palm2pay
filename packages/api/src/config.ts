import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.string().transform(Number).default('4000'),
  DATABASE_URL: z.string(),
  REDIS_URL: z.string(),
  JWT_SECRET: z.string().min(32),
  ENCRYPTION_KEY: z.string().length(32),
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  AWS_REGION: z.string().default('us-east-1'),
  S3_BUCKET: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  BIOMETRIC_SERVICE_URL: z.string().default('http://localhost:8000'),
  BIOMETRIC_API_KEY: z.string(),
  WEB_APP_URL: z.string().default('http://localhost:3000'),
  MOBILE_APP_URL: z.string().default('http://localhost:3001'),
  MERCHANT_URL: z.string().default('http://localhost:3002'),
  LOG_LEVEL: z.string().default('info'),
});

type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ Invalid environment variables:');
    console.error(result.error.format());
    process.exit(1);
  }

  return result.data;
}

export const config = loadEnv();
export type Config = typeof config;
