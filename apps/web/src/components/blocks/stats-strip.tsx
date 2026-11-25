import {
  type SectionTone,
  TONE_BORDER,
  TONE_MUTED,
  TONE_SURFACE,
} from "@/components/blocks/section-label";

export type StatItem = { label: string; value: string; caption?: string };

type StatsStripProps = {
  items: StatItem[];
  tone?: SectionTone;
};

/** Key figures in gridline cells: 2 across on phones, up to 4 on desktop. */
export function StatsStrip({ items, tone = "light" }: StatsStripProps) {
  const border = TONE_BORDER[tone];
  const cols = items.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <section className={`border-b ${border} ${TONE_SURFACE[tone]}`}>
      <dl className={`m-0 grid grid-cols-2 ${cols}`}>
        {items.map((item, i) => (
          <div
            className={`flex min-w-0 flex-col justify-between gap-8 px-6 py-8 sm:px-10 lg:min-h-[220px] lg:px-10 lg:py-10 ${border} ${
              i % 2 === 1 ? "border-l" : ""
            } ${i >= 2 ? "border-t lg:border-t-0" : ""} ${i > 0 ? "lg:border-l" : ""}`}
            key={item.label}
          >
            <dt
              className={`font-bold font-mosvita text-[0.72rem] uppercase tracking-[0.2em] ${TONE_MUTED[tone]}`}
            >
              {item.label}
            </dt>
            <dd className="m-0">
              <span
                className={`block font-extrabold font-metropolis text-[clamp(2.2rem,5vw,4rem)] leading-none tracking-[-0.04em] ${
                  tone === "light" ? "text-[#261CC1]" : ""
                }`}
              >
                {item.value}
              </span>
              {item.caption ? (
                <span
                  className={`mt-2 block text-[0.9rem] ${TONE_MUTED[tone]}`}
                >
                  {item.caption}
                </span>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
