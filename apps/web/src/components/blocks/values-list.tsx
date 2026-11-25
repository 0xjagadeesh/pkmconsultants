import {
  SectionLabel,
  type SectionTone,
  TONE_BORDER,
  TONE_MUTED,
  TONE_SURFACE,
} from "@/components/blocks/section-label";

export type ValueItem = { title: string; description: string };

type ValuesListProps = {
  label?: string;
  title: string;
  items: ValueItem[];
  tone?: SectionTone;
};

/**
 * Headline row, then value columns split by gridlines
 * (Enerblock "values" section). Stacks on phones.
 */
export function ValuesList({
  label = "Value",
  title,
  items,
  tone = "light",
}: ValuesListProps) {
  const border = TONE_BORDER[tone];
  const cols = items.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <section className={`border-b ${border} ${TONE_SURFACE[tone]}`}>
      <div className="grid grid-cols-1 lg:grid-cols-[35%_minmax(0,1fr)] xl:grid-cols-[480px_minmax(0,1fr)]">
        <div
          className={`px-6 pt-12 pb-6 sm:px-10 lg:border-r lg:px-10 lg:py-16 ${border}`}
        >
          <SectionLabel tone={tone}>{label}</SectionLabel>
        </div>
        <h2 className="m-0 max-w-[24ch] px-6 pb-12 font-extrabold font-metropolis text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1.08] tracking-[-0.03em] sm:px-10 lg:px-12 lg:py-16">
          {title}
        </h2>
      </div>

      <dl className={`m-0 grid grid-cols-1 border-t ${cols} ${border}`}>
        {items.map((item, i) => (
          <div
            className={`flex flex-col gap-4 px-6 py-10 sm:px-10 lg:min-h-[280px] lg:px-10 lg:py-12 ${border} ${
              i > 0 ? "border-t lg:border-t-0 lg:border-l" : ""
            }`}
            key={item.title}
          >
            <dt className="flex items-center justify-between gap-4 font-extrabold font-metropolis text-[1.3rem] leading-[1.2] tracking-[-0.02em] lg:text-[1.5rem]">
              {item.title}
              <span
                aria-hidden="true"
                className={`inline-block size-1.5 shrink-0 ${tone === "light" ? "bg-[#261CC1]" : "bg-white"}`}
              />
            </dt>
            <dd
              className={`m-0 mt-auto max-w-[44ch] text-[0.98rem] leading-[1.7] ${TONE_MUTED[tone]}`}
            >
              {item.description}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
