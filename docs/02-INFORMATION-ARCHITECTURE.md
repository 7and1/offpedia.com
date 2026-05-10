# 信息架构与 URL 规划

## 顶层导航

```txt
Stacks | Wiki | Kits | Guides | Compare
```

## URL 规则

### Stack

```txt
/stacks/writer-obsidian-github
/stacks/personal-wiki-obsidian-quartz
/stacks/researcher-obsidian-zotero
```

### Wiki

```txt
/wiki/tools/obsidian
/wiki/tools/github
/wiki/tools/quartz
/wiki/concepts/local-first
/wiki/concepts/markdown
/wiki/concepts/frontmatter
```

### Kit

```txt
/kits/writer-vault-starter
/kits/personal-wiki-kit
/kits/research-notes-kit
```

### Guide

```txt
/guides/setup-obsidian-github-sync
/guides/publish-obsidian-to-quartz
/guides/design-frontmatter-schema
```

### Compare

```txt
/compare/obsidian-vs-logseq
/compare/quartz-vs-docusaurus
```

## 页面之间的关系

```txt
Wiki Tool: Obsidian
  ↳ Related Stack: Writer Stack
  ↳ Related Stack: Personal Wiki Stack
  ↳ Related Kit: Writer Vault Starter

Stack: Writer Obsidian GitHub
  ↳ Core Tools: Obsidian, GitHub
  ↳ Concepts: Markdown, Frontmatter, Git-based Publishing
  ↳ Kit: Writer Vault Starter
  ↳ Guide: Setup Obsidian GitHub Sync

Kit: Writer Vault Starter
  ↳ Stack: Writer Obsidian GitHub
  ↳ Guide: Setup Obsidian GitHub Sync
```

## 首页布局细节

### Hero

- H1：Local-first workflow encyclopedia.
- Subtitle：Wiki entries, reusable stacks, and downloadable vault kits for durable knowledge work.
- Search
- CTA 1：Explore Stacks
- CTA 2：Browse Kits

### Cards

卡片不是展示“文章”，而是展示“对象”。

每张 Stack 卡片展示：

- 名称
- 一句话说明
- Offline-ready / Local-first / Git-native / Template available
- Difficulty
- Setup time

每张 Kit 卡片展示：

- 名称
- 对应 Stack
- 下载 / GitHub Template
- 插件需求

## 面包屑

每个内页建议增加：

```txt
Home / Stacks / Writer Obsidian GitHub
```

P2 代码中先不实现复杂面包屑，后续可以加。

## 搜索规则

P2 搜索索引包含：

- title
- description
- slug
- collection
- tags
- body 前 500 字

搜索结果显示：

- 类型
- 标题
- 描述
- 标签
- 链接

## 筛选规则

P2 可先做静态分类，不做复杂筛选。

后续筛选项：

- offlineReady
- localFirst
- openSource
- selfHosted
- difficulty
- goal
- platform
- dataFormat
