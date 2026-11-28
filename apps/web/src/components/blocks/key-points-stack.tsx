import Image from "next/image";

import { CharFadeLabel } from "@/components/blocks/char-fade-label";
import { MaskRevealText } from "@/components/mask-reveal-text";

export type KeyPoint = { title: string; text: string };

type KeyPointsStackProps = {
  /** One string per line */
  title: string[];
  body: string[];
  image: { src: string; alt: string };
  points: KeyPoint[];
  /** Card eyebrow prefix, e.g. "Key point" → "Key point 01" */
  pointLabel?: string;
};

const LINE = "border-[#121212]/15";

/**
 * "What we deliver" (Enerblock post-it section): a sticky two-thirds column
 * with masked title, copy and a photo, beside a one-third column of square
 * brand-blue cards that scroll past it. Each card's eyebrow types in letter
 * by letter, then its square marker appears.
 */
export function KeyPointsStack({
  title,
  body,
  image,
  points,
  pointLabel = "Key point",
}: KeyPointsStackProps) {
  return (
    <section className={`border-b bg-[#f7fbff] text-[#121212] ${LINE}`}>
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        {/* Sticky copy */}
        <div className="lg:self-start lg:sticky lg:top-16">
          <div className="px-6 pt-14 pb-10 sm:px-10 lg:px-10 lg:pt-6 lg:pb-12">
            <MaskRevealText
              className="m-0 font-metropolis font-medium text-[clamp(2rem,4.2vw,3.6rem)] leading-[1.04] tracking-[-0.035em]"
              lines={title}
            />
            <div className="mt-8 grid max-w-[56ch] gap-4 lg:mt-12">
              {body.map((paragraph) => (
                <p
                  className="m-0 text-[#3a3846] text-[1rem] leading-[1.65]"
                  key={paragraph.slice(0, 32)}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="relative mt-10 aspect-[16/7] w-full max-w-[560px] overflow-hidden lg:mt-24">
              <Image
                alt={image.alt}
                className="rounded-none object-cover"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                src={image.src}
              />
            </div>
          </div>
        </div>

        {/* Cards */}
        <ol
          className={`m-0 grid list-none gap-5 p-5 lg:border-l lg:pt-[clamp(6rem,30vh,18rem)] ${LINE}`}
        >
          {points.map((point, i) => (
            <li
              className="flex aspect-square flex-col justify-between bg-[#261CC1] p-5 text-[#f7fbff] lg:p-6"
              key={point.title}
            >
              <CharFadeLabel
                className="text-[0.8rem] tracking-[0.04em] lg:text-[0.9rem]"
                markerClassName="bg-[#f7fbff]"
                text={`${pointLabel} ${String(i + 1).padStart(2, "0")}`}
              />
              <div>
                <h3 className="m-0 font-metropolis font-medium text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.1] tracking-[-0.03em]">
                  {point.title}
                </h3>
                <p className="m-0 mt-3 max-w-[34ch] text-[#f7fbff]/85 text-[0.95rem] leading-[1.5]">
                  {point.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
