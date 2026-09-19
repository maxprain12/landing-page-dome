# Dome landing — Agent protocol

Sitio público Astro. Canon visual: tokens en `src/layouts/Layout.astro` (`:root`). Tipografía Inter. CTAs pill. Motion en `src/scripts/landing-gsap.ts` (contenido visible sin JS).

```bash
pnpm run verify
```

`verify` = typecheck (si existe) + checks de marca/assets/huérfanos + build.

Login/account URLs: `PUBLIC_DOME_ACCOUNT_URL` (no hardcodear el provider en componentes). Sister repos: [dome](https://github.com/maxprain12/dome), [dome-provider](https://github.com/maxprain12/dome-provider), [dome-companion](https://github.com/maxprain12/dome-companion).
