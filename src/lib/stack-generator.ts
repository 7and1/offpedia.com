export type GeneratorLink = {
  label: string;
  href: string;
  kind: string;
  note?: string;
};

export type GeneratorPersona =
  | 'writer'
  | 'newsletter-author'
  | 'indie-maker'
  | 'researcher'
  | 'student'
  | 'developer';

export type GeneratorGoal = 'writing' | 'research' | 'personal-wiki';
export type OfflineNeed = 'required' | 'helpful' | 'flexible';
export type GitNeed = 'avoid' | 'open' | 'prefer';
export type PublishingNeed = 'none' | 'later' | 'now';
export type CollaborationNeed = 'solo' | 'review' | 'realtime';

export type GeneratorInput = {
  persona: GeneratorPersona;
  goal: GeneratorGoal;
  offlineNeed: OfflineNeed;
  gitNeed: GitNeed;
  publishingNeed: PublishingNeed;
  collaborationNeed: CollaborationNeed;
};

export type GeneratorStack = {
  slug: string;
  title: string;
  description: string;
  goal: GeneratorGoal;
  personas: string[];
  offlineReady: boolean;
  localFirst: boolean;
  gitNative: boolean;
  publishReady: boolean;
  difficulty: string;
  maintenance: string;
  outcome: string;
  quickVerdict: string;
  avoidIf: string[];
  proofPoints: string[];
  relatedWiki: string[];
  stack: GeneratorLink;
  kit?: GeneratorLink;
  guide?: GeneratorLink;
  nextStep: GeneratorLink;
  alternative: GeneratorLink;
};

export type GeneratorCatalog = {
  stacks: GeneratorStack[];
};

export type GeneratorRecommendation = {
  stack: GeneratorLink;
  summary: string;
  reason: string;
  kit?: GeneratorLink;
  guide?: GeneratorLink;
  nextStep: GeneratorLink;
  alternative: GeneratorLink;
  warning: string;
  trustCriteria: string[];
  matchedSignals: string[];
};

export const generatorOptions = {
  persona: [
    { value: 'writer', label: 'Writer' },
    { value: 'newsletter-author', label: 'Newsletter author' },
    { value: 'indie-maker', label: 'Indie maker' },
    { value: 'researcher', label: 'Researcher' },
    { value: 'student', label: 'Student' },
    { value: 'developer', label: 'Developer' },
  ],
  goal: [
    { value: 'writing', label: 'Write and archive durable drafts' },
    { value: 'research', label: 'Run a source-heavy research workflow' },
    { value: 'personal-wiki', label: 'Publish a personal wiki or digital garden' },
  ],
  offlineNeed: [
    { value: 'required', label: 'Required' },
    { value: 'helpful', label: 'Helpful' },
    { value: 'flexible', label: 'Flexible' },
  ],
  gitNeed: [
    { value: 'avoid', label: 'Avoid Git if possible' },
    { value: 'open', label: 'Open to a light Git workflow' },
    { value: 'prefer', label: 'Prefer Git-native workflows' },
  ],
  publishingNeed: [
    { value: 'none', label: 'Not now' },
    { value: 'later', label: 'Maybe later' },
    { value: 'now', label: 'Yes, public output soon' },
  ],
  collaborationNeed: [
    { value: 'solo', label: 'Mostly solo' },
    { value: 'review', label: 'Async review or handoff' },
    { value: 'realtime', label: 'Realtime collaboration' },
  ],
} as const;

export const defaultGeneratorInput: GeneratorInput = {
  persona: 'writer',
  goal: 'writing',
  offlineNeed: 'required',
  gitNeed: 'open',
  publishingNeed: 'later',
  collaborationNeed: 'solo',
};

const personaAffinity: Record<GeneratorPersona, string[]> = {
  writer: ['writer', 'newsletter-author', 'indie-maker'],
  'newsletter-author': ['newsletter-author', 'writer', 'indie-maker'],
  'indie-maker': ['indie-maker', 'writer', 'developer'],
  researcher: ['researcher', 'student', 'analyst'],
  student: ['student', 'researcher', 'analyst'],
  developer: ['developer', 'writer', 'indie-maker'],
};

function dedupe(items: string[]): string[] {
  return [...new Set(items.filter(Boolean))];
}

function addSignal(signals: string[], value: string): void {
  if (value && !signals.includes(value)) signals.push(value);
}

function inferGoalLabel(goal: GeneratorGoal): string {
  if (goal === 'personal-wiki') return 'Personal wiki';
  if (goal === 'research') return 'Research';
  return 'Writing';
}

function scoreStack(stack: GeneratorStack, input: GeneratorInput): { score: number; matchedSignals: string[] } {
  let score = 0;
  const matchedSignals: string[] = [];
  const personaMatches = personaAffinity[input.persona] || [input.persona];

  if (stack.goal === input.goal) {
    score += 60;
    addSignal(matchedSignals, `${inferGoalLabel(input.goal)} fit`);
  } else if (input.goal === 'writing' && stack.goal === 'personal-wiki' && input.publishingNeed === 'now') {
    score += 16;
  } else if (input.goal === 'personal-wiki' && stack.publishReady) {
    score += 14;
  } else {
    score -= 12;
  }

  if (stack.personas.some((persona) => personaMatches.includes(persona))) {
    score += 24;
    addSignal(matchedSignals, `${input.persona.replace(/-/g, ' ')} fit`);
  }

  if (input.offlineNeed === 'required') {
    if (stack.localFirst && stack.offlineReady) {
      score += 18;
      addSignal(matchedSignals, 'Offline-ready');
    } else {
      score -= 28;
    }
  } else if (input.offlineNeed === 'helpful') {
    if (stack.localFirst || stack.offlineReady) {
      score += 8;
      addSignal(matchedSignals, 'Portable archive');
    }
  }

  if (input.gitNeed === 'prefer') {
    if (stack.gitNative) {
      score += 12;
      addSignal(matchedSignals, 'Git-native handoff');
    } else {
      score -= 8;
    }
  } else if (input.gitNeed === 'avoid') {
    if (stack.gitNative) {
      score -= 12;
    } else {
      score += 6;
      addSignal(matchedSignals, 'Low Git pressure');
    }
  } else if (stack.gitNative) {
    score += 4;
  }

  if (input.publishingNeed === 'now') {
    if (stack.publishReady) {
      score += 18;
      addSignal(matchedSignals, 'Publishing path ready');
    } else {
      score -= 14;
    }
  } else if (input.publishingNeed === 'later' && stack.publishReady) {
    score += 7;
  }

  if (input.collaborationNeed === 'solo') {
    if (stack.localFirst) {
      score += 6;
      addSignal(matchedSignals, 'Solo-friendly');
    }
  } else if (input.collaborationNeed === 'review') {
    if (stack.gitNative) {
      score += 6;
      addSignal(matchedSignals, 'Review-friendly');
    }
  } else if (input.collaborationNeed === 'realtime') {
    score -= 18;
    if (stack.goal === 'research') score -= 6;
  }

  if (stack.kit) {
    score += 5;
    addSignal(matchedSignals, 'Starter kit available');
  }

  if (stack.guide) {
    score += 4;
    addSignal(matchedSignals, 'Guide-backed');
  }

  return { score, matchedSignals };
}

function recommendationReason(stack: GeneratorStack, input: GeneratorInput): string {
  const clauses: string[] = [];

  if (stack.goal === input.goal) clauses.push(`it is tuned for ${inferGoalLabel(input.goal).toLowerCase()} first`);
  if (input.offlineNeed !== 'flexible' && stack.localFirst && stack.offlineReady) clauses.push('the working archive stays local and offline-capable');
  if (input.gitNeed === 'prefer' && stack.gitNative) clauses.push('Git is part of the workflow instead of an afterthought');
  if (input.publishingNeed !== 'none' && stack.publishReady) clauses.push('the publishing handoff already exists');
  if (input.collaborationNeed === 'review' && stack.gitNative) clauses.push('async review fits better than realtime co-editing');
  if (stack.kit) clauses.push('there is a matching starter kit instead of just an article');

  if (clauses.length === 0) return stack.quickVerdict;
  return `Choose this when ${clauses.join(', ')}.`;
}

function recommendationWarning(stack: GeneratorStack, input: GeneratorInput): string {
  if (input.collaborationNeed === 'realtime') {
    return 'Realtime multi-editor work is the main pressure point here. If that is non-negotiable, use the compare path before committing to a local-first stack.';
  }

  if (input.gitNeed === 'avoid' && stack.gitNative) {
    return 'This recommendation still assumes a light Git handoff. If Git is a hard no, stay on the alternative compare path and keep the archive simpler.';
  }

  return stack.avoidIf[0] || 'Use the alternative if the working constraints change before you commit to the stack.';
}

function recommendationTrust(stack: GeneratorStack): string[] {
  return dedupe([
    stack.localFirst && stack.offlineReady ? 'Local-first files and offline-ready archive' : 'Tradeoffs are explicit before setup work starts',
    stack.gitNative ? 'Git-native handoff and rollback path' : 'Git is optional rather than forced',
    stack.publishReady ? 'Publishing path already documented' : 'Private-first workflow with clear limits',
    stack.kit ? 'Matching kit reduces setup drift' : '',
    stack.guide ? 'Guide-backed next step' : '',
    stack.proofPoints[0] || '',
  ]).slice(0, 5);
}

export function recommendStack(catalog: GeneratorCatalog, input: GeneratorInput): GeneratorRecommendation {
  const ranked = catalog.stacks
    .map((stack) => {
      const { score, matchedSignals } = scoreStack(stack, input);
      return { stack, score, matchedSignals };
    })
    .sort((a, b) => b.score - a.score || a.stack.title.localeCompare(b.stack.title));
  const chosen = ranked[0]?.stack ?? catalog.stacks[0];
  const matchedSignals = ranked[0]?.matchedSignals ?? [];

  return {
    stack: chosen.stack,
    summary: chosen.outcome,
    reason: recommendationReason(chosen, input),
    kit: chosen.kit,
    guide: chosen.guide,
    nextStep: chosen.nextStep,
    alternative: chosen.alternative,
    warning: recommendationWarning(chosen, input),
    trustCriteria: recommendationTrust(chosen),
    matchedSignals,
  };
}
