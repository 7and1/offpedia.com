---
title: Handle large attachments in a Notion export
description: Decide which exported Notion files belong in an Obsidian vault, which need external storage, and which should be excluded from publishing.
customSlug: notion-export-large-attachments
status: published
quickAnswer: Handle large attachments by classifying them as publish, archive, reference, or discard. Keep public assets small, move heavy private files outside Git, and preserve only links the vault needs.
faq:
  - question: Should large attachments go into Git?
    answer: Usually no. Put only intentional public assets in Git. Large private files should use an archive, asset store, or local reference path.
  - question: Can I delete unreferenced attachments?
    answer: Not immediately. First confirm whether they are unused exports, database files, or assets whose links were rewritten during import.
difficulty: beginner
timeRequired: 35min
relatedStack: personal-wiki-obsidian-quartz
relatedKits: []
relatedWiki:
  - concepts/notion-export
  - concepts/publishing-readiness
tags:
  - notion
  - attachments
  - git
  - publishing
updatedAt: 2026-05-14
---

## The attachment problem

Notion exports can contain images, PDFs, CSV files, archives, and other uploaded assets. If you push everything into an Obsidian Git repo or static site, the result can be slow, private, and hard to maintain.

## Classification

| Class | Action |
| --- | --- |
| Public image | Rename, compress if needed, and keep with the public note |
| Private file | Move outside the publishable vault |
| Source PDF | Keep in Zotero or another source library if possible |
| Database CSV | Store as migration evidence or convert to notes/properties |
| Unreferenced asset | Review before deleting |

## Cleanup steps

1. Sort attachments by size.
2. Check whether each large file is referenced by Markdown.
3. Move private or archival files out of the public vault.
4. Rename public assets with stable lowercase names.
5. Keep a migration log for moved files.
6. Build the site and verify asset paths before publishing.

## Acceptance check

The vault is ready when public notes have only intentional assets, large private files are excluded from Git and publishing, and important references still open from the note.
