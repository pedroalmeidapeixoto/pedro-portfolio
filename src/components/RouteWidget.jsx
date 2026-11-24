import React from 'react';
import { clamp, prefersReducedMotion } from '../hooks/useMotion';
import { useCurrentSection } from '../hooks/useScrollFx';

const SECTIONS = ['hero', 'manifesto', 'entrego', 'sobre', 'jornada', 'experiencia', 'projetos', 'skills', 'contato'];
const ROUTES = { hero: '/', manifesto: '/manifesto', entrego: '/entrego', sobre: '/sobre', jornada: '/jornada', experiencia: '/experiencia', projetos: '/projetos', skills: '/skills', contato: '/contato' };

/**
 * "The route" (the elevation profile of Thiago Bike): a small request meter fixed at the bottom of the page. A packet crosses
 * CLIENT, API, SERVICE and DATABASE as the visitor scrolls, with the "route" being read and the share of the page. Decorative.
 */
export default function RouteWidget() {
  const root = React.useRef(null);
  const current = useCurrentSection(SECTIONS);

  React.useEffect(() => {
    const element = root.current;
    if (!element || prefersReducedMotion()) return undefined;
    const pct = element.querySelector('[data-route="pct"]');
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? clamp(window.scrollY / max) : 0;
      element.style.setProperty('--route', p.toFixed(4));
      if (pct) pct.textContent = String(Math.round(p * 100));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={`route${current === 'jornada' || current === 'projetos' ? ' route--hidden' : ''}`} ref={root} aria-hidden="true">
      <svg viewBox="0 0 200 22" fill="none">
        <path className="route__line" d="M8 11H192" />
        <path className="route__done" d="M8 11H192" pathLength="1" />
        {[0, 1, 2, 3].map((index) => (
          <circle key={index} className="route__node" cx={8 + index * (184 / 3)} cy="11" r="3.4" />
        ))}
        <g className="route__dot">
          <circle className="route__pulse" cx="8" cy="11" r="8" />
          <circle cx="8" cy="11" r="4.4" />
        </g>
      </svg>
      <p>
        <b>GET</b> {ROUTES[current]} <i>200</i> <span><em data-route="pct">0</em>%</span>
      </p>
    </div>
  );
}
