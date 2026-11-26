import { LineButton } from "@/components/blocks/line-button";
import {
  SectionLabel,
  type SectionTone,
  TONE_BORDER,
  TONE_MUTED,
  TONE_SURFACE,
} from "@/components/blocks/section-label";

export type NumberedItem = {
  title: string;
  description: string;
  /** Optional deliverables / bullet points */
  points?: string[];
  /** Optional small tag shown above the title */
  tag?: string;
  /** Short codes (NBC, NFPA…) rendered as square tags */
  tags?: string[];
};

type NumberedListProps = {
  label: string;
  title: string;
  intro?: string;
  items: NumberedItem[];
  tone?: SectionTone;
  id?: string;
  /** Optional anchor id per row (for in-page links) */
  itemId?: (index: number) => string;
  /** Optional one-line link under the heading */
  link?: { href: string; label: string };
};

/**
 * Sticky heading on the left, numbered rows (01, 02…) on the right
 * (Enerblock "list block" pattern). Used for process steps and scopes.
 */
export function NumberedList({
  label,
  title,
  intro,
  items,
  tone = "light",
  id,
  itemId,
  link,
}: NumberedListProps) {
  const border = TONE_BORDER[tone];
  const muted = TONE_MUTED[tone];

  return (
    <section className={`border-b ${border} ${TONE_SURFACE[tone]}`} id={id}>
      <div className="grid grid-cols-1 lg:grid-cols-[35%_minmax(0,1fr)] xl:grid-cols-[480px_minmax(0,1fr)]">
        <div className={`lg:border-r ${border}`}>
          <div className="px-6 pt-12 pb-10 sm:px-10 lg:sticky lg:top-24 lg:px-10 lg:py-16">
            <SectionLabel tone={tone}>{label}</SectionLabel>
            <h2 className="m-0 mt-6 max-w-[16ch] font-extrabold font-metropolis text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1.08] tracking-[-0.03em]">
              {title}
            </h2>
            {intro ? (
              <p
                className={`m-0 mt-6 max-w-[42ch] text-[1rem] leading-[1.7] ${muted}`}
              >
                {intro}
              </p>
            ) : null}
            {link ? (
              <LineButton
                className="mt-8"
                href={link.href}
                label={link.label}
                tone={tone}
              />
            ) : null}
          </div>
        </div>

        <ol className="m-0 list-none p-0">
          {items.map((item, i) => (
            <li
              className={`grid scroll-mt-24 grid-cols-[3.5rem_minmax(0,1fr)] gap-x-4 border-t px-6 py-8 sm:grid-cols-[5rem_minmax(0,1fr)] sm:px-10 lg:px-12 lg:py-10 ${border} ${
                i === 0 ? "lg:border-t-0" : ""
              }`}
              id={itemId?.(i)}
              key={item.title}
            >
              <span
                className={`font-bold font-mosvita text-[1.05rem] lg:text-[1.2rem] ${
                  tone === "light" ? "text-[#261CC1]" : "text-white"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                {item.tag ? (
                  <p
                    className={`m-0 mb-2 font-bold font-mosvita text-[0.7rem] uppercase tracking-[0.18em] ${muted}`}
                  >
                    {item.tag}
                  </p>
                ) : null}
                <h3 className="m-0 font-extrabold font-metropolis text-[1.15rem] leading-[1.25] tracking-[-0.02em] lg:text-[1.4rem]">
                  {item.title}
                </h3>
                <p
                  className={`m-0 mt-3 max-w-[62ch] text-[0.95rem] leading-[1.7] lg:text-[1rem] ${muted}`}
                >
                  {item.description}
                </p>
                {item.points && item.points.length > 0 ? (
                  <ul className="m-0 mt-5 grid list-none gap-2.5 p-0">
                    {item.points.map((point) => (
                      <li
                        className="flex gap-3 text-[0.92rem] leading-[1.55]"
                        key={point}
                      >
                        <span
                          aria-hidden="true"
                          className={`mt-[0.55em] inline-block size-1.5 shrink-0 ${
                            tone === "light" ? "bg-[#261CC1]" : "bg-white"
                          }`}
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {item.tags && item.tags.length > 0 ? (
                  <ul className="m-0 mt-5 flex list-none flex-wrap gap-2 p-0">
                    {item.tags.map((code) => (
                      <li
                        className={`rounded-none border px-2.5 py-1 font-bold font-mosvita text-[0.7rem] uppercase tracking-[0.14em] ${
                          tone === "light"
                            ? "border-[#261CC1]/40 text-[#261CC1]"
                            : "border-white/40 text-white"
                        }`}
                        key={code}
                      >
                        {code}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
