import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { DocsSidebar } from "@/components/DocsSidebar";
import { DocsToc } from "@/components/DocsToc";
import { Markdown } from "@/components/Markdown";
import { getDocBySlug, getDocSlugs, getDocsNavigation } from "@/lib/content";
import { extractToc } from "@/lib/toc";

export async function generateStaticParams() {
  return getDocSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getDocBySlug(slug);

  if (!doc) {
    return {};
  }

  return {
    title: doc.title,
    description: doc.description
  };
}

export default async function DocsArticlePage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const doc = await getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  const navItems = getDocsNavigation();
  const toc = extractToc(doc.content);

  return (
    <Section className="pt-10 pb-20">
      <Container className="max-w-[1400px]">
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)_240px]">
          <DocsSidebar items={navItems} currentPath={doc.slug.join("/")} />

          <Card className="min-w-0 p-6 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#3f537e]">Documentation</p>
            <h1 className="mt-3 text-balance text-4xl font-semibold leading-tight text-ink">{doc.title}</h1>
            <p className="mt-4 text-base leading-8 text-ink-dim">{doc.description}</p>
            <div className="mt-10">
              <Markdown source={doc.content} />
            </div>
          </Card>

          <DocsToc items={toc} />
        </div>
      </Container>
    </Section>
  );
}
