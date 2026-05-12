#!/usr/bin/env node
import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const auditScript = path.join(__dirname, 'notion-obsidian-audit.mjs');

const usage = `Usage:
  npm run audit:notion:pair -- --before <raw-export-dir> --after <imported-vault-dir> --sample-id SAMPLE-001 --out /tmp/offpedia-samples

Required:
  --before <dir>                  Raw Notion export directory
  --after <dir>                   Obsidian Importer output directory
  --sample-id <id>                Stable sample ID, for example SAMPLE-001
  --out <dir>                     Output directory for reports

Snippet metadata (optional, recorded into <sample>-snippet.md):
  --label <text>                  Full header used in the snippet block, e.g.
                                  "SAMPLE-001 text-light writing template"
  --source <url-or-note>          Source URL or "private donation"
  --license <stance>              License / safety stance
  --shape <label>                 text-light | database-heavy | nested-heavy |
                                  attachment-heavy | multi-db-relational

Tested-on metadata (passed through to both audits, also recorded into snippet):
  --notion-export-format <label>  Example: 2026-05
  --obsidian-importer <label>     Example: v1.6.x
  --obsidian <label>              Example: v1.5+
  --help                          Show this help
`;

function parseArgs(argv) {
  const args = {};

  for (let i = 0; i < argv.length; i += 1) {
    const value = argv[i];

    if (value === '--help' || value === '-h') {
      args.help = true;
      continue;
    }

    if (!value.startsWith('--')) {
      throw new Error(`Unexpected positional argument: ${value}`);
    }

    const key = value.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) {
      throw new Error(`Missing value for --${key}`);
    }
    args[key] = next;
    i += 1;
  }

  return args;
}

function requireArg(args, key) {
  if (!args[key]) throw new Error(`Missing required --${key}`);
  return args[key];
}

function slugify(value) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'sample';
}

function runNode(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, { stdio: 'inherit' });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}: node ${args.join(' ')}`));
      }
    });
  });
}

async function readJson(file) {
  return JSON.parse(await fs.readFile(file, 'utf8'));
}

async function writeText(file, text) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, text, 'utf8');
}

function formatTotals(totals) {
  const entries = Object.entries(totals || {}).filter(([, count]) => count > 0);
  if (entries.length === 0) return 'none';
  return entries.map(([id, count]) => `${id} x ${count}`).join(', ');
}

function formatDiffItems(items) {
  if (!items || items.length === 0) return 'none';
  return items.map((item) => `${item.id} ${item.before} -> ${item.after}`).join(', ');
}

function formatIdsOnly(items) {
  if (!items || items.length === 0) return 'none';
  return items.map((item) => item.id).join(', ');
}

function formatBeforeArrowAfter(items) {
  if (!items || items.length === 0) return 'none';
  return items.map((item) => `${item.id} (${item.before} -> ${item.after})`).join(', ');
}

function formatIdsWithAfter(items) {
  if (!items || items.length === 0) return 'none';
  return items.map((item) => `${item.id} x ${item.after}`).join(', ');
}

function signedDelta(value) {
  if (value === null || value === undefined) return 'n/a';
  return value >= 0 ? `+${value}` : `${value}`;
}

function buildPairSummary({ sampleId, meta, beforeReport, afterReport, beforeJson, afterJson }) {
  const delta = afterReport.delta || {};
  const summary = {
    sampleId,
    generatedAt: new Date().toISOString(),
    meta: {
      label: meta.label || null,
      source: meta.source || null,
      license: meta.license || null,
      shape: meta.shape || null,
      notionExportFormat: meta.notionExportFormat || null,
      obsidianImporter: meta.obsidianImporter || null,
      obsidian: meta.obsidian || null,
    },
    reports: {
      beforeJson,
      afterJson,
    },
    before: {
      score: beforeReport.summary.healthScore,
      counts: beforeReport.summary,
      findingTotals: beforeReport.findingTotals,
    },
    after: {
      score: afterReport.summary.healthScore,
      counts: afterReport.summary,
      findingTotals: afterReport.findingTotals,
    },
    delta: {
      scoreComparable: delta.scoreComparable,
      scoreImprovement: delta.scoreImprovement,
      fixedFindings: delta.fixedFindings || [],
      improvedFindings: delta.improvedFindings || [],
      unchangedFindings: delta.unchangedFindings || [],
      newFindings: delta.newFindings || [],
      worsenedFindings: delta.worsenedFindings || [],
      residualFindingTypes: afterReport.findings.length,
    },
  };

  return summary;
}

function buildSnippetMarkdown(summary) {
  const { meta, before, after, delta } = summary;
  const header = meta.label || `${summary.sampleId}: TODO`;
  const counts = (c) => `files=${c.files}, md=${c.markdownFiles}, csv=${c.csvFiles}, html=${c.htmlFiles}, assets=${c.assetFiles}`;

  const lines = [];
  lines.push(`## ${header}`);
  lines.push('');
  lines.push(`- Source: ${meta.source || 'TODO'}`);
  lines.push(`- License/safety: ${meta.license || 'TODO'}`);
  lines.push(`- Shape: ${meta.shape || 'TODO'}`);
  lines.push('- Tested on:');
  lines.push(`  - Notion export format: ${meta.notionExportFormat || 'unknown'}`);
  lines.push(`  - Obsidian Importer: ${meta.obsidianImporter || 'unknown'}`);
  lines.push(`  - Obsidian: ${meta.obsidian || 'unknown'}`);
  lines.push(`- Counts (raw export): ${counts(before.counts)}`);
  lines.push(`- Counts (after Importer): ${counts(after.counts)}`);
  lines.push(`- Audit before Importer: score ${before.score}/100`);
  lines.push(`  - Findings: ${formatTotals(before.findingTotals)}`);
  lines.push(`- Audit after Importer: score ${after.score}/100`);
  lines.push(`  - Fixed: ${formatIdsOnly(delta.fixedFindings)}`);
  lines.push(`  - Improved (before -> after): ${formatBeforeArrowAfter(delta.improvedFindings)}`);
  lines.push(`  - Still present: ${formatIdsWithAfter(delta.unchangedFindings)}`);
  lines.push(`  - New (Importer introduced): ${formatIdsWithAfter(delta.newFindings)}`);
  lines.push(`  - Worsened (before -> after): ${formatBeforeArrowAfter(delta.worsenedFindings)}`);
  lines.push(`- Net score delta: ${signedDelta(delta.scoreImprovement)}`);
  if (delta.scoreComparable === false) {
    lines.push('- Score comparison: NOT COMPARABLE (scoreSchemaVersion differs between runs)');
  }
  lines.push('- New finding candidates: TODO (human note: anything the script missed)');
  lines.push('- Notes: TODO (human note: surprising behavior, gotchas)');

  return `${lines.join('\n')}\n`;
}

function buildPairMarkdown(summary) {
  const lines = [];

  lines.push(`# ${summary.sampleId} Audit Pair Summary`);
  lines.push('');
  lines.push(`Generated: ${summary.generatedAt}`);
  lines.push('');
  lines.push('## Scores');
  lines.push('');
  lines.push('| Run | Score | Files | Markdown | CSV | HTML | Assets | Finding types |');
  lines.push('| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |');
  lines.push(`| Before Importer | ${summary.before.score}/100 | ${summary.before.counts.files} | ${summary.before.counts.markdownFiles} | ${summary.before.counts.csvFiles} | ${summary.before.counts.htmlFiles} | ${summary.before.counts.assetFiles} | ${Object.keys(summary.before.findingTotals).length} |`);
  lines.push(`| After Importer | ${summary.after.score}/100 | ${summary.after.counts.files} | ${summary.after.counts.markdownFiles} | ${summary.after.counts.csvFiles} | ${summary.after.counts.htmlFiles} | ${summary.after.counts.assetFiles} | ${Object.keys(summary.after.findingTotals).length} |`);
  lines.push('');
  lines.push('## Delta');
  lines.push('');
  lines.push(`- Net score delta: ${signedDelta(summary.delta.scoreImprovement)}`);
  if (summary.delta.scoreComparable === false) {
    lines.push('- Score comparison: NOT COMPARABLE (scoreSchemaVersion differs)');
  }
  lines.push(`- Fixed findings: ${formatDiffItems(summary.delta.fixedFindings)}`);
  lines.push(`- Improved findings: ${formatDiffItems(summary.delta.improvedFindings)}`);
  lines.push(`- Unchanged findings: ${formatIdsWithAfter(summary.delta.unchangedFindings)}`);
  lines.push(`- New findings: ${formatDiffItems(summary.delta.newFindings)}`);
  lines.push(`- Worsened findings: ${formatDiffItems(summary.delta.worsenedFindings)}`);
  lines.push(`- Residual finding types: ${summary.delta.residualFindingTypes}`);
  lines.push('');
  lines.push('## Finding Totals');
  lines.push('');
  lines.push(`- Before Importer: ${formatTotals(summary.before.findingTotals)}`);
  lines.push(`- After Importer: ${formatTotals(summary.after.findingTotals)}`);
  lines.push('');
  lines.push('## REAL-SAMPLES.md snippet');
  lines.push('');
  lines.push('Paste this block into `source/fixtures/REAL-SAMPLES.md`. It is also written to a standalone `<sample>-snippet.md` for easy copy.');
  lines.push('');
  lines.push(buildSnippetMarkdown(summary).trimEnd());
  lines.push('');
  lines.push('## Privacy Note');
  lines.push('');
  lines.push('This summary intentionally contains counts and finding IDs only. Do not add file names, page titles, frontmatter values, attachment names, or private workspace content.');

  return `${lines.join('\n')}\n`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(usage);
    return;
  }

  const beforeDir = path.resolve(requireArg(args, 'before'));
  const afterDir = path.resolve(requireArg(args, 'after'));
  const sampleId = requireArg(args, 'sample-id');
  const outputDir = path.resolve(args.out || '/tmp/offpedia-notion-audit-pairs');
  const sampleSlug = slugify(sampleId);
  const sampleOutputDir = path.join(outputDir, sampleSlug);
  const beforeBase = path.join(sampleOutputDir, `${sampleSlug}-before`);
  const afterBase = path.join(sampleOutputDir, `${sampleSlug}-after`);
  const passThrough = [];

  for (const key of ['notion-export-format', 'obsidian-importer', 'obsidian']) {
    if (args[key]) passThrough.push(`--${key}`, args[key]);
  }

  await fs.mkdir(sampleOutputDir, { recursive: true });
  await runNode([auditScript, beforeDir, '--out', beforeBase, ...passThrough]);
  await runNode([auditScript, afterDir, '--out', afterBase, '--baseline', `${beforeBase}.json`, ...passThrough]);

  const beforeJson = `${beforeBase}.json`;
  const afterJson = `${afterBase}.json`;
  const beforeReport = await readJson(beforeJson);
  const afterReport = await readJson(afterJson);
  const meta = {
    label: args.label,
    source: args.source,
    license: args.license,
    shape: args.shape,
    notionExportFormat: args['notion-export-format'],
    obsidianImporter: args['obsidian-importer'],
    obsidian: args.obsidian,
  };
  const summary = buildPairSummary({ sampleId, meta, beforeReport, afterReport, beforeJson, afterJson });
  const summaryJson = path.join(sampleOutputDir, `${sampleSlug}-pair-summary.json`);
  const summaryMarkdown = path.join(sampleOutputDir, `${sampleSlug}-pair-summary.md`);
  const snippetMarkdown = path.join(sampleOutputDir, `${sampleSlug}-snippet.md`);
  const snippet = buildSnippetMarkdown(summary);

  await writeText(summaryJson, `${JSON.stringify(summary, null, 2)}\n`);
  await writeText(summaryMarkdown, buildPairMarkdown(summary));
  await writeText(snippetMarkdown, snippet);

  console.log(`Audit pair complete: ${sampleId} ${summary.before.score} -> ${summary.after.score} (${signedDelta(summary.delta.scoreImprovement)}).`);
  console.log(`Pair summary JSON: ${summaryJson}`);
  console.log(`Pair summary Markdown: ${summaryMarkdown}`);
  console.log(`REAL-SAMPLES snippet: ${snippetMarkdown}`);
  console.log('');
  console.log('---- snippet (paste into source/fixtures/REAL-SAMPLES.md) ----');
  process.stdout.write(snippet);
  console.log('---- end snippet ----');
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
