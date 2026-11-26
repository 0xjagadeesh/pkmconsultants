"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Fragment, useEffect, useRef } from "react";

import { ButtonZoomIn } from "@/components/buttonzoomin";
import { CursorTracker } from "@/components/cursor-tracker";
import { SCOPE_OF_SERVICES, type ServiceSlug } from "@/data/pkm-portfolio";

/* ── Stack tuning ──
   Card N pins at N × (header strip height) from the top, so every earlier card
   stays visible as a strip (index, image sliver, discipline label) above it.
   Cards taller than the viewport (phones) pin by their bottom edge instead,
   so their whole content is readable before the next card slides over. */
const STACK_BOTTOM_GAP = 16;

/* ── Solutions content ──
   Headline + image live here; discipline name and benefit line come from
   SCOPE_OF_SERVICES so the same one-liner is used site-wide. Full scope lives
   on /services/[slug]. */
const STACK_CARDS: { slug: ServiceSlug; title: string; image: string }[] = [
  {
    slug: "hvac",
    title: "Right-sized cooling and ventilation, not over-designed.",
    image: "/images/hvac.webp",
  },
  {
    slug: "phe",
    title: "Water supply and drainage that work on handover.",
    image: "/images/plumbing.webp",
  },
  {
    slug: "electrical",
    title: "Reliable power from grid to final circuit.",
    image: "/images/electrical.jpg",
  },
  {
    slug: "fps",
    title: "Life safety designed in, with drawings built to clear approval.",
    image: "/images/fps.webp",
  },
  {
    slug: "elv",
    title: "Fire alarm, PA and CCTV that work as one system.",
    image: "/images/panel.jpg",
  },
];

const STACK_ITEMS = STACK_CARDS.flatMap((card, i) => {
  const scope = SCOPE_OF_SERVICES.find((s) => s.slug === card.slug);
  if (!scope) return [];
  return [
    {
      ...card,
      order: String(i + 1).padStart(2, "0"),
      pretitle: scope.discipline,
      benefit: scope.benefit,
      href: `/services/${card.slug}`,
    },
  ];
});

/* ── Architectural Slanted Dash SVG ── */
function SlantedDash() {
  return (
    <svg
      viewBox="0 0 8 14"
      className="w-2.5 h-3.5 fill-current inline-block ml-1 opacity-80"
      aria-hidden="true"
    >
      <path d="M2.304 13.05H0L5.04 0H7.344L2.304 13.05Z" />
    </svg>
  );
}

/* ── Re-export for backwards compatibility ── */
export {
  ButtonZoomIn as DualRollButton,
  ButtonZoomIn,
} from "@/components/buttonzoomin";

/* ═══════════════════════════════════════════════════════════════
   MAIN SOLUTIONS STACK SECTION
═══════════════════════════════════════════════════════════════ */
export function SolutionsStack() {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    const cards = Array.from(
      stack.querySelectorAll<HTMLElement>("[data-stack-card]")
    );

    let frame = 0;
    const layout = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const viewport = window.innerHeight;
        let offset = 0;
        for (const card of cards) {
          const fitsBelow = viewport - card.offsetHeight - STACK_BOTTOM_GAP;
          card.style.setProperty(
            "--stick-top",
            `${Math.round(Math.min(offset, fitsBelow))}px`
          );
          // Next card pins just below this card's header strip (+1px top border)
          const strip = card.querySelector<HTMLElement>("[data-stack-strip]");
          offset += (strip?.offsetHeight ?? 0) + 1;
        }
        // Sticky offsets change the page geometry other ScrollTriggers depend on
        ScrollTrigger.refresh();
      });
    };
    layout();
    const resizeObserver = new ResizeObserver(layout);
    for (const card of cards) resizeObserver.observe(card);
    window.addEventListener("resize", layout);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", layout);
    };
  }, []);

  return (
    <section className="relative w-full bg-[#f7fbff] text-[#121212] overflow-visible border-b border-[#121212]/15">
      {/* ── 1. SECTION HEADER ── */}
      <div className="border-t border-b border-[#121212]/15">
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#121212]/15">
          {/* Left Column: Title + Solutions Tag */}
          <div className="px-6 lg:px-12 py-12 lg:py-16 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-[0.75rem] lg:text-[0.8rem] font-bold tracking-[0.22em] uppercase font-metropolis text-[#121212]">
                  Systems
                </span>
                <span
                  className="w-1.5 h-1.5 bg-[#121212] inline-block"
                  aria-hidden="true"
                />
              </div>

              <h2 className="font-extrabold font-metropolis tracking-[-0.035em] text-[#121212] text-[clamp(1.8rem,4.5vw,3.5rem)] leading-[1.06] mt-6 lg:mt-8 m-0 max-w-[650px]">
                Engineering systems
                <br />
                built for certainty &
                <br />
                flawless execution
              </h2>
            </div>
          </div>

          {/* Right Column: Interactive AutoCAD Cursor Tracker (mouse only — hidden below lg, where it renders as an empty box) */}
          <div className="relative hidden items-stretch p-0 lg:flex lg:min-h-[340px]">
            <CursorTracker />
          </div>
        </div>
      </div>

      {/* ── 2. STACK CONTAINER (Pinned Cards Deck) ──
          Every card is sticky inside this container and follows the previous one
          directly, sliding over it. A short trailing spacer holds the last card in
          place, then the whole deck releases with the end of the container. */}
      <div className="relative w-full" ref={stackRef}>
        {STACK_ITEMS.map((item, index) => (
          <Fragment key={item.order}>
            <article
              aria-label={`${item.order} ${item.pretitle}`}
              className="sticky w-full border-[#121212]/15 border-t bg-[#f7fbff]"
              data-stack-card=""
              id={`stack-${item.order}`}
              style={{
                top: "var(--stick-top, 0px)",
                zIndex: 10 + index,
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-[140px_minmax(0,1fr)] lg:grid-cols-[200px_360px_minmax(0,1fr)] xl:grid-cols-[240px_380px_minmax(0,1fr)] divide-y md:divide-y-0 md:divide-x divide-[#121212]/15">
                {/* ── COLUMN 1: Order / Index ── */}
                <div className="flex h-14 items-center justify-between gap-4 px-6 md:row-span-2 md:h-auto md:items-start md:justify-start lg:row-span-1 lg:px-10 xl:px-12">
                  <div
                    className="flex h-14 shrink-0 items-center font-bold font-metropolis text-[#121212] text-[1.15rem] tracking-tight lg:h-[76px] lg:text-[1.4rem]"
                    data-stack-strip=""
                  >
                    <span>{item.order}</span>
                    <SlantedDash />
                  </div>
                  {/* Mobile-only category tag next to index */}
                  <span className="truncate text-right font-bold text-[#261CC1] text-[0.72rem] uppercase tracking-[0.16em] md:hidden">
                    {item.pretitle}
                  </span>
                </div>

                {/* ── COLUMN 2: Image ── */}
                <div className="flex items-start justify-center bg-[#f7fbff]/40 px-4 pt-3 pb-0 md:p-4 md:max-lg:border-r-0 lg:p-6">
                  <div className="relative aspect-[3/1] w-full overflow-hidden border border-[#121212]/10 bg-white/40 md:aspect-[16/9] lg:aspect-[4/3]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1280px) 340px, (min-width: 1024px) 310px, (min-width: 768px) calc(100vw - 172px), calc(100vw - 32px)"
                      className="rounded-none object-cover transition-transform duration-700 ease-out hover:scale-105"
                    />
                  </div>
                </div>

                {/* ── COLUMN 3: Content & Action ── */}
                <div className="flex flex-col justify-between px-6 pb-4 md:border-[#121212]/15 md:border-t md:pb-6 lg:min-h-[320px] lg:border-t-0 lg:px-10">
                  <div>
                    {/* ── HEADER STRIP (stays visible when the next card stacks on top) ── */}
                    <div className="hidden items-center font-bold font-metropolis text-[#261CC1] text-[0.75rem] uppercase tracking-[0.18em] md:flex md:h-14 lg:h-[76px] lg:text-[0.8rem]">
                      {item.pretitle}
                    </div>

                    <div className="pt-3 md:pt-0">
                      <h3 className="font-extrabold font-metropolis text-[1.02rem] md:text-[1.28rem] lg:text-[1.42rem] leading-[1.25] tracking-[-0.025em] text-[#121212] m-0 max-w-[720px]">
                        {item.title}
                      </h3>
                    </div>

                    {/* ── BENEFIT LINE (hidden by the next card when stacked) ── */}
                    <p className="m-0 max-w-[680px] pt-2 font-metropolis text-[#121212]/75 text-[0.88rem] leading-[1.55] md:pt-4 lg:pt-5 lg:text-[0.98rem]">
                      {item.benefit}
                    </p>
                  </div>

                  {/* Lower action */}
                  <div className="pt-3 md:pt-5 md:pb-2">
                    <ButtonZoomIn href={item.href} label="See full scope" />
                  </div>
                </div>
              </div>
            </article>

            {/* Hold the last card in place briefly before the deck releases */}
            {index === STACK_ITEMS.length - 1 && (
              <div aria-hidden="true" className="h-[15vh] lg:h-[20vh]" />
            )}
          </Fragment>
        ))}
      </div>

      {/* ── 3. BOTTOM ARCHITECTURAL SEPARATOR ── */}
      <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] lg:grid-cols-[200px_360px_1fr] xl:grid-cols-[240px_380px_1fr] divide-x divide-[#121212]/15 h-4 lg:h-6">
        <div />
        <div className="hidden lg:block" />
        <div className="hidden md:block" />
      </div>
    </section>
  );
}
