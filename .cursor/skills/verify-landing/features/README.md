# Landing verification map

Fuente para comprobar lo que ve una persona en la landing. Una prueba de la home no cubre descarga, changelog ni el enlace de login.

## Baseline preconditions

- El preview lo arrancó `node .cursor/skills/verify-landing/bin/verify.mjs launch` en esta ejecución.
- `doctor` imprime `ok` para `http://127.0.0.1:4325`.
- No conduzcas el puerto 4321 ni el 4322.

## Driving conventions

- Cada comando carga la ruta indicada desde cero.
- Prefiere rol accesible. El locale por defecto es español.
- No sigas enlaces que salgan de `127.0.0.1:4325`.
- No borres `.verify-evidence/<feature>/` al limpiar.

## Proof and skip reporting

- Guarda el stdout (`--out`) y una captura.
- Si una ruta no está disponible, anota el comando y la precondición. No la des por verificada desde la home.

## Feature entry contract

Cada archivo tiene un H1, un párrafo y estos cuatro H2: `Sub-features`, `How to get to it (user POV)`, `Driving it with verify-landing`, `Gotchas`.

## Features

- [Inicio](./home.md) — portada en español con el enlace de descarga.
- [Descarga](./download.md) — página `/download`.
- [Changelog](./changelog.md) — página `/changelog`.
- [Login](./login.md) — enlace de la navegación hacia la cuenta. No entra en Provider.
