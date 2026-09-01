import { isDatabaseConfigured, query } from './db.js';

async function ensureSchema() {
  await query(`
    CREATE TABLE IF NOT EXISTS portfolio_request_log (
      id BIGSERIAL PRIMARY KEY,
      method VARCHAR(10) NOT NULL,
      endpoint VARCHAR(180) NOT NULL,
      status_code INTEGER NOT NULL,
      latency_ms INTEGER NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

export default async function handler(req, res) {
  const startedAt = Date.now();
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  if (!isDatabaseConfigured()) {
    return res.status(503).json({ status: 'degraded', message: 'Database not configured' });
  }

  try {
    await ensureSchema();
    const result = await query(`
      SELECT id, method, endpoint, status_code AS "status", latency_ms AS "responseTime", created_at AS timestamp
      FROM portfolio_request_log
      ORDER BY id DESC
      LIMIT 12
    `);
    const responseTime = Math.max(1, Date.now() - startedAt);

    return res.status(200).json({
      status: 'operational',
      method: 'GET',
      endpoint: '/api/activity',
      resource: 'request_log',
      message: 'OK',
      responseTime,
      count: result.rowCount,
      activity: result.rows,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      method: 'GET',
      endpoint: '/api/activity',
      message: error instanceof Error ? error.message : 'Activity query failed',
      responseTime: Math.max(1, Date.now() - startedAt),
      timestamp: new Date().toISOString()
    });
  }
}
