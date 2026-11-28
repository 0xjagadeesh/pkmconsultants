import { CrossImage } from "@/components/blocks/cross-image";

type Img = { src: string; alt: string };

type DoubleCrossImageProps = {
  /** Tall portrait image, left half */
  large: Img;
  /** Small square image, top of the right half */
  small: Img;
};

const LINE = "border-[#121212]/15";

/**
 * Two scroll-revealed CrossImages on the gridline sheet (Enerblock "double
 * image"): a tall portrait filling the left half, and a smaller square pinned
 * to the top-right of the right half. Each reveals on its own scroll range.
 */
export function DoubleCrossImage({ large, small }: DoubleCrossImageProps) {
  return (
    <section
      aria-label="Project photographs"
      className={`border-b bg-[#f7fbff] ${LINE}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <CrossImage alt={large.alt} className="aspect-[3/4]" src={large.src} />
        <div className={`border-t lg:border-t-0 lg:border-l ${LINE}`}>
          {/* Bottom line runs across the whole column; the box has its own
              left edge, so its gutter lines start and end on real borders */}
          <div className={`border-b ${LINE}`}>
            <div className={`ml-auto w-full sm:w-[72%] sm:border-l ${LINE}`}>
              <CrossImage
                alt={small.alt}
                className="aspect-square"
                sizes="(min-width: 1024px) 36vw, 90vw"
                src={small.src}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
