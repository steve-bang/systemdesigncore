import { Heart, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PhaseContent } from "@/lib/content";

type LessonMeta = PhaseContent["lessons"][number];

type LessonNavigationProps = {
  phaseSlug: string;
  previousLesson: LessonMeta | null;
  nextLesson: LessonMeta | null;
  nextPhase: PhaseContent | null;
  showNextPhaseCta: boolean;
  showDonationCta: boolean;
  donationUrl?: string;
};

const DEFAULT_DONATION_URL = process.env.NEXT_PUBLIC_PAYPAL_DONATION_LINK;

export function LessonNavigation({
  phaseSlug,
  previousLesson,
  nextLesson,
  nextPhase,
  showNextPhaseCta,
  showDonationCta,
  donationUrl = DEFAULT_DONATION_URL
}: LessonNavigationProps) {
  return (
    <div className="mt-10 border-t border-line pt-6">
      <div className="flex flex-wrap gap-3">
        {previousLesson ? (
          <Button href={`/phase/${phaseSlug}/lesson/${previousLesson.slug}`} variant="ghost">
            <ArrowLeft className="h-4 w-4" />
            {previousLesson.title}
          </Button>
        ) : null}

        {nextLesson ? (
          <Button href={`/phase/${phaseSlug}/lesson/${nextLesson.slug}`} className="ml-auto">
            {nextLesson.title}
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : null}
      </div>

      {showNextPhaseCta && nextPhase ? (
        <Button
          href={`/phase/${nextPhase.slug}`}
          size="lg"
          className="mt-4 w-full justify-between bg-gradient-to-r from-brand to-[#5f7dff] px-6 shadow-[0_16px_34px_rgba(47,107,255,0.35)] hover:from-[#2659d6] hover:to-[#4f69dc]"
        >
          <span className="inline-flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Đi tới {nextPhase.title}
          </span>
          <ArrowRight className="h-5 w-5" />
        </Button>
      ) : null}

      {showDonationCta ? (
        <Button
          href={donationUrl}
          target="_blank"
          rel="noreferrer"
          size="lg"
          className="mt-4 w-full justify-center bg-gradient-to-r from-rose-500 to-orange-500 px-6 shadow-[0_16px_36px_rgba(244,63,94,0.35)] hover:from-rose-600 hover:to-orange-600"
        >
          <Heart className="h-5 w-5" />
          Donate / Ủng hộ dự án
        </Button>
      ) : null}
    </div>
  );
}
