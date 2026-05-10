---
title: Frontmatter
description: Frontmatter 是 Markdown 文件顶部的结构化元数据区域，适合给 Wiki、Stack 和 Kit 建立数据层。
customSlug: concepts/frontmatter
kind: concept
category: metadata
status: p2
website: null
github: null
openSource: null
selfHosted: null
localFirst: true
offlineReady: true
dataFormats:
  - YAML
  - Markdown
platforms: []
relatedStacks:
  - writer-obsidian-github
  - personal-wiki-obsidian-quartz
relatedKits:
  - writer-vault-starter
tags:
  - frontmatter
  - metadata
  - markdown
updatedAt: 2026-05-09
---

## 定义

Frontmatter 是 Markdown 文件顶部由 `---` 包裹的一段 YAML 元数据。

## 为什么重要

Offpedia 要做的不是文章堆，而是数据型内容站。Frontmatter 可以让每篇内容被筛选、关联、索引和自动展示。

## 示例

```yaml
---
title: 写作者栈：Obsidian + GitHub
customSlug: writer-obsidian-github
offlineReady: true
localFirst: true
relatedKits:
  - writer-vault-starter
---
```
