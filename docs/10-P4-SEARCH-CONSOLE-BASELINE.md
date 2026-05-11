# P4 Search Console Baseline

Date: 2026-05-11

## Status

Search Console submission is the only P4 item that cannot be completed from this workspace without an authenticated Google Search Console surface.

Do not use the deprecated sitemap ping endpoint. Use Search Console or the Search Console API only.

## Baseline Inputs

- Canonical property: `https://offpedia.com/`
- Preferred domain: `offpedia.com`
- Sitemap: `https://offpedia.com/sitemap-index.xml`
- Current sitemap child: `https://offpedia.com/sitemap-0.xml`
- Canonical redirect: `https://www.offpedia.com/` redirects to `https://offpedia.com/`
- Robots endpoint: `https://offpedia.com/robots.txt`

## Submit

1. Open Google Search Console with an account that owns or has full access to the `offpedia.com` property.
2. Confirm the property type is either the domain property `offpedia.com` or the URL-prefix property `https://offpedia.com/`.
3. Submit `https://offpedia.com/sitemap-index.xml` under **Indexing -> Sitemaps**.
4. Record the submission date, status, discovered URL count, and any sitemap fetch error.

## URL Inspection Set

Inspect these URLs after sitemap submission:

- `https://offpedia.com/`
- `https://offpedia.com/finder/`
- `https://offpedia.com/compare/obsidian-vs-notion/`
- `https://offpedia.com/stacks/writer-obsidian-github/`
- `https://offpedia.com/kits/writer-vault-starter/`
- `https://offpedia.com/workflow/obsidian-with-github/`

For each URL, record:

- Google-selected canonical
- User-declared canonical
- Crawl allowed status
- Indexing status
- Last crawl date, if available
- Mobile usability status, if available

## Baseline Metrics

Capture the first baseline row even if there is no data yet:

```txt
Date:
Property:
Sitemap submitted:
Sitemap status:
Discovered URLs:
Indexed sample URLs:
Performance clicks, last 7 days:
Performance impressions, last 7 days:
Top queries:
Top pages:
Open issues:
```

## Production Robots Note

The fetched production `robots.txt` currently includes Cloudflare Managed Content Signals before the repository-owned robots content. Regular search crawling remains allowed and the sitemap directive is present, but several AI/training crawlers are blocked at the edge layer.

This is not a Google Search Console blocker. If Offpedia later prioritizes AI-answer citation visibility, review Cloudflare crawler controls as part of P4.1 or a separate GEO pass instead of changing repository files alone.

