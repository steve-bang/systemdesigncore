import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PhaseAccordion } from "@/components/PhaseAccordion";
import { PHASES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "Lộ trình học System Design từ Phase 0 đến Phase 6"
};

export default function RoadmapPage() {
  return (
    <Section className="pt-16 pb-20 md:pt-20">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3f537e]">Roadmap Overview</p>
        <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold text-ink md:text-5xl">Hành trình học System Design từ Zero đến Hero</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-dim">
          Mỗi phase là một cấp độ năng lực. Bạn có thể mở từng phase để xem mục tiêu, trọng tâm kiến thức và truy cập nhanh vào trang học chi tiết.
        </p>
        <div className="mt-10">
          <PhaseAccordion phases={PHASES} />
        </div>
      </Container>
    </Section>
  );
}
