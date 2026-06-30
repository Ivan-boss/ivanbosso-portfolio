// Stack technique affiché avec logos. Modulaire : ajouter un outil = ajouter une ligne.
// slug = identifiant simple-icons (https://simpleicons.org). Laisser slug vide = fallback texte.
// icon = nom d'icône (src/components/Icon.astro) ; c = couleur d'accent du bloc.

// slug = simple-icons ; logo = chemin local (override, ex. /logos/x.svg) si pas de slug officiel.
import type { Locale } from '../i18n/config';
export type Tool = { name: string; slug: string; logo?: string };
export type StackGroup = { group: string; icon: string; c: 'accent-bright' | 'citron'; items: Tool[] };

// Noms de groupes traduits (les items = noms d'outils, non traduits).
const GROUP_LABEL: Record<string, Record<Locale, string>> = {
  cpu: { fr: 'IA / ML', en: 'AI / ML' },
  database: { fr: 'Backend & Data', en: 'Backend & Data' },
  cloud: { fr: 'Cloud & DevOps', en: 'Cloud & DevOps' },
  code: { fr: 'Dev & IA augmentée', en: 'Dev & AI-augmented' },
};

/** Stack avec les noms de groupes dans la langue demandée. */
export function getStack(locale: Locale): StackGroup[] {
  return STACK.map((g) => ({ ...g, group: GROUP_LABEL[g.icon]?.[locale] ?? g.group }));
}

export const STACK: StackGroup[] = [
  {
    group: 'IA / ML',
    icon: 'cpu',
    c: 'accent-bright',
    items: [
      { name: 'Python', slug: 'python' },
      { name: 'PyTorch', slug: 'pytorch' },
      { name: 'scikit-learn', slug: 'scikitlearn' },
      { name: 'Hugging Face', slug: 'huggingface' },
      { name: 'OpenAI', slug: 'openai' },
      { name: 'Anthropic', slug: 'anthropic' },
      { name: 'spaCy', slug: 'spacy' },
      { name: 'pandas', slug: 'pandas' },
      { name: 'NumPy', slug: 'numpy' },
    ],
  },
  {
    group: 'Backend & Data',
    icon: 'database',
    c: 'citron',
    items: [
      { name: 'FastAPI', slug: 'fastapi' },
      { name: 'Pydantic', slug: 'pydantic' },
      { name: 'SQLAlchemy', slug: 'sqlalchemy' },
      { name: 'PostgreSQL', slug: 'postgresql' },
      { name: 'MongoDB', slug: 'mongodb' },
      { name: 'BigQuery', slug: 'googlebigquery' },
      { name: 'dbt', slug: '' },
      { name: 'Firebase', slug: 'firebase' },
      { name: 'RabbitMQ', slug: 'rabbitmq' },
      { name: 'n8n', slug: 'n8n' },
    ],
  },
  {
    group: 'Cloud & DevOps',
    icon: 'cloud',
    c: 'accent-bright',
    items: [
      { name: 'Google Cloud', slug: 'googlecloud' },
      { name: 'Docker', slug: 'docker' },
      { name: 'Terraform', slug: 'terraform' },
      { name: 'GitHub Actions', slug: 'githubactions' },
      { name: 'Linux', slug: 'linux' },
      { name: 'Git', slug: 'git' },
    ],
  },
  {
    group: 'Dev & IA augmentée',
    icon: 'code',
    c: 'citron',
    items: [
      { name: 'Claude Code', slug: 'claude' },
      { name: 'VS Code', slug: '', logo: '/logos/vscode.svg' },
      { name: 'React', slug: 'react' },
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'Tailwind CSS', slug: 'tailwindcss' },
      { name: 'Vite', slug: 'vite' },
      { name: 'Streamlit', slug: 'streamlit' },
      { name: 'Playwright', slug: 'playwright' },
      { name: 'Selenium', slug: 'selenium' },
    ],
  },
];
