import { useEffect, useState } from 'react';
import { clamp, prefersReducedMotion } from './useMotion';

/**
 * Turns gears: a slow idle rotation plus the scroll speed, so the gears "drive" when the visitor scrolls (down turns them forward, up turns
 * them back). Writes `--spin` (degrees) on the element. Does nothing with reduced motion and pauses while the element is off screen
 * (the idea of the wheel of DJ Auto Center and the chainring of Thiago Bike).
 */
export function useSpin(ref, idleDegPerSec = 8, scrollGain = 0.12) {
  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return undefined;
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(element);

    let angle = 0;
    let lastY = window.scrollY;
    let last = performance.now();
    let velocity = 0;
    let frame = 0;
    const tick = (now) => {
      const seconds = Math.min(0.05, (now - last) / 1000);
      last = now;
      const y = window.scrollY;
      velocity += ((y - lastY) - velocity) * 0.2; // smoothed px per frame
      lastY = y;
      if (visible) {
        angle += idleDegPerSec * seconds + velocity * scrollGain;
        element.style.setProperty('--spin', `${(angle % 360).toFixed(2)}deg`);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [ref, idleDegPerSec, scrollGain]);
}

/**
 * A sentence that lights up word by word with the scroll (the manifesto of DJ Auto Center): each word with `data-word`
 * gets the class `is-lit` once the scroll passed its share of the section.
 */
export function useScrubWords(ref) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    const words = [...element.querySelectorAll('[data-word]')];
    if (prefersReducedMotion()) {
      words.forEach((word) => word.classList.add('is-lit'));
      return undefined;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = clamp((viewport * 0.78 - rect.top) / (rect.height + viewport * 0.3));
      const lit = progress * (words.length + 1);
      words.forEach((word, index) => word.classList.toggle('is-lit', index < lit));
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
  }, [ref]);
}

/**
 * A tall section with a pinned stage: writes `--p` (0 to 1) on the section while the stage is pinned and reports the step
 * (0 to steps - 1) the progress is in. With reduced motion the scene is fully played (p = 1).
 */
export function useSceneProgress(ref, steps, onStep) {
  useEffect(() => {
    const section = ref.current;
    if (!section) return undefined;
    if (prefersReducedMotion()) {
      section.style.setProperty('--p', '1');
      onStep(steps - 1);
      return undefined;
    }
    let frame = 0;
    let lastStep = -1;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = clamp(-rect.top / travel);
      section.style.setProperty('--p', progress.toFixed(4));
      const step = Math.min(steps - 1, Math.floor(progress * steps));
      if (step !== lastStep) {
        lastStep = step;
        onStep(step);
      }
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
  }, [ref, steps, onStep]);
}

/** The id of the section that is under the middle of the screen, for the route widget. */
export function useCurrentSection(ids) {
  const [current, setCurrent] = useState(ids[0]);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const middle = window.innerHeight * 0.4;
      let found = ids[0];
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= middle) found = id;
      }
      setCurrent(found);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    return () => {
      window.removeEventListener('scroll', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids]);
  return current;
}
