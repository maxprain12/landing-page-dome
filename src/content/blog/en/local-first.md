---
title: "Local-first isn’t local-only: where your data lives in Dome"
date: 2026-09-17
description: "Your library and people stay on disk. A cloud provider only receives content when you connect it, and sending or publishing waits for your approval."
cover: /dome-recursos-landing/dome-many-composition-light-es-primary-landscape.png
tags:
  - local-first
  - privacy
  - many
slug: local-first
---

Dome is **local-first**: the library, people records, and index live in the app’s storage on your Mac, Windows, or Linux machine. That is not **local-only**. If you run Ollama locally, that conversation stays on your computer. If you connect a cloud provider with your own keys, that conversation’s content follows that provider’s policy.

> **The distinction that matters.** Local-first describes the default. It is not a promise that nothing will ever leave your disk. OAuth, email, social, and a cloud model are opt-in.

### Where context lives

## What stays on your computer

On macOS, Windows, and Linux, Dome stores the library, people records, and semantic index in the application data folder. It does not centralize your full library on its own servers by default. Many works on that material: the open resource, the related person, and what you already indexed.

![Dome library with local resources open on the desktop.](/dome-recursos-landing/dome-library-screen-light-es-primary-landscape.png)

*The library lives on your disk. This capture uses the Atlas demo project.*

## What can leave, and when

There are three explicit hops:

1. **Model.** Local Ollama or the provider keys you choose. Content in that conversation follows that provider.
2. **Channels.** Email and social are optional. A Many draft does not send or publish without your go-ahead.
3. **Dome cloud.** Sync and credits depend on Provider when they exist. They are not required to try the local value.

> **PDF and image indexing.** Some formats may use a vision model from the provider you already configured. Do not assume a scanned PDF is indexed fully offline.

## How to check this in practice

Read [local-first](/en/local-first) for storage and permissions. The [first workflow](/en/manual/first-workflow) asks you to import a resource and request a draft **before** connecting anything that leaves your disk. If you want the model local, [Many with Ollama](/en/blog/many-with-ollama) covers that path.

The product rule is simple: the model, the send, and the cloud stay off until you choose them. Anything that leaves your disk waits for a decision.
