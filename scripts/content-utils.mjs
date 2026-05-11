import fs from 'node:fs/promises';
import path from 'node:path';

export const collectionBasePaths = {
  wiki: '/wiki',
  stacks: '/stacks',
  kits: '/kits',
  guides: '/guides',
  compare: '/compare',
};

export async function walkMarkdownFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walkMarkdownFiles(full));
    if (entry.isFile() && entry.name.endsWith('.md')) files.push(full);
  }
  return files;
}

export function parseValue(value) {
  const trimmed = value.trim();
  if (trimmed === '') return [];
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (trimmed === 'null') return null;
  return trimmed.replace(/^['"]|['"]$/g, '');
}

export function parseFrontmatter(raw) {
  if (!raw.startsWith('---')) return { data: {}, body: raw };
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return { data: {}, body: raw };
  const yaml = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).trim();
  const data = {};
  let currentKey = null;

  for (const line of yaml.split('\n')) {
    if (!line.trim()) continue;
    const listMatch = line.match(/^\s+-\s+(.+)$/);
    if (listMatch && currentKey) {
      if (!Array.isArray(data[currentKey])) data[currentKey] = [];
      data[currentKey].push(parseValue(listMatch[1]));
      continue;
    }

    const nested = line.match(/^\s{2}([A-Za-z0-9_]+):\s*(.*)$/);
    if (nested && currentKey) {
      if (!data[currentKey] || Array.isArray(data[currentKey]) || typeof data[currentKey] !== 'object') {
        data[currentKey] = {};
      }
      data[currentKey][nested[1]] = parseValue(nested[2]);
      continue;
    }

    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (kv) {
      currentKey = kv[1];
      data[currentKey] = parseValue(kv[2]);
    }
  }

  return { data, body };
}

export function normalizeInternalPath(href) {
  if (!href) return null;
  const cleaned = href.trim();
  if (!cleaned) return null;

  let pathname = cleaned;
  if (cleaned.startsWith('https://offpedia.com') || cleaned.startsWith('http://offpedia.com')) {
    pathname = new URL(cleaned).pathname;
  }

  if (!pathname.startsWith('/')) return null;
  pathname = pathname.split('#')[0].split('?')[0];
  if (!pathname) return '/';
  if (pathname !== '/' && pathname.endsWith('/')) pathname = pathname.slice(0, -1);
  return pathname;
}

export function extractInternalLinks(raw) {
  const matches = new Set();
  const regex = /\[[^\]]+\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  let match;
  while ((match = regex.exec(raw))) {
    const normalized = normalizeInternalPath(match[1]);
    if (normalized) matches.add(normalized);
  }
  return [...matches];
}

export function routeForEntry(collection, slug) {
  const base = collectionBasePaths[collection];
  return normalizeInternalPath(`${base}/${slug}`);
}

export async function loadContentEntries(contentRoot) {
  const files = await walkMarkdownFiles(contentRoot);
  const entries = [];

  for (const file of files) {
    const raw = await fs.readFile(file, 'utf8');
    const { data, body } = parseFrontmatter(raw);
    const relative = path.relative(contentRoot, file);
    const [collection, ...rest] = relative.split(path.sep);
    const relativeSlug = rest.join('/').replace(/\.md$/, '');
    const slug = data.customSlug || relativeSlug;
    entries.push({
      file,
      raw,
      body,
      data,
      collection,
      slug,
      route: routeForEntry(collection, slug),
    });
  }

  return entries;
}
