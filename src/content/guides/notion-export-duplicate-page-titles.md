---
title: Fix duplicate page titles in a Notion export
description: Rename duplicate Notion pages before Obsidian backlinks, search results, and publishing slugs become unstable.
customSlug: notion-export-duplicate-page-titles
status: published
quickAnswer: Fix duplicate Notion page titles by choosing one canonical title per concept, adding context to the rest, and rewriting links before publishing or building Obsidian Bases.
faq:
  - question: Why do duplicate titles matter in Obsidian?
    answer: Obsidian links and search become harder to trust when several notes share the same visible name. Publishing slugs can also become confusing.
  - question: Should I keep Notion page IDs in filenames?
    answer: Keep IDs only as temporary migration evidence. Public notes usually need human-readable canonical names.
difficulty: beginner
timeRequired: 30min
relatedStack: personal-wiki-obsidian-quartz
relatedKits: []
relatedWiki:
  - concepts/notion-export
  - tools/obsidian
tags:
  - notion
  - obsidian
  - titles
  - links
updatedAt: 2026-05-14
---

## The duplicate-title problem

Notion pages can share names because hierarchy provides context. Obsidian notes live in folders too, but links and search often rely on titles. Duplicate names make it unclear which note is canonical.

## Rename pattern

Use names that explain the context:

| Imported title | Better title |
| --- | --- |
| Notes | Product meeting notes |
| Notes | Research reading notes |
| Tasks | Launch tasks |
| Tasks | Personal admin tasks |

Avoid adding random suffixes unless you are preserving temporary evidence.

## Cleanup steps

1. Group pages by title.
2. Pick the canonical page for each group.
3. Rename secondary pages with explicit context.
4. Rewrite links to the canonical destination.
5. Delete empty duplicates created only by Notion hierarchy.
6. Re-run search for the original duplicate title.

## Acceptance check

A reader should be able to search a page title and know which result to open. A publisher should be able to turn the note title into a stable slug without guessing.
