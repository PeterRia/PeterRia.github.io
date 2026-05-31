# 使用与维护手册

## 站点结构

首页：

```text
/
```

简历：

```text
/resume/zh/
/resume/en/
```

博客：

```text
/blog/
/blog/<post-slug>/
```

## 修改首页信息

编辑：

```text
src/data/profile.ts
```

这里维护：

- 姓名
- 定位文案
- 邮箱
- GitHub 地址
- 首页指标
- 重点能力
- 时间线经历
- 技能矩阵
- 导航文案

## 修改简历内容

手工维护：

```text
src/content/resume/base-zh.mdx
src/content/resume/base-en.mdx
```

Word 导入后会生成：

```text
src/content/resume/generated-zh.mdx
src/content/resume/generated-en.mdx
```

简历页面优先展示 `generated-*`，没有生成文件时展示 `base-*`。

## 修改博客内容

博客文章放在：

```text
src/content/blog/
```

文件名建议：

```text
2026-06-01-post-slug-zh.mdx
2026-06-01-post-slug-en.mdx
```

frontmatter 示例：

```yaml
---
title: "文章标题"
description: "文章摘要"
pubDate: 2026-06-01
lang: zh
tags: ["resume", "automation"]
featured: true
---
```

## Word 导入规则

简历 Word：

```text
imports/resume/resume.zh.docx
imports/resume/resume.en.docx
```

博客 Word：

```text
imports/posts/2026-06-01-my-title.zh.docx
imports/posts/2026-06-01-my-title.en.docx
```

语言识别：

- 文件名包含 `.en.`、`-en.` 或 `en` 段时识别为英文。
- 其他默认识别为中文。

标题识别：

- 优先使用 Word 中第一个一级标题。
- 如果没有一级标题，使用文件名推断标题。

图片处理：

- Word 内嵌图片会写入 `public/generated-assets/`。
- 生成的 MDX 会引用这些图片路径。

导入命令：

```powershell
npm run import:docx
```

无 Word 文件也不失败的命令：

```powershell
npm run import:docx:optional
```

## 内容校验

运行：

```powershell
npm run validate:content
```

校验范围：

- 博客 frontmatter 必须有 `title`、`description`、`pubDate`、`lang`、`tags`。
- 简历 frontmatter 必须有 `title`、`lang`、`updated`。
- `lang` 只能是 `zh` 或 `en`。
- 内容正文不能为空。

## 视觉资源

主视觉资源由脚本生成：

```powershell
npm run assets:generate
```

输出：

```text
public/assets/profile-visual.png
public/assets/og-cover.png
```

如果后续换成真实照片或品牌图，保持文件名不变即可。

