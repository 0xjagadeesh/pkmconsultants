"use client";

import { useRef, useEffect, CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface ImageClipRevealProps {
  src: string;
  alt: string;

  // Container sizing
  aspectRatio?: string;
  width?: string;
  height?: string;
  fill?: boolean;
  style?: CSSProperties;
  borderRadius?: string | number;

  // Image inset inside container
  insetTop?: string;
  insetLeft?: string;
  imageWidth?: string;
  imageHeight?: string;

  // Colours
  lineColor?: string;
  labelColor?: string;
  dotColor?: string;

  // Coordinate label ranges
  maxX?: number;
  maxY?: number;

  // GSAP / ScrollTrigger
  scrub?: number | boolean;
  triggerStart?: string;
  triggerEnd?: string;
  zoomFrom?: number;
  className?: string;
  /** Custom scroll trigger element or selector */
  trigger?: HTMLElement | string | null;
}

export function ImageClipReveal({
  src,
  alt,
  aspectRatio,
  width = "100%",
  height = "auto",
  fill = false,
  style,
  borderRadius = 0,
  insetTop = "0%",
  insetLeft = "0%",
  imageWidth = "90%",
  imageHeight = "90%",
  lineColor = "bg-[#121212]/25",
  labelColor = "text-[#121212]/75",
  dotColor = "bg-[#121212]",
  maxX,
  maxY,
  scrub = 1.6,
  triggerStart = "top 78%",
  triggerEnd = "top 30%",
  zoomFrom = 1.15,
  className = "",
  trigger,
}: ImageClipRevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const imgElRef = useRef<HTMLImageElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const vLineRef = useRef<HTMLDivElement>(null);
  const hLineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const xLblRef = useRef<HTMLDivElement>(null);
  const yLblRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    const imgEl = imgElRef.current;
    const clip = clipRef.current;
    const vLine = vLineRef.current;
    const hLine = hLineRef.current;
    const dot = dotRef.current;
    const xLbl = xLblRef.current;
    const yLbl = yLblRef.current;
    if (!wrap || !img || !clip) return;

    const ctx = gsap.context(() => {
      const proxy = { p: 0 };

      gsap.to(proxy, {
        p: 1,
        ease: "none",
        onUpdate() {
          const p = proxy.p;

          // Clip-path reveal
          const right = (1 - p) * 100;
          const bottom = (1 - p) * 100;
          clip.style.clipPath = `inset(0px ${right}% ${bottom}% 0px)`;

          // Exact intersection edge coordinates
          const rect = img.getBoundingClientRect();
          const wrRect = wrap.getBoundingClientRect();

          const edgeX = rect.left - wrRect.left + rect.width * p;
          const edgeY = rect.top - wrRect.top + rect.height * p;

          // Max value is 90% of container size unless explicitly provided
          const limitX = maxX !== undefined ? maxX : Math.round(wrRect.width * 0.9);
          const limitY = maxY !== undefined ? maxY : Math.round(wrRect.height * 0.9);

          const valX = Math.round(p * limitX);
          const valY = Math.round(p * limitY);
          const vis = p > 0.02 ? "1" : "0";

          // Tracking lines
          if (vLine) vLine.style.transform = `translateX(${edgeX}px)`;
          if (hLine) hLine.style.transform = `translateY(${edgeY}px)`;

          // Corner dot (solid black square centered on intersection)
          if (dot) {
            dot.style.left = `${edgeX - 4}px`;
            dot.style.top = `${edgeY - 4}px`;
            dot.style.opacity = vis;
          }

          // X Label: Top-right relative to intersection
          if (xLbl) {
            xLbl.style.left = `${edgeX + 10}px`;
            xLbl.style.top = `${edgeY - 20}px`;
            xLbl.textContent = `X: ${valX}`;
            xLbl.style.opacity = vis;
          }

          // 2. Y Label Alignment: Bottom-left relative to intersection
          if (yLbl) {
            yLbl.style.left = `${edgeX - 85}px`; // Shifted left so right side aligns with vertical line
            yLbl.style.top = `${edgeY + 8}px`;   // Positioned cleanly below horizontal line
            yLbl.textContent = `Y: ${valY}`;
            yLbl.style.opacity = vis;
          }

          // Inner Image Zoom
          if (imgEl && zoomFrom !== 1) {
            const currentScale = zoomFrom - (zoomFrom - 1) * p;
            imgEl.style.transform = `scale(${currentScale})`;
          }
        },
        scrollTrigger: {
          trigger: trigger || wrap,
          start: triggerStart,
          end: triggerEnd,
          scrub,
        },
      });
    });

    return () => ctx.revert();
  }, [maxX, maxY, scrub, triggerStart, triggerEnd, zoomFrom, trigger]);

  const containerStyle: CSSProperties = fill
    ? { position: "absolute", inset: 0, borderRadius, ...style }
    : {
      position: "relative",
      width,
      height,
      borderRadius,
      ...(aspectRatio ? { aspectRatio } : {}),
      ...style,
    };

  return (
    <div
      ref={wrapRef}
      className={`overflow-hidden rounded-none ${className}`}
      style={containerStyle}
    >
      <div
        ref={imgRef}
        className="absolute rounded-none"
        style={{
          top: insetTop,
          left: insetLeft,
          width: imageWidth,
          height: imageHeight,
          borderRadius,
        }}
      >
        <div
          ref={clipRef}
          className="absolute inset-0 overflow-hidden rounded-none will-change-[clip-path]"
          style={{ clipPath: "inset(0px 100% 100% 0px)", borderRadius }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgElRef}
            src={src}
            alt={alt}
            className="w-full h-full object-cover will-change-transform rounded-none"
            style={{
              transform: `scale(${zoomFrom})`,
              transformOrigin: "center center",
              borderRadius,
            }}
            loading="lazy"
            draggable={false}
          />
        </div>
      </div>

      {/* Vertical line */}
      <div
        ref={vLineRef}
        aria-hidden="true"
        className={`absolute top-0 bottom-0 w-px ${lineColor} will-change-transform pointer-events-none`}
        style={{ left: 0, transform: "translateX(-999px)" }}
      />

      {/* Horizontal line */}
      <div
        ref={hLineRef}
        aria-hidden="true"
        className={`absolute left-0 right-0 h-px ${lineColor} will-change-transform pointer-events-none`}
        style={{ top: 0, transform: "translateY(-999px)" }}
      />

      {/* Larger Corner dot (8px x 8px) */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`absolute w-2 h-2 ${dotColor} pointer-events-none`}
        style={{ opacity: 0, top: 0, left: 0 }}
      />

      {/* X label */}
      <div
        ref={xLblRef}
        aria-hidden="true"
        className={`absolute text-xs font-mono font-semibold tracking-wider ${labelColor} whitespace-nowrap pointer-events-none`}
        style={{ opacity: 0, top: 0, left: 0 }}
      />

      {/* Y label aligned to the left of vertical line */}
      <div
        ref={yLblRef}
        aria-hidden="true"
        className={`absolute text-xs font-mono font-semibold tracking-wider text-right w-[75px] ${labelColor} whitespace-nowrap pointer-events-none`}
        style={{ opacity: 0, top: 0, left: 0 }}
      />
    </div>
  );
}