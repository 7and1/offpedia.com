---
title: Cloudflare Pages
description: Cloudflare Pages is a static hosting platform with preview deployments, edge delivery, and repo-connected workflows for Markdown publishing projects.
customSlug: tools/cloudflare-pages
kind: tool
category: hosting
status: published
website: https://pages.cloudflare.com
github: null
openSource: false
selfHosted: false
localFirst: false
offlineReady: false
pricing: Free tier with paid usage beyond included limits.
gitSupport: Git-connected deployment workflow with preview builds.
bestFor:
  - Static site hosting
  - Preview deployments
  - Edge-delivered docs and wiki sites
pseo:
  compare: false
  workflow: false
dataFormats:
  - Git
  - Static assets
  - HTML
platforms:
  - Web
limitations:
  - Cloudflare Pages is a hosting surface, not the source of truth, so keep the Markdown and build repo portable outside the platform.
  - Operators still need to manage environment variables, domain settings, and build expectations separately from the content workflow.
relatedStacks:
  - personal-wiki-obsidian-quartz
relatedKits:
  - personal-wiki-kit
tags:
  - cloudflare
  - hosting
  - publishing
updatedAt: 2026-05-11
---

## One-line definition

Cloudflare Pages hosts static sites with repo-connected builds and preview URLs.

## Why it fits Offpedia

It is a good runtime layer when Quartz or another static generator already owns the content transformation. The hosting layer should stay replaceable.

## Recommended next step

- Read [Personal Wiki Stack: Obsidian + Quartz](/stacks/personal-wiki-obsidian-quartz)
