import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return <p className={cn("text-xs font-semibold uppercase tracking-[0.16em] text-[#3f537e]", className)} {...props} />;
}

export function Lead({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return <p className={cn("text-lg leading-8 text-ink-dim", className)} {...props} />;
}
