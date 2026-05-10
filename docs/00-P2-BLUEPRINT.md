# Offpedia P2 完整蓝图

## 1. 一句话定义

**Offpedia 是面向本地优先工作流的 Wiki + Stack + Vault Kit 平台。**

它围绕 Obsidian、GitHub、Quartz、Markdown、Zotero、Syncthing、BookStack、Immich、Vaultwarden 等工具，帮助用户从“知道某个工具”升级到“搭出一套能跑的工作流”。

## 2. 为什么不是普通工具站

普通工具站回答：

> 这个工具是什么？

Offpedia 回答：

> 我应该如何用这些工具搭一套稳定、可迁移、可离线、可发布、可复制的系统？

所以 Offpedia 的最小单元不是文章，而是对象：

- Tool / Concept Wiki
- Stack
- Kit
- Guide
- Compare

## 3. P2 产品边界

### P2 必做

- 结构化 Wiki 词条
- Stack 页面
- Kit 页面
- GitHub Template Repo / 下载包
- Guide 页面
- Compare 页面
- 站内搜索
- 关联关系：Stack ↔ Wiki ↔ Kit ↔ Guide
- 内容字段标准化

### P2 不做

- 用户账号系统
- 评论区
- 人人可编辑 Wiki
- 在线协作编辑器
- 大型社区
- 复杂会员付费墙
- AI 聊天入口
- 下载盗版软件或镜像软件

一句话：**P2 做可复制工作流平台，不做社交产品。**

## 4. 目标用户

### 第一优先级

- 写作者
- 研究者
- 独立开发者
- 知识管理爱好者
- 想把笔记发布成网站的人

### 第二优先级

- 自托管用户
- NAS 用户
- 小团队文档负责人
- 不想被云平台锁死的专业用户

### 暂不优先

- 纯小白用户
- 只想下载软件的人
- 只想看百科定义的人
- 企业大客户定制需求

## 5. 核心用户路径

```txt
搜索“Obsidian GitHub 写作工作流”
    ↓
进入 Stack：写作者栈：Obsidian + GitHub
    ↓
查看 Wiki：Obsidian / GitHub / Frontmatter / Local-first
    ↓
下载 Kit：Writer Vault Starter
    ↓
按 Guide 操作：如何把 Obsidian 同步到 GitHub
    ↓
Fork 模板仓库 / 下载 Vault
    ↓
开始写作并发布
```

## 6. 信息架构

```txt
/
├── stacks
│   ├── writer-obsidian-github
│   ├── personal-wiki-obsidian-quartz
│   └── researcher-obsidian-zotero
├── wiki
│   ├── tools
│   │   ├── obsidian
│   │   ├── github
│   │   └── quartz
│   └── concepts
│       ├── local-first
│       ├── markdown
│       └── frontmatter
├── kits
│   ├── writer-vault-starter
│   └── personal-wiki-kit
├── guides
│   ├── setup-obsidian-github-sync
│   ├── publish-obsidian-to-quartz
│   └── design-frontmatter-schema
└── compare
    ├── obsidian-vs-logseq
    └── quartz-vs-docusaurus
```

## 7. 首页蓝图

首页不是博客列表，而是“工作流索引页”。

### 首页模块

1. Hero
   - 标题：Build local-first workflows that still work when the cloud does not.
   - 副标题：Offpedia collects wiki entries, workflow stacks, and reusable vault kits for people who want durable, portable knowledge systems.
   - 搜索框
   - CTA：Explore Stacks / Browse Kits

2. Featured Stacks
   - 写作者栈：Obsidian + GitHub
   - 个人 Wiki 栈：Obsidian + Quartz
   - 研究者栈：Obsidian + Zotero

3. Popular Kits
   - Writer Vault Starter
   - Personal Wiki Kit
   - Research Notes Kit

4. Browse by Goal
   - 写作
   - 研究
   - 公开发布
   - 本地知识库
   - 团队文档

5. Core Concepts
   - Local-first
   - Markdown
   - Frontmatter
   - Git-based publishing

6. Latest Guides
   - 如何用 GitHub 同步 Obsidian
   - 如何把 Vault 发布成网站
   - 如何设计笔记模板

## 8. 页面模板

### Wiki 工具词条

固定模块：

- 一句话定义
- 为什么适合 Offpedia
- 核心特性
- 数据存储方式
- 是否本地优先
- 是否离线可用
- 是否支持 Git 工作流
- 适合谁 / 不适合谁
- 常见搭配工具
- 相关 Stacks
- 相关 Kits
- 相关文章 / Compare

### Wiki 概念词条

固定模块：

- 定义
- 为什么重要
- 和相近概念的区别
- 常见误解
- 在 Offpedia 中出现在哪些 Stacks
- 相关工具

### Stack 页

固定模块：

- 这套栈解决什么问题
- 适合谁
- 核心工具
- 可选增强工具
- 为什么这些工具搭在一起
- 推荐目录结构
- 推荐 Frontmatter 规范
- 同步方式
- 发布方式
- 使用难度
- 维护成本
- 局限与替代方案
- 对应 Kit 下载
- 对应 Guide
- 相关 Wiki 词条

### Kit 页

固定模块：

- Kit 简介
- 适用场景
- 下载按钮
- GitHub Template Repo
- 安装方式
- Obsidian 版本要求
- 插件依赖
- 文件夹结构
- 示例文档说明
- Frontmatter 规范
- 更新日志
- 对应 Stack
- 对应 Guide

### Guide 页

固定模块：

- 目标结果
- 前置条件
- 步骤
- 常见问题
- 验收标准
- 下一步
- 相关 Wiki / Stack / Kit

## 9. 数据字段标准

### Stack 字段

```yaml
title: 写作者栈：Obsidian + GitHub
description: 用本地 Markdown 写作，用 GitHub 做版本管理与发布准备。
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
relatedKits:
  - writer-vault-starter
relatedGuides:
  - setup-obsidian-github-sync
relatedWiki:
  - tools/obsidian
  - tools/github
  - concepts/markdown
```

### Kit 字段

```yaml
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
  - Git
folders:
  - 00 Inbox
  - 10 Drafts
  - 20 Essays
  - 30 References
  - 90 Templates
```

## 10. P2 成功指标

| 指标 | P2 目标值 | 说明 |
|---|---:|---|
| Stack → Kit 点击率 | 15%–25% | 用户不是只看热闹 |
| Kit 下载 / Template 使用率 | 8%+ | 站点开始有产品感 |
| Guide 完读率 | 35%+ | 教程真的有用 |
| 搜索零结果率 | <10% | 信息架构合格 |
| 返回访问率 | 20%+ | 用户会回来 |
| 每个 Stack 的相关点击数 | 3+ | 内链系统工作正常 |

## 11. P2 内容上线清单

### 第一批：必须上线

- Wiki：Obsidian
- Wiki：GitHub
- Wiki：Quartz
- Wiki：Markdown
- Wiki：Frontmatter
- Wiki：Local-first
- Stack：写作者栈：Obsidian + GitHub
- Stack：个人 Wiki 栈：Obsidian + Quartz
- Kit：Writer Vault Starter
- Guide：如何用 GitHub 同步 Obsidian
- Guide：如何把 Obsidian Vault 发布成网站
- Compare：Obsidian vs Logseq

### 第二批：增强内容

- Stack：研究者栈：Obsidian + Zotero
- Kit：Research Notes Kit
- Guide：如何设计 Frontmatter Schema
- Compare：Quartz vs Docusaurus
- Wiki：Git-based publishing

## 12. 90 天节奏

### 第 1–2 周：规则和骨架

- 定品牌句子
- 定数据字段
- 定页面模板
- 建立 Astro 站点
- 建立内容仓库
- 写 6 个 Wiki 基础词条

### 第 3–4 周：跑通第一条闭环

- 上线 Writer Stack
- 上线 Writer Vault Starter Kit
- 上线 GitHub 同步 Guide
- 首页开始从 Stack 和 Kit 组织内容

### 第 5–8 周：扩展到 3 条栈

- 个人 Wiki 栈
- 研究者栈
- 2 个对比页
- 3 个 Guide
- 站内搜索与筛选

### 第 9–12 周：验证价值

- 增加下载跟踪
- 增加邮件订阅
- 增加 GitHub issue 提交流程
- 建立内容贡献指南
- 做第一份付费或半付费 Kit 预告

## 13. 最重要的产品原则

1. **先 Stack，后 Wiki**：用户更关心怎么解决问题。
2. **每个 Stack 尽量配 Kit**：没有 Kit 就只是文章。
3. **每个 Kit 必须配 Guide**：没有 Guide 用户不会用。
4. **Wiki 是基础设施，不是首页主角**。
5. **不要做软件下载站**：只做评测、对比、教程、官方链接。
6. **不要一开始开放人人编辑**：先编辑策展，后社区补充。
7. **Obsidian 是内容生产工具，不是 Offpedia 的全部定位**。
