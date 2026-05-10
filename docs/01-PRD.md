# Offpedia P2 PRD

## 产品名称

Offpedia

## 产品口号

**Build local-first workflows that remain useful offline, portable forever, and understandable by humans.**

中文版本：

**发现、理解并复制那些不依赖云端也能工作的知识工作流。**

## 产品定位

Offpedia 是一个本地优先工作流百科站，提供结构化 Wiki、工作流 Stack、可下载 Kit 和上手 Guide。

## 用户问题

用户不是缺工具，而是缺一套能跑的系统。

典型问题：

- 我应该如何用 Obsidian + GitHub 做写作系统？
- 我的笔记如何既本地保存，又能同步和发布？
- 我应该选 Obsidian、Logseq 还是 Anytype？
- 我能不能直接下载一个已经设计好的 Vault？
- 我不想被 Notion / Google Docs 锁死，有什么替代方案？

## 用户价值

用户来到 Offpedia 后，应该能完成四件事：

1. 看懂一个工具 / 概念。
2. 选择一套适合自己的工作流。
3. 下载模板，直接开始用。
4. 通过 Guide 跑通完整路径。

## P2 核心功能

### 1. 首页工作流索引

首页聚焦 Stacks 和 Kits，而不是最新文章。

### 2. Wiki 词条系统

支持工具词条和概念词条。

### 3. Stack 工作流系统

每个 Stack 是一个完整方案。

### 4. Kit 模板系统

每个 Kit 是一个可下载 / 可 fork 的项目。

### 5. Guide 操作指南

每个 Guide 帮用户完成一个结果。

### 6. Compare 对比页面

帮助用户做选择，同时承接搜索流量。

### 7. 站内搜索

P2 先用静态 JSON 搜索；后续可以迁移到 Pagefind。

## 非目标

- 不做社区论坛。
- 不做 SaaS 在线编辑器。
- 不做破解软件下载站。
- 不做泛百科。
- 不做纯个人笔记公开站。

## MVP 验收标准

P2 可上线版本必须具备：

- 首页可用。
- 至少 3 个 Stack。
- 至少 8 个 Wiki 词条。
- 至少 2 个 Kit。
- 至少 3 个 Guide。
- 至少 2 个 Compare。
- 每个 Stack 至少关联 1 个 Kit 和 1 个 Guide。
- 搜索可用。
- 移动端可读。
- GitHub 部署流程可跑通。

## 风险

### 风险 1：变成散乱笔记

解决：强制使用页面模板和 frontmatter 字段。

### 风险 2：过度依赖 Obsidian 圈层

解决：P2 从 Obsidian 切入，但定义为 local-first workflow，不是 Obsidian fan site。

### 风险 3：内容太泛

解决：前 90 天只做知识工作流，不扩展到所有软件。

### 风险 4：Kit 无人下载

解决：把 Kit CTA 放在 Stack 页顶部和底部，追踪点击率。

## 商业化方向

P2 只做验证，不急着重商业化。

可以轻量测试：

- 邮件订阅
- 高级 Kit 预告
- 赞助位
- 工具官方合作
- 付费工作流包
- 企业知识库方案咨询
