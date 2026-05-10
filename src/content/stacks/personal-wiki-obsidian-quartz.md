---
title: 个人 Wiki 栈：Obsidian + Quartz
shortTitle: 个人 Wiki 栈
description: 用 Obsidian 管理 Markdown 知识库，用 Quartz 发布成公开网站。
customSlug: personal-wiki-obsidian-quartz
status: p2
goal: personal-wiki
personas:
  - researcher
  - writer
  - developer
coreTools:
  - obsidian
  - quartz
  - github
optionalTools:
  - cloudflare-pages
  - pagefind
offlineReady: true
localFirst: true
gitNative: true
publishReady: true
difficulty: intermediate
setupTime: 60min
maintenance: medium
relatedWiki:
  - tools/obsidian
  - tools/quartz
  - tools/github
  - concepts/markdown
  - concepts/git-based-publishing
relatedKits:
  - personal-wiki-kit
relatedGuides:
  - publish-obsidian-to-quartz
tags:
  - wiki
  - obsidian
  - quartz
  - publishing
updatedAt: 2026-05-09
---

## 这套栈解决什么问题

它把个人知识库从“只在本地看”升级成“可公开浏览的网站”。

## 核心分工

- Obsidian：写作和本地编辑。
- GitHub：版本管理和部署触发。
- Quartz：生成双链风格的静态网站。
- Cloudflare Pages：部署和托管。

## 适合谁

- 想公开部分笔记的人
- 写技术文档的人
- 做个人知识库的人
- 课程、研究、产品日志维护者

## 推荐目录结构

```txt
Personal Wiki/
├── index.md
├── concepts/
├── tools/
├── projects/
├── logs/
├── references/
└── assets/
```

## 注意事项

公开 Wiki 不是把所有私人笔记扔上网。建议区分：

- 私人 Vault
- 公共 Vault
- 待发布区

## 对应 Kit

查看 [Personal Wiki Kit](/kits/personal-wiki-kit)。
