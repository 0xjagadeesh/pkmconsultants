"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { type PointerEvent, useEffect, useRef } from "react";

import { MOTION_OK, REDUCED_MOTION } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type ImageRevealCrosshairProps = {
  src: string;
  alt: string;
  /** Responsive `sizes` for next/image (the image column, not the viewport) */
  sizes?: string;
  className?: string;
};

/** Where the right-panel crosshair rests when no mouse is over it (fraction) */
const REST_X = 0.4;
const REST_Y = 0.62;
/** Starting zoom of the photo; it settles to 1 as the reveal completes */
const ZOOM_FROM = 1.12;

const LINE = "pointer-events-none absolute bg-[#261CC1]/45";
const DOT =
  "-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute size-2 bg-[#261CC1]";
const LABEL =
  "pointer-events-none absolute whitespace-nowrap font-mosvita text-[#261CC1] text-[0.8rem] tabular-nums tracking-[0.04em] lg:text-[0.95rem]";

/**
 * Drafting-sheet section: a large photo on the left that unrolls from its
 * top-left corner on scroll, with tracking lines and an X / Y readout riding
 * its moving corner, and a separate panel on the right whose crosshair follows
 * the mouse (resting at a fixed point on touch / when the pointer leaves).
 */
export function ImageRevealCrosshair({
  src,
  alt,
  sizes = "(min-width: 1024px) 70vw, 100vw",
  className = "",
}: ImageRevealCrosshairProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const revealXRef = useRef<HTMLSpanElement>(null);
  const revealYRef = useRef<HTMLSpanElement>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const crossXRef = useRef<HTMLSpanElement>(null);
  const crossYRef = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);

  /* ── Image reveal: scroll-scrubbed clip from the top-left corner ── */
  useEffect(() => {
    const stage = stageRef.current;
    const box = frameRef.current;
    const clip = clipRef.current;
    if (!(stage && box && clip)) return;

    // Offsets (not getBoundingClientRect) so transforms never skew the maths
    const draw = (p: number) => {
      const w = box.offsetWidth;
      const h = box.offsetHeight;
      const inset = (1 - p) * 100;
      clip.style.clipPath = `inset(0px ${inset}% ${inset}% 0px)`;
      stage.style.setProperty("--ex", `${box.offsetLeft + w * p}px`);
      stage.style.setProperty("--ey", `${box.offsetTop + h * p}px`);
      stage.dataset.visible = String(p > 0.02);
      if (revealXRef.current) {
        revealXRef.current.textContent = `X: ${Math.round(w * p)}`;
      }
      if (revealYRef.current) {
        revealYRef.current.textContent = `Y: ${Math.round(h * p)}`;
      }
      if (imgRef.current) {
        imgRef.current.style.transform = `scale(${ZOOM_FROM - (ZOOM_FROM - 1) * p})`;
      }
    };

    const mm = gsap.matchMedia(stage);

    mm.add(REDUCED_MOTION, () => draw(1));

    mm.add(MOTION_OK, () => {
      const state = { p: 0 };
      draw(0);
      gsap.to(state, {
        p: 1,
        ease: "none",
        onUpdate: () => draw(state.p),
        scrollTrigger: {
          trigger: stage,
          start: "top 85%",
          end: "center 55%",
          scrub: 1,
          // Redraw at the current progress after layout changes (resize, fonts)
          onRefresh: () => draw(state.p),
        },
      });
    });

    return () => mm.revert();
  }, []);

  /* ── Right panel crosshair: rest position + readout ── */
  const setCross = (x: number, y: number) => {
    const panel = panelRef.current;
    if (!panel) return;
    panel.style.setProperty("--cx", `${x}px`);
    panel.style.setProperty("--cy", `${y}px`);
    if (crossXRef.current)
      crossXRef.current.textContent = `X: ${Math.round(x)}`;
    if (crossYRef.current)
      crossYRef.current.textContent = `Y: ${Math.round(y)}`;
  };

  const rest = () => {
    const panel = panelRef.current;
    if (!panel) return;
    panel.dataset.idle = "true";
    setCross(panel.clientWidth * REST_X, panel.clientHeight * REST_Y);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: rest only reads refs
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    rest();
    const observer = new ResizeObserver(() => {
      if (panel.dataset.idle === "true") rest();
    });
    observer.observe(panel);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, []);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const panel = panelRef.current;
    if (!panel) return;
    const rect = panel.getBoundingClientRect();
    const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
    const y = Math.min(Math.max(event.clientY - rect.top, 0), rect.height);
    panel.dataset.idle = "false";
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => setCross(x, y));
  };

  // Lines glide back to the rest point, but follow the mouse with no lag
  const glide =
    "group-data-[idle=true]/panel:transition-[left,top] group-data-[idle=true]/panel:duration-700 group-data-[idle=true]/panel:ease-[cubic-bezier(0.16,1,0.3,1)]";

  return (
    <section
      className={`relative border-[#121212]/15 border-y bg-[#f7fbff] ${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(15rem,24%)]">
        {/* ── Left: image stage (lines span the whole stage) ── */}
        <div
          className="group/stage relative overflow-hidden border-[#121212]/15 [--ex:0px] [--ey:0px] lg:border-r"
          data-visible="false"
          ref={stageRef}
        >
          {/* Top strip */}
          <div className="h-10 border-[#121212]/15 border-b lg:h-14" />

          {/* Image frame: right gutter leaves room for the X readout */}
          <div
            className="relative mr-14 ml-5 aspect-[4/3] sm:aspect-[16/10] lg:mr-24 lg:ml-6"
            ref={frameRef}
          >
            <div
              className="absolute inset-0 overflow-hidden will-change-[clip-path]"
              ref={clipRef}
              style={{ clipPath: "inset(0px 100% 100% 0px)" }}
            >
              <Image
                alt={alt}
                className="rounded-none object-cover will-change-transform"
                draggable={false}
                fill
                ref={imgRef}
                sizes={sizes}
                src={src}
                style={{ transform: `scale(${ZOOM_FROM})` }}
              />
            </div>
          </div>

          {/* Bottom strip */}
          <div className="h-16 lg:h-24" />

          {/* Tracking lines + readout on the moving corner */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-data-[visible=true]/stage:opacity-100"
          >
            <span
              className={`${LINE} inset-y-0 w-px`}
              style={{ left: "var(--ex)" }}
            />
            <span
              className={`${LINE} inset-x-0 h-px`}
              style={{ top: "var(--ey)" }}
            />
            <span
              className={DOT}
              style={{ left: "var(--ex)", top: "var(--ey)" }}
            />
            <span
              className={`${LABEL} -translate-y-full ml-3 -mt-2`}
              ref={revealXRef}
              style={{ left: "var(--ex)", top: "var(--ey)" }}
            >
              X: 0
            </span>
            <span
              className={`${LABEL} -translate-x-full mt-3 -ml-3`}
              ref={revealYRef}
              style={{ left: "var(--ex)", top: "var(--ey)" }}
            >
              Y: 0
            </span>
          </div>
        </div>

        {/* ── Right: crosshair panel ── */}
        <div
          aria-hidden="true"
          className="group/panel relative min-h-72 overflow-hidden border-[#121212]/15 border-t [--cx:40%] [--cy:62%] lg:min-h-0 lg:border-t-0"
          data-idle="true"
          onPointerLeave={rest}
          onPointerMove={move}
          ref={panelRef}
        >
          <span
            className={`${LINE} inset-y-0 w-px ${glide}`}
            style={{ left: "var(--cx)" }}
          />
          <span
            className={`${LINE} inset-x-0 h-px ${glide}`}
            style={{ top: "var(--cy)" }}
          />
          <span
            className={`${DOT} ${glide}`}
            style={{ left: "var(--cx)", top: "var(--cy)" }}
          />
          <span
            className={`${LABEL} -translate-y-full ml-3 -mt-2 ${glide}`}
            ref={crossXRef}
            style={{ left: "var(--cx)", top: "var(--cy)" }}
          >
            X: 0
          </span>
          <span
            className={`${LABEL} -translate-x-full mt-3 -ml-3 ${glide}`}
            ref={crossYRef}
            style={{ left: "var(--cx)", top: "var(--cy)" }}
          >
            Y: 0
          </span>
        </div>
      </div>
    </section>
  );
}
