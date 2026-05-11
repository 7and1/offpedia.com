import { spawn } from 'node:child_process';
import { access } from 'node:fs/promises';

const baseUrl = (process.env.BROWSER_SMOKE_BASE_URL || 'http://127.0.0.1:4321').replace(/\/$/, '');
const timeoutMs = Number(process.env.BROWSER_SMOKE_TIMEOUT_MS || 15000);

const browserCandidates = [
  process.env.BROWSER_BIN,
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/usr/bin/google-chrome',
  'chromium',
  'chromium-browser',
  'google-chrome',
].filter(Boolean);

const viewports = [
  { label: 'desktop', size: '1440,1000' },
  { label: 'mobile', size: '390,844' },
];

const routeChecks = [
  { path: '/', snippets: ['Choose a durable knowledge workflow', 'Run the Stack Generator'] },
  { path: '/finder/', snippets: ['Stack Generator', 'Answer six practical questions', 'Recommended stack'] },
  { path: '/about/', snippets: ['About Offpedia', 'What makes it different?'] },
  { path: '/compare/obsidian-vs-notion/', snippets: ['Obsidian vs Notion', 'Quick answer'] },
  { path: '/stacks/writer-obsidian-github/', snippets: ['Writer Stack: Obsidian + GitHub', 'Workflow health'] },
  { path: '/kits/writer-vault-starter/', snippets: ['Writer Vault Starter', 'Get this Kit'] },
  { path: '/workflow/obsidian-with-github/', snippets: ['Obsidian with GitHub', 'Source of truth'] },
  { path: '/contributors/', snippets: ['Contribute without diluting', 'Contribution flow'] },
];

async function findBrowser() {
  for (const candidate of browserCandidates) {
    if (!candidate) continue;
    if (!candidate.includes('/')) return candidate;
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Try the next candidate.
    }
  }

  throw new Error('No Chromium-compatible browser executable found. Set BROWSER_BIN to run browser smoke checks.');
}

function runBrowser(browser, url, viewport) {
  return new Promise((resolve, reject) => {
    const args = [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      `--window-size=${viewport.size}`,
      '--virtual-time-budget=5000',
      '--dump-dom',
      url,
    ];
    const child = spawn(browser, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    const timer = setTimeout(() => {
      child.kill('SIGTERM');
      reject(new Error(`Browser smoke timed out for ${url} at ${viewport.label}`));
    }, timeoutMs);

    child.stdout.on('data', (chunk) => {
      stdout += chunk;
    });
    child.stderr.on('data', (chunk) => {
      stderr += chunk;
    });
    child.on('error', (error) => {
      clearTimeout(timer);
      reject(error);
    });
    child.on('close', (code) => {
      clearTimeout(timer);
      if (code === 0) resolve(stdout);
      else reject(new Error(`Browser exited ${code} for ${url}: ${stderr.slice(0, 1000)}`));
    });
  });
}

async function checkRoute(browser, route, viewport) {
  const dom = await runBrowser(browser, `${baseUrl}${route.path}`, viewport);
  const missing = route.snippets.filter((snippet) => !dom.includes(snippet));
  if (missing.length) {
    throw new Error(`${viewport.label} ${route.path} missing snippets: ${missing.join(', ')}`);
  }
}

async function checkRss() {
  const response = await fetch(`${baseUrl}/rss.xml`);
  const body = await response.text();
  if (!response.ok) throw new Error(`/rss.xml returned ${response.status}`);
  if (!body.includes('<rss version="2.0"') || !body.includes('<channel>')) {
    throw new Error('/rss.xml did not render a parseable RSS channel');
  }
}

const browser = await findBrowser();
for (const viewport of viewports) {
  for (const route of routeChecks) {
    await checkRoute(browser, route, viewport);
  }
}
await checkRss();

console.log(`Browser smoke passed for ${routeChecks.length} routes across ${viewports.length} viewports plus /rss.xml.`);
