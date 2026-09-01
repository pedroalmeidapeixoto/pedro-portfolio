import React from 'react';
export default function About({ t }) {
  return <section id="sobre"><div className="wrap"><div className="section-head reveal"><span>{t.about_eyebrow}</span><h2>{t.about_title}</h2></div><div className="about-layout"><div className="about-copy reveal"><p>{t.about_p1}</p><p>{t.about_p2}</p><p>{t.about_p3}</p><div className="metrics"><Metric k={t.about_metric_1} v={t.about_metric_1v}/><Metric k={t.about_metric_2} v={t.about_metric_2v}/><Metric k={t.about_metric_3} v={t.about_metric_3v}/></div></div><div className="about-terminal reveal reveal-delay"><div className="terminal-head"><span>pedro.dev</span><span>PROFILE.JSON</span></div><pre>{`{\n  "focus": "C# / .NET",\n  "role": "Backend Developer",\n  "work": ["APIs", "Data", "Integrations"],\n  "status": "available"\n}`}</pre></div></div></div></section>;
}
function Metric({ k, v }) { return <div><span>{k}</span><strong>{v}</strong></div>; }
