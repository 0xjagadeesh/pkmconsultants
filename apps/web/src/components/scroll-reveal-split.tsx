"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImageClipReveal } from "./image-clip-reveal";
import { MaskRevealText } from "./mask-reveal-text";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════
   ANIMATED LABEL
═══════════════════════════════════════════════════════════════ */
function AnimatedLabel({ text }: { text: string; }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const chars = Array.from(el.querySelectorAll<HTMLSpanElement>(".ch"));
    if (!chars.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { opacity: 0, y: 6 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.025,
          duration: 0.45,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
    return () => ctx.revert();
  }, [text]);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-between pb-2"
    >
      <span className="text-[1rem] font-bold tracking-[0.25em] uppercase text-[#1e1926]">
        {text.split("").map((ch, i) => (
          <span
            key={i}
            className="ch"
            style={{ display: "inline-block" }}
          >
            {ch === " " ? "\u00a0" : ch}
          </span>
        ))}
      </span>
      <span
        aria-hidden="true"
        className="w-[10px] h-[10px] bg-[#1e1926] inline-block flex-shrink-0"
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GHOST BUTTON
═══════════════════════════════════════════════════════════════ */
function GhostButton({ href, label }: { href: string; label: string; }) {
  return (
    <Link
      href={href}
      className="group/btn inline-flex items-center gap-4 border border-[#1e1926] self-start mt-8 overflow-hidden"
      style={{ padding: "0.75rem 1.25rem" }}
    >
      <span className="relative overflow-hidden block" style={{ height: "1.1em" }}>
        <span className="block text-[0.7rem] font-bold tracking-[0.14em] uppercase text-[#1e1926] transition-transform duration-300 ease-in-out group-hover/btn:-translate-y-full">
          {label}
        </span>
        <span className="absolute left-0 bottom-0 translate-y-full block text-[0.7rem] font-bold tracking-[0.14em] uppercase text-[#1e1926] transition-transform duration-300 ease-in-out group-hover/btn:translate-y-0">
          {label}
        </span>
      </span>
      <span className="relative w-4 h-4 overflow-hidden flex items-center justify-center flex-shrink-0">
        <svg viewBox="0 0 12 12" className="w-3 h-3 fill-[#1e1926] absolute transition-transform duration-300 ease-in-out group-hover/btn:translate-x-5 group-hover/btn:-translate-y-5">
          <path d="M7.4,0.7l4,5.3l-4,5.3H5.5l1.9-2.5c0.8-1,1.3-1.8,1.7-2.2H0.5V5.3H9C8.6,4.7,8,4,7.4,3.1L5.5,0.7H7.4z" />
        </svg>
        <svg viewBox="0 0 12 12" className="w-3 h-3 fill-[#1e1926] absolute -translate-x-5 translate-y-5 transition-transform duration-300 ease-in-out group-hover/btn:translate-x-0 group-hover/btn:translate-y-0">
          <path d="M7.4,0.7l4,5.3l-4,5.3H5.5l1.9-2.5c0.8-1,1.3-1.8,1.7-2.2H0.5V5.3H9C8.6,4.7,8,4,7.4,3.1L5.5,0.7H7.4z" />
        </svg>
      </span>
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════════ */
const BLOCKS = [
  {
    label: "Approach",
    description:
      "A digital, coordinated process that integrates MEP design, engineering, BIM coordination and site support to achieve precision, clash-free drawings and measurable results.",
    href: "/about",
  },
  {
    label: "Company",
    description:
      "Operating as one integrated team, aligning engineers, designers and BIM coordinators to deliver reliable, traceable and consistent MEP designs with greater predictability and control.",
    href: "/about",
  },
];

export function ScrollRevealSplit() {
  return (
    <section className="bg-[#f7fbff] w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: "100svh" }}>

        {/* LEFT — image + tracking lines, 90% reveal */}
        <div className="relative" style={{ minHeight: "70vmin" }}>
          <ImageClipReveal src="/images/coor-section-2-pkm.gif" alt="MEPF engineering on site" fill />
        </div>

        {/* RIGHT — content: flex column fills full height */}
        <div className="flex flex-col border-l border-[#c4c2e8]" style={{ minHeight: "100svh" }}>

          {/* TOP — heading + subtitle, grows to fill space */}
          <div className="flex flex-col flex-1 px-4 lg:px-6 pt-10 lg:pt-12 pb-8 border-b border-[#c4c2e8]">
            <MaskRevealText
              as="h2"
              className="font-extrabold font-mosvita text-[#1e1926] tracking-[-0.03em] leading-[1.1] m-0"
              style={{ fontSize: "clamp(2rem, 3vw, 3.2rem)" }}
              lines={[
                "Industrialized MEP design and",
                "model-driven coordination to",
                "deliver with certainty"
              ]}
              maskColor="#1e1926"
              duration={0.9}
              stagger={0.14}
            />
            {/* Spacer pushes subtitle to bottom of this zone */}
            <div className="flex-1" />
            <p className="text-[0.95rem] leading-[1.75] text-[#5a5270] max-w-[600x]">
              Coordinated, Standardized, and constructible MEP processes.
            </p>
          </div>

          {/* BOTTOM — two columns side by side */}
          <div className="grid grid-cols-2 divide-x divide-[#c4c2e8]">
            {BLOCKS.map((block) => (
              <div key={block.label} className="flex flex-col px-2 lg:px-4 pt-2 pb-6">
                <AnimatedLabel text={block.label} />
                <p className="mt-2 text-[0.82rem] leading-[1.78] text-[#5a5270]">
                  {block.description}
                </p>
                <GhostButton href={block.href} label="Learn more" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
