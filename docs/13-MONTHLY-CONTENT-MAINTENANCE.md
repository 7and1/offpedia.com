# Monthly Content Maintenance

Run this once per month or before a major visibility push.

## Content and relationship checks

1. Refresh tool facts that depend on pricing, hosting, export, or platform claims.
2. Run `npm run validate:content`.
3. Run `npm run search:index`.
4. Run `npm run health:workflow`.
5. Review stacks missing kits, guides, or fresh update dates.

## Publishing and discovery checks

1. Run `npm run build`.
2. Confirm `dist/sitemap-0.xml` includes the priority watchlist URLs.
3. Confirm `public/search-index.json` includes new routes and refreshed descriptions.
4. Check `/rss.xml` after build to confirm the latest published items are present.

## Operator checks outside the repo

1. Review Search Console sitemap and indexing issues.
2. Spot-check the top pages on production.
3. Verify official product links used in wiki entries still resolve and still match the claim.
