"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { DESKTOP_MOTION, MOBILE_MOTION } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * BuildingParallax with a drifting heading: on the same scroll range as the
 * photo, the heading is scrubbed downward so it moves slower than the page
 * (~80% speed) while the photo moves at its own rate, giving layered depth.
 * It never pins. Phones keep it bottom-left with a smaller drift.
 * (Original: building-parallax.tsx, unchanged.)
 */
export function BuildingParallax2() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const img = imgRef.current;
    const text = textRef.current;
    if (!(section && img && text)) return;

    const mm = gsap.matchMedia(section);
    const range = {
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    };
    const addParallax = (travel: number, drift: number) => () => {
      // Photo: same as the original BuildingParallax
      gsap.fromTo(
        img,
        { y: 0 },
        { y: -travel, ease: "none", scrollTrigger: range }
      );
      // Heading: moves down while the page moves up → drifts at a slower speed
      gsap.fromTo(
        text,
        { y: -drift },
        { y: drift, ease: "none", scrollTrigger: range }
      );
    };
    // Smaller travel on phones/tablets; reduced motion stays static.
    mm.add(DESKTOP_MOTION, addParallax(100, 120));
    mm.add(MOBILE_MOTION, addParallax(48, 40));

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[60svh] w-full overflow-hidden md:h-[80svh]"
    >
      {/* Image layer — over-sized vertically so the parallax travel never exposes an edge */}
      <div
        ref={imgRef}
        aria-hidden="true"
        className="absolute inset-x-0 -top-[60px] -bottom-[60px] will-change-transform lg:-top-[120px] lg:-bottom-[120px]"
      >
        <Image
          alt=""
          className="rounded-none object-cover object-center"
          fill
          sizes="100vw"
          src="/images/building-1.jpg"
        />
      </div>

      {/* Gradient overlay — full-width tint on mobile (text spans the width),
          heavier left / clear right on desktop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(25,15,25,0.85)_0%,rgba(25,15,25,0.35)_55%,rgba(25,15,25,0.1)_100%)] md:bg-[linear-gradient(to_right,rgba(25,15,25,0.80)_0%,rgba(25,15,25,0.45)_20%,rgba(25,15,25,0.10)_30%)]"
      />

      {/* Text — bottom-left on phones, centred-left on desktop; drifts slowly */}
      <div className="relative z-10 flex h-full items-end px-6 pb-10 sm:px-10 md:items-center md:pb-0 lg:px-16">
        <div className="will-change-transform" ref={textRef}>
          <h2 className="m-0 max-w-[22ch] font-medium font-mosvita text-[#f7fbff] text-[clamp(1.05rem,2vw,1.35rem)] leading-[1.25] tracking-[-0.02em] md:max-w-none">
            Building lifelines : integrated, optimized, and code-compliant.
          </h2>
        </div>
      </div>
    </section>
  );
}
