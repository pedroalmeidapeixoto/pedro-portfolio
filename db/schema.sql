-- Pedro Portfolio - PostgreSQL schema
-- The API also creates these tables automatically on the first live request.

CREATE TABLE IF NOT EXISTS portfolio_profile (
  id INTEGER PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  role VARCHAR(160) NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS portfolio_projects (
  id BIGSERIAL PRIMARY KEY,
  slug VARCHAR(120) UNIQUE NOT NULL,
  name VARCHAR(160) NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS portfolio_demo_sessions (
  id INTEGER PRIMARY KEY,
  active BOOLEAN NOT NULL DEFAULT TRUE,
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
