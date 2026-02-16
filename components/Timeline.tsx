import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PhaseMeta } from "@/lib/site";

type TimelineProps = {
  phases: PhaseMeta[];
  compact?: boolean;
};

export function Timeline({ phases, compact = false }: TimelineProps) {
  return (
    <ol className="space-y-4">
      {phases.map((phase, index) => (
        <li key={phase.slug} className="relative pl-10">
          <span className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">{index}</span>
          {index < phases.length - 1 && <span className="absolute left-[11px] top-8 h-[calc(100%-12px)] w-px bg-line" />}
          <div className="rounded-2xl border border-line bg-surface-soft p-4">
            <p className="text-sm font-semibold text-ink">{phase.title}</p>
            <p className="mt-1 text-sm text-ink-dim">{phase.subtitle}</p>
            {!compact && (
              <Link href={`/phase/${phase.slug}`} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand">
                Xem phase
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
