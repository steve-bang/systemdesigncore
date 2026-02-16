import Link from "next/link";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PhaseContent } from "@/lib/content";

type PhaseLessonNavProps = {
  phase: PhaseContent;
  activeLessonSlug?: string;
};

export function PhaseLessonNav({ phase, activeLessonSlug }: PhaseLessonNavProps) {
  return (
    <Card className="p-5">
      <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#3f537e]">Bài học trong phase</h2>
      {phase.lessons.length === 0 ? (
        <p className="mt-4 text-sm leading-7 text-ink-dim">Nội dung bài học đang được cập nhật.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {phase.lessons.map((lesson, index) => {
            const href = `/phase/${phase.slug}/lesson/${lesson.slug}`;
            const isActive = activeLessonSlug === lesson.slug;
            const cardClasses = cn(
              "block rounded-xl border border-line bg-surface-soft p-3 transition",
              lesson.hasContent ? "hover:border-brand/40 hover:bg-white" : "cursor-not-allowed opacity-80",
              isActive && "border-brand/50 bg-brand-soft"
            );

            return (
              <li key={lesson.slug}>
                {lesson.hasContent ? (
                  <Link href={href} className={cardClasses}>
                    <p className="text-xs text-ink-dim">Bài {index + 1}</p>
                    <p className="mt-1 text-sm font-medium text-ink">{lesson.title}</p>
                    {/* {lesson.description ? <p className="mt-1 text-xs text-ink-dim">{lesson.description}</p> : null} */}
                  </Link>
                ) : (
                  <div className={cardClasses}>
                    <p className="text-xs text-ink-dim">Bài {index + 1}</p>
                    <p className="mt-1 text-sm font-medium text-ink">{lesson.title}</p>
                    <p className="mt-1 text-xs text-ink-dim">Sắp cập nhật</p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
