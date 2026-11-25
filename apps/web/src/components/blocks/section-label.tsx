export type SectionTone = "light" | "dark" | "brand";

type SectionLabelProps = {
  children: string;
  tone?: SectionTone;
  /** Stretch the label row so the square marker sits at the far right */
  spread?: boolean;
  className?: string;
};

const TEXT: Record<SectionTone, string> = {
  light: "text-[#261CC1]",
  dark: "text-white/70",
  brand: "text-white/80",
};

const MARK: Record<SectionTone, string> = {
  light: "bg-[#121212]",
  dark: "bg-white",
  brand: "bg-white",
};

/** Uppercase engineering eyebrow with the square drafting marker. */
export function SectionLabel({
  children,
  tone = "light",
  spread = false,
  className = "",
}: SectionLabelProps) {
  return (
    <div
      className={`flex items-center gap-3 ${spread ? "justify-between" : ""} ${className}`}
    >
      <span
        className={`font-bold font-mosvita text-[0.75rem] uppercase tracking-[0.22em] lg:text-[0.8rem] ${TEXT[tone]}`}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className={`inline-block size-1.5 shrink-0 ${MARK[tone]}`}
      />
    </div>
  );
}

/** Tone → surface + text colours shared by the page blocks. */
export const TONE_SURFACE: Record<SectionTone, string> = {
  light: "bg-[#f7fbff] text-[#121212]",
  dark: "bg-[#0d0c11] text-white",
  brand: "bg-[#261CC1] text-white",
};

export const TONE_BORDER: Record<SectionTone, string> = {
  light: "border-[#121212]/15",
  dark: "border-white/15",
  brand: "border-white/20",
};

export const TONE_MUTED: Record<SectionTone, string> = {
  light: "text-[#555555]",
  dark: "text-white/65",
  brand: "text-white/80",
};
