---
title: "Local-first no es local-only: dónde viven tus datos en Dome"
date: 2026-09-17
description: "La biblioteca y las personas se guardan en tu disco. Un proveedor cloud solo recibe contenido cuando tú lo conectas, y enviar o publicar espera tu aprobación."
cover: /dome-recursos-landing/dome-many-composition-light-es-primary-landscape.png
tags:
  - local-first
  - privacidad
  - many
slug: local-first
---

Dome es **local-first**: la biblioteca, las personas y el índice viven en el almacenamiento de la aplicación en tu Mac, Windows o Linux. Eso no significa **local-only**. Si conectas Ollama en local, el texto de esa conversación no sale de tu máquina. Si conectas un proveedor cloud con tus claves, el contenido de esa conversación sigue la política de ese proveedor.

> **La distinción que importa.** Local-first describe el valor por defecto. No es una promesa de que nada saldrá nunca de tu disco. OAuth, correo, redes y un modelo cloud son opt-in.

### Dónde vive el contexto

## Qué se queda en tu ordenador

En macOS, Windows y Linux, Dome guarda la biblioteca, las fichas de personas y el índice semántico en la carpeta de datos de la aplicación. No centraliza tu biblioteca completa en un servidor propio por defecto. Many trabaja sobre ese material: el recurso abierto, la persona relacionada y lo que ya indexaste.

![Biblioteca de Dome con recursos locales abiertos en el escritorio.](/dome-recursos-landing/dome-library-screen-light-es-primary-landscape.png)

*La biblioteca vive en tu disco. Esta captura usa el proyecto de demostración Atlas.*

## Qué puede salir, y cuándo

Hay tres saltos explícitos:

1. **Modelo.** Ollama local o las claves del proveedor que elijas. El contenido de esa conversación queda sujeto a ese proveedor.
2. **Canales.** Correo y social son opcionales. Un borrador de Many no se envía ni se publica sin tu visto bueno.
3. **Nube de Dome.** Sync y créditos dependen del Provider cuando existan. No son un requisito para probar el valor local.

> **Indexación de PDFs e imágenes.** Algunos formatos pueden usar un modelo de visión del proveedor que ya configuraste. No asumas que un PDF escaneado se indexa 100 % offline.

## Cómo comprobarlo en la práctica

Abre [local-first](/local-first) para el detalle de almacenamiento y permisos. El [primer workflow](/manual/first-workflow) te pide importar un recurso y pedir un borrador **antes** de conectar nada que salga de tu disco. Si quieres el modelo en local, [Many con Ollama](/blog/many-with-ollama) cubre ese camino.

La regla de producto es simple: el modelo, el envío y la nube no se activan solos. Cualquier salto fuera de tu disco espera una decisión tuya.
