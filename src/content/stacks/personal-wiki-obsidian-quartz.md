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
outcome: A Markdown-first publishing workflow that turns a curated vault into a public wiki without giving up file ownership.
quickVerdict: Choose this when you want a personal wiki or digital garden that starts from your own Markdown source of truth.
idealFor:
  - Personal wiki builders publishing selected notes
  - Technical writers who want repo-based docs without losing Markdown ownership
  - Researchers or creators turning a vault into a browseable public knowledge base
avoidIf:
  - You need a fully collaborative team documentation product first
  - You want publishing with zero Git exposure
  - You plan to dump every private note directly onto the public site
proofPoints:
  - Obsidian keeps the private working vault local and editable.
  - GitHub holds the publishable repo and deployment history.
  - Quartz is built for linked Markdown sites and works well with Obsidian-style structures.
alternatives:
  - label: Quartz vs Docusaurus
    href: /compare/quartz-vs-docusaurus
    reason: Use this when you are choosing between a personal wiki and a team-maintained docs framework.
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

## Not ideal for

- Realtime multi-editor team docs
- Database-heavy knowledge hubs
- People who do not want a curated public/private split

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

## Limits

- The public site should be treated as a curated surface, not a mirror of every private note.
- Git and deploy steps add maintenance overhead compared with hosted note-sharing tools.
- Media-heavy sites need an asset strategy before the repo grows too large.
