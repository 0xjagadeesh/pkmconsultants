import { CrossImage } from "@/components/blocks/cross-image";
import { Crosshair } from "@/components/crosshair";
import { MaskRevealText } from "@/components/mask-reveal-text";

type IntroCrossProps = {
  /** One string per line */
  title: string[];
  /** Paragraphs in the sticky text column */
  body: string[];
  image: { src: string; alt: string };
};

const LINE = "border-[#121212]/15";

/**
 * Statement section (Enerblock "intro cross"): masked title on two thirds with
 * a hover crosshair in the last third, then a scroll-scrubbed CrossImage on
 * the left half beside a sticky text column on the right half.
 */
export function IntroCross({ title, body, image }: IntroCrossProps) {
  return (
    <section className={`border-b bg-[#f7fbff] text-[#121212] ${LINE}`}>
      {/* Header: title | crosshair */}
      <div
        className={`grid grid-cols-1 border-b lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] ${LINE}`}
      >
        <MaskRevealText
          className="m-0 px-6 pt-14 pb-16 font-metropolis font-medium text-[clamp(2.2rem,5.4vw,5rem)] leading-[1.02] tracking-[-0.04em] sm:px-10 lg:px-10 lg:pt-20 lg:pb-24"
          lines={title}
        />
        <div className={`hidden min-h-[240px] border-l lg:block ${LINE}`}>
          <Crosshair />
        </div>
      </div>

      {/* Image | sticky text */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <CrossImage alt={image.alt} className="aspect-[3/4]" src={image.src} />
        <div className={`lg:border-l ${LINE}`}>
          <div className="grid gap-6 px-6 pt-8 pb-16 sm:px-10 lg:sticky lg:top-16 lg:max-w-[46ch] lg:px-10 lg:pt-6 lg:pb-24">
            {body.map((paragraph) => (
              <p
                className="m-0 font-metropolis text-[clamp(1.05rem,1.45vw,1.3rem)] leading-[1.45] tracking-[-0.01em]"
                key={paragraph.slice(0, 32)}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
