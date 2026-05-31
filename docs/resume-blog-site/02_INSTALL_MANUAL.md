# 安装与部署手册

## 项目身份

这是一个 Astro 静态站点项目，仓库名按 GitHub Pages 用户站点约定设计为：

```text
PeterRia.github.io
```

站点目标是简历优先、博客辅助，并支持后续从 Word 图文文档导入内容。

## 本机状态

已确认：

- Node.js：`v22.18.0`
- npm：`10.9.3`
- uv：`0.11.6`
- Git 用户名：`RiaPeter`
- GitHub 登录账号：`PeterRia`
- Git 邮箱：`413628805@qq.com`
- `gh`：已安装到 `C:\Program Files\GitHub CLI\gh.exe`，版本 `2.93.0`
- `gh auth status`：已登录 `github.com` 账号 `PeterRia`
- 当前分支：`master`
- 当前 remote：`origin https://github.com/PeterRia/PeterRia.github.io.git`
- 当前项目无历史 commit

## 从零部署步骤

安装依赖：

```powershell
npm install
```

生成主视觉资源：

```powershell
npm run assets:generate
```

运行完整校验：

```powershell
npm run check
```

本地开发：

```powershell
npm run dev
```

生产构建：

```powershell
npm run build
```

构建产物目录：

```text
dist/
```

## GitHub Pages 配置

workflow 文件：

```text
.github/workflows/deploy.yml
```

触发条件：

- push 到 `main`
- 手动 `workflow_dispatch`

权限：

- `contents: read`
- `pages: write`
- `id-token: write`

部署动作：

- `actions/upload-pages-artifact@v3`
- `actions/deploy-pages@v4`

GitHub 仓库设置中 Pages Source 应选择 GitHub Actions。如果第一次运行失败，先检查仓库 Settings → Pages 是否允许 Actions 部署。

## Git 远端初始化建议

当前远端已经创建并推送成功：

```text
https://github.com/PeterRia/PeterRia.github.io
```

如果在另一台机器复现，远端创建有两种路径。

路径 A：登录 GitHub CLI 后创建。

```powershell
& 'C:\Program Files\GitHub CLI\gh.exe' auth login
& 'C:\Program Files\GitHub CLI\gh.exe' repo create PeterRia/PeterRia.github.io --public --source . --remote origin --push
```

路径 B：在 GitHub 网页新建空仓库后，本地添加 remote。

```powershell
git branch -M main
git remote add origin https://github.com/PeterRia/PeterRia.github.io.git
git add .
git commit -m "Initial resume blog site"
git push -u origin main
```

## 已知安装坑

- 首次 `npm install` 下载依赖较慢，本机第一次运行约 6 分钟。
- `.docx` 文件需要被提交到仓库时，GitHub Actions 才能在远端导入；本项目只忽略 `imports/**/*.tmp` 和 Word 临时锁文件 `~$*.docx`。
- 没有 Word 文件时，CI 使用 `npm run import:docx:optional`，不会失败。
