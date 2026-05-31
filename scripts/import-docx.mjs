import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import matter from "gray-matter";
import mammoth from "mammoth";
import TurndownService from "turndown";

const root = process.cwd();
const optional = process.argv.includes("--optional");
const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-"
});

const importsRoot = path.join(root, "imports");
const resumeInput = path.join(importsRoot, "resume");
const postsInput = path.join(importsRoot, "posts");
const resumeOutput = path.join(root, "src", "content", "resume");
const postsOutput = path.join(root, "src", "content", "blog");
const assetsOutput = path.join(root, "public", "generated-assets");

async function listDocxFiles(directory) {
  try {
    const entries = await readdir(directory, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".docx"))
      .map((entry) => path.join(directory, entry.name));
  } catch {
    return [];
  }
}

function detectLanguage(filePath) {
  const name = path.basename(filePath).toLowerCase();
  if (/(^|[.-])en([.-]|$)/.test(name)) return "en";
  return "zh";
}

function stripExtension(filePath) {
  return path.basename(filePath).replace(/\.docx$/i, "");
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/\.(zh|en)$/i, "")
    .replace(/^\d{4}-\d{2}-\d{2}-/, "")
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function extractTitle(html, fallback) {
  const match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
  return match ? match[1].replace(/<[^>]+>/g, "").trim() : fallback;
}

function extractDescription(markdown) {
  return (
    markdown
      .split(/\r?\n/)
      .map((line) => line.trim())
      .find((line) => line && !line.startsWith("#") && !line.startsWith("![")) ?? ""
  ).slice(0, 160);
}

function detectDate(filePath, stats) {
  const match = path.basename(filePath).match(/^(\d{4}-\d{2}-\d{2})/);
  return match?.[1] ?? stats.mtime.toISOString().slice(0, 10);
}

async function convertDocx(filePath, assetFolder) {
  let imageIndex = 0;
  const assetDir = path.join(assetsOutput, assetFolder);
  await mkdir(assetDir, { recursive: true });

  const result = await mammoth.convertToHtml(
    { path: filePath },
    {
      convertImage: mammoth.images.imgElement(async (image) => {
        const contentType = image.contentType || "image/png";
        const extension = contentType.includes("jpeg") ? "jpg" : contentType.split("/")[1] || "png";
        const filename = `image-${String(++imageIndex).padStart(2, "0")}.${extension}`;
        const outputPath = path.join(assetDir, filename);
        const buffer = await image.read("buffer");
        await writeFile(outputPath, buffer);
        return {
          src: `/generated-assets/${assetFolder}/${filename}`,
          alt: `Embedded image ${imageIndex} from ${path.basename(filePath)}`
        };
      })
    }
  );

  if (result.messages.length > 0) {
    for (const message of result.messages) {
      console.warn(`[docx] ${path.basename(filePath)}: ${message.message}`);
    }
  }

  return {
    html: result.value,
    markdown: turndown.turndown(result.value).trim()
  };
}

function withFrontmatter(data, markdown) {
  return `${matter.stringify(markdown, data).trim()}\n`;
}

async function importResume(filePath) {
  const lang = detectLanguage(filePath);
  const basename = stripExtension(filePath);
  const assetFolder = `resume/${slugify(basename) || lang}`;
  const { html, markdown } = await convertDocx(filePath, assetFolder);
  const stats = await stat(filePath);
  const title = extractTitle(html, lang === "zh" ? "PeterRia 简历" : "PeterRia Resume");
  const target = path.join(resumeOutput, `generated-${lang}.mdx`);

  await writeFile(
    target,
    withFrontmatter(
      {
        title,
        lang,
        updated: stats.mtime.toISOString().slice(0, 10),
        source: path.relative(root, filePath).replaceAll("\\", "/")
      },
      markdown
    ),
    "utf8"
  );

  return target;
}

async function importPost(filePath) {
  const lang = detectLanguage(filePath);
  const basename = stripExtension(filePath);
  const stats = await stat(filePath);
  const date = detectDate(filePath, stats);
  const slug = slugify(basename) || `imported-${date}`;
  const assetFolder = `posts/${date}-${slug}-${lang}`;
  const { html, markdown } = await convertDocx(filePath, assetFolder);
  const title = extractTitle(html, slug);
  const description = extractDescription(markdown) || title;
  const target = path.join(postsOutput, `${date}-${slug}-${lang}.mdx`);

  await writeFile(
    target,
    withFrontmatter(
      {
        title,
        description,
        pubDate: date,
        lang,
        tags: ["imported"],
        featured: false,
        source: path.relative(root, filePath).replaceAll("\\", "/")
      },
      markdown
    ),
    "utf8"
  );

  return target;
}

async function main() {
  await mkdir(resumeOutput, { recursive: true });
  await mkdir(postsOutput, { recursive: true });

  const resumeFiles = await listDocxFiles(resumeInput);
  const postFiles = await listDocxFiles(postsInput);
  const allFiles = [...resumeFiles, ...postFiles];

  if (allFiles.length === 0) {
    const message = "No .docx files found under imports/resume or imports/posts.";
    if (optional) {
      console.log(`[docx] ${message}`);
      return;
    }
    throw new Error(message);
  }

  const written = [];
  for (const file of resumeFiles) written.push(await importResume(file));
  for (const file of postFiles) written.push(await importPost(file));

  for (const file of written) {
    console.log(`[docx] wrote ${path.relative(root, file).replaceAll("\\", "/")}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
