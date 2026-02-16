import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/Markdown";
import { PhaseLessonNav } from "@/components/PhaseLessonNav";
import { getPhaseBySlug, getPhaseSlugs } from "@/lib/content";

export async function generateStaticParams() {
  return getPhaseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const phase = await getPhaseBySlug(slug);

  if (!phase) {
    return {};
  }

  return {
    title: phase.title,
    description: phase.description
  };
}

export default async function PhaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const phase = await getPhaseBySlug(slug);

  if (!phase) {
    notFound();
  }

  return (
    <Section className="pt-16 pb-20 md:pt-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <Card className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#3f537e]">Learning Phase</p>
              <h1 className="mt-3 text-2xl font-semibold text-ink">{phase.title}</h1>
              <p className="mt-4 text-sm leading-7 text-ink-dim">{phase.description}</p>
              <div className="mt-6 h-2 rounded-full bg-[#dce5fb]">
                <div className="h-full rounded-full bg-brand" style={{ width: `${phase.progress}%` }} />
              </div>
              <p className="mt-2 text-xs text-ink-dim">Tiến độ gợi ý: {phase.progress}%</p>
            </Card>

            <PhaseLessonNav phase={phase} />

            <Button href="/roadmap" className="w-full" variant="ghost">
              Quay lại roadmap
              <ArrowRight className="h-4 w-4" />
            </Button>
          </aside>

          <Card className="p-6 md:p-10">
            <Markdown source={phase.content} />
          </Card>
        </div>
      </Container>
    </Section>
  );
}
