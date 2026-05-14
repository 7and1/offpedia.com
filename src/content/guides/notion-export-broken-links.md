---
title: Fix broken links in a Notion export
description: Find and repair broken local file links, missing attachments, and unresolved internal references after a Notion to Obsidian migration.
customSlug: notion-export-broken-links
status: published
quickAnswer: Fix broken export links by separating missing attachments, local file references, Notion web URLs, and renamed duplicate pages. Repair assets first, then rewrite page links to stable Obsidian note names.
faq:
  - question: Why do links break after import?
    answer: Links can break because page titles changed, duplicate names were disambiguated, attachments moved, or Notion web URLs were exported instead of local Markdown links.
  - question: Should I repair every link immediately?
    answer: Repair links on important pages first. Archive or delete low-value imported pages before spending time on link cleanup.
difficulty: beginner
timeRequired: 40min
relatedStack: personal-wiki-obsidian-quartz
relatedKits: []
relatedWiki:
  - concepts/notion-export
  - tools/notion
  - tools/obsidian
tags:
  - notion
  - obsidian
  - links
  - attachments
updatedAt: 2026-05-14
---

## The broken-link categories

Do not treat every failed link as the same problem. Sort findings into four buckets:

- Missing local attachments
- Internal pages renamed during export or import
- Notion web URLs that should become local links
- External links that should remain external

The [Notion Export Auditor](/tools/notion-export-auditor) helps surface local references and Notion URLs, but you still need a human pass to decide which links matter.

## Repair order

1. Verify that asset folders were extracted from the Notion ZIP.
2. Fix missing local files before rewriting page links.
3. Rename duplicate titles so each target page has one canonical name.
4. Rewrite Notion web URLs to local Obsidian links only when the target page exists in the vault.
5. Leave true external references as normal Markdown links.
6. Re-run the audit and search the vault for `notion.so`.

## Acceptance check

Choose ten important imported notes. Each one should open without missing image/file warnings, link to local notes where possible, and keep only intentional web links.

## Related cleanup

- Use [Notion web links after import](/guides/notion-web-links-after-import) for leftover `notion.so` links.
- Use [Notion export duplicate page titles](/guides/notion-export-duplicate-page-titles) before rewriting many backlinks.
