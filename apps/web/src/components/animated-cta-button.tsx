"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

interface AnimatedCTAButtonProps {
  href: string;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}

export function AnimatedCTAButton({ href, label, className, style }: AnimatedCTAButtonProps) {
  const containerRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const charsTop = containerRef.current.querySelectorAll(".cta-char-top");
    const charsBottom = containerRef.current.querySelectorAll(".cta-char-bottom");

    // Bottom clone starts pushed down
    gsap.set(charsBottom, { yPercent: 100 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.inOut", duration: 0.32 },
      });
      tl.to(charsTop, { yPercent: -100, stagger: 0.025 }, 0);
      tl.to(charsBottom, { yPercent: 0, stagger: 0.025 }, 0);

      const el = containerRef.current;
      if (!el) return;
      const onEnter = () => tl.play();
      const onLeave = () => tl.reverse();

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);

      return () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <Link
      ref={containerRef}
      href={href}
      className={className}
      style={style}
    >
      {/* Text + icon row */}
      <span className="relative flex items-center gap-4 overflow-hidden">
        {/* Top layer (visible at rest) */}
        <span className="flex" aria-hidden="false">
          {label.split("").map((char, i) => (
            <span
              key={i}
              className="cta-char-top inline-block"
              style={{ whiteSpace: char === " " ? "pre" : undefined }}
            >
              {char}
            </span>
          ))}
        </span>

        {/* Bottom layer (slides up on hover) */}
        <span className="flex absolute inset-0" aria-hidden="true">
          {label.split("").map((char, i) => (
            <span
              key={i}
              className="cta-char-bottom inline-block"
              style={{ whiteSpace: char === " " ? "pre" : undefined }}
            >
              {char}
            </span>
          ))}
        </span>

        <ArrowUpRight size={16} className="flex-shrink-0 relative z-10" />
      </span>
    </Link>
  );
}
