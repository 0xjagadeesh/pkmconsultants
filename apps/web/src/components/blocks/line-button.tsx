import Link from "next/link";

import type { SectionTone } from "@/components/blocks/section-label";

type LineButtonProps = {
  href: string;
  label: string;
  tone?: SectionTone;
  /** Opens in a new tab (external links) */
  external?: boolean;
  className?: string;
};

const TONES: Record<SectionTone, string> = {
  light:
    "border-[#121212] text-[#121212] hover:border-[#261CC1] hover:bg-[#261CC1] hover:text-[#f7fbff]",
  dark: "border-white/70 text-white hover:border-white hover:bg-white hover:text-[#0d0c11]",
  brand:
    "border-white/80 text-white hover:border-white hover:bg-[#f7fbff] hover:text-[#261CC1]",
};

/**
 * Outline button with a label cell and an arrow cell split by a hairline
 * (Enerblock button). Fills with the brand colour on hover.
 */
export function LineButton({
  href,
  label,
  tone = "light",
  external = false,
  className = "",
}: LineButtonProps) {
  return (
    <Link
      className={`group inline-flex min-h-12 items-stretch border font-bold font-mosvita text-[0.78rem] uppercase tracking-[0.12em] transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${TONES[tone]} ${className}`}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="flex items-center px-5">{label}</span>
      <span
        aria-hidden="true"
        className="flex w-12 items-center justify-center border-current/30 border-l"
      >
        <span className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}
