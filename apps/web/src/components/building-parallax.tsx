"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function BuildingParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const img = imgRef.current;
    if (!section || !img) return;

    const tween = gsap.fromTo(
      img,
      { y: 0 },
      {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom top",
          scrub: 1.5,         // 1.5s smoothing — parallax trails scroll naturally
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    /* Outer section — 150vh: enough parallax travel without trapping the user */
    <section
      ref={sectionRef}
      className="relative w-full max-h-[80vh]"
      style={{ height: "80vh" }}
    >
      {/* Sticky visual wrapper — locks to viewport top, text stays put */}
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: "80svh" }}
      >
        {/* Image — 200px bleed covers full GSAP travel, no empty edges */}
        <div
          ref={imgRef}
          aria-hidden="true"
          className="absolute inset-x-0 will-change-transform"
          style={{
            top: "-200px",
            bottom: "-200px",
            backgroundImage: "url('/images/building-1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Gradient overlay — heavier left, fades right */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(25,15,25,0.80) 0%, rgba(25,15,25,0.45) 20%, rgba(25,15,25,0.10) 30%)",
          }}
        />

        {/* Text — stays centered-left, pinned by sticky parent */}
        <div className="relative z-10 h-full flex items-center px-16 max-md:px-6">
          <div>

            <h2
              className=" text-[#f7fbff] leading-[1.15] font-mosvita tracking-[-0.02em] font-medium m-0"
              style={{ fontSize: "clamp(0.8rem, 2vw, 1.35rem)" }}
            >
              Building lifelines : integrated, optimized, and code-compliant.
            </h2>

          </div>
        </div>
      </div>
    </section>
  );
}
