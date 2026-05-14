---
title: Notion export sample audit report
description: Read the Offpedia fixture audit result and understand how findings map to real Notion to Obsidian cleanup decisions.
customSlug: notion-export-sample-audit-report
status: published
quickAnswer: "The sample audit report is a teaching fixture: it shows typical Notion export risks such as CSV databases, missing links, HTML leftovers, duplicate titles, private paths, and incomplete publishing metadata."
faq:
  - question: Is the sample report based on private user data?
    answer: No. It is a repository fixture designed to exercise the auditor without exposing a real workspace.
  - question: Should my real score match the fixture score?
    answer: No. Use the score to prioritize cleanup, not to compare workspaces. Different exports have different risk shapes.
difficulty: beginner
timeRequired: 15min
relatedStack: personal-wiki-obsidian-quartz
relatedKits: []
relatedWiki:
  - concepts/notion-export
  - concepts/publishing-readiness
tags:
  - notion
  - audit
  - sample
  - obsidian
updatedAt: 2026-05-14
---

## Why this sample exists

The Offpedia repository includes a small Notion export fixture so the auditor can be tested without real private data. The current fixture is designed to produce six finding IDs and a low cleanup score, which makes it useful for explaining the report shape.

## What the sample demonstrates

The sample includes risks that often appear in real migrations:

- CSV database exports that need a rebuild plan
- Missing local links or attachments
- HTML files that are not final Markdown notes
- Notion web URLs still present in Markdown
- Duplicate page titles
- Private-looking paths
- Incomplete publishing metadata

## How to use the report

Do not copy the sample findings mechanically. Instead, use them as categories:

1. Does my export have this risk?
2. Does the imported vault still have it?
3. Does it block publishing, search, or navigation?
4. Is the right action fix, archive, delete, or ignore?

## Acceptance check

You understand the report when every finding can be translated into a concrete cleanup decision instead of a vague warning.
