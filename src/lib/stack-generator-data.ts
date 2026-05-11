import type { CollectionEntry } from 'astro:content';
import type { GeneratorCatalog, GeneratorGoal, GeneratorLink, GeneratorStack } from './stack-generator';

type StackEntry = CollectionEntry<'stacks'>;
type KitEntry = CollectionEntry<'kits'>;
type GuideEntry = CollectionEntry<'guides'>;

function collectionHref(kind: 'stack' | 'kit' | 'guide', slug: string): string {
  if (kind === 'stack') return `/stacks/${slug}`;
  if (kind === 'kit') return `/kits/${slug}`;
  return `/guides/${slug}`;
}

function linkKindFromHref(href: string): string {
  if (href.startsWith('/compare/')) return 'Alternative';
  if (href.startsWith('/guides/')) return 'Guide';
  if (href.startsWith('/kits/')) return 'Kit';
  if (href.startsWith('/wiki/')) return 'Wiki';
  return 'Path';
}

function toGeneratorGoal(value: string): GeneratorGoal {
  if (value === 'research' || value === 'personal-wiki' || value === 'writing') return value;
  return 'writing';
}

function findBySlug<T extends { slug: string; data: { customSlug?: string; title: string } }>(entries: T[], slug: string): T | undefined {
  return entries.find((entry) => entry.slug === slug || entry.data.customSlug === slug);
}

function asLink(kind: 'stack' | 'kit' | 'guide', entry: { slug: string; data: { customSlug?: string; title: string } }): GeneratorLink {
  const slug = entry.data.customSlug || entry.slug;
  return {
    label: entry.data.title,
    href: collectionHref(kind, slug),
    kind: kind === 'stack' ? 'Recommended stack' : kind === 'kit' ? 'Kit' : 'Guide',
  };
}

export function buildStackGeneratorCatalog(
  stackEntries: StackEntry[],
  kitEntries: KitEntry[],
  guideEntries: GuideEntry[],
): GeneratorCatalog {
  const stacks: GeneratorStack[] = stackEntries.map((entry) => {
    const relatedKit = entry.data.relatedKits.map((slug) => findBySlug(kitEntries, slug)).find(Boolean);
    const relatedGuide = entry.data.relatedGuides.map((slug) => findBySlug(guideEntries, slug)).find(Boolean);
    const stackLink = asLink('stack', entry);
    const kitLink = relatedKit ? asLink('kit', relatedKit) : undefined;
    const guideLink = relatedGuide ? asLink('guide', relatedGuide) : undefined;
    const nextStep = kitLink ?? guideLink ?? stackLink;
    const alternative = entry.data.alternatives[0]
      ? {
          label: entry.data.alternatives[0].label,
          href: entry.data.alternatives[0].href,
          kind: linkKindFromHref(entry.data.alternatives[0].href),
          note: entry.data.alternatives[0].reason,
        }
      : {
          label: 'Browse all compare paths',
          href: '/compare',
          kind: 'Alternative',
          note: 'Use the compare index when the recommended stack feels too narrow for the constraint set.',
        };

    return {
      slug: entry.slug,
      title: entry.data.title,
      description: entry.data.description,
      goal: toGeneratorGoal(entry.data.goal),
      personas: entry.data.personas,
      offlineReady: entry.data.offlineReady,
      localFirst: entry.data.localFirst,
      gitNative: entry.data.gitNative,
      publishReady: entry.data.publishReady,
      difficulty: entry.data.difficulty,
      maintenance: entry.data.maintenance,
      outcome: entry.data.outcome,
      quickVerdict: entry.data.quickVerdict,
      avoidIf: entry.data.avoidIf,
      proofPoints: entry.data.proofPoints,
      relatedWiki: entry.data.relatedWiki,
      stack: stackLink,
      kit: kitLink,
      guide: guideLink,
      nextStep,
      alternative,
    };
  });

  return { stacks };
}
