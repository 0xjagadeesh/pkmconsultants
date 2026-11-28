import { Logger } from "@workspace/logger";
import { sanityFetch } from "@workspace/sanity/live";
import { queryBlogIndexPageBlogs } from "@workspace/sanity/query";
import type { Metadata } from "next";

import { AnimatedCTAButton } from "@/components/animated-cta-button";
import { BuildingParallax2 } from "@/components/building-parallax-2";
import { CursorTracker } from "@/components/cursor-tracker";
import { HomeBlogSection } from "@/components/home-blog-section";
import { MatrixSection } from "@/components/matrix-section";
import { MepfExplode2 } from "@/components/mepf-explode-2";
import { Prefooter } from "@/components/prefooter";
import { SolutionsStack } from "@/components/solutions-stack";
import { SplitWordReveal } from "@/components/split-word-reveal";
import { ValuePillars } from "@/components/value-pillars";

export const metadata: Metadata = {
  title: "PKM Consultants — MEPF Design & Engineering Consultancy, Chennai",
  description:
    "PKM Consultants delivers HVAC, plumbing, electrical, fire protection and ELV design for commercial, industrial and high-rise buildings across India.",
};

const logger = new Logger("HomePage");

// Up to 4 posts: 1 column on phones, 2×2 on tablets, 3 or 4 across on desktop.
const HOME_BLOG_COUNT = 4;

async function getLatestBlogs() {
  try {
    const { data } = await sanityFetch({
      query: queryBlogIndexPageBlogs,
      params: { start: 0, end: HOME_BLOG_COUNT },
    });
    return data ?? [];
  } catch (error) {
    // A CMS outage should not take the home page down; the section just hides.
    logger.error("Failed to fetch latest blogs", error);
    return [];
  }
}

export default async function HomePage() {
  const blogs = await getLatestBlogs();

  return (
    <>
      {/* ══════════════════════════════════════════
          HERO — 2×2 CSS Grid on desktop (lg+)
          Cell borders draw the architectural crosshair:
          ┌ eyebrow (logo zone) ┬ cursor tracker ┐  row 1: clears the big logo
          │                     │                │  (320px at 1024w → 400px at 1440w+, tracking the logo's scroll-start size)
          ├ mission statement   ┼ headline + CTA ┤  row 2: fills the rest
          Below lg only the headline cell is shown, padded to clear the fixed logo
          (logo is min(200px, 60vw) wide on phones, 300px on tablets; aspect ≈ 0.83).
      ══════════════════════════════════════════ */}
      <section className="relative grid min-h-svh grid-cols-1 overflow-hidden bg-[#f7fbff] text-[#1e1926] lg:grid-cols-[35%_minmax(0,1fr)] lg:grid-rows-[clamp(320px,calc(19.25vw+123px),400px)_minmax(300px,1fr)] xl:grid-cols-[480px_minmax(0,1fr)]">
        {/* Row 1 Left: eyebrow */}
        <div className="hidden items-end border-[#261CC1]/80 lg:flex lg:border-r-[1.2px] lg:border-b-[1.2px] lg:px-10 lg:pb-3">
          <div className="flex w-full flex-row flex-wrap justify-between gap-x-4 gap-y-1">
            <SplitWordReveal
              as="p"
              className="m-0 font-lumierepolis font-semibold text-[#261CC1] text-[1rem] uppercase tracking-[0.25em]"
              delay={0.2}
              hoverColor="#1a1396"
              stagger={0.1}
              text="MEPF"
            />
            <SplitWordReveal
              as="p"
              className="m-0 font-mosvita font-semibold text-[#261CC1] text-[1rem] uppercase tracking-[0.25em]"
              delay={0.35}
              hoverColor="#1a1396"
              stagger={0.08}
              text="Design Firm"
            />
          </div>
        </div>

        {/* Row 1 Right: interactive cursor tracker */}
        <div className="hidden border-[#261CC1]/80 lg:block lg:border-b-[1.2px]">
          <CursorTracker />
        </div>

        {/* Row 2 Left: mission statement */}
        <div className="hidden flex-col justify-end border-[#261CC1]/80 pt-8 pr-6 pb-6 pl-10 lg:flex lg:border-r-[1.2px]">
          <SplitWordReveal
            as="p"
            className="m-0 max-w-[440px] text-[#0f0f0f] text-[1.05rem] leading-[1.55] md:text-[1.15rem]"
            delay={0.5}
            hoverColor="#444444"
            stagger={0.04}
            text="Designing sustainable, high-performance building systems that bridge the gap between stunning aesthetics and flawless functional reality."
          />
        </div>

        {/* Row 2 Right: headline + CTA (the only cell below lg) */}
        <div className="relative flex flex-col items-start justify-end px-6 pt-[calc(min(200px,60vw)*0.84+2rem)] pb-10 sm:px-10 md:pt-[calc(300px*0.84+2.5rem)] md:pb-14 lg:items-end lg:justify-start lg:bg-[#261CC1] lg:pt-10 lg:pr-10 lg:pb-10 lg:pl-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[length:10px_10px] opacity-[0.1] lg:block"
          />
          <SplitWordReveal
            as="h1"
            className="relative m-0 mb-4 max-w-[18ch] text-left font-extrabold font-metropolis text-[#1e1926] text-[clamp(2rem,5.5vw,3.2rem)] leading-[1.08] tracking-[-0.035em] md:max-w-[22ch] lg:mb-8 lg:ml-[clamp(3rem,12vw,400px)] lg:max-w-none lg:text-right lg:text-[#f7fbff]"
            text="A multi-disciplinary firm helping you bring your art to life."
          />
          {/* Mission statement — below lg only (its desktop cell is hidden) */}
          <p className="m-0 mb-8 w-full max-w-[560px] text-left text-[#1e1926] text-[0.95rem] leading-[1.6] sm:text-[1.05rem] lg:hidden">
            Designing sustainable, high-performance building systems that bridge
            the gap between stunning aesthetics and flawless functional reality.
          </p>
          <AnimatedCTAButton
            className="relative inline-flex min-h-11 min-w-[120px] items-center justify-between self-start overflow-hidden bg-[#261CC1] px-5 py-3 font-bold font-mosvita text-[#f7fbff] text-[0.85rem] uppercase tracking-[0.08em] no-underline lg:self-end lg:bg-[#f7fbff] lg:text-[#261CC1]"
            href="/about"
            label="About Us"
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BUILDING LIFELINES — GSAP parallax
      ══════════════════════════════════════════ */}
      <BuildingParallax2 />

      {/* ══════════════════════════════════════════
          MEPF EXPLODED VIEW — scroll-triggered 3D
      ══════════════════════════════════════════ */}
      <MepfExplode2 />

      {/* ══════════════════════════════════════════
          SOLUTIONS STACK — Industrialized technology stacking cards
      ══════════════════════════════════════════ */}
      <SolutionsStack />

      {/* ══════════════════════════════════════════
          VALUE PILLARS — System guarantees accordion
      ══════════════════════════════════════════ */}
      <ValuePillars />

      {/* ══════════════════════════════════════════
    PROVEN EXPERIENCE — single home for this block (image right)
══════════════════════════════════════════ */}
      <MatrixSection
        title="Proven Project Experience"
        description="MEP and fire protection designs for commercial, industrial and high-rise buildings across India, from concept to site support."
        link="/projects"
        linkLabel="View our projects"
        imageUrl="/images/building-1.jpg"
        imageAlt="High-rise commercial building with MEP services installed"
        imagePosition="right"
      />

      {/* ══════════════════════════════════════════
          LATEST BLOG POSTS — from Sanity (hidden when empty)
      ══════════════════════════════════════════ */}
      <HomeBlogSection blogs={blogs} />

      {/* ══════════════════════════════════════════
          PRE-FOOTER ARCHITECTURAL SECTION
      ══════════════════════════════════════════ */}
      <Prefooter />
    </>
  );
}
