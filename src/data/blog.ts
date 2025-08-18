import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

// --------------------------------------------------
// Types
// --------------------------------------------------
export interface BlogFrontmatter {
  title: string;
  publishedAt: string; // ISO date string preferred
  summary: string;
  image?: string;
}

export interface PostSummary {
  slug: string;
  metadata: BlogFrontmatter;
  // added convenience fields
  readingTimeMinutes?: number; // estimated (if calculated)
}

export interface PostFull extends PostSummary {
  source: string; // HTML
}

// --------------------------------------------------
// Constants & simple caches (module scoped so Next.js can reuse)
// --------------------------------------------------
const CONTENT_DIR = path.join(process.cwd(), "content");
const postCache = new Map<string, PostFull>();

// --------------------------------------------------
// Utilities
// --------------------------------------------------
function assertContentDir() {
  if (!fs.existsSync(CONTENT_DIR)) {
    throw new Error(`Content directory not found at ${CONTENT_DIR}`);
  }
}

function listMDXFiles(): string[] {
  assertContentDir();
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => path.extname(file).toLowerCase() === ".mdx");
}

/** Rough reading time estimate (words / 200) */
function calcReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export async function markdownToHTML(markdown: string) {
  const p = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      // https://rehype-pretty.pages.dev/#usage
      theme: { light: "min-light", dark: "min-dark" },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);
  return p.toString();
}

// --------------------------------------------------
// Core loaders
// --------------------------------------------------
/** Load and fully process a single post (with HTML). Uses in-memory cache. */
export async function getPost(slug: string): Promise<PostFull> {
  if (postCache.has(slug)) return postCache.get(slug)!;

  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found: ${slug}`);
  }
  const rawFile = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data } = matter(rawFile);
  const metadata = validateFrontmatter(data, slug);
  const html = await markdownToHTML(rawContent);
  const post: PostFull = {
    slug,
    source: html,
    metadata,
    readingTimeMinutes: calcReadingTime(rawContent),
  };
  postCache.set(slug, post);
  return post;
}

/** Lightweight frontmatter-only loader. */
function loadFrontmatterOnly(slug: string): PostSummary {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const rawFile = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data } = matter(rawFile);
  const metadata = validateFrontmatter(data, slug);
  return {
    slug,
    metadata,
    readingTimeMinutes: calcReadingTime(rawContent),
  };
}

/** Get all posts. By default returns only summaries (no HTML) for speed. */
export async function getBlogPosts(options?: { includeContent?: boolean }): Promise<(PostSummary | PostFull)[]> {
  const { includeContent = false } = options || {};
  const files = listMDXFiles();
  if (includeContent) {
    return Promise.all(
      files.map(async (file) => {
        const slug = path.basename(file, path.extname(file));
        return getPost(slug);
      })
    );
  }
  // summaries only – synchronous + fast
  return files.map((file) => {
    const slug = path.basename(file, path.extname(file));
    return loadFrontmatterOnly(slug);
  });
}

/** Helper for static params if you only need slugs */
export function listPostSlugs(): string[] {
  return listMDXFiles().map((file) => path.basename(file, path.extname(file)));
}

// --------------------------------------------------
// Validation
// --------------------------------------------------
function validateFrontmatter(data: any, slug: string): BlogFrontmatter {
  const required = ["title", "publishedAt", "summary"] as const;
  for (const key of required) {
    if (!data[key]) {
      throw new Error(`Missing required frontmatter field "${key}" in ${slug}.mdx`);
    }
  }
  return {
    title: String(data.title),
    publishedAt: String(data.publishedAt),
    summary: String(data.summary),
    image: data.image ? String(data.image) : undefined,
  };
}
