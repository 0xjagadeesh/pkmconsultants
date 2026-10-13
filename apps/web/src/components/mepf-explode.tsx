"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LAYERS = [
  {
    key: "arch",
    label: "Architecture",
    sublabel: "Spatial Framework",
    src: "/images/archi.webp",
    color: "rgba(95,212,214,0.10)",
    border: "rgba(95,212,214,0.50)",
    accent: "#5fd4d6",
  },
  {
    key: "hvac",
    label: "HVAC",
    sublabel: "Mechanical Systems",
    src: "/images/hvac.webp",
    color: "rgba(232,162,61,0.10)",
    border: "rgba(232,162,61,0.50)",
    accent: "#e8a23d",
  },
  {
    key: "plumb",
    label: "Plumbing",
    sublabel: "Water & Drainage",
    src: "/images/plumbing.webp",
    color: "rgba(86,156,255,0.10)",
    border: "rgba(86,156,255,0.50)",
    accent: "#569cff",
  },
  {
    key: "fps",
    label: "Fire Protection",
    sublabel: "Safety Systems",
    src: "/images/fps.webp",
    color: "rgba(255,100,100,0.10)",
    border: "rgba(255,100,100,0.50)",
    accent: "#ff6464",
  },
];

// Z elevation per layer step when fully exploded (px)
const ELEVATION_STEP = 40;

// Target isometric angles
const ISO_RX = 50;  // rotateX — classic isometric tilt
const ISO_RZ = -20;   // rotateZ — classic isometric twist

// Scale factor to compensate perspective shrinkage during tilt
const SCALE_END = 1;

export function MepfExplode() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<HTMLDivElement[]>([]);
  const legendRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const pin = pinRef.current;
    const stack = stackRef.current;
    if (!wrapper || !pin || !stack) return;

    // ── Initial: flat front-facing, collapsed, normal scale ──────────────
    gsap.set(stack, { rotateX: 0, rotateZ: 0, scale: 1 });
    layerRefs.current.forEach((el) => gsap.set(el, { z: 0 }));
    legendRefs.current.forEach((el) => gsap.set(el, { opacity: 0.2, x: -10 }));

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.6,
        pin: pin,
        pinSpacing: false,
        anticipatePin: 1,
      },
    });

    // ── Phase 1 (0–45 %): rotate into isometric + scale up to compensate ─
    tl.to(
      stack,
      {
        rotateX: ISO_RX,
        rotateZ: ISO_RZ,
        scale: SCALE_END,
        duration: 0.45,
        ease: "power2.inOut",
      },
      0
    );

    // ── Phase 2 (30–100 %): each layer elevates upward in Z ──────────────
    layerRefs.current.forEach((el, i) => {
      tl.to(
        el,
        {
          z: i * ELEVATION_STEP,
          duration: 0.55,
          ease: "power3.out",
        },
        0.25 + i * 0.05
      );
    });

    // ── Legend rows fade + slide in staggered ────────────────────────────
    legendRefs.current.forEach((el, i) => {
      tl.to(
        el,
        { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" },
        0.28 + i * 0.07
      );
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={wrapperRef} id="mepf-explode" style={{ height: "300vh", position: "relative" }}>

      {/* ── Pinned full-viewport panel ──────────────────────────────── */}
      <div
        ref={pinRef}
        style={{
          height: "100vh",
          position: "sticky",
          top: 0,
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          background: "#261CC1",
        }}
      >

        {/* ════════════════════════════════
            LEFT — large headline + description + legend
        ════════════════════════════════ */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "10% 8%",
            borderRight: "1px solid rgba(95,212,214,0.10)",
            position: "relative",
            zIndex: 10,
          }}
        >



          {/* Large bold display headline — Enerblock style */}
          <h2
            style={{
              margin: "0 0 24px",
              color: "#f4f7fa",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              fontSize: "clamp(1.9rem, 3.6vw, 3.2rem)",
              fontWeight: 700,

            }}
            className="font-mosvita"
          >
            Don't Let MEP Complexity
            <br />
            Compromise Your Design.

          </h2>

          <p
            style={{
              color: "rgba(200,218,240)",
              fontSize: "clamp(0.80rem, 1.05vw, 0.92rem)",
              lineHeight: 1.76,
              margin: "0",
              maxWidth: "380px",

            }}
            className="font-metropolis font-medium">
            We engineer every hidden mechanical, electrical, plumbing, and fire system with precision, ensuring your building performs flawlessly while keeping every line, space, and detail exactly as you first envisioned it.
          </p>



        </div>

        {/* ════════════════════════════════
            RIGHT — 3-D isometric stack + drawing-data footer
        ════════════════════════════════ */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden",
            background: "#f7fbff",
          }}
        >

          {/* Stack area — flex-1 fills above footer */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              perspective: "1400px",
              perspectiveOrigin: "50% 50%",
              position: "relative",
              zIndex: 5,
            }}
          >
            <div
              ref={stackRef}
              style={{
                position: "relative",
                width: "min(40vw, 420px)",
                aspectRatio: "1 / 1",
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              {LAYERS.map((layer, i) => (
                <div
                  key={layer.key}
                  ref={(el) => { if (el) layerRefs.current[i] = el; }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "4px",
                    backgroundImage: `url('${layer.src}')`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    // backgroundColor: layer.color,
                    border: `1px dashed ${layer.border}`,
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                  }}
                >
                  {/* <span
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.1em",
                      padding: "3px 8px",
                      borderRadius: "3px",
                      background: "rgba(8,15,28,0.88)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      color: layer.accent,
                      fontFamily: "'Courier New', monospace",
                      textTransform: "uppercase",
                    }}
                  >
                    {layer.label}
                  </span> */}
                  {/* <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      // background: layer.accent,
                      // boxShadow: `0 0 6px 2px ${layer.accent}55`,
                      flexShrink: 0,
                    }}
                  /> */}
                </div>
              ))}
            </div>
          </div>


          {/* ── CAD-style title block — bottom-right corner ── */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              display: "flex",
              flexDirection: "row",
              background: "#f7fbff",
              borderTop: "1px solid #261CC150",
              borderRight: "1px solid #261CC150",
              zIndex: 20,
              fontFamily: "'Courier New', Courier, monospace",
              userSelect: "none",
            }}
          >
            {/* Logo cell */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px 14px",
                borderRight: "1px solid #261CC150",
                background: "#f7fbff",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/favicon.svg"
                alt="PKM Consultants"
                style={{ width: 52, height: 52, objectFit: "cover" }}
              />
            </div>

            {/* Info rows */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "stretch",
              }}
            >
              {/* Row 1 — Drawing title */}
              <div
                style={{
                  padding: "4px 12px",
                  borderBottom: "1px solid #261CC150",
                  color: "#261CC1",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
                className="font-metropolis"
              >
                Standard Floor Plan and MEP
              </div>

              {/* Row 2 — Drawing No */}
              <div
                style={{
                  padding: "4px 12px",
                  borderBottom: "1px solid #261CC150",
                  color: "#261CC1",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
                className="font-metropolis"
              >
                Drawing No.:&nbsp;
                <span style={{ color: "#aaa", fontWeight: 400 }}>PKM.01.00</span>
              </div>

              {/* Row 3 — Scale */}
              <div
                style={{
                  padding: "4px 12px",
                  color: "#261CC1",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
                className="font-metropolis"
              >
                Scale:&nbsp;
                <span style={{ color: "#aaa", fontWeight: 400 }}>1/100</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
