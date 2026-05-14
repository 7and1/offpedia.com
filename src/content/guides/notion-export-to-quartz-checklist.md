---
title: Notion export to Quartz checklist
description: Prepare an imported Notion workspace for Quartz by curating Markdown, frontmatter, assets, links, and public navigation.
customSlug: notion-export-to-quartz-checklist
status: published
quickAnswer: Before publishing a Notion export with Quartz, curate a public Markdown subset, remove private material, fix links and assets, add frontmatter, and build locally to catch missing pages.
faq:
  - question: Can Quartz publish imported Notion Markdown directly?
    answer: It can build Markdown, but direct publishing is risky. Clean links, metadata, duplicate titles, and private material first.
  - question: Should the Quartz content folder be my whole vault?
    answer: Usually no. Use a curated content folder so private archive notes stay outside the public build.
difficulty: intermediate
timeRequired: 60min
relatedStack: personal-wiki-obsidian-quartz
relatedKits:
  - personal-wiki-kit
relatedWiki:
  - concepts/publishing-readiness
  - concepts/notion-export
  - tools/quartz
  - tools/obsidian
tags:
  - notion
  - quartz
  - obsidian
  - publishing
updatedAt: 2026-05-14
---

## The Quartz-specific problem

Quartz is built for publishing Markdown and Obsidian-style vaults, but imported Notion content often needs cleanup before it behaves like a good public wiki. Quartz can make a messy import visible faster than you expect.

Official context:

- [Quartz philosophy](https://quartz.jzhao.xyz/philosophy)
- [Quartz Obsidian compatibility](https://quartz.jzhao.xyz/features/Obsidian-compatibility)

## Checklist

1. Create a curated Quartz content folder.
2. Copy only reviewed Markdown notes.
3. Add frontmatter for public title, description, date, and tags.
4. Remove private pages and private attachments.
5. Fix Notion web links and missing local assets.
6. Rename duplicate page titles before slugs are generated.
7. Add index pages for major sections.
8. Build Quartz locally and click through important pages.

## What to leave out

Do not include raw export folders, migration logs, private databases, evidence HTML, or large archived attachments in the Quartz content folder.

## Acceptance check

The Quartz build is ready for deployment when the public subset builds cleanly, important links resolve, pages have useful titles and descriptions, and the source folder contains no private migration leftovers.
