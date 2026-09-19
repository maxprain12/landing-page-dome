# Dome — Landing (sitio público)

Marketing y descarga de **Dome**, workspace local-first para founder-creadores: documentos y personas. Stack: **Astro**, React donde hace falta, CSS variables en `Layout.astro`.

## Cómo encaja con los otros repos

| Proyecto | Rol |
|---------|-----|
| [dome](https://github.com/maxprain12/dome) (Electron) | App instalable; opcionalmente se conecta al backend con cuenta en la nube |
| [dome-provider](https://github.com/maxprain12/dome-provider) | Backend Next.js (OAuth, IA con cuota, Stripe): URL base típica en prod `APP_URL` |
| [dome-companion](https://github.com/maxprain12/dome-companion) | App iOS de acompañamiento (SwiftUI); auth y chat vía Provider |
| **Este repo** | Página pública + enlaces a [GitHub Releases](https://github.com/maxprain12/dome/releases); sin dependencia obligatoria del provider |

En desarrollo local, los clones suelen vivir en el mismo directorio padre. Los enlaces de esta tabla apuntan a GitHub para que funcionen fuera de un checkout local.

## Variables de entorno (opcional)

Creá `.env` en la raíz del proyecto:

```bash
# Base del provider (login, onboarding web)
PUBLIC_DOME_ACCOUNT_URL=https://dome-provider.dowi.es
# Opcional: URL al dashboard de uso/cuota del usuario
PUBLIC_DOME_USER_DASHBOARD_URL=https://dome-provider.dowi.es/dashboard
```

- **Cloud account** navega a `PUBLIC_DOME_ACCOUNT_URL`.
- **Usage & billing** sólo aparece si definís `PUBLIC_DOME_USER_DASHBOARD_URL`. No enlazamos públicamente rutas `/admin`; operadores van a login como el resto de usuarios.

Ver [.env.example](./.env.example).

## Scripts

Requisitos: **Node.js 22.13+** (pnpm 11) y **pnpm**.

```bash
pnpm install
pnpm run dev       # http://localhost:4321 (Astro por defecto)
pnpm run build
pnpm run preview
pnpm run verify    # guardrails + astro check + build
```

Blog y manuales se editan en `src/content/`. Guía: [docs/content.md](./docs/content.md).

Para producción con `astro build`, el artefacto queda en `dist/`.

## Puertos típicos en desarrollo local (evitar confusiones)

| Servicio | Puerto habitual |
|---------|----------------|
| Esta landing (`astro dev`) | 4321 |
| Dome Desktop (solo Vite) | 5173 |
| Dome Provider (`pnpm run dev -- -p 3001`) | 3001 |

No coincide con `:3000` a propósito: a veces ese puerto está ocupado por otras herramientas.

## Repositorios y documentación

- Índice del ecosistema: [MASTER.md](https://github.com/maxprain12/dome/blob/main/MASTER.md)
- Integración Desktop ↔ Provider en el cliente: [dome-provider-integration.md](https://github.com/maxprain12/dome/blob/main/docs/features/dome-provider-integration.md)
- Companion (iOS): [dome-companion](https://github.com/maxprain12/dome-companion)
