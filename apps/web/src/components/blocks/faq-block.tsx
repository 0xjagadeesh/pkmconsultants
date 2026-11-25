import {
  SectionLabel,
  type SectionTone,
  TONE_BORDER,
  TONE_MUTED,
  TONE_SURFACE,
} from "@/components/blocks/section-label";

export type FaqItem = { question: string; answer: string };

type FaqBlockProps = {
  label?: string;
  title: string;
  items: FaqItem[];
  tone?: SectionTone;
};

/**
 * Questions on the architectural grid. Native <details> keeps it accessible
 * and works without JavaScript.
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

        <div>
          {items.map((item, i) => (
            <details
              className={`group border-t ${border} ${i === 0 ? "lg:border-t-0" : ""}`}
              key={item.question}
            >
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 px-6 py-6 sm:px-10 lg:px-12 [&::-webkit-details-marker]:hidden">
                <span className="font-metropolis font-semibold text-[1.05rem] leading-[1.35] lg:text-[1.2rem]">
                  {item.question}
                </span>
                {/* Plus / minus drafting icon */}
                <span
                  aria-hidden="true"
                  className="relative flex size-5 shrink-0 items-center justify-center"
                >
                  <span className="absolute h-[1.5px] w-4 bg-current" />
                  <span className="absolute h-4 w-[1.5px] bg-current transition-transform duration-300 group-open:scale-y-0" />
                </span>
              </summary>
              <p
                className={`m-0 max-w-[70ch] px-6 pb-8 text-[0.98rem] leading-[1.7] sm:px-10 lg:px-12 ${TONE_MUTED[tone]}`}
              >
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
