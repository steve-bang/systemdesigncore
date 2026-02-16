"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import type { BlogPostMeta } from "@/lib/blog";
import type { Route } from "next";
import type { ReactNode } from "react";

const POSTS_PER_PAGE = 6;
const DEBOUNCE_MS = 250;

type BlogListClientProps = {
    posts: BlogPostMeta[];
    initialQuery: string;
    initialPage: number;
};

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    });
}

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

export function BlogListClient({
    posts,
    initialQuery,
    initialPage,
}: BlogListClientProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [queryInput, setQueryInput] = useState(initialQuery);
    const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
    const [isDebouncing, setIsDebouncing] = useState(false);

    // Sync input when URL changes
    useEffect(() => {
        const q = searchParams.get("q") ?? "";
        setQueryInput(q);
        setDebouncedQuery(q);
    }, [searchParams]);

    // Debounce search
    useEffect(() => {
        setIsDebouncing(true);

        const timer = window.setTimeout(() => {
            setDebouncedQuery(queryInput);
            setIsDebouncing(false);
        }, DEBOUNCE_MS);

        return () => window.clearTimeout(timer);
    }, [queryInput]);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (debouncedQuery.trim()) {
            params.set("q", debouncedQuery.trim());
        } else {
            params.delete("q");
        }

        params.delete("page");

        const next = params.toString();
        const current = searchParams.toString();

        if (next === current) return;

        const href = next ? `${pathname}?${next}` : pathname;

        router.replace(href as Route, { scroll: false });
    }, [debouncedQuery, pathname, router, searchParams]);

    const filteredPosts = useMemo(() => {
        const q = debouncedQuery.trim().toLowerCase();
        if (!q) return posts;

        return posts.filter((post) => {
            const haystack = `${post.title} ${post.description}`.toLowerCase();
            return haystack.includes(q);
        });
    }, [posts, debouncedQuery]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
    );

    const pageFromUrl = Number(searchParams.get("page") ?? initialPage);

    const currentPage = Number.isFinite(pageFromUrl)
        ? clamp(Math.floor(pageFromUrl), 1, totalPages)
        : 1;

    const paginatedPosts = useMemo(() => {
        const start = (currentPage - 1) * POSTS_PER_PAGE;
        return filteredPosts.slice(start, start + POSTS_PER_PAGE);
    }, [filteredPosts, currentPage]);

    function setPage(nextPage: number) {
        const safePage = clamp(nextPage, 1, totalPages);
        const params = new URLSearchParams(searchParams.toString());

        if (safePage === 1) {
            params.delete("page");
        } else {
            params.set("page", String(safePage));
        }

        const next = params.toString();
        const href = next ? `${pathname}?${next}` : pathname;

        router.push(href as Route, { scroll: false });
    }

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    // ✅ Extracted conditional rendering
    let content: ReactNode;

    if (filteredPosts.length === 0) {
        content = (
            <Card className="p-8 text-center">
                <h2 className="text-xl font-semibold text-ink">
                    No results found
                </h2>
                <p className="mt-3 text-sm leading-7 text-ink-dim">
                    Try a different keyword or clear the search input.
                </p>
            </Card>
        );
    } else {
        content = (
            <>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {paginatedPosts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group block h-full"
                            aria-label={`Read: ${post.title}`}
                        >
                            <Card className="flex h-full flex-col overflow-hidden p-6 transition duration-200 group-hover:-translate-y-0.5 group-hover:border-brand/25 group-hover:shadow-[0_20px_40px_rgba(14,21,40,0.10)]">
                                {post.cover && (
                                    <div className="mb-4 overflow-hidden rounded-lg border border-line bg-surface-soft">
                                        <Image
                                            src={post.cover}
                                            alt={post.title}
                                            width={1200}
                                            height={630}
                                            className="h-40 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                                        />
                                    </div>
                                )}

                                <div className="flex items-center justify-between gap-3 text-xs text-ink-dim">
                                    <time dateTime={post.date}>
                                        {formatDate(post.date)}
                                    </time>
                                </div>

                                <h2 className="mt-3 text-xl font-semibold leading-snug text-ink">
                                    {post.title}
                                </h2>

                                <p className="mt-3 text-sm leading-7 text-ink-dim">
                                    {post.description}
                                </p>

                                <div className="mt-auto pt-6 text-sm font-medium text-ink">
                                    Read more →
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>

                <nav
                    className="mt-10 flex flex-wrap items-center justify-center gap-2"
                    aria-label="Pagination"
                >
                    <button
                        type="button"
                        onClick={() => setPage(currentPage - 1)}
                        disabled={currentPage <= 1}
                        className="inline-flex h-10 items-center rounded-xl border border-line bg-surface px-4 text-sm font-medium text-ink transition hover:bg-surface-soft disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Previous page"
                    >
                        Previous
                    </button>

                    {pageNumbers.map((page) => (
                        <button
                            key={page}
                            type="button"
                            onClick={() => setPage(page)}
                            aria-label={`Go to page ${page}`}
                            aria-current={page === currentPage ? "page" : undefined}
                            className={`inline-flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-medium transition ${page === currentPage
                                ? "border-brand/40 bg-brand-soft text-ink"
                                : "border-line bg-surface text-ink hover:bg-surface-soft"
                                }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        type="button"
                        onClick={() => setPage(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                        className="inline-flex h-10 items-center rounded-xl border border-line bg-surface px-4 text-sm font-medium text-ink transition hover:bg-surface-soft disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Next page"
                    >
                        Next
                    </button>
                </nav>
            </>
        );
    }

    return (
        <section aria-label="Blog listing">
            {/* <div className="mb-8">
                <label
                    htmlFor="blog-search"
                    className="mb-2 block text-sm font-medium text-ink"
                >
                    Search articles
                </label>
                <input
                    id="blog-search"
                    type="search"
                    value={queryInput}
                    onChange={(e) => setQueryInput(e.target.value)}
                    placeholder="Search by title or description..."
                    className="h-11 w-full rounded-xl border border-line bg-surface px-4 text-sm text-ink outline-none transition placeholder:text-ink-dim focus:border-brand/40 focus:ring-2 focus:ring-brand/20"
                    aria-label="Search blog posts"
                />
            </div> */}

            {isDebouncing ? (
                <div
                    className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
                    aria-hidden="true"
                >
                    {Array.from({ length: POSTS_PER_PAGE }).map((_, idx) => (
                        <Card key={idx} className="p-6">
                            <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
                            <div className="mt-4 h-6 w-4/5 animate-pulse rounded bg-slate-200" />
                            <div className="mt-3 h-4 w-full animate-pulse rounded bg-slate-200" />
                            <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-slate-200" />
                        </Card>
                    ))}
                </div>
            ) : (
                content
            )}
        </section>
    );
}
