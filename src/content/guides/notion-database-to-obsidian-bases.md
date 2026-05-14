---
title: Convert a Notion database to Obsidian Bases
description: Decide which Notion database fields should become Obsidian properties, notes, folders, or Bases views after migration.
customSlug: notion-database-to-obsidian-bases
status: published
quickAnswer: Convert a Notion database to Obsidian Bases by turning durable columns into properties, each row into a note when it has meaning, and each important Notion view into a Base filter or table.
faq:
  - question: Can Obsidian Bases replace every Notion database?
    answer: No. Bases display and filter Markdown files and properties. They are not a full clone of Notion databases, permissions, automations, or collaboration behavior.
  - question: What should become a note?
    answer: A row should become a note when it has content, decisions, source context, publishing value, or long-term reference value.
difficulty: intermediate
timeRequired: 60min
relatedStack: personal-wiki-obsidian-quartz
relatedKits:
  - personal-wiki-kit
relatedWiki:
  - concepts/obsidian-bases
  - concepts/frontmatter
  - concepts/notion-export
  - tools/obsidian
tags:
  - notion
  - obsidian
  - bases
  - frontmatter
updatedAt: 2026-05-14
---

## The database mapping problem

Notion databases combine storage, views, relations, formulas, permissions, and collaboration. Obsidian Bases work from local Markdown files and their properties. That means the migration is a redesign, not a one-click table conversion.

Obsidian documents Bases as database-like views over notes and properties. The useful cleanup question is which Notion fields still matter once your content becomes files.

Official context:

- [Obsidian Bases](https://help.obsidian.md/bases)
- [Obsidian Properties](https://help.obsidian.md/properties)

## Field mapping

| Notion shape | Obsidian destination |
| --- | --- |
| Title | Markdown filename and `title` property |
| Select or status | `status`, `type`, or another controlled property |
| Multi-select | List property or tags |
| Date | Date property |
| Relation | Markdown links or a controlled list of linked notes |
| Formula | Rebuild only if a Base formula is still useful |
| Files | Attachments folder with a naming policy |

## Rebuild steps

1. Export or import the source database.
2. Choose a note template for rows that become durable notes.
3. Keep only properties used by search, publishing, or Bases views.
4. Rename fields to stable lowercase names where possible.
5. Create one Base for the most important view.
6. Compare the Base against the original Notion view and remove dead fields.

## Acceptance check

The conversion is ready when a note can stand alone as Markdown, the Base can filter the set without Notion, and no required workflow depends on a missing Notion-only relation or automation.
