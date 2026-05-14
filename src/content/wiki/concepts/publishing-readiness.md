---
title: Publishing readiness
description: Publishing readiness is the checkpoint that decides whether an Obsidian vault or imported workspace is safe and useful enough to become public.
customSlug: concepts/publishing-readiness
kind: concept
category: publishing
status: published
website: null
github: null
openSource: null
selfHosted: null
localFirst: true
offlineReady: true
dataFormats:
  - Markdown
  - YAML
platforms:
  - Obsidian
  - Quartz
relatedStacks:
  - personal-wiki-obsidian-quartz
relatedKits:
  - personal-wiki-kit
tags:
  - publishing
  - privacy
  - quartz
updatedAt: 2026-05-14
---

## Definition

Publishing readiness is the state where a vault or content folder is safe, structured, and useful enough to become public.

## What it checks

Publishing readiness combines content quality and operational safety:

- Private material is excluded.
- Internal links resolve.
- Titles and slugs are stable.
- Public notes have metadata.
- Assets are intentional.
- The public subset has navigation.

## Offpedia cleanup rule

Do not publish a migrated workspace just because the import succeeded. Build a curated public subset and validate it separately from the private archive.

## Related guide

- [Notion to Obsidian publishing readiness](/guides/notion-to-obsidian-publishing-readiness)
