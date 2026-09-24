---
title: "Many con Ollama: tu biblioteca personal sin API keys en la nube"
date: 2026-09-17
description: "Configura Ollama en local, deja que Many lea tus recursos indexados y trabaja sin enviar el contexto a un proveedor cloud."
cover: /dome-recursos-landing/dome-many-screen-light-es-primary-landscape.png
tags:
  - ollama
  - many
  - local-first
slug: many-with-ollama
---

Puedes usar Dome sin cuenta cloud y sin claves de un proveedor remoto. En el onboarding, el paso de IA te deja elegir un modelo local con Ollama. Many entonces lee la biblioteca que ya tienes en disco.

![Composición de Many con el contexto de la biblioteca visible.](/dome-recursos-landing/dome-many-composition-light-es-primary-landscape.png)

*Many trabaja sobre el recurso abierto. El modelo puede ser Ollama en local.*

## Qué necesitas

1. Dome instalado desde la página de [descargas](/download).
2. [Ollama](https://ollama.com) en marcha en tu máquina, con un modelo compatible que exponga la versión publicada de Dome.
3. Al menos un recurso en la biblioteca — una nota o un PDF con texto seleccionable es el camino más predecible.

No necesitas iniciar sesión en el Provider para esta prueba.

> **Offline no es automático para todo.** El chat con Ollama puede quedarse en local. Indexar PDFs escaneados o imágenes puede pedir un modelo de visión; si no lo tienes en local, esa parte no estará 100 % offline.

### De archivo a Listo para IA

## Cómo pedirle trabajo a Many

Abre el recurso. Abre Many (`Cmd+Shift+M` en el atajo documentado de la app). Pregunta con el archivo a la vista: un brief, un resumen, las tres fuentes de un proyecto. Many cita lo que puede recuperar del índice. Si el badge **Listo para IA** aún no aparece, espera a la indexación o revisa el [manual de biblioteca](/manual/library).

![Many prepara un brief sobre el recurso abierto](/dome-recursos-landing/dome-many-detail-light-es-primary-landscape.png)

*Many prepara un brief sobre el recurso abierto*

Abres un PDF en la biblioteca. Many muestra el contexto del recurso. Pides un brief. El panel deja el texto listo para copiar o convertir en correo. Nada se envía.

## Cuándo sí usar un proveedor cloud

Si quieres el modelo concreto, conectas tus propias claves. Ese contenido sigue la política del proveedor. El artículo [local-first no es local-only](/blog/local-first) detalla esos saltos. Las acciones de correo y social siguen bloqueadas hasta que apruebas, uses Ollama o no.
