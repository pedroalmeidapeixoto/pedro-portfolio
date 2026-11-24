import React from 'react';
import { prefersReducedMotion } from '../hooks/useMotion';

const SEEN_KEY = 'pp-intro-seen';

/** The intro plays once per browser tab and never with reduced motion. Storage can be blocked, so every access is guarded. */
export function shouldPlayIntro() {
  if (typeof window === 'undefined' || prefersReducedMotion()) return false;
  try {
    return window.sessionStorage.getItem(SEEN_KEY) !== '1';
  } catch {
    return true;
  }
}

/** Opening screen (the idea of the DJ Auto Center intro): the monogram `{ P }` draws itself, the name appears and the curtain lifts. */
export default function Intro({ onDone }) {
  const [phase, setPhase] = React.useState('draw');

  React.useEffect(() => {
    try {
      window.sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* storage unavailable: the intro simply plays again next time */
    }
    const lift = window.setTimeout(() => {
      setPhase('lift');
      onDone();
    }, 1700);
    const gone = window.setTimeout(() => setPhase('gone'), 2500);
    return () => {
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
        <span className="intro__bar" />
      </div>
    </div>
  );
}
