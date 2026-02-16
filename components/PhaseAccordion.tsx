"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import type { PhaseMeta } from "@/lib/site";
import { cn } from "@/lib/utils";

type PhaseAccordionProps = {
  phases: PhaseMeta[];
};

export function PhaseAccordion({ phases }: PhaseAccordionProps) {
  const [openSlug, setOpenSlug] = useState(phases[0]?.slug);

  return (
    <div className="space-y-4">
      {phases.map((phase, index) => {
        const open = openSlug === phase.slug;

        return (
          <div key={phase.slug} className="glass-card overflow-hidden">
            <button
              className="flex w-full items-center justify-between gap-4 p-6 text-left md:p-7"
              onClick={() => setOpenSlug(open ? "" : phase.slug)}
              aria-expanded={open}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#3f537e]">Phase {index}</p>
                <h2 className="mt-2 text-2xl font-semibold text-ink">{phase.title}</h2>
                <p className="mt-2 text-sm leading-7 text-ink-dim">{phase.subtitle}</p>
              </div>
              <ChevronDown className={cn("h-5 w-5 shrink-0 text-ink-dim transition", open && "rotate-180")} />
            </button>
            {open && (
              <div className="border-t border-line px-6 pb-6 pt-5 md:px-7 md:pb-7">
                <div className="grid gap-3 md:grid-cols-2">
                  {phase.focus.map((item) => (
                    <div key={item} className="rounded-xl border border-line bg-surface-soft px-4 py-3 text-sm text-ink-dim">
                      {item}
                    </div>
                  ))}
                </div>
                <Link href={`/phase/${phase.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand">
                  Truy cập phase chi tiết
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
