export type WorkflowLink = {
  label: string;
  href: string;
  kind?: string;
  note?: string;
};

export type WorkflowMapStep = {
  stage: string;
  title: string;
  detail: string;
  tool?: string;
};

export type FinderInput = {
  role: 'writer' | 'researcher' | 'personal-wiki-builder' | 'team-docs';
  goal: 'writing' | 'research' | 'publish-wiki' | 'team-docs';
  gitComfort: 'low' | 'medium' | 'high';
  collaboration: 'solo' | 'light' | 'realtime';
  publishing: 'none' | 'optional' | 'public-site';
  ownership: 'low' | 'medium' | 'high';
};

export type WorkflowRecommendation = {
  id: 'writer' | 'researcher' | 'personal-wiki-builder' | 'team-docs';
  label: string;
  shortLabel: string;
  role: string;
  outcome: string;
  summary: string;
  recommendedPath: WorkflowLink;
  reason: string;
  todayAction: WorkflowLink;
  kit?: WorkflowLink;
  guide?: WorkflowLink;
  alternative: WorkflowLink;
  warning: string;
  trustNote: string;
  criteria: string[];
  workflowMap: WorkflowMapStep[];
};

export type WorkflowPageNote = {
  slug: string;
  toolA: string;
  toolB: string;
  title: string;
  description: string;
  sourceOfTruth: string;
  whatSyncs: string[];
  whatDoesNotSync: string[];
  failureModes: string[];
};

export const finderOptions = {
  role: [
    { value: 'writer', label: 'Writer' },
    { value: 'researcher', label: 'Researcher' },
    { value: 'personal-wiki-builder', label: 'Personal Wiki Builder' },
    { value: 'team-docs', label: 'Team Docs' },
  ],
  goal: [
    { value: 'writing', label: 'Write and archive durable drafts' },
    { value: 'research', label: 'Manage sources and turn notes into writing' },
    { value: 'publish-wiki', label: 'Publish a personal wiki or docs site' },
    { value: 'team-docs', label: 'Run a shared team knowledge base' },
  ],
  gitComfort: [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ],
  collaboration: [
    { value: 'solo', label: 'Mostly solo' },
    { value: 'light', label: 'Occasional handoff or review' },
    { value: 'realtime', label: 'Realtime collaboration' },
  ],
  publishing: [
    { value: 'none', label: 'No publishing yet' },
    { value: 'optional', label: 'Maybe later' },
    { value: 'public-site', label: 'Yes, public site now' },
  ],
  ownership: [
    { value: 'low', label: 'Convenience matters more' },
    { value: 'medium', label: 'Balanced' },
    { value: 'high', label: 'High ownership and offline access' },
  ],
} as const;

export const defaultFinderInput: FinderInput = {
  role: 'writer',
  goal: 'writing',
  gitComfort: 'low',
  collaboration: 'solo',
  publishing: 'optional',
  ownership: 'high',
};

export const workflowRecommendations: WorkflowRecommendation[] = [
  {
    id: 'writer',
    label: 'Writer workflow',
    shortLabel: 'Writer',
    role: 'Writer',
    outcome: 'A durable writing stack with local drafts, version history, and a clean path to publishing.',
    summary:
      'Choose Obsidian + GitHub when you want a writing system that keeps your drafts portable, searchable, and ready to publish without locking the archive into one app.',
    recommendedPath: {
      label: 'Obsidian + GitHub',
      href: '/stacks/writer-obsidian-github',
      kind: 'Stack',
    },
    reason:
      'Obsidian gives you a local Markdown vault for drafting and reference notes, while GitHub adds version history, backup, and a publishing handoff.',
    todayAction: {
      label: 'Start with Writer Vault Starter',
      href: '/kits/writer-vault-starter',
      kind: 'Kit',
    },
    kit: {
      label: 'Writer Vault Starter',
      href: '/kits/writer-vault-starter',
      kind: 'Kit',
    },
    guide: {
      label: 'How to sync Obsidian with GitHub',
      href: '/guides/setup-obsidian-github-sync',
      kind: 'Guide',
    },
    alternative: {
      label: 'Obsidian vs Notion',
      href: '/compare/obsidian-vs-notion',
      kind: 'Compare',
      note: 'Use this when collaboration convenience matters more than file ownership.',
    },
    warning: 'Not for you if your team needs realtime co-editing or you refuse even a light Git workflow.',
    trustNote: 'Recommendation criteria: portability, offline access, Git support, publishing readiness, and migration risk.',
    criteria: ['Portable Markdown files', 'Offline drafting', 'Git backup', 'Publishing handoff', 'Low migration risk'],
    workflowMap: [
      { stage: 'Capture', title: 'Collect ideas locally', detail: 'Inbox notes, source snippets, and early drafts live in one vault.', tool: 'Obsidian' },
      { stage: 'Organize', title: 'Shape drafts into publishable pieces', detail: 'Move notes through drafts, essays, references, and published folders.', tool: 'Obsidian' },
      { stage: 'Version', title: 'Save milestones with history', detail: 'Commit meaningful writing stages so you can recover or compare revisions.', tool: 'GitHub' },
      { stage: 'Publish', title: 'Hand off to your site or newsletter', detail: 'Use GitHub as the transfer point into your publishing workflow.', tool: 'GitHub' },
    ],
  },
  {
    id: 'researcher',
    label: 'Research workflow',
    shortLabel: 'Researcher',
    role: 'Researcher',
    outcome: 'A research workflow that keeps sources, literature notes, and synthesis connected without collapsing everything into one tool.',
    summary:
      'Choose Obsidian + Zotero when you need a clear split between source management and thinking. Zotero keeps the library clean; Obsidian turns evidence into arguments.',
    recommendedPath: {
      label: 'Obsidian + Zotero',
      href: '/stacks/researcher-obsidian-zotero',
      kind: 'Stack',
    },
    reason:
      'This path reduces the common failure mode where PDFs, citations, reading notes, and synthesis all end up mixed inside one hard-to-maintain workspace.',
    todayAction: {
      label: 'Review the research stack',
      href: '/stacks/researcher-obsidian-zotero',
      kind: 'Stack',
    },
    guide: {
      label: 'How to design a frontmatter schema',
      href: '/guides/design-frontmatter-schema',
      kind: 'Guide',
    },
    alternative: {
      label: 'Obsidian vs Logseq',
      href: '/compare/obsidian-vs-logseq',
      kind: 'Compare',
      note: 'Use this if your research process is outline-first and block-heavy.',
    },
    warning: 'Not for you if you want a single app to store PDFs, citations, outlines, and final collaborative drafts with no handoff.',
    trustNote: 'Recommendation criteria: source ownership, citation handling, note portability, synthesis quality, and export safety.',
    criteria: ['Clear source of truth', 'Portable notes', 'Citation support', 'Offline library access', 'Lower migration risk'],
    workflowMap: [
      { stage: 'Capture', title: 'Collect sources and metadata', detail: 'Save papers, books, web pages, and citation metadata in a dedicated research library.', tool: 'Zotero' },
      { stage: 'Organize', title: 'Turn reading into notes', detail: 'Create literature, concept, and project notes that point back to their sources.', tool: 'Obsidian' },
      { stage: 'Version', title: 'Keep the interpretation layer durable', detail: 'Back up or version the note layer separately from the citation database.', tool: 'Obsidian' },
      { stage: 'Publish', title: 'Export into writing when the argument is ready', detail: 'Move from notes to drafts with citations still traceable.', tool: 'Obsidian + Zotero' },
    ],
  },
  {
    id: 'personal-wiki-builder',
    label: 'Personal wiki workflow',
    shortLabel: 'Personal Wiki Builder',
    role: 'Personal Wiki Builder',
    outcome: 'A Markdown publishing system that starts in a private vault and ends as a public site without duplicating your whole workflow.',
    summary:
      'Choose Obsidian + Quartz + GitHub when you want a personal wiki or digital garden with portable Markdown, backlink-friendly publishing, and a Git-based release path.',
    recommendedPath: {
      label: 'Obsidian + Quartz + GitHub',
      href: '/stacks/personal-wiki-obsidian-quartz',
      kind: 'Stack',
    },
    reason:
      'Obsidian remains the editing surface, GitHub holds the versioned publishing repo, and Quartz turns that repo into a linked static site.',
    todayAction: {
      label: 'Open the Personal Wiki Kit',
      href: '/kits/personal-wiki-kit',
      kind: 'Kit',
    },
    kit: {
      label: 'Personal Wiki Kit',
      href: '/kits/personal-wiki-kit',
      kind: 'Kit',
    },
    guide: {
      label: 'How to publish an Obsidian vault as a website',
      href: '/guides/publish-obsidian-to-quartz',
      kind: 'Guide',
    },
    alternative: {
      label: 'Quartz vs Docusaurus',
      href: '/compare/quartz-vs-docusaurus',
      kind: 'Compare',
      note: 'Use this if you are unsure whether you are building a personal wiki or a team-maintained docs product.',
    },
    warning: 'Not for you if you need realtime multi-editor docs, database-heavy content models, or zero Git exposure.',
    trustNote: 'Recommendation criteria: source ownership, publishing handoff, backlink readability, Git support, and maintenance cost.',
    criteria: ['Markdown source of truth', 'Git deployment path', 'Publishing clarity', 'Backlink support', 'Portable archive'],
    workflowMap: [
      { stage: 'Capture', title: 'Write privately first', detail: 'Keep your main notes in Obsidian and decide what becomes public.', tool: 'Obsidian' },
      { stage: 'Organize', title: 'Split private and public material', detail: 'Curate only the notes, folders, and assets meant for the site.', tool: 'Obsidian' },
      { stage: 'Version', title: 'Publish from a versioned repo', detail: 'Use GitHub as the deployment source and rollback layer.', tool: 'GitHub' },
      { stage: 'Publish', title: 'Generate a browseable wiki', detail: 'Quartz renders backlinks, pages, and navigation into a static site.', tool: 'Quartz' },
    ],
  },
  {
    id: 'team-docs',
    label: 'Team docs workflow',
    shortLabel: 'Team Docs',
    role: 'Team Docs',
    outcome: 'A compare-first path for shared documentation where collaboration and publishing matter more than strict local-first purity.',
    summary:
      'Choose Notion when the team needs fast collaborative editing and lightweight databases. Choose Docusaurus when the team needs versioned documentation, review, and a Git workflow.',
    recommendedPath: {
      label: 'Notion or Docusaurus',
      href: '/compare/obsidian-vs-notion',
      kind: 'Compare',
    },
    reason:
      'This is the point where Offpedia stops forcing a local-first answer. Team docs often succeed with cloud collaboration or a proper docs framework before they succeed with a personal vault stack.',
    todayAction: {
      label: 'Compare the collaboration tradeoffs',
      href: '/compare/obsidian-vs-notion',
      kind: 'Compare',
    },
    guide: {
      label: 'Quartz vs Docusaurus',
      href: '/compare/quartz-vs-docusaurus',
      kind: 'Compare',
    },
    alternative: {
      label: 'Quartz vs Docusaurus',
      href: '/compare/quartz-vs-docusaurus',
      kind: 'Compare',
      note: 'Use this when the team is already Git-comfortable and needs versioned docs instead of a shared workspace.',
    },
    warning: 'Not for you if your real need is a solo writing archive, research system, or personal wiki. Those should start from a different source of truth.',
    trustNote: 'Recommendation criteria: collaboration, review workflow, publishing needs, source ownership, and team maintenance cost.',
    criteria: ['Realtime collaboration', 'Review workflow', 'Docs publishing', 'Migration safety', 'Operational overhead'],
    workflowMap: [
      { stage: 'Capture', title: 'Collect drafts where the team can edit', detail: 'Use a shared workspace or Git repo as the common entry point.', tool: 'Notion or Docusaurus' },
      { stage: 'Organize', title: 'Decide if docs are pages or products', detail: 'Database-heavy internal docs and versioned product docs are different systems.', tool: 'Notion or Docusaurus' },
      { stage: 'Version', title: 'Add process only where it helps', detail: 'Docusaurus benefits from Git review; Notion benefits from ownership and page structure.', tool: 'Git or shared workspace history' },
      { stage: 'Publish', title: 'Ship the surface the team actually needs', detail: 'Pick the docs model that matches collaboration, not ideology.', tool: 'Notion or Docusaurus' },
    ],
  },
];

export const workflowPages: WorkflowPageNote[] = [
  {
    slug: 'obsidian-with-github',
    toolA: 'obsidian',
    toolB: 'github',
    title: 'Obsidian with GitHub',
    description: 'A durable writing and knowledge workflow where local Markdown stays primary and GitHub handles version history, backup, and publishing handoff.',
    sourceOfTruth: 'Your Markdown vault in Obsidian is the source of truth. GitHub stores the versioned copy and the publishing handoff.',
    whatSyncs: ['Markdown notes', 'Folder structure', 'Templates', 'Small text-first assets'],
    whatDoesNotSync: ['Your live editor state', 'Plugin settings across every device by default', 'Large binary attachments without a storage plan'],
    failureModes: ['Git conflicts after editing the same note in multiple places', 'A repo full of large media files that should live elsewhere', 'Treating GitHub as the writing interface instead of the durable backup layer'],
  },
  {
    slug: 'obsidian-with-zotero',
    toolA: 'obsidian',
    toolB: 'zotero',
    title: 'Obsidian with Zotero',
    description: 'A research workflow where Zotero manages the evidence library and Obsidian turns that evidence into questions, notes, and drafts.',
    sourceOfTruth: 'Zotero is the source of truth for references and citations. Obsidian is the source of truth for synthesis, arguments, and writing structure.',
    whatSyncs: ['Citation keys or reference links', 'Note links back to sources', 'Exported metadata when you choose a plugin or export flow'],
    whatDoesNotSync: ['A perfect mirror of your Zotero library inside Obsidian', 'Every annotation without a deliberate import workflow', 'Library-level operations such as bulk citation management'],
    failureModes: ['Mixing final citation data into ad hoc Markdown notes', 'Using Obsidian as the only place where source metadata lives', 'Broken links after changing citation keys or export formats'],
  },
  {
    slug: 'quartz-with-github',
    toolA: 'quartz',
    toolB: 'github',
    title: 'Quartz with GitHub',
    description: 'A publishing workflow where GitHub holds the site repo and Quartz turns Markdown into a linked personal wiki or digital garden.',
    sourceOfTruth: 'The published Markdown repo is the source of truth for the site. Quartz is the renderer that turns it into a static website.',
    whatSyncs: ['Markdown content', 'Folder structure', 'Theme and config files', 'Deployment workflow changes'],
    whatDoesNotSync: ['Private notes you never add to the repo', 'Live editor context from your local vault', 'Attachments that are stored outside the publishable tree'],
    failureModes: ['Publishing the wrong folder or private notes by accident', 'Assuming Quartz is a note database instead of a site generator', 'Breaking the site with repo changes that were never previewed'],
  },
  {
    slug: 'quartz-with-github-pages',
    toolA: 'quartz',
    toolB: 'github-pages',
    title: 'Quartz with GitHub Pages',
    description: 'A low-friction static publishing path for Quartz sites where GitHub Pages acts as the origin and GitHub Actions handles the build.',
    sourceOfTruth: 'The Git repository is the source of truth. GitHub Pages is only the hosting origin for the built output.',
    whatSyncs: ['The built static site artifact', 'CNAME and Pages settings', 'Theme and content changes pushed through the repo'],
    whatDoesNotSync: ['Any local preview state', 'Uncommitted draft changes', 'External assets not included in the published build'],
    failureModes: ['Pages builds that pass locally but fail in Actions', 'Custom domain mismatch between CNAME, Pages, and DNS', 'Publishing stale content because search index or sitemap output was not rebuilt'],
  },
];

export function getWorkflowRecommendationById(id: WorkflowRecommendation['id']): WorkflowRecommendation {
  return workflowRecommendations.find((item) => item.id === id) ?? workflowRecommendations[0];
}

export function getWorkflowRecommendationForPersonaGoal(persona: string, goal: string): WorkflowRecommendation | null {
  if (goal === 'research' || persona === 'researcher' || persona === 'student' || persona === 'analyst') {
    return getWorkflowRecommendationById('researcher');
  }
  if (goal === 'personal-wiki' || persona === 'developer') {
    return getWorkflowRecommendationById('personal-wiki-builder');
  }
  if (goal === 'writing' || persona === 'writer' || persona === 'indie-maker' || persona === 'newsletter-author') {
    return getWorkflowRecommendationById('writer');
  }
  return null;
}

export function getWorkflowPageNote(slug: string): WorkflowPageNote | null {
  return workflowPages.find((item) => item.slug === slug) ?? null;
}

export function recommendWorkflow(input: FinderInput): WorkflowRecommendation {
  if (
    input.role === 'team-docs' ||
    input.goal === 'team-docs' ||
    input.collaboration === 'realtime' ||
    (input.ownership === 'low' && input.collaboration !== 'solo')
  ) {
    return getWorkflowRecommendationById('team-docs');
  }

  if (input.role === 'researcher' || input.goal === 'research') {
    return getWorkflowRecommendationById('researcher');
  }

  if (
    input.role === 'personal-wiki-builder' ||
    input.goal === 'publish-wiki' ||
    input.publishing === 'public-site'
  ) {
    return getWorkflowRecommendationById('personal-wiki-builder');
  }

  if (input.gitComfort === 'low' && input.collaboration === 'solo' && input.ownership !== 'low') {
    return getWorkflowRecommendationById('writer');
  }

  return getWorkflowRecommendationById('writer');
}

export function personaLabel(persona: string): string {
  const labels: Record<string, string> = {
    writer: 'writers',
    'indie-maker': 'indie makers',
    'newsletter-author': 'newsletter authors',
    researcher: 'researchers',
    student: 'students',
    analyst: 'analysts',
    developer: 'developers',
  };

  return labels[persona] ?? `${persona.replace(/-/g, ' ')}s`;
}

export function goalLabel(goal: string): string {
  const labels: Record<string, string> = {
    writing: 'writing',
    research: 'research',
    'personal-wiki': 'personal wiki publishing',
  };
  return labels[goal] ?? goal.replace(/-/g, ' ');
}
