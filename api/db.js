import pg from 'pg';

const { Pool } = pg;

let pool;

function getConnectionString() {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL;
}

export function isDatabaseConfigured() {
  return Boolean(getConnectionString());
}

export function getPool() {
  if (!isDatabaseConfigured()) return null;

  if (!pool) {
    pool = new Pool({
      connectionString: getConnectionString(),
      max: 3,
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 5000,
      ssl: { rejectUnauthorized: false }
    });
  }

  return pool;
}

export async function query(text, params = []) {
  const db = getPool();
  if (!db) throw new Error('DATABASE_URL is not configured');
  return db.query(text, params);
}

export async function pingDatabase() {
  const startedAt = Date.now();
  const result = await query('SELECT NOW() AS now');
  return {
    status: 'connected',
    responseTime: Math.max(1, Date.now() - startedAt),
    serverTime: result.rows[0]?.now
  };
}
