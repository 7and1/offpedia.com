---
title: 如何用 GitHub 同步 Obsidian
description: 从初始化 Git 仓库到推送 Markdown 笔记的完整流程，适合 Writer Vault Starter 用户。
customSlug: setup-obsidian-github-sync
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

## 完成后你会得到什么

一个可以推送到 GitHub 的 Obsidian Vault。

## 前置条件

- 已安装 Obsidian。
- 有 GitHub 账号。
- 本机已安装 Git。

## 步骤 1：创建本地 Vault

下载 Writer Vault Starter，或新建一个空文件夹作为 Vault。

## 步骤 2：初始化 Git

在 Vault 文件夹中执行：

```bash
git init
git add .
git commit -m "init writer vault"
```

## 步骤 3：创建 GitHub 仓库

在 GitHub 创建一个新仓库，例如：

```txt
writer-vault
```

## 步骤 4：连接远程仓库

```bash
git remote add origin git@github.com:YOUR_NAME/writer-vault.git
git branch -M main
git push -u origin main
```

## 步骤 5：日常使用

每次完成一轮写作后：

```bash
git add .
git commit -m "update drafts"
git push
```

## 常见问题

### 图片太多怎么办？

图片和附件不要无限制塞进 Git。建议压缩图片，或把大附件放到单独存储。

### 我不懂命令行怎么办？

可以使用 GitHub Desktop，或者后续配置 Obsidian Git 插件。

## 验收标准

你能在 GitHub 仓库里看到 `.md` 文件，就说明最小同步流程已经跑通。
