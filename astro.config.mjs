import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/config/site.ts';

// `site` = domaine de production (utilisé par le sitemap et les URL canoniques).
// Source unique : src/config/site.ts → SITE.url. Mettre le vrai domaine une fois acheté.
// https://astro.build
export default defineConfig({
  site: SITE.url,
  // FR par défaut à la racine (/), EN sous /en/ — pas de préfixe pour la langue par défaut.
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
