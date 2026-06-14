import { useEffect, useRef } from 'react';

const TRAIL = 8; // longueur de la traînée

/**
 * Curseur dynamique : un point central (qui grossit au survol) suivi d'une
 * traînée de points qui s'estompent (effet « flux de données »).
 * Désactivé au toucher et si prefers-reduced-motion.
 */
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const trail = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (reduce || !fine) return;

    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let raf = 0;
    const tp = Array.from({ length: TRAIL }, () => ({ x: mx, y: my }));

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };
    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest('a, button, [data-cursor]');
      root.classList.toggle('cursor-hover', !!t);
    };

    const loop = () => {
      let px = mx;
      let py = my;
      for (let k = 0; k < TRAIL; k++) {
        const p = tp[k];
        p.x += (px - p.x) * 0.3;
        p.y += (py - p.y) * 0.3;
        const el = trail.current[k];
        if (el) {
          const s = 1 - k / (TRAIL + 1);
          el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) scale(${s})`;
          el.style.opacity = String(0.45 * s);
        }
        px = p.x;
        py = p.y;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      root.classList.remove('has-custom-cursor', 'cursor-hover');
    };
  }, []);

  return (
    <>
      {Array.from({ length: TRAIL }, (_, k) => (
        <div
          key={k}
          ref={(el) => {
            trail.current[k] = el;
          }}
          className="cursor-trail"
          aria-hidden="true"
        />
      ))}
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
