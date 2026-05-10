# GitHub 工作流

## 仓库策略

早期建议一个主仓库：

```txt
offpedia/
  docs/
  src/content/
  src/pages/
  vaults/
```

后期可以拆分：

```txt
offpedia-site
offpedia-content
offpedia-kits
offpedia-writer-vault-starter
```

## 分支策略

- `main`：生产环境
- `dev`：预览环境
- `content/*`：内容更新
- `kit/*`：Kit 模板更新

## 内容更新流程

1. 在 Obsidian 打开 `src/content`。
2. 新建或编辑 Markdown。
3. 填写 frontmatter。
4. 运行：

```bash
npm run validate:content
npm run build
```

5. 提交 PR。
6. 合并到 main 自动部署。

## Commit 规范

```txt
content: add writer obsidian github stack
kit: update writer vault starter
fix: correct obsidian wiki metadata
site: improve stack card UI
docs: update p2 roadmap
```

## Issue 模板建议

### 新工具提议

```md
## 工具名称

## 官网 / GitHub

## 它是否离线可用？

## 它适合哪个 Stack？

## 为什么应该收录？
```

### Kit 问题反馈

```md
## Kit 名称

## 你遇到的问题

## 操作系统 / Obsidian 版本

## 复现步骤
```

## GitHub Actions

本仓库包含 `.github/workflows/deploy.yml`。

你可以把它接到 Cloudflare Pages 或 GitHub Pages。P2 推荐 Cloudflare Pages：

- Build command：`npm run build`
- Output directory：`dist`
- Node version：20+
