"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   FONT STACK & CONSTANTS
───────────────────────────────────────────── */
const SUISSE_FONT_STACK =
  'suisse, "suisse Fallback", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

const YEAR = new Date().getFullYear();

interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

interface NavSection {
  title: string;
  links: NavLink[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Services",
    links: [
      { label: "MEPF Engineering", href: "/services" },
      { label: "Electrical Design", href: "/services" },
      { label: "HVAC Design", href: "/services" },
      { label: "Fire & Life Safety", href: "/services" },
      { label: "PHE Design", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Our Story", href: "/about" },
      { label: "Careers", href: "/contact" },
    ],
  },
  {
    title: "Expertise",
    links: [
      { label: "Case Studies", href: "/projects" },
      // { label: "Green Building & LEED", href: "/services" },
      // { label: "Codes & Standards", href: "/services" },
      { label: "Insights & Blog", href: "/blog" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "info@pkmconsultants.in", href: "mailto:info@pkmconsultants.in" },
      { label: "+91 98765 43210", href: "tel:+919876543210" },
      { label: "LinkedIn", href: "https://linkedin.com", external: true },
    ],
  },
];

/* ─────────────────────────────────────────────
   MAIN FOOTER COMPONENT
───────────────────────────────────────────── */
export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const mm = gsap.matchMedia();

    // Full animation (users who allow motion)
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Whole footer content rises from behind the sticky bottom bar, tied to scroll
      gsap.fromTo(
        content,
        { yPercent: 100 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    });

    // Reduced motion: everything visible, no animation
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(content, { yPercent: 0 });
    });

    return () => mm.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-clip bg-white text-black font-suisse! "
      style={{ fontFamily: SUISSE_FONT_STACK }}
    >
      <div className="relative overflow-hidden">
        <div
         
          className="relative z-10 mx-auto w-full px-6 sm:px-8 max-w-[1180px] mt-6 sm:mt-12 pb-6 pm:mb-12"
        >
          {/* Background Watermark Layer */}
          <div
            aria-hidden="true"
            ref={contentRef}
            className="pointer-events-none absolute inset-x-0 -bottom-10 z-0  flex items-end justify-center select-none overflow-hidden   will-change-transform"
          >
            <div
              className="w-full text-center font-pillar text-[clamp(5rem,20vw,24rem)] tracking-wide leading-none text-[#ebf5ff] uppercase whitespace-nowrap will-change-transform"
              style={{ fontFamily: "'Pillar', 'Piller', sans-serif" }}
            >
              PKM Consultants
            </div>
          </div>

          {/* Main Grid: Left Column + Nav Columns */}
          <div className="relative z-10 grid gap-12 lg:grid-cols-[1.3fr_2.4fr] lg:gap-16">
            {/* Left Column: Brand & Tagline */}
            <div className="max-w-sm">
              <Link
                href="/"
                aria-label="PKM Consultants home"
                className="inline-flex items-center self-center justify-center gap-2.5 text-[1.35rem] font-bold tracking-[0.02em] font-mosvita text-black hover:opacity-85 transition-opacity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 159 132.5"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-20 w-auto shrink-0 text-black"
                >
                  <path d="M85.59,41.28c.15-7.61-11.45-7.74-11.47-.14,0,7.44,11.3,7.56,11.47.14" transform="translate(-0.5 -13.75)" />
                  <path d="M83.39,25.89c.16-4.71-7-4.85-7.07-.13,0,4.55,6.91,4.67,7.07.13" transform="translate(-0.5 -13.75)" />
                  <path d="M81.43,15.41a1.57,1.57,0,1,0-3.14-.12,1.57,1.57,0,0,0,3.14.12" transform="translate(-0.5 -13.75)" />
                  <path d="M31.34,58.76c-44,30.9-4.44,74.63,48.51,73.25,52.8,1.37,92.46-42.13,48.72-73.11v0c22.05,9.8,40.66,33,25.3,56.56-28.24,41.1-119.53,41.08-147.74,0C-9.24,91.9,9.4,68.66,31.43,58.87" transform="translate(-0.5 -13.75)" />
                  <path d="M102.33,73.77c23.09,14.48,4.07,37-22.48,36.21-26.7.8-45.63-22-22.26-36.34l0,0C18.79,88,40.75,122,79.86,120.59c38.9,1.37,61.06-32.33,22.52-46.83" transform="translate(-0.5 -13.75)" />
                  <path d="M91.71,74.13c7.9,8.74.16,22-11.86,21.64-12.27.39-19.93-13.44-11.49-22l.06.06C63.31,75.62,58.18,79,56.24,84.28c-2.15,5.79,1.1,11.53,5.87,14.85,9.75,6.84,25.32,7,35.21.37,4.85-3.21,8.3-8.84,6.33-14.73C101.87,79.46,96.85,76,91.81,74" transform="translate(-0.5 -13.75)" />
                  <path d="M38.68,118.9c-27-23.91-.63-53.73,35.77-55.4l0,0L80,54.15l5.56,9.37h0C121.88,65.34,148,95.15,121,118.94H121c44-26.1,8.39-67.12-41.13-65.66C30.49,51.82-5.18,92.69,38.65,118.86" transform="translate(-0.5 -13.75)" />
                </svg>
              </Link>

              <p className="mt-4 text-[0.9375rem] leading-[1.6] text-[#555555]">
                Precision MEPF engineering, coordination, and integrated building
                services consultancy.
              </p>

              <div className="mt-6 flex flex-col gap-2 text-[0.875rem] text-[#555555]">
                <p>Chennai, Tamil Nadu, India</p>
                <Link
                  href="mailto:info@pkmconsultants.in"
                  className="inline-flex items-center gap-1.5 text-black hover:underline"
                >
                  info@pkmconsultants.in
                </Link>
              </div>
            </div>

            {/* Right: Nav grid */}
            <div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
                {NAV_SECTIONS.map((section) => (
                  <div key={section.title}>
                    <p className="text-[1.2rem] font-semibold text-black">
                      {section.title}
                    </p>
                    <ul className="mt-3.5 space-y-1.5 list-none p-0 m-0 font-suisse">
                      {section.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            {...(link.external
                              ? { target: "_blank", rel: "noreferrer" }
                              : {})}
                            className="text-[0.875rem] text-[#555555] transition-colors duration-200 hover:text-black"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: sticky, direct child of <footer>, sits above the nav grid */}
      <div className="sticky bottom-0 z-20 border-t border-[#f0f0f0] bg-white">
        <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center justify-between gap-3 px-6 py-5 text-[0.8125rem] text-[#888888] sm:px-8">
          <span>© {YEAR} PKM Consultants. All rights reserved.</span>
          <span className="flex flex-wrap gap-x-6 gap-y-1">
            <Link href="/privacy" className="transition-colors hover:text-black">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-black">
              Terms of Service
            </Link>
          </span>
        </div>
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