import Link from "next/link";
import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface/60 py-10">
      <Container className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-ink-dim">© {new Date().getFullYear()} System Design Core. All rights reserved.</p>
        <div className="flex items-center gap-5 text-sm text-ink-dim">
          <Link href="/roadmap" className="hover:text-ink">
            Roadmap
          </Link>
          <Link href="/docs/getting-started" className="hover:text-ink">
            Docs
          </Link>
          <Link href="https://github.com" className="hover:text-ink">
            GitHub
          </Link>
        </div>
      </Container>
    </footer>
  );
}
