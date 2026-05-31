# 快速开始

## 最短路径

在项目根目录运行：

```powershell
npm install
npm run assets:generate
npm run check
npm run dev
```

默认本地开发地址：

```text
http://127.0.0.1:4321/
```

如果 4321 被占用，Astro 会自动选择另一个端口，终端会显示实际地址。

## 更新简历或博客

直接改内容：

- 简历：`src/content/resume/`
- 博客：`src/content/blog/`
- 首页结构化信息：`src/data/profile.ts`

从 Word 导入：

```powershell
npm run import:docx
```

Word 文件放置位置：

- 简历：`imports/resume/resume.zh.docx`、`imports/resume/resume.en.docx`
- 博客：`imports/posts/2026-06-01-my-post.zh.docx`、`imports/posts/2026-06-01-my-post.en.docx`

## 发布

推送到 `main` 后，`.github/workflows/deploy.yml` 会执行：

```text
npm ci
npm run import:docx:optional
npm run build
actions/deploy-pages
```

目标发布地址：

```text
https://peterria.github.io/
```

## 停止本地服务

在运行 `npm run dev` 或 `npm run preview` 的终端按：

```text
Ctrl+C
```
