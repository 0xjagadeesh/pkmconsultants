"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ButtonZoomIn } from "./buttonzoomin";

gsap.registerPlugin(ScrollTrigger);

interface PrefooterProps {
  description?: string;
  titleLine1?: string;
  titleLine2?: string;
  buttonLabel?: string;
  buttonHref?: string;
  imageSrc?: string;
}

export function Prefooter({
  description = "Tell us about your commercial, industrial or high-rise project and we will advise on the right MEP design scope, from HVAC, electrical, plumbing and fire protection to NBC and NFPA compliance, based on your design goals, budget and timelines.",
  titleLine1 = "Start your project with",
  titleLine2 = "reliable MEP design",
  buttonLabel = "Contact us",
  buttonHref = "/contact",
  imageSrc = "/images/prefooter-copper.jpg",
}: PrefooterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const parallaxEl = parallaxRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Background parallax movement
      if (parallaxEl) {
        gsap.fromTo(
          parallaxEl,
          { y: -40, scale: 1.06 },
          {
            y: 40,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Title line reveals
      const lines = [line1Ref.current, line2Ref.current].filter(Boolean);
      if (lines.length > 0) {
        gsap.fromTo(
          lines,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="prefooter relative w-full bg-[#0d0c11] text-white overflow-hidden border-t border-b border-white/15"
    >
      {/* ── Parallax Background Image Layer ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div ref={parallaxRef} className="relative w-full h-full will-change-transform">
          <Image
            src={imageSrc}
            alt="Architectural structure"
            fill
            sizes="100vw"
            className="object-cover object-right-bottom opacity-75"
            priority={false}
          />
        </div>

        {/* Ambient Dark Gradients for Crisp Content Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0c11] via-[#0d0c11]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c11] via-transparent to-[#0d0c11]/50" />
      </div>

      {/* ── Inner Content Architectural Grid ── */}
      <div className="relative z-10 w-full flex flex-col">
        {/* ── TOP SECTION ── */}
        <div className="border-b border-white/15">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] divide-y lg:divide-y-0 lg:divide-x divide-white/15">
            {/* Top-Left Cell: Background display quadrant */}
            <div className="hidden lg:flex min-h-[160px] items-start justify-end p-8" />

            {/* Top-Right Cell: Project Description */}
            <div className="px-6 sm:px-10 lg:px-14 py-12 lg:py-20 flex flex-col justify-between">
              <p className="font-metropolis text-[0.98rem] sm:text-[1.05rem] lg:text-[1.12rem] leading-[1.6] text-white/90 max-w-[480px] m-0">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* ── BOTTOM SECTION ── */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] divide-y lg:divide-y-0 lg:divide-x divide-white/15">
            {/* Bottom-Left Cell: Hero Display Title + Button */}
            <div className="px-6 sm:px-10 lg:px-14 py-12 lg:py-20 flex flex-col justify-center">
              <h3 className="font-metropolis font-bold text-white text-[clamp(1.8rem,4.5vw,4.2rem)] leading-[1.03] tracking-[-0.035em] m-0">
                <span className="block overflow-hidden py-1">
                  <span ref={line1Ref} className="block will-change-transform">
                    {titleLine1}
                  </span>
                </span>
                <span className="block overflow-hidden py-1">
                  <span ref={line2Ref} className="block will-change-transform">
                    {titleLine2}
                  </span>
                </span>
              </h3>
              <div className="flex justify-left pt-4">
                <ButtonZoomIn
                  href="/contact"
                  label="Contact"
                  variant="white"
                  hoverBorderColor="rgba(255, 255, 255, 0.8)"
                />
              </div>
            </div>

            {/* Bottom-Right Cell: Empty quadrant keeping architectural asymmetry */}
            <div className="hidden lg:block min-h-[300px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
