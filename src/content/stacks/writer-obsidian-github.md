---
title: 写作者栈：Obsidian + GitHub
description: 用 Obsidian 写作，用 GitHub 做版本管理、备份和发布准备。
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

## 这套栈解决什么问题

它解决的是写作者最常见的三个问题：

1. 内容散落在不同平台。
2. 写作平台不一定长期可靠。
3. 文章版本、草稿、参考资料难以管理。

这套栈把写作系统拆成两个核心角色：

- Obsidian：负责本地写作和知识组织。
- GitHub：负责版本历史、远程备份和发布准备。

## 适合谁

- 长期写文章的人
- 写 newsletter 的人
- 独立开发者
- 希望把草稿、资料、发布稿统一管理的人
- 想保留所有历史版本的人

## 不适合谁

- 不想接触 Git 的用户
- 需要多人实时协作编辑的团队
- 只想在手机上快速写短笔记的人

## 推荐目录结构

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

## 推荐 Frontmatter

```yaml
---
title: 文章标题
status: draft
type: essay
tags:
  - writing
created: 2026-05-09
updated: 2026-05-09
publishTarget: blog
---
```

## 最小使用流程

1. 在 `00 Inbox` 捕捉想法。
2. 把成熟想法移动到 `10 Drafts`。
3. 写作过程中把资料放到 `30 References`。
4. 完成后移动到 `20 Essays`。
5. 发布后复制或移动到 `40 Published`。
6. 每天或每次完成一个阶段后提交到 GitHub。

## GitHub 在这里负责什么

GitHub 不负责写作体验，它负责长期安全：

- 版本历史
- 云端备份
- 模板分发
- 发布流水线
- 公开展示

## 对应 Kit

推荐直接从 [Writer Vault Starter](/kits/writer-vault-starter) 开始。

## 对应 Guide

如果你还没有 Git 流程，先看：[如何用 GitHub 同步 Obsidian](/guides/setup-obsidian-github-sync)。

## 局限

- Git 对完全新手有学习成本。
- 大量图片和附件不适合直接塞进 Git 仓库。
- 如果需要多人实时协同，应该考虑其他方案。
