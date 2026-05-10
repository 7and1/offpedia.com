---
title: 如何设计 Frontmatter Schema
description: 给 Obsidian、Astro 和 Offpedia 内容建立可筛选、可关联的元数据字段。
customSlug: design-frontmatter-schema
status: p2
difficulty: beginner
timeRequired: 25min
relatedStack: writer-obsidian-github
relatedKits:
  - writer-vault-starter
relatedWiki:
  - concepts/frontmatter
  - concepts/markdown
tags:
  - guide
  - frontmatter
  - metadata
updatedAt: 2026-05-09
---

## 完成后你会得到什么

一套可以用于文章、Wiki、Stack 和 Kit 的元数据字段。

## 最小字段

```yaml
---
title: 标题
description: 摘要
status: draft
tags:
  - example
updatedAt: 2026-05-09
---
```

## 写作者字段

```yaml
---
type: essay
status: draft
publishTarget: blog
created: 2026-05-09
updated: 2026-05-09
---
```

## Offpedia 字段

```yaml
---
type: stack
offlineReady: true
localFirst: true
relatedKits:
  - writer-vault-starter
---
```

## 原则

字段越少越容易坚持。P2 先保证字段稳定，再逐渐扩展。
