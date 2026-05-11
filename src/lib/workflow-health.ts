import type { CollectionEntry } from 'astro:content';

type StackEntry = CollectionEntry<'stacks'>;
type KitEntry = CollectionEntry<'kits'>;
type GuideEntry = CollectionEntry<'guides'>;

export type WorkflowHealthSignal = {
  label: string;
  state: 'good' | 'warn' | 'neutral';
  detail: string;
};

function matchesSlug(value: string, slug: string, customSlug?: string): boolean {
  return value === slug || value === customSlug;
}

function isRecent(value: Date, maxAgeDays = 120): boolean {
  const ageInMs = Date.now() - value.getTime();
  return ageInMs <= maxAgeDays * 24 * 60 * 60 * 1000;
}

export function buildWorkflowHealthSignals(
  stack: StackEntry,
  kits: KitEntry[],
  guides: GuideEntry[],
): WorkflowHealthSignal[] {
  const stackSlug = stack.data.customSlug || stack.slug;
  const matchingKits = kits.filter((entry) => matchesSlug(entry.data.stack, stack.slug, stack.data.customSlug));
  const matchingGuides = guides.filter((entry) => matchesSlug(entry.data.relatedStack || '', stack.slug, stack.data.customSlug));
  const recent = isRecent(stack.data.updatedAt);
  const linkedWikiCount = stack.data.relatedWiki.length;

  return [
    {
      label: 'Kit coverage',
      state: matchingKits.length > 0 ? 'good' : 'warn',
      detail: matchingKits.length > 0 ? `${matchingKits.length} matching kit linked to ${stackSlug}.` : 'Add a matching kit before calling this stack starter-ready.',
    },
    {
      label: 'Guide coverage',
      state: matchingGuides.length > 0 ? 'good' : 'warn',
      detail: matchingGuides.length > 0 ? `${matchingGuides.length} setup guide linked to this stack.` : 'A guide is still missing for the first concrete setup step.',
    },
    {
      label: 'Freshness',
      state: recent ? 'good' : 'warn',
      detail: recent ? `Updated ${stack.data.updatedAt.toISOString().slice(0, 10)}.` : `Last updated ${stack.data.updatedAt.toISOString().slice(0, 10)}. Review the tool claims before reusing this stack.`,
    },
    {
      label: 'Publish readiness',
      state: stack.data.publishReady ? 'good' : 'neutral',
      detail: stack.data.publishReady ? 'A public publishing path is already documented.' : 'This stack is still private-first and should not be framed as publish-ready yet.',
    },
    {
      label: 'Git fit',
      state: stack.data.gitNative ? 'good' : 'neutral',
      detail: stack.data.gitNative ? 'Git is part of the default handoff, backup, or deployment path.' : 'Git is optional here; treat exports and backups as deliberate checkpoints.',
    },
    {
      label: 'Reference coverage',
      state: linkedWikiCount >= 3 ? 'good' : 'warn',
      detail: linkedWikiCount >= 3 ? `${linkedWikiCount} related wiki entries support this stack.` : 'Add more linked wiki entries so the stack can explain its moving parts without external context.',
    },
  ];
}
