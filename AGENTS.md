# AGENTS.md

> Instrucciones para harnesses de IA en este repo (parte del ecosistema Dome).

## dome-meta — memoria cross-repo (úsala AUTOMÁTICAMENTE, sin que el usuario lo pida)

Dome son **4 repos**: `dome` (app Electron/React), `dome-provider` (backend Next.js+Supabase), `dome-companion` (iOS SwiftUI), `landing-page-dome` (Astro). **Cada repo solo se ve a sí mismo.** `dome-meta` (en `/Users/maxprain/Documents/dome-meta`) es la **fuente de verdad cross-repo**: KB+RAG de los 4 repos, contratos (rutas API, canales IPC, deep links `dome://`, tablas), mapa de integración y generador de planes.

**Consúltala al INICIO de cada tarea, de forma proactiva** — no esperes a que el usuario lo pida:

- **Antes de implementar/modificar una feature o arreglar un bug** → `get_plan` (plan paso-a-paso) o `get_brief` (orientación) con la descripción de la tarea.
- **¿No sabes dónde vive una lógica?** → `kb_search` (recupera **código real** cross-repo, no solo docs).
- **¿La tarea toca integración** (auth/OAuth, REST `/api/v1/*`, deep links `dome://`, cuota, cloud sync, billing)**?** → `get_integration_map` y `list_contracts`, para no romper el contrato en el otro repo.
- **Al empezar a trabajar** → `freshness`; si la KB está desactualizada, ejecuta `dome-meta sync` antes de fiarte de los resultados.

**Cómo — MCP (ya registrado a nivel usuario; herramientas `mcp__dome-meta__*`):**
`get_brief`, `get_plan`, `kb_search`, `get_integration_map`, `list_contracts`, `repo_overview`, `freshness`.

**Fallback CLI** (si el MCP no está conectado):
```
pnpm -C /Users/maxprain/Documents/dome-meta dome-meta plan   "<feature>"
pnpm -C /Users/maxprain/Documents/dome-meta dome-meta search "<consulta>"
pnpm -C /Users/maxprain/Documents/dome-meta dome-meta freshness
```

**Reglas de oro:**
- Hazlo al principio, **antes de leer archivos a ciegas**: ahorra tiempo y evita romper costuras cross-repo.
- Si dome-meta y el código real difieren, **gana el código**: verifica los archivos que te indique antes de editar.
- Mantén la KB fresca: deja `dome-meta watch` corriendo o instala el hook con `dome-meta install-hooks`.
