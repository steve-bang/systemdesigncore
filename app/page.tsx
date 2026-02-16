import { ArrowRight, CheckCircle2, PlayCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Timeline } from "@/components/Timeline";
import { PHASES } from "@/lib/site";
import { Route } from "next";

const trustSignals = [
  "Học theo lộ trình chuẩn interview",
  "Bám sát tư duy backend thực tế",
  "Tài liệu tiếng Việt, dễ áp dụng"
];

export default function HomePage() {
  return (
    <>
      <Section className="pt-14 md:pt-20">
        <Container>
          <div className="glass-card relative overflow-hidden p-8 md:p-14">
            <div className="absolute right-[-10%] top-[-30%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(47,107,255,0.24),transparent_65%)]" />
            <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#2b4f98]">
                  <ShieldCheck className="h-4 w-4" />
                  Nền tảng học System Design cho Developer
                </p>
                <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-tight text-ink md:text-6xl">
                  LỘ TRÌNH SYSTEM DESIGN: TỪ ZERO ĐẾN HERO
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-dim md:text-xl">
                  Hệ thống học theo phase từ nền tảng đến kiến trúc quy mô lớn. Tập trung vào tư duy thiết kế, trade-off và khả năng giải bài phỏng vấn.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Button href="/roadmap" size="lg">
                    Xem lộ trình học
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                  <Button href={"/docs/getting-started" as Route} variant="ghost" size="lg">
                    <PlayCircle className="h-5 w-5" />
                    Bắt đầu ngay
                  </Button>
                </div>
                <div className="mt-10 grid gap-3 md:grid-cols-3">
                  {trustSignals.map((signal) => (
                    <div key={signal} className="flex items-start gap-2 text-sm text-ink-dim">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-brand" />
                      <span>{signal}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="p-6 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#3f537e]">Roadmap Preview</p>
                <div className="mt-6 space-y-4">
                  {PHASES.slice(0, 4).map((phase, index) => (
                    <div key={phase.slug} className="rounded-2xl border border-line bg-surface-soft p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-medium text-ink">{phase.title}</p>
                        <p className="text-xs text-ink-dim">{12 + index * 8}%</p>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-[#d9e3fa]">
                        <div className="h-full rounded-full bg-brand" style={{ width: `${12 + index * 8}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#3f537e]">Mentor</p>
              <h2 className="mt-4 text-3xl font-semibold text-ink">Giới thiệu mentor</h2>
              <p className="mt-5 text-base leading-8 text-ink-dim">
                Mentor tập trung vào việc giúp bạn chuyển đổi từ tư duy code feature sang tư duy thiết kế hệ thống. Nội dung đi từ nguyên lý cốt lõi,
                lên đến phân tích bottleneck, phân tách service và chiến lược scale.
              </p>
              <div className="mt-7 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-line bg-surface-soft p-4">
                  <p className="text-sm font-medium text-ink">Interview-first</p>
                  <p className="mt-2 text-sm leading-6 text-ink-dim">Rèn khung tư duy để trả lời system design interview rõ ràng, có cấu trúc.</p>
                </div>
                <div className="rounded-2xl border border-line bg-surface-soft p-4">
                  <p className="text-sm font-medium text-ink">Production mindset</p>
                  <p className="mt-2 text-sm leading-6 text-ink-dim">Chú trọng đánh đổi thực tế: latency, throughput, consistency, cost.</p>
                </div>
              </div>
            </Card>
            <Card className="p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#3f537e]">Lộ trình</p>
              <h2 className="mt-4 text-3xl font-semibold text-ink">Tổng quan hành trình học</h2>
              <p className="mt-5 text-base leading-8 text-ink-dim">Đi theo phase giúp bạn nắm chắc nền tảng trước khi đi vào distributed systems và architecture patterns.</p>
              <div className="mt-6">
                <Timeline phases={PHASES.slice(0, 5)} compact />
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="pb-20">
        <Container>
          <Card className="p-8 md:p-12">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <h2 className="section-title">Sẵn sàng bắt đầu phase đầu tiên?</h2>
                <p className="section-subtitle">Chọn phase phù hợp để học theo nhịp riêng của bạn và theo dõi tiến độ từng bước.</p>
              </div>
              <Button href={"/phase/phase-0" as Route} size="lg">
                Vào Phase 0
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
