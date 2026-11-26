import { SectionLabel } from "@/components/blocks/section-label";
import { Crosshair } from "@/components/crosshair";

type PageHeroCrosshairProps = {
  /** Small label above the title */
  eyebrow?: string;
  /** One string, or one string per line */
  title: string | string[];
  intro?: string;
};

/**
 * Index-page hero in the /projects header style: large title and intro on a
 * wide left column (~65%), hover-only <Crosshair /> filling a narrow right
 * column (~35%). Below lg the crosshair is hidden and the text spans the width.
 * Top padding clears the fixed navbar.
 */
export function PageHeroCrosshair({
  eyebrow,
  title,
  intro,
}: PageHeroCrosshairProps) {
  const lines = Array.isArray(title) ? title : [title];

  return (
    <section className="border-[#121212]/15 border-b bg-[#f7fbff] text-[#121212]">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.85fr)_minmax(0,1fr)]">
        {/* Left — eyebrow, title, intro */}
        <div className="flex min-h-[300px] flex-col justify-between gap-12 px-6 pt-28 pb-8 sm:px-10 lg:min-h-[480px] lg:px-10 lg:pt-36 lg:pb-10">
          <div>
            {eyebrow ? (
              <SectionLabel className="mb-6">{eyebrow}</SectionLabel>
            ) : null}
            <h1 className="fade-in slide-in-from-bottom-4 m-0 animate-in fill-mode-both font-extrabold font-metropolis text-[clamp(2.4rem,4.4vw,4.6rem)] leading-[0.98] tracking-[-0.045em] duration-700">
              {lines.map((line, i) => (
                <span className="block" key={line}>
                  {line}
                  {i < lines.length - 1 ? " " : ""}
                </span>
              ))}
            </h1>
          </div>
          {intro ? (
            <p className="fade-in slide-in-from-bottom-2 m-0 max-w-[40ch] animate-in fill-mode-both font-metropolis font-medium text-[clamp(1.1rem,1.7vw,1.6rem)] leading-[1.3] tracking-[-0.015em] delay-200 duration-700">
              {intro}
            </p>
          ) : null}
        </div>

        {/* Right — hover crosshair (pointer screens only) */}
        <div className="hidden border-[#121212]/15 border-l lg:block">
          <Crosshair />
        </div>
      </div>
    </section>
  );
}
