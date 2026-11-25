import type { ReactNode } from "react";
import Image from "next/image";
import {
  SectionLabel,
  type SectionTone,
  TONE_BORDER,
  TONE_MUTED,
  TONE_SURFACE,
} from "@/components/blocks/section-label";

export type HeroMeta = { label: string; value: string };

type PageHeroProps = {
  eyebrow: string;
  /** One string, or one string per line for the curtain reveal */
  title: string | string[];
  intro?: string;
  tone?: SectionTone;
  /** Spec-sheet row under the hero (e.g. TYPE / YEAR / LOCATION / CLIENT) */
  meta?: HeroMeta[];
  /** Optional content for the right cell's lower area (buttons, chips…) */
  children?: ReactNode;
  /** Full-bleed background photo (use with tone="dark") */
  backgroundImage?: { src: string; alt?: string };
};

/**
 * Inner-page hero on the architectural grid: eyebrow cell on the left,
 * headline + intro on the right, optional spec-sheet row underneath.
 * Top padding clears the fixed navbar.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  tone = "light",
  meta,
  children,
  backgroundImage,
}: PageHeroProps) {
  const lines = Array.isArray(title) ? title : [title];
  const border = TONE_BORDER[tone];

  return (
    <section
      className={`relative overflow-hidden border-b ${border} ${TONE_SURFACE[tone]}`}
    >
      {backgroundImage ? (
        <>
          <Image
            alt={backgroundImage.alt ?? ""}
            className="rounded-none object-cover"
            fill
            priority
            sizes="100vw"
            src={backgroundImage.src}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-[#0d0c11]/70 via-[#0d0c11]/55 to-[#0d0c11]/85"
          />
        </>
      ) : null}
      <div className="relative grid grid-cols-1 pt-24 lg:grid-cols-[35%_minmax(0,1fr)] lg:pt-36 xl:grid-cols-[480px_minmax(0,1fr)]">
        <div
          className={`border-b px-6 pb-6 sm:px-10 lg:border-r lg:border-b-0 lg:px-10 lg:pb-14 ${border}`}
        >
          <SectionLabel tone={tone}>{eyebrow}</SectionLabel>
        </div>

        <div className="px-6 pt-8 pb-12 sm:px-10 lg:px-12 lg:pt-0 lg:pb-16">
          <h1 className="fade-in slide-in-from-bottom-4 m-0 max-w-[18ch] animate-in fill-mode-both font-extrabold font-metropolis text-[clamp(2.2rem,5.2vw,4.4rem)] leading-[1.04] tracking-[-0.035em] duration-700">
            {lines.map((line, i) => (
              <span className="block" key={line}>
                {line}
                {i < lines.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>
          {intro ? (
            <p
              className={`fade-in slide-in-from-bottom-2 m-0 mt-8 max-w-[60ch] animate-in fill-mode-both text-[1rem] leading-[1.7] delay-200 duration-700 sm:text-[1.08rem] ${TONE_MUTED[tone]}`}
            >
              {intro}
            </p>
          ) : null}
          {children ? <div className="mt-10">{children}</div> : null}
        </div>
      </div>

      {meta && meta.length > 0 ? (
        <dl
          className={`relative m-0 grid grid-cols-2 border-t lg:grid-cols-4 ${border}`}
        >
          {meta.map((item, i) => (
            <div
              className={`flex min-w-0 flex-col gap-2 px-6 py-5 sm:px-10 lg:px-10 ${border} ${
                i % 2 === 1 ? "border-l" : ""
              } ${i >= 2 ? "border-t lg:border-t-0" : ""} ${i > 0 ? "lg:border-l" : ""}`}
              key={item.label}
            >
              <dt
                className={`font-bold font-mosvita text-[0.7rem] uppercase tracking-[0.2em] ${TONE_MUTED[tone]}`}
              >
                {item.label}
              </dt>
              <dd className="m-0 font-metropolis font-semibold text-[1rem] leading-snug [overflow-wrap:anywhere]">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </section>
  );
}
