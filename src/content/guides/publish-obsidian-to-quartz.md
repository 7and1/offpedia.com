---
title: 如何把 Obsidian Vault 发布成网站
description: 使用 GitHub 和 Quartz，把 Obsidian Markdown 知识库发布成公开 Wiki。
customSlug: publish-obsidian-to-quartz
status: p2
difficulty: intermediate
timeRequired: 60min
relatedStack: personal-wiki-obsidian-quartz
relatedKits:
  - personal-wiki-kit
relatedWiki:
  - tools/obsidian
  - tools/quartz
  - tools/github
  - concepts/git-based-publishing
tags:
  - guide
  - quartz
  - obsidian
updatedAt: 2026-05-09
---

## 完成后你会得到什么

一个可以公开访问的个人 Wiki 网站。

## 基本路径

```txt
Obsidian Vault → GitHub Repo → Quartz Build → Cloudflare Pages
```

## 步骤概览

1. 准备一个公共 Vault。
2. 把 Vault 推送到 GitHub。
3. 初始化 Quartz 项目。
4. 把 Markdown 内容接入 Quartz。
5. 部署到 Cloudflare Pages 或 Vercel。

## 公开前检查

- 是否包含私人笔记？
- 是否包含未授权图片？
- 首页是否清楚？
- 每篇笔记是否有标题和摘要？

## 下一步

如果你还没有公共 Vault，先使用 [Personal Wiki Kit](/kits/personal-wiki-kit)。
