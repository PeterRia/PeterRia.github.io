# Open Design 视觉改造记录

记录日期：2026-06-08  
项目路径：`C:\Users\41362\Documents\CodexWS26525`  
改造目标：使用本机 Open Design 官方示例插件，将当前简历博客站点改造成 Atelier Zero / Monocle / Apartamento / Études editorial collage 风格，简历为主、博客为辅。

## 用户要求

- 使用 `E:\00000AAAAA\000AAACodexW\Stock\Open Design` 路径下图中标识的 Open Design 插件。
- 目标插件为“Open Design 落地页”，需要一比一复刻其营销页视觉语言。
- 改变当前博客风格，而不是只做局部配色。
- 禁用并不使用 `ui-ux-pro-max`。
- 继续用 `project-doc-packager` 详细记录全过程。

## 插件定位过程

实际路径不是普通源码仓库，而是 Open Design 桌面应用安装目录：

```text
E:\00000AAAAA\000AAACodexW\Stock\Open Design
```

应用配置文件：

```text
E:\00000AAAAA\000AAACodexW\Stock\Open Design\resources\open-design-config.json
```

关键信息：

- `appVersion`: `0.9.0`
- `namespace`: `release-stable-win`
- `webOutputMode`: `standalone`

通过 `rg` 排除 `node_modules`、`.next`、`dist` 后，定位到图中标识的官方示例：

```text
E:\00000AAAAA\000AAACodexW\Stock\Open Design\resources\open-design\plugins\_official\examples\open-design-landing
```

读取文件：

```text
open-design.json
SKILL.md
example.html
assets/image-manifest.json
assets/imagegen-prompts.md
```

插件元数据确认：

- 插件 id：`example-open-design-landing`
- 英文标题：`Open Design Landing`
- 中文标题：`Open Design 落地页`
- 示例入口：`./example.html`
- 视觉系统：`atelier-zero`

## 官方样例要点

`SKILL.md` 描述的页面结构：

- Editorial topbar。
- Headroom-style sticky navigation。
- GitHub star count。
- 8 个罗马数字章节：hero、about、capabilities、labs、method、selected work、testimonial、CTA。
- Warm-paper background。
- 字体：Inter Tight、Inter、Playfair Display、JetBrains Mono。
- 视觉符号：italic serif emphasis、dotted hairlines、coral dots、paper grain、collage plates。
- 交互：scroll reveal、sticky hide/show nav、ticker/marquee、responsive breakpoints。

官方样例是一个完整自包含 HTML：

```text
example.html
```

它内联了 canonical landing-page stylesheet，并引用 16 张拼贴图。

## 资产复制

目标目录：

```text
public/assets/open-design/
```

复制来源：

```text
E:\00000AAAAA\000AAACodexW\Stock\Open Design\resources\open-design\plugins\_official\examples\open-design-landing\assets
```

复制内容：

```text
about.png
capabilities.png
cta.png
hero.png
image-manifest.json
lab-1.png
lab-2.png
lab-3.png
lab-4.png
lab-5.png
method-1.png
method-2.png
method-3.png
method-4.png
testimonial.png
work-1.png
work-2.png
```

浏览器验证首页 Open Design 图片：

- 图片 slot 数：16
- 加载成功数：16
- 失败图片：0

## 改造文件

主要修改：

```text
src/pages/index.astro
src/components/Header.astro
src/layouts/BaseLayout.astro
src/styles/global.css
src/scripts/site.js
```

新增资源：

```text
public/assets/open-design/
docs/resume-blog-site/08_OPEN_DESIGN_RESTYLE.md
```

未纳入本次修改的无关未跟踪文件：

```text
docs/openclaw-deployment-plan-2026-05-25.md
docs/openclaw-only-ip18789-push-handbook-2026-05-25.md
docs/vps-audit-handbook-2026-05-25.md
docs/vps-openclaw-cleanup-2026-05-25.md
```

## 首页结构改造

`src/pages/index.astro` 被改造为 Open Design 风格单页：

1. Hero / Cover Plate：简历优先的主叙事和 `hero.png` 拼贴图。
2. Wire ticker：地域与维护主题双行 marquee。
3. About / Resume Statement：解释简历作为 living system。
4. Capabilities：简历优先、图文导入、自动发布、过程归档。
5. Labs：简历叙事、Word-to-Web、发布流水线、写作归档、交接文档。
6. Method：Brief、Compose、Verify、Publish 四步。
7. Selected Work：Resume System 与 Writing Notes 两张旋转卡。
8. Writing / Proof：博客文章和技能分组。
9. CTA：邮箱与 GitHub 联系入口。

保留“简历为主、博客为辅”原则：

- Hero、About、Capabilities、Work、CTA 都围绕简历。
- Blog 作为 Writing Archive 和 Secondary surface 出现。

## Layout 与 Header 改造

`src/layouts/BaseLayout.astro`：

- 加入 Open Design 字体预连接和 Google Fonts。
- 默认 OG 图改为 `/assets/open-design/hero.png`。
- 加入左右 side rail。
- 使用统一 footer，呈现 Profile、Archive、Connect。
- 保留 `CommandMenu`。
- 保留本地语言偏好读取。

`src/components/Header.astro`：

- 替换旧 header 为 Open Design topbar + sticky nav。
- topbar 显示 `PR / 2026`、`Resume · Automation`、`Live · username.github.io`。
- nav 显示 PeterRia brand、Resume、Capabilities、Labs、Writing、Contact。
- 桌面端保留 Search 按钮与 GitHub Star CTA。
- 保留语言切换按钮。
- GitHub star count 由脚本按 `PeterRia/PeterRia.github.io` 读取。

## 样式系统改造

`src/styles/global.css` 从旧的网格仪表盘风格改为 Atelier Zero 风格。

关键 token：

```css
--paper: #efe7d2;
--paper-warm: #ece4cf;
--paper-dark: #ddd2b6;
--ink: #15140f;
--ink-soft: #2a2620;
--ink-mute: #5a5448;
--ink-faint: #8b8676;
--coral: #ed6f5c;
--mustard: #e9b94a;
--olive: #6e7448;
--bone: #f7f1de;
```

实现内容：

- 纸张纹理背景。
- side rail。
- topbar。
- Headroom-style sticky nav。
- Roman numeral section rule。
- serif italic emphasis。
- pill buttons。
- collage art positioning。
- ticker/marquee。
- labs card grid。
- method grid。
- dark selected-work section。
- command menu。
- resume/blog/prose 兼容样式。
- print 样式。

为满足响应式和可访问性，额外处理：

- 小屏隐藏 nav CTA，保留 topbar 语言切换。
- 1280、880、560 三个宽度均无横向溢出。
- 对 ticker 设置横向裁剪边界，避免 marquee 内容撑开文档宽度。
- `prefers-reduced-motion: reduce` 下关闭 marquee 和 reveal 过渡。

## 脚本改造

`src/scripts/site.js` 保留并扩展：

- 语言切换。
- 滚动进度条。
- `[data-reveal]` 与旧 `.reveal` 双兼容。
- sticky nav 上滑隐藏、下滑显示。
- GitHub star count。
- 搜索弹层。
- 博客标签过滤。
- 邮箱复制预留逻辑。

删除旧主题切换逻辑：

- Open Design 官方视觉语言是 warm-paper light surface。
- 本次不再提供深色主题按钮，避免破坏一比一视觉语言。

## 本地验证记录

完整检查命令：

```powershell
npm run check
```

最新实测结果：

- `npm run import:docx:optional`：未发现 Word 文件，按 optional 规则继续。
- `npm run validate:content`：校验 4 个内容文件。
- `astro check`：21 个文件，0 errors、0 warnings、0 hints。
- `astro build`：生成 7 个静态页面。

开发服务：

```powershell
npm run dev -- --port 4322
```

使用 `4322` 的原因：

- 旧的 `4321` 启动日志曾显示 ready，但 HTTP 检查超时。
- 为避免旧进程或端口状态干扰，改用 `4322` 完成验证。

浏览器验证地址：

```text
http://127.0.0.1:4322/
http://127.0.0.1:4322/resume/zh/
http://127.0.0.1:4322/blog/
```

浏览器验证结果：

| 宽度 | 页面 | 横向溢出 | topbar/nav | 图片失败 |
| --- | --- | --- | --- | --- |
| 1280 | `/` | 否 | 是 | 0 |
| 1280 | `/resume/zh/` | 否 | 是 | 0 |
| 1280 | `/blog/` | 否 | 是 | 0 |
| 880 | `/` | 否 | 是 | 0 |
| 880 | `/resume/zh/` | 否 | 是 | 0 |
| 880 | `/blog/` | 否 | 是 | 0 |
| 560 | `/` | 否 | 是 | 0 |
| 560 | `/resume/zh/` | 否 | 是 | 0 |
| 560 | `/blog/` | 否 | 是 | 0 |

首页专项结果：

```json
{
  "imageSlots": 16,
  "loaded": 16,
  "failed": [],
  "scrollWidthEqualsClientWidth": true
}
```

交互验证：

- 搜索按钮在桌面宽度可见。
- 搜索按钮触发后，command dialog 打开。
- 语言切换可从 `zh` 切到 `en`，再切回 `zh`。
- 最终浏览器语言状态恢复为 `zh`。

备注：

- 浏览器截图接口曾在首页重图场景下超时；没有把截图作为最终通过条件。
- DOM、构建、资源加载、断点宽度和交互验证均已完成。

## 构建产物确认

最新构建后：

- `dist/index.html` 包含 Open Design 页面结构。
- `dist/_astro/site.*.js` 已输出。
- `dist/_astro/*.css` 已输出新样式。
- `dist/` 仍输出 7 个页面。

## 后续维护

替换 Open Design 拼贴图时保持文件名：

```text
public/assets/open-design/hero.png
public/assets/open-design/about.png
...
```

如果重新生成图像，优先参考：

```text
public/assets/open-design/image-manifest.json
E:\00000AAAAA\000AAACodexW\Stock\Open Design\resources\open-design\plugins\_official\examples\open-design-landing\assets\imagegen-prompts.md
```

每次视觉或内容更新后建议运行：

```powershell
npm run check
```

推送到 `main` 后，GitHub Actions 会自动部署到：

```text
https://peterria.github.io/
```
