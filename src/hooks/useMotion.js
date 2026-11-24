import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Page motion shared with the client sites (DJ Auto Center, Thiago Bike, Aluizio Bicicletas):
 *  - inertial smooth scroll (Lenis) and eased in-page anchors;
 *  - `.reveal` / `[data-reveal]` elements rise in as they enter the viewport;
 *  - `[data-block]` sections slide over the previous one, which scales and fades while it is covered;
 *  - `[data-parallax]` offsets and the reading progress bar.
 * One scroll listener and one requestAnimationFrame per frame.
 */

export const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

let lenisInstance = null;

/** Smooth-scrolls to an element id; native smooth scrolling when Lenis is off. */
export function scrollToId(id) {
  const target = document.getElementById(id);
  if (!target) return;
  if (lenisInstance) lenisInstance.scrollTo(target, { offset: -70, duration: 1.4 });
  else target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
}

export function usePageMotion(enabled = true) {
  const started = useRef(false);

  useEffect(() => {
    if (!enabled || started.current) return undefined;
    started.current = true;

    const reduced = prefersReducedMotion();
    const root = document.documentElement;
    const progressBar = document.getElementById('progressBar');
    const floating = document.getElementById('floatingBtn');
    const blocks = [...document.querySelectorAll('[data-block]')];
    const parallax = [...document.querySelectorAll('[data-parallax]')];

    const show = (element) => element.classList.add('visible');
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target);
          reveal.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    document.querySelectorAll('.reveal').forEach((element) => (reduced ? show(element) : reveal.observe(element)));

    let frame = 0;
    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const max = root.scrollHeight - viewport;
      if (progressBar) progressBar.style.width = `${max > 0 ? clamp(window.scrollY / max) * 100 : 0}%`;
      floating?.classList.toggle('visible', window.scrollY > 500);
      if (reduced) return;

      blocks.forEach((block, index) => {
        const next = blocks[index + 1];
        const leave = next ? clamp(1 - next.getBoundingClientRect().top / viewport) : 0;
        block.style.setProperty('--leave', leave.toFixed(3));
        // Content is only transformed while the next block covers it, so sticky scenes behave normally the rest of the time.
        if (leave > 0.001) block.setAttribute('data-covering', '');
        else block.removeAttribute('data-covering');
      });

      for (const element of parallax) {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > viewport + 200) continue;
        const speed = Number(element.dataset.parallax) || 0.1;
        element.style.setProperty('--parallax', `${((rect.top + rect.height / 2 - viewport / 2) * speed).toFixed(1)}px`);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    let lenis = null;
    if (!reduced) {
      lenis = new Lenis({ autoRaf: true, lerp: 0.085, wheelMultiplier: 0.95, smoothWheel: true });
      lenisInstance = lenis;
      lenis.on('scroll', schedule);
    } else {
      window.addEventListener('scroll', schedule, { passive: true });
    }
    window.addEventListener('resize', schedule);
    update();

    return () => {
      started.current = false;
      reveal.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
      lenis?.destroy();
      lenisInstance = null;
    };
  }, [enabled]);
}
