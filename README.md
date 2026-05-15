# Dome — Landing (sitio público)

Marketing y descarga de **Dome**, la aplicación de escritorio open source para gestión del conocimiento. Stack: **Astro 5**, React donde hace falta efectos Three.js, Tailwind/CSS variables en componentes.

## Cómo encaja con los otros repos

| Proyecto | Rol |
|---------|-----|
| [dome](../dome/) (Electron) | App instalable; opcionalmente se conecta al backend con cuenta en la nube |
| [dome-provider](../dome-provider/) | Backend Next.js (OAuth, IA con cuota, Stripe): URL base típica en prod `APP_URL` |
| **Este repo** | Página pública + enlaces a [GitHub Releases](https://github.com/maxprain12/dome/releases); sin dependencia obligatoria del provider |

Las rutas anteriores asumen los tres clones en el mismo directorio padre (p. ej. `~/Documents/dome`, `landing-page-dome`, `dome-provider`).

## Variables de entorno (opcional)

Creá `.env` en la raíz del proyecto:

```bash
# Base del provider (login, onboarding web)
PUBLIC_DOME_ACCOUNT_URL=https://provider.dome.app
# Opcional: URL al dashboard de uso/cuota del usuario
PUBLIC_DOME_USER_DASHBOARD_URL=https://provider.dome.app/dashboard
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
```

Para producción con `astro build`, el artefacto queda en `dist/`.

## Puertos típicos en desarrollo local (evitar confusiones)

| Servicio | Puerto habitual |
|---------|----------------|
| Esta landing (`astro dev`) | 4321 |
| Dome Desktop (solo Vite) | 5173 |
| Dome Provider (`pnpm run dev -- -p 3001`) | 3001 |

No coincide con `:3000` a propósito: a veces ese puerto está ocupado por otras herramientas.

## Repositorios y documentación

- Índice del ecosistema: [../dome/MASTER.md](../dome/MASTER.md)
- Integración Desktop ↔ Provider en el cliente: [../dome/docs/features/dome-provider-integration.md](../dome/docs/features/dome-provider-integration.md)
