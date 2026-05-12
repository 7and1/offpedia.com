# Real Notion Migration Samples

Track only public-safe metadata and aggregate audit results here. Do not commit raw exports, private workspace content, file names, page titles, frontmatter values, attachment names, or personal data.

## Sampling Rules

- Record counts, categories, finding IDs, and finding totals only.
- Run every sample twice: raw Notion export first, then the Obsidian Importer output with the raw report as `--baseline`.
- Stop after five diverse public-template samples, expand findings if needed, then resume sampling.
- Keep raw exports and imported vaults outside the repository unless they have been reduced to a synthetic fixture.
- Use public Notion templates first; private donated exports need explicit consent and must be reduced to metadata before any public record.

## Shape Labels

- `text-light`: mostly pages and headings, few databases or attachments.
- `database-heavy`: multiple CSV/database exports drive most of the structure.
- `nested-heavy`: deep page hierarchy, wiki, handbook, or project tree.
- `attachment-heavy`: images, PDFs, docs, or other binaries dominate cleanup risk.
- `multi-db-relational`: GTD, PARA, CRM, roadmap, or tracker with multiple linked databases.

## Diversity target (first 5 samples)

Aim for coverage before depth. Stop at 5, extend findings if new patterns appeared, then decide whether to keep going.

| Slot | Shape target | Source pool suggestion |
| --- | --- | --- |
| SAMPLE-001 | text-light | Personal journal / writing template |
| SAMPLE-002 | database-heavy | CRM / contacts template |
| SAMPLE-003 | nested-heavy | Company handbook / wiki template |
| SAMPLE-004 | attachment-heavy | Reading list / research log template |
| SAMPLE-005 | multi-db-relational | GTD / PARA / project tracker template |

## Workflow

For each slot:

1. Export a public Notion template from your own account (Markdown & CSV, include subpages, include attachments).
2. Open a clean working Obsidian vault and run Obsidian Importer against the export.
3. From `source/`, run:

   ```bash
   npm run audit:notion:pair -- \
     --sample-id SAMPLE-001 \
     --label "SAMPLE-001 text-light writing template" \
     --source "https://www.notion.com/templates/..." \
     --license "Notion public template" \
     --shape text-light \
     --before /absolute/path/to/raw-notion-export \
     --after  /absolute/path/to/vault-after-importer \
     --notion-export-format 2026-05 \
     --obsidian-importer v1.6.x \
     --obsidian v1.5+ \
     --out /tmp/offpedia-samples
   ```

4. Replace the matching `SAMPLE-00X` block below with the contents of `/tmp/offpedia-samples/sample-001/sample-001-snippet.md` (also printed to stdout).
5. Delete the working output directory and the raw export from disk once the snippet is committed.

## Snippet shape

`audit:notion:pair` emits exactly this block per sample. Do not hand-edit the numbers; rerun the command if anything looks wrong.

```markdown
## <label>

- Source: <URL or "private donation">
- License/safety: <stance>
- Shape: <one of the shape labels>
- Tested on:
  - Notion export format: <label>
  - Obsidian Importer: <version>
  - Obsidian: <version>
- Counts (raw export): files=N, md=N, csv=N, html=N, assets=N
- Counts (after Importer): files=N, md=N, csv=N, html=N, assets=N
- Audit before Importer: score N/100
  - Findings: id x count, id x count, ...
- Audit after Importer: score N/100
  - Fixed: id, id, ...
  - Improved (before -> after): id (X -> Y), ...
  - Still present: id x count, ...
  - New (Importer introduced): id x count, ...
  - Worsened (before -> after): id (X -> Y), ...
- Net score delta: +N
- New finding candidates: <human note, optional>
- Notes: <human note, optional>
```

## SAMPLE-001: TBD

- Source: TBD public template URL (captured YYYY-MM-DD)
- License/safety: Notion public template, no PII
- Shape: TBD
- Counts: files=TBD, md=TBD, csv=TBD, html=TBD, assets=TBD
- Notion export format tested: YYYY-MM
- Obsidian Importer tested: TBD
- Obsidian tested: TBD
- Audit before Importer: score TBD/100, findings: [finding-id x count]
- Audit after Importer: score TBD/100, fixed: [finding-id], improved: [finding-id before -> after]
- Net delta: TBD, residual: TBD finding types
- New finding candidates triggered: TBD

## SAMPLE-002: TBD

- Source: TBD public template URL (captured YYYY-MM-DD)
- License/safety: Notion public template, no PII
- Shape: TBD
- Counts: files=TBD, md=TBD, csv=TBD, html=TBD, assets=TBD
- Notion export format tested: YYYY-MM
- Obsidian Importer tested: TBD
- Obsidian tested: TBD
- Audit before Importer: score TBD/100, findings: [finding-id x count]
- Audit after Importer: score TBD/100, fixed: [finding-id], improved: [finding-id before -> after]
- Net delta: TBD, residual: TBD finding types
- New finding candidates triggered: TBD

## SAMPLE-003: TBD

- Source: TBD public template URL (captured YYYY-MM-DD)
- License/safety: Notion public template, no PII
- Shape: TBD
- Counts: files=TBD, md=TBD, csv=TBD, html=TBD, assets=TBD
- Notion export format tested: YYYY-MM
- Obsidian Importer tested: TBD
- Obsidian tested: TBD
- Audit before Importer: score TBD/100, findings: [finding-id x count]
- Audit after Importer: score TBD/100, fixed: [finding-id], improved: [finding-id before -> after]
- Net delta: TBD, residual: TBD finding types
- New finding candidates triggered: TBD

## SAMPLE-004: TBD

- Source: TBD public template URL (captured YYYY-MM-DD)
- License/safety: Notion public template, no PII
- Shape: TBD
- Counts: files=TBD, md=TBD, csv=TBD, html=TBD, assets=TBD
- Notion export format tested: YYYY-MM
- Obsidian Importer tested: TBD
- Obsidian tested: TBD
- Audit before Importer: score TBD/100, findings: [finding-id x count]
- Audit after Importer: score TBD/100, fixed: [finding-id], improved: [finding-id before -> after]
- Net delta: TBD, residual: TBD finding types
- New finding candidates triggered: TBD

## SAMPLE-005: TBD

- Source: TBD public template URL (captured YYYY-MM-DD)
- License/safety: Notion public template, no PII
- Shape: TBD
- Counts: files=TBD, md=TBD, csv=TBD, html=TBD, assets=TBD
- Notion export format tested: YYYY-MM
- Obsidian Importer tested: TBD
- Obsidian tested: TBD
- Audit before Importer: score TBD/100, findings: [finding-id x count]
- Audit after Importer: score TBD/100, fixed: [finding-id], improved: [finding-id before -> after]
- Net delta: TBD, residual: TBD finding types
- New finding candidates triggered: TBD
