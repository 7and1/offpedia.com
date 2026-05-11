---
title: "Researcher Stack: Obsidian + Zotero"
shortTitle: Researcher Stack
description: Use Zotero to manage sources and Obsidian to turn research notes into writing.
customSlug: researcher-obsidian-zotero
status: published
goal: research
personas:
  - researcher
  - student
  - analyst
coreTools:
  - obsidian
  - zotero
optionalTools:
  - better-bibtex
  - pandoc
offlineReady: true
localFirst: true
gitNative: false
publishReady: false
difficulty: intermediate
setupTime: 60min
maintenance: medium
outcome: A research workflow where the citation library and the thinking layer stay separate, traceable, and portable.
quickVerdict: Use this when you want cleaner synthesis, better source tracking, and fewer mixed-up research artifacts.
idealFor:
  - Researchers managing papers, notes, and draft arguments
  - Students building literature notes that outlive a single semester
  - Analysts who need a trail from source material to synthesis
avoidIf:
  - You want one app to be your PDF library, citation engine, and collaborative editor
  - Your work depends on heavy realtime collaboration in the drafting layer
  - You do not want any deliberate source-to-note handoff
proofPoints:
  - Zotero keeps source metadata, PDFs, and citations in a dedicated library.
  - Obsidian keeps synthesis, concept notes, and writing separate from citation storage.
  - The note layer can still be versioned or exported without moving the whole reference database.
alternatives:
  - label: Obsidian vs Logseq
    href: /compare/obsidian-vs-logseq
    reason: Use this if your research workflow is more outline-first than document-first.
relatedWiki:
  - tools/obsidian
  - tools/zotero
  - tools/better-bibtex
  - tools/pandoc
  - concepts/markdown
relatedKits:
  - research-notes-vault
relatedGuides:
  - design-frontmatter-schema
  - connect-zotero-to-obsidian
tags:
  - research
  - obsidian
  - zotero
updatedAt: 2026-05-09
---

## What this stack solves

Researchers often have plenty of material but weak connections between sources, highlights, summaries, citations, and writing.

This stack splits the work into two roles:

- Zotero manages sources and citations.
- Obsidian handles research questions, literature notes, ideas, and writing.

## Recommended folder structure

```txt
Research Vault/
├── 00 Inbox/
├── 10 Literature Notes/
├── 20 Concepts/
├── 30 Projects/
├── 40 Drafts/
└── 90 Templates/
```

## Recommended note types

- Literature note
- Concept note
- Question note
- Project note
- Draft note

## Best for

- Source-heavy reading and literature review
- Research synthesis that needs links back to evidence
- Academic or analyst workflows with long-lived notes

## Not ideal for

- Teams that need a shared realtime writing space
- Users who want source storage and final writing in the same app
- Workflows that depend on zero setup between PDFs and notes

## Next step

Start with [Research Notes Vault](/kits/research-notes-vault) if you want the folder model, note types, and templates first. Then use [How to connect Zotero to an Obsidian research flow](/guides/connect-zotero-to-obsidian) to make the source-to-note handoff predictable.

If you want the metadata layer first, use [How to design a frontmatter schema](/guides/design-frontmatter-schema) before you multiply note types or project folders.

## Useful optional additions

- [Better BibTeX](/wiki/tools/better-bibtex) makes citation keys, exports, and Zotero-to-writing handoffs more stable.
- [Pandoc](/wiki/tools/pandoc) helps when research drafts need to leave Markdown for DOCX, PDF, or another submission format without rebuilding the note layer.
