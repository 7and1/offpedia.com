---
title: "Personal Wiki Stack: Obsidian + Quartz"
shortTitle: Personal Wiki Stack
description: Use Obsidian to manage a Markdown knowledge base and Quartz to publish it as a public website.
customSlug: personal-wiki-obsidian-quartz
status: p2
goal: personal-wiki
personas:
  - researcher
  - writer
  - developer
coreTools:
  - obsidian
  - quartz
  - github
optionalTools:
  - cloudflare-pages
  - pagefind
offlineReady: true
localFirst: true
gitNative: true
publishReady: true
difficulty: intermediate
setupTime: 60min
maintenance: medium
relatedWiki:
  - tools/obsidian
  - tools/quartz
  - tools/github
  - concepts/markdown
  - concepts/git-based-publishing
relatedKits:
  - personal-wiki-kit
relatedGuides:
  - publish-obsidian-to-quartz
tags:
  - wiki
  - obsidian
  - quartz
  - publishing
updatedAt: 2026-05-09
---

## What this stack solves

This stack upgrades a private knowledge base into a website other people can browse.

## Core roles

- Obsidian handles local editing and writing.
- GitHub handles version control and deployment triggers.
- Quartz generates a linked static site.
- Cloudflare Pages or GitHub Pages hosts the site.

## Best for

- People who want to publish selected notes
- Technical writers
- Personal knowledge-base maintainers
- Course, research, and product-log authors

## Recommended folder structure

```txt
Personal Wiki/
├── index.md
├── concepts/
├── tools/
├── projects/
├── logs/
├── references/
└── assets/
```

## Publishing notes

A public wiki should not be a raw dump of every private note. Keep a clear split between:

- Private vault
- Public vault
- Drafts waiting for review

## Matching kit

Use [Personal Wiki Kit](/kits/personal-wiki-kit).
