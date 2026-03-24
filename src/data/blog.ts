import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
};

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

export async function markdownToHTML(markdown: string) {
  // Allow attributes needed by rehype-pretty-code while stripping dangerous HTML
  const sanitizeSchema = {
    ...defaultSchema,
    attributes: {
      ...defaultSchema.attributes,
      "*": [
        ...(defaultSchema.attributes?.["*"] ?? []),
        "data*", // allow all data-* attributes (used by rehype-pretty-code)
      ],
      code: [
        ...(defaultSchema.attributes?.code ?? []),
        "className",
      ],
      span: [
        ...(defaultSchema.attributes?.span ?? []),
        "className",
        "style",
      ],
      pre: [
        ...(defaultSchema.attributes?.pre ?? []),
        "className",
      ],
    },
  };
  const p = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(() => rehypeSanitize(sanitizeSchema))
    .use(rehypePrettyCode, {
      // https://rehype-pretty.pages.dev/#usage
      theme: {
        light: "min-light",
        dark: "min-dark",
      },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);

  return p.toString();
}

// Validate slugs: only allow alphanumeric characters, hyphens, and underscores
const SAFE_SLUG_RE = /^[a-zA-Z0-9_-]+$/;

export async function getPost(slug: string) {
  if (!SAFE_SLUG_RE.test(slug)) {
    throw new Error("Invalid slug");
  }
  const contentDir = path.join(process.cwd(), "content");
  const filePath = path.join(contentDir, `${slug}.mdx`);
  // Ensure the resolved path stays within the content directory (defense in depth)
  if (!filePath.startsWith(contentDir + path.sep)) {
    throw new Error("Invalid slug");
  }
  let source = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data: metadata } = matter(source);
  const content = await markdownToHTML(rawContent);
  return {
    source: content,
    metadata,
    slug,
  };
}

async function getAllPosts(dir: string) {
  let mdxFiles = getMDXFiles(dir);
  return Promise.all(
    mdxFiles.map(async (file) => {
      let slug = path.basename(file, path.extname(file));
      let { metadata, source } = await getPost(slug);
      return {
        metadata,
        slug,
        source,
      };
    })
  );
}

export async function getBlogPosts() {
  return getAllPosts(path.join(process.cwd(), "content"));
}
