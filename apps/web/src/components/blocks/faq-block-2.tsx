import type { FaqItem } from "@/components/blocks/faq-block";
import { ImageClipReveal } from "@/components/image-clip-reveal";

type FaqBlock2Tone = "light" | "dark";

type FaqBlock2Props = {
  /** Heading for SEO / screen readers (the visible label is `label`) */
  title: string;
  items: FaqItem[];
  /** Photo on the left, revealed with the crosshair tracker */
  image: { src: string; alt: string };
  label?: string;
  tone?: FaqBlock2Tone;
  id?: string;
};

const TONES: Record<
  FaqBlock2Tone,
  {
    surface: string;
    border: string;
    accent: string;
    mark: string;
    muted: string;
    line: string;
    readout: string;
    dot: string;
  }
> = {
  light: {
    surface: "bg-[#f7fbff] text-[#121212]",
    border: "border-[#121212]/15",
    accent: "text-[#261CC1]",
    mark: "bg-[#261CC1]",
    muted: "text-[#555555]",
    line: "bg-[#261CC1]/40",
    readout: "text-[#261CC1]",
    dot: "bg-[#261CC1]",
  },
  dark: {
    surface: "bg-[#0d0c11] text-white",
    border: "border-white/15",
    accent: "text-[#7b73ff]",
    mark: "bg-[#7b73ff]",
    muted: "text-white/65",
    line: "bg-[#7b73ff]/45",
    readout: "text-[#7b73ff]",
    dot: "bg-[#7b73ff]",
  },
};

/**
 * Split FAQ: crosshair image reveal on the left, accordion on the right
 * (Enerblock "FAQs" pattern). Native <details> keeps it accessible and
 * collapsed by default without JavaScript. Mirror `items` in FAQPage schema.
 * The original FaqBlock stays available for text-only FAQ sections.
 */
export function FaqBlock2({
  title,
  items,
  image,
  label = "FAQs",
  tone = "light",
  id,
}: FaqBlock2Props) {
  const t = TONES[tone];

  return (
    <section
      className={`border-b ${t.border} ${t.surface}`}
      data-nav-tone={tone}
      id={id}
    >
      <h2 className="sr-only">{title}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left — image with crosshair X/Y tracker */}
        <div
          className={`relative aspect-[4/3] border-b sm:aspect-[16/10] lg:aspect-auto lg:min-h-[640px] lg:border-r lg:border-b-0 ${t.border}`}
        >
          <ImageClipReveal
            alt={image.alt}
            dotColor={t.dot}
            fill
            labelColor={t.readout}
            lineColor={t.line}
            sizes="(min-width: 1024px) 45vw, 90vw"
            src={image.src}
          />
        </div>

        {/* Right — label row, then questions pinned to the bottom */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between px-6 pt-10 pb-16 sm:px-10 lg:px-8 lg:pt-10 lg:pb-0">
            <span
              className={`font-bold font-mosvita text-[0.85rem] uppercase tracking-[0.04em] lg:text-[1rem] ${t.accent}`}
            >
              {label}
            </span>
            <span
              aria-hidden="true"
              className={`inline-block size-2.5 shrink-0 ${t.mark}`}
            />
          </div>

          <div className="lg:mt-auto lg:mb-[clamp(3rem,10vh,8rem)]">
            {items.map((item) => (
              <details
                className={`group border-b ${t.border} first:border-t-0`}
                key={item.question}
              >
                <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-6 px-6 py-6 sm:px-10 lg:px-8 lg:py-7 [&::-webkit-details-marker]:hidden">
                  <span
                    className={`max-w-[46ch] font-metropolis font-medium text-[1.15rem] leading-[1.3] tracking-[-0.015em] lg:text-[clamp(1.25rem,1.9vw,1.75rem)] ${t.accent}`}
                  >
                    {item.question}
                  </span>
                  {/* Plus → minus drafting icon */}
                  <span
                    aria-hidden="true"
                    className={`relative mt-1 flex size-7 shrink-0 items-center justify-center lg:size-8 ${t.accent}`}
                  >
                    <span className="absolute h-[1.5px] w-full bg-current" />
                    <span className="absolute h-full w-[1.5px] bg-current transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-open:scale-y-0" />
                  </span>
                </summary>
                <p
                  className={`m-0 max-w-[60ch] px-6 pb-7 text-[1rem] leading-[1.7] sm:px-10 lg:px-8 ${t.muted}`}
                >
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
