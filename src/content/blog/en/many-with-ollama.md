---
title: "Many with Ollama: your personal library without cloud API keys"
date: 2026-09-17
description: "Run Ollama locally, let Many read your indexed resources, and work without sending context to a cloud provider."
cover: /dome-recursos-landing/dome-many-screen-light-es-primary-landscape.png
tags:
  - ollama
  - many
  - local-first
slug: many-with-ollama
---

You can use Dome without a cloud account and without remote provider keys. During onboarding, the AI step lets you pick a local Ollama model. Many then reads the library already on disk.

![Many composition with library context in view.](/dome-recursos-landing/dome-many-composition-light-es-primary-landscape.png)

*Many works on the open resource. The model can be local Ollama.*

## What you need

1. Dome installed from [GitHub Releases](https://github.com/maxprain12/dome/releases).
2. [Ollama](https://ollama.com) running on your machine, with a compatible model exposed by the published Dome version.
3. At least one library resource — a note or a PDF with selectable text is the most predictable path.

You do not need to sign in to Provider for this trial.

> **Offline is not automatic for every file.** Chat with Ollama can stay local. Indexing scanned PDFs or images may need a vision model; if you do not have one locally, that part is not fully offline.

### From file to Ready for AI

## How to ask Many for work

Open the resource. Open Many (`Cmd+Shift+M` in the documented app shortcut). Ask with the file in view: a brief, a summary, the three sources in a project. Many cites what it can retrieve from the index. If the **Ready for AI** badge is missing, wait for indexing or read the [library manual](/en/manual/library).

![Many prepares a brief on the open resource](/dome-recursos-landing/dome-many-detail-light-es-primary-landscape.png)

*Many prepares a brief on the open resource*

You open a PDF in the library. Many shows the resource context. You ask for a brief. The panel leaves the text ready to copy or turn into email. Nothing is sent.

## When to use a cloud provider

If the local model cannot handle the file type, or you want a specific model, you connect your own keys. That content follows the provider’s policy. [Local-first isn’t local-only](/en/blog/local-first) details those hops. Email and social actions stay blocked until you approve, whether you use Ollama or not.
