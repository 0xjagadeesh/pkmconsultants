"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";

import { SectionLabel } from "@/components/blocks/section-label";

/* ─────────────────────────────────────────────
   ICONS — square drafting glyphs per discipline
───────────────────────────────────────────── */
export type ServiceNavIcon = "hvac" | "phe" | "fps" | "elv" | "electrical";

const ICON_PATHS: Record<ServiceNavIcon, string> = {
  // Airflow: three slanted vanes
  hvac: "M3 15 9 5h3L6 15Zm6 0 6-10h3l-6 10Zm6 0 3-5v5Z",
  // Water: droplet over a drain line
  phe: "M12 3c3 4 5 6.6 5 9a5 5 0 0 1-10 0c0-2.4 2-5 5-9Zm-9 17h18v1.6H3Z",
  // Flame
  fps: "M12 2c1 3.6 5 5.6 5 10.2A5 5 0 0 1 7 12.6c0-2 .9-3.4 2-4.6.2 1.8 1 2.8 2 3.2-.6-3 .2-6.4 1-9.2Z",
  // Signal: dot with two arcs
  elv: "M10.3 15.7a2.4 2.4 0 1 0 3.4 0 2.4 2.4 0 0 0-3.4 0ZM6.8 12.2l1.4 1.4a5.4 5.4 0 0 1 7.6 0l1.4-1.4a7.4 7.4 0 0 0-10.4 0Zm-3.5-3.5 1.4 1.4a10.3 10.3 0 0 1 14.6 0l1.4-1.4a12.3 12.3 0 0 0-17.4 0Z",
  // Bolt
  electrical: "M13.5 2 5 13.5h6L9.5 22 19 9.8h-6.2Z",
};

function Glyph({ icon }: { icon: ServiceNavIcon }) {
  return (
    <svg
      aria-hidden="true"
      className="size-6 fill-current lg:size-7"
      viewBox="0 0 24 24"
    >
      <path d={ICON_PATHS[icon]} />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
export type ServiceNavItem = {
  /** Shown as "02 /" — usually the discipline's position in the full list */
  number: string;
  title: string;
  href: string;
  icon: ServiceNavIcon;
};

type ServiceNavListProps = {
  /** Small eyebrow above the heading */
  label?: string;
  /** One string, or one string per line */
  title: string | string[];
  items: ServiceNavItem[];
  id?: string;
};

// Fast architectural ease used across the site's hover states
const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

/**
 * Light index of links (e.g. "next service"). A brand-blue highlight slides to
 * the hovered / focused row, its label rolls and turns white, its icon square
 * inverts with a rolling glyph. Other rows stay as they are.
 * Touch devices get plain rows (no hover), still fully tappable.
 */
export function ServiceNavList({
  label = "Next service",
  title,
  items,
  id,
}: ServiceNavListProps) {
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [box, setBox] = useState({ top: 0, height: 0 });

  const activate = useCallback((index: number) => {
    const row = rowRefs.current[index];
    if (!row) return;
    setBox({ top: row.offsetTop, height: row.offsetHeight });
    setActive(index);
  }, []);

  const lines = Array.isArray(title) ? title : [title];

  return (
    <section
      className="border-[#121212]/15 border-b bg-[#f7fbff] text-[#121212]"
      data-nav-tone="light"
      id={id}
    >
      {/* Heading */}
      <div className="px-6 pt-14 pb-12 sm:px-10 lg:px-10 lg:pt-24 lg:pb-20">
        <SectionLabel>{label}</SectionLabel>
        <h2 className="m-0 mt-6 font-extrabold font-metropolis text-[#121212] text-[clamp(2rem,5vw,4rem)] leading-[1.04] tracking-[-0.035em]">
          {lines.map((line) => (
            <span className="block" key={line}>
              {line}
            </span>
          ))}
        </h2>
      </div>

      {/* Rows */}
      <nav aria-label={lines.join(" ")}>
        <ul
          className="relative m-0 list-none border-[#121212]/15 border-t p-0"
          onMouseLeave={() => setActive(null)}
        >
          {/* Sliding highlight (pointer devices only) */}
          <li
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 top-0 hidden bg-[#261CC1] transition-[transform,height,opacity] duration-[900ms] motion-reduce:transition-none pointer-fine:block ${EASE} ${
              active === null ? "opacity-0" : "opacity-100"
            }`}
            style={{
              height: box.height,
              transform: `translateY(${box.top}px)`,
            }}
          />

          {items.map((item, index) => {
            const isActive = active === index;
            return (
              <li
                className="relative"
                key={item.href}
                ref={(el) => {
                  rowRefs.current[index] = el;
                }}
              >
                <Link
                  className={`group grid min-h-11 grid-cols-[3.5rem_minmax(0,1fr)_auto] items-center gap-x-4 border-[#121212]/15 border-b px-6 py-4 no-underline outline-none focus-visible:ring-2 focus-visible:ring-[#261CC1] focus-visible:ring-inset sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] lg:px-10 lg:py-5`}
                  data-active={isActive}
                  href={item.href}
                  onBlur={() => setActive(null)}
                  onFocus={() => activate(index)}
                  onMouseEnter={() => activate(index)}
                >
                  {/* Number */}
                  <span
                    className={`font-bold font-metropolis text-[#121212] text-[1.1rem] tracking-tight transition-colors duration-700 group-data-[active=true]:text-[#f7fbff] lg:text-[clamp(1.4rem,2.4vw,2.4rem)] ${EASE}`}
                  >
                    {item.number}
                    <span className="ml-2 lg:ml-3">/</span>
                  </span>

                  {/* Title with roll-up on activate */}
                  <span className="relative block overflow-hidden font-extrabold font-metropolis text-[1.15rem] leading-[1.25] tracking-[-0.025em] lg:text-[clamp(1.4rem,2.4vw,2.4rem)]">
                    <span
                      className={`block text-[#121212] transition-transform duration-[900ms] motion-reduce:transition-none group-data-[active=true]:-translate-y-full ${EASE}`}
                    >
                      {item.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 top-0 block translate-y-full text-[#f7fbff] transition-transform duration-[900ms] motion-reduce:transition-none group-data-[active=true]:translate-y-0 ${EASE}`}
                    >
                      {item.title}
                    </span>
                  </span>

                  {/* Icon square: tint → white, glyph rolls diagonally */}
                  <span
                    aria-hidden="true"
                    className={`relative flex size-11 items-center justify-center overflow-hidden bg-[#121212]/[0.06] text-[#121212]/60 transition-colors duration-700 group-data-[active=true]:bg-[#f7fbff] group-data-[active=true]:text-[#261CC1] lg:size-16 ${EASE}`}
                  >
                    <span
                      className={`absolute transition-transform duration-[900ms] motion-reduce:transition-none group-data-[active=true]:translate-x-[150%] group-data-[active=true]:-translate-y-[150%] ${EASE}`}
                    >
                      <Glyph icon={item.icon} />
                    </span>
                    <span
                      className={`absolute -translate-x-[150%] translate-y-[150%] transition-transform duration-[900ms] motion-reduce:transition-none group-data-[active=true]:translate-x-0 group-data-[active=true]:translate-y-0 ${EASE}`}
                    >
                      <Glyph icon={item.icon} />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
}
