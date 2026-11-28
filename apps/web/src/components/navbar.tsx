"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { MenuButton, SideMenu } from "@/components/side-menu";

gsap.registerPlugin(ScrollTrigger);

/* ── Nav link definitions ── */
const NAV_LINKS = [
  { name: "About,", href: "/about" },
  { name: "Services,", href: "/services" },
  { name: "Projects,", href: "/projects" },
  { name: "Blog,", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

/* ── GSAP Animated Nav Link with dual-layer character stagger ── */
function AnimatedNavLink({
  link,
  isActive,
}: {
  link: { name: string; href: string };
  isActive: boolean;
}) {
  const container = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!container.current) return;
    const charsTop = container.current.querySelectorAll(".char-top");
    const charsBottom = container.current.querySelectorAll(".char-bottom");

    // Initial state: bottom clone is pushed down by 100%
    gsap.set(charsBottom, { yPercent: 100 });

    const ctx = gsap.context(() => {
      // Single timeline for hover state
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.inOut", duration: 0.35 },
      });
      tl.to(charsTop, { yPercent: -100, stagger: 0.02 }, 0);
      tl.to(charsBottom, { yPercent: 0, stagger: 0.02 }, 0);

      const el = container.current;
      if (!el) return;
      const onEnter = () => tl.play();
      const onLeave = () => tl.reverse();

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);

      return () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <Link
      ref={container}
      href={link.href}
      aria-label={link.name}
      className="relative flex no-underline overflow-hidden font-metropolis transition-[color] duration-300"
      style={{
        color: isActive ? "var(--nav-active)" : "var(--nav-fg)",
        fontSize: "clamp(1.2rem, 2.2vw, 2.75rem)",
        fontWeight: 800,
        lineHeight: 1,
        letterSpacing: "-0.02em",
      }}
    >
      <span className="flex" style={{ color: "inherit" }}>
        {link.name.split("").map((char, i) => (
          <span
            key={i}
            className="char-top inline-block"
            style={{ whiteSpace: char === " " ? "pre" : undefined }}
          >
            {char}
          </span>
        ))}
      </span>
      <span
        className="flex absolute inset-0"
        aria-hidden="true"
        style={{ color: "var(--nav-fg-alt)" }}
      >
        {link.name.split("").map((char, i) => (
          <span
            key={i}
            className="char-bottom inline-block"
            style={{ whiteSpace: char === " " ? "pre" : undefined }}
          >
            {char}
          </span>
        ))}
      </span>
    </Link>
  );
}

/* ════════════════════════════════════════════════════
   GSAP SIZES / THRESHOLDS
════════════════════════════════════════════════════ */
const LOGO_BIG = 400;
const LOGO_SMALL = 100;
const SHRINK_END = 0.5; // 50vh

/* ── Inline SVG logo ── */
function PkmLogo({
  svgRef,
}: {
  svgRef: React.RefObject<SVGSVGElement | null>;
}) {
  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1001.49 834.55"
      aria-label="PKM Consultants"
      style={{
        width: LOGO_BIG,
        maxWidth: "60vw",
        height: "auto",
        display: "block",
        overflow: "visible",
        flexShrink: 0,
        color: "var(--nav-logo)",
        // Width is scrubbed by scroll (no transition); colour eases on tone change
        transition: "color 0.3s ease",
      }}
    >
      <path
        fill="currentColor"
        d="M547.19,268.1c1-47.91-72.11-48.76-72.25-.85,0,46.85,71.19,47.6,72.25.85"
        transform="translate(-11.26 -94.72)"
      />
      <path
        fill="currentColor"
        d="M533.38,171.19c1-29.69-44.44-30.53-44.55-.82,0,28.68,43.54,29.4,44.55.82"
        transform="translate(-11.26 -94.72)"
      />
      <path
        fill="currentColor"
        d="M521,105.17c1.15-13.4-20-14.19-19.79-.73-.27,12.54,19.18,13.19,19.79.73"
        transform="translate(-11.26 -94.72)"
      />
      <path
        fill="currentColor"
        d="M205.51,378.19c-277.3,194.63-27.95,470.12,305.56,461.38C843.65,848.2,1093.41,574.22,818,379.07l0-.15C956.84,440.63,1074,587,977.28,735.14c-177.84,258.91-752.85,258.79-930.54,0C-50.1,586.94,67.32,440.59,206.09,378.92"
        transform="translate(-11.26 -94.72)"
      />
      <path
        fill="currentColor"
        d="M652.66,472.73c145.43,91.26,25.63,233-141.59,228.13-168.18,5-287.45-138.29-140.22-228.93l.13.12C126.49,562.43,264.77,776.37,511.12,767.68c245,8.62,384.57-203.66,141.85-295"
        transform="translate(-11.26 -94.72)"
      />
      <path
        fill="currentColor"
        d="M585.78,475c49.73,55,1,138.58-74.71,136.28C433.75,613.8,385.5,526.7,438.7,472.51l.34.4c-32.19,11.48-64.46,32.75-76.71,66-13.51,36.51,6.94,72.64,37,93.53,61.38,43.08,159.46,43.95,221.79,2.34,30.55-20.23,52.28-55.71,39.87-92.75-11.24-33.49-42.82-55.45-74.6-67.6"
        transform="translate(-11.26 -94.72)"
      />
      <path
        fill="currentColor"
        d="M251.76,757c-170.3-150.57-4-338.37,225.27-348.92l.17.12,34.81-59,35,59,.22,0c228.5,11.43,393.09,199.21,222.89,349l.31,0c277.15-164.43,52.86-422.8-259-413.58-311.27-9.17-536,248.31-259.9,413.1"
        transform="translate(-11.26 -94.72)"
      />
    </svg>
  );
}

/* ════════════════════════════════════════════════════
   NAVBAR
════════════════════════════════════════════════════ */
type NavTone = "light" | "dark" | "brand";

/** Colour sets for the bar: dark text on light sections, light on dark. */
const NAV_TONE_VARS: Record<NavTone, Record<string, string>> = {
  light: {
    "--nav-fg": "#0a0a0a",
    "--nav-fg-alt": "#444444",
    "--nav-active": "#261CC1",
    "--nav-logo": "#261CC1",
  },
  // Black / obsidian backgrounds: active page in a bright brand blue
  dark: {
    "--nav-fg": "#f7fbff",
    "--nav-fg-alt": "#dedcff",
    "--nav-active": "#7b73ff",
    "--nav-logo": "#f7fbff",
  },
  // Brand-blue backgrounds: blue would vanish, so the active page is lavender
  brand: {
    "--nav-fg": "#f7fbff",
    "--nav-fg-alt": "#dedcff",
    "--nav-active": "#dedcff",
    "--nav-logo": "#f7fbff",
  },
};

/** Strongly blue surface (e.g. #261CC1) rather than black / grey. */
const isBlueSurface = (r: number, g: number, b: number) =>
  b - Math.max(r, g) > 80;

/** Inner pages: hide the bar once the user has scrolled this far (px). */
const HIDE_AFTER = 80;

const luminance = (r: number, g: number, b: number) =>
  (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

function parseRgba(value: string): [number, number, number, number] | null {
  const match = value.match(/rgba?\(([^)]+)\)/);
  if (!match?.[1]) return null;
  const [r = 0, g = 0, b = 0, a = 1] = match[1]
    .split(/[\s,/]+/)
    .filter(Boolean)
    .map(Number);
  return [r, g, b, a];
}

export function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus({ preventScroll: true });
  }, []);
  const [tone, setTone] = useState<NavTone>("light");
  // The logo sits on the left and is probed on its own: split sections can be
  // blue on the left and light on the right (or the reverse)
  const [logoTone, setLogoTone] = useState<NavTone>("light");

  // Close menu on route change
  // biome-ignore lint/correctness/useExhaustiveDependencies: route change trigger
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  /* ── 1. Logo size + hide on scroll down / show on scroll up (all pages) ── */
  useEffect(() => {
    const nav = navRef.current;
    const svg = svgRef.current;
    if (!nav) return;

    const getBigSize = (width: number) => {
      if (width < 768) return 200; // Mobile starts at 200px
      if (width < 1024) return 300; // Tablet starts at 300px
      if (width < 1440) {
        // Desktop scales from 300px to 400px
        return Math.round(300 + (400 - 300) * ((width - 1024) / (1440 - 1024)));
      }
      return LOGO_BIG;
    };
    const getSmallSize = (width: number) => (width < 1024 ? 80 : LOGO_SMALL);
    const lerp = (a: number, b: number, t: number) =>
      a + (b - a) * Math.min(Math.max(t, 0), 1);

    gsap.set(nav, { y: 0 });
    let lastScrollY = window.scrollY;
    let ticking = false;
    let hidden = false;

    function update() {
      if (!nav) return;
      const scrollY = window.scrollY;
      const width = window.innerWidth;

      // Home: logo shrinks from big to small over the first part of the hero
      let canHide = scrollY > HIDE_AFTER;
      if (isHome) {
        const shrinkEnd = width < 1024 ? 0.3 : SHRINK_END;
        const progress = Math.min(
          Math.max(scrollY / (window.innerHeight * shrinkEnd), 0),
          1
        );
        if (svg) {
          svg.style.width = `${lerp(getBigSize(width), getSmallSize(width), progress)}px`;
        }
        canHide = progress >= 1;
      } else if (svg) {
        svg.style.width = `${getSmallSize(width)}px`;
      }

      if (canHide) {
        const down = scrollY > lastScrollY + 6;
        const up = scrollY < lastScrollY - 2;
        if (down && !hidden) {
          gsap.to(nav, {
            y: -150,
            duration: 0.35,
            ease: "power2.in",
            overwrite: true,
          });
          hidden = true;
        } else if (up && hidden) {
          gsap.to(nav, {
            y: 0,
            duration: 0.45,
            ease: "power3.out",
            overwrite: true,
          });
          hidden = false;
        }
      } else if (hidden) {
        gsap.to(nav, {
          y: 0,
          duration: 0.3,
          ease: "power2.out",
          overwrite: true,
        });
        hidden = false;
      }

      lastScrollY = scrollY;
      ticking = false;
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      gsap.killTweensOf(nav);
    };
  }, [isHome]);

  /* ── 2. Tone: light text over dark sections (incl. the transition layer) ── */
  // biome-ignore lint/correctness/useExhaustiveDependencies: re-probe on route change
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const imageTone = new Map<string, NavTone>();
    const canvas = document.createElement("canvas");
    canvas.width = 8;
    canvas.height = 8;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    /** Average brightness of a photo (cached per src). */
    const toneOfImage = (img: HTMLImageElement): NavTone => {
      const key = img.currentSrc || img.src;
      const cached = imageTone.get(key);
      if (cached) return cached;
      if (!(img.complete && img.naturalWidth && ctx)) return "dark";
      let result: NavTone = "dark";
      try {
        ctx.drawImage(img, 0, 0, 8, 8);
        const { data } = ctx.getImageData(0, 0, 8, 8);
        let total = 0;
        for (let i = 0; i < data.length; i += 4) {
          total += luminance(data[i] ?? 0, data[i + 1] ?? 0, data[i + 2] ?? 0);
        }
        result = total / (data.length / 4) < 0.55 ? "dark" : "light";
      } catch {
        // Cross-origin image without CORS headers: assume a photo, i.e. dark
      }
      imageTone.set(key, result);
      return result;
    };

    /** Walk up from the element under the bar to the first opaque surface. */
    const toneAt = (x: number, y: number): NavTone => {
      const top = document
        .elementsFromPoint(x, y)
        .find((el) => !nav.contains(el));
      let node: Element | null = top ?? null;
      while (node && node !== document.documentElement) {
        const explicit = (node as HTMLElement).dataset?.navTone;
        if (
          explicit === "dark" ||
          explicit === "light" ||
          explicit === "brand"
        ) {
          return explicit;
        }
        if (node instanceof HTMLImageElement) return toneOfImage(node);
        const rgba = parseRgba(getComputedStyle(node).backgroundColor);
        if (rgba && rgba[3] >= 0.5) {
          const [r, g, b] = rgba;
          if (luminance(r, g, b) >= 0.5) return "light";
          return isBlueSurface(r, g, b) ? "brand" : "dark";
        }
        node = node.parentElement;
      }
      return "light";
    };

    let frame = 0;
    const probe = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // Sample where the links / hamburger sit (right side, mid-bar)
        const next = toneAt(window.innerWidth * 0.75, 30);
        setTone((current) => (current === next ? current : next));

        // Logo: sample under the centre of the mark (it grows on Home)
        const logo = svgRef.current?.getBoundingClientRect();
        const nextLogo =
          logo && logo.width > 0
            ? toneAt(
                Math.min(
                  Math.max(logo.left + logo.width / 2, 1),
                  window.innerWidth - 1
                ),
                Math.min(
                  Math.max(logo.top + logo.height / 2, 1),
                  window.innerHeight - 1
                )
              )
            : next;
        setLogoTone((current) => (current === nextLogo ? current : nextLogo));
      });
    };

    probe();
    // Interval catches changes without scrolling: transitions, menus, images
    const interval = window.setInterval(probe, 200);
    window.addEventListener("scroll", probe, { passive: true });
    window.addEventListener("resize", probe);
    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(interval);
      window.removeEventListener("scroll", probe);
      window.removeEventListener("resize", probe);
    };
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ── HEADER ── */}
      <nav
        className="fixed inset-x-0 top-0 z-50 overflow-visible will-change-transform"
        data-tone={tone}
        id="pkm-navbar"
        ref={navRef}
        style={NAV_TONE_VARS[tone] as React.CSSProperties}
      >
        {/*
          Desktop & Mobile: Flexbox layout
        */}
        <div className="flex justify-between items-center h-14 lg:h-28 px-5 lg:px-10">
          {/* LEFT — Logo */}
          <Link
            href="/"
            className="self-start mt-1 lg:mt-[17px] shrink-0"
            style={
              {
                overflow: "visible",
                "--nav-logo": NAV_TONE_VARS[logoTone]["--nav-logo"],
              } as React.CSSProperties
            }
          >
            <PkmLogo svgRef={svgRef} />
            <span className="sr-only">PKM Consultants</span>
          </Link>

          {/* CENTER — Nav links */}
          <nav
            aria-label="Main navigation"
            className="hidden flex-1 items-center justify-end mb-3 lg:pointer-fine:flex"
          >
            {NAV_LINKS.map((link) => (
              <AnimatedNavLink
                key={link.href}
                link={link}
                isActive={isActive(link.href.replace(",", ""))}
              />
            ))}
          </nav>
          {/* RIGHT — Menu button (touch / below lg), Enerblock style */}
          <div className="flex w-[min(50vw,200px)] shrink-0 items-center justify-end lg:pointer-fine:hidden">
            <MenuButton
              buttonRef={menuButtonRef}
              className="w-full"
              controls={menuId}
              onOpen={() => setMenuOpen(true)}
              open={menuOpen}
              tone={tone === "light" ? "light" : "dark"}
            />
          </div>
        </div>
      </nav>

      {/* ── SIDE MENU ── */}
      <SideMenu id={menuId} onClose={closeMenu} open={menuOpen} />
    </>
  );
}
