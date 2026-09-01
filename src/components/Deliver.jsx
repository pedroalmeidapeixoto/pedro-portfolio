import React from 'react';

const icons = {
  api: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h4M7 12h7M7 16h3M16 8h1M16 12h1M14 16h3"/></>,
  integration: <><circle cx="7" cy="12" r="3"/><circle cx="17" cy="12" r="3"/><path d="M10 12h4"/></>,
  database: <><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></>,
  automation: <><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/></>,
  web: <><rect x="3" y="4" width="18" height="15" rx="2"/><path d="M3 9h18M8 4v5"/></>,
  ecommerce: <><path d="M4 7h16l-1 13H5L4 7Z"/><path d="M8 7a4 4 0 0 1 8 0"/></>
};

export default function Deliver({ t }) {
  return (
    <section id="entrego" className="soft-section">
      <div className="wrap">
        <div className="section-head reveal">
          <span>{t.deliver_eyebrow}</span>
          <h2>{t.deliver_title}</h2>
        </div>
        <div className="deliver-grid">
          {t.deliver.map(([n,title,desc],i) => (
            <article className="deliver-card reveal" style={{'--delay':`${i*80}ms`}} key={n}>
              <div className="deliver-top"><small>{n}</small><span className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{icons[['api','integration','database','automation','web','ecommerce'][i]]}</svg></span></div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <span className="card-arrow">↗</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
