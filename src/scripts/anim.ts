// Moteur d'animation du site — GSAP (vanilla, Astro statique).
// Entrée hero (SplitText), rôles en scramble, reveals au scroll, titres splittés,
// compteurs, timeline qui se dessine au scroll, parallax.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

let roleTimer: number | undefined;

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const ROLES = ['Ingénieur Data / IA', 'Data Scientist', 'Consultant IA', 'AI / LLM Engineer', 'Data Analyst', 'Développeur augmenté'];

// Citation du bandeau. Index 0 = signature d'Ivan : tirage ALÉATOIRE, mais on ne
// commence JAMAIS par la sienne (toujours un auteur en premier), et jamais deux
// fois la même d'affilée. Sa signature peut tomber au hasard sur les vues suivantes.
const QUOTES: { text: string; who: string }[] = [
  { text: "« La valeur n'est pas dans l'appel au modèle, mais dans tout ce qui rend le résultat fiable, mesurable et reproductible. »", who: 'Ivan Bosso, ma façon de travailler' },
  { text: "« La perfection est atteinte non quand il n'y a plus rien à ajouter, mais quand il n'y a plus rien à retrancher. »", who: 'Antoine de Saint-Exupéry' },
  { text: "« La science accumule le savoir plus vite que la société n'accumule la sagesse. »", who: 'Isaac Asimov' },
  { text: '« La simplicité est un prérequis de la fiabilité. »', who: 'Edsger Dijkstra' },
];

/** Bandeau citation : tirage aléatoire, jamais la signature d'Ivan en première position. */
function rotateQuote() {
  const el = document.querySelector<HTMLElement>('[data-quote]');
  const who = document.querySelector<HTMLElement>('[data-quote-who]');
  if (!el || !who) return; // pas sur la home
  let last = -1;
  let started = false;
  try {
    const raw = sessionStorage.getItem('ib-quote-last');
    if (raw !== null) {
      last = parseInt(raw, 10);
      started = true;
    }
  } catch {}
  const all = QUOTES.map((_, i) => i);
  let pool = all.filter((i) => i !== last); // pas deux fois la même d'affilée
  if (!started) pool = pool.filter((i) => i !== 0); // jamais Ivan en premier
  if (!pool.length) pool = all.filter((i) => i !== last);
  const idx = pool[Math.floor(Math.random() * pool.length)];
  const q = QUOTES[idx];
  el.textContent = q.text;
  who.textContent = q.who;
  try {
    sessionStorage.setItem('ib-quote-last', String(idx));
  } catch {}
}

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

  const h1 = hero.querySelector<HTMLElement>('h1');
  const others = els.filter((e) => e !== h1);
  let played = false;

  const play = () => {
    if (played) return;
    played = true;
    // Cadence serrée : l'entrée se joue derrière le rideau du loader (350 ms
    // d'avance + 600 ms de clip-path). Tout doit être en place avant la levée.
    gsap.set(others, { opacity: 0, y: 24 });
    const tl = gsap.timeline();
    if (h1) {
      gsap.set(h1, { opacity: 1, y: 0 });
      const split = new SplitText(h1, { type: 'chars' });
      gsap.set(split.chars, { opacity: 0, yPercent: 130 });
      tl.to(split.chars, { opacity: 1, yPercent: 0, stagger: 0.025, duration: 0.5, ease: 'back.out(1.7)' }, 0);
    }
    tl.to(others, { opacity: 1, y: 0, stagger: 0.05, duration: 0.5, ease: 'power3.out' }, 0.05);
    tl.add(startRoles, '-=0.2');
  };

  // le hero démarre quand le loader s'en va ; sinon (pas de loader) tout de suite
  if (document.documentElement.classList.contains('loader-seen')) {
    play();
  } else {
    window.addEventListener('loader-done', play, { once: true });
    window.setTimeout(play, 7500); // garde-fou
  }
}

/** Rôles tapés lettre par lettre (typewriter), la barre verticale reste. */
function startRoles() {
  const el = document.querySelector<HTMLElement>('[data-roles]');
  if (!el) return;
  if (roleTimer) window.clearTimeout(roleTimer);
  if (reduce) {
    el.textContent = ROLES[0];
    return;
  }
  let i = 0;
  const typeRole = () => {
    const text = ROLES[i];
    let c = 0;
    const type = () => {
      el.textContent = text.slice(0, c);
      if (c < text.length) {
        c++;
        roleTimer = window.setTimeout(type, 105);
      } else {
        roleTimer = window.setTimeout(erase, 2200);
      }
    };
    const erase = () => {
      el.textContent = text.slice(0, c);
      if (c > 0) {
        c--;
        roleTimer = window.setTimeout(erase, 55);
      } else {
        i = (i + 1) % ROLES.length;
        roleTimer = window.setTimeout(typeRole, 350);
      }
    };
    type();
  };
  typeRole();
}

/** Apparition au scroll, en cascade. */
function reveals() {
  if (reduce) {
    gsap.set('.reveal', { opacity: 1, x: 0, y: 0, scale: 1 });
    return;
  }
  ScrollTrigger.batch('.reveal', {
    start: 'top 88%',
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        overwrite: true,
      });
      // reflet de lumière qui balaie chaque carte glass à l'apparition (staggeré)
      batch.forEach((el, i) => {
        if (el.classList.contains('glass')) {
          window.setTimeout(() => {
            el.classList.add('shine');
            window.setTimeout(() => el.classList.remove('shine'), 1300);
          }, 250 + i * 120);
        }
      });
    },
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

/** Tilt 3D : les cartes [data-tilt] s'inclinent et se soulèvent au survol. */
function tilt() {
  if (reduce || window.matchMedia('(pointer: coarse)').matches) return;
  gsap.utils.toArray<HTMLElement>('[data-tilt]').forEach((card) => {
    const MAX = 9;
    const onMove = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(card, {
        rotateY: px * MAX * 2,
        rotateX: -py * MAX * 2,
        y: -8,
        scale: 1.02,
        transformPerspective: 900,
        transformOrigin: 'center',
        duration: 0.3,
        ease: 'power2.out',
      });
    };
    const onLeave = () =>
      gsap.to(card, { rotateX: 0, rotateY: 0, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' });
    card.addEventListener('pointermove', onMove);
    card.addEventListener('pointerleave', onLeave);
  });
}

let shineTimer: number | undefined;

/** Reflet de lumière qui repasse régulièrement sur les cartes visibles. */
function periodicShine() {
  if (reduce) return;
  if (shineTimer) window.clearInterval(shineTimer);
  shineTimer = window.setInterval(() => {
    let n = 0;
    gsap.utils.toArray<HTMLElement>('.glass').forEach((el) => {
      const r = el.getBoundingClientRect();
      const visible = r.top < window.innerHeight && r.bottom > 0;
      if (visible && !el.matches(':hover')) {
        window.setTimeout(() => {
          el.classList.add('shine');
          window.setTimeout(() => el.classList.remove('shine'), 1300);
        }, n * 180);
        n++;
      }
    });
  }, 12000);
}

/** Spotlight : un halo de lumière suit le curseur sur chaque carte glass. */
function spotlight() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  gsap.utils.toArray<HTMLElement>('.glass').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
      card.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
    });
  });
}

function run() {
  heroIntro();
  rotateQuote();
  reveals();
  splitHeadings();
  counters();
  scrollDraw();
  parallax();
  tilt();
  spotlight();
  periodicShine();
}

// Nettoyage avant chaque transition de page (ClientRouter)
function cleanup() {
  ScrollTrigger.getAll().forEach((t) => t.kill());
  if (shineTimer) {
    window.clearInterval(shineTimer);
    shineTimer = undefined;
  }
  if (roleTimer) {
    window.clearTimeout(roleTimer);
    roleTimer = undefined;
  }
}
document.addEventListener('astro:before-swap', (e) => {
  // masque le loader sur la navigation interne (pas de re-jeu)
  const doc = (e as unknown as { newDocument?: Document }).newDocument;
  if (doc) doc.documentElement.classList.add('loader-seen');
  cleanup();
});

// astro:page-load se déclenche au 1er chargement ET à chaque navigation
document.addEventListener('astro:page-load', run);
