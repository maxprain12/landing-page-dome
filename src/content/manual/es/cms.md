---
title: "Publicar con Dome CMS"
date: 2026-09-30
description: "Gestiona Markdown, idiomas e imágenes y publica en tu repositorio Astro."
slug: cms
tags:
  - Guías
---

Gestiona Markdown, idiomas e imágenes y publica en tu repositorio Astro.

## Requisitos

- Dome CMS instalado y permisos revisados.
- Repositorio Astro con colecciones Markdown y conexión GitHub con permiso de escritura.

## Pasos

1. Instala Dome CMS desde Complementos y configúralo en Ajustes → Plugins.
2. Añade el sitio, su bóveda, repositorio owner/repository, rama y URL pública. Detecta la estructura y revisa las reglas colección/idioma y el formato de enlaces.
3. Crea una entrada con título, colección, idioma, descripción, fecha y slug. Escribe el cuerpo Markdown y añade imágenes desde el CMS.
4. Usa Adaptar idiomas o Actualizar traducciones si lo necesitas. Revisa cada borrador; traducir no publica.
5. Prepara la publicación y revisa la ruta, el contenido y el commit. Publica únicamente tras aprobar la operación. Sincronizar posts vuelve a traer contenido remoto.

## Resultado esperado

La publicación escribe <slug>.md en la carpeta configurada. Si el hosting despliega al recibir un commit, ese cambio inicia su build.

## Si algo falla

Si falta una regla colección/idioma, añádela antes de preparar. Si la rama cambia durante la revisión, vuelve a preparar sobre la revisión nueva. Un fallo de publicación conserva la nota local.

## Relacionado

[Funciones de Dome](/funciones) · [Catálogo de complementos](/complementos)
