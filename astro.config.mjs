// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://dome.dowi.es',
  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  compressHTML: true,
  /** Acepta /terms y /terms/ (y privacy) en dev y evita 404; production sigue con _redirects en public */
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto',
    // directorio/privacy/index.html → /privacy/ resuelve bien con try_files $uri/; /privacy.html ya no existe
    format: 'directory',
  },
});
