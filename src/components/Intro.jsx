import React from 'react';
import { prefersReducedMotion } from '../hooks/useMotion';

/** The intro plays on every visit (it lasts under three seconds) and never with reduced motion. */
export function shouldPlayIntro() {
  return typeof window !== 'undefined' && !prefersReducedMotion();
}

const LINES = ['> connecting…', '> GET /  200 OK', '> hello, world'];

/**
 * Opening screen (the idea of the DJ Auto Center and Thiago Bike intros): the monogram `{ P }` draws itself, the name appears, a loader counts
 * to 100 with the lines of a first request, then the curtain lifts and the page starts under it.
 */
export default function Intro({ onDone }) {
  const [phase, setPhase] = React.useState('draw');
  const [percent, setPercent] = React.useState(0);

  React.useEffect(() => {
    const start = performance.now();
    let frame = 0;
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / 1900);
      setPercent(Math.round(progress * 100));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const lift = window.setTimeout(() => {
      setPhase('lift');
      onDone();
    }, 2100);
    const gone = window.setTimeout(() => setPhase('gone'), 3000);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(lift);
      window.clearTimeout(gone);
    };
  }, [onDone]);

  if (phase === 'gone') return null;
  return (
    <div className={`intro intro--${phase}`} aria-hidden="true">
      <div className="intro__mark">
        <svg viewBox="0 0 120 80" width="168" height="112" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          <path className="intro__stroke" pathLength="1" d="M30 8C20 8 20 14 20 22C20 32 16 38 8 40C16 42 20 48 20 58C20 66 20 72 30 72" />
          <path className="intro__stroke" pathLength="1" d="M90 8C100 8 100 14 100 22C100 32 104 38 112 40C104 42 100 48 100 58C100 66 100 72 90 72" />
          <path className="intro__stroke intro__stroke--p" pathLength="1" d="M48 66V14H66C80 14 80 40 66 40H48" />
        </svg>
        <p className="intro__name">
          pedro<span>.dev</span>
        </p>
        <ul className="intro__log">
          {LINES.map((line, index) => <li key={line} style={{ '--i': index }}>{line}</li>)}
        </ul>
        <div className="intro__loader">
          <span className="intro__bar"><i style={{ transform: `scaleX(${percent / 100})` }} /></span>
          <b>{String(percent).padStart(3, '0')}%</b>
        </div>
      </div>
    </div>
  );
}
