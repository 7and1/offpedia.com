# Offpedia 编辑指南

## 写作语气

Offpedia 应该像一个有经验的技术编辑：

- 清楚
- 诚实
- 不夸张
- 不做广告腔
- 不为了 SEO 堆关键词
- 不假装所有工具都适合所有人

## 每篇文章必须有结论

不要只描述。

要明确告诉用户：

- 推荐谁用
- 不推荐谁用
- 最佳搭配是什么
- 下一步应该看哪页

## 工具词条写法

结构：

1. 一句话定义
2. 它在 local-first 生态里的位置
3. 数据如何保存
4. 离线能力如何
5. Git / 导出 / 迁移能力如何
6. 适合谁
7. 不适合谁
8. 推荐搭配
9. 相关 Stack / Kit / Guide

## Stack 页写法

Stack 页是 Offpedia 的主角，不要写成工具拼盘。

必须回答：

- 为什么这套组合成立？
- 解决什么问题？
- 每个工具负责什么？
- 新手怎么开始？
- 以后怎么升级？
- 有什么坑？

## Kit 页写法

Kit 页要像产品页。

必须有：

- 使用前提
- 截图或结构说明
- 下载 / fork CTA
- 安装步骤
- 更新日志
- 适合谁 / 不适合谁

## Guide 页写法

Guide 必须让用户完成一个动作。

不要写：

> GitHub 是一个代码托管平台……

要写：

> 完成这篇 Guide 后，你会得到一个已经推送到 GitHub 的 Obsidian Vault。

## 评分维度建议

P2 暂不做复杂评分，但可以显示标签。

- Offline-ready
- Local-first
- Git-native
- Publish-ready
- Beginner-friendly
- Template available
- Self-hostable
- Open-source

## 更新规则

每篇页面都要有：

```yaml
updatedAt: 2026-05-09
status: p2
```

状态建议：

- draft
- p2
- review
- published
- archived

## 禁止内容

- 盗版下载
- 破解教程
- 未授权镜像
- 虚假评测
- 纯 AI 生成未校验内容
- 广告伪装成评测
