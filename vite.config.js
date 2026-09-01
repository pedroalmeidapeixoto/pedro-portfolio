import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Local adapter for Vercel-style API handlers.
 *
 * The files in /api are written using the Vercel response API:
 *   res.status(code).json(body)
 *   res.status(code).end()
 *
 * Node's native ServerResponse does not provide those methods.
 * This adapter bridges the two APIs so the exact same handlers work:
 *   - locally through Vite
 *   - in production as Vercel serverless functions
 */
function createVercelResponse(nodeRes) {
  const response = {
    setHeader(name, value) {
      nodeRes.setHeader(name, value);
      return response;
    },

    status(code) {
      nodeRes.statusCode = code;
      return response;
    },

    json(body) {
      if (!nodeRes.headersSent) {
        nodeRes.setHeader('Content-Type', 'application/json; charset=utf-8');
      }
      nodeRes.end(JSON.stringify(body));
      return response;
    },

    end(body = '') {
      nodeRes.end(body);
      return response;
    }
  };

  return response;
}

function createLocalApi() {
  return {
    name: 'portfolio-local-api',

    async configureServer(server) {
      const [{ default: activityHandler }, { default: healthHandler }, { default: projectsHandler }, { default: projectByIdHandler }] =
        await Promise.all([
          import('./api/activity.js'),
          import('./api/health.js'),
          import('./api/projects.js'),
          import('./api/projects/[id].js')
        ]);

      server.middlewares.use('/api/activity', async (req, res) => {
        const response = createVercelResponse(res);

        try {
          await activityHandler(req, response);
        } catch (error) {
          if (!res.headersSent) {
            response.status(500).json({
              status: 'error',
              message:
                error instanceof Error
                  ? error.message
                  : 'Internal server error'
            });
          }
        }
      });

      async function withBody(req) {
        if (!['POST', 'PATCH', 'PUT'].includes(req.method) || req.body) return;
        const chunks = [];
        for await (const chunk of req) chunks.push(chunk);
        const raw = Buffer.concat(chunks).toString('utf8');
        req.body = raw ? JSON.parse(raw) : {};
      }

      server.middlewares.use('/api/projects', async (req, res) => {
        const response = createVercelResponse(res);
        try {
          await withBody(req);
          const isIdRoute = /^\/api\/projects\/[^/?]+/.test(req.url || '');
          await (isIdRoute ? projectByIdHandler(req, response) : projectsHandler(req, response));
        } catch (error) {
          if (!res.headersSent) response.status(500).json({ status: 'error', message: error instanceof Error ? error.message : 'Internal server error' });
        }
      });

      server.middlewares.use('/api/health', async (req, res) => {
        const response = createVercelResponse(res);

        try {
          await healthHandler(req, response);
        } catch (error) {
          if (!res.headersSent) {
            response.status(500).json({
              status: 'error',
              message:
                error instanceof Error
                  ? error.message
                  : 'Internal server error'
            });
          }
        }
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  // Vite only exposes VITE_* variables to client code. The API runs on
  // the Node side, so load the complete .env explicitly for DATABASE_URL.
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [react(), createLocalApi()]
  };
});
