---
title: Notion to Obsidian publishing readiness
description: Check whether an imported Notion workspace is ready to become a public Obsidian, Quartz, or static-site knowledge base.
customSlug: notion-to-obsidian-publishing-readiness
status: published
quickAnswer: A Notion-to-Obsidian vault is publishing-ready only after private material is excluded, links resolve locally, assets are intentional, titles are canonical, and public notes have metadata.
faq:
  - question: Is publishing readiness the same as import quality?
    answer: No. Import quality checks whether content converted. Publishing readiness checks privacy, metadata, links, assets, and public structure.
  - question: Should every imported note be publishable?
    answer: No. Most migrations should create a private archive and a smaller curated public subset.
difficulty: intermediate
timeRequired: 50min
relatedStack: personal-wiki-obsidian-quartz
relatedKits:
  - personal-wiki-kit
relatedWiki:
  - concepts/publishing-readiness
  - concepts/frontmatter
  - concepts/notion-export
  - tools/quartz
tags:
  - notion
  - obsidian
  - publishing
  - quartz
updatedAt: 2026-05-14
---

## The readiness problem

An imported vault can look complete in Obsidian but still fail as a public site. Publishing adds stricter requirements: privacy review, stable URLs, metadata, asset policy, and clean navigation.

## Readiness checklist

| Area | Ready when |
| --- | --- |
| Privacy | Private notes and attachments are outside the public subset |
| Links | Internal links resolve locally |
| Titles | Duplicate titles have canonical names |
| Metadata | Public notes have title, description, date, and publish state |
| Assets | Large and private attachments are excluded |
| Structure | The public folder has an index, core topics, and related links |

## Build a public subset

Do not publish the whole imported vault by default. Create a `public` or `site` folder, copy only reviewed notes, and build from that curated set.

## Acceptance check

Pick five public notes. Each should make sense to a reader outside the original Notion workspace, avoid private context, and link to at least one useful local destination.
