---
name: verify-landing
description: "Conduce la landing Astro de Dome en el puerto 4325 y deja evidencia de inicio, descarga, changelog y el enlace de login. Use when a change needs proof from the running marketing site."
---

# Verify landing

Superficie: el sitio Astro de Dome. El servidor de verificación es `astro preview` en `127.0.0.1:4325`. No reutilices el puerto 4321 (`pnpm run dev`) ni el 4322 de `playwright.config.ts`.

## Launch

Desde la raíz del repo:

```bash
node .cursor/skills/verify-landing/bin/verify.mjs launch
```

Si no existe `dist/index.html`, el script ejecuta `pnpm run build` y luego el preview. Listo cuando stdout contiene `verify-landing ready`. Si el puerto 4325 está ocupado, el script sale sin matar ese proceso.

## Doctor

```bash
node .cursor/skills/verify-landing/bin/verify.mjs doctor
```

Sale 0 solo si el listener del puerto 4325 pertenece al PID de `run.json` (o a su grupo) y `GET /` responde 200 con `lang="es"` y un solo `<h1`.

## Drive

Cada comando abre Chromium sin cabeza, carga una ruta de este preview y cierra ese navegador. No cierra el preview.

```bash
node .cursor/skills/verify-landing/bin/verify.mjs see --path / --selector 'h1' --count 1
node .cursor/skills/verify-landing/bin/verify.mjs see --path / --role link --name '/descargar|download/i'
node .cursor/skills/verify-landing/bin/verify.mjs attr --path / --selector 'a.nav-login' --attr href --matches '^https?://'
node .cursor/skills/verify-landing/bin/verify.mjs shot --path / --out .verify-evidence/home/home.png
```

`--name` entre barras es una regex. No abras el `href` de `a.nav-login`: sale del sitio.

Handles:

- Inicio: `html[lang=es]`, un `h1`, `#main-content`, enlace `/descargar|download/i`, `a.nav-login` con el texto «Iniciar sesión».
- Descarga: `/download`, `h1`, y `a.dl-download[data-download]` o `.dl-empty`.
- Changelog: `/changelog`, `h1`, y `[data-live-changelog]` o `.cl-empty`.

## Evidence

`.verify-evidence/<feature>/` en la raíz (gitignored). Guarda el stdout de `see` o `attr` con `--out` y una captura con `shot`. La prueba tiene que mostrar la acción y el estado, no solo la imagen final.

## Cleanup

```bash
node .cursor/skills/verify-landing/bin/verify.mjs cleanup
```

Mata el grupo del PID de `run.json` solo si ese grupo es quien escucha en el 4325. Borra `run.json` y `.verify-evidence/scratch/`. No borra `.verify-evidence/<feature>/`.

Después de cleanup, confirma que la captura sigue en su ruta.

## Helpers

```bash
node .cursor/skills/verify-landing/bin/verify.mjs launch
node .cursor/skills/verify-landing/bin/verify.mjs doctor
node .cursor/skills/verify-landing/bin/verify.mjs see --path / --role link --name '/descargar|download/i' --out .verify-evidence/home/home.txt
node .cursor/skills/verify-landing/bin/verify.mjs attr --path / --selector 'a.nav-login' --attr href --matches '^https?://'
node .cursor/skills/verify-landing/bin/verify.mjs shot --path /download --out .verify-evidence/download/download.png
node .cursor/skills/verify-landing/bin/verify.mjs cleanup
```

El navegador del harness es Google Chrome si está instalado (`channel: 'chrome'`). Si no, usa el Chromium de Playwright. Si ese binario no está, `pnpm exec playwright install chromium` y repite el comando.
