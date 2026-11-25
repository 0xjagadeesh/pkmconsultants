import { CrosshairImage } from "@/components/blocks/crosshair-image";
import {
  SectionLabel,
  type SectionTone,
  TONE_BORDER,
  TONE_MUTED,
  TONE_SURFACE,
} from "@/components/blocks/section-label";

type IntroBlockProps = {
  label: string;
  /** Large statement */
  statement: string;
  /** Supporting paragraphs */
  body?: string[];
  image?: { src: string; alt: string };
  tone?: SectionTone;
};

/**
 * Label + large statement on the architectural grid, with an optional
 * crosshair image reveal underneath (Enerblock "intro" pattern).
 */
export function IntroBlock({
  label,
  statement,
  body = [],
  image,
  tone = "light",
}: IntroBlockProps) {
  const border = TONE_BORDER[tone];
  return (
    <section className={`border-b ${border} ${TONE_SURFACE[tone]}`}>
      <div className="grid grid-cols-1 lg:grid-cols-[35%_minmax(0,1fr)] xl:grid-cols-[480px_minmax(0,1fr)]">
        <div
          className={`px-6 pt-12 pb-6 sm:px-10 lg:border-r lg:px-10 lg:py-16 ${border}`}
        >
          <SectionLabel tone={tone}>{label}</SectionLabel>
        </div>
        <div className="px-6 pb-12 sm:px-10 lg:px-12 lg:py-16">
          <p className="m-0 max-w-[30ch] font-metropolis font-medium text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.2] tracking-[-0.02em]">
            {statement}
          </p>
          {body.length > 0 ? (
            <div className="mt-8 grid max-w-[900px] gap-6 md:grid-cols-2">
              {body.map((paragraph) => (
                <p
                  className={`m-0 text-[1rem] leading-[1.7] ${TONE_MUTED[tone]}`}
                  key={paragraph.slice(0, 32)}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {image ? (
        <div
          className={`relative aspect-[16/9] border-t sm:aspect-[21/9] ${border}`}
        >
          <CrosshairImage
            alt={image.alt}
            sizes="100vw"
            src={image.src}
            tone={tone === "light" ? "light" : "dark"}
          />
        </div>
      ) : null}
    </section>
  );
}
