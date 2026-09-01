import { isDatabaseConfigured, pingDatabase } from './db.js';

export default async function handler(req, res) {
  const startedAt = Date.now();

  if (req.method !== 'GET') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  let github = { status: 'unknown' };
  let database = { status: 'not_configured' };

  try {
    const response = await fetch('https://api.github.com/repos/pedroalmeidapeixoto/pedro-portfolio', {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'pedro-portfolio-health-check'
      }
    });

    github = response.ok
      ? { status: 'connected', httpStatus: response.status }
      : { status: 'degraded', httpStatus: response.status };
  } catch {
    github = { status: 'unavailable' };
  }

  if (isDatabaseConfigured()) {
    try {
      database = await pingDatabase();
    } catch (error) {
      database = {
        status: 'error',
        message: error instanceof Error ? error.message : 'Database connection failed'
      };
    }
  }

  const operational = database.status !== 'error';

  return res.status(operational ? 200 : 503).json({
    status: operational ? 'operational' : 'degraded',
    service: 'pedro-portfolio-api',
    timestamp: new Date().toISOString(),
    responseTime: Date.now() - startedAt,
    database,
    github
  });
}
