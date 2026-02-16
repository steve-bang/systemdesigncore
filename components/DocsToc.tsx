import Link from "next/link";
import { Card } from "@/components/ui/card";

type TocItem = {
  id: string;
  title: string;
  level: 2 | 3;
};

export function DocsToc({ items }: { items: TocItem[] }) {
  if (!items.length) {
    return null;
  }

  return (
    <aside className="hidden xl:block xl:sticky xl:top-24 xl:self-start">
      <Card className="p-4">
        <p className="px-2 pb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#3f537e]">Mục lục</p>
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={`#${item.id}`}
                className={`block rounded-lg px-2 py-1.5 text-sm text-ink-dim hover:bg-surface-soft hover:text-ink ${item.level === 3 ? "ml-3" : ""}`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </aside>
  );
}
