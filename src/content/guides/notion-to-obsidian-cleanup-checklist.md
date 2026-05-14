---
title: Notion to Obsidian cleanup checklist
description: A practical checklist for cleaning a Notion export after import so the Obsidian vault is linkable, searchable, and publishable.
customSlug: notion-to-obsidian-cleanup-checklist
status: published
quickAnswer: Clean a Notion-to-Obsidian migration by auditing databases, links, duplicate titles, private paths, large files, HTML leftovers, and publishing metadata before treating the vault as your source of truth.
faq:
  - question: Should I clean the export before or after Obsidian Importer?
    answer: Do both. Audit the raw export first to understand risk, then audit the imported vault to verify what changed.
  - question: Is a successful import enough for publishing?
    answer: No. A vault can import successfully while still containing private paths, broken links, duplicate titles, and weak frontmatter.
difficulty: beginner
timeRequired: 45min
relatedStack: personal-wiki-obsidian-quartz
relatedKits:
  - personal-wiki-kit
relatedWiki:
  - concepts/notion-export
  - concepts/publishing-readiness
  - tools/notion
  - tools/obsidian
tags:
  - notion
  - obsidian
  - migration
  - cleanup
updatedAt: 2026-05-14
---

## The cleanup problem

Notion exports are not just Markdown notes. A real workspace can include databases, assets, nested folders, page IDs, private pages, duplicated names, HTML files, and Notion web URLs that do not become useful Obsidian links automatically.

Obsidian Importer is the right starting point for Notion migration, but the official import path still has limits around linked data sources, database views, large workspaces, and export mode. Treat the first imported vault as a draft.

Official context:

- [Obsidian Import from Notion](https://help.obsidian.md/import/notion)
- [Notion workspace export and backup](https://www.notion.com/help/back-up-your-data)

## Checklist

1. Save an untouched copy of the raw Notion export.
2. Run the [Notion Export Auditor](/tools/notion-export-auditor) on the raw export.
3. Import a copy through Obsidian Importer.
4. Run a before-after audit against the imported vault.
5. Fix broken local file links and missing attachments first.
6. Rename duplicate page titles before writing new backlinks.
7. Decide which CSV database exports become frontmatter, Bases, notes, or archives.
8. Remove or quarantine private pages before any publishing workflow.
9. Convert or archive HTML leftovers.
10. Add publishing metadata only to notes that are meant to become public.

## Acceptance check

Your cleanup pass is ready when important pages open in Obsidian, backlinks point to local notes, large assets have a policy, private material is excluded, and the publishing subset has titles, descriptions, dates, and publish state.

## Next paths

- Use [Obsidian Importer before-after audit](/guides/obsidian-importer-before-after-audit) to compare raw and imported folders.
- Use [Notion to Obsidian frontmatter](/guides/notion-to-obsidian-frontmatter) when database columns need a Markdown metadata model.
- Use [Notion export to Quartz checklist](/guides/notion-export-to-quartz-checklist) before publishing.
