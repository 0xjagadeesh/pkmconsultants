"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/** Fade-in time of the navigation layer before the route changes (ms). */
const LAYER_FADE = 250;
/** Safety net: never leave the layer up if a navigation stalls (ms). */
const LAYER_TIMEOUT = 6000;
/** First-load intro length incl. delay; then it is removed from the DOM (ms). */
const INTRO_TOTAL = 1500;

const CLAP_EASE = "cubic-bezier(0.53, 0, 0, 1)";

/** Should this click be handled by the transition instead of the browser? */
function internalTarget(event: MouseEvent): URL | null {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return null;
  }
  const anchor = (event.target as Element | null)?.closest?.("a[href]");
  if (!(anchor instanceof HTMLAnchorElement)) return null;
  if (
    anchor.target === "_blank" ||
    anchor.hasAttribute("download") ||
    anchor.dataset.noTransition !== undefined
  ) {
    return null;
  }
  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return null;
  // Same page (incl. #anchors): let the browser / Lenis handle it
  if (
    url.pathname === window.location.pathname &&
    url.search === window.location.search
  ) {
    return null;
  }
  return url;
}

/**
 * Site-wide page transitions:
 * 1. First load: two brand-blue panels with an interlocking stepped edge
 *    part vertically over an obsidian backdrop (CSS-only, see globals.css).
 * 2. Internal navigation: an obsidian layer with a pulsing dot fades in,
 *    the route changes, then the layer fades out on the new page.
 * The navbar stays above the layer; reduced motion collapses both to instant.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [introDone, setIntroDone] = useState(false);
  const [covering, setCovering] = useState(false);
  const pending = useRef<{ nav: number; safety: number } | null>(null);

  // Remove the intro panels once their animation has finished.
  useEffect(() => {
    const timer = window.setTimeout(() => setIntroDone(true), INTRO_TOTAL);
    return () => window.clearTimeout(timer);
  }, []);

  // Intercept internal link clicks: fade in, then navigate.
  useEffect(() => {
    const clearPending = () => {
      if (!pending.current) return;
      window.clearTimeout(pending.current.nav);
      window.clearTimeout(pending.current.safety);
      pending.current = null;
    };

    const onClick = (event: MouseEvent) => {
      const url = internalTarget(event);
      if (!url) return;
      event.preventDefault(); // next/link skips its own navigation
      const href = url.pathname + url.search + url.hash;
      router.prefetch(href);
      clearPending();
      setCovering(true);
      pending.current = {
        nav: window.setTimeout(() => router.push(href), LAYER_FADE),
        safety: window.setTimeout(() => setCovering(false), LAYER_TIMEOUT),
      };
    };

    // Capture phase: runs before next/link's own click handler.
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearPending();
    };
  }, [router]);

  // New route rendered: fade the layer back out.
  // biome-ignore lint/correctness/useExhaustiveDependencies: runs on route change only
  useEffect(() => {
    if (pending.current) {
      window.clearTimeout(pending.current.safety);
      pending.current = null;
    }
    const frame = requestAnimationFrame(() => setCovering(false));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <>
      {/* ── Navigation layer (below the navbar, z-50) ── */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-40 flex items-center justify-center bg-[#0d0c11] transition-opacity duration-[250ms] ease-out ${
          covering
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <span
          className="block size-2.5 bg-[#f7fbff]"
          style={{
            animation: covering ? "pkm-dot 0.9s ease-in-out infinite" : "none",
          }}
        />
      </div>

      {/* ── First-load intro: clap panels ── */}
      {introDone ? null : (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[300]"
        >
          <div
            className="absolute inset-0 bg-[#0d0c11]"
            style={{ animation: "pkm-fade-out 1s ease 0.35s forwards" }}
          />
          <div
            className="absolute inset-0 bg-[#261CC1]"
            style={{
              clipPath:
                "polygon(0 0, 100% 0, 100% calc(44% + 2px), calc(70% + 2px) calc(44% + 2px), calc(60% + 2px) calc(56% + 2px), 0 calc(56% + 2px))",
              animation: `pkm-clap-up 1s ${CLAP_EASE} 0.35s forwards`,
            }}
          />
          <div
            className="absolute inset-0 bg-[#261CC1]"
            style={{
              clipPath:
                "polygon(0 56%, 60% 56%, 70% 44%, 100% 44%, 100% 100%, 0 100%)",
              animation: `pkm-clap-down 1s ${CLAP_EASE} 0.35s forwards`,
            }}
          />
        </div>
      )}
    </>
  );
}
