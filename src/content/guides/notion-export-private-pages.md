---
title: Find private pages in a Notion export
description: Review private-looking page names, folders, and metadata before an imported Notion vault becomes public or synced through Git.
customSlug: notion-export-private-pages
status: published
quickAnswer: Find private pages by scanning path names, folder names, titles, attachments, and publish flags before syncing or publishing. Treat automated checks as warnings, not a complete privacy audit.
faq:
  - question: Does a Notion export include every private page?
    answer: Not always. Notion says pages the exporter cannot access are not included, and workspace or teamspace settings can affect export contents.
  - question: Can a filename scan prove a vault is safe?
    answer: No. Filename scans catch obvious risks, but private content can live inside ordinary-looking pages and attachments.
difficulty: beginner
timeRequired: 30min
relatedStack: personal-wiki-obsidian-quartz
relatedKits: []
relatedWiki:
  - concepts/notion-export
  - concepts/publishing-readiness
  - tools/notion
tags:
  - notion
  - privacy
  - publishing
  - audit
updatedAt: 2026-05-14
---

## The privacy problem

Migration work often starts as a technical task, but publishing risk is the real blocker. Private pages, people names, client folders, strategy notes, and attachment filenames can leak through an export even when the content looks harmless at a glance.

Notion's backup documentation notes that exports depend on access and workspace settings. That means an export can be incomplete in one direction and still contain sensitive material in another.

Official context:

- [Notion back up your data](https://www.notion.com/help/back-up-your-data)
- [Notion sharing model](https://www.notion.com/help/share-your-work)

## Review steps

1. Scan folder and file names for private terms.
2. Search page titles for clients, people, finance, legal, health, credentials, and internal project names.
3. Check attachments separately; images and PDFs often carry private names.
4. Add `publish: false` to imported notes by default.
5. Move private material outside the public vault or Quartz content folder.
6. Review a sample manually before trusting automation.

## Acceptance check

The export is publishing-ready only when private material is excluded from the publishable subset and every public note has an intentional publish state.

## Related paths

- [Notion to Obsidian publishing readiness](/guides/notion-to-obsidian-publishing-readiness)
- [Notion export to Quartz checklist](/guides/notion-export-to-quartz-checklist)
