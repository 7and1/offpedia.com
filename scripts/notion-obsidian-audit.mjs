#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';

const VERSION = '0.1.0';
const SCORE_SCHEMA_VERSION = '0.1';
const MAX_TEXT_BYTES = 1_500_000;
const LONG_PATH_LIMIT = 180;
const LARGE_FILE_LIMIT = 25 * 1024 * 1024;
// Heuristic, will change. Pin a schema version when stable.
const FINDING_WEIGHTS = { high: 12, medium: 7, low: 2 };
const ASSET_EXTENSIONS = new Set([
  '.avif',
  '.bmp',
  '.doc',
  '.docx',
  '.gif',
  '.heic',
  '.jpeg',
  '.jpg',
  '.m4a',
  '.mov',
  '.mp3',
  '.mp4',
  '.pdf',
  '.png',
  '.svg',
  '.webp',
  '.xls',
  '.xlsx',
  '.zip',
]);
const TEXT_EXTENSIONS = new Set(['.csv', '.html', '.htm', '.md', '.txt']);
const PRIVATE_PATH_PATTERN = /\b(private|confidential|secret|password|invoice|tax|contract|medical|passport|credential)\b/i;

const usage = `Usage:
  npm run audit:notion -- <notion-export-dir> --out <report-base>

Examples:
  npm run audit:notion -- ~/Downloads/notion-export --out /tmp/notion-obsidian-audit
  node scripts/notion-obsidian-audit.mjs ./fixtures/notion-small --json /tmp/audit.json --markdown /tmp/audit.md
  npm run audit:notion -- ./vault-after --out /tmp/after --baseline /tmp/before.json
  npm run audit:notion -- ./fixtures/notion-export-sample/... --verify ./fixtures/notion-export-sample/expected-findings.json

Options:
  --out <base>                    Write <base>.json and <base>.md
  --json <file>                   JSON report path
  --markdown <file>               Markdown report path
  --baseline <file>               Compare this run against a previous JSON report
  --verify <file>                 Fail if the report differs from expected findings
  --notion-export-format <label>  Example: 2026-05
  --obsidian-importer <label>     Example: v1.6.x
  --obsidian <label>              Example: v1.5+
  --help                          Show this help
`;

function parseArgs(argv) {
  const args = { positional: [] };

  for (let i = 0; i < argv.length; i += 1) {
    const value = argv[i];

    if (value === '--help' || value === '-h') {
      args.help = true;
      continue;
    }

    if (value.startsWith('--')) {
      const key = value.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith('--')) {
        throw new Error(`Missing value for --${key}`);
      }
      args[key] = next;
      i += 1;
      continue;
    }

    args.positional.push(value);
  }

  return args;
}

function toPosix(value) {
  return value.split(path.sep).join('/');
}

function normalizeRel(value) {
  return toPosix(path.normalize(value)).replace(/^\.\//, '');
}

function stripNotionId(value) {
  return value
    .replace(/\s+[a-f0-9]{32}$/i, '')
    .replace(/\s+[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i, '')
    .trim();
}

function normalizeTitle(value) {
  return stripNotionId(value)
    .replace(/\.[^.]+$/, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function classifyFile(rel) {
  const ext = path.extname(rel).toLowerCase();
  if (ext === '.md') return 'markdown';
  if (ext === '.csv') return 'csv';
  if (ext === '.html' || ext === '.htm') return 'html';
  if (ASSET_EXTENSIONS.has(ext)) return 'asset';
  if (TEXT_EXTENSIONS.has(ext)) return 'text';
  return 'other';
}

async function walk(rootDir, currentDir = rootDir, files = [], directories = []) {
  const entries = await fs.readdir(currentDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name === '.DS_Store') continue;

    const absolute = path.join(currentDir, entry.name);
    const rel = normalizeRel(path.relative(rootDir, absolute));

    if (entry.isDirectory()) {
      directories.push({ absolute, rel, depth: rel.split('/').length });
      await walk(rootDir, absolute, files, directories);
      continue;
    }

    if (!entry.isFile()) continue;

    const stat = await fs.stat(absolute);
    files.push({
      absolute,
      rel,
      depth: rel.split('/').length,
      ext: path.extname(rel).toLowerCase(),
      kind: classifyFile(rel),
      size: stat.size,
    });
  }

  return { files, directories };
}

async function readTextSample(file) {
  const size = Math.min(file.size, MAX_TEXT_BYTES);
  const handle = await fs.open(file.absolute, 'r');

  try {
    const buffer = Buffer.alloc(size);
    const { bytesRead } = await handle.read(buffer, 0, size, 0);
    return buffer.subarray(0, bytesRead).toString('utf8');
  } finally {
    await handle.close();
  }
}

function parseCsvLine(line) {
  const columns = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"' && next === '"') {
      current += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === ',' && !inQuotes) {
      columns.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  columns.push(current.trim());
  return columns;
}

function extractMarkdownLinks(text) {
  const links = [];
  const markdownLinkPattern = /!?\[[^\]\n]*\]\(([^)\n]+)\)/g;
  const wikiLinkPattern = /!?\[\[([^\]\n]+)\]\]/g;
  let match;

  while ((match = markdownLinkPattern.exec(text))) {
    links.push({ syntax: 'markdown', target: match[1].trim() });
  }

  while ((match = wikiLinkPattern.exec(text))) {
    const target = match[1].split('|')[0].split('#')[0].trim();
    if (target) links.push({ syntax: 'wikilink', target });
  }

  return links;
}

function cleanLocalHref(value) {
  let href = value.trim();
  if (href.startsWith('<') && href.endsWith('>')) href = href.slice(1, -1);
  if (/^(https?:|mailto:|tel:|data:|#)/i.test(href)) return null;

  href = href.split('#')[0].split('?')[0].trim();
  if (!href) return null;

  try {
    href = decodeURIComponent(href);
  } catch {
    // Keep the raw href if Notion produced a malformed escape sequence.
  }

  return href;
}

function hasExistingMarkdownTarget(target, fromFile, fileSet, titleSet) {
  const cleaned = cleanLocalHref(target);
  if (!cleaned) return true;

  if (target.includes('[[')) return true;

  if (!path.extname(cleaned) && titleSet.has(normalizeTitle(cleaned))) {
    return true;
  }

  const fromDir = path.posix.dirname(fromFile.rel);
  const joined = cleaned.startsWith('/')
    ? normalizeRel(cleaned.replace(/^\//, ''))
    : normalizeRel(path.posix.join(fromDir, cleaned));
  const candidates = [
    joined,
    `${joined}.md`,
    `${joined}.html`,
    `${joined}.csv`,
    `${joined}/index.md`,
  ].map((item) => item.toLowerCase());

  return candidates.some((candidate) => fileSet.has(candidate));
}

function frontmatterBlock(text) {
  const match = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  return match?.[1] || '';
}

function addFinding(findings, finding) {
  if (finding.count > 0) findings.push(finding);
}

function buildFindingSummary(files, directories, markdownResults, csvResults, linkResults) {
  const findings = [];
  const htmlFiles = files.filter((file) => file.kind === 'html');
  const largeFiles = files.filter((file) => file.size > LARGE_FILE_LIMIT);
  const deepOrLongPaths = [...files, ...directories].filter(
    (item) => item.rel.length > LONG_PATH_LIMIT || item.depth > 6,
  );
  const privatePathNames = [...files, ...directories].filter((item) => PRIVATE_PATH_PATTERN.test(item.rel));
  const duplicateTitleGroups = markdownResults.duplicateTitleGroups;
  const markdownWithoutFrontmatter = markdownResults.files.filter((file) => !file.hasFrontmatter);
  const markdownWithoutDescription = markdownResults.files.filter((file) => !file.hasDescription);
  const markdownWithoutH1 = markdownResults.files.filter((file) => !file.hasH1);
  const notionUrlFiles = markdownResults.files.filter((file) => file.notionUrlCount > 0);
  const unreferencedAssets = linkResults.unreferencedAssets;

  addFinding(findings, {
    id: 'database-csv-rebuild',
    severity: 'high',
    title: 'CSV database exports need a rebuild plan',
    count: csvResults.files.length,
    description: 'Notion databases usually arrive as CSV-like records. Decide which ones become frontmatter, Dataview/Bases tables, source references, or private archives.',
    examples: csvResults.files.slice(0, 10).map((file) => ({
      path: file.rel,
      rows: file.rows,
      columns: file.columns.slice(0, 12),
    })),
    recommendation: 'Create a database mapping before publishing: property name, target frontmatter key, allowed values, and whether the source stays private.',
  });

  addFinding(findings, {
    id: 'missing-local-references',
    severity: 'high',
    title: 'Local links or attachments appear to be missing',
    count: linkResults.missing.length,
    description: 'These references point to local files that were not found in the export tree. They are the first items to verify after Obsidian Importer runs.',
    examples: linkResults.missing.slice(0, 20),
    recommendation: 'Check whether the source export omitted files, renamed folders, or encoded spaces differently. Fix these before building publishing URLs.',
  });

  addFinding(findings, {
    id: 'html-export-leftovers',
    severity: 'medium',
    title: 'HTML files are present',
    count: htmlFiles.length,
    description: 'HTML files are useful as source evidence but usually need to become Markdown before an Obsidian-first workflow is clean.',
    examples: htmlFiles.slice(0, 10).map((file) => file.rel),
    recommendation: 'Prefer Markdown exports for notes. Keep HTML only as a reference fixture or convert it intentionally.',
  });

  addFinding(findings, {
    id: 'notion-web-links',
    severity: 'medium',
    title: 'Notion web URLs remain in Markdown',
    count: notionUrlFiles.reduce((total, file) => total + file.notionUrlCount, 0),
    description: 'Remaining notion.so links often mean relations, backlinks, mentions, or source references were not turned into local Markdown links.',
    examples: notionUrlFiles.slice(0, 10).map((file) => ({
      path: file.rel,
      count: file.notionUrlCount,
    })),
    recommendation: 'Review each Notion URL and decide whether it should become a local Obsidian link, an external source link, or a removed private reference.',
  });

  addFinding(findings, {
    id: 'duplicate-page-titles',
    severity: 'medium',
    title: 'Duplicate page titles need canonical names',
    count: duplicateTitleGroups.length,
    description: 'Duplicate titles create broken backlinks, unstable slugs, and confusing search results after the migration.',
    examples: duplicateTitleGroups.slice(0, 10).map((group) => ({
      title: group.title,
      files: group.files.slice(0, 8),
    })),
    recommendation: 'Rename duplicate pages with explicit context before publishing, then rewrite links to the canonical destination.',
  });

  addFinding(findings, {
    id: 'publishing-frontmatter-gap',
    severity: 'medium',
    title: 'Publishing metadata is incomplete',
    count: new Set([
      ...markdownWithoutFrontmatter.map((file) => file.rel),
      ...markdownWithoutDescription.map((file) => file.rel),
      ...markdownWithoutH1.map((file) => file.rel),
    ]).size,
    description: 'A publishable Obsidian or Quartz vault needs titles, descriptions, dates, and privacy state. Imported notes rarely have this shape.',
    examples: {
      missingFrontmatter: markdownWithoutFrontmatter.slice(0, 10).map((file) => file.rel),
      missingDescription: markdownWithoutDescription.slice(0, 10).map((file) => file.rel),
      missingH1: markdownWithoutH1.slice(0, 10).map((file) => file.rel),
    },
    recommendation: 'Add a minimal schema such as title, description, status, tags, source, updatedAt, and publish before wiring the vault to Quartz.',
  });

  addFinding(findings, {
    id: 'deep-or-long-paths',
    severity: 'low',
    title: 'Some paths are deep or long',
    count: deepOrLongPaths.length,
    description: 'Deep nested pages and long exported filenames can become brittle in Git, static-site builds, and cross-platform sync.',
    examples: deepOrLongPaths.slice(0, 15).map((item) => item.rel),
    recommendation: 'Flatten only where it improves navigation. Keep the original export as a fixture, then curate the working vault separately.',
  });

  addFinding(findings, {
    id: 'large-files',
    severity: 'low',
    title: 'Large files may need an asset policy',
    count: largeFiles.length,
    description: 'Large attachments can make Git history, static deploys, and mobile sync slower than expected.',
    examples: largeFiles.slice(0, 10).map((file) => ({
      path: file.rel,
      size: formatBytes(file.size),
    })),
    recommendation: 'Move large binaries to a documented assets folder or external storage before turning the vault into a public site repo.',
  });

  addFinding(findings, {
    id: 'private-path-names',
    severity: 'high',
    title: 'Path names suggest private or sensitive material',
    count: privatePathNames.length,
    description: 'This check only inspects file and folder names. Treat it as a publishing readiness warning, not a full privacy audit.',
    examples: privatePathNames.slice(0, 20).map((item) => item.rel),
    recommendation: 'Do not publish these paths until a human confirms they are safe. Keep private and public vaults separate.',
  });

  addFinding(findings, {
    id: 'unreferenced-assets',
    severity: 'low',
    title: 'Some assets are not referenced from Markdown',
    count: unreferencedAssets.length,
    description: 'Unreferenced assets may be unused exports, database files, or links that were rewritten by the importer.',
    examples: unreferencedAssets.slice(0, 20).map((file) => file.rel),
    recommendation: 'Delete unused assets only after comparing against the original Notion workspace and Obsidian Importer output.',
  });

  return findings;
}

async function analyzeMarkdown(files, fileSet, titleSet) {
  const markdownFiles = files.filter((file) => file.kind === 'markdown');
  const titleGroups = new Map();
  const results = [];
  const missingLinks = [];
  const referencedFiles = new Set();

  for (const file of markdownFiles) {
    const title = normalizeTitle(path.basename(file.rel, file.ext));
    if (!titleGroups.has(title)) titleGroups.set(title, []);
    titleGroups.get(title).push(file.rel);
  }

  for (const file of markdownFiles) {
    const text = await readTextSample(file);
    const fm = frontmatterBlock(text);
    const links = extractMarkdownLinks(text);
    const notionUrlCount = (text.match(/https?:\/\/(?:www\.)?notion\.so\/[^\s)\]]+/gi) || []).length;

    for (const link of links) {
      const cleaned = cleanLocalHref(link.target);
      if (!cleaned) continue;

      const fromDir = path.posix.dirname(file.rel);
      const relTarget = cleaned.startsWith('/')
        ? normalizeRel(cleaned.replace(/^\//, ''))
        : normalizeRel(path.posix.join(fromDir, cleaned));

      if (hasExistingMarkdownTarget(link.target, file, fileSet, titleSet)) {
        referencedFiles.add(relTarget.toLowerCase());
      } else {
        missingLinks.push({
          from: file.rel,
          target: link.target,
          syntax: link.syntax,
        });
      }
    }

    results.push({
      rel: file.rel,
      size: file.size,
      hasFrontmatter: fm.length > 0,
      hasDescription: /\b(description|summary)\s*:/i.test(fm),
      hasH1: /^#\s+\S/m.test(text),
      notionUrlCount,
      localLinkCount: links.length,
      sampledBytes: Math.min(file.size, MAX_TEXT_BYTES),
      truncated: file.size > MAX_TEXT_BYTES,
    });
  }

  const duplicateTitleGroups = [...titleGroups.entries()]
    .filter(([, group]) => group.length > 1)
    .map(([title, group]) => ({ title, files: group }));

  return {
    files: results,
    duplicateTitleGroups,
    missingLinks,
    referencedFiles,
  };
}

async function analyzeCsv(files) {
  const csvFiles = files.filter((file) => file.kind === 'csv');
  const results = [];

  for (const file of csvFiles) {
    const text = await readTextSample(file);
    const lines = text.split(/\r?\n/).filter((line, index) => index === 0 || line.trim().length > 0);
    const firstLine = lines[0] || '';
    const columns = parseCsvLine(firstLine).filter(Boolean);
    const rows = Math.max(0, lines.length - 1);

    results.push({
      rel: file.rel,
      size: file.size,
      rows,
      columns,
      sampledBytes: Math.min(file.size, MAX_TEXT_BYTES),
      truncated: file.size > MAX_TEXT_BYTES,
    });
  }

  return { files: results };
}

function analyzeLinks(files, markdownResults) {
  const assets = files.filter((file) => file.kind === 'asset');
  const referenced = markdownResults.referencedFiles;

  return {
    missing: markdownResults.missingLinks,
    unreferencedAssets: assets.filter((file) => !referenced.has(file.rel.toLowerCase())),
  };
}

function scoreReport(findings) {
  const penalty = findings.reduce((total, finding) => total + (FINDING_WEIGHTS[finding.severity] || 0), 0);
  return Math.max(0, 100 - penalty);
}

function findingTotalsFor(findings = []) {
  const totals = {};

  for (const finding of findings) {
    if (!finding?.id) continue;
    totals[finding.id] = Number(finding.count) || 0;
  }

  return Object.fromEntries(Object.entries(totals).sort(([a], [b]) => a.localeCompare(b)));
}

async function readJsonFile(file) {
  try {
    return JSON.parse(await fs.readFile(file, 'utf8'));
  } catch (error) {
    throw new Error(`Could not read JSON file ${file}: ${error.message}`);
  }
}

function compactReportForComparison(report, reportPath = null) {
  const scoreSchemaVersion = report.scoreSchemaVersion || report.score?.schemaVersion || null;
  const healthScore = Number.isFinite(report.summary?.healthScore) ? report.summary.healthScore : null;

  return {
    reportPath,
    generatedAt: report.generatedAt || null,
    scoreSchemaVersion,
    healthScore,
    findingTotals: report.findingTotals || findingTotalsFor(report.findings || []),
  };
}

function buildBaselineComparison(baselineReport, currentReport, baselinePath) {
  const baseline = compactReportForComparison(baselineReport, baselinePath);
  const current = compactReportForComparison(currentReport);
  const allIds = [...new Set([
    ...Object.keys(baseline.findingTotals),
    ...Object.keys(current.findingTotals),
  ])].sort();
  const scoreComparable = baseline.scoreSchemaVersion === current.scoreSchemaVersion;
  const scoreImprovement = scoreComparable && Number.isFinite(baseline.healthScore) && Number.isFinite(current.healthScore)
    ? current.healthScore - baseline.healthScore
    : null;
  const fixedFindings = [];
  const improvedFindings = [];
  const newFindings = [];
  const worsenedFindings = [];
  const unchangedFindings = [];

  for (const id of allIds) {
    const before = baseline.findingTotals[id] || 0;
    const after = current.findingTotals[id] || 0;
    const item = { id, before, after };

    if (before > 0 && after === 0) {
      fixedFindings.push(item);
    } else if (before > 0 && after > 0 && after < before) {
      improvedFindings.push(item);
    } else if (before === 0 && after > 0) {
      newFindings.push(item);
    } else if (after > before) {
      worsenedFindings.push(item);
    } else if (before > 0 && after === before) {
      unchangedFindings.push(item);
    }
  }

  return {
    baseline,
    current,
    delta: {
      scoreComparable,
      scoreImprovement,
      fixedFindings,
      improvedFindings,
      newFindings,
      worsenedFindings,
      unchangedFindings,
    },
  };
}

function arraysEqual(a, b) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function verifyFixtureExpectations(report, expected) {
  const errors = [];
  const actualIds = report.findings.map((finding) => finding.id).sort();
  const expectedIds = [...(expected.expectedFindingIds || [])].sort();

  if (expected.scoreSchemaVersion !== report.scoreSchemaVersion) {
    errors.push(`scoreSchemaVersion mismatch: expected ${expected.scoreSchemaVersion}, got ${report.scoreSchemaVersion}`);
  }

  if (!arraysEqual(actualIds, expectedIds)) {
    errors.push(`finding IDs mismatch:\n  expected: ${expectedIds.join(', ')}\n  actual:   ${actualIds.join(', ')}`);
  }

  for (const [id, expectedCount] of Object.entries(expected.expectedFindingCounts || {})) {
    const actual = report.findingTotals[id] ?? 0;
    if (actual !== expectedCount) {
      errors.push(`count mismatch for ${id}: expected ${expectedCount}, got ${actual}`);
    }
  }

  return {
    errors,
    actualIds,
  };
}

function nextStepsFor(findings) {
  const ids = new Set(findings.map((finding) => finding.id));
  const steps = [];

  if (ids.has('database-csv-rebuild')) {
    steps.push('Map every exported CSV database to one of: frontmatter, Dataview/Bases table, private reference archive, or discard.');
  }
  if (ids.has('missing-local-references')) {
    steps.push('Fix missing local references before renaming files or changing the folder taxonomy.');
  }
  if (ids.has('publishing-frontmatter-gap')) {
    steps.push('Add a publishing schema before routing the vault into Quartz or another static-site generator.');
  }
  if (ids.has('private-path-names')) {
    steps.push('Split private and public vault material before creating a publishable Git repository.');
  }

  steps.push('Keep the raw export as a fixture and do all cleanup work in a separate working vault.');
  steps.push('Rerun this audit after Obsidian Importer and again after manual cleanup; compare the JSON reports.');
  return steps;
}

function buildMarkdownReport(report) {
  const lines = [];
  const tested = report.testedOn;

  lines.push(`# Notion to Obsidian Audit Report`);
  lines.push('');
  lines.push(`Generated: ${report.generatedAt}`);
  lines.push(`Input: \`${report.input.name}\``);
  lines.push(`Score schema: \`${report.scoreSchemaVersion}\``);
  lines.push('');
  lines.push('## Tested on');
  lines.push('');
  lines.push(`- Notion export format: ${tested.notionExportFormat || 'unknown'}`);
  lines.push(`- Obsidian Importer: ${tested.obsidianImporter || 'unknown'}`);
  lines.push(`- Obsidian: ${tested.obsidian || 'unknown'}`);
  lines.push('');
  lines.push('## Summary');
  lines.push('');
  lines.push('| Metric | Value |');
  lines.push('| --- | ---: |');
  lines.push(`| Health score | ${report.summary.healthScore}/100 |`);
  lines.push(`| Files | ${report.summary.files} |`);
  lines.push(`| Directories | ${report.summary.directories} |`);
  lines.push(`| Markdown files | ${report.summary.markdownFiles} |`);
  lines.push(`| CSV files | ${report.summary.csvFiles} |`);
  lines.push(`| HTML files | ${report.summary.htmlFiles} |`);
  lines.push(`| Assets | ${report.summary.assetFiles} |`);
  lines.push(`| Total size | ${report.summary.totalSizeLabel} |`);
  lines.push('');

  if (report.baseline && report.current && report.delta) {
    lines.push('## Baseline comparison');
    lines.push('');
    lines.push('| Metric | Baseline | Current | Delta |');
    lines.push('| --- | ---: | ---: | ---: |');
    lines.push(`| Health score | ${report.baseline.healthScore ?? 'n/a'} | ${report.current.healthScore ?? 'n/a'} | ${report.delta.scoreImprovement ?? 'n/a'} |`);
    lines.push(`| Fixed finding types | ${report.delta.fixedFindings.length} |  |  |`);
    lines.push(`| New finding types | ${report.delta.newFindings.length} |  |  |`);
    lines.push(`| Worsened finding types | ${report.delta.worsenedFindings.length} |  |  |`);
    lines.push('');

    if (!report.delta.scoreComparable) {
      lines.push('Scores are not comparable because the score schema versions differ.');
      lines.push('');
    }

    const diffGroups = [
      ['Fixed findings', report.delta.fixedFindings],
      ['Improved findings', report.delta.improvedFindings],
      ['New findings', report.delta.newFindings],
      ['Worsened findings', report.delta.worsenedFindings],
    ];

    for (const [label, items] of diffGroups) {
      if (items.length === 0) continue;
      lines.push(`### ${label}`);
      lines.push('');
      for (const item of items) {
        lines.push(`- \`${item.id}\`: ${item.before} -> ${item.after}`);
      }
      lines.push('');
    }
  }

  lines.push('## Findings');
  lines.push('');

  if (report.findings.length === 0) {
    lines.push('No structural findings were detected. This does not replace a human migration review.');
    lines.push('');
  }

  for (const finding of report.findings) {
    lines.push(`### ${finding.title}`);
    lines.push('');
    lines.push(`- Severity: ${finding.severity}`);
    lines.push(`- Count: ${finding.count}`);
    lines.push(`- Why it matters: ${finding.description}`);
    lines.push(`- Recommendation: ${finding.recommendation}`);

    if (Array.isArray(finding.examples) && finding.examples.length > 0) {
      lines.push('- Examples:');
      for (const example of finding.examples.slice(0, 10)) {
        lines.push(`  - \`${typeof example === 'string' ? example : JSON.stringify(example)}\``);
      }
    } else if (finding.examples && typeof finding.examples === 'object') {
      lines.push('- Examples:');
      for (const [label, values] of Object.entries(finding.examples)) {
        if (!Array.isArray(values) || values.length === 0) continue;
        lines.push(`  - ${label}: ${values.slice(0, 10).map((item) => `\`${item}\``).join(', ')}`);
      }
    }

    lines.push('');
  }

  lines.push('## Recommended next steps');
  lines.push('');
  for (const step of report.nextSteps) {
    lines.push(`- ${step}`);
  }
  lines.push('');
  lines.push('## Maintenance contract');
  lines.push('');
  lines.push('- Retest when Notion changes export behavior.');
  lines.push('- Retest when Obsidian Importer changes Notion handling.');
  lines.push('- Accept reproducible fixture PRs, but do not accept private user exports into the repository.');
  lines.push('- Treat this report as a structural migration QA pass, not as a privacy or security audit.');

  return `${lines.join('\n')}\n`;
}

async function writeText(file, text) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, text, 'utf8');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(usage);
    return;
  }

  const input = args.positional[0];
  if (!input) {
    process.stderr.write(usage);
    process.exit(1);
  }

  const rootDir = path.resolve(input);
  const stat = await fs.stat(rootDir).catch(() => null);
  if (!stat?.isDirectory()) {
    throw new Error(`Notion export directory not found: ${input}`);
  }

  const { files, directories } = await walk(rootDir);
  const fileSet = new Set(files.map((file) => file.rel.toLowerCase()));
  const titleSet = new Set(
    files
      .filter((file) => file.kind === 'markdown')
      .map((file) => normalizeTitle(path.basename(file.rel, file.ext))),
  );
  const markdownResults = await analyzeMarkdown(files, fileSet, titleSet);
  const csvResults = await analyzeCsv(files);
  const linkResults = analyzeLinks(files, markdownResults);
  const findings = buildFindingSummary(files, directories, markdownResults, csvResults, linkResults);
  const findingTotals = findingTotalsFor(findings);
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  const healthScore = scoreReport(findings);

  const report = {
    tool: 'offpedia-notion-obsidian-audit',
    version: VERSION,
    scoreSchemaVersion: SCORE_SCHEMA_VERSION,
    generatedAt: new Date().toISOString(),
    input: {
      name: path.basename(rootDir),
    },
    testedOn: {
      notionExportFormat: args['notion-export-format'] || null,
      obsidianImporter: args['obsidian-importer'] || null,
      obsidian: args.obsidian || null,
    },
    summary: {
      healthScore,
      files: files.length,
      directories: directories.length,
      markdownFiles: files.filter((file) => file.kind === 'markdown').length,
      csvFiles: files.filter((file) => file.kind === 'csv').length,
      htmlFiles: files.filter((file) => file.kind === 'html').length,
      assetFiles: files.filter((file) => file.kind === 'asset').length,
      otherFiles: files.filter((file) => file.kind === 'other').length,
      totalSize,
      totalSizeLabel: formatBytes(totalSize),
      maxDepth: Math.max(0, ...files.map((file) => file.depth), ...directories.map((dir) => dir.depth)),
    },
    score: {
      schemaVersion: SCORE_SCHEMA_VERSION,
      weights: FINDING_WEIGHTS,
    },
    findingTotals,
    findings,
    details: {
      csvFiles: csvResults.files,
      markdownFiles: markdownResults.files,
      duplicateTitleGroups: markdownResults.duplicateTitleGroups,
      missingLocalReferences: linkResults.missing,
    },
    nextSteps: nextStepsFor(findings),
  };

  if (args.baseline) {
    const baselinePath = path.resolve(args.baseline);
    const baselineReport = await readJsonFile(baselinePath);
    Object.assign(report, buildBaselineComparison(baselineReport, report, baselinePath));
  }

  if (args.verify) {
    const expectedPath = path.resolve(args.verify);
    const expected = await readJsonFile(expectedPath);
    const { errors, actualIds } = verifyFixtureExpectations(report, expected);

    if (errors.length > 0) {
      console.error('Fixture expectations FAILED:');
      for (const error of errors) {
        console.error(`  - ${error}`);
      }
      process.exit(1);
    }

    console.log(`Fixture expectations passed: ${actualIds.length} finding IDs, score ${report.summary.healthScore}/100.`);
  }

  const markdown = buildMarkdownReport(report);
  const outBase = args.out || path.resolve(process.cwd(), 'notion-obsidian-audit-report');
  const jsonFile = path.resolve(args.json || `${outBase}.json`);
  const markdownFile = path.resolve(args.markdown || `${outBase}.md`);

  await writeText(jsonFile, `${JSON.stringify(report, null, 2)}\n`);
  await writeText(markdownFile, markdown);

  console.log(`Notion to Obsidian audit complete: ${healthScore}/100`);
  console.log(`JSON: ${jsonFile}`);
  console.log(`Markdown: ${markdownFile}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
