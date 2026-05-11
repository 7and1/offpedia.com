---
title: "Writer Stack: Obsidian + GitHub"
description: Use Obsidian for writing and GitHub for version history, backup, and publishing preparation.
customSlug: writer-obsidian-github
status: published
goal: writing
personas:
  - writer
  - indie-maker
  - newsletter-author
coreTools:
  - obsidian
  - github
optionalTools:
  - quartz
  - typst
  - syncthing
offlineReady: true
localFirst: true
gitNative: true
publishReady: true
difficulty: beginner
setupTime: 30min
maintenance: low
outcome: A portable writing workflow with local Markdown drafts, Git version history, and a clear publishing handoff.
quickVerdict: Start here if you want your writing archive to stay readable and reusable outside any one app.
idealFor:
  - Long-form writers building a durable archive
  - Newsletter authors who want local drafts and revision history
  - Solo creators who publish from Markdown or static sites
avoidIf:
  - You need realtime collaborative editing across a team
  - You do not want to learn even a lightweight Git routine
  - Your workflow is mostly mobile capture with no desktop review step
proofPoints:
  - Obsidian stores drafts as normal Markdown files in a local folder.
  - GitHub adds version history, remote backup, and repo-based publishing handoff.
  - The same structure can later feed Quartz or another static publishing layer.
alternatives:
  - label: Obsidian vs Notion
    href: /compare/obsidian-vs-notion
    reason: Use this if collaboration convenience matters more than local ownership.
relatedWiki:
  - tools/obsidian
  - tools/github
  - tools/syncthing
  - tools/typst
  - concepts/markdown
  - concepts/frontmatter
  - concepts/git-based-publishing
relatedKits:
  - writer-vault-starter
relatedGuides:
  - setup-obsidian-github-sync
tags:
  - writing
  - obsidian
  - github
  - local-first
updatedAt: 2026-05-09
---

## What this stack solves

This stack solves three common writing problems:

1. Drafts and references are scattered across platforms.
2. Writing platforms may not stay reliable forever.
3. Version history, drafts, and reference material are hard to manage together.

The stack splits the writing system into two roles:

- Obsidian handles local writing and knowledge organization.
- GitHub handles version history, remote backup, and publishing preparation.

## Best for

- Long-form writers who want a portable archive
- Newsletter authors who want a durable draft history
- Indie makers who publish essays, product logs, or documentation
- People who want drafts, references, and publishing prep in one system
- People who want version history without changing writing tools

## Not ideal for

- Users who do not want any Git workflow at all
- Teams that need realtime collaborative editing
- People who only write quick mobile notes and never review on desktop

## Recommended folder structure

```txt
Writer Vault/
├── 00 Inbox/
├── 10 Drafts/
├── 20 Essays/
├── 30 References/
├── 40 Published/
├── 80 Assets/
└── 90 Templates/
```

## Recommended frontmatter

```yaml
---
title: Article title
status: draft
type: essay
tags:
  - writing
created: 2026-05-09
updated: 2026-05-09
publishTarget: blog
---
```

## Minimal workflow

1. Capture ideas in `00 Inbox`.
2. Move mature ideas into `10 Drafts`.
3. Store source material in `30 References`.
4. Move finished pieces into `20 Essays`.
5. Copy or move published work into `40 Published`.
6. Commit to GitHub after each meaningful writing stage.

## GitHub's role

GitHub is not the writing interface. It provides long-term safety:

- Version history
- Remote backup
- Template distribution
- Publishing workflows
- Public project visibility

## Useful optional additions

- [Syncthing](/wiki/tools/syncthing) keeps a local-first vault available across devices without handing the archive to one cloud workspace.
- [Typst](/wiki/tools/typst) becomes useful when a draft needs a more controlled PDF, report, or print output without moving the writing archive elsewhere.

## Matching kit

Start with [Writer Vault Starter](/kits/writer-vault-starter).

## Matching guide

If you do not have a Git workflow yet, read [How to sync Obsidian with GitHub](/guides/setup-obsidian-github-sync).

## Limits

- Git has a learning curve for complete beginners.
- Large image libraries and attachments should not be pushed into Git without a plan.
- If real-time collaboration is required, choose a different workflow.
- If you publish through multiple destinations, keep the Markdown vault as the source of truth and treat each platform as an output surface.
