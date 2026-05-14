---
title: Notion export
description: A Notion export is a downloaded copy of pages, databases, files, and assets that needs cleanup before it becomes a durable Markdown or Obsidian archive.
customSlug: concepts/notion-export
kind: concept
category: migration
status: published
website: https://www.notion.com/help/export-your-content
github: null
openSource: null
selfHosted: null
localFirst: false
offlineReady: true
dataFormats:
  - HTML
  - Markdown
  - CSV
  - PDF
platforms:
  - Notion
relatedStacks:
  - personal-wiki-obsidian-quartz
relatedKits:
  - personal-wiki-kit
tags:
  - notion
  - export
  - migration
updatedAt: 2026-05-14
---

## Definition

A Notion export is a downloadable copy of selected Notion content. Depending on the export path, it can include HTML, Markdown, CSV files for databases, PDFs, attachments, and navigation files.

## Why it matters

An export is not the same as a clean archive. It can contain nested folders, page IDs, duplicate titles, private paths, large assets, and database files that need a rebuild plan.

## Offpedia cleanup rule

Keep the raw export as evidence, import a copy into Obsidian, then clean the imported vault before treating it as the durable source.

## Related guide

- [Notion to Obsidian cleanup checklist](/guides/notion-to-obsidian-cleanup-checklist)
