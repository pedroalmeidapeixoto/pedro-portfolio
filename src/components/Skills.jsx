import React from 'react';

const iconMap = {
  'C#':'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg',
  '.NET':'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg',
  Java:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
  'Spring Boot':'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg',
  Node:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  'Node.js':'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  Express:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
  PostgreSQL:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  MySQL:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
  React:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  TypeScript:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
  JavaScript:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  HTML5:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
  CSS3:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
  Git:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
  GitHub:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
  Docker:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
  Maven:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/maven/maven-original.svg',
  Postman:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg',
  'IntelliJ IDEA':'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg',
  'VS Code':'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg'
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Skills({ t }) {
  const [health, setHealth] = React.useState({ state: 'checking' });
  const [lastCheck, setLastCheck] = React.useState(null);
  const [request, setRequest] = React.useState({ method: 'GET', path: '/api/projects', state: 'checking', count: 0 });
  const [activityCount, setActivityCount] = React.useState(0);

  const checkHealth = React.useCallback(async () => {
    const started = performance.now();
    try {
      const response = await fetch('/api/health', { cache: 'no-store' });
      const data = await response.json();
      const clientTime = Math.max(1, Math.round(performance.now() - started));
      setHealth({ ...data, state: response.ok ? 'online' : 'offline', clientTime });
      setLastCheck(new Date());
    } catch {
      setHealth({ state: 'offline' });
      setLastCheck(new Date());
    }
  }, []);

  const fetchActivity = React.useCallback(async () => {
    try {
      const response = await fetch('/api/activity', { cache: 'no-store' });
      if (!response.ok) return;
      const data = await response.json();
      setActivityCount(data.count || 0);
    } catch {
      // Activity is informational; the request monitor remains usable.
    }
  }, []);

  const runLiveCycle = React.useCallback(async () => {
    let createdId = null;
    let sequence = 0;

    const execute = async (method, url, options = {}, tone = method.toLowerCase()) => {
      sequence += 1;
      setRequest((current) => ({ ...current, method, path: url, endpoint: url, tone, state: 'checking', count: current.count + 1 }));
      const started = performance.now();

      try {
        const response = await fetch(url, { cache: 'no-store', ...options });
        const data = response.status === 204 ? {} : await response.json();
        const clientTime = Math.max(1, Math.round(performance.now() - started));
        setRequest((current) => ({
          ...current,
          method,
          path: url,
          endpoint: data.endpoint || url,
          code: response.status,
          message: data.message || (response.ok ? 'OK' : 'Request failed'),
          clientTime,
          state: response.ok ? 'online' : 'offline',
          sequence
        }));
        await fetchActivity();
        return { response, data };
      } catch {
        setRequest((current) => ({ ...current, method, path: url, endpoint: url, code: 'ERR', message: 'network error', clientTime: Math.max(1, Math.round(performance.now() - started)), state: 'offline', sequence }));
        return { response: null, data: null };
      }
    };

    const getResult = await execute('GET', '/api/projects', {}, 'get');
    await sleep(1200);

    const postResult = await execute('POST', '/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: `portfolio-live-${Date.now()}`,
        name: 'Portfolio Live Demo',
        description: 'Temporary record created by the live portfolio monitor'
      })
    }, 'post');
    createdId = postResult.data?.project?.id ?? null;
    await sleep(1200);

    if (createdId) {
      await execute('PATCH', `/api/projects/${createdId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: 'Record updated by the live PATCH request' })
      }, 'patch');
      await sleep(1200);

      await execute('GET', `/api/projects/${createdId}`, {}, 'get');
      await sleep(1200);

      await execute('DELETE', `/api/projects/${createdId}`, { method: 'DELETE' }, 'delete');
      await sleep(1000);
    } else {
      // If POST failed, keep the cycle alive with another real GET.
      await sleep(800);
      await execute('GET', '/api/projects', {}, 'get');
    }

    return getResult;
  }, [fetchActivity]);

  React.useEffect(() => {
    checkHealth();
    fetchActivity();
    const healthTimer = window.setInterval(checkHealth, 15000);
    const activityTimer = window.setInterval(fetchActivity, 5000);
    return () => {
      window.clearInterval(healthTimer);
      window.clearInterval(activityTimer);
    };
  }, [checkHealth, fetchActivity]);

  React.useEffect(() => {
    let cancelled = false;
    const loop = async () => {
      while (!cancelled) {
        await runLiveCycle();
        if (!cancelled) await sleep(2500);
      }
    };
    loop();
    return () => { cancelled = true; };
  }, [runLiveCycle]);

  const apiOnline = health.state === 'online';
  const databaseConfigured = health.database?.status === 'connected';
  const githubOnline = health.github?.status === 'connected';
  const statusLabel = apiOnline
    ? (t.architecture_status_online || 'operational')
    : health.state === 'checking'
      ? (t.architecture_status_checking || 'checking')
      : (t.architecture_status_offline || 'offline');
  const databaseLabel = databaseConfigured
    ? (t.architecture_db_configured || 'connected')
    : (t.architecture_db_not_configured || 'not connected');

  return (
    <section id="skills" className="soft-section">
      <div className="wrap">
        <div className="section-head reveal">
          <span>{t.skills_eyebrow}</span>
          <h2>{t.skills_title}</h2>
        </div>

        <div className="skills-grid">
          {t.skill_groups.map(([name, items], i) => (
            <article className="skill-group reveal" key={name}>
              <span className="skill-num">0{i + 1}</span>
              <div>
                <h3>{name}</h3>
                <div className="skill-list">
                  {items.map((x) => (
                    <span key={x}>{iconMap[x] && <img src={iconMap[x]} alt="" />}{x}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={`architecture reveal ${apiOnline ? 'architecture-online' : ''}`}>
          <div className="arch-labels"><span>CLIENT</span><span>API</span><span>BACKEND</span><span>DATABASE</span><span>STATUS</span></div>
          <div className="arch-flow">
            <b>web / mobile</b><i>→</i><b>REST</b><i>→</i><b>service layer</b><i>→</i><b>PostgreSQL</b>
            <em className={apiOnline ? 'online' : 'offline'}><span className="status-dot" /> {statusLabel}</em>
          </div>

          <div className="request-monitor">
            <div className="request-meta">
              <span className="live-indicator"><span /> LIVE TRAFFIC</span>
              <span>REQUEST #{String(request.count).padStart(2, '0')} · REAL CRUD · {activityCount} LOGS</span>
            </div>
            <div className="request-route">
              <strong className={`http-method ${request.tone || 'get'}`}>{request.method}</strong>
              <code>{request.endpoint || request.path}</code>
              <span className="request-code">{request.code || '—'}</span>
              <span className="request-latency">{request.clientTime ?? '—'}ms</span>
            </div>
            <div className="request-track"><span className={`request-packet ${request.state}`} /></div>
          </div>

          <div className="console-lines">
            <div className="live-line"><span>{'>'}</span> {request.method} {request.endpoint || request.path} {request.code || '—'} {request.message || 'waiting'} · {request.clientTime ?? '—'}ms</div>
            <div><span>{'>'}</span> GET /api/health {health.status === 'operational' ? '200 OK' : 'checking'} · {health.clientTime ?? health.responseTime ?? '—'}ms</div>
            <div><span>{'>'}</span> DATABASE PostgreSQL · {databaseLabel}</div>
            <div><span>{'>'}</span> GITHUB API · {githubOnline ? 'connected' : 'unavailable'}</div>
          </div>

          <div className="health-footer">
            <span>{t.architecture_live_label || 'LIVE HEALTH CHECK'} · 15s</span>
            <span>{lastCheck ? `${t.architecture_checked_at || 'checked'} ${lastCheck.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}` : t.architecture_checking || 'checking'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
