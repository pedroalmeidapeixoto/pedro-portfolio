import { isDatabaseConfigured, query } from '../db.js';

function getId(req) {
  const raw = req.query?.id ?? req.url?.split('?')[0].split('/').filter(Boolean).pop();
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function bodyOf(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  return {};
}

async function logRequest(method, endpoint, statusCode, latencyMs) {
  await query(
    `INSERT INTO portfolio_request_log (method, endpoint, status_code, latency_ms)
     VALUES ($1, $2, $3, $4)`,
    [method, endpoint, statusCode, latencyMs]
  );
}

export default async function handler(req, res) {
  const startedAt = Date.now();
  res.setHeader('Cache-Control', 'no-store');

  if (!['PATCH', 'DELETE', 'GET'].includes(req.method)) {
    res.setHeader('Allow', 'GET, PATCH, DELETE');
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  const id = getId(req);
  if (!id) return res.status(400).json({ status: 'error', message: 'Invalid project id' });

  if (!isDatabaseConfigured()) {
    return res.status(503).json({ status: 'degraded', message: 'Database not configured' });
  }

  try {
    if (req.method === 'GET') {
      const result = await query(
        `SELECT id, slug, name, description, updated_at FROM portfolio_projects WHERE id = $1`,
        [id]
      );
      const responseTime = Math.max(1, Date.now() - startedAt);
      const statusCode = result.rowCount ? 200 : 404;
      await logRequest('GET', `/api/projects/${id}`, statusCode, responseTime);
      if (!result.rowCount) return res.status(404).json({ status: 'error', message: 'Project not found' });
      return res.status(200).json({ status: 'operational', method: 'GET', endpoint: `/api/projects/${id}`, project: result.rows[0], responseTime, timestamp: new Date().toISOString() });
    }

    if (req.method === 'PATCH') {
      const body = bodyOf(req);
      const description = body.description == null ? 'Updated by live PATCH request' : String(body.description).slice(0, 2000);
      const name = body.name == null ? null : String(body.name).slice(0, 160);
      const result = await query(
        `UPDATE portfolio_projects
         SET name = COALESCE($2, name), description = $3, updated_at = NOW()
         WHERE id = $1
         RETURNING id, slug, name, description, updated_at`,
        [id, name, description]
      );
      const responseTime = Math.max(1, Date.now() - startedAt);
      const statusCode = result.rowCount ? 200 : 404;
      await logRequest('PATCH', `/api/projects/${id}`, statusCode, responseTime);
      if (!result.rowCount) return res.status(404).json({ status: 'error', message: 'Project not found' });
      return res.status(200).json({ status: 'operational', method: 'PATCH', endpoint: `/api/projects/${id}`, resource: 'projects', message: 'Updated', responseTime, project: result.rows[0], timestamp: new Date().toISOString() });
    }

    const result = await query('DELETE FROM portfolio_projects WHERE id = $1 RETURNING id', [id]);
    const responseTime = Math.max(1, Date.now() - startedAt);
    const statusCode = result.rowCount ? 204 : 404;
    await logRequest('DELETE', `/api/projects/${id}`, statusCode, responseTime);
    if (!result.rowCount) return res.status(404).json({ status: 'error', message: 'Project not found' });
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ status: 'error', method: req.method, endpoint: `/api/projects/${id}`, message: error instanceof Error ? error.message : 'Database operation failed', responseTime: Math.max(1, Date.now() - startedAt), timestamp: new Date().toISOString() });
  }
}
