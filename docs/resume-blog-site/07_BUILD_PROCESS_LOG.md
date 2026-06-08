# 制作过程记录

## 需求确认

用户确认：

1. 简历为主，博客为辅。
2. 由 Codex 新建并初始化项目。
3. 使用 `username.github.io` 形式的 GitHub Pages 用户站点。
4. 简历和博客都要支持 Word 图文导入。
5. 需要中英双语。
6. 全过程使用 `project-doc-packager` 详细记录。

本机 Git 用户名为 `RiaPeter`，但 GitHub 登录账号为 `PeterRia`。为满足 `username.github.io` 用户站点规则，最终目标按 `PeterRia.github.io` 和 `https://peterria.github.io/` 处理。

## 技术选择

选择 Astro，而不是直接复刻 Huxpro 的旧 Jekyll 技术栈。

原因：

- Astro 更适合现代静态站点和内容集合。
- 可以自然支持 MDX、静态构建、GitHub Pages。
- Word 导入脚本可以直接写入 `src/content/`，维护路径短。
- 不需要后端服务，托管和迁移成本低。

## 已创建的核心文件

- `package.json`：项目依赖和脚本。
- `astro.config.mjs`：Astro 站点配置。
- `.github/workflows/deploy.yml`：GitHub Pages 自动发布。
- `src/data/profile.ts`：双语首页和简历结构化信息。
- `src/content/config.ts`：博客和简历内容 schema。
- `src/pages/index.astro`：首页。
- `src/pages/blog/index.astro`：博客列表。
- `src/pages/blog/[...slug].astro`：文章详情。
- `src/pages/resume/[lang].astro`：中英文简历。
- `src/styles/global.css`：整体视觉系统、响应式、暗色模式、打印样式。
- `src/scripts/site.js`：语言切换、主题切换、搜索弹层、滚动进度、内容筛选。
- `scripts/import-docx.mjs`：Word 转 MDX 和图片提取。
- `scripts/validate-content.mjs`：内容 frontmatter 校验。
- `scripts/generate-assets.mjs`：生成本地视觉资产。

## 已执行的关键命令

安装依赖：

```powershell
npm install --no-audit --no-fund --loglevel=warn
```

首次安装结果：新增 446 个包，耗时约 6 分钟。随后将弃用的 `lucide-astro` 切换到 `@lucide/astro`，再次安装新增 1 个包、移除 1 个包。

生成视觉资源：

```powershell
npm run assets:generate
```

输出：

```text
public/assets/profile-visual.png
public/assets/og-cover.png
```

完整检查：

```powershell
npm run check
```

检查内容：

- `npm run import:docx:optional`
- `npm run validate:content`
- `astro check`
- `astro build`

实测结果：

- 没有 Word 文件时，`import:docx:optional` 输出提示并继续。
- `validate:content` 校验 4 个内容文件。
- `astro build` 输出 7 个静态页面。
- `dist/` 中生成首页、博客页、两篇示例文章、中文简历、英文简历和 404。

本地预览：

```powershell
npm run dev -- --port 4321
```

实测结果：

- `http://127.0.0.1:4321/` 返回 HTTP 200。
- 浏览器移动宽度检查：`window.innerWidth = 628`，`documentElement.scrollWidth <= innerWidth`，没有横向溢出。
- 首页语言切换后 `html[data-lang]` 从 `zh` 变为 `en`，标题显示英文定位。
- 搜索弹层可打开，输入 `blog` 后只保留 Blog 结果。
- 博客页识别 2 篇文章和 4 个筛选按钮。
- 中文简历页可打开，标题为 `PeterRia 简历`，正文有 3 个二级标题。
- 页面控制台无站点错误。
- 首次远端 Actions 部署成功：build job 和 deploy job 均通过。
- GitHub Actions 提示 Node.js 20 action runtime 将在 2026-06-16 默认切到 Node 24，因此 workflow 已加入 `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: "true"` 主动适配。

## 遇到并修复的问题

问题：MDX 构建失败，报 `Unexpected character / before local name`。  
原因：简历 MDX 中使用了裸链接 `<https://github.com/PeterRia>`，MDX 将它解析为 JSX。  
修复：改为标准 Markdown 链接 `[https://github.com/PeterRia](https://github.com/PeterRia)`。

问题：`lucide-astro` 依赖提示弃用。  
原因：官方包迁移到 `@lucide/astro`。  
修复：替换依赖和 import。

问题：博客文件名 `*.zh.mdx` 生成 URL 时语言后缀被压到 slug 末尾。  
原因：Astro slug 处理点号后缀时不适合作为语言分隔。  
修复：文件命名改为 `*-zh.mdx`、`*-en.mdx`，导入脚本输出也同步改为该格式。

问题：`.docx` 如果被 `.gitignore` 忽略，GitHub Actions 无法自动导入。  
修复：允许 `imports/` 下 `.docx` 被提交，只忽略临时文件。

## 后续维护事项

- 已安装 GitHub CLI：`C:\Program Files\GitHub CLI\gh.exe`，版本 `2.93.0`。
- `gh auth status` 显示已登录 `github.com` 账号 `PeterRia`。
- GitHub 登录账号为 `PeterRia`，目标仓库改为 `PeterRia/PeterRia.github.io`。
- 已创建远端仓库：`https://github.com/PeterRia/PeterRia.github.io`。
- 已推送 `main`，本地分支跟踪 `origin/main`。
- 首次远端提交：`7d90c59 Initial resume blog site`。
- 后续兼容性提交：`bcbd3cb Opt into Node 24 actions runtime`。
- 第二次 Actions 部署成功：build job 和 deploy job 均通过。
- 发现 GitHub Pages 同时保留 legacy 分支构建，会触发额外的 `pages-build-deployment` 动态运行；随后通过 GitHub Pages API 将 `build_type` 更新为 `workflow`。
- Pages API 最终状态：`status: built`、`build_type: workflow`、`https_enforced: true`。
- 线上首页验证：`https://peterria.github.io/` 返回 HTTP 200，标题为 `PeterRia | 个人简历与技术博客`。
- 线上中文简历验证：`https://peterria.github.io/resume/zh/` 返回 HTTP 200，页面包含 `PeterRia 简历`。
- 当前内容是可发布模板和自动化系统，真实履历需要用户提供 Word 或直接编辑 `src/data/profile.ts`、`src/content/resume/`。

## 2026-06-08 Open Design 视觉改造追加记录

用户要求使用本机 Open Design 路径下图中标识的“Open Design 落地页”插件，一比一复刻 Atelier Zero / editorial collage 视觉语言，并明确禁用 `ui-ux-pro-max`。

已定位官方示例目录：

```text
E:\00000AAAAA\000AAACodexW\Stock\Open Design\resources\open-design\plugins\_official\examples\open-design-landing
```

已读取：

- `SKILL.md`
- `open-design.json`
- `example.html`
- `assets/image-manifest.json`
- `assets/imagegen-prompts.md`

已复制 16 张 Open Design 拼贴图和 manifest 到：

```text
public/assets/open-design/
```

已修改：

- `src/pages/index.astro`
- `src/components/Header.astro`
- `src/layouts/BaseLayout.astro`
- `src/styles/global.css`
- `src/scripts/site.js`

主要效果：

- 首页变为 Open Design 风格单页 editorial landing。
- 全站采用 warm paper、coral、hairline、Playfair italic emphasis、Inter Tight、side rail、sticky nav。
- 简历仍为主叙事，博客为辅助 archive。
- 保留 Word 导入、MDX 内容、GitHub Actions 发布流程。

验证：

```powershell
npm run check
```

结果：

- `import:docx:optional`：无 Word 文件并正常继续。
- `validate:content`：校验 4 个内容文件。
- `astro check`：0 errors、0 warnings、0 hints。
- `astro build`：生成 7 个静态页面。

本地浏览器验证：

- `/` 首页：16 个 Open Design 图片 slot 全部加载成功。
- `/`、`/resume/zh/`、`/blog/` 在 1280、880、560 三个宽度下无横向溢出。
- topbar 和 sticky nav 存在。
- 搜索菜单可打开。
- 语言切换可在 `zh` 与 `en` 之间切换，最终恢复 `zh`。

更完整记录见：

```text
docs/resume-blog-site/08_OPEN_DESIGN_RESTYLE.md
```
