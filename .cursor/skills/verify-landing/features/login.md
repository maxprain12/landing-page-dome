# Login

La navegación enlaza con la cuenta de Dome. El destino está fuera de esta landing. La comprobación mira el `href` y el texto del enlace, y no abre Provider.

## Sub-features

- `login-label` muestra «Iniciar sesión».
- `login-href` apunta a una URL absoluta de la cuenta.

## How to get to it (user POV)

- Enlace «Iniciar sesión» de la barra de navegación, en escritorio y en el menú móvil.

## Driving it with verify-landing

Preconditions:

- `doctor` imprime `ok`.

- **Texto.** Run `node .cursor/skills/verify-landing/bin/verify.mjs see --path / --role link --name '/iniciar sesión|log in/i' --out .verify-evidence/login/login.txt`. El enlace es visible.
- **Destino.** Run `node .cursor/skills/verify-landing/bin/verify.mjs attr --path / --selector 'a.nav-login' --attr href --matches '^https?://.+/login' --out .verify-evidence/login/login.txt`. El `href` es absoluto y termina el camino en `/login`.
- **Proof.** Run `node .cursor/skills/verify-landing/bin/verify.mjs shot --path / --out .verify-evidence/login/login.png`. La captura es la portada con el enlace visible, no la página de Provider.

## Gotchas

- El valor por defecto del href es `https://dome-provider.dowi.es/login`. Un build con `PUBLIC_DOME_ACCOUNT_URL` puede apuntar a otro host. La prueba exige una URL absoluta que contenga `/login`, no un host fijo.
- No hagas clic en el enlace. No es una prueba de inicio de sesión.
- Hay dos `a.nav-login` (escritorio y móvil). `attr` lee el primero del DOM.
