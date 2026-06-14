import { useEffect, useRef } from 'react';

/**
 * Signature visuelle : un réseau de neurones discret en fond du hero.
 * Des nœuds dérivent, se relient quand ils sont proches, et des impulsions
 * circulent le long des liens — évoque l'IA + le « flux » du problème à la valeur.
 * Perf : nombre de nœuds borné, pause hors-écran, respecte prefers-reduced-motion.
 */
export default function NeuralBg() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    type Node = { x: number; y: number; vx: number; vy: number };
    let nodes: Node[] = [];
    type Pulse = { a: number; b: number; t: number; speed: number };
    let pulses: Pulse[] = [];
    let raf = 0;
    let running = true;

    const rand = (min: number, max: number) => min + (max - min) * Math.sin(seed++) ** 2;
    let seed = 2.4; // déterministe — pas de Math.random requis

    function resize() {
      const parent = canvas.parentElement!;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const count = Math.min(46, Math.max(18, Math.round((w * h) / 26000)));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: ((i * 97.13) % w),
        y: ((i * 53.71) % h),
        vx: (Math.sin(i * 1.7) * 0.22),
        vy: (Math.cos(i * 2.3) * 0.22),
      }));
      pulses = [];
    }

    const LINK = 138; // distance de liaison
    function step() {
      ctx.clearRect(0, 0, w, h);

      // déplacement
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      // liens
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const alpha = (1 - Math.sqrt(d2) / LINK) * 0.5;
            ctx.strokeStyle = `rgba(63, 99, 245, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            // génère une impulsion de temps en temps
            if (!reduce && pulses.length < 26 && (i + j + Math.round(time)) % 240 === 0) {
              pulses.push({ a: i, b: j, t: 0, speed: 0.012 + (i % 5) * 0.002 });
            }
          }
        }
      }

      // nœuds
      for (const n of nodes) {
        ctx.fillStyle = 'rgba(150, 165, 182, 0.55)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.7, 0, Math.PI * 2);
        ctx.fill();
      }

      // impulsions qui circulent
      pulses = pulses.filter((p) => p.t <= 1);
      for (const p of pulses) {
        p.t += p.speed;
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b) continue;
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        ctx.fillStyle = 'rgba(214, 240, 64, 0.95)';
        ctx.shadowColor = 'rgba(214, 240, 64, 0.85)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      time += 1;
      if (running) raf = requestAnimationFrame(step);
    }

    let time = 0;
    resize();
    window.addEventListener('resize', resize);

    if (reduce) {
      step(); // une frame statique
    } else {
      raf = requestAnimationFrame(step);
    }

    // pause quand le hero sort de l'écran
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !running && !reduce) {
          running = true;
          raf = requestAnimationFrame(step);
        } else if (!e.isIntersecting) {
          running = false;
          cancelAnimationFrame(raf);
        }
      }
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      style={{ maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, #000 55%, transparent 100%)' }}
    />
  );
}
