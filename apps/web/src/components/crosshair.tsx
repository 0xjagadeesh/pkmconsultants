"use client";

import gsap from "gsap";
import { type PointerEvent, useEffect, useRef } from "react";

import { REDUCED_MOTION } from "@/lib/motion";

export type CrosshairProps = {
  /** Light surfaces get dark lines; dark surfaces get light lines */
  theme?: "light" | "dark";
  /**
   * Resting point as fractions of the box (e.g. `[0.4, 0.62]`). When set, the
   * crosshair is always visible and glides back here when the mouse leaves
   * (and stays here on touch). When omitted, it only shows while hovering,
   * like the home page CursorTracker.
   */
  rest?: [number, number];
  /** Faint 20px drafting grid behind the lines */
  grid?: boolean;
  className?: string;
};

// Same follow feel as CursorTracker
const FOLLOW = { duration: 0.12, ease: "power1.out" };
const GLIDE = { duration: 0.7, ease: "expo.out" };

/**
 * Mouse-following crosshair with live X / Y readout, based on the home page
 * CursorTracker but without the drag-selection box or the bordered centre
 * square. Fills its parent (give the parent a size). Decorative only.
 */
export function Crosshair({
  theme = "light",
  rest,
  grid = true,
  className = "",
}: CrosshairProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const vLineRef = useRef<HTMLDivElement>(null);
  const hLineRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const xTextRef = useRef<HTMLSpanElement>(null);
  const yTextRef = useRef<HTMLSpanElement>(null);
  const restRef = useRef(rest);
  restRef.current = rest;

  const isDark = theme === "dark";
  const alwaysOn = rest !== undefined;

  const place = (x: number, y: number, motion: gsap.TweenVars) => {
    const reduced = window.matchMedia(REDUCED_MOTION).matches;
    const vars = reduced ? { duration: 0 } : motion;
    gsap.to(vLineRef.current, { x, ...vars, overwrite: true });
    gsap.to(hLineRef.current, { y, ...vars, overwrite: true });
    gsap.to(pinRef.current, { x, y, ...vars, overwrite: true });
    if (xTextRef.current) xTextRef.current.textContent = `X: ${Math.round(x)}`;
    if (yTextRef.current) yTextRef.current.textContent = `Y: ${Math.round(y)}`;
  };

  const goToRest = (motion: gsap.TweenVars) => {
    const box = boxRef.current;
    const point = restRef.current;
    if (!(box && point)) return;
    box.dataset.idle = "true";
    place(box.clientWidth * point[0], box.clientHeight * point[1], motion);
  };

  // Snap to the rest point on mount and whenever the box resizes while idle
  // biome-ignore lint/correctness/useExhaustiveDependencies: helpers read refs only
  useEffect(() => {
    const box = boxRef.current;
    if (!(box && restRef.current)) return;
    goToRest({ duration: 0 });
    const observer = new ResizeObserver(() => {
      if (box.dataset.idle === "true") goToRest({ duration: 0 });
    });
    observer.observe(box);
    return () => observer.disconnect();
  }, [alwaysOn]);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const box = event.currentTarget;
    const rect = box.getBoundingClientRect();
    const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
    const y = Math.min(Math.max(event.clientY - rect.top, 0), rect.height);
    box.dataset.idle = "false";
    place(x, y, FOLLOW);
  };

  const leave = () => goToRest(GLIDE);

  const show = alwaysOn
    ? "opacity-100"
    : "opacity-0 group-hover/crosshair:opacity-100";
  const line = isDark ? "bg-white/30" : "bg-black/10";
  const label = isDark ? "text-white/80" : "text-black/40";

  return (
    <div
      aria-hidden="true"
      className={`group/crosshair relative h-full w-full select-none overflow-hidden ${className}`}
      data-idle={alwaysOn ? "true" : "false"}
      onDragStart={(e) => e.preventDefault()}
      onPointerLeave={leave}
      onPointerMove={move}
      ref={boxRef}
    >
      {grid ? (
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
            isDark
              ? "opacity-[0.08] group-hover/crosshair:opacity-[0.16]"
              : "opacity-[0.03] group-hover/crosshair:opacity-[0.06]"
          }`}
          style={{
            backgroundImage: isDark
              ? "linear-gradient(rgba(255,255,255,0.2) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.2) 1px,transparent 1px)"
              : "linear-gradient(rgba(0,0,0,0.15) 1px,transparent 1px), linear-gradient(90deg,rgba(0,0,0,0.15) 1px,transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      ) : null}

      <div className={`transition-opacity duration-300 ${show}`}>
        {/* Vertical line (follows X) */}
        <div
          className={`pointer-events-none absolute inset-y-0 left-0 w-px ${line}`}
          ref={vLineRef}
        />
        {/* Horizontal line (follows Y) */}
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 h-px ${line}`}
          ref={hLineRef}
        />
        {/* Readout pinned to the intersection */}
        <div className="pointer-events-none absolute top-0 left-0" ref={pinRef}>
          <span
            className={`absolute bottom-2 left-3 whitespace-nowrap font-bold font-mono text-[0.8rem] tabular-nums ${label}`}
            ref={xTextRef}
          >
            X: 0
          </span>
          <span
            className={`absolute top-2 right-3 whitespace-nowrap font-bold font-mono text-[0.8rem] tabular-nums ${label}`}
            ref={yTextRef}
          >
            Y: 0
          </span>
        </div>
      </div>
    </div>
  );
}
