import fs from "fs";
import path from "path";
import { slugify } from "./utils";

export interface TocEntry {
  id: string;
  text: string;
  level: number;
}

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  image?: string;
  tags: string[];
  readingTime: number;
}

export interface Article extends ArticleMeta {
  content: string;
  toc: TocEntry[];
}

const ARTICLES_DIR = path.join(process.cwd(), "src/content/articles");

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getArticle(slug: string): Article | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { meta, content } = parseFrontmatter(raw);

  const words = content.split(/\s+/).length;
  const readingTime = Math.ceil(words / 200);
  const toc = extractToc(content);

  return {
    slug,
    title: String(meta.title || slug),
    description: String(meta.description || ""),
    category: String(meta.category || "guide"),
    publishedAt: String(meta.publishedAt || new Date().toISOString()),
    updatedAt: meta.updatedAt ? String(meta.updatedAt) : undefined,
    author: String(meta.author || "WoWPlots Team"),
    image: meta.image ? String(meta.image) : undefined,
    tags: Array.isArray(meta.tags) ? meta.tags.map(String) : [],
    readingTime,
    content,
    toc,
  };
}

export function getAllArticles(): ArticleMeta[] {
  return getArticleSlugs()
    .map((slug) => {
      const article = getArticle(slug);
      if (!article) return null;
      const { content: _content, toc: _toc, ...meta } = article;
      void _content;
      void _toc;
      return meta;
    })
    .filter((a): a is ArticleMeta => a !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getRelatedArticles(
  current: ArticleMeta,
  count = 3,
): ArticleMeta[] {
  const all = getAllArticles().filter((a) => a.slug !== current.slug);

  // Score by shared tags and same category
  const scored = all.map((article) => {
    let score = 0;
    for (const tag of article.tags) {
      if (current.tags.includes(tag)) score += 2;
    }
    if (article.category === current.category) score += 1;
    return { article, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((s) => s.article);
}

function extractToc(content: string): TocEntry[] {
  const entries: TocEntry[] = [];
  const lines = content.split("\n");

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = slugify(text);
      entries.push({ id, text, level });
    }
  }

  return entries;
}

function parseFrontmatter(raw: string): {
  meta: Record<string, unknown>;
  content: string;
} {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };

  const meta: Record<string, unknown> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value: unknown = line.slice(idx + 1).trim();
    if (
      typeof value === "string" &&
      value.startsWith("[") &&
      value.endsWith("]")
    ) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""));
    }
    if (typeof value === "string") {
      value = value.replace(/^["']|["']$/g, "");
    }
    meta[key] = value;
  }

  return { meta, content: match[2].trim() };
}
