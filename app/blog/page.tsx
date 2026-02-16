import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { getAllBlogPosts } from "@/lib/blog";
import { BlogListClient } from "./BlogListClient";

type BlogPageProps = {
    searchParams: Promise<{
        q?: string;
        page?: string;
    }>;
};

export const metadata: Metadata = {
    title: "Blog",
    description: "System design articles, architecture notes, and production engineering insights.",
    openGraph: {
        title: "Blog",
        description: "System design articles, architecture notes, and production engineering insights.",
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Blog",
        description: "System design articles, architecture notes, and production engineering insights."
    },
    robots: {
        index: true,
        follow: true
    }
};

export default async function BlogPage({ searchParams }: BlogPageProps) {

    const params = await searchParams;
    const posts = await getAllBlogPosts();
    const initialQuery = params?.q?.trim() ?? "";
    const initialPageRaw = Number(params?.page ?? "1");
    const initialPage = Number.isFinite(initialPageRaw) && initialPageRaw > 0 ? Math.floor(initialPageRaw) : 1;

    return (
        <>
            <Section className="pt-16 pb-10 md:pt-20 md:pb-6">
                <Container>
                    <header className="mx-auto max-w-3xl text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#3f537e]">Knowledge</p>
                        <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-ink md:text-6xl">Blog</h1>
                        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-ink-dim md:text-lg">
                            System design knowledge sharing for developers building production-grade systems.
                        </p>
                    </header>
                </Container>
            </Section>

            <Section className="pt-0 pb-20 md:pb-24">
                <Container>
                    {posts.length === 0 ? (
                        <Card className="mx-auto max-w-2xl p-8 text-center">
                            <h2 className="text-2xl font-semibold text-ink">No posts yet</h2>
                            <p className="mt-3 text-sm leading-7 text-ink-dim">Blog content is being prepared. Please check back soon.</p>
                        </Card>
                    ) : (
                        <BlogListClient posts={posts} initialQuery={initialQuery} initialPage={initialPage} />
                    )}
                </Container>
            </Section>
        </>
    );
}
