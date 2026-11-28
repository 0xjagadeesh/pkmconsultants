"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import { REDUCED_MOTION } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type CharFadeLabelProps = {
  text: string;
  /** Classes for the label text (colour, size) */
  className?: string;
  /** Square marker after the label; it appears once the letters are in */
  marker?: boolean;
  markerClassName?: string;
  /** Spread label and marker to the row ends */
  spread?: boolean;
};

// Seconds between letters, matching the Enerblock pretitle
const STEP = 0.025;

/**
 * Uppercase eyebrow whose letters fade in one by one when it scrolls into
 * view, followed by the square marker (Enerblock "animated title").
 * Letters use CSS transitions; a one-shot ScrollTrigger starts them, so
 * labels that are scrolled straight past still reveal.
 * Screen readers get the plain text.
 */
export function CharFadeLabel({
  text,
  className = "",
  marker = true,
  markerClassName = "bg-current",
  spread = true,
}: CharFadeLabelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia(REDUCED_MOTION).matches) {
      setShown(true);
      return;
    }
    // ScrollTrigger (not IntersectionObserver) so a label that is scrolled
    // straight past, e.g. by an anchor jump, still reveals.
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 92%",
      once: true,
      onEnter: () => setShown(true),
    });
    return () => trigger.kill();
  }, []);

  const chars = [...text];
  const markerDelay = chars.length * STEP + 0.15;

  return (
    <div
      className={`flex items-center gap-3 ${spread ? "justify-between" : ""}`}
      ref={ref}
    >
      <span className={`font-bold font-mosvita uppercase ${className}`}>
        <span className="sr-only">{text}</span>
        <span aria-hidden="true">
          {chars.map((char, i) => (
            <span
              className="inline-block transition-opacity duration-300 ease-out"
              key={i}
              style={{
                opacity: shown ? 1 : 0,
                transitionDelay: shown ? `${i * STEP}s` : "0s",
                whiteSpace: char === " " ? "pre" : undefined,
              }}
            >
              {char}
            </span>
          ))}
        </span>
      </span>
      {marker ? (
        <span
          aria-hidden="true"
          className={`inline-block size-2.5 shrink-0 transition-opacity duration-0 ${markerClassName}`}
          style={{
            opacity: shown ? 1 : 0,
            transitionDelay: shown ? `${markerDelay}s` : "0s",
          }}
        />
      ) : null}
    </div>
  );
}
