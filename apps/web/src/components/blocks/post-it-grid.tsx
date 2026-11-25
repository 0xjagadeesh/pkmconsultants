import {
  SectionLabel,
  type SectionTone,
  TONE_BORDER,
  TONE_MUTED,
  TONE_SURFACE,
} from "@/components/blocks/section-label";

export type PostItItem = {
  title: string;
  description: string;
  /** Short tag shown above the title */
  tag?: string;
  href?: string;
};

type PostItGridProps = {
  label: string;
  title: string;
  intro?: string;
  items: PostItItem[];
  tone?: SectionTone;
};

/**
 * Header row, then a framed grid of numbered note cards
 * (Enerblock "post-it" section). 1 → 2 → 3 columns.
 */
export function PostItGrid({
  label,
  title,
  intro,
  items,
  tone = "light",
}: PostItGridProps) {
  const border = TONE_BORDER[tone];
  const muted = TONE_MUTED[tone];

  return (
    <section className={`border-b ${border} ${TONE_SURFACE[tone]}`}>
      <div className="grid grid-cols-1 lg:grid-cols-[35%_minmax(0,1fr)] xl:grid-cols-[480px_minmax(0,1fr)]">
        <div
          className={`px-6 pt-12 pb-6 sm:px-10 lg:border-r lg:px-10 lg:py-16 ${border}`}
        >
          <SectionLabel tone={tone}>{label}</SectionLabel>
        </div>
        <div className="px-6 pb-10 sm:px-10 lg:px-12 lg:py-16">
          <h2 className="m-0 max-w-[20ch] font-extrabold font-metropolis text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1.08] tracking-[-0.03em]">
            {title}
          </h2>
          {intro ? (
            <p
              className={`m-0 mt-6 max-w-[60ch] text-[1rem] leading-[1.7] ${muted}`}
            >
              {intro}
            </p>
          ) : null}
        </div>
      </div>

      <ul
        className={`m-0 grid list-none grid-cols-1 border-t p-0 md:grid-cols-2 xl:grid-cols-3 ${border}`}
      >
        {items.map((item, i) => {
          const body = (
            <>
              <span className="flex items-start justify-between gap-4">
                <span
                  className={`font-bold font-mosvita text-[1rem] ${tone === "light" ? "text-[#261CC1]" : ""}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden="true"
                  className={`inline-block size-1.5 ${tone === "light" ? "bg-[#121212]" : "bg-white"}`}
                />
              </span>
              <span className="mt-auto block pt-12">
                {item.tag ? (
                  <span
                    className={`mb-3 block font-bold font-mosvita text-[0.7rem] uppercase tracking-[0.18em] ${muted}`}
                  >
                    {item.tag}
                  </span>
                ) : null}
                <span className="block font-extrabold font-metropolis text-[1.25rem] leading-[1.2] tracking-[-0.02em] lg:text-[1.45rem]">
                  {item.title}
                </span>
                <span
                  className={`mt-4 block text-[0.95rem] leading-[1.65] ${muted}`}
                >
                  {item.description}
                </span>
              </span>
            </>
          );
          const cell =
            "flex h-full min-h-[300px] flex-col px-6 py-8 sm:px-10 lg:min-h-[360px] lg:px-10 lg:py-10";
          return (
            <li className={`border-b ${border} md:border-r`} key={item.title}>
              {item.href ? (
                <a
                  className={`${cell} transition-colors duration-200 ${
                    tone === "light"
                      ? "hover:bg-[#dedcff]/40"
                      : "hover:bg-white/5"
                  }`}
                  href={item.href}
                >
                  {body}
                </a>
              ) : (
                <div className={cell}>{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
