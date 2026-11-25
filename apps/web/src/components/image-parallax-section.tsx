"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION_OK } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export interface ImageParallaxSectionProps {
  /** Image source URL or path (required input) */
  image?: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Optional container CSS classes */
  className?: string;
  /** Parallax shift, % of the over-sized image wrapper (defaults to 15, max ~16 to stay within the bleed) */
  speed?: number;
  /** Height of the section (defaults to 'h-[50vh] sm:h-[65vh] lg:h-[80vh]') */
  heightClass?: string;
  /** Priority loading for above-the-fold or critical images */
  priority?: boolean;
}

const DEFAULT_IMAGE = "/images/metal-structure.jpg";

/**
 * ImageParallaxSection
 *
 * Full-width architectural image section with a smooth scroll-driven parallax effect.
 * Uses GSAP ScrollTrigger to translate the image container as it moves through the viewport.
 */
export function ImageParallaxSection({
  image = DEFAULT_IMAGE,
  alt = "Metal structure on a construction site",
  className = "",
  speed = 15,
  heightClass = "h-[50vh] sm:h-[65vh] lg:h-[80vh]",
  priority = false,
}: ImageParallaxSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const imageWrapper = imageWrapperRef.current;
    if (!container || !imageWrapper) return;

    // Smooth scrub parallax translation from -speed% to +speed%.
    // Reduced motion: the image stays centred and static.
    const mm = gsap.matchMedia(container);
    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        imageWrapper,
        { yPercent: -speed },
        {
          yPercent: speed,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, [speed]);

  const resolvedSrc = image || DEFAULT_IMAGE;

  return (
    <section
      ref={containerRef}
      className={`relative w-full overflow-hidden border-b border-[#121212]/15 bg-[#121212] ${heightClass} ${className}`}
      aria-label={alt}
    >
      {/* 
        Over-sized wrapper with scale and extra height to accommodate parallax travel
        without exposing any background borders.
      */}
      <div
        ref={imageWrapperRef}
        className="absolute inset-x-0 -top-[25%] -bottom-[25%] h-[150%] w-full will-change-transform"
      >
        <Image
          src={resolvedSrc}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="rounded-none object-cover object-center"
        />
      </div>

      {/* Subtle architectural border line overlay for visual continuity */}
      <div
        className="absolute inset-0 pointer-events-none border-y border-[#121212]/10"
        aria-hidden="true"
      />
    </section>
  );
}

/** Reusable alias for backwards compatibility or alternative naming */
export const ParallaxImageBanner = ImageParallaxSection;
