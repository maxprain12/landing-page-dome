# Changelog

`/changelog` muestra las versiones publicadas o un estado vacío, con un solo título.

## Sub-features

- `changelog-title` muestra un solo título.
- `changelog-list` muestra `[data-live-changelog]` o `.cl-empty`.

## How to get to it (user POV)

- Menú de recursos de la navegación, entrada del changelog.
- Abrir `/changelog` directamente.
- El enlace de versión en `/download` apunta a `/changelog#v<versión>` cuando hay una release.

## Driving it with verify-landing

Preconditions:

- `doctor` imprime `ok`.

- **Título.** Run `node .cursor/skills/verify-landing/bin/verify.mjs see --path /changelog --selector 'h1' --count 1 --out .verify-evidence/changelog/changelog.txt`. Hay un título.
- **Lista o vacío.** Run `node .cursor/skills/verify-landing/bin/verify.mjs see --path /changelog --selector '[data-live-changelog], .cl-empty' --min-count 1 --out .verify-evidence/changelog/changelog.txt`. Hay entradas o el estado vacío.
- **Proof.** Run `node .cursor/skills/verify-landing/bin/verify.mjs shot --path /changelog --out .verify-evidence/changelog/changelog.png`.

## Gotchas

- La página en inglés es `/en/changelog`. Esta comprobación usa el locale por defecto, sin prefijo.
- Un índice de releases caído en el momento del build deja el snapshot vacío. El `h1` sigue siendo la prueba de que la página cargó. No marques las entradas como verificadas si solo está `.cl-empty`.
