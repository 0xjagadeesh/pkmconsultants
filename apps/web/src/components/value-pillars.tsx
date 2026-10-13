"use client";

import Image from "next/image";
import { useState } from "react";
import { MaskRevealText } from "./mask-reveal-text";
import { ButtonZoomIn } from "./buttonzoomin";

export interface ValuePillarItem {
  id: string;
  title: string;
  description: string;
  href: string;
  buttonLabel?: string;
  image: string;
  imageAlt: string;
}



const DEFAULT_PILLARS: ValuePillarItem[] = [
  {
    id: "coordinated-design",
    title: "Fewer Site Changes",
    description:
      "HVAC, electrical, plumbing and fire services are designed together from concept stage, so clashes are resolved before installation begins.",
    href: "/projects",
    buttonLabel: "See our projects",
    image: "/images/coordinated-mep-design.webp",
    imageAlt:
      "Coordinated MEP services layout showing ducts, pipes and cable trays",
  },
  {
    id: "energy-efficiency",
    title: "Lower Operating Costs",
    description:
      "Accurate HVAC load calculations and right-sized systems cut wasted energy and support IGBC, LEED and ECBC requirements.",
    href: "/projects",
    buttonLabel: "View sustainable projects",
    image: "/images/energy-efficient-hvac-design.webp",
    imageAlt:
      "Energy-efficient rooftop HVAC units on a green-certified commercial building",
  },
  {
    id: "approvals-safety",
    title: "Faster Approvals",
    description:
      "NBC and NFPA-compliant drawings with clear documentation help you secure fire and statutory approvals sooner.",
    href: "/contact",
    buttonLabel: "Discuss your project",
    image: "/images/fire-life-safety-design.webp",
    imageAlt:
      "Engineer reviewing NFPA-compliant fire protection sprinkler layout drawings",
  },
];

interface ValuePillarsProps {
  pretitle?: string;
  titleLines?: string[];
  items?: ValuePillarItem[];
  defaultOpenIndex?: number;
}

export function ValuePillars({
  pretitle = "WHY US",
  titleLines = [
    "MEP design that",
    "reduces rework,",
    "cuts operating costs",
  ],
  items = DEFAULT_PILLARS,
  defaultOpenIndex = 2, // "Certification" is open by default as shown in reference design
}: ValuePillarsProps) {
  // Always maintain 1 open state (2 closed, 1 open) to prevent layout collapse / empty space
  const [openIndex, setOpenIndex] = useState<number>(defaultOpenIndex);

  const selectItem = (index: number) => {
    setOpenIndex(index);
  };

  return (
    <section className="relative w-full bg-[#f7fbff] text-[#121212] overflow-hidden border-b border-[#121212]/15">
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#121212]/15">
        {/* ── LEFT COLUMN: Pretitle + Masked Title ── */}
        <div className="px-6 sm:px-10 lg:px-14 xl:px-16 pt-10 sm:pt-12 lg:pt-14 pb-12 sm:pb-16 lg:pb-20 flex flex-col justify-between">
          <div>
            {/* Header / Pretitle Row */}
            <div className="flex items-center justify-between mb-8 sm:mb-12 lg:mb-16">
              <span className="text-[0.75rem] sm:text-[0.8rem] font-bold tracking-[0.24em] uppercase font-metropolis text-primary">
                {pretitle}
              </span>
              <span
                className="w-1.5 h-1.5 bg-[#121212] inline-block shrink-0"
                aria-hidden="true"
              />
            </div>

            {/* Main Title with Mask Curtain Reveal */}
            <div className="max-w-[580px]">
              <MaskRevealText
                as="h2"
                className="font-metropolis text-[#121212] font-medium text-[clamp(1.95rem,3.8vw,3.25rem)] leading-[1.12] tracking-[-0.03em] m-0"
                lines={titleLines}
                maskColor="#121212"
                duration={0.9}
                stagger={0.12}
                replayOnScroll={false}
              />
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: Interactive Accordion Toggles (Always 1 open, 2 closed) ── */}
        <div className="flex flex-col divide-y divide-[#121212]/15">
          {items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={item.id} className="relative w-full transition-colors duration-200">
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  onClick={() => selectItem(index)}
                  className="w-full flex items-center justify-between text-left py-6 sm:py-7 lg:py-8 px-6 sm:px-10 lg:px-12 group cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#261CC1]/40"
                  aria-expanded={isOpen}
                  id={`value-pillar-header-${item.id}`}
                  aria-controls={`value-pillar-content-${item.id}`}
                >
                  <span className="font-metropolis text-[1.35rem] sm:text-[1.6rem] lg:text-[1.85rem] font-medium tracking-tight text-[#121212] group-hover:text-[#261CC1] transition-colors duration-200">
                    {item.title}
                  </span>

                  {/* Architectural Plus / Minus Icon */}
                  <span
                    className="relative w-5 h-5 flex items-center justify-center shrink-0 ml-4"
                    aria-hidden="true"
                  >
                    {/* Horizontal Bar */}
                    <span className="absolute w-4 h-[1.5px] bg-[#121212] group-hover:bg-[#261CC1] transition-colors duration-200" />
                    {/* Vertical Bar (shrinks/hides when open) */}
                    <span
                      className={`absolute w-[1.5px] h-4 bg-[#121212] group-hover:bg-[#261CC1] transition-all duration-300 ease-in-out ${
                        isOpen ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100"
                      }`}
                    />
                  </span>
                </button>

                {/* Accordion Expandable Content */}
                <div
                  id={`value-pillar-content-${item.id}`}
                  role="region"
                  aria-labelledby={`value-pillar-header-${item.id}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-350 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 sm:px-10 lg:px-12 pb-8 sm:pb-10 lg:pb-12 pt-1">
                      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 lg:gap-10">
                        {/* Left description + DualRollButton */}
                        <div className="flex-1 max-w-[440px] flex flex-col justify-between">
                          <p className="text-[0.88rem] sm:text-[0.92rem] lg:text-[0.96rem] leading-[1.62] text-[#121212]/80 font-metropolis m-0">
                            {item.description}
                          </p>

                          <div className="mt-7 lg:mt-9">
                            <ButtonZoomIn
                              href={item.href}
                              label={item.buttonLabel || "Learn more"}
                            />
                          </div>
                        </div>

                        {/* Right Pillar Square Image */}
                        <div className="relative w-[180px] sm:w-[200px] lg:w-[215px] aspect-square shrink-0 overflow-hidden border border-[#121212]/10 bg-white/40 shadow-sm">
                          <Image
                            src={item.image}
                            alt={item.imageAlt}
                            fill
                            sizes="(min-width: 1024px) 215px, (min-width: 640px) 200px, 180px"
                            className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                            unoptimized
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
