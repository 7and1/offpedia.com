# 内容模型与 Frontmatter 规范

## 总原则

Offpedia 的内容必须做到：

- 可读：普通用户能看懂。
- 可筛选：字段统一。
- 可关联：内容之间能互相指向。
- 可复用：Kit 可以下载或 fork。
- 可维护：编辑者知道怎么更新。

## Wiki Collection

### 工具词条示例

```yaml
---
title: Obsidian
description: 本地优先的 Markdown 知识库工具。
slug: tools/obsidian
kind: tool
category: knowledge-base
status: p2
website: https://obsidian.md
github: null
openSource: false
selfHosted: false
localFirst: true
offlineReady: true
dataFormats:
  - Markdown
  - Folder
platforms:
  - macOS
  - Windows
  - Linux
  - iOS
  - Android
relatedStacks:
  - writer-obsidian-github
relatedKits:
  - writer-vault-starter
tags:
  - obsidian
  - markdown
  - local-first
updatedAt: 2026-05-09
---
```

### 概念词条示例

```yaml
---
title: Local-first
description: 一种优先把数据保存在用户本地、网络用于同步而非依赖的应用理念。
slug: concepts/local-first
kind: concept
category: principle
status: p2
relatedStacks:
  - writer-obsidian-github
relatedKits: []
tags:
  - local-first
  - offline
updatedAt: 2026-05-09
---
```

## Stacks Collection

```yaml
---
title: 写作者栈：Obsidian + GitHub
description: 用 Obsidian 写作，用 GitHub 做版本管理和发布准备。
slug: writer-obsidian-github
status: p2
goal: writing
personas:
  - writer
  - indie-maker
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
```

## Kits Collection

```yaml
---
title: Writer Vault Starter
description: 面向写作者的 Obsidian Vault 模板。
slug: writer-vault-starter
status: p2
stack: writer-obsidian-github
templateRepo: https://github.com/offpedia/writer-vault-starter
downloadUrl: /downloads/writer-vault-starter.zip
obsidianVersion: 1.x
plugins:
  - Dataview
  - Templater
  - Obsidian Git
folders:
  - 00 Inbox
  - 10 Drafts
  - 20 Essays
  - 30 References
  - 90 Templates
relatedGuides:
  - setup-obsidian-github-sync
tags:
  - vault
  - writer
  - obsidian
updatedAt: 2026-05-09
---
```

## Guides Collection

```yaml
---
title: 如何用 GitHub 同步 Obsidian
description: 从初始化 Git 仓库到推送 Markdown 笔记的完整流程。
slug: setup-obsidian-github-sync
status: p2
difficulty: beginner
timeRequired: 30min
relatedStack: writer-obsidian-github
relatedKits:
  - writer-vault-starter
relatedWiki:
  - tools/obsidian
  - tools/github
  - concepts/git-based-publishing
tags:
  - guide
  - obsidian
  - github
updatedAt: 2026-05-09
---
```

## Compare Collection

```yaml
---
title: Obsidian vs Logseq
description: 从数据格式、本地优先、写作体验和发布路径比较 Obsidian 与 Logseq。
slug: obsidian-vs-logseq
status: p2
tools:
  - obsidian
  - logseq
winnerByUseCase:
  writing: obsidian
  outlining: logseq
  publishing: obsidian
tags:
  - compare
  - obsidian
  - logseq
updatedAt: 2026-05-09
---
```

## 字段命名规则

- 布尔字段用 `true/false`，不要用 `yes/no`。
- slug 使用小写英文和连字符。
- 工具 ID 使用小写英文。
- 日期使用 `YYYY-MM-DD`。
- tags 不超过 8 个。
- description 控制在 80–160 字符之间。

## 编辑规则

每篇内容都必须回答：

1. 用户为什么要看这页？
2. 看完后能做什么？
3. 下一步应该点哪里？
4. 是否关联了至少 1 个相关对象？
