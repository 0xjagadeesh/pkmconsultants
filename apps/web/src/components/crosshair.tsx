"use client";

import gsap from "gsap";
import { type PointerEvent, useRef } from "react";

import { REDUCED_MOTION } from "@/lib/motion";

export type CrosshairProps = {
  /** Light surfaces get dark lines; dark surfaces get light lines */
  theme?: "light" | "dark";
  /** Faint 20px drafting grid behind the lines */
  grid?: boolean;
  className?: string;
};

// Same follow feel as CursorTracker
const FOLLOW = { duration: 0.12, ease: "power1.out" };
const SNAP = { duration: 0 };

/**
 * Mouse-following crosshair with live X / Y readout, based on the home page
 * CursorTracker but without the drag-selection box or the bordered centre
 * square. Hover only: it appears while the mouse is over it and hides on
 * leave (nothing shows on touch). Fills its parent (give the parent a size).
 * Decorative only.
 */
export function Crosshair({
  theme = "light",
  grid = true,
  className = "",
}: CrosshairProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const vLineRef = useRef<HTMLDivElement>(null);
  const hLineRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const xTextRef = useRef<HTMLSpanElement>(null);
  const yTextRef = useRef<HTMLSpanElement>(null);

  const isDark = theme === "dark";

  const place = (x: number, y: number, motion: gsap.TweenVars) => {
    const reduced = window.matchMedia(REDUCED_MOTION).matches;
    const vars = reduced ? { duration: 0 } : motion;
    gsap.to(vLineRef.current, { x, ...vars, overwrite: true });
    gsap.to(hLineRef.current, { y, ...vars, overwrite: true });
    gsap.to(pinRef.current, { x, y, ...vars, overwrite: true });
    if (xTextRef.current) xTextRef.current.textContent = `X: ${Math.round(x)}`;
    if (yTextRef.current) yTextRef.current.textContent = `Y: ${Math.round(y)}`;
  };

  const track =
    (motion: gsap.TweenVars) => (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse") return;
      const rect = event.currentTarget.getBoundingClientRect();
      const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
      const y = Math.min(Math.max(event.clientY - rect.top, 0), rect.height);
      place(x, y, motion);
    };
  const line = isDark ? "bg-white/30" : "bg-black/10";
  const label = isDark ? "text-white/80" : "text-black/40";

  return (
    <div
      aria-hidden="true"
      className={`group/crosshair relative h-full w-full select-none overflow-hidden ${className}`}
      onDragStart={(e) => e.preventDefault()}
      // Enter: jump to the pointer so the lines never sweep in from a corner
      onPointerEnter={track(SNAP)}
      onPointerMove={track(FOLLOW)}
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

      <div className="opacity-0 transition-opacity duration-300 group-hover/crosshair:opacity-100">
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
