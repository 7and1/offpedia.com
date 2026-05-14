---
title: Linked database
description: A linked database is a Notion view that points to another source database, which makes migration cleanup different from moving an ordinary page.
customSlug: concepts/linked-database
kind: concept
category: migration
status: published
website: https://developers.notion.com/guides/data-apis/working-with-databases
github: null
openSource: null
selfHosted: null
localFirst: false
offlineReady: false
dataFormats:
  - Notion database view
  - Notion data source
platforms:
  - Notion
relatedStacks:
  - personal-wiki-obsidian-quartz
relatedKits: []
tags:
  - notion
  - database
  - migration
updatedAt: 2026-05-14
---

## Definition

A linked database is a view of another Notion database. It lets the same source data appear in multiple pages with different filters, sorts, or layouts.

## Why it matters for migration

Linked databases are easy to mistake for separate databases. During a Notion to Obsidian migration, you need to identify the original source and decide which views are worth rebuilding.

## Offpedia cleanup rule

Import the source database first. Rebuild only the linked views that still drive decisions, usually as Obsidian properties, Bases, folders, or static notes.

## Related guide

- [Obsidian Importer and linked Notion databases](/guides/obsidian-importer-linked-databases)
