# Dome landing — Agent protocol

Sitio público Astro. Canon visual: tokens en `src/layouts/Layout.astro` (`:root`). Tipografía Inter. CTAs pill. Motion en `src/scripts/landing-gsap.ts` (contenido visible sin JS).

```bash
pnpm run verify
```

`verify` = typecheck (si existe) + checks de marca/assets/huérfanos/social-drafts + build.

Packs sociales: `public/social-drafts/` + `pnpm run check:social-drafts`. No publicar sin `VALIDATION.md` firmado (puerta 5: escenario PDF+persona concreto y UI Dome real, sin jerga SaaS; secuencia 1→2→3; formato cerrado; tokens Many lima/oliva + Inter).

Login/account URLs: `PUBLIC_DOME_ACCOUNT_URL` (no hardcodear el provider en componentes). Sister repos: [dome](https://github.com/maxprain12/dome), [dome-provider](https://github.com/maxprain12/dome-provider), [dome-companion](https://github.com/maxprain12/dome-companion).
