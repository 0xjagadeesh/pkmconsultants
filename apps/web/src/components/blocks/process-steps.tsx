"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { MaskRevealText } from "@/components/mask-reveal-text";
import { MOTION_OK } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export type ProcessStep = { title: string; text: string };

type ProcessStepsProps = {
  title: string;
  intro: string;
  steps: ProcessStep[];
  id?: string;
};

const LINE = "border-[#121212]/15";

/**
 * Numbered process (Enerblock "list block"): header row with masked title and
 * intro, then full-width rows split by gridlines. Each row's number sits just
 * under its top line and slides down from behind it, scrubbed as the row
 * travels from the bottom of the viewport to ~40% from the top.
 */
export function ProcessSteps({ title, intro, steps, id }: ProcessStepsProps) {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const mm = gsap.matchMedia(list);
    mm.add(MOTION_OK, () => {
      for (const row of gsap.utils.toArray<HTMLElement>("[data-step]", list)) {
        const number = row.querySelector("[data-step-number]");
        if (!number) continue;
        gsap.fromTo(
          number,
          { yPercent: -100 },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "top 40%",
              scrub: true,
            },
          }
        );
      }
    });
    return () => mm.revert();
  }, []);

  return (
    <section className={`border-b bg-[#f7fbff] text-[#121212] ${LINE}`} id={id}>
      {/* Header */}
      <div className="grid grid-cols-1 gap-6 px-6 pt-16 pb-14 sm:px-10 lg:grid-cols-2 lg:gap-0 lg:px-10 lg:pt-24 lg:pb-20">
        <MaskRevealText
          className="m-0 font-metropolis font-medium text-[clamp(2rem,4vw,3.4rem)] leading-[1.04] tracking-[-0.035em]"
          text={title}
        />
        <p className="m-0 max-w-[40ch] font-metropolis text-[clamp(1.05rem,1.45vw,1.3rem)] leading-[1.45] tracking-[-0.01em] lg:pl-10">
          {intro}
        </p>
      </div>

      {/* Steps */}
      <ol className="m-0 list-none p-0 pb-16 lg:pb-28" ref={listRef}>
        {steps.map((step, i) => (
          <li
            className={`grid grid-cols-[3.5rem_minmax(0,1fr)] border-t px-6 sm:px-10 lg:grid-cols-2 lg:px-10 ${LINE}`}
            data-step=""
            key={step.title}
          >
            {/* Number: clipped by the row's top line */}
            <div className="self-start overflow-hidden">
              <span
                className="block pt-1.5 font-bold font-metropolis text-[#261CC1] text-[1.05rem] tabular-nums leading-none lg:text-[1.2rem]"
                data-step-number=""
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="pt-6 pb-10 lg:pl-10 lg:pb-14">
              <h3 className="m-0 font-metropolis font-medium text-[clamp(1.4rem,2.5vw,2.2rem)] leading-[1.15] tracking-[-0.03em]">
                {step.title}
              </h3>
              <p className="m-0 mt-4 max-w-[46ch] text-[#3a3846] text-[1rem] leading-[1.6] lg:text-[1.05rem]">
                {step.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
