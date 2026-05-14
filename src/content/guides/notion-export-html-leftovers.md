---
title: Clean HTML leftovers from a Notion export
description: Decide when exported Notion HTML files should become Markdown, evidence archives, or deleted migration leftovers.
customSlug: notion-export-html-leftovers
status: published
quickAnswer: Clean HTML leftovers by keeping them as evidence only when needed, converting important pages to Markdown, and deleting duplicate HTML after links, assets, and content have been verified.
faq:
  - question: Why are HTML files present after a Notion migration?
    answer: Notion supports HTML export, and Obsidian Importer recommends HTML for file import because Markdown export can omit important data.
  - question: Should HTML live in my Obsidian vault?
    answer: Usually not as working notes. Keep HTML only as migration evidence or convert important pages to Markdown.
difficulty: beginner
timeRequired: 25min
relatedStack: personal-wiki-obsidian-quartz
relatedKits: []
relatedWiki:
  - concepts/notion-export
  - tools/notion
  - tools/obsidian
tags:
  - notion
  - html
  - obsidian
  - cleanup
updatedAt: 2026-05-14
---

## The HTML leftover problem

Obsidian's Notion file-import guidance recommends exporting the workspace as HTML rather than Notion Markdown because the Markdown export can omit important data. That means HTML files may appear in the migration workspace even if your final vault should be Markdown-first.

Official context:

- [Obsidian Import from Notion](https://help.obsidian.md/import/notion)
- [Notion export your content](https://www.notion.com/help/export-your-content)

## Decide the role

Use three buckets:

- Convert: important pages that did not become good Markdown.
- Archive: source evidence you may need during review.
- Delete: duplicates that have already been converted and verified.

## Cleanup steps

1. Search the imported vault for `.html` and `.htm`.
2. Open a sample next to the matching Markdown note.
3. Convert only pages with missing content or broken structure.
4. Move evidence HTML outside the working vault.
5. Delete duplicate HTML only after a backup exists.

## Acceptance check

The final Obsidian vault should be readable as Markdown. HTML should not be required for normal navigation, search, or publishing unless you intentionally keep it as an attachment.
