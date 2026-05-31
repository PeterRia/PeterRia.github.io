# 故障排查

## `npm install` 很慢

症状：长时间无输出或超过几分钟。  
原因：首次下载 Astro、Sharp、Mammoth 等依赖较多。  
处理：

```powershell
npm install --no-audit --no-fund --loglevel=warn
```

## MDX 报 Unexpected character

症状：`[@mdx-js/rollup] Unexpected character`。  
原因：MDX 对某些 Markdown 扩展更严格，例如裸 `<https://...>` 可能被当成 JSX。  
处理：改成标准链接。

```markdown
[https://github.com/PeterRia](https://github.com/PeterRia)
```

## Word 文件没有导入

检查目录：

```powershell
Get-ChildItem imports -Recurse -Filter *.docx
```

手动运行：

```powershell
npm run import:docx
```

如果只是 CI 或本地构建允许没有 Word 文件：

```powershell
npm run import:docx:optional
```

## GitHub Actions 没有发布 Pages

检查：

- 仓库名是否为 `PeterRia.github.io`。
- 默认分支是否为 `main`。
- Settings → Pages 是否使用 GitHub Actions。
- Actions 页面是否允许 workflow 运行。
- `.github/workflows/deploy.yml` 是否存在于 `main` 分支。

## 远端无法创建

本机已安装 GitHub CLI，但当前 shell 的 PATH 可能还未刷新。优先使用完整路径：

```powershell
& 'C:\Program Files\GitHub CLI\gh.exe' --version
```

如果直接运行 `gh` 仍提示未识别，重新打开终端或把 `C:\Program Files\GitHub CLI\` 加入 PATH。

认证诊断：

```powershell
& 'C:\Program Files\GitHub CLI\gh.exe' auth status
```

如果提示未登录，执行：

```powershell
& 'C:\Program Files\GitHub CLI\gh.exe' auth login
```

## 样式或交互没有变化

处理：

```powershell
npm run build
npm run preview
```

浏览器中强制刷新，或清理 Astro 缓存：

```powershell
Remove-Item -Recurse -Force .astro
```
