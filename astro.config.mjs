// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://pretoriasake.co.za',
  integrations: [
    react(),
    // /en/ pages are noindex scaffolding until the English copy exists — keep them out of the sitemap.
    // When EN goes live: remove the filter and add `i18n: { defaultLocale: 'af', locales: { af: 'af-ZA', en: 'en-ZA' } }`.
    sitemap({ filter: (page) => !/\/en(\/|$)/.test(new URL(page).pathname) }),
  ],
  i18n: {
    defaultLocale: 'af',
    locales: ['af', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  trailingSlash: 'never',
  build: { format: 'directory' },
});
