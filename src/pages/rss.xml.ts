import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const site = 'https://offpedia.com';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function absolute(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${site}${normalized.endsWith('/') ? normalized : `${normalized}/`}`;
}

function itemPath(collection: 'wiki' | 'stacks' | 'kits' | 'guides' | 'compare', slug: string): string {
  if (collection === 'wiki') return `/wiki/${slug}`;
  if (collection === 'stacks') return `/stacks/${slug}`;
  if (collection === 'kits') return `/kits/${slug}`;
  if (collection === 'guides') return `/guides/${slug}`;
  return `/compare/${slug}`;
}

export const GET: APIRoute = async () => {
  const [wikiEntries, stackEntries, kitEntries, guideEntries, compareEntries] = await Promise.all([
    getCollection('wiki'),
    getCollection('stacks'),
    getCollection('kits'),
    getCollection('guides'),
    getCollection('compare'),
  ]);

  const items = [...wikiEntries, ...stackEntries, ...kitEntries, ...guideEntries, ...compareEntries]
    .filter((entry) => entry.data.status === 'published')
    .sort((a, b) => b.data.updatedAt.getTime() - a.data.updatedAt.getTime())
    .map((entry) => {
      const slug = entry.data.customSlug || entry.slug;
      const collection = entry.collection as 'wiki' | 'stacks' | 'kits' | 'guides' | 'compare';
      return {
        title: entry.data.title,
        description: entry.data.description,
        link: absolute(itemPath(collection, slug)),
        pubDate: entry.data.updatedAt.toUTCString(),
        guid: absolute(itemPath(collection, slug)),
      };
    });

  const latestDate = items[0]?.pubDate || new Date().toUTCString();
  const body = items
    .map((item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <description>${escapeXml(item.description)}</description>
      <link>${escapeXml(item.link)}</link>
      <guid>${escapeXml(item.guid)}</guid>
      <pubDate>${escapeXml(item.pubDate)}</pubDate>
    </item>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Offpedia</title>
    <description>Workflow recommendations, stacks, kits, guides, and comparisons for durable knowledge systems.</description>
    <link>${site}</link>
    <language>en-us</language>
    <lastBuildDate>${escapeXml(latestDate)}</lastBuildDate>
    <atom:link href="${site}/rss.xml" rel="self" type="application/rss+xml" />
${body}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
};
