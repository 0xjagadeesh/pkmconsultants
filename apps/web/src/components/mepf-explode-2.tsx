"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Crosshair } from "@/components/crosshair";
import { REDUCED_MOTION } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/* Aligned plan drawings: architecture base + one sheet per service. */
const BASE = { src: "/images/archi.webp", label: "Architecture" };

const SERVICES = [
  { key: "hvac", label: "HVAC", src: "/images/hvac.webp", color: "#e8a23d" },
  {
    key: "plumb",
    label: "Plumbing",
    src: "/images/plumbing.webp",
    color: "#569cff",
  },
  {
    key: "fps",
    label: "Fire protection",
    src: "/images/fps.webp",
    color: "#ff6464",
  },
] as const;

type ServiceKey = (typeof SERVICES)[number]["key"];

const ALL_KEYS = SERVICES.map((s) => s.key) as ServiceKey[];

/** Delay (s) between layers drawing in on first view */
const STAGGER = 0.22;

/**
 * MEPF discipline filter (replaces the rotating isometric MepfExplode).
 * The four aligned plans sit flat and overlaid as one coordinated drawing.
 * Legend chips: hover / focus isolates a service (others fade back), click
 * toggles it on or off, "All" restores the full set. On first view the layers
 * draw in one after another. No scroll pinning. (Original: mepf-explode.tsx.)
 */
export function MepfExplode2() {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const [visible, setVisible] = useState<ServiceKey[]>(ALL_KEYS);
  const [focus, setFocus] = useState<ServiceKey | null>(null);

  // Draw the layers in once the sheet scrolls into view
  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    if (window.matchMedia(REDUCED_MOTION).matches) {
      setEntered(true);
      return;
    }
    const trigger = ScrollTrigger.create({
      trigger: sheet,
      start: "top 75%",
      once: true,
      onEnter: () => setEntered(true),
    });
    return () => trigger.kill();
  }, []);

  const toggle = (key: ServiceKey) =>
    setVisible((current) =>
      current.includes(key)
        ? current.filter((k) => k !== key)
        : ALL_KEYS.filter((k) => k === key || current.includes(k))
    );

  const allOn = visible.length === ALL_KEYS.length;

  const layerOpacity = (key: ServiceKey) => {
    if (!(entered && visible.includes(key))) return 0;
    if (focus && focus !== key) return 0.12;
    return 1;
  };
  let baseOpacity = entered ? 1 : 0;
  if (entered && focus) baseOpacity = 0.35;

  const shown = SERVICES.filter((s) => visible.includes(s.key));

  return (
    <section
      aria-labelledby="mepf-filter-title"
      className="grid grid-cols-1 bg-[#261CC1] lg:min-h-svh lg:grid-cols-2"
      id="mepf-explode"
    >
      {/* ── Headline, copy and legend ── */}
      <div
        className="relative z-10 flex flex-col justify-between gap-10 border-[rgba(95,212,214,0.10)] px-6 pt-20 pb-12 sm:px-10 lg:border-r lg:px-[8%] lg:py-[10%]"
        data-nav-dark
      >
        <h2
          className="m-0 font-bold font-mosvita text-[#f4f7fa] text-[clamp(1.9rem,3.6vw,3.2rem)] leading-[1.08] tracking-[-0.03em]"
          id="mepf-filter-title"
        >
          Don't Let MEP Complexity <br className="hidden sm:block" />
          Compromise Your Design.
        </h2>

        <div className="grid gap-8">
          <p className="m-0 max-w-[380px] font-medium font-metropolis text-[clamp(0.875rem,1.05vw,0.92rem)] text-[rgb(200,218,240)] leading-[1.76]">
            We engineer every hidden mechanical, electrical, plumbing and fire
            system so your building performs exactly as you envisioned it.
          </p>

          {/* Legend / filter */}
          <fieldset className="m-0 border-0 p-0">
            <legend className="mb-4 p-0 font-bold font-mosvita text-[0.72rem] text-white/70 uppercase tracking-[0.2em]">
              <span className="hidden pointer-fine:inline">
                Hover to isolate · click to toggle
              </span>
              <span className="pointer-fine:hidden">Tap to show or hide</span>
            </legend>
            <div className="flex flex-wrap gap-2.5">
              <button
                aria-pressed={allOn}
                className={`min-h-11 border px-4 font-bold font-mosvita text-[0.8rem] uppercase tracking-[0.1em] transition-colors duration-200 ${
                  allOn
                    ? "border-white bg-white text-[#261CC1]"
                    : "border-white/40 text-white hover:border-white"
                }`}
                onClick={() => setVisible(ALL_KEYS)}
                type="button"
              >
                All
              </button>
              {SERVICES.map((service) => {
                const on = visible.includes(service.key);
                return (
                  <button
                    aria-pressed={on}
                    className={`flex min-h-11 items-center gap-2.5 border px-4 font-bold font-mosvita text-[0.8rem] uppercase tracking-[0.1em] transition-colors duration-200 ${
                      on
                        ? "border-white bg-white text-[#121212]"
                        : "border-white/40 text-white/70 hover:border-white hover:text-white"
                    }`}
                    key={service.key}
                    onBlur={() => setFocus(null)}
                    onClick={() => toggle(service.key)}
                    onFocus={() => on && setFocus(service.key)}
                    onMouseEnter={() => on && setFocus(service.key)}
                    onMouseLeave={() => setFocus(null)}
                    type="button"
                  >
                    <span
                      aria-hidden="true"
                      className="inline-block size-2.5 shrink-0"
                      style={{
                        backgroundColor: on ? service.color : "transparent",
                        boxShadow: `inset 0 0 0 1.5px ${service.color}`,
                      }}
                    />
                    {service.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>
      </div>

      {/* ── Flat coordinated drawing + title block ── */}
      <div
        className="relative flex min-h-[min(110vw,640px)] flex-col overflow-hidden bg-[#f7fbff] lg:min-h-0"
        ref={sheetRef}
      >
        <div className="relative z-[5] flex flex-1 items-center justify-center px-6 pt-10 pb-32 lg:py-16">
          <div className="relative aspect-square w-[min(80vw,420px)] lg:w-[min(38vw,520px)]">
            <Image
              alt={`${BASE.label} floor plan`}
              className="rounded-none object-contain transition-opacity duration-500"
              fill
              sizes="(min-width: 1024px) 38vw, 80vw"
              src={BASE.src}
              style={{ opacity: baseOpacity }}
            />
            {SERVICES.map((service, i) => (
              <Image
                alt={`${service.label} layout`}
                className="rounded-none object-contain mix-blend-multiply transition-opacity duration-500"
                fill
                key={service.key}
                sizes="(min-width: 1024px) 38vw, 80vw"
                src={service.src}
                style={{
                  opacity: layerOpacity(service.key),
                  // Staggered draw-in on first view only
                  transitionDelay:
                    entered && !focus ? `${(i + 1) * STAGGER}s` : "0s",
                }}
              />
            ))}
          </div>
        </div>

        {/* Hover crosshair over the sheet */}
        <div className="absolute inset-0 z-10 hidden lg:block">
          <Crosshair grid={false} />
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
            <div className="flex border-[#261CC150] border-b px-2.5 py-1 font-bold font-metropolis text-[#261CC1] text-[10px] uppercase tracking-[0.12em] sm:px-3 sm:text-xs sm:whitespace-nowrap">
              <dt>Standard Floor Plan and MEP</dt>
            </div>
            <div className="flex border-[#261CC150] border-b px-2.5 py-1 font-bold font-metropolis text-[#261CC1] text-[10px] uppercase tracking-[0.12em] sm:px-3 sm:text-xs sm:whitespace-nowrap">
              <dt>Drawing No.:&nbsp;</dt>
              <dd className="m-0 font-normal text-[#888]">PKM.01.00</dd>
            </div>
            <div
              aria-live="polite"
              className="flex px-2.5 py-1 font-bold font-metropolis text-[#261CC1] text-[10px] uppercase tracking-[0.12em] sm:px-3 sm:text-xs sm:whitespace-nowrap"
            >
              <dt>Layers:&nbsp;</dt>
              <dd className="m-0 font-normal text-[#888]">
                {shown.length === 0
                  ? "Architecture only"
                  : `Arch + ${shown.map((s) => s.label).join(", ")}`}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
