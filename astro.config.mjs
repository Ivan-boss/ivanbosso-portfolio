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
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
