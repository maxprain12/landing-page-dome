# Inicio

La portada en español tiene un solo título, el contenido principal y un enlace para descargar Dome.

## Sub-features

- `home-lang` sirve la página con `lang="es"`.
- `home-title` muestra un solo `h1`.
- `home-download` muestra el enlace de descarga.

## How to get to it (user POV)

- Abrir la raíz del sitio.
- El logo de la navegación también vuelve a la raíz.

## Driving it with verify-landing

Preconditions:

- `doctor` imprime `ok`.

- **Idioma y título.** Run `node .cursor/skills/verify-landing/bin/verify.mjs doctor`. Imprime `lang=es` y `h1=1`.
- **Descarga.** Run `node .cursor/skills/verify-landing/bin/verify.mjs see --path / --role link --name '/descargar|download/i' --out .verify-evidence/home/home.txt`. El enlace es visible.
- **Contenido.** Run `node .cursor/skills/verify-landing/bin/verify.mjs see --path / --selector '#main-content' --out .verify-evidence/home/home.txt`. El `main` es visible.
- **Proof.** Run `node .cursor/skills/verify-landing/bin/verify.mjs shot --path / --out .verify-evidence/home/home.png`.

## Gotchas

- Hay más de un enlace cuyo nombre coincide con descargar (navegación y héroe). `see` comprueba que al menos uno es visible.
- El botón de menú en móvil se llama «Abrir menú». Esta prueba usa el viewport de escritorio de Chromium sin cabeza.
