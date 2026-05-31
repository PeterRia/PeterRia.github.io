# 简历博客站点文档索引

项目路径：`C:\Users\41362\Documents\CodexWS26525`  
目标远端：`PeterRia/PeterRia.github.io`  
目标站点：`https://peterria.github.io/`  
文档生成日期：2026-06-01  
文档模式：`project-doc-packager` full package

## 当前状态摘要

- 已创建 Astro 静态站点，定位为“简历为主，博客为辅”。
- 已支持中文和英文内容结构：首页可切换语言，简历页有 `/resume/zh/` 和 `/resume/en/`。
- 已实现 Word 导入脚本：`scripts/import-docx.mjs`。
- 已配置 GitHub Pages 发布 workflow：`.github/workflows/deploy.yml`。
- 已生成本地主视觉资源：`public/assets/profile-visual.png`、`public/assets/og-cover.png`。
- 已执行 `npm run check`，导入、内容校验和构建通过；当时构建生成 7 个静态页面。
- 已启动本地开发服务并验证 `http://127.0.0.1:4321/` 返回 200。
- 已用浏览器检查移动宽度：无横向溢出，语言切换、主题切换、搜索弹层、搜索过滤、博客列表、简历页可用。
- 已安装 GitHub CLI：`C:\Program Files\GitHub CLI\gh.exe`，版本 `2.93.0`。
- GitHub CLI 已登录账号：`PeterRia`。
- GitHub 登录账号为 `PeterRia`，因此用户站点仓库应为 `PeterRia/PeterRia.github.io`。
- 已创建远端仓库：`https://github.com/PeterRia/PeterRia.github.io`。
- 已推送 `main`，本地分支跟踪 `origin/main`。
- GitHub Actions `Deploy GitHub Pages` 已成功完成。
- 线上首页验证：`https://peterria.github.io/` 返回 HTTP 200，标题为 `PeterRia | 个人简历与技术博客`。
- 线上中文简历验证：`https://peterria.github.io/resume/zh/` 返回 HTTP 200，包含 `PeterRia 简历`。

## 文档清单

- [01_QUICKSTART.md](01_QUICKSTART.md)：最短启动路径。
- [02_INSTALL_MANUAL.md](02_INSTALL_MANUAL.md)：从零安装、构建和部署说明。
- [03_USAGE_MANUAL.md](03_USAGE_MANUAL.md)：简历、博客、Word 导入和内容维护方法。
- [04_RUNBOOK.md](04_RUNBOOK.md)：日常运行、更新、备份、回滚和发布检查。
- [05_TROUBLESHOOTING.md](05_TROUBLESHOOTING.md)：已知问题和诊断命令。
- [06_ENV_REFERENCE.md](06_ENV_REFERENCE.md)：环境、依赖、端口和配置说明。
- [07_BUILD_PROCESS_LOG.md](07_BUILD_PROCESS_LOG.md)：本次制作全过程记录。

## 命令速查

```powershell
npm install
npm run assets:generate
npm run import:docx:optional
npm run dev
npm run check
npm run build
npm run preview
```

## 主要路径

- 页面源码：`src/pages/`
- 组件：`src/components/`
- 样式：`src/styles/global.css`
- 交互脚本：`src/scripts/site.js`
- 个人资料数据：`src/data/profile.ts`
- 博客内容：`src/content/blog/`
- 简历内容：`src/content/resume/`
- Word 简历输入：`imports/resume/`
- Word 博客输入：`imports/posts/`
- Word 导入脚本：`scripts/import-docx.mjs`
- 内容校验脚本：`scripts/validate-content.mjs`
- 资源生成脚本：`scripts/generate-assets.mjs`
- GitHub Pages workflow：`.github/workflows/deploy.yml`
