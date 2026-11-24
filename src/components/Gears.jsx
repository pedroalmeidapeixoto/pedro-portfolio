import React from 'react';
import { useSpin } from '../hooks/useScrollFx';

const TAU = Math.PI * 2;

/** A gear drawn as a polygon with `count` teeth between two radii (the chainring of Thiago Bike, here for integrations). */
function gear(cx, cy, count, rIn, rOut) {
  const step = TAU / count;
  const points = [];
  for (let i = 0; i < count; i += 1) {
    for (const [offset, radius] of [[0, rIn], [0.18, rOut], [0.52, rOut], [0.72, rIn]]) {
      const angle = i * step + offset * step;
      points.push(`${(cx + radius * Math.cos(angle)).toFixed(1)} ${(cy + radius * Math.sin(angle)).toFixed(1)}`);
    }
  }
  return `M ${points.join(' L ')} Z`;
}

const BIG = { x: 150, y: 150, teeth: 22, rIn: 118, rOut: 136 };
const SMALL = { x: 372, y: 262, teeth: 13, rIn: 66, rOut: 82 };

/**
 * Two gears that mesh. They turn with the scroll (the big one forward, the small one the other way, in the ratio of their teeth),
 * so the page "drives" the integration. Decorative.
 */
export default function Gears({ className = '' }) {
  const ref = React.useRef(null);
  useSpin(ref, 6, 0.1);
  const ratio = BIG.teeth / SMALL.teeth;
  return (
    <svg ref={ref} className={`gears ${className}`} viewBox="0 0 470 360" fill="none" aria-hidden="true" focusable="false">
      <g className="gear gear--big" style={{ transformOrigin: `${BIG.x}px ${BIG.y}px` }}>
        <path d={gear(BIG.x, BIG.y, BIG.teeth, BIG.rIn, BIG.rOut)} />
        <circle cx={BIG.x} cy={BIG.y} r="26" />
        <circle cx={BIG.x} cy={BIG.y} r="64" strokeDasharray="3 9" />
      </g>
      <g className="gear gear--small" style={{ transformOrigin: `${SMALL.x}px ${SMALL.y}px`, '--ratio': ratio }}>
        <path d={gear(SMALL.x, SMALL.y, SMALL.teeth, SMALL.rIn, SMALL.rOut)} />
        <circle cx={SMALL.x} cy={SMALL.y} r="16" />
        <circle cx={SMALL.x} cy={SMALL.y} r="38" strokeDasharray="3 8" />
      </g>
    </svg>
  );
}
