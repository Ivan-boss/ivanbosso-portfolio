import type { APIRoute } from 'astro';
import { SITE } from '../config/site';
import { getProjects } from '../data/projects';

// llms.txt : résumé structuré lisible par les moteurs IA (ChatGPT, Perplexity, Claude…).
// Convention llmstxt.org — généré depuis les données du site (source unique).
export const GET: APIRoute = () => {
  const projLines = getProjects('fr').map(
    (p) => `- [${p.client} — ${p.title}](${new URL('/portfolio/' + p.slug, SITE.url).href}) : ${p.task}`
  ).join('\n');

  const body = `# Ivan Bosso — Ingénieur Data / IA

> ${SITE.tagline} Basé à ${SITE.location}. Je conçois et déploie en production des solutions data et IA (LLM, RAG, NLP, scoring), du POC au déploiement, avec une obsession pour la valeur métier mesurée.

## À propos
Ivan Bosso est ingénieur Data/IA en alternance chez IOD Solutions (cabinet de conseil data & IA), élève-ingénieur à Polytech Nantes. Il met des modèles d'IA en production pour des clients de secteurs variés (industrie, paie/gestion sociale, assurance, immobilier social), avec une exigence de résultats chiffrés, de conformité RGPD et d'observabilité.

## Projets (études de cas)
${projLines}

## Compétences
LLM en production (Gemini, Mistral/Pixtral, OpenAI, Claude), RAG, NLP, clustering non supervisé, évaluation et MLOps (Langfuse), data engineering (FastAPI, PostgreSQL, BigQuery, n8n), cloud (GCP, Docker, Terraform), full-stack (React, TypeScript).

## Contact
- Site : ${SITE.url}
- Email : ${SITE.email}
- LinkedIn : ${SITE.linkedin}
- CV : ${new URL('/cv', SITE.url).href}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
