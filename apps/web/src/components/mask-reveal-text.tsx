"use client";

import { useRef, useEffect, ElementType, CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface MaskRevealTextProps {
  /** Array of lines to reveal with stagger */
  lines?: string[];
  /** Single string text (alternative to lines array; splits by newline if present) */
  text?: string;
  /** HTML Tag to render (default: "h2") */
  as?: ElementType;
  /** Additional className for root element */
  className?: string;
  /** Inline style for root element */
  style?: CSSProperties;
  /** Color of the mask block (default: "#1e1926") */
  maskColor?: string;
  /** Total duration per line in seconds (default: 0.9s - 0.45s grow + 0.45s shrink) */
  duration?: number;
  /** Stagger between lines in seconds (default: 0.14s) */
  stagger?: number;
  /** Initial delay before animation starts in seconds (default: 0) */
  delay?: number;
  /** GSAP easing function for mask growth and shrinkage (default: "power2.inOut") */
  ease?: string;
  /** Whether to trigger via ScrollTrigger (default: true) */
  scrollTrigger?: boolean;
  /** ScrollTrigger start position (default: "top 88%") */
  triggerStart?: string;
  /** Whether animation replays when scrolling back up and down (default: false) */
  replayOnScroll?: boolean;
}

/**
 * MaskRevealText / LineRevealText
 * 
 * Curtain block reveal:
 * 1. Black mask block starts from left 0 and grows to 100% width of the line.
 * 2. Background text appears underneath.
 * 3. Black mask shrinks from left to right, smoothly revealing the text.
 */
export function MaskRevealText({
  lines,
  text,
  as: Component = "h2",
  className = "",
  style,
  maskColor = "#1e1926",
  duration = 0.9,
  stagger = 0.14,
  delay = 0,
  ease = "power2.inOut",
  scrollTrigger = true,
  triggerStart = "top 88%",
  replayOnScroll = false,
}: MaskRevealTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const maskRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Compute lines array from lines prop or text prop
  const parsedLines = lines && lines.length > 0
    ? lines
    : text
      ? text.split("\n")
      : [];

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !parsedLines.length) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: scrollTrigger
          ? {
              trigger: container,
              start: triggerStart,
              once: !replayOnScroll,
              toggleActions: replayOnScroll
                ? "play none none reverse"
                : "play none none none",
            }
          : undefined,
        delay,
      });

      const halfDuration = duration * 0.5;

      parsedLines.forEach((_, i) => {
        const textEl = textRefs.current[i];
        const maskEl = maskRefs.current[i];
        if (!textEl || !maskEl) return;

        const lineStart = i * stagger;

        // Initial setup for this line
        gsap.set(textEl, { opacity: 0 });
        gsap.set(maskEl, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)" });

        // Phase 1: Make mask visible and expand it from left (0) to 100% of line
        tl.set(maskEl, { opacity: 1 }, lineStart);
        tl.fromTo(
          maskEl,
          { clipPath: "inset(0% 100% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: halfDuration,
            ease,
          },
          lineStart
        );

        // Transition: Reveal background text while fully covered by the solid mask
        tl.set(textEl, { opacity: 1 }, lineStart + halfDuration);

        // Phase 2: Black mask shrinks from left to right, revealing the text
        tl.fromTo(
          maskEl,
          { clipPath: "inset(0% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 100%)",
            duration: halfDuration,
            ease,
          },
          lineStart + halfDuration
        );

        // Clean exit: hide mask once it finishes shrinking away
        tl.set(maskEl, { opacity: 0 }, lineStart + duration);
      });
    }, container);

    return () => ctx.revert();
  }, [
    parsedLines.length,
    duration,
    stagger,
    delay,
    ease,
    scrollTrigger,
    triggerStart,
    replayOnScroll,
  ]);

  return (
    <Component ref={containerRef} className={className} style={style}>
      {parsedLines.map((line, i) => (
        <span
          key={i}
          className="block w-fit max-w-full overflow-hidden"
          style={{ lineHeight: "inherit" }}
        >
          <span className="relative inline-block w-fit max-w-full">
            {/* The revealed text */}
            <span
              ref={(el) => {
                textRefs.current[i] = el;
              }}
              className="inline-block whitespace-pre-wrap will-change-[opacity]"
              style={{ opacity: 0 }}
            >
              {line}
            </span>

            {/* The curtain mask that grows left->right and shrinks left->right */}
            <span
              ref={(el) => {
                maskRefs.current[i] = el;
              }}
              aria-hidden="true"
              className="absolute pointer-events-none z-10 will-change-[clip-path,opacity]"
              style={{
                top: "-0.05em",
                bottom: "-0.05em",
                left: "-0.05em",
                right: "-0.05em",
                backgroundColor: maskColor,
                clipPath: "inset(0% 100% 0% 0%)",
                WebkitClipPath: "inset(0% 100% 0% 0%)",
                opacity: 0,
              }}
            />
          </span>
        </span>
      ))}
    </Component>
  );
}

// Friendly alias
export const LineRevealText = MaskRevealText;
