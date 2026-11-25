import { LineButton } from "@/components/blocks/line-button";
import { SectionLabel } from "@/components/blocks/section-label";

type PageCtaProps = {
  narrative?: string;
  title?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

/**
 * Closing call to action for inner pages, in brand blue on the
 * architectural grid (Enerblock prefooter pattern, PKM colours).
 */
export function PageCta({
  narrative = "Tell us about your commercial, industrial or high-rise project and we will advise on the right MEPF design scope, codes and timeline for it.",
  title = "Start your project with reliable MEPF design",
  buttonLabel = "Contact us",
  buttonHref = "/contact",
}: PageCtaProps) {
  return (
    <section className="relative overflow-hidden border-white/20 border-b bg-[#261CC1] text-white">
      {/* Blueprint grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[length:10px_10px] opacity-[0.08]"
      />
      <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="border-white/20 px-6 pt-12 pb-6 sm:px-10 lg:border-r lg:px-10 lg:py-14">
          <SectionLabel tone="brand">Get in touch</SectionLabel>
        </div>
        <p className="m-0 max-w-[48ch] px-6 pb-12 text-[1rem] text-white/85 leading-[1.65] sm:px-10 lg:px-10 lg:py-14">
          {narrative}
        </p>
      </div>
      <div className="relative grid grid-cols-1 border-white/20 border-t lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-10 border-white/20 px-6 py-12 sm:px-10 lg:border-r lg:px-10 lg:py-16">
          <p className="m-0 max-w-[18ch] font-extrabold font-metropolis text-[clamp(2rem,4.6vw,4rem)] leading-[1.03] tracking-[-0.035em]">
            {title}
          </p>
          <div>
            <LineButton href={buttonHref} label={buttonLabel} tone="brand" />
          </div>
        </div>
        <div aria-hidden="true" className="hidden lg:block" />
      </div>
    </section>
  );
}
