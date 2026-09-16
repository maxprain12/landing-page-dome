---
name: dome-landing-design
description: Diseña o pule la landing Astro de Dome alineada con su marca. Use when editing src/components, hero, CTAs, motion, or marketing pages in landing-page-dome.
---

# Dome landing design

1. Lee tokens en `src/layouts/Layout.astro` y copy en `src/data/landing.ts`.
2. Jerarquía de conversión: Hero CTA → proof → final CTA.
3. Hex solo en `:root`. Componentes: `var(--color-*)`.
4. Accesibilidad: skip link, foco, aria localizado, reduced motion.
5. Corre `pnpm run verify`.
