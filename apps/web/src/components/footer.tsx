"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { MOTION_OK } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   FONT STACK & CONSTANTS
───────────────────────────────────────────── */
const SUISSE_FONT_STACK =
  'suisse, "suisse Fallback", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

const YEAR = new Date().getFullYear();

// Reference size used to measure the wordmark before scaling it to fit
const WORDMARK_PROBE = 100;
// Pillar's cap height (no descenders in the wordmark) and ascent, in em.
// The wordmark's layout box is made exactly the ink height, so there is no
// dead space above or below the letters.
const WORDMARK_INK = 0.68;
const WORDMARK_ASCENT = 0.75;
// With line-height = INK the caps poke this far (em) above the line box.
// Padding it back in on top and pulling the same amount off the bottom leaves
// a layout box that starts at the cap top and ends at the baseline.
const WORDMARK_OVERSHOOT =
  (1 - WORDMARK_INK) / 2 - (WORDMARK_ASCENT - WORDMARK_INK);
// From lg up the footer is exactly one screen tall; the wordmark fills what's left
const FIT_HEIGHT_QUERY = "(min-width: 1024px)";

// Shared 3-column grid so blocks, top strip and bottom row line up
const FOOTER_COLS = "lg:grid-cols-[1.05fr_1fr_1fr]";

// Below lg: Sec. 01 spans the full width, Sec. 02 and 03 sit side by side.
// From lg: three columns split by vertical gridlines.
const BLOCK_BORDERS = [
  "col-span-2 lg:col-span-1",
  "border-t border-r lg:border-t-0 lg:border-r-0 lg:border-l",
  "border-t lg:border-t-0 lg:border-l",
];

interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterBlock {
  label: string;
  /** One or two link columns, pinned to the bottom of the block */
  columns: NavLink[][];
  /** Optional line under the links (e.g. location) */
  note?: string;
}

const FOOTER_BLOCKS: FooterBlock[] = [
  {
    label: "Sec. 01",
    columns: [
      [
        { label: "About Us", href: "/about" },
        { label: "Projects", href: "/projects" },
        { label: "Our Story", href: "/about" },
        { label: "Careers", href: "/contact" },
      ],
      [
        { label: "MEPF Engineering", href: "/services" },
        { label: "HVAC Design", href: "/services" },
        { label: "Electrical Design", href: "/services" },
        { label: "PHE Design", href: "/services" },
        { label: "Fire & Life Safety", href: "/services" },
      ],
    ],
  },
  {
    label: "Sec. 02",
    columns: [
      [
        { label: "Case Studies", href: "/projects" },
        { label: "Insights & Blog", href: "/blog" },
        { label: "Contact Us", href: "/contact" },
      ],
    ],
  },
  {
    label: "Sec. 03",
    columns: [
      [
        {
          label: "info@pkmconsultants.in",
          href: "mailto:info@pkmconsultants.in",
        },
        { label: "+91 98765 43210", href: "tel:+919876543210" },
        { label: "LinkedIn", href: "https://linkedin.com", external: true },
      ],
    ],
    note: "Chennai, Tamil Nadu, India",
  },
];

/** Lets an email wrap after "@" instead of mid-word in narrow columns. */
function WrapAfterAt({ text }: { text: string }) {
  const at = text.indexOf("@");
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at + 1)}
      <wbr />
      {text.slice(at + 1)}
    </>
  );
}

function FooterLink({ link }: { link: NavLink }) {
  return (
    <Link
      href={link.href}
      {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="inline-flex min-h-11 items-center text-[#121212] text-[0.95rem] transition-colors duration-200 [overflow-wrap:anywhere] hover:text-[#261CC1] sm:text-[1.05rem] lg:text-[1.15rem] lg:pointer-fine:min-h-0 lg:pointer-fine:leading-[1.6]"
    >
      <WrapAfterAt text={link.label} />
    </Link>
  );
}

/* ─────────────────────────────────────────────
   MAIN FOOTER COMPONENT
───────────────────────────────────────────── */
export function Footer() {
  const bandRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);

  /* Fit the wordmark to the exact band width (Pillar loads async, so refit on
     font load and on every resize). */
  useEffect(() => {
    const band = bandRef.current;
    const word = wordRef.current;
    if (!(band && word)) return;

    const fit = () => {
      const style = getComputedStyle(band);
      const availableWidth =
        band.clientWidth -
        Number.parseFloat(style.paddingLeft) -
        Number.parseFloat(style.paddingRight);
      // Height only constrains the wordmark when the footer is screen-locked
      const availableHeight = window.matchMedia(FIT_HEIGHT_QUERY).matches
        ? band.clientHeight -
          Number.parseFloat(style.paddingTop) -
          Number.parseFloat(style.paddingBottom)
        : Number.POSITIVE_INFINITY;

      word.style.fontSize = `${WORDMARK_PROBE}px`;
      const measured = word.getBoundingClientRect().width;
      if (measured <= 0) return;
      const byWidth = (WORDMARK_PROBE * availableWidth) / measured;
      const byHeight = availableHeight / WORDMARK_INK;
      word.style.fontSize = `${Math.max(0, Math.min(byWidth, byHeight))}px`;
    };

    fit();
    document.fonts?.ready.then(fit).catch(() => undefined);
    const observer = new ResizeObserver(fit);
    observer.observe(band);
    return () => observer.disconnect();
  }, []);

  /* Wordmark slides up into its band as the footer scrolls into view. */
  useEffect(() => {
    const band = bandRef.current;
    const word = wordRef.current;
    if (!(band && word)) return;

    const mm = gsap.matchMedia(band);
    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        word,
        { yPercent: 40 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: band,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <footer
      className="relative overflow-hidden bg-[#f7fbff] text-[#121212] lg:flex lg:h-svh lg:flex-col"
      style={{ fontFamily: SUISSE_FONT_STACK }}
    >
      {/* ── 1. Top strip — empty gridline row ── */}
      <div
        aria-hidden="true"
        className={`hidden h-14 shrink-0 grid-cols-1 border-[#121212]/15 border-t lg:grid ${FOOTER_COLS}`}
      >
        <div className="border-[#121212]/15 border-r" />
        <div />
        <div />
      </div>

      {/* ── 2. Link blocks ── */}
      <nav
        aria-label="Footer"
        className={`grid shrink-0 grid-cols-2 border-[#121212]/15 border-t ${FOOTER_COLS}`}
      >
        {FOOTER_BLOCKS.map((block, index) => (
          <div
            className={`flex min-w-0 flex-col justify-between gap-5 border-[#121212]/15 px-6 pt-4 pb-5 sm:gap-6 sm:px-8 sm:pt-5 sm:pb-6 lg:min-h-[clamp(240px,34svh,366px)] lg:gap-10 lg:px-6 lg:pt-8 lg:pb-8 ${BLOCK_BORDERS[index] ?? ""}`}
            key={block.label}
          >
            {/* Block header: label + marker */}
            <div className="flex items-center justify-between">
              <span className="font-bold font-mosvita text-[#121212] text-[0.95rem] uppercase tracking-[0.04em] lg:text-[1.1rem]">
                {block.label}
              </span>
              <span
                aria-hidden="true"
                className="inline-block size-2.5 shrink-0 bg-[#121212]"
              />
            </div>

            {/* Links, pinned to the bottom of the block */}
            <div
              className={`grid gap-x-6 ${
                block.columns.length > 1 ? "grid-cols-2" : "grid-cols-1"
              }`}
            >
              {block.columns.map((column) => (
                <ul
                  className="m-0 flex min-w-0 list-none flex-col p-0"
                  key={column[0]?.label}
                >
                  {column.map((link) => (
                    <li key={link.label}>
                      <FooterLink link={link} />
                    </li>
                  ))}
                </ul>
              ))}
              {block.note ? (
                <p className="m-0 mt-4 text-[#5b5a8a] text-[0.85rem] sm:text-[0.95rem] lg:mt-8 lg:text-[1rem]">
                  {block.note}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </nav>

      {/* ── 3. Wordmark band ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative flex select-none items-center justify-center overflow-hidden border-[#121212]/15 border-t px-6 py-5 sm:px-8 sm:py-8 lg:min-h-0 lg:flex-1 lg:basis-0 lg:px-12 lg:py-[clamp(1.25rem,4svh,3rem)]"
        ref={bandRef}
      >
        <span
          className="block w-fit whitespace-nowrap text-[#261CC1] text-[16vw] uppercase tracking-[0.01em] will-change-transform"
          ref={wordRef}
          style={{ fontFamily: "'Pillar', 'Piller', sans-serif" }}
        >
          {/* Layout box = ink box (cap top → baseline) */}
          <span
            className="block"
            style={{
              lineHeight: WORDMARK_INK,
              paddingTop: `${WORDMARK_OVERSHOOT}em`,
              marginBottom: `${-WORDMARK_OVERSHOOT}em`,
            }}
          >
            PKM Consultants
          </span>
        </span>
      </div>

      {/* ── 4. Bottom row — aligned to the block columns ── */}
      <div
        className={`grid shrink-0 grid-cols-2 gap-x-6 gap-y-0 border-[#121212]/15 border-t px-6 py-2 font-mosvita text-[#121212] text-[0.75rem] uppercase tracking-[0.04em] sm:px-8 lg:gap-x-0 lg:px-0 lg:py-0 ${FOOTER_COLS}`}
      >
        <span className="col-span-2 flex min-h-11 items-center font-bold lg:col-span-1 lg:min-h-16 lg:px-6">
          © {YEAR} PKM Consultants
        </span>
        <span className="flex items-center lg:px-6">
          <Link
            className="inline-flex min-h-11 items-center transition-colors hover:text-[#261CC1] lg:pointer-fine:min-h-0"
            href="/terms"
          >
            Terms of Service
          </Link>
        </span>
        <span className="flex items-center justify-between gap-6 lg:px-6">
          <Link
            className="inline-flex min-h-11 items-center transition-colors hover:text-[#261CC1] lg:pointer-fine:min-h-0"
            href="/privacy"
          >
            Privacy Policy
          </Link>
          <span className="hidden text-[#5b5a8a] lg:inline">
            13.0827° N · 80.2707° E
          </span>
        </span>
      </div>
    </footer>
  );
}

/** @deprecated Use Footer directly */
export async function FooterServer() {
  return <Footer />;
}

export function FooterSkeleton() {
  return <div className="h-20 animate-pulse bg-muted/30" />;
}
