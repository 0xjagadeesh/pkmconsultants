"use client";

import { useLenis } from "lenis/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type ReactNode,
  type Ref,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { PkmMark } from "@/components/pkm-mark";
import { SCOPE_OF_SERVICES } from "@/data/pkm-portfolio";

/* Enerblock-style menu button + side panel (enerblock.net header). */

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

const PRIMARY_TEXT =
  "font-metropolis font-semibold text-[clamp(1.8rem,2.6vw,2.25rem)] leading-none tracking-[-0.01em] transition-colors duration-[250ms] hover:text-[#261CC1]";

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

/** Divider that draws from the left (or top) when the menu opens. */
function DrawLine({
  open,
  vertical = false,
}: {
  open: boolean;
  vertical?: boolean;
}) {
  const closed = vertical ? "scale-y-0" : "scale-x-0";
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute top-0 left-0 bg-[#121212] transition-transform ${
        vertical ? "h-full w-px origin-top" : "h-px w-full origin-left"
      } ${open ? `scale-100 duration-1000 ${EASE}` : `${closed} duration-[600ms]`}`}
    />
  );
}

/* ─────────────────────────────────────────────
   MENU BUTTON
───────────────────────────────────────────── */
type MenuButtonProps = {
  open: boolean;
  onOpen: () => void;
  /** Id of the SideMenu panel it controls */
  controls: string;
  /** "dark" = on a dark / brand section → white button */
  tone: "light" | "dark";
  buttonRef?: Ref<HTMLButtonElement>;
  className?: string;
};

/**
 * Bordered "Menu" button with a two-line icon cell. On hover it fills brand
 * blue, the icon cell turns black and the lines swipe out right while white
 * copies swipe in from the left; the label rolls down. Frosted once scrolled.
 */
export function MenuButton({
  open,
  onOpen,
  controls,
  tone,
  buttonRef,
  className = "",
}: MenuButtonProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = tone === "dark";
  const fg = isDark ? "text-[#f7fbff]" : "text-[#121212]";
  const line = isDark ? "border-[#f7fbff]" : "border-[#121212]";
  const lineBg = isDark ? "bg-[#f7fbff]" : "bg-[#121212]";
  let glass = "bg-transparent";
  if (scrolled) glass = isDark ? "bg-[#0d0c11]/80" : "bg-[#f7fbff]/80";

  return (
    <button
      aria-controls={controls}
      aria-expanded={open}
      className={`group relative flex h-9 min-w-0 items-stretch border font-bold font-mosvita text-[0.83rem] backdrop-blur-md transition-colors duration-[250ms] hover:text-[#f7fbff] ${fg} ${line} ${glass} ${className}`}
      onClick={onOpen}
      ref={buttonRef}
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
          <span className="relative h-[1.5px] w-7 overflow-hidden" key={i}>
            {/* out to the right on hover … */}
            <span
              className={`absolute inset-0 origin-left transition-transform delay-200 duration-[600ms] group-hover:origin-right group-hover:translate-x-full group-hover:delay-0 ${EASE} ${lineBg}`}
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
  );
}

/* ─────────────────────────────────────────────
   SIDE MENU
───────────────────────────────────────────── */
type SideMenuProps = {
  id: string;
  open: boolean;
  /** Close and return focus to the trigger */
  onClose: () => void;
};

/**
 * Side panel menu: clip-path reveal from the right edge over a darkened,
 * blurred page; links drop in from above while dividers draw across;
 * Services opens an accordion of the discipline pages. Locks scroll
 * (Lenis + native), closes on Escape / backdrop / route change.
 */
export function SideMenu({ id, open, onClose }: SideMenuProps) {
  const pathname = usePathname();
  const lenis = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);
  const servicesId = useId();
  const [servicesOpen, setServicesOpen] = useState(false);

  // Collapse Services whenever the menu closes
  useEffect(() => {
    if (!open) setServicesOpen(false);
  }, [open]);

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
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      root.style.overflow = previous;
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis, onClose]);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href;

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[200] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      inert={!open}
    >
      {/* Backdrop */}
      <button
        aria-label="Close menu"
        className={`absolute inset-0 cursor-default bg-[#0d0c11]/50 backdrop-blur-md transition-opacity duration-[600ms] ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        tabIndex={-1}
        type="button"
      />

      {/* Panel: 4 of 12 columns on wide screens, full width on phones */}
      <div
        aria-label="Site menu"
        aria-modal="true"
        className={`absolute inset-y-3 right-3 left-3 flex flex-col bg-[#f7fbff] text-[#121212] transition-[clip-path] duration-[600ms] min-[681px]:left-auto min-[681px]:w-[max(360px,calc((100vw-260px)/3+60px))] ${EASE}`}
        id={id}
        role="dialog"
        style={{ clipPath: open ? "inset(0)" : "inset(0 0 0 100%)" }}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between p-2">
          <Link
            className="flex items-center gap-2 p-3 text-[#261CC1] transition-colors duration-[250ms] hover:text-[#121212]"
            href="/"
            onClick={onClose}
          >
            <PkmMark className="h-6 w-auto" />
            <span className="font-extrabold font-metropolis text-[1rem] tracking-[-0.02em]">
              PKM Consultants
            </span>
          </Link>
          <button
            aria-label="Close menu"
            className="flex size-12 items-center justify-center transition-colors duration-[250ms] hover:bg-[#261CC1] hover:text-[#f7fbff]"
            onClick={onClose}
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
                    onNavigate={onClose}
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
                    onClick={onClose}
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
                    onClick={onClose}
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
