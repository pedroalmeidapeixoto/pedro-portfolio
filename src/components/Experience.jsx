import React from 'react';
export default function Experience({ t }) {
  return <section id="experiencia" className="soft-section"><div className="wrap"><div className="section-head reveal"><span>{t.experience_eyebrow}</span><h2>{t.experience_title}</h2><p>{t.experience_intro}</p></div><div className="timeline">{t.jobs.map((job,i)=><article className="experience-item reveal" style={{'--delay':`${i*120}ms`}} key={job.n}><div className="experience-num">{job.n}</div><div><div className="exp-top"><div><h3>{job.title}</h3><b>{job.company}</b></div><time>{job.period}</time></div><ul>{job.bullets.map((b,j)=><li key={j}>{b}</li>)}</ul><div className="tags">{job.tags.map(x=><span key={x}>{x}</span>)}</div></div></article>)}</div></div></section>;
}
