"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { DESKTOP_MOTION, MOBILE_MOTION, REDUCED_MOTION } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const LAYERS = [
  {
    key: "arch",
    label: "Architecture",
    src: "/images/archi.webp",
    border: "rgba(95,212,214,0.50)",
  },
  {
    key: "hvac",
    label: "HVAC",
    src: "/images/hvac.webp",
    border: "rgba(232,162,61,0.50)",
  },
  {
    key: "plumb",
    label: "Plumbing",
    src: "/images/plumbing.webp",
    border: "rgba(86,156,255,0.50)",
  },
  {
    key: "fps",
    label: "Fire Protection",
    src: "/images/fps.webp",
    border: "rgba(255,100,100,0.50)",
  },
];

// Z elevation per layer step when fully exploded (px)
const ELEVATION_STEP = 40;
const ELEVATION_STEP_MOBILE = 24;

// Target isometric angles
const ISO_RX = 50; // rotateX — classic isometric tilt
const ISO_RZ = -20; // rotateZ — classic isometric twist

const TITLE_ROWS = [
  { label: "Standard Floor Plan and MEP" },
  { label: "Drawing No.", value: "PKM.01.00" },
  { label: "Scale", value: "1/100" },
];

/**
 * Layout
 * - < lg: stacked (headline panel, then the drawing). No pinning; the stack
 *   explodes once as it scrolls through the viewport.
 * - lg+: 300vh scroll track with a CSS-sticky 100vh two-column panel. The
 *   explode is scrubbed across the whole track.
 * - prefers-reduced-motion: static, already-exploded isometric view.
 */
export function MepfExplode() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const stack = stackRef.current;
    if (!(wrapper && stack)) return;
    const layers = layerRefs.current;

    const mm = gsap.matchMedia(wrapper);

    mm.add(DESKTOP_MOTION, () => {
      gsap.set(stack, { rotateX: 0, rotateZ: 0 });
      gsap.set(layers, { z: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.6,
        },
      });

      // Phase 1 (0–45 %): rotate into isometric
      tl.to(
        stack,
        {
          rotateX: ISO_RX,
          rotateZ: ISO_RZ,
          duration: 0.45,
          ease: "power2.inOut",
        },
        0
      );

      // Phase 2: each layer elevates upward in Z
      layers.forEach((el, i) => {
        tl.to(
          el,
          { z: i * ELEVATION_STEP, duration: 0.55, ease: "power3.out" },
          0.25 + i * 0.05
        );
      });
    });

    mm.add(MOBILE_MOTION, () => {
      gsap.set(stack, { rotateX: 0, rotateZ: 0 });
      gsap.set(layers, { z: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stack,
          start: "top 85%",
          end: "center 45%",
          scrub: true,
        },
      });
      tl.to(stack, { rotateX: ISO_RX, rotateZ: ISO_RZ, ease: "none" }, 0);
      layers.forEach((el, i) => {
        tl.to(el, { z: i * ELEVATION_STEP_MOBILE, ease: "none" }, 0.2);
      });
    });

    mm.add(REDUCED_MOTION, () => {
      gsap.set(stack, { rotateX: ISO_RX, rotateZ: ISO_RZ });
      layers.forEach((el, i) => {
        gsap.set(el, { z: i * ELEVATION_STEP_MOBILE });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="relative lg:h-[300vh]" id="mepf-explode" ref={wrapperRef}>
      {/* Panel: stacked on mobile, sticky two-column on desktop */}
      <div className="grid grid-cols-1 bg-[#261CC1] lg:sticky lg:top-0 lg:h-svh lg:grid-cols-2 lg:overflow-hidden">
        {/* ── Headline + description ── */}
        <div
          className="relative z-10 flex flex-col justify-between gap-10 border-[rgba(95,212,214,0.10)] px-6 pt-20 pb-12 sm:px-10 lg:border-r lg:px-[8%] lg:py-[10%]"
          data-nav-dark
        >
          <h2 className="m-0 font-bold font-mosvita text-[#f4f7fa] text-[clamp(1.9rem,3.6vw,3.2rem)] leading-[1.08] tracking-[-0.03em]">
            Don't Let MEP Complexity <br className="hidden sm:block" />
            Compromise Your Design.
          </h2>

          <p className="m-0 max-w-[380px] font-medium font-metropolis text-[clamp(0.875rem,1.05vw,0.92rem)] text-[rgb(200,218,240)] leading-[1.76]">
            We engineer every hidden mechanical, electrical, plumbing, and fire
            system with precision, ensuring your building performs flawlessly
            while keeping every line, space, and detail exactly as you first
            envisioned it.
          </p>
        </div>

        {/* ── 3-D isometric stack + drawing title block ── */}
        <div className="relative flex min-h-[min(110vw,640px)] flex-col overflow-hidden bg-[#f7fbff] lg:min-h-0">
          <div className="relative z-5 flex flex-1 items-center justify-center pt-8 pb-28 [perspective-origin:50%_50%] [perspective:1400px] lg:py-0">
            <div
              className="relative aspect-square w-[min(72vw,380px)] will-change-transform [transform-style:preserve-3d] lg:w-[min(36vw,420px)]"
              ref={stackRef}
            >
              {LAYERS.map((layer, i) => (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[4px] border border-dashed bg-center bg-contain bg-no-repeat will-change-transform [backface-visibility:hidden]"
                  key={layer.key}
                  ref={(el) => {
                    if (el) layerRefs.current[i] = el;
                  }}
                  style={{
                    backgroundImage: `url('${layer.src}')`,
                    borderColor: layer.border,
                  }}
                />
              ))}
            </div>
          </div>

          {/* CAD-style title block — bottom-left corner */}
          <div className="absolute bottom-0 left-0 z-20 flex max-w-full select-none border-[#261CC150] border-t border-r bg-[#f7fbff] font-mono">
            <div className="flex shrink-0 items-center justify-center border-[#261CC150] border-r px-2.5 py-1 sm:px-3.5">
              <Image
                alt=""
                className="size-10 rounded-none object-cover sm:size-[52px]"
                height={52}
                src="/icons/favicon.svg"
                unoptimized
                width={52}
              />
            </div>
            <dl className="m-0 flex min-w-0 flex-col">
              {TITLE_ROWS.map((row, i) => (
                <div
                  className={`flex px-2.5 py-1 font-bold font-metropolis text-[#261CC1] text-[10px] uppercase tracking-[0.12em] sm:px-3 sm:text-xs sm:whitespace-nowrap ${
                    i < TITLE_ROWS.length - 1
                      ? "border-[#261CC150] border-b"
                      : ""
                  }`}
                  key={row.label}
                >
                  <dt>
                    {row.label}
                    {row.value ? ": " : ""}
                  </dt>
                  {row.value ? (
                    <dd className="m-0 font-normal text-[#888]">{row.value}</dd>
                  ) : null}
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
