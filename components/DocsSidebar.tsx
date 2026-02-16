import Link from "next/link";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DocsSidebarProps = {
  items: Array<{ title: string; path: string }>;
  currentPath: string;
};

export function DocsSidebar({ items, currentPath }: DocsSidebarProps) {
  return (
    <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
      <Card className="p-4">
        <p className="px-2 pb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#3f537e]">Docs</p>
        <nav className="space-y-1">
          {items.map((item) => (
            <Link
              key={item.path}
              href={`/docs/${item.path}`}
              className={cn(
                "block rounded-xl px-3 py-2 text-sm text-ink-dim transition hover:bg-surface-soft hover:text-ink",
                item.path === currentPath && "bg-surface-soft font-medium text-ink"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </Card>
    </aside>
  );
}
