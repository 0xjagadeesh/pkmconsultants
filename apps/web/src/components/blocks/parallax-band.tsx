"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { type ReactNode, useEffect, useRef } from "react";

import { MOTION_OK } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type ParallaxBandProps = {
  src: string;
  alt: string;
  /** Band height, e.g. "h-svh" or "h-[56svh]" */
  heightClassName?: string;
  /** Extra image height as a share of the band; the image travels this far */
  depth?: number;
  priority?: boolean;
  unoptimized?: boolean;
  /** Content laid over the image (e.g. a sticky caption) */
  children?: ReactNode;
  className?: string;
};

/**
 * Full-bleed photo that moves slower than the page (Enerblock "image
 * parallax"): the image is taller than the band and is scrubbed from its top
 * edge to its bottom edge while the band crosses the viewport.
 * Uses overflow: clip (not hidden) so sticky children keep working.
 */
export function ParallaxBand({
  src,
  alt,
  heightClassName = "h-[56svh]",
  depth = 0.2,
  priority = false,
  unoptimized = false,
  children,
  className = "",
}: ParallaxBandProps) {
  const bandRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const band = bandRef.current;
    const layer = layerRef.current;
    if (!(band && layer)) return;
    const mm = gsap.matchMedia(band);
    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        layer,
        { yPercent: -depth * 100 * (1 / (1 + depth)) },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: band,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
    return () => mm.revert();
  }, [depth]);

  return (
    <div
      className={`relative w-full overflow-clip ${heightClassName} ${className}`}
      ref={bandRef}
    >
      <div
        className="absolute inset-x-0 top-0 will-change-transform"
        ref={layerRef}
        style={{ height: `${(1 + depth) * 100}%` }}
      >
        <Image
          alt={alt}
          className="rounded-none object-cover"
          draggable={false}
          fill
          priority={priority}
          sizes="100vw"
          src={src}
          unoptimized={unoptimized}
        />
      </div>
      {children}
    </div>
  );
}
