import fs from 'node:fs/promises';
import path from 'node:path';
import {
  extractInternalLinks,
  loadContentEntries,
  normalizeInternalPath,
} from './content-utils.mjs';

const root = process.cwd();
const contentRoot = path.join(root, 'src', 'content');
const distSitemap = path.join(root, 'dist', 'sitemap-0.xml');
const searchIndexFile = path.join(root, 'public', 'search-index.json');
const strict = process.argv.includes('--strict');
const now = Date.now();
const maxAgeMs = 120 * 24 * 60 * 60 * 1000;

function normalizeDate(value) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function routeForCollection(collection, slug) {
  if (collection === 'wiki') return normalizeInternalPath(`/wiki/${slug}`);
  if (collection === 'stacks') return normalizeInternalPath(`/stacks/${slug}`);
  if (collection === 'kits') return normalizeInternalPath(`/kits/${slug}`);
  if (collection === 'guides') return normalizeInternalPath(`/guides/${slug}`);
  if (collection === 'compare') return normalizeInternalPath(`/compare/${slug}`);
  return normalizeInternalPath(`/${slug}`);
}

function slugMatches(value, entry) {
  return value === entry.slug || value === entry.data.customSlug;
}

function markdownLinkTargets(entry) {
  return new Set(extractInternalLinks(entry.raw));
}

function hasBodyLink(entry, target) {
  return markdownLinkTargets(entry).has(target);
}

async function maybeReadJson(file) {
  try {
    return JSON.parse(await fs.readFile(file, 'utf8'));
  } catch {
    return null;
  }
}

async function maybeReadText(file) {
  try {
    return await fs.readFile(file, 'utf8');
  } catch {
    return null;
  }
}

const entries = await loadContentEntries(contentRoot);
const byCollection = entries.reduce((groups, entry) => {
  if (!groups[entry.collection]) groups[entry.collection] = [];
  groups[entry.collection].push(entry);
  return groups;
}, {});
const stacks = byCollection.stacks || [];
const kits = byCollection.kits || [];
const guides = byCollection.guides || [];
const wiki = byCollection.wiki || [];
const issues = [];

for (const stack of stacks) {
  const matchingKits = kits.filter((entry) => slugMatches(entry.data.stack, stack));
  const matchingGuides = guides.filter((entry) => slugMatches(entry.data.relatedStack || '', stack));
  const updatedAt = normalizeDate(stack.data.updatedAt);

  if (matchingKits.length === 0) {
    issues.push(`[missing-kit] ${stack.data.title}`);
  }

  if (matchingGuides.length === 0) {
    issues.push(`[missing-guide] ${stack.data.title}`);
  }

  if (updatedAt && now - updatedAt.getTime() > maxAgeMs) {
    issues.push(`[stale-updatedAt] ${stack.data.title} last updated ${updatedAt.toISOString().slice(0, 10)}`);
  }

  for (const slug of stack.data.relatedKits || []) {
    const target = routeForCollection('kits', slug);
    if (target && !hasBodyLink(stack, target)) {
      issues.push(`[missing-internal-link] ${stack.data.title} does not link body content to ${target}`);
    }
  }

  for (const slug of stack.data.relatedGuides || []) {
    const target = routeForCollection('guides', slug);
    if (target && !hasBodyLink(stack, target)) {
      issues.push(`[missing-internal-link] ${stack.data.title} does not link body content to ${target}`);
    }
  }
}

for (const entry of wiki) {
  const hasRelationship = (entry.data.relatedStacks || []).length > 0 || (entry.data.relatedKits || []).length > 0;
  const compareOrWorkflowSurface = entry.data.pseo?.compare === true || entry.data.pseo?.workflow === true;
  if (!hasRelationship && !compareOrWorkflowSurface) {
    issues.push(`[orphan-wiki] ${entry.data.title}`);
  }
}

const searchIndex = await maybeReadJson(searchIndexFile);
if (searchIndex) {
  const urls = new Set(searchIndex.map((item) => normalizeInternalPath(item.url)).filter(Boolean));
  for (const route of ['/finder', '/contributors', '/tools', '/tools/notion-export-auditor', ...entries.map((entry) => entry.route)]) {
    if (!urls.has(route)) {
      issues.push(`[search-index] Missing record for ${route}`);
    }
  }
} else {
  issues.push('[search-index] public/search-index.json missing; run npm run search:index first');
}

const sitemapXml = await maybeReadText(distSitemap);
if (sitemapXml) {
  const locs = new Set(
    [...sitemapXml.matchAll(/<loc>https:\/\/offpedia\.com([^<]+)<\/loc>/g)]
      .map((match) => normalizeInternalPath(match[1]))
      .filter(Boolean),
  );
  for (const route of ['/finder', '/contributors', '/tools', '/tools/notion-export-auditor', ...entries.map((entry) => entry.route)]) {
    if (!locs.has(route)) {
      issues.push(`[sitemap] Missing URL for ${route}`);
    }
  }
} else {
  issues.push('[sitemap] dist/sitemap-0.xml missing; run npm run build first');
}

if (issues.length === 0) {
  console.log('Workflow health: clean');
  process.exit(0);
}

console.log(`Workflow health: ${issues.length} issue(s)`);
for (const issue of issues) {
  console.log(`- ${issue}`);
}

if (strict) process.exit(1);
