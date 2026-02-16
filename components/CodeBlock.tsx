import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export function CodeBlock({ className, ...props }: ComponentPropsWithoutRef<"pre">) {
  return <pre className={cn("overflow-x-auto rounded-2xl border border-[#1a2440] bg-[#0f172e] p-5 text-sm text-[#d8e7ff]", className)} {...props} />;
}
