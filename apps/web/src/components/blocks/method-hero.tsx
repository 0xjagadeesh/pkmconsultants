import { CharFadeLabel } from "@/components/blocks/char-fade-label";
import { ParallaxBand } from "@/components/blocks/parallax-band";
import { MaskRevealText } from "@/components/mask-reveal-text";

type MethodHeroProps = {
  eyebrow: string;
  /** One string per line */
  title: string[];
  intro: string;
  image: { src: string; alt: string };
  /** Caption that floats over the photo and sticks mid-screen */
  caption: string;
};

const LINE = "border-white/25";

/**
 * Brand-blue split hero (Enerblock approach page): eyebrow + masked title in
 * the top-left cell, intro in the bottom-right cell, gridlines between, then a
 * full-screen parallax photo. The caption starts at the photo's vertical
 * centre and, being sticky at 50vh, rises with the photo until it reaches the
 * middle of the screen, then holds there until the photo scrolls away.
 */
export function MethodHero({
  eyebrow,
  title,
  intro,
  image,
  caption,
}: MethodHeroProps) {
  return (
    <section className="bg-[#261CC1] text-[#f7fbff]" data-nav-tone="brand">
      {/* Top row: eyebrow + title | empty */}
      <div className={`grid grid-cols-1 border-b lg:grid-cols-2 ${LINE}`}>
        <div className="px-6 pt-28 pb-12 sm:px-10 lg:px-10 lg:pt-40 lg:pb-16">
          <CharFadeLabel
            className="text-[0.85rem] tracking-[0.04em] lg:text-[1rem]"
            marker={false}
            spread={false}
            text={eyebrow}
          />
          <MaskRevealText
            as="h1"
            className="m-0 mt-8 font-extrabold font-metropolis text-[clamp(2.6rem,5vw,5rem)] leading-[0.98] tracking-[-0.045em]"
            delay={0.2}
            lines={title}
            maskColor="#0d0c11"
            scrollTrigger={false}
          />
        </div>
        <div className={`hidden border-l lg:block ${LINE}`} />
      </div>

      {/* Bottom row: empty | intro */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:block" />
        <p
          className={`m-0 px-6 pt-8 pb-14 font-metropolis font-medium text-[clamp(1.15rem,1.8vw,1.6rem)] leading-[1.3] tracking-[-0.015em] sm:px-10 lg:border-l lg:px-10 lg:pt-10 lg:pb-20 ${LINE}`}
        >
          <span className="block max-w-[34ch]">{intro}</span>
        </p>
      </div>

      {/* Full-screen parallax photo with sticky caption */}
      <ParallaxBand
        alt={image.alt}
        depth={0.2}
        heightClassName="h-svh"
        priority
        src={image.src}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#0d0c11]/25"
        />
        <div className="relative h-full">
          <div className="h-1/2" />
          <p className="sticky top-1/2 m-0 px-6 font-bold font-mosvita text-[0.8rem] text-white uppercase tracking-[0.08em] sm:px-10 lg:px-10 lg:text-[0.95rem]">
            <span className="block max-w-[30ch]">{caption}</span>
          </p>
        </div>
      </ParallaxBand>
    </section>
  );
}
