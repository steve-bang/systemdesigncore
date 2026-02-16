import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Markdown } from "@/components/Markdown";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://steve-bang.com";

function formatDate(input: string) {
  return new Date(input).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  });
}

/**
 * Static params for App Router SSG support.
 */
export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

/**
 * Dynamic SEO metadata sourced from MDX frontmatter.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article not found | Blog",
      description: "The requested article does not exist or may have been moved.",
      robots: {
        index: false,
        follow: true
      }
    };
  }

  const canonicalPath = `/blog/${post.meta.slug}`;
  const canonicalUrl = `${siteUrl}${canonicalPath}`;

  return {
    title: `${post.meta.title} | Blog`,
    description: post.meta.description,
    alternates: {
      canonical: canonicalPath
    },
    openGraph: {
      type: "article",
      title: post.meta.title,
      description: post.meta.description,
      url: canonicalUrl,
      siteName: "System Design Core",
      publishedTime: new Date(post.meta.date).toISOString()
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description: post.meta.description
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Section className="pt-12 pb-20 md:pt-16 md:pb-24">
      <Container>
        <article className="mx-auto max-w-[75ch]">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-ink-dim">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-ink">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/blog" className="hover:text-ink">
                  Blog
                </Link>
              </li>
              <li>/</li>
              <li aria-current="page" className="text-ink">
                {post.meta.title}
              </li>
            </ol>
          </nav>

          <header className="border-b border-line pb-8">
            
            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-ink md:text-5xl">{post.meta.title}</h1>
            <p className="mt-5 text-base leading-8 text-ink-dim md:text-lg">{post.meta.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink-dim">
              <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
            </div>
          </header>

          {post.meta.cover ? (
            <Card className="mt-8 overflow-hidden p-0">
              <Image
                src={post.meta.cover}
                alt={post.meta.title}
                width={1600}
                height={900}
                className="h-auto w-full object-cover"
                priority={false}
              />
            </Card>
          ) : null}

          <section className="mt-10" aria-label="Article content">
            <Markdown source={post.content} />
          </section>

          <footer className="mt-14 border-t border-line pt-8">
            <Link
              href="/blog"
              className="inline-flex h-10 items-center rounded-xl border border-line bg-surface px-4 text-sm font-medium text-ink transition hover:bg-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35"
            >
              Back to Blog
            </Link>
          </footer>
        </article>
      </Container>
    </Section>
  );
}
