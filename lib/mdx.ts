import { compileMDX } from "next-mdx-remote/rsc";
import type { ComponentType } from "react";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export async function compileMdx(source: string, components?: Record<string, ComponentType<any>>) {
  const { content } = await compileMDX({
    source,
    components,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug]
      }
    }
  });

  return content;
}
