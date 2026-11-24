import React from 'react';
import { useScrubWords } from '../hooks/useScrollFx';

/** One sentence that lights up word by word as the page scrolls (the manifesto of DJ Auto Center). */
export default function Manifesto({ t }) {
  const ref = React.useRef(null);
  useScrubWords(ref);
  return (
    <section className="manifesto block" data-block id="manifesto" aria-label={t.manifesto_label}>
      <div className="wrap">
        <p className="manifesto__label reveal">{t.manifesto_label}</p>
        <p className="manifesto__text" ref={ref}>
          {t.manifesto.split(' ').map((word, index) => (
            <span key={index} data-word>{word} </span>
          ))}
        </p>
      </div>
    </section>
  );
}
