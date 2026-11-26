"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type CSSProperties, type ElementType, useEffect, useRef } from "react";

import { MOTION_OK, REDUCED_MOTION } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export interface MaskRevealTextProps {
  /** Lines to reveal one after another */
  lines?: string[];
  /** Alternative to `lines`; split on "\n" */
  text?: string;
  /** Tag to render (default "h2") */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /**
   * Curtain colour. Defaults to "currentColor", so the block always matches
   * the text (dark on light sections, white on dark ones).
   */
  maskColor?: string;
  /** Seconds per line: half to cover, half to uncover (default 0.9) */
  duration?: number;
  /** Seconds between lines (default 0.14) */
  stagger?: number;
  /** Seconds before the first line starts (default 0) */
  delay?: number;
  ease?: string;
  /** Start on scroll into view (default true). Use false for above-the-fold heroes. */
  scrollTrigger?: boolean;
  /** ScrollTrigger start (default "top 88%") */
  triggerStart?: string;
  /** Replay when scrolling back past the trigger (default false) */
  replayOnScroll?: boolean;
}

const COVERED = "inset(0% 0% 0% 0%)";
const BEFORE = "inset(0% 100% 0% 0%)"; // collapsed on the left
const AFTER = "inset(0% 0% 0% 100%)"; // collapsed on the right

/**
 * Curtain reveal, one line at a time: a block grows across the line, the text
 * switches on underneath, then the block retracts to the right.
 *
 * - Hidden lines are marked with `data-mask-text`; a <noscript> rule in the
 *   root layout shows them when JavaScript is off, and reduced-motion users
 *   get the text at once.
 * - One GSAP timeline per heading; `will-change` is only set while it runs.
 * - Re-runs when the text itself changes, not just the line count.
 */
export function MaskRevealText({
  lines,
  text,
  as: Component = "h2",
  className = "",
  style,
  maskColor = "currentColor",
  duration = 0.9,
  stagger = 0.14,
  delay = 0,
  ease = "power2.inOut",
  scrollTrigger = true,
  triggerStart = "top 88%",
  replayOnScroll = false,
}: MaskRevealTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  const parsedLines =
    lines && lines.length > 0 ? lines : text ? text.split("\n") : [];
  const contentKey = parsedLines.join("\n");

  useEffect(() => {
    const container = containerRef.current;
    if (!(container && contentKey)) return;

    const texts = gsap.utils.toArray<HTMLElement>(
      "[data-mask-text]",
      container
    );
    const masks = gsap.utils.toArray<HTMLElement>(
      "[data-mask-block]",
      container
    );
    const mm = gsap.matchMedia(container);

    mm.add(REDUCED_MOTION, () => {
      gsap.set(texts, { opacity: 1 });
    });

    mm.add(MOTION_OK, () => {
      const half = duration / 2;
      gsap.set(masks, { clipPath: BEFORE, visibility: "visible" });

      const tl = gsap.timeline({
        delay,
        paused: scrollTrigger,
        onStart: () => gsap.set(masks, { willChange: "clip-path" }),
        onComplete: () =>
          gsap.set(masks, { willChange: "auto", visibility: "hidden" }),
      });

      texts.forEach((textEl, i) => {
        const mask = masks[i];
        if (!mask) return;
        const at = i * stagger;
        tl.to(mask, { clipPath: COVERED, duration: half, ease }, at)
          .set(textEl, { opacity: 1 }, at + half)
          .to(mask, { clipPath: AFTER, duration: half, ease }, at + half);
      });

      if (scrollTrigger) {
        ScrollTrigger.create({
          trigger: container,
          start: triggerStart,
          once: !replayOnScroll,
          onEnter: () => tl.play(),
          onLeaveBack: replayOnScroll
            ? () => {
                tl.pause(0);
                gsap.set(masks, { visibility: "visible" });
                gsap.set(texts, { opacity: 0 });
              }
            : undefined,
        });
      }
    });

    return () => mm.revert();
  }, [
    contentKey,
    duration,
    stagger,
    delay,
    ease,
    scrollTrigger,
    triggerStart,
    replayOnScroll,
  ]);

  return (
    <Component className={className} ref={containerRef} style={style}>
      {parsedLines.map((line, i) => (
        <span className="block w-fit max-w-full overflow-hidden" key={i}>
          <span className="relative inline-block w-fit max-w-full">
            <span
              className="inline-block whitespace-pre-wrap"
              data-mask-text=""
              style={{ opacity: 0 }}
            >
              {line}
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-[0.05em] z-10"
              data-mask-block=""
              style={{
                backgroundColor: maskColor,
                clipPath: BEFORE,
                visibility: "hidden",
              }}
            />
          </span>
          {/* Keeps a space between lines for copy / paste and screen readers */}
          {i < parsedLines.length - 1 ? " " : null}
        </span>
      ))}
    </Component>
  );
}

// Friendly alias
export const LineRevealText = MaskRevealText;
