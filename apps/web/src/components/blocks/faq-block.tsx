import {
  SectionLabel,
  type SectionTone,
  TONE_BORDER,
  TONE_MUTED,
  TONE_SURFACE,
} from "@/components/blocks/section-label";
import { FixedAccordion } from "@/components/elements/fixed-accordion";

export type FaqItem = { question: string; answer: string };

type FaqBlockProps = {
  label?: string;
  title: string;
  items: FaqItem[];
  tone?: SectionTone;
};

/**
 * Questions on the architectural grid. Single-open accordion, first answer
 * open, and the section height never changes (see FixedAccordion).
 */
export function FaqBlock({
  label = "FAQs",
  title,
  items,
  tone = "light",
}: FaqBlockProps) {
  const border = TONE_BORDER[tone];
  return (
    <section className={`border-b ${border} ${TONE_SURFACE[tone]}`}>
      <div className="grid grid-cols-1 lg:grid-cols-[35%_minmax(0,1fr)] xl:grid-cols-[480px_minmax(0,1fr)]">
        <div
          className={`px-6 pt-12 pb-8 sm:px-10 lg:border-r lg:px-10 lg:py-16 ${border}`}
        >
          <SectionLabel tone={tone}>{label}</SectionLabel>
          <h2 className="m-0 mt-6 max-w-[16ch] font-extrabold font-metropolis text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1.08] tracking-[-0.03em]">
            {title}
          </h2>
        </div>

        <FixedAccordion
          answerClassName={`m-0 max-w-[70ch] px-6 pb-8 text-[0.98rem] leading-[1.7] sm:px-10 lg:px-12 ${TONE_MUTED[tone]}`}
          iconClassName="size-5"
          itemClassName={`border-t ${border} lg:first:border-t-0`}
          items={items.map((item) => ({
            id: item.question,
            question: item.question,
            answer: item.answer,
          }))}
          questionClassName="font-metropolis font-semibold text-[1.05rem] leading-[1.35] lg:text-[1.2rem]"
          triggerClassName="flex min-h-11 items-center justify-between gap-6 px-6 py-6 sm:px-10 lg:px-12"
        />
      </div>
    </section>
  );
}
