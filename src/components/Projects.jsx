import React from 'react';
import { useRail } from '../hooks/useScrollFx';
import LibraryCover from './LibraryCover';
import medrecordCover from '../assets/medrecord-cover.webp';
import sevylhaCover from '../assets/sevylha-cover.webp';

/** Covers that are screenshots; a project without one gets the cover drawn in code. */
const COVERS = { MedRecord: medrecordCover, 'Panificadora Sevylha': sevylhaCover };

/** The layers each project is built in, taken from the descriptions of the projects themselves (a packet crosses them in the card). */
const FLOWS = {
  MedRecord: ['React', 'Express API', 'RBAC · audit', 'PostgreSQL'],
  'Library Management API': ['Controller', 'Service', 'Repository', 'PostgreSQL'],
  'Panificadora Sevylha': ['Cardápio', 'Pedido', 'OrderGateway', 'WhatsApp']
};

/**
 * Projects as a pinned horizontal rail (the pinned rail of DJ Auto Center): while the section is pinned the scroll moves the row of
 * cards sideways. On narrow screens, and with reduced motion, it is a normal vertical list.
 */
export default function Projects({ t }) {
  const [open, setOpen] = React.useState(null);
  const section = React.useRef(null);
  const track = React.useRef(null);
  const railOn = useRail(section, track);

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
            <article className={`project-card${open === i ? ' is-open' : ''}`} key={p.name}>
              <div className="project-index">0{i + 1}</div>
              <div className="project-main">
                {(() => {
                  const art = COVERS[p.name] ? <img className={p.name === 'Panificadora Sevylha' ? 'cover-left' : undefined} src={COVERS[p.name]} alt="" loading="lazy" /> : <LibraryCover />;
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
                    <div><small>{t.problem}</small><p>{p.problem}</p></div>
                    <div><small>{t.solution}</small><p>{p.solution}</p></div>
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
