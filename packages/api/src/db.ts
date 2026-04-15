import { Kysely, PostgresDialect, GeneratedAlways } from 'kysely';
import { Pool } from 'pg';
import { config } from './config';

// Database schema types
export interface Database {
  users: UsersTable;
  refreshTokens: RefreshTokensTable;
  palmTemplates: PalmTemplatesTable;
  paymentMethods: PaymentMethodsTable;
  transactions: TransactionsTable;
  merchants: MerchantsTable;
  merchantLocations: MerchantLocationsTable;
  sessions: SessionsTable;
}

interface UsersTable {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  phoneNumber: string | null;
  palmEnrolled: boolean;
  createdAt: GeneratedAlways<Date>;
  updatedAt: GeneratedAlways<Date>;
}

interface RefreshTokensTable {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: GeneratedAlways<Date>;
}

interface PalmTemplatesTable {
  id: string;
  userId: string;
  templateHash: string;
  templateData: Buffer;
  livenessVerified: boolean;
  enrolledAt: GeneratedAlways<Date>;
  lastUsedAt: Date | null;
}

interface PaymentMethodsTable {
  id: string;
  userId: string;
  type: 'card' | 'bank';
  last4: string;
  brand: string | null;
  expiryMonth: number | null;
  expiryYear: number | null;
  isDefault: boolean;
  stripePaymentMethodId: string;
  createdAt: GeneratedAlways<Date>;
}

interface TransactionsTable {
  id: string;
  userId: string;
  merchantId: string;
  locationId: string | null;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethodId: string;
  biometricMatchScore: number;
  description: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: GeneratedAlways<Date>;
  processedAt: Date | null;
}

interface MerchantsTable {
  id: string;
  name: string;
  businessType: string;
  stripeAccountId: string;
  isActive: boolean;
  settings: Record<string, unknown> | null;
  createdAt: GeneratedAlways<Date>;
  updatedAt: GeneratedAlways<Date>;
}

interface MerchantLocationsTable {
  id: string;
  merchantId: string;
  name: string;
  address: string | null;
  city: string | null;
  country: string | null;
  terminalId: string | null;
  isActive: boolean;
  createdAt: GeneratedAlways<Date>;
}

interface SessionsTable {
  id: string;
  userId: string;
  deviceInfo: string | null;
  ipAddress: string | null;
  expiresAt: Date;
  createdAt: GeneratedAlways<Date>;
}

// Create database connection
const pool = new Pool({
  connectionString: config.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const dialect = new PostgresDialect({
  pool,
});

export const db = new Kysely<Database>({
  dialect,
});

// Database initialization
export async function initializeDatabase() {
  try {
    // Check connection
    await db.selectFrom('users').select('id').executeTakeFirst();
    console.log('✅ Database connected');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
}
