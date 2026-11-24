import React from 'react';
import { prefersReducedMotion } from '../hooks/useMotion';

const PROFILE = `{
  "focus": "C# / .NET",
  "role": "Backend Developer",
  "work": ["APIs", "Data", "Integrations"],
  "status": "available"
}`;

/** Types the text out once, when it first comes into view (the caret keeps blinking). With reduced motion it is simply shown. */
function TypeWriter({ text }) {
  const ref = React.useRef(null);
  const [count, setCount] = React.useState(prefersReducedMotion() ? text.length : 0);

  React.useEffect(() => {
    const element = ref.current;
    if (!element || count >= text.length) return undefined;
    let timer = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      let index = 0;
      const step = () => {
        index += 1;
        setCount(index);
        if (index < text.length) timer = window.setTimeout(step, text[index - 1] === '\n' ? 140 : 26);
      };
      timer = window.setTimeout(step, 400);
    }, { threshold: 0.5 });
    observer.observe(element);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
    // it only needs to start once
  }, [text]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <pre ref={ref} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, count)}<i className="caret" /></span>
    </pre>
  );
}

export default function About({ t }) {
  return (
    <section id="sobre" className="block" data-block>
      <div className="wrap">
        <div className="section-head reveal"><span>{t.about_eyebrow}</span><h2>{t.about_title}</h2></div>
        <div className="about-layout">
          <div className="about-copy reveal">
            <p>{t.about_p1}</p>
            <p>{t.about_p2}</p>
            <p>{t.about_p3}</p>
            <div className="metrics">
              <Metric k={t.about_metric_1} v={t.about_metric_1v} />
              <Metric k={t.about_metric_2} v={t.about_metric_2v} />
              <Metric k={t.about_metric_3} v={t.about_metric_3v} />
            </div>
          </div>
          <div className="about-terminal reveal reveal-delay">
            <div className="terminal-head"><span>pedro.dev</span><span>PROFILE.JSON</span></div>
            <TypeWriter text={PROFILE} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ k, v }) { return <div><span>{k}</span><strong>{v}</strong></div>; }
