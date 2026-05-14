---
title: Notion to Obsidian frontmatter
description: Build a small frontmatter schema for imported Notion pages so Obsidian, Bases, and publishing tools can filter the vault.
customSlug: notion-to-obsidian-frontmatter
status: published
quickAnswer: "Use frontmatter after a Notion import to preserve only durable metadata: title, status, type, dates, source, publish state, and key database fields that power search, Bases, or publishing."
faq:
  - question: Should every Notion database column become frontmatter?
    answer: No. Keep fields only when they support filtering, publishing, ownership, or cleanup. Dead columns create maintenance work.
  - question: Should tags replace frontmatter?
    answer: Use tags for broad discovery and frontmatter for fields that need values, dates, booleans, or controlled lists.
difficulty: beginner
timeRequired: 35min
relatedStack: personal-wiki-obsidian-quartz
relatedKits:
  - personal-wiki-kit
relatedWiki:
  - concepts/frontmatter
  - concepts/obsidian-bases
  - concepts/notion-export
tags:
  - notion
  - obsidian
  - frontmatter
  - metadata
updatedAt: 2026-05-14
---

## The metadata problem

Notion database properties do not automatically become a clean Markdown schema. If you copy every column, the vault inherits old workspace clutter. If you copy nothing, you lose useful filters and publishing state.

The right schema is the smallest one that supports your next workflow.

## Minimum schema

```yaml
---
title: Example page
type: note
status: imported
source: notion
created: 2026-05-14
updated: 2026-05-14
publish: false
---
```

## Add fields only when used

Add a field when it powers one of these:

- Obsidian search
- Obsidian Bases
- Quartz or static-site publishing
- Privacy review
- Ownership or maintenance status

Do not add a field only because it existed in Notion.

## Acceptance check

Your frontmatter is ready when imported notes can be filtered by status, private notes cannot be published accidentally, and the fields are stable enough to use in a Base or publishing build.

## Related paths

- [How to design a frontmatter schema](/guides/design-frontmatter-schema)
- [Convert a Notion database to Obsidian Bases](/guides/notion-database-to-obsidian-bases)
