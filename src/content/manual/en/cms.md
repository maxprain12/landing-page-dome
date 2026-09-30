---
title: "Publish with Dome CMS"
date: 2026-09-30
description: "Manage Markdown, languages and images and publish to your Astro repository."
slug: cms
tags:
  - Guides
---

Manage Markdown, languages and images and publish to your Astro repository.

## Requirements

- Dome CMS installed and permissions reviewed.
- Astro repository with Markdown collections and a GitHub connection with write access.

## Steps

1. Install Dome CMS from Add-ons and configure it in Settings → Plugins.
2. Add the site, its vault, owner/repository, branch and public URL. Detect structure and review collection/language rules and link format.
3. Create an entry with title, collection, language, description, date and slug. Write the Markdown body and add images from the CMS.
4. Use Adapt languages or Update translations when needed. Review each draft; translation does not publish.
5. Prepare publication and review the path, content and commit. Publish only after approving the operation. Sync posts retrieves remote content again.

## Expected result

Publication writes <slug>.md in the configured folder. If hosting deploys on commit, that change starts its build.

## If something fails

If a collection/language rule is missing, add it before preparing. If the branch changes during review, prepare again against the new revision. Publication failure preserves the local note.

## Related

[Dome features](/en/funciones) · [Add-on catalog](/en/complementos)
