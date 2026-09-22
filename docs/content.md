# Contenido (blog y manuales)

El copy de marketing de UI vive en `src/i18n`. Los artículos y manuales son colecciones Markdown que Dome CMS puede publicar al repositorio.

## Dónde vive cada cosa

| Colección | Carpeta | Rutas |
|-----------|---------|--------|
| Blog | `src/content/blog/{es,en}/` | `/blog/{slug}/`, `/en/blog/{slug}/` |
| Manual | `src/content/manual/{es,en}/` | `/manual/{slug}/`, `/en/manual/{slug}/` |

El idioma sale de la carpeta. Dome CMS v1 publica un archivo `{contentFolder}/{slug}.md`; cambia **Content folder** en el plugin según colección e idioma.

Schema en `src/content.config.ts`. RSS: `/rss.xml` y `/en/rss.xml`.

## Frontmatter (contrato Dome CMS)

```yaml
title: ""
date: 2026-09-17
description: ""
cover: /dome-recursos-landing/...
tags: []
slug: same-slug-in-both-languages
```

`cover` es opcional. `date` admite el texto ISO que escribe Dome. El `slug` es la fuente de la URL y debe coincidir con el nombre del archivo. El par ES/EN usa el mismo slug para que el redirect de idioma (`dome-locale`) no 404. Las imágenes van en `public/`; Dome CMS v1 no sube binarios.

Los índices (`/blog`, `/manual`) filtran por etiquetas. La entrada abre con el `h1` y el lead; la portada (`cover`) va debajo, a tamaño natural. Si el cuerpo empieza por `# título`, el plugin de Markdown lo quita para no duplicar el `h1` del layout. Categoría, autor y fecha van solo al cierre. El autor visible es el de `src/lib/site.ts`.

## Cuerpo Markdown

Portable, sin JSX. El mismo archivo que publica Dome:

- imágenes: `![alt](src)` y, si hace falta, un pie en cursiva
- pasos: listas numeradas
- avisos: citas con el título en negrita
- un enlace interno al menos

Usa capturas reales de `public/dome-recursos-landing/` o `public/how/`. No inventes métricas, testimonios ni pantallas.

## SEO

`Layout.astro` emite canonical, hreflang, `og:image` (`cover` o `/social.png`) y JSON-LD (`BlogPosting` o `TechArticle`). Pricing queda `noindex` hasta que existan planes. Tras añadir un par ES/EN, corre `pnpm run check:content-parity`.

Ese check exige:

- `title`, `description`, `date` y `slug`
- carpeta `es` o `en`
- el mismo `slug` en ambos idiomas y el mismo nombre de archivo
- `alt` en cada `![alt](src)`
- al menos un enlace interno

Un `h1` por página lo cubre el layout editorial.
