import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { BlogPost } from "@/types/blog";

export type BlogPostMeta = {
  title: string;
  description: string;
  date: string;
  slug: string;
  cover?: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function normalizeDate(input: string) {
  const parsed = new Date(input);
  if (Number.isNaN(parsed.getTime())) {
    return "1970-01-01";
  }
  return parsed.toISOString().slice(0, 10);
}

export async function getAllBlogPosts(): Promise<BlogPostMeta[]> {
  let files: string[] = [];

  try {
    files = await fs.readdir(BLOG_DIR);
  } catch {
    return [];
  }

  const mdxFiles = files.filter((name) => name.endsWith(".mdx"));

  const posts = await Promise.all(
    mdxFiles.map(async (fileName) => {
      const fullPath = path.join(BLOG_DIR, fileName);
      const raw = await fs.readFile(fullPath, "utf8");
      const { data } = matter(raw);

      const filenameSlug = fileName.replace(/\.mdx$/, "");

      const title = asString(data.title, filenameSlug);
      const description = asString(data.description, "");
      const slug = asString(data.slug, filenameSlug);
      const date = normalizeDate(asString(data.date, "1970-01-01"));
      const cover = asString(data.cover, "");

      return {
        title,
        description,
        slug,
        date,
        cover: cover || undefined
      } satisfies BlogPostMeta;
    })
  );

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  let files: string[] = [];

  try {
    files = await fs.readdir(BLOG_DIR);
  } catch {
    return null;
  }

  const mdxFiles = files.filter((name) => name.endsWith(".mdx"));

  for (const fileName of mdxFiles) {
    try {
      const fullPath = path.join(BLOG_DIR, fileName);
      const raw = await fs.readFile(fullPath, "utf8");
      const { data, content } = matter(raw);

      const filenameSlug = fileName.replace(/\.mdx$/, "");
      const resolvedSlug = asString(data.slug, filenameSlug);

      if (resolvedSlug !== slug) {
        continue;
      }

      const meta: BlogPostMeta = {
        title: asString(data.title, filenameSlug),
        description: asString(data.description, ""),
        date: normalizeDate(asString(data.date, "1970-01-01")),
        slug: resolvedSlug,
        cover: asString(data.cover, "") || undefined
      };

      return { meta, content };
    } catch {
      // Continue scanning other files if one file fails to parse.
      continue;
    }
  }

  return null;
}