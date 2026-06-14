// Stack technique affiché avec logos. Modulaire : ajouter un outil = ajouter une ligne.
// slug = identifiant simple-icons (https://simpleicons.org). Laisser slug vide = fallback texte.

export type Tool = { name: string; slug: string };

export const STACK: { group: string; items: Tool[] }[] = [
  {
    group: 'IA / ML',
    items: [
      { name: 'Python', slug: 'python' },
      { name: 'PyTorch', slug: 'pytorch' },
      { name: 'scikit-learn', slug: 'scikitlearn' },
      { name: 'Hugging Face', slug: 'huggingface' },
      { name: 'OpenAI', slug: 'openai' },
      { name: 'pandas', slug: 'pandas' },
    ],
  },
  {
    group: 'Backend & Data',
    items: [
      { name: 'FastAPI', slug: 'fastapi' },
      { name: 'PostgreSQL', slug: 'postgresql' },
      { name: 'Google Cloud', slug: 'googlecloud' },
      { name: 'Docker', slug: 'docker' },
      { name: 'n8n', slug: 'n8n' },
      { name: 'Terraform', slug: 'terraform' },
    ],
  },
  {
    group: 'Frontend & outils',
    items: [
      { name: 'React', slug: 'react' },
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'Tailwind CSS', slug: 'tailwindcss' },
      { name: 'Git', slug: 'git' },
      { name: 'GitHub Actions', slug: 'githubactions' },
    ],
  },
];
