import { CrosshairImage } from "@/components/blocks/crosshair-image";
import { LineButton } from "@/components/blocks/line-button";
import {
  SectionLabel,
  type SectionTone,
  TONE_BORDER,
  TONE_MUTED,
  TONE_SURFACE,
} from "@/components/blocks/section-label";

type SplitFeatureProps = {
  label: string;
  title: string;
  description: string;
  image: { src: string; alt: string };
  link?: { href: string; label: string };
  /** Image side on desktop */
  imageSide?: "left" | "right";
  tone?: SectionTone;
};

/**
 * Half text / half crosshair image (Enerblock "matrix" section).
 * The text column stays in view while the image scrolls past on desktop.
 */
export function SplitFeature({
  label,
  title,
  description,
  image,
  link,
  imageSide = "right",
  tone = "light",
}: SplitFeatureProps) {
  const border = TONE_BORDER[tone];

  const text = (
    <div className="px-6 py-12 sm:px-10 lg:sticky lg:top-24 lg:px-12 lg:py-16">
      <SectionLabel tone={tone}>{label}</SectionLabel>
      <h2 className="m-0 mt-6 max-w-[18ch] font-extrabold font-metropolis text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1.08] tracking-[-0.03em]">
        {title}
      </h2>
      <p
        className={`m-0 mt-6 max-w-[48ch] text-[1rem] leading-[1.7] ${TONE_MUTED[tone]}`}
      >
        {description}
      </p>
      {link ? (
        <div className="mt-10">
          <LineButton href={link.href} label={link.label} tone={tone} />
        </div>
      ) : null}
    </div>
  );

  const media = (
    <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-[640px]">
      <CrosshairImage
        alt={image.alt}
        sizes="(min-width: 1024px) 50vw, 100vw"
        src={image.src}
        tone={tone === "light" ? "light" : "dark"}
      />
    </div>
  );

  return (
    <section className={`border-b ${border} ${TONE_SURFACE[tone]}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div
          className={`${imageSide === "left" ? "lg:order-2 lg:border-l" : "lg:border-r"} ${border}`}
        >
          {text}
        </div>
        <div
          className={`border-t lg:border-t-0 ${imageSide === "left" ? "lg:order-1" : ""} ${border}`}
        >
          {media}
        </div>
      </div>
    </section>
  );
}
