import type { APIRoute } from 'astro';
import { SITE } from '../config/site';

// robots.txt généré : autorise tout, dont les crawlers IA (GEO), + lien sitemap.
export const GET: APIRoute = () => {
  const sitemap = new URL('sitemap-index.xml', SITE.url).href;
  const body = `# robots.txt — ${SITE.name}
User-agent: *
Allow: /

# Crawlers IA explicitement autorisés (GEO / AI-SEO)
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

Sitemap: ${sitemap}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
