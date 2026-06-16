// ╔══════════════════════════════════════════════════════════════════╗
// ║  CONFIG DU SITE — le SEUL fichier à éditer pour les infos perso.   ║
// ║  (Pour ajouter/modifier un PROJET → src/data/projects.ts)         ║
// ╚══════════════════════════════════════════════════════════════════╝

export const SITE = {
  // Identité
  name: 'Ivan Bosso',
  role: 'Ingénieur Data / IA',
  location: 'Nantes (44)',
  tagline: 'Je transforme un problème métier en valeur mesurée.',

  // Nom de domaine — sert pour le SEO, le sitemap, les URL canoniques et llms.txt.
  url: 'https://ivanbosso.com',

  // Contact
  email: 'dboss.ivan@gmail.com',
  // Numéro volontairement retiré du site public (le code est inspectable).
  // Ligne pro à venir : remettre la vraie valeur ici quand prête, puis
  // réafficher la carte téléphone (voir src/pages/contact.astro).
  phone: '',
  phoneIntl: '',
  linkedin: 'https://www.linkedin.com/in/ivan-bosso',
  github: '', // laisser vide pour masquer le lien

  // CV : rien à configurer ici. Déposez n'importe quel PDF dans public/cv/
  // (le nom n'a aucune importance), il est détecté automatiquement au build.

  // Photo de profil (déposer le fichier dans public/, ex. public/ivan.jpg).
  // Laisser vide pour afficher le monogramme « IB » à la place.
  photo: '/ivan.png',

  // Image de fond du bandeau « citation » (déposer dans public/, ex. /band.jpg).
  // Laisser vide = fond dégradé « mesh » généré (aucune image requise).
  bandImage: '',

  // Image de partage social (Open Graph), 1200×630, déposée dans public/ (ex. /og.png).
  // Laisser vide = pas de vignette sociale (à ajouter avant la mise en ligne).
  ogImage: '',
};

// ── Statistiques de visite (analytics) ──────────────────────────────
// Choisir un fournisseur, coller la clé, et c'est actif. 'none' = désactivé.
// Recommandé pour un hébergement simple + gratuit : 'cloudflare'.
//   • 'cloudflare' → Cloudflare Web Analytics (gratuit, RGPD-friendly, sans cookie)
//   • 'plausible'  → Plausible (payant ou auto-hébergé), notif par email possible
//   • 'umami'      → Umami (auto-hébergé, gratuit)
//   • 'goatcounter'→ GoatCounter (gratuit, ultra simple, compteur de visites)
export const ANALYTICS = {
  provider: 'none' as 'none' | 'cloudflare' | 'plausible' | 'umami' | 'goatcounter',

  // Cloudflare : le token du beacon (Dashboard → Web Analytics → JS snippet)
  cloudflareToken: '',

  // Plausible : le domaine déclaré dans Plausible (ex. 'ivanbosso.dev')
  plausibleDomain: '',

  // Umami : l'URL du script + l'ID du site
  umamiSrc: '',
  umamiWebsiteId: '',

  // GoatCounter : le code du compte (ex. 'ivanbosso' → ivanbosso.goatcounter.com)
  goatcounterCode: '',
};
