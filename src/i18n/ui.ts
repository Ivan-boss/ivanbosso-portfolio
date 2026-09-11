// ╔══════════════════════════════════════════════════════════════════╗
// ║  i18n — chaînes d'INTERFACE (chrome + en-têtes de pages).          ║
// ║  Le contenu « riche » (piliers, services, skills, code…) est dans  ║
// ║  content.ts. Usage : const T = t(locale); puis T.nav.contact …     ║
// ╚══════════════════════════════════════════════════════════════════╝
import type { Locale } from './config';

export const UI = {
  fr: {
    meta: {
      jobTitle: 'Ingénieur Data / IA',
      defaultTitle: 'Ivan Bosso · Ingénieur Data / IA',
      defaultDesc:
        "Ingénieur Data/IA à Nantes. J'aide les entreprises à automatiser leurs tâches et intégrer l'IA dans leurs process, pour gagner du temps et fiabiliser leurs décisions.",
    },
    loader: { pre: "L'", accent: 'humain', post: " d'abord, l'IA ensuite.", sub: 'Installez-vous, ça arrive.' },
    nav: { portfolio: 'Portfolio', cv: 'CV', contact: 'Contact', cta: 'Me contacter', menu: 'Menu' },
    lang: { toEN: 'Switch to English', toFR: 'Passer en français', label: 'Langue' },
    footer: { cv: 'CV', email: 'Email' },
    home: {
      heroEyebrow: 'Bonjour, bienvenue sur mon site',
      heroIam: 'Je suis',
      // Deux surlignages seulement, en début et en fin : la matière première
      // (bleu) et le bénéfice (citron) encadrent la phrase. « Faire parler vos
      // données » reprend volontairement le titre d'une carte Services
      // (i18n/content.ts) — même formule d'un bout à l'autre du site.
      heroLead: [
        { t: 'Je fais ' },
        { t: 'parler vos données', cls: 'text-accent-bright' },
        { t: ", j'optimise vos process grâce à l'IA, je vous débarrasse des tâches répétitives, et vous " },
        { t: 'gagnez du temps', cls: 'accent-word' },
        { t: '.' },
      ] as { t: string; cls?: string }[],
      heroSub:
        "Ingénieur Data / IA, je conçois des solutions de machine learning, de LLM et d'IA générative qui passent vraiment en production : RAG, fine-tuning, automatisation. Du data engineering au développement full-stack, je couvre toute la chaîne pour transformer vos données et vos process en résultats concrets, à grande échelle.",
      heroSubStrong: "machine learning, de LLM et d'IA générative",
      ctaProjects: 'Voir mes projets',
      ctaCv: 'Télécharger mon CV',
      pillarsEyebrow: '// Ce sur quoi vous pouvez compter',
      pillarsTitle: 'Concrètement, ce que je vous apporte',
      pillarsSub:
        "En mission comme au sein de votre équipe : des outils qui servent vraiment, et un impact que vous pouvez chiffrer.",
      projectsTitle: 'Projets phares',
      projectsSub: "Des cas concrets : le problème, ce que j'ai fait, ce que ça a changé.",
      seeAll: 'Tout voir →',
      whyEyebrow: '// Ma façon de travailler',
      whyTitle: "L'humain avant l'outil",
      whySub:
        "Au-delà de la technique, ma conviction : l'IA est un levier, pas un but. Je m'en sers pour créer de la valeur, là où elle a du sens.",
      whoamiEyebrow: '// whoami',
      whoamiTitle: 'En clair',
      whoamiBody:
        "Je pars de votre besoin, je conçois la solution, je la déploie, et je mesure ce qu'elle vous fait gagner. La technologie n'est qu'un moyen.",
      stackEyebrow: '// Stack technique',
      stackTitle: 'Les outils du quotidien',
      stackSub: 'Ce avec quoi je conçois, entraîne, déploie et observe.',
      quoteText:
        "« La perfection est atteinte non quand il n'y a plus rien à ajouter, mais quand il n'y a plus rien à retrancher. »",
      quoteWho: 'Antoine de Saint-Exupéry',
      ctaTitle: 'Un process qui vous prend trop de temps ?',
      ctaSub: "Dites-moi lequel. On regarde ensemble ce que l'IA peut y changer.",
      ctaBtn: 'Me contacter',
    },
    portfolio: {
      eyebrow: '// Portfolio',
      h1: 'Études de cas',
      intro:
        "Des missions réelles, menées chez IOD Solutions. Chacune suit le même fil : un problème métier, des contraintes, une approche, un résultat mesuré.",
      secondaryTitle: 'Autres missions',
      secondarySub: "Polyvalence : du RAG à l'intégration de données et à l'automatisation.",
    },
    caseStudy: {
      back: '← Tous les projets',
      appliedAI: 'Projet IA appliquée',
      dataProject: 'Projet Data',
      client: 'client',
      cardAppliedAI: 'IA appliquée',
      cardData: 'Data',
      cardCta: 'Étude de cas',
      steps: { probleme: 'Problème', contrainte: 'Contrainte', approche: 'Approche', resultat: 'Résultat' },
      stack: 'Stack',
      next: 'Projet suivant',
    },
    cv: {
      eyebrow: '// CV',
      subtitle: 'Ingénieur Data / IA · Nantes · TOEIC 945 · Permis B',
      download: 'Télécharger mon CV',
      soon: 'CV bientôt disponible',
      skillsTitle: 'Compétences',
      educationTitle: 'Formation',
      polytech: "diplôme d'ingénieur en informatique",
    },
    contact: {
      eyebrow: '// Contact',
      h1: 'Discutons',
      intro: 'Ouvert aux nouvelles opportunités. Un poste, un projet, ou simplement une question sur un sujet data/IA ? Écrivez-moi.',
      email: 'Email',
      linkedin: 'LinkedIn',
      phone: 'Téléphone',
      phoneNote: "Numéro communiqué par email, pour éviter les robots.",
      location: 'Localisation',
      locationSuffix: 'télétravail ou présentiel',
    },
    services: {
      eyebrow: '// Services',
      h1: 'Travaillons ensemble',
      intro:
        "J'accompagne des entreprises à automatiser leurs tâches et à intégrer l'IA dans leur quotidien. Le but est simple : vous faire gagner du temps, pour de vrai.",
      cta: 'Parler de votre besoin',
    },
    notFound: {
      err: 'Erreur 404',
      line1: 'Cette page a pris des vacances.',
      line2:
        "Soit Ivan est encore en train de la coder, soit elle n'a jamais existé. Pas de panique : le reste du site, lui, est bien réel et Ivan reste disponible.",
      term: '→ page introuvable, mais moi je suis dispo.',
      home: "Retour à l'accueil",
      contact: 'Me contacter',
    },
  },

  en: {
    meta: {
      jobTitle: 'Data / AI Engineer',
      defaultTitle: 'Ivan Bosso · Data / AI Engineer',
      defaultDesc:
        'Data/AI Engineer based in Nantes, France. I help companies automate their work and embed AI into their processes — saving time and making decisions more reliable.',
    },
    loader: { pre: '', accent: 'Humans', post: ' first, AI second.', sub: 'Make yourself at home — almost there.' },
    nav: { portfolio: 'Portfolio', cv: 'Résumé', contact: 'Contact', cta: 'Get in touch', menu: 'Menu' },
    lang: { toEN: 'Switch to English', toFR: 'Switch to French', label: 'Language' },
    footer: { cv: 'Résumé', email: 'Email' },
    home: {
      heroEyebrow: 'Hi, welcome to my site',
      heroIam: "I'm a",
      // Cf. la version FR : mêmes deux surlignages, et « make your data speak »
      // reprend le titre de la carte Services correspondante.
      heroLead: [
        { t: 'I make ' },
        { t: 'your data speak', cls: 'text-accent-bright' },
        { t: ', I streamline your processes with AI, take repetitive tasks off your plate, and ' },
        { t: 'give you time back', cls: 'accent-word' },
        { t: '.' },
      ] as { t: string; cls?: string }[],
      heroSub:
        'As a Data / AI Engineer, I build machine learning, LLM and generative-AI solutions that actually reach production: RAG, fine-tuning, automation. From data engineering to full-stack development, I cover the whole chain to turn your data and processes into concrete results, at scale.',
      heroSubStrong: 'machine learning, LLM and generative-AI',
      ctaProjects: 'See my work',
      ctaCv: 'Download my résumé',
      pillarsEyebrow: '// What you can count on',
      pillarsTitle: 'What I actually bring you',
      pillarsSub:
        'On a client mission or inside your team: tools that genuinely get used, and an impact you can measure.',
      projectsTitle: 'Featured projects',
      projectsSub: 'Real cases: the problem, what I did, what changed.',
      seeAll: 'View all →',
      whyEyebrow: '// How I work',
      whyTitle: 'People before tools',
      whySub:
        'Beyond the tech, my conviction: AI is a lever, not a goal. I use it to create value, where it genuinely makes sense.',
      whoamiEyebrow: '// whoami',
      whoamiTitle: 'In plain words',
      whoamiBody:
        'I start from your need, design the solution, ship it, and measure what it saves you. Technology is only a means.',
      stackEyebrow: '// Tech stack',
      stackTitle: 'My everyday tools',
      stackSub: 'What I use to design, train, deploy and monitor.',
      quoteText:
        '“Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.”',
      quoteWho: 'Antoine de Saint-Exupéry',
      ctaTitle: 'Is a process eating up your time?',
      ctaSub: "Tell me which one. Let's look together at what AI could change.",
      ctaBtn: 'Get in touch',
    },
    portfolio: {
      eyebrow: '// Portfolio',
      h1: 'Case studies',
      intro:
        'Real client missions, delivered at IOD Solutions. Each one follows the same thread: a business problem, constraints, an approach, a measured result.',
      secondaryTitle: 'Other missions',
      secondarySub: 'Versatility: from RAG to data integration and automation.',
    },
    caseStudy: {
      back: '← All projects',
      appliedAI: 'Applied AI project',
      dataProject: 'Data project',
      client: 'client',
      cardAppliedAI: 'Applied AI',
      cardData: 'Data',
      cardCta: 'Case study',
      steps: { probleme: 'Problem', contrainte: 'Constraint', approche: 'Approach', resultat: 'Result' },
      stack: 'Stack',
      next: 'Next project',
    },
    cv: {
      eyebrow: '// Résumé',
      subtitle: 'Data / AI Engineer · Nantes, France · TOEIC 945 · Driving licence',
      download: 'Download my résumé',
      soon: 'Résumé coming soon',
      skillsTitle: 'Skills',
      educationTitle: 'Education',
      polytech: 'MSc in Computer Science Engineering',
    },
    contact: {
      eyebrow: '// Contact',
      h1: "Let's talk",
      intro: 'Open to new opportunities. A role, a project, or just a question about data/AI? Drop me a line.',
      email: 'Email',
      linkedin: 'LinkedIn',
      phone: 'Phone',
      phoneNote: 'Number shared by email, to keep the bots out.',
      location: 'Location',
      locationSuffix: 'remote or on-site',
    },
    services: {
      eyebrow: '// Services',
      h1: "Let's work together",
      intro:
        'I help companies automate their work and bring AI into their day-to-day. The goal is simple: save you real time.',
      cta: 'Discuss your needs',
    },
    notFound: {
      err: 'Error 404',
      line1: 'This page went on holiday.',
      line2:
        "Either Ivan is still coding it, or it never existed. No worries: the rest of the site is very real, and Ivan is still available.",
      term: "→ page not found, but I'm available.",
      home: 'Back home',
      contact: 'Get in touch',
    },
  },
} as const;

export function t(locale: Locale) {
  return UI[locale];
}
