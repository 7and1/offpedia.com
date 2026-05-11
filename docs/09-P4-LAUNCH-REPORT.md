# P4 Launch Report

Date: 2026-05-11

## Release

- Commit: `22bc583` (`Prepare Offpedia P4 release candidate`)
- Canonical domain: `https://offpedia.com`
- GitHub Pages workflow run: `25649804633`
- Deployment status: passed

## Build Evidence

Commands run from the approved OpenClaw runtime workspace at `/Users/openclaw/test-workspace/offpedia-com`:

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

The OpenClaw browser wrapper itself was blocked by a pre-existing receipt-chain error, so browser QA used direct CDP against the running OpenClaw Chromium port instead of the wrapper.

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
- Blocker: no authenticated Search Console API or `gcloud` surface was available locally.
- Google's supported submission paths are Search Console and the Search Console API; the old sitemap ping endpoint is deprecated.

## Residual Risks

- GitHub Actions emitted a Node.js 20 action deprecation annotation. The workflow passed, but the action versions should be reviewed before GitHub's Node 24 runner migration deadlines.
- `npm ci` reported dependency audit findings in the transitive dependency tree. They were not changed in this P4 release pass.
- Search Console baseline metrics still need to be captured once an authenticated Search Console surface is available.
