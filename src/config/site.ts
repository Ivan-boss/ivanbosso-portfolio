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
  // Alias public, redirigé vers la boîte perso via Cloudflare Email Routing.
  // Jetable : s'il se fait spammer, on le supprime et on en recrée un autre —
  // l'adresse personnelle n'apparaît nulle part sur le site.
  // ⚠️ Réception uniquement : les réponses partent depuis la boîte perso.
  email: 'contact@ivanbosso.com',
  // Numéro volontairement retiré du site public (le code est inspectable).
  // Ligne pro à venir : remettre la vraie valeur ici quand prête, puis
  // réafficher la carte téléphone (voir src/pages/contact.astro).
  phone: '',
  phoneIntl: '',
  linkedin: 'https://www.linkedin.com/in/ivan-bosso',
  github: '', // laisser vide pour masquer le lien

  // CV : voir CV_FILES en bas de ce fichier.

  // Photo de profil (déposer le fichier dans public/, ex. public/ivan.jpg).
  // Laisser vide pour afficher le monogramme « IB » à la place.
  // Format WebP 336×336 (2× le rendu 168px) : 9 Ko, pour un affichage immédiat.
  photo: '/ivan.webp',

  // Image de fond du bandeau « citation » (déposer dans public/, ex. /band.jpg).
  // Laisser vide = fond dégradé « mesh » généré (aucune image requise).
  bandImage: '',

  // Image de partage social (Open Graph), 1200×630, déposée dans public/ (ex. /og.png).
  // Laisser vide = pas de vignette sociale (à ajouter avant la mise en ligne).
  ogImage: '',
};

// ── CV téléchargeables ──────────────────────────────────────────────
// Quel PDF de public/cv/ est proposé pour quelle langue. Le nom doit être
// EXACT (extension comprise), copié depuis public/cv/.
//
// ⚠️ Déclaration explicite et volontaire : ne remplacez pas ça par une
// détection automatique. L'ancienne version triait les PDF par ordre
// alphabétique, et « CV Développeur » passant avant « CV Ingénieur », le
// site positionné Data/IA servait le CV dev — sans que rien ne casse.
// Un fichier déclaré introuvable déclenche un avertissement au build.
//
// Ajouter une langue = ajouter une ligne ici, rien d'autre à toucher.
export const CV_FILES: Record<'fr' | 'en', string> = {
  fr: 'Ivan Bosso — CV Ingénieur Data _ IA.pdf',
  en: 'Data_AI-engineer_cv_en_Ivan_BOSSO.pdf',
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
