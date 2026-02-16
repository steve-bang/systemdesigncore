import type { Metadata } from "next";
import { Be_Vietnam_Pro, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"]
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://systemdesigncore.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lộ Trình System Design: Từ Zero Đến Hero",
    template: "%s | System Design Core"
  },
  description:
    "Nền tảng học System Design bằng tiếng Việt dành cho lập trình viên từ beginner đến senior: lộ trình rõ ràng, nội dung thực chiến, tối ưu cho phỏng vấn.",
  keywords: [
    "system design",
    "lộ trình system design",
    "phỏng vấn system design",
    "backend architecture",
    "distributed systems",
    "System Design Core"
  ],
  openGraph: {
    title: "Lộ Trình System Design: Từ Zero Đến Hero",
    description:
      "Nền tảng học System Design bằng tiếng Việt cho developer muốn đi từ nền tảng đến kiến trúc quy mô lớn.",
    type: "website",
    locale: "vi_VN",
    siteName: "System Design Core",
    url: siteUrl
  },
  twitter: {
    card: "summary_large_image",
    title: "Lộ Trình System Design: Từ Zero Đến Hero",
    description: "Roadmap học System Design bằng tiếng Việt từ zero đến mastery."
  },
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: siteUrl
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${beVietnamPro.variable} ${spaceGrotesk.variable} bg-canvas text-ink antialiased`}>
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(1000px_500px_at_10%_-10%,rgba(52,122,255,0.18),transparent_55%),radial-gradient(900px_450px_at_100%_0%,rgba(99,102,241,0.12),transparent_50%)]" />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
