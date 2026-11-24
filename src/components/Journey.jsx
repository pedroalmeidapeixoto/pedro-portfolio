import React from 'react';
import { useSceneProgress } from '../hooks/useScrollFx';

const NODES = ['CLIENT', 'API', 'SERVICE', 'DATABASE'];

/**
 * "A request, end to end": a pinned scene (the pinned rail of DJ Auto Center, the route of Thiago Bike). While the stage is pinned, a packet
 * travels the stack and each stage lights up with what happens there. Drawn as a blueprint (the grid and dimension lines of Aluizio Bicicletas).
 * The texts are the general path of a request in a layered API, as in the projects below.
 */
export default function Journey({ t }) {
  const ref = React.useRef(null);
  const [step, setStep] = React.useState(0);
  const onStep = React.useCallback((value) => setStep(value), []);
  useSceneProgress(ref, NODES.length, onStep);

  return (
    <section className="journey block" data-block id="jornada" ref={ref}>
      <div className="journey__stage">
        <div className="wrap">
          <div className="section-head journey__head reveal">
            <span>{t.journey_eyebrow}</span>
            <h2>{t.journey_title}</h2>
          </div>

          <div className="journey__body">
            <div className="journey__diagram" aria-hidden="true">
              <svg className="journey__svg journey__svg--h" viewBox="0 0 760 200" fill="none">
                <path className="bp-dim" d="M80 36H680M80 30V42M680 30V42" />
                <text className="bp-text" x="380" y="26" textAnchor="middle">HTTP · JSON · SQL</text>
                <path className="bp-rail" d="M80 112H680" pathLength="1" />
                <path className="bp-rail bp-rail--done" d="M80 112H680" pathLength="1" />
                {NODES.map((name, index) => (
                  <g key={name} className={`bp-node${index <= step ? ' is-on' : ''}${index === step ? ' is-now' : ''}`} transform={`translate(${80 + index * 200} 112)`}>
                    <rect x="-52" y="-30" width="104" height="60" rx="14" />
                    <text y="5" textAnchor="middle">{name}</text>
                    <path className="bp-cross" d="M-6 -44H6M0 -50V-38" />
                  </g>
                ))}
                <g className="bp-packet">
                  <circle className="bp-pulse" cx="80" cy="112" r="14" />
                  <circle cx="80" cy="112" r="7" />
                </g>
                <g className={`bp-response${step === NODES.length - 1 ? ' is-on' : ''}`} transform="translate(380 168)">
                  <rect x="-70" y="-17" width="140" height="34" rx="17" />
                  <text y="5" textAnchor="middle">201 Created</text>
                </g>
              </svg>

              <svg className="journey__svg journey__svg--v" viewBox="0 0 140 380" fill="none">
                <path className="bp-rail" d="M70 44V336" pathLength="1" />
                <path className="bp-rail bp-rail--done" d="M70 44V336" pathLength="1" />
                {NODES.map((name, index) => (
                  <g key={name} className={`bp-node${index <= step ? ' is-on' : ''}${index === step ? ' is-now' : ''}`} transform={`translate(70 ${44 + index * 97.3})`}>
                    <rect x="-56" y="-24" width="112" height="48" rx="12" />
                    <text y="5" textAnchor="middle">{name}</text>
                  </g>
                ))}
                <g className="bp-packet bp-packet--v">
                  <circle className="bp-pulse" cx="70" cy="44" r="14" />
                  <circle cx="70" cy="44" r="7" />
                </g>
              </svg>
            </div>

            <ol className="journey__steps">
              {t.journey_steps.map(([title, text], index) => (
                <li key={title} className={index === step ? 'is-on' : index < step ? 'is-done' : ''}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
