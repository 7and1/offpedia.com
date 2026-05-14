---
title: Obsidian Importer before-after audit
description: Compare a raw Notion export with an imported Obsidian vault so cleanup work targets the risks that remain.
customSlug: obsidian-importer-before-after-audit
status: published
quickAnswer: A before-after audit compares raw export findings with imported vault findings, showing what Obsidian Importer fixed, what remains, and what new cleanup issues appeared.
faq:
  - question: Why audit both folders?
    answer: The raw export shows source risk, while the imported vault shows actual Obsidian cleanup work. You need both to avoid guessing.
  - question: Can I use this as a migration report?
    answer: Yes, but redact it before sharing. Findings can include local paths, page titles, and file names.
difficulty: intermediate
timeRequired: 25min
relatedStack: personal-wiki-obsidian-quartz
relatedKits: []
relatedWiki:
  - concepts/notion-export
  - concepts/publishing-readiness
  - tools/obsidian
tags:
  - notion
  - obsidian-importer
  - audit
  - cleanup
updatedAt: 2026-05-14
---

## The comparison problem

Looking only at the final imported vault hides where problems came from. Looking only at the raw export hides what the importer actually resolved. A before-after audit gives you a cleanup map.

## Run the pair audit

Use the local tool entry for the command:

```bash
npm run audit:notion:pair -- --before <raw-export-dir> --after <imported-vault-dir> --sample-id SAMPLE-001 --out /tmp/offpedia-samples
```

See [Notion Export Auditor](/tools/notion-export-auditor) for the privacy boundary and command notes.

## Read the result

Sort findings into:

- Fixed by import
- Still present after import
- Newly introduced after import
- Needs human review

Start with still-present findings that block navigation, privacy, or publishing.

## Acceptance check

The audit is useful when it names the remaining cleanup work clearly enough that you can assign each issue to fix, archive, ignore, or review.

## Related paths

- [Notion export sample audit report](/guides/notion-export-sample-audit-report)
- [Notion to Obsidian cleanup checklist](/guides/notion-to-obsidian-cleanup-checklist)
