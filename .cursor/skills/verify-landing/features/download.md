# Descarga

`/download` lista los instaladores de la versión actual o explica que todavía no hay archivos.

## Sub-features

- `download-title` muestra un solo título.
- `download-asset` muestra un enlace `data-download` o el vacío `.dl-empty`.

## How to get to it (user POV)

- El enlace «Descargar Dome» de la portada y el CTA de la navegación apuntan a `/download`.
- Abrir `/download` directamente.

## Driving it with verify-landing

Preconditions:

- `doctor` imprime `ok`.

- **Título.** Run `node .cursor/skills/verify-landing/bin/verify.mjs see --path /download --selector 'h1' --count 1 --out .verify-evidence/download/download.txt`. Hay un título.
- **Instalador o vacío.** Run `node .cursor/skills/verify-landing/bin/verify.mjs see --path /download --selector 'a.dl-download[data-download], .dl-empty' --min-count 1 --out .verify-evidence/download/download.txt`. Aparece un botón de descarga o el estado vacío.
- **Proof.** Run `node .cursor/skills/verify-landing/bin/verify.mjs shot --path /download --out .verify-evidence/download/download.png`.

## Gotchas

- Los paneles de plataforma pueden estar ocultos salvo el activo. El selector acepta cualquier `a.dl-download[data-download]` visible. Si el primero del DOM está `hidden`, `see` espera al primero del locator y puede fallar. En ese caso usa `.dl-empty` solo si el índice de releases no trajo archivos; si hay archivos, el panel visible contiene el enlace.
- El índice de releases sale de `PUBLIC_RELEASES_INDEX_URL` o de `https://dl.dowi.es/index.json`, horneado en el build. Un índice vacío es un estado válido, no un fallo de la página.
