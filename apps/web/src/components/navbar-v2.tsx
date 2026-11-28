"use client";

import { useLenis } from "lenis/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { PkmMark } from "@/components/pkm-mark";
import { SCOPE_OF_SERVICES } from "@/data/pkm-portfolio";

/* ─────────────────────────────────────────────
   CONTENT
───────────────────────────────────────────── */
type NavLink = { label: string; href: string; children?: NavLink[] };

const PRIMARY: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "How we work", href: "/how-we-work" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "All services", href: "/services" },
      ...SCOPE_OF_SERVICES.map((s) => ({
        label: s.discipline,
        href: `/services/${s.slug}`,
      })),
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const SECONDARY: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const EMAIL = "info@pkmconsultants.in";

/* Enerblock motion: --menu-handle and --link-handle */
const EASE = "ease-[cubic-bezier(0.53,0,0,1)]";
const LINK_EASE = "ease-[cubic-bezier(0.4,0,0.25,1)]";

type Tone = "light" | "dark";

const PRIMARY_TEXT = `font-metropolis font-semibold text-[clamp(1.8rem,2.6vw,2.25rem)] leading-none tracking-[-0.01em] transition-colors duration-[250ms] hover:text-[#261CC1]`;

/* ─────────────────────────────────────────────
   TONE PROBE — dark text on light sections, white on dark / brand ones
───────────────────────────────────────────── */
const luminance = (r: number, g: number, b: number) =>
  (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

function toneOfColor(value: string): Tone | null {
  const match = value.match(/rgba?\(([^)]+)\)/);
  if (!match?.[1]) return null;
  const [r = 0, g = 0, b = 0, a = 1] = match[1]
    .split(/[\s,/]+/)
    .filter(Boolean)
    .map(Number);
  if (a < 0.5) return null;
  return luminance(r, g, b) >= 0.5 ? "light" : "dark";
}

function toneAt(header: HTMLElement, x: number, y: number): Tone {
  const hit = document
    .elementsFromPoint(x, y)
    .find((el) => !header.contains(el));
  let node: Element | null = hit ?? null;
  while (node && node !== document.documentElement) {
    const explicit = (node as HTMLElement).dataset?.navTone;
    if (explicit) return explicit === "light" ? "light" : "dark";
    if (node instanceof HTMLImageElement) return "dark";
    const tone = toneOfColor(getComputedStyle(node).backgroundColor);
    if (tone) return tone;
    node = node.parentElement;
  }
  return "light";
}

/* ─────────────────────────────────────────────
   SMALL PIECES
───────────────────────────────────────────── */

/** Label that rolls down on hover: a copy waits above and slides in. */
function RollText({ children }: { children: ReactNode }) {
  const roll = `block pb-0.5 transition-transform duration-[600ms] ${EASE} group-hover:translate-y-full`;
  return (
    <span className="relative block overflow-hidden">
      <span className={roll}>{children}</span>
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 -top-full ${roll}`}
      >
        {children}
      </span>
    </span>
  );
}

/** Text that drops into place from above when the menu opens. */
function MaskLine({
  open,
  children,
  delay = 0,
}: {
  open: boolean;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <span className="block overflow-hidden">
      <span
        className={`block pb-[3px] transition-transform ${EASE} ${
          open
            ? "translate-y-0 duration-1000"
            : "-translate-y-full duration-[600ms]"
        }`}
        style={{ transitionDelay: open ? `${delay}s` : "0s" }}
      >
        {children}
      </span>
    </span>
  );
}

/** Divider that draws from the left when the menu opens. */
function DrawLine({
  open,
  vertical = false,
}: {
  open: boolean;
  vertical?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute top-0 left-0 bg-[#121212] transition-transform ${
        vertical ? "h-full w-px origin-top" : "h-px w-full origin-left"
      } ${open ? `duration-1000 ${EASE}` : "duration-[600ms]"} ${
        open ? "scale-100" : vertical ? "scale-y-0" : "scale-x-0"
      }`}
    />
  );
}

/* ─────────────────────────────────────────────
   NAVBAR V2 (Enerblock header + side menu)
───────────────────────────────────────────── */
export function NavbarV2() {
  const pathname = usePathname();
  const lenis = useLenis();
  const headerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const servicesId = useId();

  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [tone, setTone] = useState<Tone>("light");
  const [scrolled, setScrolled] = useState(false);
  const [footerIn, setFooterIn] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  }, []);

  // Close on route change
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger
  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Lock scroll (Lenis + native) while open; Escape closes; focus the close button
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const focusTimer = window.setTimeout(
      () => closeRef.current?.focus({ preventScroll: true }),
      50
    );
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      root.style.overflow = previous;
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis, close]);

  // Tone under the header + "scrolled" state
  // biome-ignore lint/correctness/useExhaustiveDependencies: re-probe on route change
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let frame = 0;
    const probe = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 10);
        const next = toneAt(header, window.innerWidth * 0.75, 28);
        setTone((current) => (current === next ? current : next));
      });
    };
    probe();
    const interval = window.setInterval(probe, 250);
    window.addEventListener("scroll", probe, { passive: true });
    window.addEventListener("resize", probe);
    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(interval);
      window.removeEventListener("scroll", probe);
      window.removeEventListener("resize", probe);
    };
  }, [pathname]);

  // Slide the header away while the footer is on screen
  // biome-ignore lint/correctness/useExhaustiveDependencies: footer node can change per route
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) =>
      setFooterIn(Boolean(entry?.isIntersecting))
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, [pathname]);

  const isDark = tone === "dark";
  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href;

  // Colours per tone (light sections → dark UI, dark sections → white UI)
  const fg = isDark ? "text-[#f7fbff]" : "text-[#121212]";
  const line = isDark ? "border-[#f7fbff]" : "border-[#121212]";
  const lineBg = isDark ? "bg-[#f7fbff]" : "bg-[#121212]";
  const glass = scrolled
    ? isDark
      ? "bg-[#0d0c11]/80"
      : "bg-[#f7fbff]/80"
    : "bg-transparent";
  const contact = isDark
    ? "border-[#f7fbff] bg-[#f7fbff] text-[#121212]"
    : "border-[#121212] bg-[#121212] text-[#f7fbff]";

  return (
    <>
      {/* ── HEADER ── */}
      <header
        className={`pointer-events-none fixed inset-x-0 top-0 z-50 transition-transform duration-[600ms] ${EASE} ${
          footerIn && !open ? "-translate-y-full" : "translate-y-0"
        }`}
        ref={headerRef}
      >
        <div className="flex items-center justify-between px-5 py-3 md:grid md:grid-cols-12 md:gap-x-5">
          {/* Logo */}
          <Link
            aria-label="PKM Consultants, home"
            className={`pointer-events-auto -m-3 flex w-fit items-center gap-2 p-3 transition-colors duration-[250ms] hover:text-[#261CC1] md:col-span-3 ${fg}`}
            href="/"
          >
            <PkmMark className="h-7 w-auto md:h-6" />
            <span className="hidden font-extrabold font-metropolis text-[1rem] tracking-[-0.02em] sm:inline">
              PKM Consultants
            </span>
          </Link>

          {/* Buttons */}
          <nav
            aria-label="Main"
            className="pointer-events-auto flex w-1/2 gap-3 md:col-span-6 md:col-start-7 md:w-auto lg:col-span-4 lg:col-start-9"
          >
            {/* Menu */}
            <button
              aria-controls={menuId}
              aria-expanded={open}
              className={`group relative flex h-9 w-full min-w-0 items-stretch border font-bold font-mosvita text-[0.83rem] backdrop-blur-md transition-colors duration-[250ms] hover:text-[#f7fbff] ${fg} ${line} ${glass}`}
              onClick={() => setOpen(true)}
              ref={triggerRef}
              type="button"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-[#261CC1] opacity-0 transition-opacity duration-[250ms] group-hover:opacity-100"
              />
              <span className="relative flex flex-1 items-center px-3 text-left">
                <RollText>Menu</RollText>
              </span>
              <span
                aria-hidden="true"
                className={`relative flex w-14 shrink-0 flex-col items-center justify-center gap-1 border-l transition-colors duration-300 ${line}`}
              >
                <span className="absolute inset-0 bg-[#121212] opacity-0 transition-opacity duration-[250ms] group-hover:opacity-100" />
                {[0, 1].map((i) => (
                  <span
                    className="relative h-[1.5px] w-7 overflow-hidden"
                    key={i}
                  >
                    {/* out to the right on hover … */}
                    <span
                      className={`absolute inset-0 origin-left transition-transform delay-200 duration-[600ms] group-hover:translate-x-full group-hover:origin-right group-hover:delay-0 ${EASE} ${lineBg}`}
                    />
                    {/* … while a white copy comes in from the left */}
                    <span
                      className={`-translate-x-full absolute inset-0 bg-[#f7fbff] transition-transform duration-[600ms] group-hover:translate-x-0 group-hover:delay-200 ${EASE}`}
                    />
                  </span>
                ))}
              </span>
              <span className="sr-only">Open menu</span>
            </button>

            {/* Contact */}
            <Link
              className={`group relative hidden h-9 w-full min-w-0 items-stretch border font-bold font-mosvita text-[0.83rem] min-[681px]:flex ${contact}`}
              href="/contact"
            >
              <span className="relative flex flex-1 items-center px-3">
                <RollText>Contact</RollText>
              </span>
              <span
                aria-hidden="true"
                className="relative w-9 shrink-0 overflow-hidden"
              >
                <span
                  className={`absolute inset-0 flex items-center justify-center transition-transform duration-[600ms] group-hover:translate-x-full ${EASE}`}
                >
                  <Arrow />
                </span>
                <span
                  className={`-left-full absolute inset-y-0 flex w-full items-center justify-center bg-[#261CC1] text-[#f7fbff] transition-transform duration-[600ms] group-hover:translate-x-full ${EASE}`}
                >
                  <Arrow />
                </span>
              </span>
            </Link>
          </nav>
        </div>
      </header>

      {/* ── SIDE MENU ── */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-[100] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        inert={!open}
      >
        {/* Backdrop */}
        <button
          aria-label="Close menu"
          className={`absolute inset-0 cursor-default bg-[#0d0c11]/50 backdrop-blur-md transition-opacity duration-[600ms] ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={close}
          tabIndex={-1}
          type="button"
        />

        {/* Panel: 4 of 12 columns on desktop, full width on phones */}
        <div
          aria-label="Site menu"
          aria-modal="true"
          className={`absolute inset-y-3 right-3 left-3 flex flex-col bg-[#f7fbff] text-[#121212] transition-[clip-path] duration-[600ms] min-[681px]:left-auto min-[681px]:w-[max(360px,calc((100vw-260px)/3+60px))] ${EASE}`}
          id={menuId}
          role="dialog"
          style={{ clipPath: open ? "inset(0)" : "inset(0 0 0 100%)" }}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between p-2">
            <Link
              className="flex items-center gap-2 p-3 text-[#261CC1] transition-colors duration-[250ms] hover:text-[#121212]"
              href="/"
              onClick={close}
            >
              <PkmMark className="h-6 w-auto" />
              <span className="font-extrabold font-metropolis text-[1rem] tracking-[-0.02em]">
                PKM Consultants
              </span>
            </Link>
            <button
              aria-label="Close menu"
              className="flex size-12 items-center justify-center transition-colors duration-[250ms] hover:bg-[#261CC1] hover:text-[#f7fbff]"
              onClick={close}
              ref={closeRef}
              type="button"
            >
              <svg
                aria-hidden="true"
                className="size-[1.375rem]"
                fill="none"
                viewBox="0 0 22 22"
              >
                <path
                  d="M2 2l18 18M20 2L2 20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          </div>

          {/* Links */}
          <div className="flex min-h-0 flex-1 flex-col justify-between overflow-y-auto pt-16 [scrollbar-width:none] min-[681px]:pt-[clamp(2.5rem,12.5vh,7.5rem)]">
            <ul className="m-0 list-none p-0">
              {PRIMARY.map((item, i) => (
                <li className="relative" key={item.href}>
                  {i > 0 ? <DrawLine open={open} /> : null}
                  {item.children ? (
                    <ServicesItem
                      delay={i * 0.04}
                      id={servicesId}
                      isCurrent={isCurrent}
                      item={item}
                      menuOpen={open}
                      onNavigate={close}
                      onToggle={() => setServicesOpen((v) => !v)}
                      open={servicesOpen}
                    />
                  ) : (
                    <Link
                      aria-current={isCurrent(item.href) ? "page" : undefined}
                      className={`block px-5 py-4 ${PRIMARY_TEXT} ${
                        isCurrent(item.href)
                          ? "pointer-events-none opacity-30"
                          : ""
                      }`}
                      href={item.href}
                      onClick={close}
                    >
                      <MaskLine delay={i * 0.04} open={open}>
                        {item.label}
                      </MaskLine>
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Secondary */}
            <div className="relative mt-10 flex">
              <DrawLine open={open} />
              <ul className="m-0 w-1/2 list-none p-5">
                {SECONDARY.map((item) => (
                  <li key={item.href}>
                    <Link
                      className={`inline-flex py-0.5 font-medium text-[0.83rem] transition-colors duration-[250ms] hover:text-[#261CC1] ${
                        isCurrent(item.href)
                          ? "pointer-events-none font-semibold"
                          : ""
                      }`}
                      href={item.href}
                      onClick={close}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="relative flex w-1/2 flex-col justify-between gap-6 p-5">
                <DrawLine open={open} vertical />
                <a
                  className="w-fit font-medium text-[0.83rem] transition-colors duration-[250ms] [overflow-wrap:anywhere] hover:text-[#261CC1]"
                  href={`mailto:${EMAIL}`}
                >
                  {EMAIL}
                </a>
                <span className="font-medium text-[#5b5a8a] text-[0.83rem]">
                  Chennai, India
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/** "Services" row: toggles an accordion of the five discipline pages. */
function ServicesItem({
  item,
  id,
  open,
  menuOpen,
  delay,
  onToggle,
  onNavigate,
  isCurrent,
}: {
  item: NavLink;
  id: string;
  open: boolean;
  menuOpen: boolean;
  delay: number;
  onToggle: () => void;
  onNavigate: () => void;
  isCurrent: (href: string) => boolean;
}) {
  const children = item.children ?? [];
  return (
    <>
      <button
        aria-controls={id}
        aria-expanded={open}
        className={`flex w-full items-center justify-between px-5 py-4 text-left ${PRIMARY_TEXT} ${
          open ? "text-[#261CC1]" : ""
        }`}
        onClick={onToggle}
        type="button"
      >
        <MaskLine delay={delay} open={menuOpen}>
          {item.label}
        </MaskLine>
        <span
          aria-hidden="true"
          className={`relative flex size-5 items-center justify-center transition-transform duration-[600ms] ${LINK_EASE} ${
            open ? "rotate-180" : ""
          }`}
        >
          <span className="absolute h-[1.5px] w-full bg-current" />
          <span
            className={`absolute h-full w-[1.5px] bg-current transition-transform duration-[600ms] ${LINK_EASE} ${
              open ? "scale-y-0" : ""
            }`}
          />
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-[600ms] ${LINK_EASE} ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
        id={id}
        inert={!open}
      >
        <ul className="m-0 min-h-0 list-none overflow-hidden p-0">
          {children.map((child, k) => (
            <li
              className={k === children.length - 1 ? "mb-5" : "mb-1"}
              key={child.href}
            >
              <Link
                className={`block px-5 font-metropolis font-semibold text-[1.1rem] leading-[1.35] transition-colors duration-[250ms] hover:text-[#261CC1] ${
                  isCurrent(child.href) ? "pointer-events-none opacity-30" : ""
                }`}
                href={child.href}
                onClick={onNavigate}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      className="size-3"
      fill="currentColor"
      viewBox="0 0 12 12"
    >
      <path d="M7.4.7l4 5.3-4 5.3H5.5l1.9-2.5c.8-1 1.3-1.8 1.7-2.2H.5V5.3H9C8.6 4.7 8 4 7.4 3.1L5.5.7h1.9z" />
    </svg>
  );
}
