"use client";

import { type PointerEvent, useEffect, useRef } from "react";

type CoordinateFieldProps = {
  className?: string;
};

/**
 * Empty drafting field with a full-height / full-width crosshair and
 * X / Y readouts (Enerblock header pattern). The crosshair follows a mouse
 * pointer and eases back to its resting point when the pointer leaves.
 * Decorative only: hidden from assistive technology.
 */
export function CoordinateField({ className = "" }: CoordinateFieldProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const xLabel = useRef<HTMLSpanElement>(null);
  const yLabel = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);

  const place = (x: number, y: number) => {
    const root = rootRef.current;
    if (!root) return;
    root.style.setProperty("--cx", `${x}px`);
    root.style.setProperty("--cy", `${y}px`);
    if (xLabel.current) xLabel.current.textContent = `X: ${Math.round(x)}`;
    if (yLabel.current) yLabel.current.textContent = `Y: ${Math.round(y)}`;
  };

  const rest = () => {
    const root = rootRef.current;
    if (!root) return;
    // Resting point: one third across, three fifths down
    place(root.clientWidth / 3, (root.clientHeight * 3) / 5);
  };

  useEffect(() => {
    rest();
    const root = rootRef.current;
    if (!root) return;
    const observer = new ResizeObserver(rest);
    observer.observe(root);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
    };
    // biome-ignore lint/correctness/useExhaustiveDependencies: mount-only; rest() reads refs
  }, []);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const root = rootRef.current;
    if (!root) return;
    const rect = root.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => place(x, y));
  };

  return (
    <div
      aria-hidden="true"
      className={`relative h-full w-full select-none overflow-hidden [--cx:33%] [--cy:60%] ${className}`}
      onPointerLeave={rest}
      onPointerMove={move}
      ref={rootRef}
    >
      {/* Vertical + horizontal hairlines */}
      <span
        className="absolute inset-y-0 w-px bg-[#121212]/20 transition-[left] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ left: "var(--cx)" }}
      />
      <span
        className="absolute inset-x-0 h-px bg-[#121212]/20 transition-[top] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ top: "var(--cy)" }}
      />
      {/* Intersection marker */}
      <span
        className="-translate-x-1/2 -translate-y-1/2 absolute size-1.5 bg-[#121212] transition-[left,top] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ left: "var(--cx)", top: "var(--cy)" }}
      />
      {/* X above-right, Y below-left of the intersection */}
      <span
        className="-translate-y-[calc(100%+0.75rem)] absolute ml-5 font-metropolis text-[#121212]/80 text-[0.95rem] transition-[left,top] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        ref={xLabel}
        style={{ left: "var(--cx)", top: "var(--cy)" }}
      >
        X: 0
      </span>
      <span
        className="-translate-x-[calc(100%+0.75rem)] absolute mt-3 font-metropolis text-[#121212]/80 text-[0.95rem] transition-[left,top] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        ref={yLabel}
        style={{ left: "var(--cx)", top: "var(--cy)" }}
      >
        Y: 0
      </span>
    </div>
  );
}
