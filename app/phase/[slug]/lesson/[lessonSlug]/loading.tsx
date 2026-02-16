import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

function SkeletonLine({ className = "" }: { className?: string }) {
  return <div className={`h-4 animate-pulse rounded-md bg-slate-200/80 ${className}`} />;
}

export default function LoadingLessonPage() {
  return (
    <Section className="pt-16 pb-20 md:pt-20" aria-busy="true" aria-live="polite">
      <Container>
        <div className="grid gap-6 md:gap-8 lg:grid-cols-[300px_1fr]">
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <Card className="p-5">
              <SkeletonLine className="h-3 w-24" />
              <SkeletonLine className="mt-3 h-7 w-4/5" />
              <SkeletonLine className="mt-4 w-full" />
              <SkeletonLine className="mt-2 w-5/6" />
              <SkeletonLine className="mt-2 w-2/3" />
            </Card>

            <Card className="p-5">
              <SkeletonLine className="h-3 w-32" />
              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-line bg-surface-soft p-3">
                  <SkeletonLine className="h-3 w-12" />
                  <SkeletonLine className="mt-2 w-5/6" />
                </div>
                <div className="rounded-xl border border-line bg-surface-soft p-3">
                  <SkeletonLine className="h-3 w-12" />
                  <SkeletonLine className="mt-2 w-4/5" />
                </div>
                <div className="rounded-xl border border-line bg-surface-soft p-3">
                  <SkeletonLine className="h-3 w-12" />
                  <SkeletonLine className="mt-2 w-3/4" />
                </div>
              </div>
            </Card>

            <div className="h-11 animate-pulse rounded-2xl border border-line bg-slate-200/70" />
          </aside>

          <Card className="min-w-0 overflow-hidden p-6 md:p-10">
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <SkeletonLine className="h-3 w-16" />
              <SkeletonLine className="h-3 w-1" />
              <SkeletonLine className="h-3 w-20" />
              <SkeletonLine className="h-3 w-1" />
              <SkeletonLine className="h-3 w-40" />
            </div>

            <header className="mb-8 border-b border-line pb-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <SkeletonLine className="h-8 w-4/5 md:h-9" />
                  <SkeletonLine className="mt-4 w-full" />
                  <SkeletonLine className="mt-2 w-5/6" />
                </div>
                <div className="h-10 w-full animate-pulse rounded-xl border border-line bg-slate-200/70 sm:w-32 sm:shrink-0" />
              </div>
            </header>

            <article className="space-y-4">
              <SkeletonLine className="h-5 w-3/4" />
              <SkeletonLine className="w-full" />
              <SkeletonLine className="w-[92%]" />
              <SkeletonLine className="w-[88%]" />

              <div className="pt-3" />

              <SkeletonLine className="h-5 w-2/3" />
              <SkeletonLine className="w-full" />
              <SkeletonLine className="w-[90%]" />
              <SkeletonLine className="w-[86%]" />

              <div className="pt-3" />

              <SkeletonLine className="h-5 w-1/2" />
              <SkeletonLine className="w-full" />
              <SkeletonLine className="w-[94%]" />
              <SkeletonLine className="w-[82%]" />
            </article>

            <div className="mt-10 border-t border-line pt-6">
              <div className="flex flex-wrap gap-3">
                <div className="h-11 w-36 animate-pulse rounded-2xl border border-line bg-slate-200/70" />
                <div className="h-11 w-36 animate-pulse rounded-2xl border border-line bg-slate-200/70 sm:ml-auto" />
              </div>
              <div className="mt-4 h-12 w-full animate-pulse rounded-2xl border border-line bg-slate-200/70" />
            </div>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
