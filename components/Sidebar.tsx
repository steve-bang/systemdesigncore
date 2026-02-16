import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export function Sidebar({ className, ...props }: ComponentPropsWithoutRef<"aside">) {
  return <aside className={cn("glass-card p-4", className)} {...props} />;
}
