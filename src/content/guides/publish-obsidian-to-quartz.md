---
title: How to publish an Obsidian vault as a website
description: Use GitHub and Quartz to publish an Obsidian Markdown knowledge base as a public wiki.
customSlug: publish-obsidian-to-quartz
status: published
quickAnswer: Publish Obsidian to Quartz by curating a public vault or content folder, checking frontmatter and links, then building the Quartz site from Git. Do not publish private vaults wholesale.
faq:
  - question: Can Quartz publish a full Obsidian vault?
    answer: Technically yes, but a curated public folder is safer. Review private notes, attachments, backlinks, and drafts before they enter the Quartz content directory.
  - question: Do Obsidian wikilinks work in Quartz?
    answer: Quartz is designed for Obsidian-style Markdown support, but you should still build and click through important links before publishing.
difficulty: intermediate
timeRequired: 60min
relatedStack: personal-wiki-obsidian-quartz
relatedKits:
  - personal-wiki-kit
relatedWiki:
  - tools/obsidian
  - tools/quartz
  - tools/github
  - concepts/git-based-publishing
tags:
  - obsidian
  - quartz
  - publishing
updatedAt: 2026-05-09
---

## What you will have

A public personal wiki website.

## Basic path

```txt
Obsidian Vault -> GitHub -> Quartz -> Hosting
```

## Step overview

1. Prepare a public vault.
2. Push the vault to GitHub.
3. Initialize a Quartz project.
4. Connect the Markdown content to Quartz.
5. Deploy to GitHub Pages, Cloudflare Pages, or Vercel.

## Pre-publication checklist

- Does the vault contain private notes?
- Does it include images you do not have permission to publish?
- Is the homepage clear?
- Does each note have a title and summary?

## Next step

If you do not have a public vault yet, start with [Personal Wiki Kit](/kits/personal-wiki-kit).
