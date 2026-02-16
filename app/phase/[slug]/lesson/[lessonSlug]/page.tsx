import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/Markdown";
import { PhaseLessonNav } from "@/components/PhaseLessonNav";
import { LessonNavigation } from "@/components/LessonNavigation";
import { ShareButton } from "@/components/ShareButton";
import { getAllPhaseLessonParams, getPhaseBySlug, getPhaseLessonBySlug, getPhaseSlugs } from "@/lib/content";
import { getNextLesson, getNextPhase, isLastLessonOfPhase, isLastPhase } from "@/lib/lesson-navigation";

function toPlainText(value: string) {
  return value.replace(/[#_*`>\-\[\]\(\)]/g, " ").replace(/\s+/g, " ").trim();
}

function EmptyState({
  title,
  description,
  actions
}: {
  title: string;
  description: string;
  actions: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface-soft p-6 md:p-8">
      <h2 className="text-2xl font-semibold text-ink">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-dim md:text-base">{description}</p>
      <div className="mt-6 flex flex-wrap gap-3">{actions}</div>
    </div>
  );
}

export async function generateStaticParams() {
  return getAllPhaseLessonParams().map((item) => ({
    slug: item.slug,
    lessonSlug: item.lessonSlug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string; lessonSlug: string }>;
}): Promise<Metadata> {
  const { slug, lessonSlug } = await params;
  const [phase, lesson] = await Promise.all([getPhaseBySlug(slug), getPhaseLessonBySlug(slug, lessonSlug)]);

  if (!lesson || !phase) {
    return {};
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://systemdesigncore.site";
  const canonicalPath = `/phase/${slug}/lesson/${lessonSlug}`;
  const plainDescription = toPlainText(lesson.description || "").slice(0, 160);
  const description =
    plainDescription ||
    `Bài học ${lesson.title} trong ${phase.title}: system design, distributed systems, scalability, reliability và tư duy kiến trúc production.`;
  const title = `${lesson.title} | ${phase.title}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${siteUrl}${canonicalPath}`,
      siteName: "System Design Core"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}

export default async function PhaseLessonPage({ params }: { params: Promise<{ slug: string; lessonSlug: string }> }) {
  const { slug, lessonSlug } = await params;
  const [phase, lesson] = await Promise.all([getPhaseBySlug(slug), getPhaseLessonBySlug(slug, lessonSlug)]);

  if (!phase) {
    return (
      <Section className="pt-16 pb-20 md:pt-20">
        <Container>
          <div className="grid gap-6 md:gap-8 lg:grid-cols-[300px_1fr]">
            <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
              <Card className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#3f537e]">Learning Phase</p>
                <p className="mt-3 text-lg font-semibold text-ink">Phase not found</p>
                <p className="mt-3 text-sm leading-7 text-ink-dim">Không thể tải thông tin phase cho đường dẫn hiện tại.</p>
              </Card>
            </aside>

            <Card className="min-w-0 overflow-hidden p-6 md:p-10">
              <EmptyState
                title="Phase not found"
                description="The requested phase does not exist or may have been moved."
                actions={
                  <Button href="/roadmap" aria-label="Back to roadmap">
                    Back to roadmap
                  </Button>
                }
              />
            </Card>
          </div>
        </Container>
      </Section>
    );
  }

  if (!lesson) {
    return (
      <Section className="pt-16 pb-20 md:pt-20">
        <Container>
          <div className="grid gap-6 md:gap-8 lg:grid-cols-[300px_1fr]">
            <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
              <Card className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#3f537e]">{phase.title}</p>
                <p className="mt-3 text-xl font-semibold text-ink">Lesson not found</p>
                <p className="mt-3 text-sm leading-7 text-ink-dim">Bài học này không tồn tại trong phase hiện tại.</p>
              </Card>

              <PhaseLessonNav phase={phase} />

              <Button href={`/phase/${phase.slug}`} className="w-full" variant="ghost">
                <ArrowLeft className="h-4 w-4" />
                Tổng quan phase
              </Button>
            </aside>

            <Card className="min-w-0 overflow-hidden p-6 md:p-10">
              <EmptyState
                title="Lesson not found"
                description="The lesson may have been removed or the link is incorrect."
                actions={
                  <>
                    <Button href={`/phase/${phase.slug}`} variant="ghost" aria-label="Back to phase overview">
                      Back to phase overview
                    </Button>
                    <Button href="/roadmap" aria-label="Back to roadmap">
                      Back to roadmap
                    </Button>
                  </>
                }
              />
            </Card>
          </div>
        </Container>
      </Section>
    );
  }

  const currentIndex = phase.lessons.findIndex((item) => item.slug === lessonSlug);
  const previousLesson = currentIndex > 0 ? phase.lessons[currentIndex - 1] : null;
  const nextLesson = getNextLesson(phase, lessonSlug);
  const lastLessonOfPhase = isLastLessonOfPhase(phase, lessonSlug);
  const phaseSlugs = getPhaseSlugs();
  const lastPhase = isLastPhase(slug, phaseSlugs);
  const nextPhase = lastLessonOfPhase && !lastPhase ? await getNextPhase(slug) : null;
  const showNextPhaseCta = lastLessonOfPhase && Boolean(nextPhase);
  const showDonationCta = lastLessonOfPhase && (lastPhase || !nextPhase);
  const hasLessonContent = Boolean(lesson.content && lesson.content.trim().length > 0);

  return (
    <Section className="pt-16 pb-20 md:pt-20">
      <Container>
        <div className="grid gap-6 md:gap-8 lg:grid-cols-[300px_1fr]">
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <Card className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#3f537e]">{phase.title}</p>
              <p className="mt-3 text-xl font-semibold text-ink">{lesson.title}</p>
              <p className="mt-3 text-sm leading-7 text-ink-dim">{lesson.description}</p>
            </Card>

            <PhaseLessonNav phase={phase} activeLessonSlug={lesson.slug} />

            <Button href={`/phase/${phase.slug}`} className="w-full" variant="ghost">
              <ArrowLeft className="h-4 w-4" />
              Tổng quan phase
            </Button>
          </aside>

          <Card className="min-w-0 overflow-hidden p-6 md:p-10">
            <nav aria-label="Lesson breadcrumb" className="mb-6 text-xs text-ink-dim">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/roadmap" className="hover:text-ink">
                    Roadmap
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href={`/phase/${phase.slug}`} className="hover:text-ink">
                    {phase.title}
                  </Link>
                </li>
                <li>/</li>
                <li aria-current="page" className="text-ink">
                  {lesson.title}
                </li>
              </ol>
            </nav>
            <header className="mb-8 border-b border-line pb-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h1 className="text-2xl font-semibold leading-tight text-ink md:text-3xl">{lesson.title}</h1>
                  <p className="mt-3 text-sm leading-7 text-ink-dim md:text-base">{lesson.description}</p>
                </div>
                <ShareButton path={`/phase/${phase.slug}/lesson/${lesson.slug}`} title={lesson.title} description={lesson.description} className="sm:shrink-0" />
              </div>
            </header>
            <article aria-label={`Nội dung bài học ${lesson.title}`}>
              {hasLessonContent ? (
                <Markdown source={lesson.content} />
              ) : (
                <EmptyState
                  title="Content is not available yet."
                  description="Nội dung chi tiết của bài học này đang được cập nhật. Bạn vẫn có thể xem mô tả và tiếp tục điều hướng sang các bài liên quan."
                  actions={
                    <>
                      <Button href={`/phase/${phase.slug}`} variant="ghost" aria-label="Back to phase overview">
                        Back to phase overview
                      </Button>
                      <Button href="/roadmap" aria-label="Back to roadmap">
                        Back to roadmap
                      </Button>
                    </>
                  }
                />
              )}
            </article>
            <LessonNavigation
              phaseSlug={phase.slug}
              previousLesson={previousLesson}
              nextLesson={nextLesson}
              nextPhase={nextPhase}
              showNextPhaseCta={showNextPhaseCta}
              showDonationCta={showDonationCta}
            />
          </Card>
        </div>
      </Container>
    </Section>
  );
}
