# Indexing Watchlist

Date: 2026-05-11

Search Console metrics are still pending an authenticated operator surface. The local build can still track whether important URLs are in the search index and sitemap.

## Priority URLs

| URL | Why it matters | Search index | Sitemap | Search Console |
| --- | --- | --- | --- | --- |
| `/finder/` | Stack Generator primary entry point | Expected | Expected | Pending operator baseline |
| `/contributors/` | Public contribution entry and repo trust surface | Expected | Expected | Pending operator baseline |
| `/compare/obsidian-vs-notion/` | Flagship compare page | Expected | Expected | Pending operator baseline |
| `/stacks/writer-obsidian-github/` | Flagship writing stack | Expected | Expected | Pending operator baseline |
| `/stacks/researcher-obsidian-zotero/` | Research stack and new kit path | Expected | Expected | Pending operator baseline |
| `/kits/research-notes-vault/` | New research kit | Expected | Expected | Pending operator baseline |
| `/workflow/quartz-with-github-pages/` | Workflow explanation page tied to publishing path | Expected | Expected | Pending operator baseline |
| `/for/writer/writing/` | Persona-goal pSEO route | Expected | Expected | Pending operator baseline |

## Watch process

1. Run `npm run search:index`.
2. Run `npm run build`.
3. Run `npm run health:workflow` and confirm the watch URLs are not missing from the generated surfaces.
4. Once Search Console access exists, record indexing, canonical, and performance signals for the same list.

## Search Console fields to capture later

- Sitemap submission status
- Discovered URL count
- URL inspection result
- Google-selected canonical
- Last crawl date
- Clicks and impressions for the last 7 days
