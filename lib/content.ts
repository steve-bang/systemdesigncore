import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { PHASES } from "@/lib/site";

const contentRoot = path.join(process.cwd(), "content");
const phasesRoot = path.join(contentRoot, "phases");
const docsRoot = path.join(contentRoot, "docs");

type PhaseLessonMeta = {
  slug: string;
  title: string;
  description: string;
  order: number;
  hasContent: boolean;
};

export type PhaseLesson = PhaseLessonMeta & {
  content: string;
};

export type PhaseContent = {
  slug: string;
  title: string;
  description: string;
  content: string;
  progress: number;
  lessons: PhaseLessonMeta[];
};

type DocContent = {
  title: string;
  description: string;
  slug: string[];
  content: string;
};

function readMdxFile(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf8");
  return matter(raw);
}

function getLessonDir(phaseSlug: string) {
  return path.join(phasesRoot, phaseSlug, "lessons");
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getLessonsForPhase(phaseSlug: string): PhaseLessonMeta[] {
  const lessonDir = getLessonDir(phaseSlug);
  if (!fs.existsSync(lessonDir)) {
    return [];
  }

  const lessons = fs
    .readdirSync(lessonDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => {
      const slug = entry.name.replace(/\.mdx$/, "");
      const filePath = path.join(lessonDir, entry.name);
      const { data } = readMdxFile(filePath);

      return {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ""),
        order: Number(data.order ?? 999),
        hasContent: true
      };
    });

  return lessons.sort((a, b) => a.order - b.order);
}

export function getPhaseSlugs() {
  if (!fs.existsSync(phasesRoot)) {
    return PHASES.map((phase) => phase.slug);
  }

  const folderSlugs = fs
    .readdirSync(phasesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^phase-\d+$/.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => {
      const aNumber = Number(a.replace("phase-", ""));
      const bNumber = Number(b.replace("phase-", ""));
      return aNumber - bNumber;
    });

  return folderSlugs.length > 0 ? folderSlugs : PHASES.map((phase) => phase.slug);
}

export function getAllPhaseLessonParams() {
  return getPhaseSlugs().flatMap((slug) =>
    getLessonsForPhase(slug).map((lesson) => ({
      slug,
      lessonSlug: lesson.slug
    }))
  );
}

export function getPhaseLessonSlugs(phaseSlug: string) {
  return getLessonsForPhase(phaseSlug).map((lesson) => lesson.slug);
}

export async function getPhaseBySlug(slug: string): Promise<PhaseContent | null> {
  const phaseMeta = PHASES.find((phase) => phase.slug === slug);

  const phaseDir = path.join(phasesRoot, slug);
  const indexFile = path.join(phaseDir, "index.mdx");

  if (!fs.existsSync(indexFile)) {
    return null;
  }

  const { data, content } = readMdxFile(indexFile);
  const fileLessons = getLessonsForPhase(slug);
  const fallbackLessons = Array.isArray(data.lessons)
    ? (data.lessons as string[]).map((title, index) => ({
        slug: `lesson-${index + 1}-${toSlug(title)}`,
        title: String(title),
        description: "",
        order: index + 1,
        hasContent: false
      }))
    : [];

  return {
    slug,
    title: String(data.title ?? phaseMeta?.title ?? slug.replace("phase-", "Phase ")),
    description: String(data.description ?? phaseMeta?.subtitle ?? ""),
    content,
    progress: Number(data.progress ?? 0),
    lessons: fileLessons.length > 0 ? fileLessons : fallbackLessons
  };
}

export async function getPhaseLessonBySlug(phaseSlug: string, lessonSlug: string): Promise<PhaseLesson | null> {
  const phase = await getPhaseBySlug(phaseSlug);
  if (!phase) {
    return null;
  }

  const filePath = path.join(getLessonDir(phaseSlug), `${lessonSlug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const { data, content } = readMdxFile(filePath);

  return {
    slug: lessonSlug,
    title: String(data.title ?? lessonSlug),
    description: String(data.description ?? ""),
    order: Number(data.order ?? 999),
    hasContent: true,
    content
  };
}

function walkDocs(dirPath: string, base = ""): string[] {
  return fs.readdirSync(dirPath, { withFileTypes: true }).flatMap((entry) => {
    const relative = base ? `${base}/${entry.name}` : entry.name;
    const absolute = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      return walkDocs(absolute, relative);
    }

    if (entry.isFile() && entry.name.endsWith(".mdx")) {
      return [relative.replace(/\.mdx$/, "")];
    }

    return [];
  });
}

export function getDocSlugs() {
  return walkDocs(docsRoot).map((item) => item.split("/"));
}

export async function getDocBySlug(slug: string[]): Promise<DocContent | null> {
  const filePath = path.join(docsRoot, `${slug.join("/")}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const { data, content } = readMdxFile(filePath);

  return {
    title: String(data.title ?? "Tài liệu"),
    description: String(data.description ?? ""),
    slug,
    content
  };
}

export function getDocsNavigation() {
  const slugs = getDocSlugs();

  return slugs.map((slug) => {
    const doc = fs.readFileSync(path.join(docsRoot, `${slug.join("/")}.mdx`), "utf8");
    const { data } = matter(doc);

    return {
      title: String(data.title ?? slug[slug.length - 1]),
      path: slug.join("/")
    };
  });
}
