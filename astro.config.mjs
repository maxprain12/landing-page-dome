// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import { satteri } from "@astrojs/markdown-satteri";
import { dropLeadingH1 } from "./src/lib/mdast-drop-leading-h1.ts";

// https://astro.build/config
export default defineConfig({
  site: "https://dome.dowi.es",
  redirects: Object.fromEntries(
    ["", "/en"].flatMap((locale) => [
      ...Object.entries({
        cms: "/complementos/dome-cms#manual",
        complements: "/complementos#manual",
        extension: "/extension#manual",
        companion: "/companion#manual",
      }).map(([slug, destination]) => [
        `${locale}/manual/${slug}`,
        { status: 301, destination: `${locale}${destination}` },
      ]),
      ...Object.entries({ pro: "library", study: "learning", dev: "integrations" })
        .map(([from, to]) => [
          `${locale}/${from}`,
          { status: 301, destination: `${locale}/funciones/${to}` },
        ]),
    ]),
  ),
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    react(),
    mdx(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      filter: (page) =>
        !/\/manual\/(cms|complements|extension|companion)\/?$/.test(new URL(page).pathname) &&
        !page.includes("/pricing") &&
        !/\/(pro|study|dev)\/?$/.test(new URL(page).pathname),
      serialize(item) {
        // pathname: '/' (ES home) and '/en' (EN home) → priority 1
        // Previous check used .pop()==='' which never matched (host became last segment).
        const pathname = new URL(item.url).pathname.replace(/\/$/, "") || "/";
        if (pathname === "/" || pathname === "/en") {
          item.priority = 1;
        } else if (
          /\/(blog|manual)$/.test(pathname) ||
          /\/en\/(blog|manual)$/.test(pathname)
        ) {
          item.priority = 0.8;
        } else if (
          pathname.includes("/blog/") ||
          pathname.includes("/manual/")
        ) {
          item.priority = 0.6;
        }
        return item;
      },
      i18n: {
        defaultLocale: "es",
        locales: {
          es: "es",
          en: "en",
        },
      },
    }),
  ],
  markdown: {
    processor: satteri({
      mdastPlugins: [dropLeadingH1],
    }),
  },
  compressHTML: true,
  /** Acepta /terms y /terms/ (y privacy) en dev y evita 404; production sigue con _redirects en public */
  trailingSlash: "ignore",
  build: {
    inlineStylesheets: "auto",
    // directorio/privacy/index.html → /privacy/ resuelve bien con try_files $uri/; /privacy.html ya no existe
    format: "directory",
  },
});
