---
title: Fix Notion web links after import
description: Replace leftover notion.so links with local Obsidian links when the target page exists, and keep only intentional external references.
customSlug: notion-web-links-after-import
status: published
quickAnswer: Fix leftover Notion web links by matching each URL to an imported local note, rewriting it as an Obsidian link, and keeping only links that intentionally point back to live Notion pages.
faq:
  - question: Are all notion.so links bad after import?
    answer: No. Some may intentionally point to a live shared workspace. The risk is when internal Notion links remain because local targets were not reconciled.
  - question: What if the target page was not exported?
    answer: Leave the link as external, create a placeholder note, or remove it. Do not invent a local link that points to the wrong page.
difficulty: beginner
timeRequired: 35min
relatedStack: personal-wiki-obsidian-quartz
relatedKits: []
relatedWiki:
  - concepts/notion-export
  - tools/notion
  - tools/obsidian
tags:
  - notion
  - links
  - obsidian
  - migration
updatedAt: 2026-05-14
---

## The leftover web-link problem

After a migration, `notion.so` links can mean several things:

- A page relation that should now be a local note link
- A source reference to a live shared Notion page
- A private URL that should not be published
- A target that was not included in the export

The cleanup job is to identify which is which.

## Rewrite steps

1. Search the vault for `notion.so` and Notion app links.
2. Group links by target page ID or visible anchor text.
3. Match each target to an imported Markdown note when possible.
4. Rewrite internal targets as Obsidian links.
5. Keep external links only when they are intentional references.
6. Remove private workspace links from public notes.

## Acceptance check

Important pages should not depend on Notion web URLs for internal navigation. Public notes should not expose private workspace links.

## Related paths

- [Fix broken links in a Notion export](/guides/notion-export-broken-links)
- [Find private pages in a Notion export](/guides/notion-export-private-pages)
