import type { Metadata, Route } from "next";
import { ArrowRight, HeartHandshake, Lightbulb, Target } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Steve",
  description:
    "Tìm hiểu về Steve và sứ mệnh giúp developer Việt học System Design, software architecture và chuyển đổi tư duy từ code-focused sang product & system thinking.",
  keywords: [
    "Steve Bang",
    "system design",
    "software architecture",
    "developer mindset",
    "learning system design",
    "backend engineering",
    "product thinking"
  ]
};

const learnItems = [
  "Cách phân tích bài toán theo tư duy system design thay vì lao vào code ngay.",
  "Cách nhìn software architecture qua trade-off: hiệu năng, độ tin cậy, chi phí và tốc độ phát triển.",
  "Cách suy nghĩ như một engineer giải quyết vấn đề thực tế, không chỉ hoàn thành task kỹ thuật.",
  "Cách học có hệ thống từ beginner đến senior với lộ trình rõ ràng, áp dụng được trong công việc và phỏng vấn."
];

const principles = [
  {
    title: "Không có giải pháp hoàn hảo",
    content: "Mỗi quyết định kiến trúc đều có giá của nó. Mục tiêu là chọn giải pháp phù hợp nhất với bối cảnh hiện tại."
  },
  {
    title: "Problem-first mindset",
    content: "Trước khi chọn công nghệ, cần làm rõ vấn đề, constraint và outcome mong muốn. Tool chỉ là phương tiện."
  },
  {
    title: "Trade-off thinking",
    content: "Tư duy system design là khả năng nhìn thấy được - mất, và giải thích rõ vì sao chấp nhận trade-off đó."
  },
  {
    title: "Product thinking",
    content: "Engineering tốt không dừng ở code đúng, mà là tạo ra giá trị thật cho user và business trong dài hạn."
  }
];

export default function AboutPage() {
  return (
    <>
      <Section className="pt-16 pb-10 md:pt-20">
        <Container>
          <Card className="relative overflow-hidden p-8 md:p-12">
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(47,107,255,0.22),transparent_65%)]" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#3f537e]">About Steve</p>
              <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-tight text-ink md:text-5xl">
                Mình là Steve, một software developer đang xây dựng nền tảng học System Design cho cộng đồng developer.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-dim">
                Website này được tạo ra với một mục tiêu rõ ràng: giúp anh em dev chuyển từ tư duy code-focused sang product & system thinking,
                để đi đường dài hơn trong sự nghiệp kỹ sư phần mềm.
              </p>
            </div>
          </Card>
        </Container>
      </Section>

      <Section className="py-8 md:py-10">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-7 md:p-9">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
                <HeartHandshake className="h-4 w-4 text-brand" />
                Câu chuyện của mình
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-ink">Vì sao mình xây platform này?</h2>
              <p className="mt-5 text-base leading-8 text-ink-dim">
                Mình từng thấy rất nhiều developer giỏi code nhưng bị chững lại khi cần tư duy hệ thống: không biết bắt đầu từ đâu, không rõ cách đánh đổi,
                và khó kết nối kỹ thuật với giá trị sản phẩm.
              </p>
              <p className="mt-4 text-base leading-8 text-ink-dim">
                Trong thực tế engineering, System Design không phải phần "nâng cao để biết cho vui". Đó là kỹ năng cốt lõi để bạn thiết kế hệ thống bền vững,
                ra quyết định tốt hơn, và trưởng thành từ người implement thành người dẫn dắt kỹ thuật.
              </p>
              <p className="mt-4 text-base leading-8 text-ink-dim">
                Mình xây website này để chia sẻ trải nghiệm thật, bài học thật, và giúp community học theo cách dễ hiểu nhưng đủ chiều sâu.
              </p>
            </Card>

            <Card className="p-7 md:p-9">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
                <Target className="h-4 w-4 text-brand" />
                Bạn sẽ học được gì ở đây
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-ink">Practical learning cho developer</h2>
              <ul className="mt-6 space-y-4">
                {learnItems.map((item) => (
                  <li key={item} className="rounded-2xl border border-line bg-surface-soft px-4 py-3 text-sm leading-7 text-ink-dim">
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="py-8 md:py-10">
        <Container>
          <Card className="p-8 md:p-11">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
              <Lightbulb className="h-4 w-4 text-brand" />
              Philosophy / Teaching Approach
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-ink">Cách mình dạy và cách bạn nên học</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {principles.map((item) => (
                <div key={item.title} className="rounded-2xl border border-line bg-surface-soft p-5">
                  <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-dim">{item.content}</p>
                </div>
              ))}
            </div>
          </Card>
        </Container>
      </Section>

      <Section className="pt-8 pb-20 md:pb-24">
        <Container>
          <Card className="p-8 md:p-12">
            <h2 className="text-3xl font-semibold text-ink md:text-4xl">Tầm nhìn dài hạn</h2>
            <p className="mt-5 max-w-4xl text-base leading-8 text-ink-dim md:text-lg">
              Mình muốn xây một hệ sinh thái học System Design bằng tiếng Việt đủ thực tế, đủ chiều sâu, và đủ gần gũi để bất kỳ developer nào cũng có thể đi từ
              "biết code" đến "biết tư duy kiến trúc". Khi cộng đồng nâng chuẩn tư duy, chúng ta không chỉ code tốt hơn mà còn xây được sản phẩm tốt hơn.
            </p>

            <div className="mt-8 rounded-2xl border border-brand/20 bg-brand-soft/60 p-6">
              <h3 className="text-xl font-semibold text-ink">Nếu bạn đang trên hành trình này, mình rất vui được đồng hành.</h3>
              <p className="mt-3 text-sm leading-7 text-ink-dim md:text-base">
                Bắt đầu từ phase đầu tiên, học đều, và luyện cách đặt câu hỏi đúng. System Design là kỹ năng có thể rèn được, từng bước một.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button href="/roadmap" size="lg">
                  Bắt đầu lộ trình học
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href={"/docs/getting-started" as Route} size="lg" variant="ghost">
                  Xem hướng dẫn học
                </Button>
              </div>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
