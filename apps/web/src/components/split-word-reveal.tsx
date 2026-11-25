"use client";

import { type ElementType, useEffect, useRef } from "react";
import gsap from "gsap";
import { MOTION_OK } from "@/lib/motion";

interface SplitWordRevealProps {
  text: string;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
  /** Enable per-word hover swap animation */
  hover?: boolean;
  /** Color of the second (hover) layer. Default: pure white */
  hoverColor?: string;
  stagger?: number;
  delay?: number;
}

export function SplitWordReveal({
  text,
  as: Tag = "h1",
  className,
  style,
  hover = false,
  hoverColor = "#ffffff",
  stagger = 0.06,
  delay = 0.1,
}: SplitWordRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion: no entrance or hover roll. Words render in place
    // (the hover layer is hidden by its inline translateY).
    const mm = gsap.matchMedia(el);
    mm.add(MOTION_OK, () => {
      const tops = Array.from(el.querySelectorAll<HTMLElement>(".swr-top"));
      const bottoms = Array.from(
        el.querySelectorAll<HTMLElement>(".swr-bottom")
      );
      const wraps = Array.from(el.querySelectorAll<HTMLElement>(".swr-wrap"));

      // Clip both layers below their containers
      gsap.set(tops, { yPercent: 110 });
      gsap.set(bottoms, { yPercent: 110 });

      // Mount reveal: top layers animate in
      gsap.to(tops, {
        yPercent: 0,
        duration: 0.5,
        ease: "power4.out",
        stagger,
        delay,
      });

      if (!hover) return;

      // Hover swap
      const listeners = wraps.flatMap((wrap) => {
        const top = wrap.querySelector<HTMLElement>(".swr-top");
        const bottom = wrap.querySelector<HTMLElement>(".swr-bottom");
        if (!(top && bottom)) return [];
        const tl = gsap.timeline({
          paused: true,
          defaults: { ease: "power3.inOut", duration: 0.32 },
        });
        tl.to(top, { yPercent: -110 }, 0);
        tl.to(bottom, { yPercent: 0 }, 0);
        const enter = () => tl.play();
        const leave = () => tl.reverse();
        wrap.addEventListener("mouseenter", enter);
        wrap.addEventListener("mouseleave", leave);
        return [{ wrap, enter, leave }];
      });

      return () => {
        for (const { wrap, enter, leave } of listeners) {
          wrap.removeEventListener("mouseenter", enter);
          wrap.removeEventListener("mouseleave", leave);
        }
      };
    });

    return () => mm.revert();
  }, [stagger, delay, hover]);

  const words = text.split(" ");

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className} style={style} aria-label={text}>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={i}>
            <span
              className="swr-wrap"
              style={{
                position: "relative",
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "bottom",
              }}
            >
              {/* Resting layer */}
              <span className="swr-top" style={{ display: "block" }}>
                {word}
              </span>
              {/* Hover layer — CSS default keeps it hidden; GSAP overrides on hover */}
              <span
                className="swr-bottom"
                style={{
                  display: "block",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  color: hoverColor,
                  transform: "translateY(110%)",
                }}
              >
                {word}
              </span>
            </span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </span>
    </Tag>
  );
}
