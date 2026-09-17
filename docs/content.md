# Contenido (blog y manuales)

El copy de marketing de UI vive en `src/i18n`. Los artículos y manuales son colecciones MDX.

## Dónde vive cada cosa

| Colección | Carpeta | Rutas |
|-----------|---------|--------|
| Blog | `src/content/blog/{es,en}/` | `/blog/{slug}/`, `/en/blog/{slug}/` |
| Manual | `src/content/manual/{es,en}/` | `/manual/{slug}/`, `/en/manual/{slug}/` |

Schema en `src/content.config.ts`. RSS: `/rss.xml` y `/en/rss.xml`.

## Frontmatter mínimo

```yaml
title: ""
description: ""
locale: es # o en
permalink: same-permalink-in-both-languages
translationKey: unique-pair-id
publishedAt: 2026-09-17
category: ""
tags: []
ogImage: /dome-recursos-landing/...
heroImage: /dome-recursos-landing/...
heroAlt: ""
draft: false
```

Los permalinks deben coincidir entre ES y EN para que el redirect de idioma (`dome-locale`) no 404. `translationKey` empareja las dos piezas. Los manuales añaden `order` y, si hay pasos, `howTo`.

## Componentes MDX

Disponibles vía el mapa en `src/components/content/mdx.ts`:

- `<Image src alt width height caption />`
- `<Video poster title transcriptLabel>transcripción</Video>`
- `<Callout type="note|tip|warning" title>`
- `<Flow title><FlowStep title>…</FlowStep></Flow>`
- `<Gallery title><Image … /></Gallery>`
- `<Diagram variant="local-first|approval|library" title />`

Usa capturas reales de `public/dome-recursos-landing/` o `public/how/`. No inventes métricas, testimonios ni pantallas.

Los índices (`/blog`, `/manual`) son una revista: título centrado, filtros por `category` y tarjetas con la foto, el chip de tema y el texto debajo. La entrada abre con el `h1` y el lead; la portada va debajo, a tamaño natural, sin overlay ni recorte. El cuerpo es una columna estrecha. Categoría, autor y fecha van solo al cierre.

## SEO

`Layout.astro` emite canonical, hreflang, `og:image` y JSON-LD (`BlogPosting` o `HowTo`/`TechArticle`). Pricing queda `noindex` hasta que existan planes. Tras añadir un par ES/EN, corre `pnpm run check:content-parity`.

Ese check exige:

- el mismo `permalink` y `translationKey` en ambos idiomas
- `ogImage`
- `heroAlt` si hay `heroImage`
- `alt` en cada `<Image />`
- al menos un enlace interno

Un `h1` por página lo cubre el layout editorial; no lo pongas otra vez en el MDX.
