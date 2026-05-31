# 运行手册

## 日常命令

安装依赖：

```powershell
npm install
```

启动开发服务：

```powershell
npm run dev
```

完整检查：

```powershell
npm run check
```

生产构建：

```powershell
npm run build
```

预览生产构建：

```powershell
npm run preview
```

## 健康检查

本地开发页：

```powershell
Invoke-WebRequest http://127.0.0.1:4321/ -UseBasicParsing
```

生产构建文件：

```powershell
Test-Path dist/index.html
Test-Path dist/blog/index.html
Test-Path dist/resume/zh/index.html
Test-Path dist/resume/en/index.html
```

## 更新流程

1. 修改 `src/data/profile.ts`、`src/content/` 或放入 Word 文件。
2. 运行 `npm run import:docx:optional`。
3. 运行 `npm run validate:content`。
4. 运行 `npm run build`。
5. 提交并推送到 `main`。
6. 在 GitHub Actions 查看 Pages 部署结果。

## 备份

必须备份：

- `src/data/profile.ts`
- `src/content/`
- `imports/`
- `public/generated-assets/`
- `.github/workflows/deploy.yml`
- `docs/resume-blog-site/`

建议备份命令：

```powershell
git status --short
git add .
git commit -m "Update resume content"
git push
```

## 回滚

查看提交：

```powershell
git log --oneline -10
```

回滚内容文件的建议方式是创建新提交修正，不建议直接 `git reset --hard`，除非明确确认要丢弃本地改动。

## 资源占用

站点是静态输出，部署后不需要服务端进程。构建阶段主要占用 Node/npm 依赖安装和 Astro 构建时间。

