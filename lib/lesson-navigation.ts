import { getPhaseBySlug, getPhaseSlugs, type PhaseContent } from "@/lib/content";

type LessonMeta = PhaseContent["lessons"][number];

export function getNextLesson(phase: PhaseContent, currentLessonSlug: string): LessonMeta | null {
  const currentIndex = phase.lessons.findIndex((lesson) => lesson.slug === currentLessonSlug);

  if (currentIndex === -1 || currentIndex >= phase.lessons.length - 1) {
    return null;
  }

  return phase.lessons[currentIndex + 1] ?? null;
}

export function isLastLessonOfPhase(phase: PhaseContent, currentLessonSlug: string): boolean {
  const currentIndex = phase.lessons.findIndex((lesson) => lesson.slug === currentLessonSlug);
  return currentIndex !== -1 && currentIndex === phase.lessons.length - 1;
}

export function isLastPhase(currentPhaseSlug: string, allPhaseSlugs: string[]): boolean {
  const currentIndex = allPhaseSlugs.indexOf(currentPhaseSlug);
  return currentIndex !== -1 && currentIndex === allPhaseSlugs.length - 1;
}

export async function getNextPhase(currentPhaseSlug: string) {
  const allPhaseSlugs = getPhaseSlugs();
  const currentIndex = allPhaseSlugs.indexOf(currentPhaseSlug);

  if (currentIndex === -1 || currentIndex >= allPhaseSlugs.length - 1) {
    return null;
  }

  const nextPhaseSlug = allPhaseSlugs[currentIndex + 1];
  return getPhaseBySlug(nextPhaseSlug);
}
