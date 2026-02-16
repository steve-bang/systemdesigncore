"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Route } from "next";

export const routes = {
  roadmap: "/roadmap" as Route,
  docs: "/docs/getting-started" as Route,
  blog: "/blog" as Route,
  about: "/about" as Route
};

const navItems = [
  { href: routes.roadmap, label: "Roadmap" },
  { href: routes.docs, label: "Docs" },
  { href: routes.blog, label: "Blog" },
  { href: routes.about, label: "About" }
];


export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-canvas/80 backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-sm font-semibold uppercase tracking-[0.16em] text-ink">
            SystemDesign Core
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium text-ink-dim transition hover:text-ink",
                  pathname.startsWith(item.href) && "text-ink"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button href={"/docs/getting-started" as Route} size="md">
              Bắt đầu học
            </Button>
          </div>

          <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line md:hidden" onClick={() => setOpen((v) => !v)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-line py-4 md:hidden">
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-2 text-sm text-ink-dim hover:bg-surface hover:text-ink"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button href={"/docs/getting-started" as Route} className="mt-2 w-full" onClick={() => setOpen(false)}>
                Bắt đầu học
              </Button>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
