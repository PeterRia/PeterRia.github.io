import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const contentRoot = path.join(root, "src", "content");
const requiredBlogKeys = ["title", "description", "pubDate", "lang", "tags"];
const requiredResumeKeys = ["title", "lang", "updated"];
const allowedLanguages = new Set(["zh", "en"]);

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectFiles(fullPath)));
    if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name)) files.push(fullPath);
  }

  return files;
}

function checkKeys(file, data, keys) {
  const missing = keys.filter((key) => data[key] === undefined);
  if (missing.length > 0) {
    throw new Error(`${file} is missing frontmatter: ${missing.join(", ")}`);
  }
}

async function main() {
  const files = await collectFiles(contentRoot);
  for (const file of files) {
    const raw = await readFile(file, "utf8");
    const parsed = matter(raw);
    const relative = path.relative(root, file).replaceAll("\\", "/");
    if (relative.includes("/blog/")) checkKeys(relative, parsed.data, requiredBlogKeys);
    if (relative.includes("/resume/")) checkKeys(relative, parsed.data, requiredResumeKeys);
    if (parsed.data.lang && !allowedLanguages.has(parsed.data.lang)) {
      throw new Error(`${relative} uses unsupported lang: ${parsed.data.lang}`);
    }
    if (!parsed.content.trim()) {
      throw new Error(`${relative} has empty body content`);
    }
  }

  console.log(`[content] validated ${files.length} content files`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
