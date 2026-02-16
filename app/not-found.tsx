import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Section className="min-h-[calc(100vh-8rem)] py-0">
      <Container className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <main className="w-full max-w-2xl text-center" role="main" aria-labelledby="not-found-title">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#3f537e]">Error 404</p>
          <h1 id="not-found-title" className="mt-3 text-6xl font-semibold tracking-tight text-ink sm:text-7xl">
            404
          </h1>
          <h2 className="mt-5 text-2xl font-semibold text-ink sm:text-3xl">Page not found</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-ink-dim">
            Trang bạn đang tìm không tồn tại, có thể đã được đổi đường dẫn hoặc xóa khỏi hệ thống.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/" aria-label="Back to Home">
              Back to Home
            </Button>
            <Button href="/roadmap" variant="ghost" aria-label="Go to Roadmap">
              Go to Roadmap
            </Button>
          </div>

          <p className="mt-6 text-sm text-ink-dim">Nếu bạn mở liên kết từ tài liệu cũ, hãy kiểm tra lại URL hoặc quay về trang chủ.</p>
        </main>
      </Container>
    </Section>
  );
}
