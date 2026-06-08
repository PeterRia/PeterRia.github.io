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

## Open Design 图片没有显示

症状：首页拼贴图缺失或控制台出现 404。
检查：

```powershell
Get-ChildItem public/assets/open-design
```

必须至少存在：

```text
hero.png
about.png
capabilities.png
cta.png
testimonial.png
work-1.png
work-2.png
lab-1.png
lab-2.png
lab-3.png
lab-4.png
lab-5.png
method-1.png
method-2.png
method-3.png
method-4.png
```

修复：从 Open Design 官方示例资产目录重新复制：

```text
E:\00000AAAAA\000AAACodexW\Stock\Open Design\resources\open-design\plugins\_official\examples\open-design-landing\assets
```

## 首页出现横向滚动

症状：移动端页面可左右拖动，或 `scrollWidth > clientWidth`。
常见原因：

- ticker/marquee 内容撑开文档宽度。
- hero 注释或长 URL 没有被裁剪。
- 新增卡片文案太长且没有换行。

检查命令：

```js
document.documentElement.scrollWidth > document.documentElement.clientWidth
```

本次修复点：

- `html`、`body`、`.shell` 使用横向裁剪边界。
- `.wire-row` 和 `.marquee-track` 被限制在 ticker 容器内。

## 搜索按钮在小屏消失

这是预期行为。
Open Design 风格下，`880px` 以下会隐藏桌面 nav links 和 nav CTA，以避免挤压 topbar 和品牌区。博客、简历和主要导航仍可通过页面链接访问。
