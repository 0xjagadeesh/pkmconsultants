"use client";

import Link from "next/link";
import { useRef } from "react";

import { SectionLabel } from "@/components/blocks/section-label";
import { MaskRevealText } from "@/components/mask-reveal-text";

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

// One curve for the whole wipe (background, text and icon move as one layer)
const WIPE = "clip-path 900ms cubic-bezier(0.16,1,0.3,1)";
const HIDDEN_TOP = "inset(0% 0% 100% 0%)"; // collapsed at the top (enter start)
const SHOWN = "inset(0% 0% 0% 0%)";
const HIDDEN_BOTTOM = "inset(100% 0% 0% 0%)"; // collapsed at the bottom (exit end)

// Row layout shared by the base layer and the blue overlay, so they align exactly
const ROW_GRID =
  "grid min-h-11 grid-cols-[3.5rem_minmax(0,1fr)_auto] items-center gap-x-4 px-6 py-4 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] lg:px-10 lg:py-5";

/** Number, title and icon square in one colour scheme. */
function RowContent({
  item,
  active,
}: {
  item: ServiceNavItem;
  active: boolean;
}) {
  return (
    <>
      <span
        className={`font-bold font-metropolis text-[1.1rem] tracking-tight lg:text-[clamp(1.4rem,2.4vw,2.4rem)] ${
          active ? "text-[#f7fbff]" : "text-[#121212]"
        }`}
      >
        {item.number}
        <span className="ml-2 lg:ml-3">/</span>
      </span>
      <span
        className={`font-extrabold font-metropolis text-[1.15rem] leading-[1.25] tracking-[-0.025em] lg:text-[clamp(1.4rem,2.4vw,2.4rem)] ${
          active ? "text-[#f7fbff]" : "text-[#121212]"
        }`}
      >
        {item.title}
      </span>
      <span
        aria-hidden="true"
        className={`flex size-11 items-center justify-center lg:size-16 ${
          active
            ? "bg-[#f7fbff] text-[#261CC1]"
            : "bg-[#121212]/[0.06] text-[#121212]/60"
        }`}
      >
        <Glyph icon={item.icon} />
      </span>
    </>
  );
}

/**
 * One row. The hover state is a full blue copy of the row (white text, white
 * icon square) laid over the base row and revealed by a single clip-path, so
 * the background and every piece of text change at exactly the same edge.
 * Enter: the clip opens from the top down. Leave: it closes towards the
 * bottom, continuing the same direction.
 */
function NavRow({ item }: { item: ServiceNavItem }) {
  const overlayRef = useRef<HTMLSpanElement>(null);

  const enter = () => {
    const el = overlayRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.transition = "none";
      el.style.clipPath = SHOWN;
      return;
    }
    // Restart from the top edge, then open downwards
    el.style.transition = "none";
    el.style.clipPath = HIDDEN_TOP;
    el.getBoundingClientRect(); // commit the start state
    el.style.transition = WIPE;
    el.style.clipPath = SHOWN;
  };

  const leave = () => {
    const el = overlayRef.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    el.style.transition = reduced ? "none" : WIPE;
    el.style.clipPath = HIDDEN_BOTTOM;
  };

  return (
    <li>
      <Link
        className={`relative border-[#121212]/15 border-b no-underline outline-none focus-visible:ring-2 focus-visible:ring-[#261CC1] focus-visible:ring-inset ${ROW_GRID}`}
        href={item.href}
        onBlur={leave}
        onFocus={enter}
        onMouseEnter={enter}
        onMouseLeave={leave}
      >
        <RowContent active={false} item={item} />

        {/* Blue copy of the row, revealed by one clip */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-[#261CC1] ${ROW_GRID}`}
          ref={overlayRef}
          style={{ clipPath: HIDDEN_TOP }}
        >
          <RowContent active item={item} />
        </span>
      </Link>
    </li>
  );
}

/**
 * Light index of links (e.g. "next service"). Hovering or focusing a row
 * wipes a blue copy of it in from the top (and out through the bottom), so
 * the background, text and icon always change together. Each row animates
 * on its own; other rows never change.
 */
export function ServiceNavList({
  label = "Next service",
  title,
  items,
  id,
}: ServiceNavListProps) {
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
        <MaskRevealText
          className="m-0 mt-6 font-extrabold font-metropolis text-[#121212] text-[clamp(2rem,5vw,4rem)] leading-[1.04] tracking-[-0.035em]"
          lines={lines}
        />
      </div>

      {/* Rows */}
      <nav aria-label={lines.join(" ")}>
        <ul className="m-0 list-none border-[#121212]/15 border-t p-0">
          {items.map((item) => (
            <NavRow item={item} key={item.href} />
          ))}
        </ul>
      </nav>
    </section>
  );
}
