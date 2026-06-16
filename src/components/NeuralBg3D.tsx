import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Fond GLOBAL plein écran : réseau de points 2D (Three.js), reliés par des
 * arêtes quand ils sont proches. À CHAQUE chargement, le site tire au sort UNE
 * forme pour TOUT le fond : soit 100 % carrés, soit 100 % cercles (deux visiteurs
 * peuvent donc voir une version différente). Taille fixe en pixels (jamais trop
 * gros), mouvement propre très lent, parallaxe souris symétrique, opacité abaissée
 * pendant le scroll. Respecte reduced-motion ; pause si l'onglet est caché.
 */

// Texture ronde douce (dégradé radial) pour la variante « cercles ».
function makeCircleTexture(): THREE.Texture {
  const s = 64;
  const c = document.createElement('canvas');
  c.width = c.height = s;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.55, 'rgba(255,255,255,0.85)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(s / 2, s / 2, s / 2, 0, Math.PI * 2);
  ctx.fill();
  return new THREE.CanvasTexture(c);
}

export default function NeuralBg3D() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = window.innerWidth;
    let h = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(w, h, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    camera.position.z = 95;

    const group = new THREE.Group();
    scene.add(group);

    const N = 150;
    const RANGE = 170;
    const XRANGE = RANGE * 1.35; // étalement horizontal plus large (gauche / droite)
    const XHALF = XRANGE / 2;
    const biasX = (u: number) => Math.sign(u) * (0.16 + Math.pow(Math.abs(u) * 2, 0.7) * 0.84) * XHALF;

    const positions = new Float32Array(N * 3);
    const vel: THREE.Vector3[] = [];
    for (let i = 0; i < N; i++) {
      positions[i * 3] = biasX(Math.random() - 0.5);
      positions[i * 3 + 1] = (Math.random() - 0.5) * RANGE;
      positions[i * 3 + 2] = (Math.random() - 0.5) * RANGE * 0.8;
      // dérive dans l'espace — très lente
      vel.push(new THREE.Vector3((Math.random() - 0.5) * 0.03, (Math.random() - 0.5) * 0.03, (Math.random() - 0.5) * 0.03));
    }

    // ── Tirage au sort : tout carré OU tout cercle pour cette session/ce chargement.
    const isCircle = Math.random() < 0.5;
    const circleTex = isCircle ? makeCircleTexture() : null;

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x9bb0ff,
      size: isCircle ? 7 : 5, // pixels (sizeAttenuation false) → jamais trop gros
      map: circleTex ?? undefined,
      sizeAttenuation: false,
      transparent: true,
      opacity: isCircle ? 0.75 : 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    group.add(new THREE.Points(pGeo, pMat));

    const lineGeo = new THREE.BufferGeometry();
    const maxSeg = N * 9;
    const linePos = new Float32Array(maxSeg * 2 * 3);
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x5f7cff,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    group.add(lines);

    const LINK = 28;
    const mouse = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', onMouse, { passive: true });

    // Atténuation pendant le scroll : le fond s'efface un peu quand on lit/défile.
    canvas.style.transition = 'opacity 0.45s ease';
    let scrollT: number | undefined;
    const onScroll = () => {
      canvas.style.opacity = '0.5';
      if (scrollT) window.clearTimeout(scrollT);
      scrollT = window.setTimeout(() => {
        canvas.style.opacity = '1';
      }, 240);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    let raf = 0;
    let running = true;
    let signaled = false;
    const signalReady = () => {
      if (!signaled) {
        signaled = true;
        window.dispatchEvent(new Event('bg-ready'));
      }
    };

    const updateLines = () => {
      let s = 0;
      for (let i = 0; i < N && s < maxSeg; i++) {
        for (let j = i + 1; j < N && s < maxSeg; j++) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          if (dx * dx + dy * dy + dz * dz < LINK * LINK) {
            linePos.set(
              [positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2], positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]],
              s * 6,
            );
            s++;
          }
        }
      }
      lineGeo.setDrawRange(0, s * 2);
      lineGeo.attributes.position.needsUpdate = true;
    };

    const tick = () => {
      for (let i = 0; i < N; i++) {
        positions[i * 3] += vel[i].x;
        positions[i * 3 + 1] += vel[i].y;
        positions[i * 3 + 2] += vel[i].z;
        for (let a = 0; a < 3; a++) {
          const lim = a === 0 ? XHALF : a === 2 ? (RANGE * 0.8) / 2 : RANGE / 2;
          if (positions[i * 3 + a] < -lim || positions[i * 3 + a] > lim) vel[i].setComponent(a, -vel[i].getComponent(a));
        }
      }
      pGeo.attributes.position.needsUpdate = true;
      updateLines();

      // Parallaxe souris symétrique (aucune rotation auto qui biaiserait un sens).
      group.rotation.x += (mouse.y * 0.18 - group.rotation.x) * 0.07;
      camera.position.x += (mouse.x * 16 - camera.position.x) * 0.07;
      camera.position.y += (-mouse.y * 16 - camera.position.y) * 0.07;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      signalReady();
      if (running) raf = requestAnimationFrame(tick);
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
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
      updateLines();
      renderer.render(scene, camera);
      signalReady();
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      if (scrollT) window.clearTimeout(scrollT);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
      pGeo.dispose();
      pMat.dispose();
      circleTex?.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: -2, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}
