"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { CursorTracker } from "@/components/cursor-tracker";
import { ButtonZoomIn } from "@/components/buttonzoomin";

// Scroll "dwell" between cards. Lives in a spacer, NOT in a sticky card's margin.
const SCROLL_GAP = "25vh";

/* ── Solutions Content Data (MEPF Engineering Scope) ── */
const STACK_ITEMS = [
  {
    order: "01",
    pretitle: "HVAC Design & Engineering",
    title: "Right-sized cooling and ventilation, not over-designed, not under-delivering.",
    description:
      "Oversized plant wastes capital and runs inefficiently. Undersized plant fails on the first hot day. We run room-by-room heat load calculations and select VRF or chilled water systems to match how your building will actually be used. Ductwork and equipment are coordinated against structure and ceiling heights before drawings are issued.",
    benefit: "Lower running costs, better indoor air quality, and no ceiling clashes.",
    systems: [
      "Heat Load Calculations",
      "VRF & Chilled Water Design",
      "Ductwork Layouts",
      "Ventilation",
      "Equipment Selection",
    ],
    image: "/images/hvac.webp",
    href: "/services",
  },
  
  {
    order: "02",
    pretitle: "Plumbing & Public Health Engineering (PHE)",
    title: "Efficient water supply and drainage that works on handover, not just on paper.",
    description:
      "Plumbing is where late-stage clashes with structure and architecture are most expensive. We size systems to national codes and coordinate them with your team early, so shafts, slopes and levels are resolved before construction starts. Sustainable water management, including rainwater harvesting and STP/WTP integration, is part of the design from the start.",
    benefit: "Clash-free execution, lower water use, and drainage that performs.",
    systems: [
      "Domestic Water",
      "Sanitary Drainage",
      "Stormwater",
      "Rainwater Harvesting",
      "STP/WTP Integration",
    ],
    image: "/images/plumbing.webp",
    href: "/services",
  },
  {
    order: "03",
    pretitle: "Electrical Design: HT & LT Power Systems",
    title: "Reliable power from grid to final circuit, ready for tomorrow's load.",
    description:
      "Undersized panels and weak earthing cause downtime and failed inspections. Every design is backed by load calculations and short-circuit studies, so protection, cabling and capacity are right on day one and have headroom to grow.",
    benefit: "Safe, compliant distribution and room for expansion without costly retrofits.",
    systems: [
      "HT & LT Panels",
      "Transformers & DG Sets",
      "Bus Ducts",
      "Lighting & Small Power",
      "Earthing & Lightning Protection",
    ],
    image: "/images/electrical.jpg",
    href: "/services",
  },
  {
    order: "04",
    pretitle: "Fire Protection Design",
    title: "Life safety designed in from day one, with drawings built to clear approval.",
    description:
      "Fire approvals can stall a whole project. Our drawings follow the National Building Code (NBC), NFPA standards and local fire authority requirements, which shortens the statutory clearance process and protects your handover date.",
    benefit: "Approval-ready drawings, fewer authority comments, and a safer building.",
    systems: [
      "Fire Hydrants",
      "Sprinklers & Wet Risers",
      "Fire Pump Rooms",
      "Fire Alarm Systems",
      "PA Networks",
    ],
    image: "/images/fps.webp",
    href: "/services",
  },
];

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
export { ButtonZoomIn as DualRollButton, ButtonZoomIn } from "@/components/buttonzoomin";

/* ═══════════════════════════════════════════════════════════════
   MAIN SOLUTIONS STACK SECTION
═══════════════════════════════════════════════════════════════ */
export function SolutionsStack() {
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
                <span className="w-1.5 h-1.5 bg-[#121212] inline-block" aria-hidden="true" />
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

          {/* Right Column: Interactive AutoCAD Cursor Tracker */}
          <div className="relative p-0 flex items-stretch min-h-[260px] lg:min-h-[340px]">
            <CursorTracker />
          </div>
        </div>
      </div>

      {/* ── 2. STACK CONTAINER (Sticky Cards Deck) ── */}
      <div className="relative w-full pb-0">
        <style>{`
          .solution-card-0 { top: 56px !important; z-index: 10 !important; }
          .solution-card-1 { top: 148px !important; z-index: 20 !important; }
          .solution-card-2 { top: 240px !important; z-index: 30 !important; }

          @media (min-width: 1024px) {
            .solution-card-0 { top: 76px !important; }
            .solution-card-1 { top: 172px !important; }
            .solution-card-2 { top: 268px !important; }
          }
        `}</style>

        {STACK_ITEMS.map((item, index) => {
          const isLast = index === STACK_ITEMS.length - 1;

          return (
            <Fragment key={item.order}>
              <div
                id={`stack-${item.order}`}
                className={
                  isLast
                    ? "relative z-40 w-full bg-[#f7fbff] border-t border-b border-[#121212]/15 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] will-change-transform"
                    : `solution-card-${index} sticky w-full bg-[#f7fbff] border-t border-b border-[#121212]/15 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] will-change-transform`
                }
              >
                <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] lg:grid-cols-[200px_360px_1fr] xl:grid-cols-[240px_380px_1fr] divide-y md:divide-y-0 md:divide-x divide-[#121212]/15">
                  {/* ── COLUMN 1: Order / Index ── */}
                  <div className="px-6 py-4 lg:px-10 xl:px-12 lg:py-4 flex items-start justify-between md:justify-start">
                    <div className="min-h-[72px] lg:min-h-[84px] flex items-center text-[1.15rem] lg:text-[1.4rem] font-bold font-metropolis tracking-tight text-[#121212]">
                      <span>{item.order}</span>
                      <SlantedDash />
                    </div>
                    {/* Mobile-only category tag next to index */}
                    <span className="md:hidden text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#261CC1] self-center">
                      {item.pretitle}
                    </span>
                  </div>

                  {/* ── COLUMN 2: Image ── */}
                  <div className="p-4 lg:p-6 flex items-start justify-center bg-[#f7fbff]/40">
                    <div className="relative w-full aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3] max-h-[360px] overflow-hidden bg-white/40 border border-[#121212]/10">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1280px) 380px, (min-width: 1024px) 360px, (min-width: 768px) 300px, 100vw"
                        className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                        unoptimized
                      />
                    </div>
                  </div>

                  {/* ── COLUMN 3: Content & Action ── */}
                  <div className="px-6 py-4 lg:px-10 lg:py-4 flex flex-col justify-between min-h-[360px] lg:min-h-[440px]">
                    <div>
                      {/* ── TITLE HEADER (Only this part remains visible when card is stacked) ── */}
                      <div className="min-h-[72px] lg:min-h-[84px] flex flex-col justify-center py-0.5">
                        <div className="hidden md:block text-[0.7rem] lg:text-[0.75rem] font-bold tracking-[0.18em] uppercase text-[#261CC1] mb-1 font-metropolis">
                          {item.pretitle}
                        </div>

                        <h3 className="font-extrabold font-metropolis text-[1.1rem] md:text-[1.28rem] lg:text-[1.42rem] leading-[1.25] tracking-[-0.025em] text-[#121212] m-0 max-w-[720px]">
                          {item.title}
                        </h3>
                      </div>

                      {/* ── DESCRIPTION & DETAILS (100% hidden by next card when stacked) ── */}
                      <div className="pt-4 lg:pt-5">
                        <p className="text-[0.88rem] lg:text-[0.94rem] leading-[1.6] text-[#121212]/75 max-w-[680px] font-metropolis m-0">
                          {item.description}
                        </p>

                        {/* What you get callout */}
                        <div className="mt-4 p-3.5 lg:p-4 bg-white/70 border-l-2 border-[#261CC1] border-y border-r border-[#121212]/10 max-w-[680px]">
                          <div className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-[#261CC1] mb-1 font-metropolis">
                            What you get
                          </div>
                          <p className="text-[0.85rem] lg:text-[0.9rem] font-medium leading-[1.5] text-[#121212] m-0 font-metropolis">
                            {item.benefit}
                          </p>
                        </div>

                        {/* Systems for SEO only (accessible to crawlers, hidden from visual screen) */}
                        <div className="sr-only" aria-hidden="false">
                          <h4>Systems and Scope:</h4>
                          <p>{item.systems.join(" · ")}</p>
                        </div>
                      </div>
                    </div>

                    {/* Lower action */}
                    <div className="pt-5 pb-2">
                      <ButtonZoomIn href={item.href} label="Learn more" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Spacer between cards only. Nothing after card 04, so the section ends with it. */}
              {!isLast && <div aria-hidden="true" style={{ height: SCROLL_GAP }} />}
            </Fragment>
          );
        })}
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
