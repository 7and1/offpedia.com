---
title: Frontmatter
description: Frontmatter is structured metadata at the top of a Markdown file, useful for building a data layer for wiki, stack, and kit content.
customSlug: concepts/frontmatter
kind: concept
category: metadata
status: published
website: null
github: null
openSource: null
selfHosted: null
localFirst: true
offlineReady: true
dataFormats:
  - YAML
  - Markdown
platforms: []
relatedStacks:
  - writer-obsidian-github
relatedKits:
  - writer-vault-starter
tags:
  - frontmatter
  - metadata
  - markdown
updatedAt: 2026-05-09
---

## Definition

Frontmatter is a block of YAML metadata wrapped in `---` at the top of a Markdown file.

## Why it matters

Offpedia is not a loose article archive. It is a structured content site. Frontmatter lets each entry be filtered, linked, indexed, and rendered automatically.

## Example

```yaml
---
title: Writer Stack: Obsidian + GitHub
customSlug: writer-obsidian-github
offlineReady: true
localFirst: true
relatedKits:
  - writer-vault-starter
---
```
