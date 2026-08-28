import React from 'react';

const medTags = [
  'React 18',
  'TypeScript',
  'Node.js',
  'Express 5',
  'PostgreSQL',
  'Drizzle ORM',
  'JWT',
  'Tailwind CSS',
];

const libraryTags = [
  'Java 17',
  'Spring Boot',
  'JPA / Hibernate',
  'PostgreSQL',
  'PL/pgSQL',
  'Maven',
  'JUnit 5',
  'Postman',
];

function ProjectCard({
  number,
  title,
  badge,
  description,
  t,
  problem,
  solution,
  tags,
  specs,
  details,
  terminal,
  github,
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="project-feature glass-panel reveal">
      <div className="project-visual">
        <div className="project-terminal">
          <div className="pt-head">
            <span>{terminal.name}</span>

            <span className="live-dot">
              ● {terminal.status}
            </span>
          </div>

          {terminal.lines.map((line) => (
            <div className="pt-line" key={line.path}>
              <span className={line.cls}>
                {line.method}
              </span>{' '}

              {line.path} <b>{line.code}</b>
            </div>
          ))}

          <div className="pt-divider"></div>

          <div className="pt-json">
            {terminal.json.map((line) => (
              <React.Fragment key={line}>
                <span>{line}</span>
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="architecture-strip">
          <span>{terminal.arch[0]}</span>
          <i>→</i>

          <span>{terminal.arch[1]}</span>
          <i>→</i>

          <span>{terminal.arch[2]}</span>
          <i>→</i>

          <span>{terminal.arch[3]}</span>
        </div>
      </div>

      <div className="project-content">
        <div className="project-head">
          <div>
            <span className="project-number">
              {number} / CASE STUDY
            </span>

            <h3>{title}</h3>
          </div>

          <span className="real-badge">
            {badge}
          </span>
        </div>

        <p className="project-desc">
          {description}
        </p>

        <div className="case-grid">
          <div>
            <span className="case-label">
              {t.case_problem}
            </span>

            <p>{problem}</p>
          </div>

          <div>
            <span className="case-label">
              {t.case_solution}
            </span>

            <p>{solution}</p>
          </div>
        </div>

        <div className="project-tags">
          {tags.map((tag) => (
            <span
              className="project-tag"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="project-specs">
          {specs.map(([key, value]) => (
            <div className="spec" key={key}>
              <span className="k">
                {key}
              </span>

              <span className="v">
                {value}
              </span>
            </div>
          ))}
        </div>

        <button
          className={`project-toggle ${open ? 'open' : ''}`}
          onClick={() => setOpen((value) => !value)}
        >
          <span>
            {open
              ? t.toggle_hide
              : t.toggle_explore}
          </span>

          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        <div
          className={`project-details ${
            open ? 'open' : ''
          }`}
        >
          <span className="label">
            {t.details_label}
          </span>

          <span>{details}</span>
        </div>

        <div className="project-actions">
          <a
            className="project-btn primary"
            href={github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>

          <button
            className="project-btn"
            onClick={() =>
              document
                .getElementById('contato')
                ?.scrollIntoView({
                  behavior: 'smooth',
                })
            }
          >
            {t.btn_discuss}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ t }) {
  const commonTerminal = (
    name,
    status,
    lines,
    json,
    arch
  ) => ({
    name,
    status,
    lines,
    json,
    arch,
  });

  return (
    <section id="projetos">
      <div className="wrap">
        <div className="sec-heading reveal">
          <span className="sec-eyebrow">
            {t.projects_eyebrow}
          </span>

          <h2>
            {t.projects_title}
          </h2>

          <p className="section-intro">
            {t.projects_intro}
          </p>
        </div>

        {/* =========================
            PROJECT 01 - MEDRECORD
        ========================== */}

        <ProjectCard
          number="01"
          title="MedRecord"
          badge={t.real_badge}
          description={t.proj_medrecord_desc}
          t={t}
          problem={t.case_problem_text}
          solution={t.case_solution_text}
          tags={medTags}
          specs={[
            [t.spec_arch, 'Multi-tenant'],
            ['Auth', 'JWT + RBAC'],
            [
              t.spec_encryption,
              'AES-256-GCM',
            ],
          ]}
          details={t.proj_medrecord_details}
          github="https://github.com/pedroalmeidapeixoto/MedRecord"
          terminal={commonTerminal(
            'medrecord-api',
            'LIVE',
            [
              {
                method: 'POST',
                path: '/api/v1/auth/login',
                code: '200',
                cls: 'green',
              },
              {
                method: 'GET',
                path: '/api/v1/patients',
                code: '200',
                cls: 'blue',
              },
              {
                method: 'POST',
                path: '/api/v1/appointments',
                code: '201',
                cls: 'orange',
              },
              {
                method: 'GET',
                path: '/api/v1/audit-log',
                code: '200',
                cls: 'purple',
              },
            ],
            [
              '{',
              '  "tenant": "clinic_north",',
              '  "auth": "JWT + RBAC",',
              '  "audit": true',
              '}',
            ],
            [
              'CLIENT',
              'API',
              'DOMAIN',
              'POSTGRES',
            ]
          )}
        />

        {/* =========================
            PROJECT 02 - LIBRARY API
        ========================== */}

        <ProjectCard
          number="02"
          title="Library Management API"
          badge="Backend project"
          description="REST API for managing users, books, physical copies and loans, built with Java and Spring Boot with PostgreSQL persistence and database-side business logic."
          t={t}
          problem="Model library operations with clear relationships between users, books, physical copies and loans while enforcing business rules."
          solution="A layered Spring Boot API with JPA/Hibernate persistence, PostgreSQL procedures for loan return and fine calculation, validation and automated tests."
          tags={libraryTags}
          specs={[
            [
              t.spec_arch,
              'Layered architecture',
            ],
            [
              'Persistence',
              'JPA / Hibernate',
            ],
            [
              'Database logic',
              'PL/pgSQL',
            ],
          ]}
          details="Java 17 and Spring Boot 3.3.2 backend using JPA/Hibernate and PostgreSQL. The project separates controller, service, repository, DTO and entity responsibilities, and uses PL/pgSQL for database-side loan-return and fine-calculation logic. Validation and tests cover core API behavior."
          github="https://github.com/pedroalmeidapeixoto/library-management-api"
          terminal={commonTerminal(
            'library-api',
            'READY',
            [
              {
                method: 'POST',
                path: '/api/v1/auth/login',
                code: '200',
                cls: 'green',
              },
              {
                method: 'GET',
                path: '/api/v1/books',
                code: '200',
                cls: 'blue',
              },
              {
                method: 'POST',
                path: '/api/v1/loans',
                code: '201',
                cls: 'orange',
              },
              {
                method: 'POST',
                path: '/api/v1/loans/return',
                code: '200',
                cls: 'purple',
              },
            ],
            [
              '{',
              '  "database": "PostgreSQL",',
              '  "orm": "JPA / Hibernate",',
              '  "business_logic": "PL/pgSQL"',
              '}',
            ],
            [
              'CLIENT',
              'API',
              'SERVICE',
              'POSTGRES',
            ]
          )}
        />

        {/* =========================
            PROJECT 03 - FUTURE C#/.NET
        ========================== */}

        <div className="next-project-grid reveal">
          <div className="placeholder">
            <span className="placeholder-index">
              03
            </span>

            <span className="ph-title">
              {t.placeholder_title}
            </span>

            <span className="ph-sub">
              {t.placeholder_sub}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}