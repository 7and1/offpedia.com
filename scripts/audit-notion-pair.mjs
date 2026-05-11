#!/usr/bin/env node
import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const auditScript = path.join(__dirname, 'notion-obsidian-audit.mjs');

const usage = `Usage:
  npm run audit:notion:pair -- --before <raw-export-dir> --after <imported-vault-dir> --sample-id SAMPLE-001 --out /tmp/offpedia-samples

Options:
  --before <dir>                  Raw Notion export directory
  --after <dir>                   Obsidian Importer output directory
  --sample-id <id>                Stable sample ID, for example SAMPLE-001
  --out <dir>                     Output directory for reports
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

function buildPairSummary({ sampleId, beforeReport, afterReport, beforeJson, afterJson }) {
  const delta = afterReport.delta || {};
  const summary = {
    sampleId,
    generatedAt: new Date().toISOString(),
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
      scoreImprovement: delta.scoreImprovement,
      fixedFindings: delta.fixedFindings || [],
      improvedFindings: delta.improvedFindings || [],
      newFindings: delta.newFindings || [],
      worsenedFindings: delta.worsenedFindings || [],
      residualFindingTypes: afterReport.findings.length,
    },
  };

  return summary;
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
  lines.push(`- Net score delta: ${summary.delta.scoreImprovement ?? 'n/a'}`);
  lines.push(`- Fixed findings: ${formatDiffItems(summary.delta.fixedFindings)}`);
  lines.push(`- Improved findings: ${formatDiffItems(summary.delta.improvedFindings)}`);
  lines.push(`- New findings: ${formatDiffItems(summary.delta.newFindings)}`);
  lines.push(`- Worsened findings: ${formatDiffItems(summary.delta.worsenedFindings)}`);
  lines.push(`- Residual finding types: ${summary.delta.residualFindingTypes}`);
  lines.push('');
  lines.push('## Finding Totals');
  lines.push('');
  lines.push(`- Before Importer: ${formatTotals(summary.before.findingTotals)}`);
  lines.push(`- After Importer: ${formatTotals(summary.after.findingTotals)}`);
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
  const summary = buildPairSummary({ sampleId, beforeReport, afterReport, beforeJson, afterJson });
  const summaryJson = path.join(sampleOutputDir, `${sampleSlug}-pair-summary.json`);
  const summaryMarkdown = path.join(sampleOutputDir, `${sampleSlug}-pair-summary.md`);

  await writeText(summaryJson, `${JSON.stringify(summary, null, 2)}\n`);
  await writeText(summaryMarkdown, buildPairMarkdown(summary));

  console.log(`Audit pair complete: ${sampleId} ${summary.before.score} -> ${summary.after.score} (${summary.delta.scoreImprovement ?? 'n/a'}).`);
  console.log(`Pair summary JSON: ${summaryJson}`);
  console.log(`Pair summary Markdown: ${summaryMarkdown}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
