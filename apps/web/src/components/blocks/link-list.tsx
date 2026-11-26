import Link from "next/link";

import {
  SectionLabel,
  type SectionTone,
  TONE_BORDER,
  TONE_MUTED,
  TONE_SURFACE,
} from "@/components/blocks/section-label";
import { MaskRevealText } from "@/components/mask-reveal-text";

export type LinkListItem = { title: string; href: string; caption?: string };

type LinkListProps = {
  label: string;
  title: string;
  intro?: string;
  items: LinkListItem[];
  tone?: SectionTone;
};

/**
 * Heading, then full-width numbered link rows with an arrow
 * (Enerblock "solutions list" section).
 */
export function LinkList({
  label,
  title,
  intro,
  items,
  tone = "dark",
}: LinkListProps) {
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
        <div className="px-6 pb-12 sm:px-10 lg:px-12 lg:py-16">
          <MaskRevealText
            className="m-0 max-w-[22ch] font-extrabold font-metropolis text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1.08] tracking-[-0.03em]"
            text={title}
          />
          {intro ? (
            <p
              className={`m-0 mt-6 max-w-[56ch] text-[1rem] leading-[1.7] ${muted}`}
            >
              {intro}
            </p>
          ) : null}
        </div>
      </div>

      <ul className="m-0 list-none p-0">
        {items.map((item, i) => (
          <li key={item.href + item.title}>
            <Link
              className={`group grid grid-cols-[3.5rem_minmax(0,1fr)_auto] items-center gap-4 border-t px-6 py-6 transition-colors duration-200 sm:grid-cols-[5rem_minmax(0,1fr)_auto] sm:px-10 lg:grid-cols-[calc(35%-2.5rem)_minmax(0,1fr)_auto] lg:px-10 lg:py-8 xl:grid-cols-[calc(480px-2.5rem)_minmax(0,1fr)_auto] ${border} ${
                tone === "light" ? "hover:bg-[#dedcff]/40" : "hover:bg-white/5"
              }`}
              href={item.href}
            >
              <span
                className={`font-bold font-mosvita text-[1rem] ${tone === "light" ? "text-[#261CC1]" : muted}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 lg:pl-12">
                <span className="block font-extrabold font-metropolis text-[1.2rem] leading-[1.2] tracking-[-0.02em] lg:text-[1.6rem]">
                  {item.title}
                </span>
                {item.caption ? (
                  <span className={`mt-1 block text-[0.9rem] ${muted}`}>
                    {item.caption}
                  </span>
                ) : null}
              </span>
              <span
                aria-hidden="true"
                className="text-[1.3rem] transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
