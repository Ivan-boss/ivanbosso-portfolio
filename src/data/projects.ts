// Source unique de vérité du contenu portfolio (bilingue FR/EN).
// Règle confidentialité : noms + logos clients OK (réf « ils nous ont fait confiance »,
// missions menées chez IOD) ; on garde métriques/ROI ; on retire les détails confidentiels.
// Champs NON traduits (slug, logos, website, domaine, stack…) = dans BASE ;
// champs traduits (titre, task, métriques, problème…) = dans TR[locale].
import type { Locale } from '../i18n/config';

export type Stage = { key: string; label: string };
export type Metric = { value: string; label: string };

export type Project = {
  slug: string;
  client: string;
  monogram: string;
  logo?: string;
  website?: string;
  domain: 'IA' | 'Data';
  tags: string[];
  title: string;
  task: string;
  headline: Metric;
  metrics: Metric[];
  probleme: string;
  contrainte: string;
  approche: string[];
  resultat: string[];
  stack: string[];
  featured: boolean;
};

// ── Champs invariants (identiques dans toutes les langues) ───────────
type ProjectBase = Pick<Project, 'slug' | 'client' | 'monogram' | 'logo' | 'website' | 'domain' | 'stack' | 'featured'>;
const BASE: ProjectBase[] = [
  { slug: 'cgr-rfq', client: 'CGR International', monogram: 'CGR', website: 'https://www.cgr-international.com', logo: '/logos/cgr.png', domain: 'IA', stack: ['Gemini', 'PostgreSQL', 'FastAPI', 'React 19', 'Langfuse', 'Logfire', 'Docker'], featured: true },
  { slug: 'oderis', client: 'ODERIS', monogram: 'OD', website: 'https://oderis.fr', logo: '/logos/oderis.png', domain: 'IA', stack: ['Mistral Pixtral', 'BGE-M3 (local)', 'PostgreSQL', 'pgvector', 'Hexagonal arch.', 'SigNoz'], featured: true },
  { slug: 'igam', client: 'IGAM', monogram: 'IG', website: 'https://www.igam.fr', logo: '/logos/igam.png', domain: 'Data', stack: ['BGE-M3', 'UMAP', 'HDBSCAN', 'spaCy', 'Presidio', 'Microsoft Graph'], featured: true },
  { slug: 'immo-score', client: 'Valloire Habitat', monogram: 'VH', website: 'https://www.valloire-habitat.com', logo: '/logos/valloire.png', domain: 'Data', stack: ['Python', 'n8n', 'GCP', 'Firestore', 'Playwright', 'OpenAI'], featured: true },
];

type ProjectTr = Omit<Project, keyof ProjectBase>;

const TR: Record<Locale, Record<string, ProjectTr>> = {
  fr: {
    'cgr-rfq': {
      tags: ['LLM Vision', 'Full-stack', 'Évaluation', 'Production'],
      title: 'Extraction LLM de données techniques pour la cotation industrielle',
      task: "Lire des plans techniques hétérogènes avec un LLM de vision et en extraire des données structurées pour alimenter automatiquement le calculateur de cotation.",
      headline: { value: 'En prod', label: 'extraction documentaire par IA' },
      metrics: [
        { value: '85–96 %', label: 'précision mesurée' },
        { value: 'UE', label: 'données résidentes' },
        { value: '288', label: 'nuances matériaux' },
      ],
      probleme: "Automatiser la cotation industrielle en extrayant les données techniques (dimensions, charges, tolérances, matériaux) depuis des documents très hétérogènes, pour alimenter le calculateur métier « E8 » sans ressaisie manuelle.",
      contrainte: "Documents de formats variés, données devant rester en Union Européenne, matériaux exprimés en texte libre à normaliser, et exigence d’une précision mesurable champ par champ.",
      approche: [
        "Pipeline d’extraction en production avec un LLM de vision (Gemini, choisi pour la résidence des données en UE et sa lecture de plans).",
        "Sorties structurées et typées (Pydantic), schéma de données versionné, ingénierie de prompt itérative.",
        "Fiabilisé l’extraction par un matching flou (rapidfuzz) d’un matériau texte-libre contre un catalogue de 288 nuances client, et une conversion d’unités physiques (métrique ↔ impérial).",
        "Système d’évaluation mesurant objectivement la précision champ par champ (moteur de comparaison maison puis Langfuse).",
      ],
      resultat: [
        "Précision d’extraction mesurée de 85 à 96 % selon les documents.",
        "Application full-stack livrée : FastAPI / SQLAlchemy async / PostgreSQL, React 19 / TanStack / Tailwind, conteneurisée (Docker, Dokploy), auth Clerk, stockage S3 (déduplication SHA-256), observabilité Logfire.",
      ],
    },
    oderis: {
      tags: ['LLM', 'RGPD', 'Architecture', 'Échelle'],
      title: 'Classification IA de slides à l’échelle pour la due diligence',
      task: "Ranger automatiquement les slides de rapports de Vendor Due Diligence dans une taxonomie métier, à l’échelle de plus de 250 000 slides, en maîtrisant le coût des appels au LLM.",
      headline: { value: 'Grande échelle', label: 'classification IA de documents' },
      metrics: [
        { value: '250 000+', label: 'slides (≈ 1 500 missions)' },
        { value: 'RGPD', label: 'embeddings calculés en local' },
        { value: 'cost-aware', label: 'arbitre LLM sur les cas ambigus' },
      ],
      probleme: "Capitaliser les rapports de Vendor Due Diligence en classant automatiquement les slides dans une taxonomie métier, à l’échelle de plus de 250 000 slides (environ 1 500 missions).",
      contrainte: "RGPD strict : le client refuse tout transfert de données hors UE. Coût des appels LLM à maîtriser sur une volumétrie massive.",
      approche: [
        "Pipeline cost-aware en cascade : regex → embeddings → arbitre LLM appelé uniquement sur les cas ambigus.",
        "Embeddings BGE-M3 exécutés en local et anonymisation systématique (spaCy + GLiNER) avant tout appel au LLM de vision (Mistral Pixtral, UE).",
        "Architecture hexagonale ; parallélisation par pool borné avec retry/backoff.",
      ],
      resultat: [
        "Classification automatique des slides dans la taxonomie métier, l’arbitre LLM n’étant sollicité que sur les cas ambigus pour garder le coût sous contrôle.",
        "Conformité RGPD de bout en bout : embeddings calculés en local et anonymisation avant tout appel au LLM, aucune donnée client ne quitte l’UE.",
      ],
    },
    igam: {
      tags: ['NLP', 'Non supervisé', 'ML', 'RGPD'],
      title: 'Détection NLP non supervisée de sujets récurrents',
      task: "Pipeline NLP non supervisé, de bout en bout, pour cartographier les sujets récurrents du flux d’emails entrant d’un cabinet d’expertise comptable.",
      headline: { value: 'De bout en bout', label: 'pipeline NLP non supervisé' },
      metrics: [
        { value: 'ARI 0.88', label: 'qualité clustering' },
        { value: 'F1 0.94', label: 'sur corpus labellisé' },
        { value: '43 000', label: 'emails réels traités' },
      ],
      probleme: "Cartographier les sujets récurrents du flux d’emails entrant d’un cabinet de paie / gestion sociale, sans aucun jeu de labels existant.",
      contrainte: "Apprentissage non supervisé (aucune vérité terrain), données de paie ultra-sensibles (RGPD), et nécessité de passer à l’échelle.",
      approche: [
        "Pipeline conçu de bout en bout : ingestion (Microsoft Graph API) → anonymisation RGPD → embeddings → clustering → nommage par LLM → dataviz.",
        "Embeddings BGE-M3 auto-hébergés, réduction UMAP + clustering HDBSCAN, nommage des clusters par LLM.",
        "Anonymisation Presidio + spaCy FR + détecteurs à checksum (NIR, IBAN, SIRET, CB).",
      ],
      resultat: [
        "Qualité du modèle validée sur un corpus synthétique labellisé : ARI 0,88 / F1 0,94.",
        "Passage à l’échelle sur ~43 000 emails réels, avec hiérarchie de thèmes macro → micro et exécutions reproductibles (caches disque).",
      ],
    },
    'immo-score': {
      tags: ['Data pipeline', 'Multi-sources', 'LLM', 'GCP'],
      title: 'Scoring immobilier territorial multi-sources',
      task: "Développé sur 7 mois une chaîne complète data → décision évaluant l’attractivité immobilière d’une commune.",
      headline: { value: '7 mois', label: 'chaîne data → décision' },
      metrics: [
        { value: '~10', label: 'sources hétérogènes' },
        { value: '7 mois', label: 'de développement' },
        { value: 'data → décision', label: 'chaîne complète' },
      ],
      probleme: "Évaluer l’attractivité immobilière d’une commune pour décider d’investissements, via une chaîne complète allant de la donnée brute à la décision.",
      contrainte: "Une dizaine de sources hétérogènes, dont des plateformes authentifiées ; ambiguïté des communes homonymes ; projet long mené sur 7 mois.",
      approche: [
        "Intégration d’~10 sources (INSEE, BPE, Sitadel…) et scrapers de plateformes authentifiées (Playwright / Selenium).",
        "Moteur de scoring paramétrable : règles externalisées en Firestore, éditables par les administrateurs.",
        "Analyse LLM produisant un rapport d’investissement ; orchestration n8n, déploiement GCP / Firestore.",
      ],
      resultat: [
        "Application complète en production : géocodage → commune de référence → collecte → scoring → rapport.",
        "Bug critique de communes homonymes résolu en propageant une clé EPCI non ambiguë du géocodage jusqu’à l’interface.",
      ],
    },
  },

  en: {
    'cgr-rfq': {
      tags: ['Vision LLM', 'Full-stack', 'Evaluation', 'Production'],
      title: 'LLM extraction of technical data for industrial quoting',
      task: 'Read heterogeneous technical drawings with a vision LLM and extract structured data to automatically feed the quoting calculator.',
      headline: { value: 'In prod', label: 'AI document extraction' },
      metrics: [
        { value: '85–96 %', label: 'measured accuracy' },
        { value: 'EU', label: 'data residency' },
        { value: '288', label: 'material grades' },
      ],
      probleme: 'Automate industrial quoting by extracting technical data (dimensions, loads, tolerances, materials) from highly heterogeneous documents, to feed the in-house “E8” calculator without manual re-entry.',
      contrainte: 'Documents in varied formats, data that must stay within the European Union, materials expressed as free text to be normalised, and a requirement for field-by-field measurable accuracy.',
      approche: [
        'Production extraction pipeline with a vision LLM (Gemini, chosen for EU data residency and its ability to read technical drawings).',
        'Structured, typed outputs (Pydantic), a versioned data schema, and iterative prompt engineering.',
        'Hardened extraction with fuzzy matching (rapidfuzz) of a free-text material against a catalogue of 288 client grades, plus physical unit conversion (metric ↔ imperial).',
        'Evaluation system objectively measuring field-by-field accuracy (in-house comparison engine, then Langfuse).',
      ],
      resultat: [
        'Extraction accuracy measured at 85 to 96 % depending on the documents.',
        'Full-stack application delivered: FastAPI / SQLAlchemy async / PostgreSQL, React 19 / TanStack / Tailwind, containerised (Docker, Dokploy), Clerk auth, S3 storage (SHA-256 deduplication), Logfire observability.',
      ],
    },
    oderis: {
      tags: ['LLM', 'GDPR', 'Architecture', 'Scale'],
      title: 'AI classification of slides at scale for due diligence',
      task: 'Automatically file Vendor Due Diligence report slides into a business taxonomy, at the scale of 250,000+ slides, while keeping LLM call costs under control.',
      headline: { value: 'At scale', label: 'AI document classification' },
      metrics: [
        { value: '250 000+', label: 'slides (≈ 1,500 missions)' },
        { value: 'GDPR', label: 'embeddings computed locally' },
        { value: 'cost-aware', label: 'LLM arbiter on ambiguous cases' },
      ],
      probleme: 'Capitalise on Vendor Due Diligence reports by automatically classifying slides into a business taxonomy, at the scale of 250,000+ slides (around 1,500 missions).',
      contrainte: 'Strict GDPR: the client refuses any data transfer outside the EU. LLM call costs to be kept under control over a massive volume.',
      approche: [
        'Cost-aware cascade pipeline: regex → embeddings → LLM arbiter called only on ambiguous cases.',
        'BGE-M3 embeddings run locally and systematic anonymisation (spaCy + GLiNER) before any call to the vision LLM (Mistral Pixtral, EU).',
        'Hexagonal architecture; parallelisation via a bounded pool with retry/backoff.',
      ],
      resultat: [
        'Automatic classification of slides into the business taxonomy, with the LLM arbiter used only on ambiguous cases to keep cost under control.',
        'End-to-end GDPR compliance: embeddings computed locally and anonymisation before any LLM call — no client data leaves the EU.',
      ],
    },
    igam: {
      tags: ['NLP', 'Unsupervised', 'ML', 'GDPR'],
      title: 'Unsupervised NLP detection of recurring topics',
      task: 'An end-to-end unsupervised NLP pipeline to map the recurring topics in the inbound email flow of an accounting firm.',
      headline: { value: 'End to end', label: 'unsupervised NLP pipeline' },
      metrics: [
        { value: 'ARI 0.88', label: 'clustering quality' },
        { value: 'F1 0.94', label: 'on labelled corpus' },
        { value: '43 000', label: 'real emails processed' },
      ],
      probleme: 'Map the recurring topics in the inbound email flow of a payroll / social-management firm, with no existing label set.',
      contrainte: 'Unsupervised learning (no ground truth), ultra-sensitive payroll data (GDPR), and the need to scale.',
      approche: [
        'Pipeline designed end to end: ingestion (Microsoft Graph API) → GDPR anonymisation → embeddings → clustering → LLM naming → dataviz.',
        'Self-hosted BGE-M3 embeddings, UMAP reduction + HDBSCAN clustering, cluster naming by LLM.',
        'Anonymisation with Presidio + spaCy FR + checksum detectors (NIR, IBAN, SIRET, card numbers).',
      ],
      resultat: [
        'Model quality validated on a synthetic labelled corpus: ARI 0.88 / F1 0.94.',
        'Scaled to ~43,000 real emails, with a macro → micro topic hierarchy and reproducible runs (disk caches).',
      ],
    },
    'immo-score': {
      tags: ['Data pipeline', 'Multi-source', 'LLM', 'GCP'],
      title: 'Multi-source territorial real-estate scoring',
      task: 'Built over 7 months a full data → decision chain assessing the real-estate appeal of a municipality.',
      headline: { value: '7 months', label: 'data → decision chain' },
      metrics: [
        { value: '~10', label: 'heterogeneous sources' },
        { value: '7 months', label: 'of development' },
        { value: 'data → decision', label: 'complete chain' },
      ],
      probleme: 'Assess the real-estate appeal of a municipality to drive investment decisions, through a complete chain from raw data to decision.',
      contrainte: 'About ten heterogeneous sources, including authenticated platforms; ambiguity of homonymous municipalities; a long project run over 7 months.',
      approche: [
        'Integration of ~10 sources (INSEE, BPE, Sitadel…) and scrapers for authenticated platforms (Playwright / Selenium).',
        'Configurable scoring engine: rules externalised in Firestore, editable by administrators.',
        'LLM analysis producing an investment report; n8n orchestration, GCP / Firestore deployment.',
      ],
      resultat: [
        'Complete application in production: geocoding → reference municipality → collection → scoring → report.',
        'Critical homonymous-municipality bug fixed by propagating an unambiguous EPCI key from geocoding through to the interface.',
      ],
    },
  },
};

export function getProjects(locale: Locale): Project[] {
  return BASE.map((b) => ({ ...b, ...TR[locale][b.slug] }));
}

// ── Missions secondaires (cartes compactes) ──────────────────────────
export type Secondary = { client: string; monogram: string; website?: string; logo?: string; task: string; tags: string[] };

type SecondaryBase = Pick<Secondary, 'client' | 'monogram' | 'website' | 'logo'>;
const SEC_BASE: SecondaryBase[] = [
  { client: 'Vermon', monogram: 'VE', website: 'https://www.vermon.com', logo: '/logos/vermon.png' },
  { client: 'Naovie', monogram: 'NA', website: 'https://www.soutenir-naovie.fr', logo: '/logos/naovie.png' },
  { client: 'Loyoly', monogram: 'LO', website: 'https://www.loyoly.io', logo: '/logos/loyoly.png' },
  { client: 'MAIF', monogram: 'MA', website: 'https://www.maif.fr', logo: '/logos/maif.png' },
  { client: 'ADRÉ Eau', monogram: 'AE', website: 'https://www.adre-eau.fr', logo: '/logos/adre.png' },
];

const SEC_TR: Record<Locale, Record<string, { task: string; tags: string[] }>> = {
  fr: {
    Vermon: { task: 'Pipeline RAG à recherche hybride (Claude API, FAISS + BM25, fusion RRF) générant des fiches de Crédit Impôt Recherche, avec traçabilité des sources.', tags: ['RAG', 'FAISS'] },
    Naovie: { task: 'Fonds de dotation du CHU de Nantes : synchronisation des dons HelloAsso → CRM Youday (rétro-ingénierie d’API) avec idempotence robuste aux relances de webhook.', tags: ['Intégration', 'Webhooks'] },
    Loyoly: { task: 'Plateforme de fidélisation client : data platform event-driven sur GCP (RabbitMQ → Pub/Sub → BigQuery → Dataform), microservices Cloud Run, Terraform + CI/CD.', tags: ['Data platform', 'GCP'] },
    MAIF: { task: 'Démonstrateur « smartDevis » pour l’assureur MAIF : interface React de génération de devis assistée par LLM (saisie vocale, export PDF).', tags: ['React', 'LLM'] },
    'ADRÉ Eau': { task: 'Spécialiste de la recherche de fuite / dégâts des eaux : étude de faisabilité d’automatisation de 9 extranets prestataires (Playwright) ; login + lecture validés.', tags: ['Automation', 'Playwright'] },
  },
  en: {
    Vermon: { task: 'Hybrid-search RAG pipeline (Claude API, FAISS + BM25, RRF fusion) generating R&D Tax Credit (CIR) sheets, with source traceability.', tags: ['RAG', 'FAISS'] },
    Naovie: { task: 'CHU de Nantes endowment fund: syncing HelloAsso donations → Youday CRM (API reverse-engineering) with idempotency robust to webhook retries.', tags: ['Integration', 'Webhooks'] },
    Loyoly: { task: 'Customer-loyalty platform: event-driven data platform on GCP (RabbitMQ → Pub/Sub → BigQuery → Dataform), Cloud Run microservices, Terraform + CI/CD.', tags: ['Data platform', 'GCP'] },
    MAIF: { task: '“smartDevis” demonstrator for insurer MAIF: a React interface for LLM-assisted insurance quote generation (voice input, PDF export).', tags: ['React', 'LLM'] },
    'ADRÉ Eau': { task: 'Water-leak / water-damage specialist: feasibility study to automate 9 contractor extranets (Playwright); login + reading validated.', tags: ['Automation', 'Playwright'] },
  },
};

export function getSecondary(locale: Locale): Secondary[] {
  return SEC_BASE.map((b) => ({ ...b, ...SEC_TR[locale][b.client] }));
}

// ── Fil conducteur (problème → valeur) ───────────────────────────────
const FLOW_LABELS: Record<Locale, string[]> = {
  fr: ['Problème', 'Données', 'Modèle', 'Production', 'Valeur'],
  en: ['Problem', 'Data', 'Model', 'Production', 'Value'],
};
const FLOW_KEYS = ['probleme', 'donnees', 'modele', 'production', 'valeur'];

export function getFlow(locale: Locale): Stage[] {
  return FLOW_KEYS.map((key, i) => ({ key, label: FLOW_LABELS[locale][i] }));
}
