# P4 Launch Report

Date: 2026-05-11

## Release

- Commit: `22bc583` (`Prepare Offpedia P4 release candidate`)
- Canonical domain: `https://offpedia.com`
- GitHub Pages workflow run: `25649804633`
- Deployment status: passed

## P4 Scope

In scope:

- Ship the GitHub Pages publication surface.
- Verify canonical domain, sitemap, robots, public routes, and browser-rendered routes.
- Generate and verify the local search index.
- Prepare Search Console sitemap submission and baseline capture.

Out of scope:

- Making the repository public.
- Open-source readiness audit of git history, private operations notes, credentials, or historical artifacts.
- Changing Cloudflare, DNS, Search Console, or GitHub repository settings without an authenticated operator surface.

## Build Evidence

Commands run from the approved remote runtime workspace:

- `CI=1 ASTRO_TELEMETRY_DISABLED=1 npm run check`: passed with 0 errors.
- `npm run validate:content`: passed, 24 content files.
- `npm run search:index`: passed, 63 search records.
- `CI=1 ASTRO_TELEMETRY_DISABLED=1 npm run build`: passed, 72 pages built.

Local static commands from `source/`:

- `npm run validate:content`: passed, 24 content files.
- `npm run search:index`: passed, 63 search records.
- `rg "[\\p{Han}]" . --glob '!node_modules/**' --glob '!dist/**' --glob '!.git/**' --glob '!package-lock.json'`: no matches.
- `git diff --check`: passed.

## Pages Status

GitHub Pages API after deploy:

- `build_type`: `workflow`
- `cname`: `offpedia.com`
- `html_url`: `http://offpedia.com/`
- `https_enforced`: `false`
- certificate state: not reported by the API response

HTTPS is reachable at `https://offpedia.com/`, but Pages API should be checked again before enabling HTTPS enforcement.

## Public Route Checks

HTTP route checks after deploy:

- `https://offpedia.com/`: 200
- `https://www.offpedia.com/`: 200, final URL `https://offpedia.com/`
- `https://offpedia.com/finder`: 200, final URL `https://offpedia.com/finder/`
- `https://offpedia.com/compare/obsidian-vs-notion/`: 200
- `https://offpedia.com/stacks/writer-obsidian-github/`: 200
- `https://offpedia.com/kits/writer-vault-starter/`: 200
- `https://offpedia.com/sitemap-index.xml`: 200

OpenClaw headless Chromium CDP checks after deploy:

- Homepage rendered with the workflow-advisor headline and `index,follow`.
- `www` rendered and canonicalized to apex.
- `/finder/` rendered the recommendation, reason, warning, action, kit, guide, alternative, and trust criteria.
- `/compare/obsidian-vs-notion/` rendered the comparison matrix and visible FAQ content aligned with FAQPage JSON-LD.
- `/kits/writer-vault-starter/` rendered the kit page and next action.
- `/sitemap-index.xml` rendered the sitemap index.

The standard browser wrapper was unavailable during this check, so browser QA used a direct Chromium DevTools session instead.

## Sitemap And Indexing

Generated sitemap checks:

- `dist/sitemap-index.xml` points to `https://offpedia.com/sitemap-0.xml`.
- `dist/sitemap-0.xml` includes `/finder/`, `/compare/obsidian-vs-notion/`, `/stacks/writer-obsidian-github/`, `/kits/writer-vault-starter/`, and `/workflow/obsidian-with-github/`.
- Compare URLs in sitemap: 29 including the `/compare/` index route.
- Generated compare pages currently render with `index,follow` because the eligible tool records pass the comparison-data completeness gate.

Search index checks:

- `dist/search-index.json` contains `/finder`.
- It contains flagship compare, stack, and kit entries.
- It contains `/for/writer/writing`.
- It contains all four seeded `/workflow/*` pages.

Search Console status:

- Not submitted from this workspace.
- Blocker: no authenticated Search Console surface was available in this workspace.
- Google's supported submission paths are Search Console and the Search Console API; the old sitemap ping endpoint is deprecated.
- Baseline runbook added in `docs/10-P4-SEARCH-CONSOLE-BASELINE.md`.

Production robots status observed on 2026-05-11:

- `https://offpedia.com/robots.txt` returns `200`.
- The sitemap directive is present.
- Cloudflare Managed Content Signals are injected before the repository-owned robots content.
- Regular search crawling remains allowed.
- Several AI/training crawlers are blocked at the edge layer; this is not a Search Console blocker, but it should be reviewed before a separate GEO/AI-citation pass.

## 2026-05-11 Hardening Update

- `.github/workflows/deploy.yml` now uses Node.js 22 for the build runtime.
- Official GitHub action majors were updated to the Node 24-compatible release line: `actions/checkout@v6`, `actions/setup-node@v6`, `actions/configure-pages@v6`, `actions/upload-pages-artifact@v5`, and `actions/deploy-pages@v5`.
- Workflow environment now sets `CI=1` and `ASTRO_TELEMETRY_DISABLED=1`.
- Current `gh` authentication in this workspace cannot resolve `7and1/offpedia.com`, so Pages API and Actions-run status could not be rechecked from this machine after the workflow hardening change.
- `https://offpedia.com/`, `https://www.offpedia.com/`, `https://offpedia.com/sitemap-index.xml`, and `https://offpedia.com/robots.txt` were reachable during the P4 follow-up check.

Validation after hardening:

- `git ls-remote --tags` confirmed the configured official action tags exist.
- Local `npm run validate:content`: passed, 24 content files.
- Local `npm run search:index`: passed, 63 search records.
- Local `git diff --check`: passed.
- Remote OpenClaw temp workspace `npm ci`: passed; npm audit still reports 9 findings in the transitive tree.
- Remote OpenClaw temp workspace `CI=1 ASTRO_TELEMETRY_DISABLED=1 npm run check`: passed with 0 errors, 0 warnings, and 6 existing Astro hints.
- Remote OpenClaw temp workspace `npm run validate:content`: passed, 24 content files.
- Remote OpenClaw temp workspace `npm run search:index`: passed, 63 search records.
- Remote OpenClaw temp workspace `CI=1 ASTRO_TELEMETRY_DISABLED=1 npm run build`: passed, 72 pages built.
- Remote built `dist/about/index.html` contains the updated license and open-source-readiness wording.
- Remote built `dist/sitemap-0.xml` contains the P4 sample route set.
- Remote built `public/search-index.json` contains the P4 sample route set.
- The temporary OpenClaw verification directory was removed after validation.

## Residual Risks

- The previous GitHub Actions Node.js 20 action deprecation risk has been mitigated in workflow configuration, but the next push to `main` must confirm a passing Actions run.
- `npm ci` reported dependency audit findings in the transitive dependency tree. They were not changed in this P4 release pass.
- Search Console baseline metrics still need to be captured once an authenticated Search Console surface is available.
- Standard wrapper-based browser QA may remain blocked until the runtime health surface is repaired.

## 2026-05-11 90-Day Plan Implementation Update

Local implementation commit:

- `1fbee8c` (`Implement Offpedia 90-day plan surfaces`)

Repository-owned surfaces implemented:

- `/finder/` upgraded to Stack Generator v1 with a Preact island and a server-rendered default result.
- `/contributors/` added as the public contribution entry.
- `/rss.xml` added with RSS discovery metadata and footer link.
- Workflow health signals added to stack pages.
- Content expanded from 24 Markdown files to 36 Markdown files.
- Open-source readiness, indexing watchlist, monthly maintenance, contributing, and security docs added.
- Content validation now checks frontmatter and internal links.
- Workflow health script now checks kit coverage, guide coverage, stale updates, orphan wiki records, search index coverage, and built sitemap coverage.
- Browser smoke script now checks the main public routes across desktop and mobile viewports plus `/rss.xml`.

Validation after the implementation commit:

- Local `git diff --check`: passed.
- Local `npm run validate:content`: passed, 36 content files and 47 internal links.
- Local `npm run search:index`: passed, 76 search records.
- Local `npm run health:workflow`: script runs; local sitemap verification requires `dist/sitemap-0.xml`, which is only present after build.
- Remote runtime `npm ci`: passed; npm audit reported 11 findings in the transitive dependency tree.
- Remote runtime `CI=1 ASTRO_TELEMETRY_DISABLED=1 npm run check`: passed with existing warnings/hints only.
- Remote runtime `npm run validate:content`: passed.
- Remote runtime `npm run search:index`: passed.
- Remote runtime `CI=1 ASTRO_TELEMETRY_DISABLED=1 npm run build`: passed, 85 pages built.
- Remote runtime `npm run health:workflow`: passed, workflow health clean after build.
- Remote runtime preview plus `npm run browser:smoke`: passed for 8 routes across desktop and mobile plus `/rss.xml`.

GitHub and production status:

- `main` is now ahead of `origin/main` by 2 local commits: `a5cbe90` and `1fbee8c`.
- `git fetch origin main` and `gh repo view 7and1/offpedia.com` both failed with repository-not-found errors under the available GitHub login states.
- Push, new GitHub Actions run observation, Pages deploy verification, Search Console submission, and public visibility change remain environment-blocked until an authenticated operator surface can access `7and1/offpedia.com`.
