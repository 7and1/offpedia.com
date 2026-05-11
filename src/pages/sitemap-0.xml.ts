import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import {
  getCompareEligibleTools,
  getIndexableComparePairs,
  getPersonaGoalPages,
  getWorkflowPages,
} from '../lib/pseo';

const site = 'https://offpedia.com';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function urlFor(path: string): string {
  const normalizedPath = path === '/' || path.endsWith('/') ? path : `${path}/`;
  return `${site}${normalizedPath}`;
}

function dateOnly(value: Date | string): string {
  return new Date(value).toISOString().slice(0, 10);
}

export const GET: APIRoute = async () => {
  const [wikiEntries, stackEntries, kitEntries, guideEntries, compareEntries] = await Promise.all([
    getCollection('wiki'),
    getCollection('stacks'),
    getCollection('kits'),
    getCollection('guides'),
    getCollection('compare'),
  ]);
  const urls = new Map<string, string | undefined>();

  for (const path of ['/', '/about', '/finder', '/search', '/contributors', '/wiki', '/stacks', '/kits', '/guides', '/compare']) {
    urls.set(urlFor(path), undefined);
  }

  for (const entry of wikiEntries) urls.set(urlFor(`/wiki/${entry.data.customSlug || entry.slug}`), dateOnly(entry.data.updatedAt));
  for (const entry of stackEntries) urls.set(urlFor(`/stacks/${entry.data.customSlug || entry.slug}`), dateOnly(entry.data.updatedAt));
  for (const entry of kitEntries) urls.set(urlFor(`/kits/${entry.data.customSlug || entry.slug}`), dateOnly(entry.data.updatedAt));
  for (const entry of guideEntries) urls.set(urlFor(`/guides/${entry.data.customSlug || entry.slug}`), dateOnly(entry.data.updatedAt));
  for (const entry of compareEntries) urls.set(urlFor(`/compare/${entry.data.customSlug || entry.slug}`), dateOnly(entry.data.updatedAt));

  for (const pair of getIndexableComparePairs(getCompareEligibleTools(wikiEntries))) {
    urls.set(urlFor(`/compare/${pair.slug}`), undefined);
  }

  for (const page of getPersonaGoalPages(stackEntries)) {
    urls.set(urlFor(`/for/${page.slug}`), undefined);
  }

  for (const workflow of getWorkflowPages(stackEntries)) {
    urls.set(urlFor(`/workflow/${workflow.slug}`), undefined);
  }

  const body = [...urls.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([loc, lastmod]) => `  <url>
    <loc>${escapeXml(loc)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
  </url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
