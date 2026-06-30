// ╔══════════════════════════════════════════════════════════════════╗
// ║  i18n — contenu « riche » bilingue (listes, cartes, code, rôles).  ║
// ║  ROLES & QUOTES sont aussi importés par le moteur d'anim (client). ║
// ╚══════════════════════════════════════════════════════════════════╝
import type { Locale } from './config';

type Color = 'accent-bright' | 'citron';

// ── Page d'accueil : piliers « résultats » ───────────────────────────
export const PILLARS: Record<Locale, { k: string; v: string; c: Color }[]> = {
  fr: [
    { k: 'Du concret, pas un prototype', v: 'Je livre des outils utilisés en production, tous les jours. Pas une démo qui finit oubliée dans un coin.', c: 'accent-bright' },
    { k: 'Un ROI que vous mesurez', v: "Temps gagné, erreurs en moins, coûts réduits : je chiffre l'impact. Vous savez ce que ça rapporte.", c: 'citron' },
    { k: 'Autonome, de bout en bout', v: "De la donnée jusqu'à l'interface, je couvre toute la chaîne. Opérationnel vite, sans qu'on ait à tout cadrer pour moi.", c: 'accent-bright' },
    { k: "Je m'intègre à votre métier", v: "Industrie, finance, paie, immobilier : je m'adapte à votre terrain et à votre équipe.", c: 'citron' },
  ],
  en: [
    { k: 'Real tools, not a prototype', v: 'I ship tools used in production, every day — not a demo that ends up forgotten in a corner.', c: 'accent-bright' },
    { k: 'An ROI you can measure', v: 'Time saved, fewer errors, lower costs: I quantify the impact. You know what it returns.', c: 'citron' },
    { k: 'Autonomous, end to end', v: 'From data to interface, I cover the whole chain. Operational fast, with no need to spell everything out for me.', c: 'accent-bright' },
    { k: 'I fit into your domain', v: 'Industry, finance, payroll, real estate: I adapt to your field and your team.', c: 'citron' },
  ],
};

// ── Page d'accueil : philosophie « pourquoi moi » ────────────────────
export const WHY: Record<Locale, { icon: string; title: string; desc: string; c: Color }[]> = {
  fr: [
    { icon: 'users', title: "L'humain d'abord", desc: "Au-delà de la performance, je conçois pour les personnes qui vont s'en servir. Un outil n'a de valeur que s'il est adopté.", c: 'accent-bright' },
    { icon: 'scale', title: "Tout n'est pas à automatiser", desc: "Ce n'est pas une course à l'automatisation. Certaines décisions doivent rester humaines, et je sais où l'IA aide vraiment.", c: 'citron' },
    { icon: 'compass', title: "L'IA est un moyen, pas une fin", desc: "Je pars de la valeur, pas de la hype. La bonne techno, c'est celle qui règle votre problème, pas la plus à la mode.", c: 'accent-bright' },
    { icon: 'refresh', title: 'Orienté valeur, pas « toolmaniac »', desc: "Les outils changent vite ; m'enfermer dans un seul serait un risque. Je reste agnostique et je m'attache au résultat qui dure.", c: 'citron' },
  ],
  en: [
    { icon: 'users', title: 'People first', desc: "Beyond performance, I design for the people who will use it. A tool only has value if it's adopted.", c: 'accent-bright' },
    { icon: 'scale', title: 'Not everything should be automated', desc: "It's not a race to automate. Some decisions must stay human, and I know where AI genuinely helps.", c: 'citron' },
    { icon: 'compass', title: 'AI is a means, not an end', desc: 'I start from value, not hype. The right tech is the one that solves your problem, not the trendiest one.', c: 'accent-bright' },
    { icon: 'refresh', title: 'Value-driven, not tool-obsessed', desc: 'Tools change fast; locking myself into one would be a risk. I stay agnostic and focus on results that last.', c: 'citron' },
  ],
};

// ── Page Services ────────────────────────────────────────────────────
export const SERVICES: Record<Locale, { title: string; body: string }[]> = {
  fr: [
    { title: 'Automatiser vos tâches documentaires', body: 'Vos documents lus, extraits, classés et résumés automatiquement. Fini la saisie manuelle : vos équipes gagnent des heures, sans perdre en fiabilité. (LLM, RAG, contrôle qualité.)' },
    { title: "Intégrer l'IA dans vos outils", body: "Brancher l'IA sur vos systèmes existants et automatiser vos workflows : un chatbot, un copilote interne, un agent qui enchaîne les étapes à votre place. (n8n, API, agents.)" },
    { title: 'Faire parler vos données', body: 'Rassembler vos sources, repérer des tendances, scorer, prédire. Des décisions appuyées sur des chiffres, dans le respect du RGPD. (Data pipelines, NLP, ML, GCP.)' },
  ],
  en: [
    { title: 'Automate your document workflows', body: 'Your documents read, extracted, classified and summarised automatically. No more manual entry: your teams save hours, without losing reliability. (LLM, RAG, quality control.)' },
    { title: 'Embed AI into your tools', body: 'Plug AI into your existing systems and automate your workflows: a chatbot, an internal copilot, an agent that chains the steps for you. (n8n, APIs, agents.)' },
    { title: 'Make your data speak', body: 'Bring your sources together, spot trends, score, predict. Decisions backed by numbers, fully GDPR-compliant. (Data pipelines, NLP, ML, GCP.)' },
  ],
};

// ── Page CV : compétences ────────────────────────────────────────────
export const CV_SKILLS: Record<Locale, { group: string; icon: string; c: Color; items: string[] }[]> = {
  fr: [
    { group: 'IA / LLM', icon: 'cpu', c: 'accent-bright', items: ['LLM en prod (Gemini, GPT, Mistral/Pixtral, Claude)', 'LLM de vision', 'RAG (FAISS, BM25, pgvector)', 'embeddings (BGE-M3)', 'agents & function calling', 'évaluation (Langfuse)'] },
    { group: 'ML / Data Science', icon: 'line-chart', c: 'citron', items: ['scikit-learn', 'PyTorch', 'clustering (UMAP, HDBSCAN, k-means)', 'NLP (spaCy, GLiNER, Presidio)', 'pandas / NumPy'] },
    { group: 'Data Engineering', icon: 'database', c: 'accent-bright', items: ['ETL / multi-sources (INSEE, BPE…)', 'dbt / Dataform', 'n8n', 'scraping (Playwright, Selenium)', 'BigQuery', 'PostgreSQL / pgvector', 'orchestration (Pub/Sub)'] },
    { group: 'Backend & Frontend', icon: 'code', c: 'citron', items: ['Python', 'FastAPI', 'SQLAlchemy async', 'Pydantic v2', 'Node.js', 'React 19', 'Next.js / Astro', 'TypeScript', 'Tailwind'] },
    { group: 'Cloud / DevOps', icon: 'cloud', c: 'accent-bright', items: ['GCP (Cloud Run, BigQuery, Pub/Sub)', 'Docker', 'CI/CD (GitHub Actions)', 'Terraform', 'Linux', 'archi hexagonale'] },
  ],
  en: [
    { group: 'AI / LLM', icon: 'cpu', c: 'accent-bright', items: ['LLMs in prod (Gemini, GPT, Mistral/Pixtral, Claude)', 'Vision LLMs', 'RAG (FAISS, BM25, pgvector)', 'embeddings (BGE-M3)', 'agents & function calling', 'evaluation (Langfuse)'] },
    { group: 'ML / Data Science', icon: 'line-chart', c: 'citron', items: ['scikit-learn', 'PyTorch', 'clustering (UMAP, HDBSCAN, k-means)', 'NLP (spaCy, GLiNER, Presidio)', 'pandas / NumPy'] },
    { group: 'Data Engineering', icon: 'database', c: 'accent-bright', items: ['ETL / multi-source (INSEE, BPE…)', 'dbt / Dataform', 'n8n', 'scraping (Playwright, Selenium)', 'BigQuery', 'PostgreSQL / pgvector', 'orchestration (Pub/Sub)'] },
    { group: 'Backend & Frontend', icon: 'code', c: 'citron', items: ['Python', 'FastAPI', 'SQLAlchemy async', 'Pydantic v2', 'Node.js', 'React 19', 'Next.js / Astro', 'TypeScript', 'Tailwind'] },
    { group: 'Cloud / DevOps', icon: 'cloud', c: 'accent-bright', items: ['GCP (Cloud Run, BigQuery, Pub/Sub)', 'Docker', 'CI/CD (GitHub Actions)', 'Terraform', 'Linux', 'hexagonal architecture'] },
  ],
};

// ── Page d'accueil : snippet de code « whoami » ──────────────────────
export const CODE_SNIPPET: Record<Locale, string> = {
  fr: `class IvanBosso:
    role      = "Ingénieur Data / IA"
    expertise = ["ML", "LLM", "RAG", "fine-tuning"]
    je_fais   = "intégrer l'IA dans vos process"
    je_livre  = [
        "du temps gagné",
        "des décisions fiables",
        "un résultat chiffré",
    ]
    obsession = "votre résultat, pas la hype"

    def collaborer(self) -> str:
        return "parlons de votre besoin"
`,
  en: `class IvanBosso:
    role       = "Data / AI Engineer"
    expertise  = ["ML", "LLM", "RAG", "fine-tuning"]
    i_do       = "embed AI into your processes"
    i_deliver  = [
        "time saved",
        "reliable decisions",
        "measurable results",
    ]
    obsession  = "your outcome, not the hype"

    def collaborate(self) -> str:
        return "let's talk about your needs"
`,
};

// ── Rôles défilants du hero (utilisés par anim.ts) ───────────────────
export const ROLES: Record<Locale, string[]> = {
  fr: ['Ingénieur Data / IA', 'Data Scientist', 'Consultant IA', 'AI / LLM Engineer', 'Data Analyst', 'Développeur augmenté'],
  en: ['Data / AI Engineer', 'Data Scientist', 'AI Consultant', 'AI / LLM Engineer', 'Data Analyst', 'AI-augmented Developer'],
};

// ── Citations du bandeau (utilisées par anim.ts) ─────────────────────
export const QUOTES: Record<Locale, { text: string; who: string }[]> = {
  fr: [
    { text: "« La valeur n'est pas dans l'appel au modèle, mais dans tout ce qui rend le résultat fiable, mesurable et reproductible. »", who: 'Ivan Bosso, ma façon de travailler' },
    { text: "« La perfection est atteinte non quand il n'y a plus rien à ajouter, mais quand il n'y a plus rien à retrancher. »", who: 'Antoine de Saint-Exupéry' },
    { text: "« La science accumule le savoir plus vite que la société n'accumule la sagesse. »", who: 'Isaac Asimov' },
    { text: '« La simplicité est un prérequis de la fiabilité. »', who: 'Edsger Dijkstra' },
  ],
  en: [
    { text: '“The value isn’t in the model call, but in everything that makes the result reliable, measurable and reproducible.”', who: 'Ivan Bosso, how I work' },
    { text: '“Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.”', who: 'Antoine de Saint-Exupéry' },
    { text: '“Science gathers knowledge faster than society gathers wisdom.”', who: 'Isaac Asimov' },
    { text: '“Simplicity is a prerequisite for reliability.”', who: 'Edsger Dijkstra' },
  ],
};
