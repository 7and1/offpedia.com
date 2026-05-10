import type { CollectionEntry } from 'astro:content';

export type WikiEntry = CollectionEntry<'wiki'>;
export type StackEntry = CollectionEntry<'stacks'>;
export type KitEntry = CollectionEntry<'kits'>;
export type GuideEntry = CollectionEntry<'guides'>;
export type CompareEntry = CollectionEntry<'compare'>;

export type ToolEntry = WikiEntry & {
  data: WikiEntry['data'] & {
    kind: 'tool';
  };
};

export type ComparePair = {
  slug: string;
  tools: [ToolEntry, ToolEntry];
};

export type PersonaGoalPage = {
  persona: string;
  goal: string;
  slug: string;
  title: string;
  description: string;
  stacks: StackEntry[];
};

export type WorkflowPage = {
  slug: string;
  toolA: string;
  toolB: string;
  title: string;
  description: string;
  stacks: StackEntry[];
  source: 'stack' | 'seed';
};

export const compareToolOrder = [
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

export function getToolId(entry: Pick<WikiEntry, 'slug' | 'data'>): string {
  const slug = entry.data.customSlug || entry.slug;
  return slug.split('/').filter(Boolean).at(-1) || entry.slug;
}

export function toolPath(entry: Pick<WikiEntry, 'slug' | 'data'>): string {
  return `/wiki/${entry.data.customSlug || entry.slug}`;
}

export function titleFromSlug(slug: string): string {
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

export function formatValue(value: string | boolean | string[] | null | undefined): string {
  if (Array.isArray(value)) return value.length ? value.join(', ') : 'Not specified';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (value === null || value === undefined || value === '') return 'Not specified';
  return String(value);
}

function toolRank(entry: ToolEntry): number {
  const rank = compareToolOrder.indexOf(getToolId(entry));
  return rank === -1 ? Number.MAX_SAFE_INTEGER : rank;
}

function workflowSlug(toolA: string, toolB: string): string {
  return `${toolA}-with-${toolB}`;
}

export function getCompareEligibleTools(entries: WikiEntry[]): ToolEntry[] {
  return entries
    .filter((entry): entry is ToolEntry => entry.data.kind === 'tool' && entry.data.pseo?.compare === true)
    .sort((a, b) => toolRank(a) - toolRank(b) || a.data.title.localeCompare(b.data.title));
}

export function getComparePairs(tools: ToolEntry[]): ComparePair[] {
  const pairs: ComparePair[] = [];
  for (let i = 0; i < tools.length; i += 1) {
    for (let j = i + 1; j < tools.length; j += 1) {
      const toolA = tools[i];
      const toolB = tools[j];
      pairs.push({
        slug: `${getToolId(toolA)}-vs-${getToolId(toolB)}`,
        tools: [toolA, toolB],
      });
    }
  }
  return pairs;
}

export function buildCompareFaq(pair: ComparePair) {
  const [toolA, toolB] = pair.tools;
  return [
    {
      question: `Should I choose ${toolA.data.title} or ${toolB.data.title}?`,
      answer: `Choose ${toolA.data.title} when your work matches ${formatValue(toolA.data.bestFor).toLowerCase()}. Choose ${toolB.data.title} when your priority is ${formatValue(toolB.data.bestFor).toLowerCase()}.`,
    },
    {
      question: `Can ${toolA.data.title} and ${toolB.data.title} work together?`,
      answer: `They can work together when the workflow has a clear handoff. Keep one tool as the primary source of truth and use the other for publishing, reference management, or collaboration.`,
    },
    {
      question: 'What should I check before migrating?',
      answer: 'Check export formats, offline access, Git support, attachment handling, and whether your links or citations survive the move.',
    },
  ];
}

export function compareMatrix(pair: ComparePair) {
  const [toolA, toolB] = pair.tools;
  return [
    { label: 'Best for', a: formatValue(toolA.data.bestFor), b: formatValue(toolB.data.bestFor) },
    { label: 'Pricing', a: formatValue(toolA.data.pricing), b: formatValue(toolB.data.pricing) },
    { label: 'Local-first', a: formatValue(toolA.data.localFirst), b: formatValue(toolB.data.localFirst) },
    { label: 'Offline-ready', a: formatValue(toolA.data.offlineReady), b: formatValue(toolB.data.offlineReady) },
    { label: 'Git support', a: formatValue(toolA.data.gitSupport), b: formatValue(toolB.data.gitSupport) },
    { label: 'Open source', a: formatValue(toolA.data.openSource), b: formatValue(toolB.data.openSource) },
    { label: 'Data formats', a: formatValue(toolA.data.dataFormats), b: formatValue(toolB.data.dataFormats) },
    { label: 'Platforms', a: formatValue(toolA.data.platforms), b: formatValue(toolB.data.platforms) },
  ];
}

export function softwareApplicationSchema(tool: ToolEntry, url: string) {
  return {
    '@type': 'SoftwareApplication',
    name: tool.data.title,
    description: tool.data.description,
    url: tool.data.website || url,
    applicationCategory: tool.data.category,
    operatingSystem: tool.data.platforms?.length ? tool.data.platforms.join(', ') : 'Web',
    offers: {
      '@type': 'Offer',
      price: tool.data.pricing || 'See official website',
    },
  };
}

export function articleFaqSchema({
  title,
  description,
  url,
  faq,
  software,
}: {
  title: string;
  description: string;
  url: string;
  faq?: { question: string; answer: string }[];
  software?: ReturnType<typeof softwareApplicationSchema>[];
}) {
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Article',
      headline: title,
      description,
      mainEntityOfPage: url,
      publisher: {
        '@type': 'Organization',
        name: 'Offpedia',
        url: 'https://offpedia.com',
      },
    },
  ];

  if (faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  if (software?.length) graph.push(...software);

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export function getPersonaGoalPages(stacks: StackEntry[]): PersonaGoalPage[] {
  const pages = new Map<string, PersonaGoalPage>();

  for (const stack of stacks) {
    for (const persona of stack.data.personas) {
      const goal = stack.data.goal;
      const slug = `${persona}/${goal}`;
      const existing = pages.get(slug);
      if (existing) {
        existing.stacks.push(stack);
      } else {
        const personaLabel = titleFromSlug(persona);
        const goalLabel = titleFromSlug(goal);
        pages.set(slug, {
          persona,
          goal,
          slug,
          title: `${personaLabel} ${goalLabel} stacks`,
          description: `Recommended Offpedia stacks, kits, guides, and tools for ${personaLabel.toLowerCase()} focused on ${goalLabel.toLowerCase()}.`,
          stacks: [stack],
        });
      }
    }
  }

  return [...pages.values()].sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getWorkflowPages(stacks: StackEntry[]): WorkflowPage[] {
  const pages = new Map<string, WorkflowPage>();

  for (const stack of stacks) {
    const tools = stack.data.coreTools;
    for (let i = 0; i < tools.length; i += 1) {
      for (let j = i + 1; j < tools.length; j += 1) {
        const toolA = tools[i];
        const toolB = tools[j];
        const slug = workflowSlug(toolA, toolB);
        const existing = pages.get(slug);
        if (existing) {
          existing.stacks.push(stack);
        } else {
          pages.set(slug, {
            slug,
            toolA,
            toolB,
            title: `${titleFromSlug(toolA)} with ${titleFromSlug(toolB)}`,
            description: `A practical workflow page for using ${titleFromSlug(toolA)} with ${titleFromSlug(toolB)} in local-first knowledge work.`,
            stacks: [stack],
            source: 'stack',
          });
        }
      }
    }
  }

  for (const seed of workflowSeeds) {
    const slug = workflowSlug(seed.toolA, seed.toolB);
    const stack = stacks.find((entry) => entry.slug === seed.stackSlug || entry.data.customSlug === seed.stackSlug);
    const seedStacks = stack ? [stack] : [];
    const existing = pages.get(slug);
    if (existing) {
      for (const entry of seedStacks) {
        if (!existing.stacks.some((item) => item.slug === entry.slug)) existing.stacks.push(entry);
      }
    } else {
      pages.set(slug, {
        slug,
        toolA: seed.toolA,
        toolB: seed.toolB,
        title: `${titleFromSlug(seed.toolA)} with ${titleFromSlug(seed.toolB)}`,
        description: `A practical workflow page for connecting ${titleFromSlug(seed.toolA)} and ${titleFromSlug(seed.toolB)} without losing ownership of your content.`,
        stacks: seedStacks,
        source: 'seed',
      });
    }
  }

  return [...pages.values()].sort((a, b) => a.slug.localeCompare(b.slug));
}

export function relatedEntriesForStacks<T extends { slug: string; data: { customSlug?: string } }>(
  entries: T[],
  slugs: string[],
): T[] {
  const wanted = new Set(slugs);
  return entries.filter((entry) => wanted.has(entry.slug) || (entry.data.customSlug && wanted.has(entry.data.customSlug)));
}
