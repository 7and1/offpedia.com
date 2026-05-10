---
title: 研究者栈：Obsidian + Zotero
shortTitle: 研究者栈
description: 用 Zotero 管理文献，用 Obsidian 形成可写作的研究笔记系统。
customSlug: researcher-obsidian-zotero
status: p2
goal: research
personas:
  - researcher
  - student
  - analyst
coreTools:
  - obsidian
  - zotero
optionalTools:
  - better-bibtex
  - pandoc
offlineReady: true
localFirst: true
gitNative: false
publishReady: false
difficulty: intermediate
setupTime: 60min
maintenance: medium
relatedWiki:
  - tools/obsidian
  - tools/zotero
  - concepts/markdown
relatedKits: []
relatedGuides:
  - design-frontmatter-schema
tags:
  - research
  - obsidian
  - zotero
updatedAt: 2026-05-09
---

## 这套栈解决什么问题

研究者常见的问题不是没有资料，而是资料、摘要、引用和写作之间断开。

这套栈把工作拆成：

- Zotero：资料和引用管理。
- Obsidian：研究问题、文献笔记、想法连接和写作。

## 推荐目录结构

```txt
Research Vault/
├── 00 Inbox/
├── 10 Literature Notes/
├── 20 Concepts/
├── 30 Projects/
├── 40 Drafts/
└── 90 Templates/
```

## 推荐笔记类型

- Literature note
- Concept note
- Question note
- Project note
- Draft note

## 下一步

P2 先不提供完整 Research Kit，但会保留这个 Stack，为后续扩展做准备。
