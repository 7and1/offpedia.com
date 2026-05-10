# Content Model

## Principles

Offpedia content should be readable, filterable, linkable, reusable, and maintainable.

Every content file should answer:

1. Why should a visitor read this page?
2. What can the visitor do after reading it?
3. What is the next step?
4. What related object should the page link to?

## Collections

- `wiki`: tool and concept entries
- `stacks`: workflow combinations
- `kits`: downloadable or forkable templates
- `guides`: procedural setup guides
- `compare`: editorial comparison pages

## Required Base Fields

```yaml
title: Page title
description: Search and card summary
customSlug: stable-url-slug
status: p2
tags:
  - example
updatedAt: 2026-05-10
```

## Tool Fields

Tool wiki entries may include:

```yaml
kind: tool
category: knowledge-base
website: https://example.com
github: null
openSource: true
selfHosted: false
localFirst: true
offlineReady: true
pricing: Free and paid plans
gitSupport: Git-native or export-based
bestFor:
  - Local writing
pseo:
  compare: true
  workflow: true
```

## Naming Rules

- Boolean fields use `true` or `false`.
- Slugs use lowercase English and hyphens.
- Tool IDs use lowercase English.
- Dates use `YYYY-MM-DD`.
- Keep tags focused and short.
- Keep descriptions concise and specific.
