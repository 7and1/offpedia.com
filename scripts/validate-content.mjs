import fs from 'node:fs/promises';
import path from 'node:path';

const contentRoot = path.join(process.cwd(), 'src', 'content');
const required = ['title', 'description', 'customSlug', 'status', 'updatedAt'];

function parseKeys(raw) {
  if (!raw.startsWith('---')) return new Set();
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return new Set();
  const yaml = raw.slice(3, end).trim();
  return new Set(yaml.split('\n').map((line) => line.match(/^([A-Za-z0-9_]+):/)?.[1]).filter(Boolean));
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

const files = await walk(contentRoot);
let failed = false;
for (const file of files) {
  const raw = await fs.readFile(file, 'utf8');
  const keys = parseKeys(raw);
  const missing = required.filter((key) => !keys.has(key));
  if (missing.length) {
    failed = true;
    console.error(`${path.relative(process.cwd(), file)} missing: ${missing.join(', ')}`);
  }
}

if (failed) process.exit(1);
console.log(`Validated ${files.length} content files.`);
