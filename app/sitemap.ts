import type { MetadataRoute } from "next";
import { getAllPhaseLessonParams, getDocSlugs, getPhaseSlugs } from "@/lib/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://systemdesigncore.site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/roadmap", "/about", "/docs/getting-started"];
  const phaseRoutes = getPhaseSlugs().map((slug) => `/phase/${slug}`);
  const lessonRoutes = getAllPhaseLessonParams().map((item) => `/phase/${item.slug}/lesson/${item.lessonSlug}`);
  const docRoutes = getDocSlugs().map((slug) => `/docs/${slug.join("/")}`);

  return [...staticRoutes, ...phaseRoutes, ...lessonRoutes, ...docRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date()
  }));
}
