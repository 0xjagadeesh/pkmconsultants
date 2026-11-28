"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { MOTION_OK, REDUCED_MOTION } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type CrossImageProps = {
  src: string;
  alt: string;
  /** Box shape, e.g. "aspect-[3/4]" or "aspect-square" */
  className?: string;
  sizes?: string;
  /** Unoptimised source (animated GIFs) */
  unoptimized?: boolean;
};

/** Gutter (px) between the box edge and the image's top / left edge */
const GUTTER = 20;
/** Gap (px) kept right / bottom of the finished image for the readouts */
const TRAIL = 25;
/** Final right / bottom insets as a share of the box (rest of the gutter) */
const END_RIGHT = 0.1167;
const END_BOTTOM = 0.0875;
const ZOOM_FROM = 2;

/**
 * Drafting-sheet photo reveal, scrubbed by scroll (Enerblock "cross image"):
 * the photo unrolls from its top-left corner while zooming 2× → 1×, fixed
 * gutter lines frame it, and a crosshair with X / Y readouts rides the
 * moving bottom-right corner. Starts when the box top is ~85% down the
 * viewport and completes when it reaches the top.
 */
export function CrossImage({
  src,
  alt,
  className = "aspect-[3/4]",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  unoptimized = false,
}: CrossImageProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const vRef = useRef<HTMLSpanElement>(null);
  const hRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const pinRef = useRef<HTMLSpanElement>(null);
  const xRef = useRef<HTMLSpanElement>(null);
  const yRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const clip = clipRef.current;
    if (!(box && clip)) return;

    const draw = (p: number) => {
      const w = box.offsetWidth;
      const h = box.offsetHeight;
      const right = 1 - (1 - END_RIGHT) * p; // 100% → END_RIGHT
      const bottom = 1 - (1 - END_BOTTOM) * p;
      clip.style.clipPath = `inset(${GUTTER}px calc(${right * 100}% + ${TRAIL}px) calc(${bottom * 100}% + ${TRAIL}px) ${GUTTER}px)`;
      const x = w * (1 - right) - TRAIL;
      const y = h * (1 - bottom) - TRAIL;
      const move = (el: HTMLElement | null, value: string) => {
        if (el) el.style.transform = value;
      };
      move(vRef.current, `translateX(${x}px)`);
      move(hRef.current, `translateY(${y}px)`);
      move(dotRef.current, `translate(${x}px, ${y}px)`);
      move(pinRef.current, `translate(${x}px, ${y}px)`);
      move(imgRef.current, `scale(${ZOOM_FROM - (ZOOM_FROM - 1) * p})`);
      if (xRef.current) xRef.current.textContent = `X: ${Math.round(x)}`;
      if (yRef.current) yRef.current.textContent = `Y: ${Math.round(y)}`;
    };

    const mm = gsap.matchMedia(box);
    mm.add(REDUCED_MOTION, () => draw(1));
    mm.add(MOTION_OK, () => {
      const state = { p: 0 };
      draw(0);
      gsap.to(state, {
        p: 1,
        ease: "none",
        onUpdate: () => draw(state.p),
        scrollTrigger: {
          trigger: box,
          start: "top 85%",
          end: "top top",
          scrub: 0.6,
          onRefresh: () => draw(state.p),
        },
      });
    });
    return () => mm.revert();
  }, []);

  const line = "pointer-events-none absolute bg-[#121212]/15";
  const label =
    "absolute whitespace-nowrap font-mosvita text-[#5b5a8a] text-[0.78rem] tabular-nums";

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      ref={boxRef}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        ref={clipRef}
        style={{
          clipPath: `inset(${GUTTER}px calc(100% + ${TRAIL}px) calc(100% + ${TRAIL}px) ${GUTTER}px)`,
        }}
      >
        <Image
          alt={alt}
          className="rounded-none object-cover"
          draggable={false}
          fill
          ref={imgRef}
          sizes={sizes}
          src={src}
          style={{ transform: `scale(${ZOOM_FROM})`, transformOrigin: "0 0" }}
          unoptimized={unoptimized}
        />
      </div>

      {/* Fixed gutter lines */}
      <span
        aria-hidden="true"
        className={`${line} inset-y-0 w-px`}
        style={{ left: GUTTER }}
      />
      <span
        aria-hidden="true"
        className={`${line} inset-x-0 h-px`}
        style={{ top: GUTTER }}
      />

      {/* Moving crosshair on the image's bottom-right corner */}
      <span
        aria-hidden="true"
        className={`${line} inset-y-0 left-0 w-px`}
        ref={vRef}
      />
      <span
        aria-hidden="true"
        className={`${line} inset-x-0 top-0 h-px`}
        ref={hRef}
      />
      <span
        aria-hidden="true"
        className="-mt-[2px] -ml-[2px] pointer-events-none absolute top-0 left-0 size-[5px] bg-[#121212]"
        ref={dotRef}
      />
      {/* Readouts: X to the right of the corner, Y below it (Enerblock layout) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0"
        ref={pinRef}
      >
        <span className={`${label} bottom-1.5 left-3`} ref={xRef}>
          X: 0
        </span>
        <span className={`${label} top-2 right-1.5`} ref={yRef}>
          Y: 0
        </span>
      </span>
    </div>
  );
}
