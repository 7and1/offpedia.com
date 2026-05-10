import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const contentRoot = path.join(root, 'src', 'content');
const outFile = path.join(root, 'public', 'search-index.json');

const collections = {
  wiki: '/wiki',
  stacks: '/stacks',
  kits: '/kits',
  guides: '/guides',
  compare: '/compare',
};

const compareToolOrder = [
  'obsidian',
  'notion',
  'logseq',
  'roam',
  'quartz',
  'docusaurus',
  'zotero',
  'mendeley',
];

const workflowSeeds = [
  { toolA: 'obsidian', toolB: 'github', stackSlug: 'writer-obsidian-github' },
  { toolA: 'obsidian', toolB: 'zotero', stackSlug: 'researcher-obsidian-zotero' },
  { toolA: 'quartz', toolB: 'github', stackSlug: 'personal-wiki-obsidian-quartz' },
  { toolA: 'quartz', toolB: 'github-pages', stackSlug: 'personal-wiki-obsidian-quartz' },
];

function parseValue(value) {
  const trimmed = value.trim();
  if (trimmed === '') return [];
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (trimmed === 'null') return null;
  return trimmed.replace(/^['"]|['"]$/g, '');
}

function parseFrontmatter(raw) {
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

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    if (entry.isFile() && entry.name.endsWith('.md')) files.push(full);
  }
  return files;
}

function cleanBody(body) {
  return body.replace(/[#`>*_\-[\]()]/g, ' ').replace(/\s+/g, ' ').slice(0, 1200);
}

function titleFromSlug(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => {
      if (word.toLowerCase() === 'github') return 'GitHub';
      if (word.toLowerCase() === 'pwa') return 'PWA';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

function toolId(entry) {
  const slug = entry.data.customSlug || entry.slug;
  return slug.split('/').filter(Boolean).at(-1) || entry.slug;
}

function toolRank(entry) {
  const rank = compareToolOrder.indexOf(toolId(entry));
  return rank === -1 ? Number.MAX_SAFE_INTEGER : rank;
}

function workflowSlug(toolA, toolB) {
  return `${toolA}-with-${toolB}`;
}

function makeRecord({ collection, title, description, tags = [], url, body = '' }) {
  return {
    collection,
    title,
    description,
    tags: Array.isArray(tags) ? tags : [],
    url,
    body: cleanBody(body),
  };
}

const index = [];
const parsed = Object.fromEntries(Object.keys(collections).map((collection) => [collection, []]));

for (const [collection, baseUrl] of Object.entries(collections)) {
  const dir = path.join(contentRoot, collection);
  try {
    const files = await walk(dir);
    for (const file of files) {
      const raw = await fs.readFile(file, 'utf8');
      const { data, body } = parseFrontmatter(raw);
      const relativeSlug = path.relative(dir, file).replace(/\.md$/, '').split(path.sep).join('/');
      const slug = data.customSlug || relativeSlug;
      const entry = { collection, slug, data, body };
      parsed[collection].push(entry);
      index.push(makeRecord({
        collection,
        title: data.title || slug,
        description: data.description || '',
        tags: data.tags,
        url: `${baseUrl}/${slug}`,
        body,
      }));
    }
  } catch {
    // collection missing; skip
  }
}

const manualCompareSlugs = new Set(parsed.compare.map((entry) => entry.slug));
const compareTools = parsed.wiki
  .filter((entry) => entry.data.kind === 'tool' && entry.data.pseo?.compare === true)
  .sort((a, b) => toolRank(a) - toolRank(b) || String(a.data.title).localeCompare(String(b.data.title)));

for (let i = 0; i < compareTools.length; i += 1) {
  for (let j = i + 1; j < compareTools.length; j += 1) {
    const toolA = compareTools[i];
    const toolB = compareTools[j];
    const slug = `${toolId(toolA)}-vs-${toolId(toolB)}`;
    if (manualCompareSlugs.has(slug)) continue;
    index.push(makeRecord({
      collection: 'compare',
      title: `${toolA.data.title} vs ${toolB.data.title}`,
      description: `Compare ${toolA.data.title} and ${toolB.data.title} by fit, portability, pricing, Git support, and workflow role.`,
      tags: ['compare', toolId(toolA), toolId(toolB)],
      url: `/compare/${slug}`,
      body: `${toolA.data.description} ${toolB.data.description} ${toolA.data.bestFor?.join(' ') || ''} ${toolB.data.bestFor?.join(' ') || ''}`,
    }));
  }
}

const personaGoalSlugs = new Set();
for (const stack of parsed.stacks) {
  for (const persona of stack.data.personas || []) {
    const goal = stack.data.goal;
    const slug = `${persona}/${goal}`;
    if (personaGoalSlugs.has(slug)) continue;
    personaGoalSlugs.add(slug);
    const relatedStacks = parsed.stacks.filter((entry) => entry.data.goal === goal && (entry.data.personas || []).includes(persona));
    index.push(makeRecord({
      collection: 'for',
      title: `${titleFromSlug(persona)} ${titleFromSlug(goal)} stacks`,
      description: `Recommended Offpedia stacks, kits, guides, and tools for ${titleFromSlug(persona).toLowerCase()} focused on ${titleFromSlug(goal).toLowerCase()}.`,
      tags: [persona, goal],
      url: `/for/${slug}`,
      body: relatedStacks.map((entry) => `${entry.data.title} ${entry.data.description} ${(entry.data.coreTools || []).join(' ')}`).join(' '),
    }));
  }
}

const workflowSlugs = new Map();
for (const stack of parsed.stacks) {
  const tools = stack.data.coreTools || [];
  for (let i = 0; i < tools.length; i += 1) {
    for (let j = i + 1; j < tools.length; j += 1) {
      const slug = workflowSlug(tools[i], tools[j]);
      const existing = workflowSlugs.get(slug) || [];
      existing.push(stack);
      workflowSlugs.set(slug, existing);
    }
  }
}

for (const seed of workflowSeeds) {
  const slug = workflowSlug(seed.toolA, seed.toolB);
  if (!workflowSlugs.has(slug)) {
    const stack = parsed.stacks.find((entry) => entry.slug === seed.stackSlug || entry.data.customSlug === seed.stackSlug);
    workflowSlugs.set(slug, stack ? [stack] : []);
  }
}

for (const [slug, stacks] of workflowSlugs) {
  const [toolA, toolB] = slug.split('-with-');
  index.push(makeRecord({
    collection: 'workflow',
    title: `${titleFromSlug(toolA)} with ${titleFromSlug(toolB)}`,
    description: `A practical workflow page for using ${titleFromSlug(toolA)} with ${titleFromSlug(toolB)} in local-first knowledge work.`,
    tags: [toolA, toolB, 'workflow'],
    url: `/workflow/${slug}`,
    body: stacks.map((entry) => `${entry.data.title} ${entry.data.description} ${(entry.data.relatedGuides || []).join(' ')}`).join(' '),
  }));
}

await fs.mkdir(path.dirname(outFile), { recursive: true });
await fs.writeFile(outFile, JSON.stringify(index, null, 2), 'utf8');
console.log(`Wrote ${index.length} search records to ${outFile}`);
