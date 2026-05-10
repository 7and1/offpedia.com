# Offpedia P2 Starter

Offpedia 是一个围绕 **本地优先 / 离线可用 / 自托管 / Git-based publishing** 的工作流百科站。

它不是普通工具导航站，而是一个由三层组成的产品：

1. **Wiki**：解释工具、概念、数据格式、工作流术语。
2. **Stacks**：把多个工具组合成可复制的工作流方案。
3. **Kits**：提供可下载 / 可 fork / 可直接使用的 Obsidian Vault 或 GitHub Template Repo。

本仓库包含：

- 完整 P2 产品蓝图与执行文档
- Astro 内容站代码骨架
- Wiki / Stack / Kit / Guide / Compare 示例内容
- Writer Vault Starter Kit 示例
- GitHub Actions 部署模板
- 本地搜索索引生成脚本
- 简易 PWA 缓存逻辑

## 快速开始

```bash
npm install
npm run dev
```

打开：

```bash
http://localhost:4321
```

构建：

```bash
npm run build
npm run preview
```

## 推荐部署

- GitHub 仓库管理内容
- Cloudflare Pages / Vercel 部署前台
- Obsidian 打开 `src/content` 作为内容 Vault
- 每个 Kit 放在 `vaults/` 或独立 Template Repo

## 目录结构

```txt
.
├── docs/                         # 完整产品文档
├── src/
│   ├── content/                  # Offpedia 内容库，可用 Obsidian 打开
│   ├── components/               # Astro 组件
│   ├── layouts/                  # 页面布局
│   ├── pages/                    # 路由页面
│   └── styles/                   # 全局样式
├── vaults/                       # 可下载 Obsidian Starter Kits
├── scripts/                      # 内容校验和搜索索引脚本
├── public/                       # 静态资源、manifest、service worker
└── .github/workflows/            # 部署 CI
```

## 内容类型

- `wiki`：工具词条 / 概念词条
- `stacks`：工作流组合页
- `kits`：模板项目页
- `guides`：操作指南页
- `compare`：对比页

## P2 核心目标

P2 的目标不是做社区，也不是做 SaaS，而是先做出一个可以被搜索、浏览、下载、复用的 **可复制工作流平台**。

最小闭环：

```txt
用户搜索问题 → 进入 Stack → 理解方案 → 下载 Kit → 按 Guide 跑通 → 回到 Wiki 深挖概念
```

## 许可证建议

- 网站代码：MIT
- 原创内容：CC BY 4.0 或 CC BY-SA 4.0
- Kit 模板：MIT / CC BY 4.0 双许可

正式上线前请把 `LICENSE` 和 `docs/08-LEGAL-CONTENT-POLICY.md` 按你的商业计划确认。
