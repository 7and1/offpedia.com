---
title: Git-based publishing
description: Git-based publishing 是用 Git 仓库管理内容，并通过自动化部署发布网站的工作流。
customSlug: concepts/git-based-publishing
kind: concept
category: publishing
status: p2
website: null
github: null
openSource: null
selfHosted: true
localFirst: true
offlineReady: true
dataFormats:
  - Git
  - Markdown
platforms: []
relatedStacks:
  - writer-obsidian-github
  - personal-wiki-obsidian-quartz
relatedKits:
  - writer-vault-starter
  - personal-wiki-kit
tags:
  - git
  - publishing
  - github
updatedAt: 2026-05-09
---

## 定义

Git-based publishing 是一种内容发布方式：把内容放在 Git 仓库中，提交后触发构建，自动发布到网站。

## 为什么适合 Offpedia

它让内容具备：

- 历史版本
- 可回滚
- 可协作
- 可审查
- 可自动部署

## 典型组合

```txt
Obsidian → Markdown → GitHub → Astro/Quartz → Cloudflare Pages
```
