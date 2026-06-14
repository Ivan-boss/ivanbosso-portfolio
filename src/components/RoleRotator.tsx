import { useEffect, useState } from 'react';

const ROLES = [
  'AI / LLM Engineer',
  'Data Engineer',
  'MLOps & Évaluation',
  'Ingénieur Data / IA',
];

/** Fait défiler les rôles avec une animation slide-up (réf. Angira, en plus distinctif). */
export default function RoleRotator() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % ROLES.length), 2400);
    return () => window.clearInterval(id);
  }, []);

  // key={i} force le remount → l'animation role-in se rejoue à chaque changement
  return (
    <span className="role-rotator" key={i}>
      {ROLES[i]}
    </span>
  );
}
