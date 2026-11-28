import Link from "next/link";

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

// One motion for every moving part, so wipe, text and icon land together
const MOTION =
  "transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none";

// "On" state for a row: mouse hover or keyboard focus
// (outgoing copy drops down out of view, incoming copy drops in from above)
const OUT = "group-hover:translate-y-full group-focus-visible:translate-y-full";
const IN =
  "-translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0";

/** A value that rolls top → bottom: dark copy out, light copy in. */
function Roll({
  children,
  from,
  to,
}: {
  children: React.ReactNode;
  from: string;
  to: string;
}) {
  return (
    <span className="relative block overflow-hidden">
      <span className={`block ${from} ${MOTION} ${OUT}`}>{children}</span>
      <span
        aria-hidden="true"
        className={`absolute inset-0 block ${to} ${MOTION} ${IN}`}
      >
        {children}
      </span>
    </span>
  );
}

/**
 * Light index of links (e.g. "next service"). Every row has its own blue
 * layer that wipes in top → bottom on hover / focus (and leaves downward);
 * the number, title and icon roll down with the same timing. Pure CSS, so
 * each row animates independently and other rows never change.
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
            <li key={item.href}>
              <Link
                className="group relative grid min-h-11 grid-cols-[3.5rem_minmax(0,1fr)_auto] items-center gap-x-4 overflow-hidden border-[#121212]/15 border-b px-6 py-4 no-underline outline-none focus-visible:ring-2 focus-visible:ring-[#261CC1] focus-visible:ring-inset sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] lg:px-10 lg:py-5"
                href={item.href}
              >
                {/* Row wipe: grows from the top on enter, exits at the bottom */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-[#261CC1] group-hover:origin-top group-hover:scale-y-100 group-focus-visible:origin-top group-focus-visible:scale-y-100 ${MOTION}`}
                />

                {/* Number */}
                <span className="relative font-bold font-metropolis text-[1.1rem] tracking-tight lg:text-[clamp(1.4rem,2.4vw,2.4rem)]">
                  <Roll from="text-[#121212]" to="text-[#f7fbff]">
                    {item.number}
                    <span className="ml-2 lg:ml-3">/</span>
                  </Roll>
                </span>

                {/* Title */}
                <span className="relative font-extrabold font-metropolis text-[1.15rem] leading-[1.25] tracking-[-0.025em] lg:text-[clamp(1.4rem,2.4vw,2.4rem)]">
                  <Roll from="text-[#121212]" to="text-[#f7fbff]">
                    {item.title}
                  </Roll>
                </span>

                {/* Icon square: its own white wipe + glyph rolling down */}
                <span
                  aria-hidden="true"
                  className="relative flex size-11 items-center justify-center overflow-hidden bg-[#121212]/[0.06] lg:size-16"
                >
                  <span
                    className={`absolute inset-0 origin-bottom scale-y-0 bg-[#f7fbff] group-hover:origin-top group-hover:scale-y-100 group-focus-visible:origin-top group-focus-visible:scale-y-100 ${MOTION}`}
                  />
                  <span
                    className={`absolute text-[#121212]/60 ${MOTION} group-hover:translate-y-[150%] group-focus-visible:translate-y-[150%]`}
                  >
                    <Glyph icon={item.icon} />
                  </span>
                  <span
                    className={`absolute -translate-y-[150%] text-[#261CC1] group-hover:translate-y-0 group-focus-visible:translate-y-0 ${MOTION}`}
                  >
                    <Glyph icon={item.icon} />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
