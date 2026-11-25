/**
 * Shared media queries for GSAP `gsap.matchMedia()` and CSS-in-JS checks.
 * Keep breakpoints in sync with Tailwind (`lg` = 1024px).
 */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/** Desktop + motion allowed: heavy scroll-pinned / scrubbed effects. */
export const DESKTOP_MOTION =
  "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

/** Below desktop + motion allowed: lighter, non-pinned effects only. */
export const MOBILE_MOTION =
  "(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)";
