---
title: Obsidian Importer and linked Notion databases
description: Understand why linked Notion databases can disappear or flatten during import and how to rebuild the important views in Obsidian.
customSlug: obsidian-importer-linked-databases
status: published
quickAnswer: Linked Notion databases are views of another source, not separate databases. Import the original source database, then rebuild only the views you need in Obsidian with folders, properties, Bases, or saved searches.
faq:
  - question: Why did my linked database not import as its own table?
    answer: A linked database points to another source database. Importing the source and rebuilding the view is safer than expecting duplicate table files.
  - question: Should every linked database become an Obsidian Base?
    answer: No. Rebuild a Base only when the view still drives decisions. Static reference lists can become normal notes or folders.
difficulty: intermediate
timeRequired: 30min
relatedStack: personal-wiki-obsidian-quartz
relatedKits: []
relatedWiki:
  - concepts/linked-database
  - concepts/obsidian-bases
  - concepts/notion-export
  - tools/obsidian
tags:
  - notion
  - obsidian-importer
  - linked-database
  - bases
updatedAt: 2026-05-14
---

## Why linked databases break expectations

A linked Notion database is a view over another database. It is useful inside Notion because the same source can appear in many places with different filters or layouts. During migration, that convenience becomes ambiguity: should the importer create another database, another view, a folder, or a note?

Obsidian's current Notion API import documentation says linked data sources are not imported because the Notion API does not support them in that path. That makes the cleanup decision yours.

Official context:

- [Obsidian Import from Notion](https://help.obsidian.md/import/notion)
- [Notion API database guide](https://developers.notion.com/guides/data-apis/working-with-databases)

## Rebuild path

1. Find the original source database in Notion before exporting or importing.
2. Export or import the source, not only pages that embed linked views.
3. List each linked view and write down its filter, sort, and purpose.
4. Delete views that were only convenience dashboards.
5. Rebuild durable views with Obsidian properties and Bases.
6. Use links from project notes to the rebuilt view instead of copying the table into every place it appeared.

## When not to rebuild

Do not rebuild a linked database just because it existed in Notion. If the view was a temporary dashboard, a weekly planning board, or a filtered team operating view, it may not belong in a permanent Markdown archive.

## Acceptance check

The migration is clean when each important linked database has one known source, one Obsidian destination, and a documented decision: Base, folder, static note, or archive.
