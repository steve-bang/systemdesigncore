export type PhaseMeta = {
  slug: string;
  title: string;
  subtitle: string;
  focus: string[];
};
export const PHASES: PhaseMeta[] = [
  {
    slug: "phase-0",
    title: "Mental Model Shift",
    subtitle: "Chuyển từ developer mindset sang architect thinking và system-level reasoning.",
    focus: [
      "Problem-first vs Code-first thinking",
      "Trade-off mindset & decision making",
      "System components & communication",
      "Distributed system intuition",
      "Architecture reasoning fundamentals"
    ]
  },
  {
    slug: "phase-1",
    title: "Foundation — Thinking in Systems",
    subtitle: "Xây nền tảng tư duy hệ thống: data flow, bottleneck và performance fundamentals.",
    focus: [
      "System components trong web architecture",
      "Sync vs Async communication",
      "Data flow & bottleneck analysis",
      "Latency, Throughput, Availability",
      "CAP theorem & capacity thinking"
    ]
  },
  {
    slug: "phase-2",
    title: "Core Building Blocks",
    subtitle: "Nắm các building blocks quan trọng để thiết kế hệ thống production-scale.",
    focus: [
      "Load balancing & traffic distribution",
      "Caching strategies & performance layer",
      "Database scaling fundamentals",
      "Message queues & async processing",
      "Component integration & trade-offs"
    ]
  },
  {
    slug: "phase-3",
    title: "Distributed Systems Fundamentals",
    subtitle: "Hiểu bản chất hệ thống phân tán: consistency, failure và distributed coordination.",
    focus: [
      "Failure models & distributed system reality",
      "Strong vs Eventual consistency",
      "Consensus & leader election",
      "Distributed transactions & data integrity",
      "Distributed ID & ordering"
    ]
  },
  {
    slug: "phase-4",
    title: "Scalability & Performance",
    subtitle: "Thiết kế hệ thống chịu tải lớn, tối ưu performance và đảm bảo reliability.",
    focus: [
      "Performance & bottleneck thinking",
      "Caching strategy & CDN / Edge computing",
      "Database optimization & sharding",
      "Rate limiting & load control",
      "Monitoring, observability & performance debugging"
    ]
  },
  {
    slug: "phase-5",
    title: "Real-World Architecture Patterns",
    subtitle: "Áp dụng kiến thức vào các architecture pattern thực tế và production systems.",
    focus: [
      "Architecture evolution mindset",
      "Read-heavy system design",
      "Social / feed systems & fanout architecture"
    ]
  },
  {
    slug: "phase-6",
    title: "System Design Mastery",
    subtitle: "Đạt architect-level thinking và khả năng thiết kế hệ thống ở mức senior.",
    focus: [
      "System design thinking framework",
      "SNAKE interview methodology",
      "Architecture decision making & trade-offs",
      "Real system design interview strategy",
      "Advanced architecture topics",
      "Architect mindset & production thinking"
    ]
  }
];

