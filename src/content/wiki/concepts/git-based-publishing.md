---
title: Git-based publishing
description: Git-based publishing manages content in a Git repository and publishes a site through automated builds.
customSlug: concepts/git-based-publishing
kind: concept
category: publishing
status: p2
website: null
github: null
openSource: null
selfHosted: true
localFirst: true
offlineReady: true
dataFormats:
  - Git
  - Markdown
platforms:
  - Web
relatedStacks:
  - writer-obsidian-github
  - personal-wiki-obsidian-quartz
relatedKits:
  - writer-vault-starter
tags:
  - git
  - publishing
  - version-control
updatedAt: 2026-05-09
---

## Definition

Git-based publishing is a publishing workflow where content lives in a Git repository. Each commit can trigger a build and publish the result to a website.

## Why it fits Offpedia

It gives content a durable operational layer:

- Version history
- Rollbacks
- Collaboration
- Review
- Automated deployment

## Typical stack

```txt
Obsidian -> Markdown -> GitHub -> Astro or Quartz -> GitHub Pages
```
