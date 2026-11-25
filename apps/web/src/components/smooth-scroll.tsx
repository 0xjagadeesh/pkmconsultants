"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";
import { type ReactNode, useEffect, useState } from "react";
import { REDUCED_MOTION } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

// Mobile browsers fire resize when the address bar shows/hides. Refreshing every
// ScrollTrigger on that causes visible jumps, so ignore those height-only resizes.
ScrollTrigger.config({ ignoreMobileResize: true });

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION);
    setReduceMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) =>
      setReduceMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Changing options re-creates the Lenis instance without remounting children.
  // With reduced motion, wheel scrolling is native (no easing / inertia).
  return (
    <ReactLenis
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: !reduceMotion,
      }}
      root
    >
      {children}
    </ReactLenis>
  );
}
