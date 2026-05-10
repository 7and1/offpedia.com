---
title: "Writer Stack: Obsidian + GitHub"
description: Use Obsidian for writing and GitHub for version history, backup, and publishing preparation.
customSlug: writer-obsidian-github
status: p2
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
relatedWiki:
  - tools/obsidian
  - tools/github
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

- Long-form writers
- Newsletter authors
- Indie makers
- People who want drafts, references, and published work in one system
- People who want a durable version history

## Not ideal for

- Users who do not want to learn any Git workflow
- Teams that need real-time collaborative editing
- People who only write quick mobile notes

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

## Matching kit

Start with [Writer Vault Starter](/kits/writer-vault-starter).

## Matching guide

If you do not have a Git workflow yet, read [How to sync Obsidian with GitHub](/guides/setup-obsidian-github-sync).

## Limits

- Git has a learning curve for complete beginners.
- Large image libraries and attachments should not be pushed into Git without a plan.
- If real-time collaboration is required, choose a different workflow.
