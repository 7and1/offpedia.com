---
title: How to design a frontmatter schema
description: Create filterable, linkable metadata fields for Obsidian, Astro, and Offpedia content.
customSlug: design-frontmatter-schema
status: published
quickAnswer: Keep frontmatter small, typed, and actually used by your workflow. Start with title, description, status, tags, and dates, then add fields only when a view or publishing step depends on them.
faq:
  - question: Should every Obsidian note have frontmatter?
    answer: No. Add frontmatter to notes that need filtering, publishing, templates, or migration tracking. A private scratch note can stay plain Markdown.
  - question: Should frontmatter match my website schema exactly?
    answer: Match only the fields that cross the boundary. Keep extra private workflow fields out of public content unless the site template uses them.
difficulty: beginner
timeRequired: 20min
relatedStack: researcher-obsidian-zotero
relatedKits: []
relatedWiki:
  - concepts/frontmatter
  - concepts/markdown
tags:
  - frontmatter
  - metadata
  - markdown
updatedAt: 2026-05-09
---

## What you will have

A small set of metadata fields that can work across articles, wiki entries, stacks, and kits.

## Minimal fields

```yaml
---
title: Title
description: Summary
status: draft
tags:
  - example
updatedAt: 2026-05-09
---
```

## Writer fields

```yaml
---
type: essay
status: draft
publishTarget: blog
created: 2026-05-09
updated: 2026-05-09
---
```

## Offpedia fields

```yaml
---
type: stack
offlineReady: true
localFirst: true
relatedKits:
  - writer-vault-starter
---
```

## Principle

The fewer fields you require, the easier the system is to maintain. Start with a stable minimum and expand only when a field is used by real pages or filters.
