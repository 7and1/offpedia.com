import type { CollectionEntry } from 'astro:content';
import {
  getWorkflowPageNote,
  getWorkflowRecommendationForPersonaGoal,
  goalLabel,
  personaLabel,
} from './workflow-advisor';

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
  indexable: boolean;
};

export type BreadcrumbItem = {
  name: string;
  url: string;
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
  source: 'seed';
  sourceOfTruth: string;
  whatSyncs: string[];
  whatDoesNotSync: string[];
  failureModes: string[];
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

const workflowPageStacks: Record<string, string[]> = {
  'obsidian-with-github': ['writer-obsidian-github'],
  'obsidian-with-zotero': ['researcher-obsidian-zotero'],
  'quartz-with-github': ['personal-wiki-obsidian-quartz'],
  'quartz-with-github-pages': ['personal-wiki-obsidian-quartz'],
};

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

function collaborationFit(tool: ToolEntry): string {
  const id = getToolId(tool);
  if (id === 'notion') return 'Strong for realtime collaboration';
  if (id === 'docusaurus') return 'Strong for reviewed team docs';
  if (id === 'github') return 'Strong for async Git collaboration';
  if (tool.data.localFirst) return 'Best for solo or light async collaboration';
  return 'Better for solo use than structured team editing';
}

function publishingFit(tool: ToolEntry): string {
  const id = getToolId(tool);
  if (id === 'quartz') return 'Strong for personal wiki publishing';
  if (id === 'docusaurus') return 'Strong for product and versioned docs';
  if (id === 'github') return 'Strong as publishing infrastructure';
  if (tool.data.category === 'publishing') return 'Built for publishing';
  if (tool.data.relatedStacks.some((slug) => slug.includes('quartz') || slug.includes('github'))) return 'Works in publishing workflows';
  return 'Secondary publishing fit';
}

function archiveFitScore(tool: ToolEntry): number {
  let score = 0;
  if (tool.data.localFirst) score += 3;
  if (tool.data.offlineReady) score += 2;
  if (tool.data.dataFormats.includes('Markdown')) score += 2;
  if (tool.data.gitSupport) score += 1;
  if (tool.data.limitations.some((item) => /export|cloud|lock/i.test(item))) score -= 1;
  return score;
}

function researchFitScore(tool: ToolEntry): number {
  let score = 0;
  if (tool.data.bestFor.some((item) => /research|literature|citation/i.test(item))) score += 3;
  if (tool.data.category === 'research') score += 2;
  if (tool.data.bestFor.some((item) => /notes/i.test(item))) score += 1;
  return score;
}

function writingFitScore(tool: ToolEntry): number {
  let score = 0;
  if (tool.data.bestFor.some((item) => /writing|documents|knowledge/i.test(item))) score += 3;
  if (tool.data.dataFormats.includes('Markdown')) score += 2;
  if (tool.data.localFirst) score += 1;
  return score;
}

function teamFitScore(tool: ToolEntry): number {
  const id = getToolId(tool);
  if (id === 'notion') return 5;
  if (id === 'docusaurus') return 4;
  if (id === 'github') return 3;
  return tool.data.localFirst ? 1 : 2;
}

function publishingFitScore(tool: ToolEntry): number {
  const id = getToolId(tool);
  if (id === 'quartz') return 5;
  if (id === 'docusaurus') return 4;
  if (id === 'github') return 4;
  if (tool.data.category === 'publishing') return 3;
  return tool.data.relatedStacks.some((slug) => slug.includes('quartz')) ? 2 : 1;
}

function strongerTool(pair: ComparePair, dimension: 'writing' | 'research' | 'team' | 'publishing' | 'archive'): ToolEntry {
  const [toolA, toolB] = pair.tools;
  const scoreA =
    dimension === 'writing'
      ? writingFitScore(toolA)
      : dimension === 'research'
        ? researchFitScore(toolA)
        : dimension === 'team'
          ? teamFitScore(toolA)
          : dimension === 'publishing'
            ? publishingFitScore(toolA)
            : archiveFitScore(toolA);
  const scoreB =
    dimension === 'writing'
      ? writingFitScore(toolB)
      : dimension === 'research'
        ? researchFitScore(toolB)
        : dimension === 'team'
          ? teamFitScore(toolB)
          : dimension === 'publishing'
            ? publishingFitScore(toolB)
            : archiveFitScore(toolB);
  return scoreA >= scoreB ? toolA : toolB;
}

export function isCompareToolComplete(tool: ToolEntry): boolean {
  return Boolean(
    tool.data.pricing &&
      tool.data.gitSupport &&
      tool.data.bestFor.length > 0 &&
      tool.data.dataFormats.length > 0 &&
      tool.data.platforms.length > 0 &&
      tool.data.limitations.length > 0 &&
      typeof tool.data.localFirst === 'boolean' &&
      typeof tool.data.offlineReady === 'boolean',
  );
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
        indexable: isCompareToolComplete(toolA) && isCompareToolComplete(toolB),
      });
    }
  }
  return pairs;
}

export function getIndexableComparePairs(tools: ToolEntry[]): ComparePair[] {
  return getComparePairs(tools).filter((pair) => pair.indexable);
}

export function buildCompareFaq(pair: ComparePair) {
  const [toolA, toolB] = pair.tools;
  return [
    {
      question: `Should I choose ${toolA.data.title} or ${toolB.data.title}?`,
      answer: buildGeneratedQuickAnswer(pair),
    },
    {
      question: `Can ${toolA.data.title} and ${toolB.data.title} work together?`,
      answer: `Yes, when they do different jobs. Keep one tool as the source of truth and use the second tool for publishing, collaboration, or source management instead of duplicating the same content in both.`,
    },
    {
      question: 'What should I check before migrating?',
      answer: 'Check export formats, offline access, Git support, attachment handling, and whether links, metadata, or citations survive the move.',
    },
  ];
}

export function compareMatrix(pair: ComparePair) {
  const [toolA, toolB] = pair.tools;
  return [
    { label: 'Best for', a: formatValue(toolA.data.bestFor), b: formatValue(toolB.data.bestFor) },
    { label: 'Pricing', a: formatValue(toolA.data.pricing), b: formatValue(toolB.data.pricing) },
    { label: 'Data formats', a: formatValue(toolA.data.dataFormats), b: formatValue(toolB.data.dataFormats) },
    { label: 'Offline-ready', a: formatValue(toolA.data.offlineReady), b: formatValue(toolB.data.offlineReady) },
    { label: 'Git support', a: formatValue(toolA.data.gitSupport), b: formatValue(toolB.data.gitSupport) },
    { label: 'Collaboration fit', a: collaborationFit(toolA), b: collaborationFit(toolB) },
    { label: 'Publishing fit', a: publishingFit(toolA), b: publishingFit(toolB) },
    { label: 'Main limitation', a: toolA.data.limitations[0] ?? 'Not specified', b: toolB.data.limitations[0] ?? 'Not specified' },
  ];
}

export function buildGeneratedQuickAnswer(pair: ComparePair): string {
  const [toolA, toolB] = pair.tools;
  if (toolA.data.localFirst && !toolB.data.localFirst) {
    return `Choose ${toolA.data.title} when ownership, offline access, or long-term portability matters more. Choose ${toolB.data.title} when collaboration speed or cloud convenience matters more.`;
  }
  if (!toolA.data.localFirst && toolB.data.localFirst) {
    return `Choose ${toolB.data.title} when ownership, offline access, or long-term portability matters more. Choose ${toolA.data.title} when collaboration speed or cloud convenience matters more.`;
  }

  const writingWinner = strongerTool(pair, 'writing');
  const teamWinner = strongerTool(pair, 'team');
  if (writingWinner.slug !== teamWinner.slug) {
    const other = writingWinner.slug === toolA.slug ? toolB : toolA;
    return `Choose ${writingWinner.data.title} for solo writing, archive quality, or file-based work. Choose ${other.data.title} when your workflow leans more toward collaboration or operational structure.`;
  }

  return `Choose ${toolA.data.title} when its strengths match ${formatValue(toolA.data.bestFor).toLowerCase()}. Choose ${toolB.data.title} when your priority is ${formatValue(toolB.data.bestFor).toLowerCase()}.`;
}

export function buildGeneratedUseCaseVerdicts(pair: ComparePair): Record<string, string> {
  return {
    'Solo writing': strongerTool(pair, 'writing').data.title,
    Research: strongerTool(pair, 'research').data.title,
    'Team collaboration': strongerTool(pair, 'team').data.title,
    Publishing: strongerTool(pair, 'publishing').data.title,
    'Long-term archive': strongerTool(pair, 'archive').data.title,
  };
}

export function buildMigrationWarnings(pair: ComparePair): string[] {
  const [toolA, toolB] = pair.tools;
  const warnings = new Set<string>();

  if (toolA.data.localFirst !== toolB.data.localFirst) {
    warnings.add('Moving between a local-first system and a cloud-first system usually changes offline behavior, conflict handling, and export quality.');
  }

  if (!toolA.data.dataFormats.some((value) => toolB.data.dataFormats.includes(value))) {
    warnings.add('The two tools do not share a clean native data format, so test links, metadata, and attachments on a small sample before migrating.');
  }

  if (toolA.data.gitSupport && !toolB.data.gitSupport) {
    warnings.add(`${toolB.data.title} is weaker as a Git-based archive, so treat exports as checkpoints instead of assuming full repository parity.`);
  }

  if (toolB.data.gitSupport && !toolA.data.gitSupport) {
    warnings.add(`${toolA.data.title} is weaker as a Git-based archive, so treat exports as checkpoints instead of assuming full repository parity.`);
  }

  warnings.add(`${toolA.data.title}: ${toolA.data.limitations[0] ?? 'Review the official limitations before migrating.'}`);
  warnings.add(`${toolB.data.title}: ${toolB.data.limitations[0] ?? 'Review the official limitations before migrating.'}`);

  return [...warnings];
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

export function breadcrumbListSchema(items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleFaqSchema({
  title,
  description,
  url,
  faq,
  software,
  breadcrumbs,
}: {
  title: string;
  description: string;
  url: string;
  faq?: { question: string; answer: string }[];
  software?: ReturnType<typeof softwareApplicationSchema>[];
  breadcrumbs?: BreadcrumbItem[];
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

  if (breadcrumbs?.length) graph.push(breadcrumbListSchema(breadcrumbs));

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
        const recommendation = getWorkflowRecommendationForPersonaGoal(persona, goal);
        const title =
          goal === 'research'
            ? `Best research workflows for ${personaLabel(persona)}`
            : goal === 'personal-wiki'
              ? `Best personal wiki workflows for ${personaLabel(persona)}`
              : `Best knowledge workflows for ${personaLabel(persona)}`;
        const description = recommendation
          ? `${recommendation.recommendedPath.label} is the primary Offpedia recommendation for ${personaLabel(persona)} who care about ${goalLabel(goal)}, ownership, and a practical next step.`
          : `Recommended Offpedia workflows for ${personaLabel(persona)} focused on ${goalLabel(goal)}.`;
        pages.set(slug, {
          persona,
          goal,
          slug,
          title,
          description,
          stacks: [stack],
        });
      }
    }
  }

  return [...pages.values()].sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getWorkflowPages(stacks: StackEntry[]): WorkflowPage[] {
  return workflowPageStacks
    ? Object.entries(workflowPageStacks)
        .map(([slug, stackSlugs]) => {
          const note = getWorkflowPageNote(slug);
          if (!note) return null;
          return {
            slug,
            toolA: note.toolA,
            toolB: note.toolB,
            title: note.title,
            description: note.description,
            stacks: stacks.filter((stack) => stackSlugs.includes(stack.slug) || stackSlugs.includes(stack.data.customSlug ?? '')),
            source: 'seed' as const,
            sourceOfTruth: note.sourceOfTruth,
            whatSyncs: note.whatSyncs,
            whatDoesNotSync: note.whatDoesNotSync,
            failureModes: note.failureModes,
          };
        })
        .filter((item): item is WorkflowPage => Boolean(item))
        .sort((a, b) => a.slug.localeCompare(b.slug))
    : [];
}

export function relatedEntriesForStacks<T extends { slug: string; data: { customSlug?: string } }>(
  entries: T[],
  slugs: string[],
): T[] {
  const wanted = new Set(slugs);
  return entries.filter((entry) => wanted.has(entry.slug) || (entry.data.customSlug && wanted.has(entry.data.customSlug)));
}
