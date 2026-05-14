import fs from 'node:fs/promises';
import path from 'node:path';
import {
  extractInternalLinks,
  loadContentEntries,
  normalizeInternalPath,
} from './content-utils.mjs';

const root = process.cwd();
const contentRoot = path.join(root, 'src', 'content');
const publicRoot = path.join(root, 'public');
const required = ['title', 'description', 'customSlug', 'status', 'updatedAt'];
const compareToolOrder = ['obsidian', 'notion', 'logseq', 'roam', 'quartz', 'docusaurus', 'zotero', 'mendeley'];
const staticRoutes = new Set([
  '/',
  '/about',
  '/compare',
  '/contributors',
  '/finder',
  '/guides',
  '/kits',
  '/rss.xml',
  '/search',
  '/stacks',
  '/tools',
  '/tools/notion-export-auditor',
  '/wiki',
  '/workflow/obsidian-with-github',
  '/workflow/obsidian-with-zotero',
  '/workflow/quartz-with-github',
  '/workflow/quartz-with-github-pages',
]);

function personaGoalRoutes(entries) {
  const routes = new Set();
  for (const entry of entries.filter((item) => item.collection === 'stacks')) {
    for (const persona of entry.data.personas || []) {
      routes.add(normalizeInternalPath(`/for/${persona}/${entry.data.goal}`));
    }
  }
  return routes;
}

function generatedCompareRoutes(entries) {
  const tools = entries
    .filter((entry) => entry.collection === 'wiki' && entry.data.kind === 'tool' && entry.data.pseo?.compare === true)
    .sort((a, b) => {
      const aId = a.slug.split('/').pop();
      const bId = b.slug.split('/').pop();
      const aRank = compareToolOrder.indexOf(aId);
      const bRank = compareToolOrder.indexOf(bId);
      if (aRank !== bRank) return (aRank === -1 ? Number.MAX_SAFE_INTEGER : aRank) - (bRank === -1 ? Number.MAX_SAFE_INTEGER : bRank);
      return a.slug.localeCompare(b.slug);
    });
  const routes = new Set();

  for (let i = 0; i < tools.length; i += 1) {
    for (let j = i + 1; j < tools.length; j += 1) {
      const a = tools[i].slug.split('/').pop();
      const b = tools[j].slug.split('/').pop();
      routes.add(normalizeInternalPath(`/compare/${a}-vs-${b}`));
    }
  }

  return routes;
}

async function publicAssetExists(publicPath) {
  const target = path.join(publicRoot, publicPath.replace(/^\//, ''));
  try {
    const stat = await fs.stat(target);
    return stat.isFile();
  } catch {
    return false;
  }
}

const entries = await loadContentEntries(contentRoot);
const knownRoutes = new Set([
  ...staticRoutes,
  ...personaGoalRoutes(entries),
  ...generatedCompareRoutes(entries),
  ...entries.map((entry) => entry.route),
]);

let failed = false;
let checkedLinks = 0;

for (const entry of entries) {
  const missing = required.filter((key) => !(key in entry.data));
  if (missing.length) {
    failed = true;
    console.error(`${path.relative(root, entry.file)} missing: ${missing.join(', ')}`);
  }

  for (const href of extractInternalLinks(entry.raw)) {
    checkedLinks += 1;

    if (href.startsWith('/downloads/')) {
      if (!(await publicAssetExists(href))) {
        failed = true;
        console.error(`${path.relative(root, entry.file)} links missing asset: ${href}`);
      }
      continue;
    }

    if (!knownRoutes.has(href)) {
      failed = true;
      console.error(`${path.relative(root, entry.file)} links unknown route: ${href}`);
    }
  }
}

if (failed) process.exit(1);
console.log(`Validated ${entries.length} content files and ${checkedLinks} internal links.`);
