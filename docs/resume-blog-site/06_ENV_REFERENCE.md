# 环境与配置参考

## 必需环境

- Node.js：建议 22.x；本机实测 `v22.18.0`
- npm：本机实测 `10.9.3`
- Git：用于提交和推送

## 可选环境

- uv：用于运行 `project-doc-packager` 证据采集脚本；本机实测 `0.11.6`
- GitHub CLI：已安装，路径 `C:\Program Files\GitHub CLI\gh.exe`，当前已登录 `PeterRia`

## npm 脚本

```json
{
  "dev": "astro dev --host 127.0.0.1",
  "build": "astro check && astro build",
  "preview": "astro preview --host 127.0.0.1",
  "import:docx": "node scripts/import-docx.mjs",
  "import:docx:optional": "node scripts/import-docx.mjs --optional",
  "validate:content": "node scripts/validate-content.mjs",
  "assets:generate": "node scripts/generate-assets.mjs",
  "check": "npm run import:docx:optional && npm run validate:content && npm run build"
}
```

## 外部服务

- GitHub：代码仓库与 Actions。
- GitHub Pages：静态站点托管。

## 环境变量

当前项目不需要 `.env` 或运行时环境变量。

## 端口

Astro 默认开发端口通常是：

```text
4321
```

如果端口占用，Astro 会选择其他端口。以终端输出为准。

## 站点配置

`astro.config.mjs` 中站点地址：

```js
site: "https://peterria.github.io"
```

如果 GitHub 用户名或仓库目标改变，需要同步修改：

- `astro.config.mjs`
- `public/robots.txt`
- `docs/resume-blog-site/`
- GitHub remote
