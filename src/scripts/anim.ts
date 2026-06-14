// Moteur d'animation du site — GSAP (vanilla, Astro statique).
// Entrée hero (SplitText), rôles en scramble, reveals au scroll, titres splittés,
// compteurs, timeline qui se dessine au scroll, parallax.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const ROLES = ['AI / LLM Engineer', 'Data Engineer', 'MLOps & Évaluation', 'Ingénieur Data / IA'];

/** Entrée du hero : nom lettre par lettre + cascade des éléments. */
function heroIntro() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;
  const els = gsap.utils.toArray<HTMLElement>('[data-hero-el]');
  if (!els.length) return;

  if (reduce) {
    gsap.set(els, { opacity: 1, y: 0 });
    startRoles();
    return;
  }

  // attendre la sortie du loader au tout premier chargement de la session
  const delay = sessionStorage.getItem('ib_seen') ? 0.15 : 1.7;
  const h1 = hero.querySelector<HTMLElement>('h1');
  const others = els.filter((e) => e !== h1);

  gsap.set(others, { opacity: 0, y: 44 });
  const tl = gsap.timeline({ delay });

  if (h1) {
    gsap.set(h1, { opacity: 1, y: 0 });
    const split = new SplitText(h1, { type: 'chars' });
    gsap.set(split.chars, { opacity: 0, yPercent: 130 });
    tl.to(split.chars, { opacity: 1, yPercent: 0, stagger: 0.035, duration: 0.7, ease: 'back.out(1.7)' }, 0);
  }
  tl.to(others, { opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out' }, 0.2);
  tl.add(startRoles, '-=0.2');
}

/** Rôles qui défilent avec un effet scramble (« ça s'écrit tout seul »). */
function startRoles() {
  const el = document.querySelector<HTMLElement>('[data-roles]');
  if (!el) return;
  if (reduce) {
    el.textContent = ROLES[0];
    return;
  }
  let i = 0;
  const cycle = () => {
    gsap.to(el, {
      duration: 1.1,
      ease: 'none',
      scrambleText: { text: ROLES[i], chars: 'upperAndLowerCase', speed: 0.5, revealDelay: 0.25 },
      onComplete: () => {
        i = (i + 1) % ROLES.length;
        gsap.delayedCall(1.9, cycle);
      },
    });
  };
  cycle();
}

/** Apparition au scroll, en cascade. */
function reveals() {
  if (reduce) {
    gsap.set('.reveal', { opacity: 1, x: 0, y: 0, scale: 1 });
    return;
  }
  ScrollTrigger.batch('.reveal', {
    start: 'top 88%',
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        overwrite: true,
      }),
  });
}

/** Titres marqués [data-split] : apparition mot par mot. */
function splitHeadings() {
  if (reduce) return;
  gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
    const split = new SplitText(el, { type: 'words' });
    gsap.from(split.words, {
      opacity: 0,
      y: 26,
      rotateX: -50,
      transformOrigin: '0% 50% -40',
      stagger: 0.06,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });
}

/** Chiffres qui comptent à l'arrivée dans le viewport. */
function counters() {
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const text = (el.textContent || '').trim();
    const m = text.match(/^([~<>]?\s*)(\d[\d  ]*\d|\d)(.*)$/);
    if (!m) return; // pas de nombre exploitable → on laisse tel quel
    const prefix = m[1];
    const target = parseInt(m[2].replace(/\s/g, ''), 10);
    const suffix = m[3];
    if (isNaN(target)) return;
    if (reduce) return;
    const obj = { n: 0 };
    el.textContent = prefix + '0' + suffix;
    gsap.to(obj, {
      n: target,
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%' },
      onUpdate: () => {
        el.textContent = prefix + Math.round(obj.n).toLocaleString('fr-FR') + suffix;
      },
    });
  });
}

/** Trait de timeline qui se dessine au fil du scroll (scrub). */
function scrollDraw() {
  gsap.utils.toArray<HTMLElement>('[data-scroll-draw]').forEach((el) => {
    gsap.set(el, { scaleY: 0, transformOrigin: 'top' });
    if (reduce) {
      gsap.set(el, { scaleY: 1 });
      return;
    }
    const parent = el.parentElement || el;
    gsap.to(el, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: parent, start: 'top 75%', end: 'bottom 85%', scrub: 0.6 },
    });
  });
}

/** Parallax léger : [data-parallax="0.15"] bouge en scrollant. */
function parallax() {
  if (reduce) return;
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.getAttribute('data-parallax') || '0');
    gsap.to(el, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
}

function run() {
  heroIntro();
  reveals();
  splitHeadings();
  counters();
  scrollDraw();
  parallax();
}

if (document.readyState !== 'loading') run();
else document.addEventListener('DOMContentLoaded', run);
