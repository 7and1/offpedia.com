---
title: Pandoc
description: Pandoc is a document conversion tool that turns Markdown-based drafts into DOCX, PDF, HTML, EPUB, and other output formats without changing the primary archive.
customSlug: tools/pandoc
kind: tool
category: publishing
status: published
website: https://pandoc.org
github: https://github.com/jgm/pandoc
openSource: true
selfHosted: true
localFirst: true
offlineReady: true
pricing: Free and open source.
gitSupport: Git-native because conversion starts from plain text source files and explicit templates.
bestFor:
  - Format conversion
  - Submission exports
  - Markdown publishing pipelines
pseo:
  compare: false
  workflow: false
dataFormats:
  - Markdown
  - DOCX
  - PDF
  - HTML
  - EPUB
platforms:
  - macOS
  - Windows
  - Linux
limitations:
  - Pandoc is a conversion engine, not an editorial system, so messy source structure still produces messy output.
  - Template tuning can become technical quickly when the target format has strict styling or citation requirements.
relatedStacks:
  - writer-obsidian-github
  - researcher-obsidian-zotero
relatedKits:
  - research-notes-vault
tags:
  - pandoc
  - markdown
  - publishing
updatedAt: 2026-05-11
---

## One-line definition

Pandoc converts one text-first document format into another.

## Offpedia perspective

Pandoc is valuable when the archive should stay in Markdown but the output surface demands something else, such as DOCX for editorial review or PDF for submission.

## Recommended next step

- Read [Researcher Stack: Obsidian + Zotero](/stacks/researcher-obsidian-zotero)
- Read [Writer Stack: Obsidian + GitHub](/stacks/writer-obsidian-github)
