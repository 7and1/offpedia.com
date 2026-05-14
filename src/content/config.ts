import { defineCollection, z } from 'astro:content';

const statusEnum = z.enum(['draft', 'p2', 'review', 'published', 'archived']);
const difficultyEnum = z.enum(['beginner', 'intermediate', 'advanced']);
const linkCard = z.object({
  label: z.string(),
  href: z.string(),
  reason: z.string().optional(),
});

const base = z.object({
  title: z.string(),
  description: z.string(),
  customSlug: z.string().optional(),
  status: statusEnum.default('draft'),
  tags: z.array(z.string()).default([]),
  updatedAt: z.coerce.date()
});

const pseo = z.object({
  compare: z.boolean().default(false),
  workflow: z.boolean().default(false)
}).default({});

const wiki = defineCollection({
  type: 'content',
  schema: base.extend({
    kind: z.enum(['tool', 'concept']),
    category: z.string(),
    website: z.string().url().nullable().optional(),
    github: z.string().url().nullable().optional(),
    openSource: z.boolean().nullable().optional(),
    selfHosted: z.boolean().nullable().optional(),
    localFirst: z.boolean().nullable().optional(),
    offlineReady: z.boolean().nullable().optional(),
    pricing: z.string().optional(),
    gitSupport: z.string().optional(),
    bestFor: z.array(z.string()).default([]),
    pseo,
    dataFormats: z.array(z.string()).default([]),
    platforms: z.array(z.string()).default([]),
    limitations: z.array(z.string()).default([]),
    relatedStacks: z.array(z.string()).default([]),
    relatedKits: z.array(z.string()).default([])
  })
});

const stacks = defineCollection({
  type: 'content',
  schema: base.extend({
    goal: z.string(),
    personas: z.array(z.string()).default([]),
    coreTools: z.array(z.string()).default([]),
    optionalTools: z.array(z.string()).default([]),
    offlineReady: z.boolean(),
    localFirst: z.boolean(),
    gitNative: z.boolean().default(false),
    publishReady: z.boolean().default(false),
    difficulty: difficultyEnum,
    setupTime: z.string(),
    maintenance: z.enum(['low', 'medium', 'high']).default('low'),
    outcome: z.string(),
    quickVerdict: z.string(),
    idealFor: z.array(z.string()).default([]),
    avoidIf: z.array(z.string()).default([]),
    proofPoints: z.array(z.string()).default([]),
    alternatives: z.array(linkCard).default([]),
    relatedWiki: z.array(z.string()).default([]),
    relatedKits: z.array(z.string()).default([]),
    relatedGuides: z.array(z.string()).default([])
  })
});

const kits = defineCollection({
  type: 'content',
  schema: base.extend({
    stack: z.string(),
    templateRepo: z.string().url().nullable().optional(),
    downloadUrl: z.string().optional(),
    obsidianVersion: z.string().optional(),
    plugins: z.array(z.string()).default([]),
    folders: z.array(z.string()).default([]),
    outcome: z.string(),
    includedFiles: z.array(z.string()).default([]),
    previewNotes: z.array(z.string()).default([]),
    bestNextStep: linkCard,
    relatedGuides: z.array(z.string()).default([])
  })
});

const guides = defineCollection({
  type: 'content',
  schema: base.extend({
    quickAnswer: z.string(),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).default([]),
    difficulty: difficultyEnum,
    timeRequired: z.string(),
    relatedStack: z.string().optional(),
    relatedKits: z.array(z.string()).default([]),
    relatedWiki: z.array(z.string()).default([])
  })
});

const compare = defineCollection({
  type: 'content',
  schema: base.extend({
    tools: z.array(z.string()).default([]),
    winnerByUseCase: z.record(z.string()).default({}),
    quickAnswer: z.string(),
    useCaseVerdicts: z.record(z.string()).default({}),
    migrationWarnings: z.array(z.string()).default([]),
    bestAlternativeLinks: z.array(linkCard).default([]),
  })
});

export const collections = { wiki, stacks, kits, guides, compare };
