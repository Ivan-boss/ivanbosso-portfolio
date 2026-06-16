import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Fond shader (WebGL) : vagues / dégradé fluide en couleurs charte, sur tout
 * l'écran, DERRIÈRE le réseau 3D. Subtil (base sombre qui ondule).
 * Respecte reduced-motion ; pause si l'onglet est caché.
 */
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float u_time;
  uniform vec2 u_res;
  uniform vec2 u_mouse; // 0..1 (uv space)

  void main() {
    float aspect = u_res.x / u_res.y;

    // fond TOUT NOIR — plus de dégradé. On garde uniquement le ripple au curseur.
    vec2 d = vec2((vUv.x - u_mouse.x) * aspect, vUv.y - u_mouse.y);
    float dist = length(d);
    // vitesse réduite (u_time * 1.4) pour un mouvement doux, non hypnotique
    float ripple = sin(dist * 18.0 - u_time * 1.4) * exp(-dist * 3.0);

    // uniquement du bleu / bleu marine — plus de vert
    vec3 c = vec3(0.0);
    c += vec3(0.10, 0.20, 0.55) * max(0.0, ripple) * 0.5;   // anneaux bleu royal
    c += vec3(0.04, 0.08, 0.26) * max(0.0, -ripple) * 0.35; // anneaux bleu marine

    gl_FragColor = vec4(c, 1.0);
  }
`;

export default function ShaderBg() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = window.innerWidth;
    let h = window.innerHeight;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(w, h, false);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      u_time: { value: 0 },
      u_res: { value: new THREE.Vector2(w, h) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    };
    const target = { x: 0.5, y: 0.5 };
    const onMouse = (e: MouseEvent) => {
      target.x = e.clientX / window.innerWidth;
      target.y = 1 - e.clientY / window.innerHeight; // repère uv (y vers le haut)
    };
    window.addEventListener('mousemove', onMouse, { passive: true });
    const mat = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
    scene.add(quad);

    let raf = 0;
    let running = true;
    let signaled = false;
    const signalReady = () => {
      if (!signaled) {
        signaled = true;
        window.dispatchEvent(new Event('bg-ready'));
      }
    };
    const t0 = performance.now();
    const tick = () => {
      uniforms.u_time.value = (performance.now() - t0) / 1000;
      // lissage du déplacement de la souris
      uniforms.u_mouse.value.x += (target.x - uniforms.u_mouse.value.x) * 0.06;
      uniforms.u_mouse.value.y += (target.y - uniforms.u_mouse.value.y) * 0.06;
      renderer.render(scene, camera);
      signalReady();
      if (running) raf = requestAnimationFrame(tick);
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      renderer.setSize(w, h, false);
      uniforms.u_res.value.set(w, h);
    };
    window.addEventListener('resize', resize);

    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running && !reduce) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener('visibilitychange', onVis);

    if (reduce) {
      renderer.render(scene, camera);
      signalReady();
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      document.removeEventListener('visibilitychange', onVis);
      mat.dispose();
      quad.geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: -4, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}
