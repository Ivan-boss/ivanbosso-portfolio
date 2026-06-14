// Source unique de vérité du contenu portfolio.
// Règle confidentialité : noms + logos clients OK (réf « ils nous ont fait confiance »,
// missions menées chez IOD) ; on garde métriques/ROI ; on retire les détails confidentiels.

export type Stage = {
  key: 'probleme' | 'donnees' | 'modele' | 'production' | 'valeur';
  label: string;
};

export const FLOW: Stage[] = [
  { key: 'probleme', label: 'Problème' },
  { key: 'donnees', label: 'Données' },
  { key: 'modele', label: 'Modèle' },
  { key: 'production', label: 'Production' },
  { key: 'valeur', label: 'Valeur' },
];

export type Metric = { value: string; label: string };

export type Project = {
  slug: string;
  client: string;
  monogram: string; // logo de substitution (en attendant les vrais fichiers)
  logo?: string; // chemin du vrai logo, ex. '/logos/cgr.svg' (déposer dans public/logos/)
  domain: 'IA' | 'Data';
  tags: string[];
  title: string;
  task: string; // la « big line » : ce qu'il a fait, en une phrase
  headline: Metric; // métrique vedette de la carte
  metrics: Metric[]; // badges en tête de l'étude de cas
  probleme: string;
  contrainte: string;
  approche: string[];
  resultat: string[];
  stack: string[];
  featured: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: 'cgr-rfq',
    client: 'CGR International',
    monogram: 'CGR',
    domain: 'IA',
    tags: ['LLM Vision', 'Full-stack', 'Évaluation', 'Production'],
    title: 'Extraction LLM de données techniques pour la cotation industrielle',
    task: "Lire des plans techniques hétérogènes avec un LLM de vision et en extraire des données structurées pour alimenter automatiquement le calculateur de cotation.",
    headline: { value: 'En prod', label: 'extraction documentaire par IA' },
    metrics: [
      { value: '85–96 %', label: 'précision mesurée' },
      { value: 'UE', label: 'données résidentes' },
      { value: '288', label: 'nuances matériaux' },
    ],
    probleme:
      "Automatiser la cotation industrielle en extrayant les données techniques (dimensions, charges, tolérances, matériaux) depuis des documents très hétérogènes, pour alimenter le calculateur métier « E8 » sans ressaisie manuelle.",
    contrainte:
      "Documents de formats variés, données devant rester en Union Européenne, matériaux exprimés en texte libre à normaliser, et exigence d’une précision mesurable champ par champ.",
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
    stack: ['Gemini', 'PostgreSQL', 'FastAPI', 'React 19', 'Langfuse', 'Logfire', 'Docker'],
    featured: true,
  },
  {
    slug: 'oderis',
    client: 'ODERIS',
    monogram: 'OD',
    domain: 'IA',
    tags: ['LLM', 'RGPD', 'Architecture', 'Échelle'],
    title: 'Classification IA de slides à l’échelle pour la due diligence',
    task: "Ranger automatiquement les slides de rapports de Vendor Due Diligence dans une taxonomie métier, à l’échelle de plus de 250 000 slides, en maîtrisant le coût des appels au LLM.",
    headline: { value: 'Grande échelle', label: 'classification IA de documents' },
    metrics: [
      { value: '250 000+', label: 'slides (≈ 1 500 missions)' },
      { value: 'RGPD', label: 'embeddings calculés en local' },
      { value: 'cost-aware', label: 'arbitre LLM sur les cas ambigus' },
    ],
    probleme:
      "Capitaliser les rapports de Vendor Due Diligence en classant automatiquement les slides dans une taxonomie métier, à l’échelle de plus de 250 000 slides (environ 1 500 missions).",
    contrainte:
      "RGPD strict : le client refuse tout transfert de données hors UE. Coût des appels LLM à maîtriser sur une volumétrie massive.",
    approche: [
      "Pipeline cost-aware en cascade : regex → embeddings → arbitre LLM appelé uniquement sur les cas ambigus.",
      "Embeddings BGE-M3 exécutés en local et anonymisation systématique (spaCy + GLiNER) avant tout appel au LLM de vision (Mistral Pixtral, UE).",
      "Architecture hexagonale ; parallélisation par pool borné avec retry/backoff.",
    ],
    resultat: [
      "Classification automatique des slides dans la taxonomie métier, l’arbitre LLM n’étant sollicité que sur les cas ambigus pour garder le coût sous contrôle.",
      "Conformité RGPD de bout en bout : embeddings calculés en local et anonymisation avant tout appel au LLM, aucune donnée client ne quitte l’UE.",
    ],
    stack: ['Mistral Pixtral', 'BGE-M3 (local)', 'PostgreSQL', 'pgvector', 'Archi hexagonale', 'SigNoz'],
    featured: true,
  },
  {
    slug: 'igam',
    client: 'IGAM',
    monogram: 'IG',
    domain: 'Data',
    tags: ['NLP', 'Non supervisé', 'ML', '100 % solo'],
    title: 'Détection NLP non supervisée de sujets récurrents',
    task: "Conçu seul, de bout en bout, un pipeline NLP non supervisé pour cartographier les sujets récurrents du flux d’emails entrant d’un cabinet paie/social.",
    headline: { value: '100 % solo', label: 'détection automatique de thèmes' },
    metrics: [
      { value: 'ARI 0.88', label: 'qualité clustering' },
      { value: 'F1 0.94', label: 'sur corpus labellisé' },
      { value: '43 000', label: 'emails réels traités' },
    ],
    probleme:
      "Cartographier les sujets récurrents du flux d’emails entrant d’un cabinet de paie / gestion sociale, sans aucun jeu de labels existant.",
    contrainte:
      "Apprentissage non supervisé (aucune vérité terrain), données de paie ultra-sensibles (RGPD), et nécessité de passer à l’échelle.",
    approche: [
      "Pipeline conçu seul de bout en bout : ingestion (Microsoft Graph API) → anonymisation RGPD → embeddings → clustering → nommage par LLM → dataviz.",
      "Embeddings BGE-M3 auto-hébergés, réduction UMAP + clustering HDBSCAN, nommage des clusters par LLM.",
      "Anonymisation Presidio + spaCy FR + détecteurs à checksum (NIR, IBAN, SIRET, CB).",
    ],
    resultat: [
      "Qualité du modèle validée sur un corpus synthétique labellisé : ARI 0,88 / F1 0,94.",
      "Passage à l’échelle sur ~43 000 emails réels, avec hiérarchie de thèmes macro → micro et exécutions reproductibles (caches disque).",
    ],
    stack: ['BGE-M3', 'UMAP', 'HDBSCAN', 'spaCy', 'Presidio', 'Microsoft Graph'],
    featured: true,
  },
  {
    slug: 'immo-score',
    client: 'Valloire Habitat',
    monogram: 'VH',
    domain: 'Data',
    tags: ['Data pipeline', 'Multi-sources', 'LLM', 'GCP'],
    title: 'Scoring immobilier territorial multi-sources',
    task: "Développé (contributeur quasi-unique, 7 mois) une chaîne complète data → décision évaluant l’attractivité immobilière d’une commune.",
    headline: { value: '7 mois', label: 'chaîne data → décision' },
    metrics: [
      { value: '~10', label: 'sources hétérogènes' },
      { value: '7 mois', label: 'de développement' },
      { value: 'data → décision', label: 'chaîne complète' },
    ],
    probleme:
      "Évaluer l’attractivité immobilière d’une commune pour décider d’investissements, via une chaîne complète allant de la donnée brute à la décision.",
    contrainte:
      "Une dizaine de sources hétérogènes, dont des plateformes authentifiées ; ambiguïté des communes homonymes ; projet long mené sur 7 mois.",
    approche: [
      "Intégration d’~10 sources (INSEE, BPE, Sitadel…) et scrapers de plateformes authentifiées (Playwright / Selenium).",
      "Moteur de scoring paramétrable : règles externalisées en Firestore, éditables par les administrateurs.",
      "Analyse LLM produisant un rapport d’investissement ; orchestration n8n, déploiement GCP / Firestore.",
    ],
    resultat: [
      "Application complète en production : géocodage → commune de référence → collecte → scoring → rapport.",
      "Bug critique de communes homonymes résolu en propageant une clé EPCI non ambiguë du géocodage jusqu’à l’interface.",
    ],
    stack: ['Python', 'n8n', 'GCP', 'Firestore', 'Playwright', 'OpenAI'],
    featured: true,
  },
];

// Missions secondaires — cartes compactes (polyvalence)
export const SECONDARY = [
  { client: 'Vermon', task: 'Pipeline RAG à recherche hybride (Claude API, FAISS + BM25, fusion RRF) générant des fiches de Crédit Impôt Recherche, avec traçabilité des sources.', tags: ['RAG', 'FAISS'] },
  { client: 'Naovie', task: 'Synchronisation HelloAsso → CRM Youday (rétro-ingénierie d’API) avec idempotence robuste aux relances de webhook.', tags: ['Intégration', 'Webhooks'] },
  { client: 'Loyoly', task: 'Data platform event-driven sur GCP (RabbitMQ → Pub/Sub → BigQuery → Dataform), microservices Cloud Run, Terraform + CI/CD.', tags: ['Data platform', 'GCP'] },
  { client: 'smartDevis', task: 'Interface React de génération de devis assistée par LLM (saisie vocale, export PDF).', tags: ['React', 'LLM'] },
  { client: 'Adreau', task: 'Étude de faisabilité d’automatisation de 9 extranets prestataires (Playwright) ; login + lecture validés.', tags: ['Automation', 'Playwright'] },
];
