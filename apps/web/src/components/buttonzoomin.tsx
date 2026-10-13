"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export interface ButtonZoomInProps {
  /** Target link URL. If omitted, renders as <button> */
  href?: string;
  /** Button label text */
  label: string;
  /**
   * Two visual variant options:
   * - 'white': White base that hovers as black (default)
   * - 'black': Black base that hovers as white
   */
  variant?:
    | "white"
    | "black"
    | "coral"
    | "ghost-black"
    | "dark"
    | "ghost-white"
    | "light";
  /** Custom outline and divider border color (e.g. '#121212', '#261CC1', 'rgba(18,18,18,0.25)') */
  outlineColor?: string;
  /** Alias for outlineColor */
  borderColor?: string;
  /** Custom hover border color */
  hoverBorderColor?: string;
  /** Custom accent color for replacement arrow compartment (defaults to #261CC1 brand blue) */
  accentColor?: string;
  /** Custom arrow icon color inside replacement accent compartment (defaults to #ffffff for blue) */
  arrowColor?: string;
  /** Additional CSS classes */
  className?: string;
  /** Click event handler */
  onClick?: () => void;
  /** Target attribute for external links (e.g. '_blank') */
  target?: string;
  /** Rel attribute for links */
  rel?: string;
  /** HTML button type */
  type?: "button" | "submit" | "reset";
  /** Disabled state */
  disabled?: boolean;
}

/**
 * ButtonZoomIn / buttonzoomin
 *
 * High-end architectural button featuring:
 * 1. Outline color configurable directly via `outlineColor` / `borderColor` props.
 * 2. 1px divider border matching the outline border exactly in size and color.
 * 3. Blue accent compartment (#261CC1) with white arrow sliding in on hover.
 * 4. Two variants:
 *    - 'white': White base that hovers to black with white text.
 *    - 'black': Black base that hovers to white with black text.
 * 5. Perfectly centered single-line text with GSAP upward roll replacement animation.
 */
export function ButtonZoomIn({
  href,
  label,
  variant = "white",
  outlineColor,
  borderColor,
  hoverBorderColor: customHoverBorder,
  accentColor = "#261CC1",
  arrowColor,
  className = "",
  onClick,
  target,
  rel,
  type = "button",
  disabled,
}: ButtonZoomInProps) {
  const containerRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const bgOverlayRef = useRef<HTMLSpanElement>(null);
  const textTopRef = useRef<HTMLSpanElement>(null);
  const textBottomRef = useRef<HTMLSpanElement>(null);
  const arrowBoxContainerRef = useRef<HTMLSpanElement>(null);
  const arrow1BoxRef = useRef<HTMLSpanElement>(null);
  const arrow2BoxRef = useRef<HTMLSpanElement>(null);

  // Normalize variant
  const isBlackVariant =
    variant === "black" ||
    variant === "dark" ||
    variant === "ghost-black";

  // Explicit outline color from props, or fallback by variant
  const customOutline = outlineColor || borderColor;
  const defaultBorderColor = isBlackVariant
    ? "rgba(255, 255, 255, 0.6)"
    : "#121212";
  const restBorderColor = customOutline || defaultBorderColor;

  const restBgClass = isBlackVariant ? "bg-[#121212]" : "bg-[#f7fbff]";
  const restTextClass = isBlackVariant ? "text-white" : "text-[#121212]";

  // ── GSAP Target Transitions ──
  // 'white' hovers as black; 'black' hovers as white
  const hoverBg = isBlackVariant ? "#f7fbff" : "#121212";
  const hoverTextColor = isBlackVariant ? "#121212" : "#f7fbff";
  const hoverBorderColor =
    customHoverBorder ||
    (customOutline
      ? customOutline
      : isBlackVariant
        ? "#121212"
        : "rgba(255, 255, 255, 0.8)");
  const hoverArrow2Bg = accentColor;
  // Arrow on blue background for crisp contrast, or custom color
  const hoverArrow2Color = arrowColor || "#f7fbff";

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // 1. Initial GSAP state
      gsap.set(textTopRef.current, { yPercent: 0 });
      gsap.set(textBottomRef.current, { yPercent: 100 });
      gsap.set(arrow1BoxRef.current, { xPercent: 0 });
      gsap.set(arrow2BoxRef.current, { xPercent: -100 });

      // 2. Build hover timeline
      const tl = gsap.timeline({
        paused: true,
        defaults: { duration: 0.22, ease: "power2.out" },
      });

      // Upward text replacement animation
      tl.to(textTopRef.current, { yPercent: -100 }, 0);
      tl.to(textBottomRef.current, { yPercent: 0 }, 0);

      // Button background fill transition
      tl.to(bgOverlayRef.current, { backgroundColor: hoverBg, opacity: 1, duration: 0.18 }, 0);

      // Outline and divider border sync (fast, snappy transition)
      tl.to(
        [el, arrowBoxContainerRef.current],
        { borderColor: hoverBorderColor, duration: 0.12, ease: "power1.out" },
        0
      );

      // Text color transition
      tl.to(
        [textTopRef.current, textBottomRef.current],
        { color: hoverTextColor, duration: 0.18 },
        0
      );

      // Arrow replacement: arrow 1 slides out right, arrow 2 (blue) slides in from left
      tl.to(arrow1BoxRef.current, { xPercent: 100 }, 0);
      tl.to(arrow2BoxRef.current, { xPercent: 0 }, 0);

      const onEnter = () => tl.play();
      const onLeave = () => tl.reverse();

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);

      return () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      };
    }, el);

    return () => ctx.revert();
  }, [hoverBg, hoverTextColor, hoverBorderColor, hoverArrow2Bg]);

  const content = (
    <>
      {/* ── BUTTON BACKGROUND OVERLAY (animated via GSAP) ── */}
      <span
        ref={bgOverlayRef}
        aria-hidden="true"
        className="absolute inset-0 bg-transparent will-change-[background-color,opacity] pointer-events-none"
      />

      {/* ── LEFT COMPARTMENT (Properly Centered Text) ── */}
      <span className="relative z-10 flex-1 px-4 sm:px-6 py-3.5 flex items-center justify-center text-center overflow-hidden min-h-[46px]">
        {/* Clipped single-line text wrapper with comfortable clearance */}
        <span className="relative block w-full h-[1.3em] overflow-hidden leading-[1.3] select-none text-center">
          {/* Top Text (exits upward on hover) */}
          <span
            ref={textTopRef}
            className="block w-full leading-[1.3] will-change-transform text-current text-center"
          >
            {label}
          </span>
          {/* Bottom Text (rolls upward into place on hover) */}
          <span
            ref={textBottomRef}
            aria-hidden="true"
            className="block w-full leading-[1.3] absolute inset-0 will-change-transform text-current text-center"
          >
            {label}
          </span>
        </span>
      </span>

      {/* ── RIGHT COMPARTMENT (Divider border matches outline 1px exactly) ── */}
      <span
        ref={arrowBoxContainerRef}
        style={{ borderColor: restBorderColor }}
        className="relative z-10 w-11 sm:w-12 border-l border-solid overflow-hidden shrink-0 self-stretch flex items-center justify-center min-h-[46px]"
      >
        {/* Arrow 1: Default State Arrow (slides out to the right: xPercent: 100) */}
        <span
          ref={arrow1BoxRef}
          className="absolute inset-0 flex items-center justify-center will-change-transform"
        >
          <svg
            viewBox="0 0 12 12"
            className="w-3.5 h-3.5 fill-current"
            aria-hidden="true"
          >
            <path d="M7.4,0.7l4,5.3l-4,5.3H5.5l1.9-2.5c0.8-1,1.3-1.8,1.7-2.2H0.5V5.3H9C8.6,4.7,8,4,7.4,3.1L5.5,0.7H7.4z" />
          </svg>
        </span>

        {/* Arrow 2: Replacement Blue Accent Box (slides in from the left: xPercent: -100 -> 0) */}
        <span
          ref={arrow2BoxRef}
          className="absolute inset-0 flex items-center justify-center will-change-transform"
          style={{ backgroundColor: hoverArrow2Bg }}
        >
          <svg
            viewBox="0 0 12 12"
            className="w-3.5 h-3.5"
            style={{ fill: hoverArrow2Color }}
            aria-hidden="true"
          >
            <path d="M7.4,0.7l4,5.3l-4,5.3H5.5l1.9-2.5c0.8-1,1.3-1.8,1.7-2.2H0.5V5.3H9C8.6,4.7,8,4,7.4,3.1L5.5,0.7H7.4z" />
          </svg>
        </span>
      </span>
    </>
  );

  const sharedClasses = `group relative inline-flex items-center border border-solid box-border cursor-pointer overflow-hidden min-w-[14rem] sm:min-w-[15rem] font-metropolis font-semibold text-[0.9375rem] tracking-[0.01em] no-underline select-none ${restTextClass} ${restBgClass} ${className}`;

  if (href) {
    return (
      <Link
        ref={containerRef as React.Ref<HTMLAnchorElement>}
        href={href}
        style={{ borderColor: restBorderColor }}
        className={sharedClasses}
        onClick={onClick}
        target={target}
        rel={rel}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={containerRef as React.Ref<HTMLButtonElement>}
      type={type}
      style={{ borderColor: restBorderColor }}
      className={sharedClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

/** Reusable aliases */
export const ButtonZoomin = ButtonZoomIn;
export const buttonzoomin = ButtonZoomIn;
export const ArchitecturalButton = ButtonZoomIn;
export const DualRollButton = ButtonZoomIn;
