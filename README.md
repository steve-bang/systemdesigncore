# LỘ TRÌNH SYSTEM DESIGN: TỪ ZERO ĐẾN HERO

A modern educational platform for Vietnamese developers to learn **System Design** from beginner to advanced through a structured, phase-based roadmap.

Built with a premium, reading-focused UX and clean architecture, this project is designed for:

- Backend developers
- Software engineers preparing for system design interviews
- Developers who want to level up from implementation mindset to architecture mindset

---

## 📸 Demo / Screenshots

> Add your live demo URL and screenshots here.

- Demo: `https://your-domain.com`
- Landing page screenshot: `./public/screenshots/landing.png`
- Docs page screenshot: `./public/screenshots/docs.png`

---

## ✨ Features

- Structured roadmap from **Phase 0 → Phase 6**
- Clean, premium UI inspired by modern SaaS product design
- Reading-first documentation experience with MDX
- Sticky navigation, sidebar, and table of contents for long-form learning
- Phase detail pages with learning objectives and lesson lists
- Responsive design (mobile, tablet, desktop)
- SEO-ready metadata, robots, and sitemap
- Content-driven architecture (Markdown/MDX as source of truth)
- Maintainable component-based design system

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Content | MDX + gray-matter |
| Markdown Rendering | next-mdx-remote (RSC) |
| Utilities | clsx + tailwind-merge |
| SEO | Next Metadata API, `robots.ts`, `sitemap.ts` |

---

## 🗂️ Project Structure

```bash
.
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── roadmap/page.tsx
│   ├── phase/[slug]/page.tsx
│   ├── docs/[...slug]/page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── ui/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Timeline.tsx
│   ├── PhaseAccordion.tsx
│   └── Markdown.tsx
├── content/
│   ├── phases/
│   │   ├── phase-0/index.mdx
│   │   ├── phase-1/index.mdx
│   │   └── ...
│   └── docs/
│       ├── getting-started.mdx
│       └── interview/preparation.mdx
├── lib/
│   ├── content.ts
│   ├── mdx.ts
│   ├── toc.ts
│   ├── site.ts
│   └── utils.ts
├── styles/
└── tailwind.config.ts
```

---

## 🚀 Installation

### 1) Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2) Install dependencies

```bash
npm install
```

> You can also use `pnpm install` or `yarn install`.

---

## 💻 Local Development

Run the development server:

```bash
npm run dev
```

Open:

- [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Build & Production

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm run start
```

Lint:

```bash
npm run lint
```

---

## 📝 Content Management (MDX)

All learning content is file-based and lives under `content/`.

### Add a new phase lesson

1. Create or update an MDX file in:

```bash
content/phases/<phase-slug>/index.mdx
```

2. Use frontmatter for metadata:

```md
---
title: "Phase 2 — Core Building Blocks"
description: "Understand core building blocks in modern systems."
progress: 38
lessons:
  - "Caching strategy"
  - "Queue and async processing"
  - "Database indexing"
---
```

3. Write content using Markdown + code blocks:

```md
## Learning Objectives

- Understand data flow.
- Compare trade-offs.
 
~~~ts
export type Constraint = {
  qps: number;
  latencyMs: number;
};
~~~
```

### Add a new docs article

Create a file:

```bash
content/docs/<path>.mdx
```

Example:

```bash
content/docs/interview/preparation.mdx
```

---

## 🔍 SEO & Performance

This project includes production-grade SEO and performance foundations:

- Semantic HTML structure
- Route-level metadata with Next.js Metadata API
- Open Graph + Twitter card metadata
- `robots.ts` and `sitemap.ts` generation
- MDX content architecture for indexable long-form pages
- Server Components by default for efficient rendering
- Minimal, optimized UI with readable typography and strong information hierarchy

---

## 🌐 Deployment Guide

### Deploy on Vercel (recommended)

1. Push repository to GitHub.
2. Import project in Vercel.
3. Configure environment variables (if needed).
4. Deploy.

### Environment variables

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Other platforms

You can deploy to any Node.js-compatible environment that supports Next.js.

---

## 🧭 Learning Roadmap

The curriculum is designed as a progressive journey:

- **Phase 0 — Mental Model Shift**  
  Move from coding mindset to system thinking and trade-offs.

- **Phase 1 — Foundation**  
  Build core knowledge: latency, throughput, networking, and estimation.

- **Phase 2 — Core Building Blocks**  
  Learn cache, queue, storage, and key backend components.

- **Phase 3 — Distributed Systems**  
  Understand replication, consistency, partitioning, and reliability.

- **Phase 4 — Scalability & Performance**  
  Design systems for scale, resilience, and observability.

- **Phase 5 — Architecture Patterns**  
  Apply practical patterns: event-driven, CQRS, microservices, API gateway.

- **Phase 6 — Mastery**  
  Practice advanced interview design, architecture critique, and decision narrative.

---

## 🛠️ Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feat/your-feature
```

3. Commit your changes

```bash
git commit -m "feat: add your feature"
```

4. Push branch and open a Pull Request

Please keep PRs focused, documented, and aligned with the project’s design and content standards.

---

## 📄 License

This project is licensed under the **MIT License**.  
Add a `LICENSE` file at the root if not already present.

---

## 👤 Author

**Your Name**

- GitHub: [@your-username](https://github.com/your-username)
- Website: [your-site.com](https://your-site.com)

---

## 🙏 Acknowledgements

- Inspired by high-quality product experiences from Stripe, Linear, Vercel, and Notion Docs
- Built to support Vietnamese developers on the system design journey
