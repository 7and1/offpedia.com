# 90 天执行路线图

## 阶段 0：准备日

目标：把项目从想法变成仓库。

- 注册 / 配置 GitHub 仓库
- 设置 Cloudflare Pages 或 Vercel
- 初始化 Astro 项目
- 创建 `src/content` 内容目录
- 把 `src/content` 当作 Obsidian Vault 打开

## 第 1–2 周：内容模型与基础页

目标：定规则，不急着追求数量。

交付物：

- 品牌定位文档
- 内容模型文档
- 5 个基础 Wiki 词条
- 首页初版
- Stacks / Wiki / Kits / Guides / Compare 路由

验收：

- `npm run build` 成功
- 站点可以部署
- 内容字段校验通过

## 第 3–4 周：第一条完整闭环

目标：跑通 Writer Stack。

交付物：

- Stack：写作者栈：Obsidian + GitHub
- Kit：Writer Vault Starter
- Guide：如何用 GitHub 同步 Obsidian
- Wiki：Obsidian / GitHub / Markdown / Frontmatter

验收：

- Stack 页能跳到 Kit
- Kit 页能下载或指向模板 repo
- Guide 能带用户跑通第一版流程

## 第 5–6 周：第二条栈

目标：跑通 Personal Wiki Stack。

交付物：

- Stack：个人 Wiki 栈：Obsidian + Quartz
- Kit：Personal Wiki Kit
- Guide：如何把 Obsidian Vault 发布成网站
- Wiki：Quartz / Git-based publishing

验收：

- 个人 Wiki Stack 有清晰发布路径
- Kit 具备示例目录结构

## 第 7–8 周：第三条栈 + 搜索

目标：初步形成站点规模。

交付物：

- Stack：研究者栈：Obsidian + Zotero
- Kit：Research Notes Kit
- Compare：Obsidian vs Logseq
- Compare：Quartz vs Docusaurus
- 搜索索引

验收：

- 搜索能找到 stack/wiki/kit/guide/compare
- 首页内容不再单薄

## 第 9–10 周：打磨体验

目标：让用户更容易“继续点”。

交付物：

- 相关内容组件
- CTA 组件
- Kit 下载区域
- 页面底部下一步导航
- SEO title / description 优化

验收：

- 每个 Stack 有至少 3 个相关点击入口
- 每个 Kit 有明确下载 CTA

## 第 11–12 周：验证与发布

目标：公开发布 P2。

交付物：

- 发布清单
- 邮件订阅入口
- GitHub issue 提交流程
- 内容贡献指南
- 公开路线图

验收：

- 站点可公开访问
- 至少 3 条完整工作流闭环
- 有第一批用户反馈入口

## 90 天后判断

如果出现以下信号，继续做：

- 用户收藏 Stack 页
- Kit 有下载或 fork
- 用户询问更多模板
- 搜索词集中在 “Obsidian + GitHub / 发布 / 模板 / local-first”
- 有工具开发者愿意被收录或赞助

如果没有以上信号，调整方向：

- 减少 Wiki，强化 Kit
- 减少工具范围，聚焦 Obsidian 发布工作流
- 从内容站转成模板产品站
