import { isDatabaseConfigured, query } from './db.js';

async function ensureSchema() {
  await query(`
    CREATE TABLE IF NOT EXISTS portfolio_projects (
      id BIGSERIAL PRIMARY KEY,
      slug VARCHAR(120) UNIQUE NOT NULL,
      name VARCHAR(160) NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

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

async function logRequest(method, endpoint, statusCode, latencyMs) {
  await query(
    `INSERT INTO portfolio_request_log (method, endpoint, status_code, latency_ms)
     VALUES ($1, $2, $3, $4)`,
    [method, endpoint, statusCode, latencyMs]
  );
}

function bodyOf(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  return {};
}

export default async function handler(req, res) {
  const startedAt = Date.now();
  res.setHeader('Cache-Control', 'no-store');

  if (!['GET', 'POST'].includes(req.method)) {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  if (!isDatabaseConfigured()) {
    return res.status(503).json({ status: 'degraded', message: 'Database not configured' });
  }

  try {
    await ensureSchema();

    if (req.method === 'GET') {
      const result = await query(`
        SELECT id, slug, name, description, updated_at
        FROM portfolio_projects
        ORDER BY id DESC
        LIMIT 20
      `);
      const responseTime = Math.max(1, Date.now() - startedAt);
      await logRequest('GET', '/api/projects', 200, responseTime);

      return res.status(200).json({
        status: 'operational',
        method: 'GET',
        endpoint: '/api/projects',
        resource: 'projects',
        message: 'OK',
        responseTime,
        count: result.rowCount,
        projects: result.rows,
        timestamp: new Date().toISOString()
      });
    }

    const body = bodyOf(req);
    const slug = String(body.slug || `portfolio-demo-${Date.now()}`).slice(0, 120);
    const name = String(body.name || 'Portfolio Live Demo').slice(0, 160);
    const description = String(body.description || 'Real PostgreSQL CRUD demonstration').slice(0, 2000);

    const result = await query(
      `INSERT INTO portfolio_projects (slug, name, description)
       VALUES ($1, $2, $3)
       RETURNING id, slug, name, description, updated_at`,
      [slug, name, description]
    );

    const responseTime = Math.max(1, Date.now() - startedAt);
    await logRequest('POST', '/api/projects', 201, responseTime);

    return res.status(201).json({
      status: 'operational',
      method: 'POST',
      endpoint: '/api/projects',
      resource: 'projects',
      message: 'Created',
      responseTime,
      project: result.rows[0],
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      method: req.method,
      endpoint: '/api/projects',
      message: error instanceof Error ? error.message : 'Database operation failed',
      responseTime: Math.max(1, Date.now() - startedAt),
      timestamp: new Date().toISOString()
    });
  }
}
