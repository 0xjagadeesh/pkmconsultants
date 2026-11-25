"use client";

import Image from "next/image";
import { type PointerEvent, useRef } from "react";

type CrosshairImageProps = {
  src: string;
  alt: string;
  sizes: string;
  /** Line / label colour context */
  tone?: "light" | "dark";
  priority?: boolean;
  className?: string;
};

/**
 * Image with a drafting crosshair: two hairlines and an "X / Y" readout
 * measured from the image centre (Enerblock intro-cross pattern). The
 * crosshair follows a mouse pointer; on touch it rests at the centre.
 */
export function CrosshairImage({
  src,
  alt,
  sizes,
  tone = "light",
  priority = false,
  className = "",
}: CrosshairImageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const root = rootRef.current;
    if (!root) return;
    const rect = root.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      root.style.setProperty("--cx", `${x}px`);
      root.style.setProperty("--cy", `${y}px`);
      if (labelRef.current) {
        labelRef.current.textContent = `X: ${Math.round(x - rect.width / 2)} Y: ${Math.round(rect.height / 2 - y)}`;
      }
    });
  };

  const reset = () => {
    const root = rootRef.current;
    if (!root) return;
    root.style.setProperty("--cx", "50%");
    root.style.setProperty("--cy", "50%");
    if (labelRef.current) labelRef.current.textContent = "X: 0 Y: 0";
  };

  const line = tone === "light" ? "bg-[#f7fbff]/80" : "bg-white/70";

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: decorative pointer effect only
    <div
      className={`group relative h-full w-full overflow-hidden bg-[#dedcff]/30 [--cx:50%] [--cy:50%] ${className}`}
      onPointerLeave={reset}
      onPointerMove={move}
      ref={rootRef}
    >
      <Image
        alt={alt}
        className="rounded-none object-cover"
        fill
        priority={priority}
        sizes={sizes}
        src={src}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span
          className={`absolute inset-y-0 w-px ${line}`}
          style={{ left: "var(--cx)" }}
        />
        <span
          className={`absolute inset-x-0 h-px ${line}`}
          style={{ top: "var(--cy)" }}
        />
        <span
          className="-translate-x-1/2 -translate-y-1/2 absolute size-2 bg-[#261CC1]"
          style={{ left: "var(--cx)", top: "var(--cy)" }}
        />
        <span
          className="absolute ml-3 mt-3 whitespace-nowrap bg-[#0d0c11]/70 px-1.5 py-0.5 font-mono text-[0.7rem] text-white tracking-wider"
          ref={labelRef}
          style={{ left: "var(--cx)", top: "var(--cy)" }}
        >
          X: 0 Y: 0
        </span>
      </div>
    </div>
  );
}
