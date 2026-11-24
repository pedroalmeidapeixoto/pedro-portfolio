import React from 'react';
import { useRail } from '../hooks/useScrollFx';
import LibraryCover from './LibraryCover';
import medrecordCover from '../assets/medrecord-cover.webp';
import sevylhaCover from '../assets/sevylha-cover.webp';
import gymcoreCover from '../assets/gymcore-cover.webp';
import calladoCover from '../assets/callado-cover.webp';
import infformaCover from '../assets/infforma-cover.webp';

/** Covers that are screenshots; a project without one gets the cover drawn in code. */
const COVERS = {
  MedRecord: medrecordCover,
  GymCore: gymcoreCover,
  'Panificadora Sevylha': sevylhaCover,
  'Portal do Callado': calladoCover,
  Infforma: infformaCover
};

/** Covers whose subject sits on the left, so the narrow phone crop keeps it. */
const LEFT_COVERS = new Set(['Panificadora Sevylha', 'Portal do Callado']);

/** The layers each project is built in, taken from the descriptions of the projects themselves (a packet crosses them in the card). */
const FLOWS = {
  MedRecord: ['React', 'Express API', 'RBAC · audit', 'PostgreSQL'],
  'Library Management API': ['Controller', 'Service', 'Repository', 'PostgreSQL'],
  GymCore: ['Api', 'Application', 'Domain', 'PostgreSQL'],
  'Portal do Callado': ['WordPress', 'Newspaper', 'AdRotate', 'Site Kit'],
  Infforma: ['WordPress', 'Newspaper', 'Site Kit', 'RSS'],
  'Panificadora Sevylha': ['Cardápio', 'Pedido', 'OrderGateway', 'WhatsApp']
};

/** Marks the change of category on the rail: Back-end, Front-end, blogs. */
function CategoryDivider({ t, cat, count, number, total }) {
  const [title, text] = t.project_cats[cat];
  return (
    <div className="rail-cat" role="heading" aria-level={3}>
      <span className="rail-cat__no">{String(number).padStart(2, '0')}<i> / {String(total).padStart(2, '0')}</i></span>
      <strong>{title}</strong>
      <p>{text}</p>
      <span className="rail-cat__count">{count} {count === 1 ? t.project_one : t.project_many}</span>
    </div>
  );
}

/**
 * Projects as a pinned horizontal rail (the pinned rail of DJ Auto Center): while the section is pinned the scroll moves the row of
 * cards sideways. On narrow screens, and with reduced motion, it is a normal vertical list.
 */
export default function Projects({ t }) {
  const [open, setOpen] = React.useState(null);
  const section = React.useRef(null);
  const track = React.useRef(null);
  const railOn = useRail(section, track);
  const order = [...new Set(t.projects.map((p) => p.cat))];

  return (
    <section id="projetos" ref={section} className={`block projects${railOn ? ' projects--rail' : ''}`} data-block>
      <div className="rail-stage">
        <div className="rail-track" ref={track}>
          <div className="rail-intro">
            <div className="section-head reveal">
              <span>{t.projects_eyebrow}</span>
              <h2>{t.projects_title}</h2>
              <p>{t.projects_intro}</p>
            </div>
            <p className="rail-hint" aria-hidden="true">{t.projects_hint} →</p>
          </div>

          {t.projects.map((p, i) => (
            <React.Fragment key={p.name}>
            {p.cat !== t.projects[i - 1]?.cat && (
              <CategoryDivider t={t} cat={p.cat} count={t.projects.filter((x) => x.cat === p.cat).length} number={order.indexOf(p.cat) + 1} total={order.length} />
            )}
            <article className={`project-card${open === i ? ' is-open' : ''}`}>
              <div className="project-index">0{i + 1}</div>
              <div className="project-main">
                {(() => {
                  const art = COVERS[p.name] ? <img className={LEFT_COVERS.has(p.name) ? 'cover-left' : undefined} src={COVERS[p.name]} alt="" loading="lazy" /> : <LibraryCover />;
                  const href = p.live || p.url;
                  return href
                    ? <a className="project-cover" href={href} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true">{art}</a>
                    : <div className="project-cover" aria-hidden="true">{art}</div>;
                })()}
                <div className="project-top">
                  <div>
                    <span className="project-badge">{p.badge}</span>
                    <h3>{p.name}</h3>
                  </div>
                  {(p.live || p.url) && <a className="project-arrow" href={p.live || p.url} target="_blank" rel="noreferrer" aria-label={p.live ? t.project_live : t.project_open}>↗</a>}
                </div>
                <p className="project-desc">{p.desc}</p>

                <div className="collapse collapse--main"><div>
                  {FLOWS[p.name] && (
                    <div className="flow" aria-hidden="true">
                      {FLOWS[p.name].map((name) => <span key={name}>{name}</span>)}
                      <i className="flow__packet" />
                    </div>
                  )}

                  <div className="case-grid">
                    <div><small>{p.caseLabels?.[0] ?? t.problem}</small><p>{p.problem}</p></div>
                    <div><small>{p.caseLabels?.[1] ?? t.solution}</small><p>{p.solution}</p></div>
                  </div>
                </div></div>
                <div className="tags">{p.tags.map((x) => <span key={x}>{x}</span>)}</div>
                <div className="project-actions">
                  <button className="details-btn" onClick={() => setOpen(open === i ? null : i)}>
                    {open === i ? t.project_hide : t.project_details}<span className={open === i ? 'rot' : ''}>↓</span>
                  </button>
                  {p.live && <a className="project-live" href={p.live} target="_blank" rel="noreferrer">{t.project_live}</a>}
                </div>
                <div className="collapse collapse--detail"><div><p className="project-detail" aria-hidden={open !== i}>{p.detail}</p></div></div>
              </div>
            </article>
            </React.Fragment>
          ))}

          <div className="rail-end">
            <a className="github-more" href="https://github.com/pedroalmeidapeixoto" target="_blank" rel="noreferrer">{t.github_cta}</a>
          </div>
        </div>
        <div className="rail-progress" aria-hidden="true"><span /></div>
      </div>
    </section>
  );
}
