// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://dome.dowi.es',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    react(),
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      filter: (page) => !page.includes('/pricing'),
      serialize(item) {
        // pathname: '/' (ES home) and '/en' (EN home) → priority 1
        // Previous check used .pop()==='' which never matched (host became last segment).
        const pathname = new URL(item.url).pathname.replace(/\/$/, '') || '/';
        if (pathname === '/' || pathname === '/en') {
          item.priority = 1;
        } else if (/\/(blog|manual)$/.test(pathname) || /\/en\/(blog|manual)$/.test(pathname)) {
          item.priority = 0.8;
        } else if (pathname.includes('/blog/') || pathname.includes('/manual/')) {
          item.priority = 0.6;
        }
        return item;
      },
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es',
          en: 'en',
        },
      },
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
