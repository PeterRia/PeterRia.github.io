# PeterRia Resume Blog

A bilingual resume-first personal site with a small technical blog, Word-to-content import workflow, and GitHub Pages deployment.

## Local workflow

```bash
npm install
npm run assets:generate
npm run import:docx:optional
npm run dev
```

## Publish workflow

Push to `main`. GitHub Actions imports any `.docx` files committed under `imports/`, builds the Astro site, and deploys `dist/` to GitHub Pages.

Current handoff docs live in `docs/resume-blog-site/`.
