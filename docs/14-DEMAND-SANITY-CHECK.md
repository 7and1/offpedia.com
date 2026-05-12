# Demand Sanity Check: Notion to Obsidian Migration Cleanup

Date: 2026-05-12

Scope: free demand validation for the first Offpedia migration wedge. This pass used web search result inspection, Reddit result inspection, official docs, GitHub issue/repository inspection, and unauthenticated GitHub repository search. It did not use Semrush, Ahrefs, Search Console, Google Trends, or a logged-in browser. AI Overview and autocomplete were not verified in this pass.

## Decision

Proceed to SAMPLE-001, but do not frame the first migration asset around the generic query `migrate Notion to Obsidian`.

The stronger wedge is:

> Clean up and audit what remains after Obsidian Importer: linked databases, database/Bases rebuild decisions, frontmatter schema, private-path risk, and publishing readiness.

The demand signal is strong enough to justify real template sampling because 3 of the 5 checked query angles are GO or GO/PIVOT. The first article should be built from fixture/script evidence, not from a generic migration guide.

## Query Verdicts

| Query angle | SERP signal | Reddit signal | GitHub signal | Verdict | Action |
| --- | --- | --- | --- | --- | --- |
| `notion export markdown broken` | Real demand, but broad. Results include official Notion export docs, Notion-to-Markdown tools, and posts about broken exports. | Related migration pain appears, but the exact wording is not tightly Obsidian-specific. | Exact repo search returned 0; broad `notion obsidian markdown` returned 100 repos, including conversion tools. | PIVOT | Use as a supporting H2, not the page title. Rephrase toward cleanup after Importer. |
| `obsidian importer database not working` | Strong fit. Official Obsidian docs and forum/GitHub surfaces discuss Notion database import limits, large workspace issues, and API import behavior. | Strong fit. Reddit threads discuss databases becoming tables, Bases conversion, relation/linked database behavior, and messy imports. | Exact repo search returned 0; broad `obsidian importer notion` returned 16 repos, mostly low-star or generic. Official Importer owns import, not cleanup QA. | GO | Make database/Bases audit one of the first evidence sections. |
| `notion to obsidian missing linked databases` | Strongest wedge. Official Obsidian docs and Notion developer docs both confirm linked data sources are not supported by the Notion API. | Strong fit. The Obsidian Importer announcement thread has direct discussion of linked databases not being imported. | Exact repo search returned 0. No visible high-star cleanup tool owns this query. | GO | Make this a primary H2 and fixture requirement. |
| `clean up notion markdown export` | Real demand, but broad. Commercial tools and blog posts already target clean Markdown export. | Strong fit when constrained to Obsidian: messy import and cleanup threads exist. | Exact `notion export cleanup markdown` repo search returned 0; broad Notion-to-Obsidian tools exist. | GO/PIVOT | Use `cleanup after Notion -> Obsidian import`, not generic Markdown cleanup. |
| `notion to obsidian frontmatter` | Narrow direct demand. Tools mention YAML/frontmatter, but search intent is mixed between publishing, export automation, and Obsidian properties. | Present but not dominant. Reddit discussions point users toward Properties/YAML after migration. | Broad `notion obsidian frontmatter` returned 5 repos; no dominant cleanup/audit repo. | PIVOT | Treat as publishing-readiness and schema section, not standalone pSEO page. |

## Evidence Notes

### Official Notion export behavior

Notion's own export docs confirm the raw export shape that Offpedia needs to audit:

- Markdown & CSV export produces Markdown for non-database pages and CSV files for databases.
- Callout blocks export as HTML because Markdown has no equivalent.
- Workspace exports can include pages, databases, and files, but large exports can take many hours.
- Notion notes that exporting all database views is not supported and that Windows path length can break exported ZIP extraction.

Source: https://www.notion.com/help/export-your-content

### Official Obsidian Importer behavior

Obsidian's Notion import docs confirm that Importer reduces but does not eliminate migration cleanup:

- API import can preserve workspaces, databases, and formulas by converting databases to Bases.
- File import does not preserve databases.
- Only the primary view for each database is imported.
- Linked data sources are not imported.
- Large workspaces can hit nested ZIP import problems.
- The docs explicitly tell users to report conversion issues because Notion API import is new and edge cases may remain.

Source: https://help.obsidian.md/import/notion

### Notion API structural limitation

Notion developer docs confirm that linked databases / linked data sources are not currently supported by the Public API. This is a structural wedge, not just an Importer bug.

Source: https://developers.notion.com/docs/working-with-databases#linked-data-sources

### Official Importer bounty confirms database demand

The Obsidian Importer issue `#421` put a $5,000 bounty on Notion API import with Databases-to-Bases conversion. Even though that issue is now closed, it validates that database migration was hard enough and valuable enough to merit official engineering attention.

Source: https://github.com/obsidianmd/obsidian-importer/issues/421

### Reddit confirms post-import pain

Relevant Reddit evidence was not just generic "should I switch?" discussion. It included concrete importer/database pain:

- Obsidian Importer announcement thread: high engagement, questions about linked databases, and a maintainer response that linked databases are not supported due to Notion API limits.
- User reports where databases became tables, relation behavior needed clarification, and linked views raised questions.
- A separate tool-builder thread reports a 1.8GB Notion workspace where existing tools failed, then describes link conversion, filename cleanup, and database limitations.
- Messy import threads show users manually cleaning Notion imports after using importer-style workflows.

Sources:

- https://redd.it/1p443p0
- https://redd.it/1nyw5c4
- https://redd.it/1ik3hxg

### GitHub competition is real but not fatal

Unauthenticated GitHub repository search snapshot:

| GitHub query | Total count | Notable result | Interpretation |
| --- | ---: | --- | --- |
| `"notion export markdown broken" notion obsidian` | 0 | None | Exact cleanup wording is not repo-owned. |
| `"obsidian importer" "database" notion` | 0 | None | Exact problem query is not repo-owned. |
| `"notion to obsidian" "linked databases"` | 0 | None | Linked-database cleanup is not repo-owned. |
| `"clean up" "notion" "markdown export" obsidian` | 0 | None | Exact cleanup phrase is not repo-owned. |
| `"notion to obsidian" frontmatter` | 0 | None | Exact frontmatter migration phrase is not repo-owned. |
| `notion obsidian migration` | 10 | Small migration scripts, mostly low-star | Niche exists, but no dominant cleanup/audit repo. |
| `notion obsidian markdown` | 100 | `bitbonsai/notion2obsidian`, broader Markdown tools | Conversion tools exist. Offpedia must avoid being only a converter. |
| `obsidian importer notion` | 16 | Mostly low-star importer helpers | Official Importer is the main import path; Offpedia should be the QA layer. |
| `notion obsidian frontmatter` | 5 | Frontmatter/database plugins and sync tools | Frontmatter is a section-level angle, not the main keyword. |

Notable competitor/tool:

- https://github.com/bitbonsai/notion2obsidian

## Content Positioning

Do not publish another generic migration guide titled "How to migrate Notion to Obsidian". That phrase is already served by official docs, Reddit, YouTube-style guides, and conversion tools.

Recommended first page title:

> Notion to Obsidian cleanup checklist: linked databases, Bases, frontmatter, and publishing readiness after Importer

Recommended H2 lock:

- Why linked databases are still missing after Obsidian Importer.
- How to audit Notion databases after they become Obsidian Bases.
- How to clean up a Notion export without rebuilding every note by hand.
- What frontmatter imported Notion pages need before publishing.
- What not to migrate: linked views, stale dashboards, private pages, duplicate slugs.

## Sampling Implications

SAMPLE-001 can still be a text-light public template if the immediate goal is to prove the audit-pair workflow. If the goal is to produce article-grade evidence quickly, promote a database-heavy or linked-database template earlier.

Minimum fixture requirements before writing the flagship page:

- At least one database-heavy sample.
- At least one sample with linked database or repeated database view behavior.
- At least one sample where Importer improves the raw export but still leaves residual findings.
- Before/after score delta from `audit:notion:pair`.
- A human note for any visible problem that the script does not yet detect.

## Next Actions

1. Continue to real samples; do not wait for paid keyword tools.
2. For SAMPLE-001, either keep the existing text-light plan as a workflow smoke test or switch the first real sample to database-heavy if article evidence is the priority.
3. Add a manual field in `fixtures/REAL-SAMPLES.md` when a sample includes linked database behavior, because the current audit script may not detect it from file output alone.
4. After five samples, build a rollup table by finding ID: fixed, improved, still present, new, and worsened.
5. Draft the flagship page only after the database/linked-database sample has produced reproducible before/after evidence.

## Residual Unknowns

- Google autocomplete was not captured, so exact query phrasing is still provisional.
- Google Trends was not checked, so seasonality and macro trend are unknown.
- Search Console is still unavailable, so Offpedia-owned impression data is missing.
- Real Notion public-template exports are still required; current evidence is demand-side only.
