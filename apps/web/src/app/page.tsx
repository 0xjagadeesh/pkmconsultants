import Link from "next/link";
import { sanityFetch } from "@workspace/sanity/live";
import {
  queryBlogIndexPageBlogs,
  queryAllProjects,
} from "@workspace/sanity/query";
import { SanityImage } from "@/components/elements/sanity-image";
import { BlogCard } from "@/components/blog-card";
import { CursorTracker } from "@/components/cursor-tracker";
import { AnimatedCTAButton } from "@/components/animated-cta-button";
import { SplitWordReveal } from "@/components/split-word-reveal";
import { BuildingParallax } from "@/components/building-parallax";
import { MepfExplode } from "@/components/mepf-explode";
import { ScrollRevealSplit } from "@/components/scroll-reveal-split";
import { SolutionsStack } from "@/components/solutions-stack";
import { ImageParallaxSection } from "@/components/image-parallax-section";
import { ValuePillars } from "@/components/value-pillars";
import { MatrixSection } from "@/components/matrix-section";
import { Prefooter } from "@/components/prefooter";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "PKM Consultants — Strategic Business Consulting",
  description:
    "PKM Consultants provides expert strategic, operational, and digital consulting services to help businesses grow and succeed.",
};

const SERVICES = [
  {
    number: "01",
    title: "Strategic Planning",
    description:
      "Long-term roadmaps and competitive analysis to help you reach your most ambitious goals.",
    href: "/services",
  },
  {
    number: "02",
    title: "Digital Transformation",
    description:
      "Modernize your technology stack and workflows for the digital-first business landscape.",
    href: "/services",
  },
  {
    number: "03",
    title: "Operational Excellence",
    description:
      "Streamline processes, reduce inefficiencies, and build a culture of continuous improvement.",
    href: "/services",
  },
];

const STATS = [
  { value: "500+", label: "Clients Served" },
  { value: "1.2k+", label: "Projects Completed" },
  { value: "45%", label: "Avg. Revenue Growth" },
  { value: "15+", label: "Years Experience" },
];

// const TICKER_ITEMS = [
//   "Strategic Planning",
//   "Digital Transformation",
//   "Operational Excellence",
//   "Business Growth",
//   "Leadership Advisory",
//   "Market Expansion",
// ];

export default async function HomePage() {
  const [blogsRes, projectsRes] = await Promise.all([
    sanityFetch({ query: queryBlogIndexPageBlogs, params: { start: 0, end: 3 } }),
    sanityFetch({ query: queryAllProjects }),
  ]);

  const blogs = blogsRes.data ?? [];
  const projects = (projectsRes.data ?? []).slice(0, 3);

  return (
    <>
      {/* ══════════════════════════════════════════
          HERO — CSS Grid layout
          Row 1: logo overflow zone (clears the 600px SVG)
          Row 2: eyebrow + headline (content)
          Row 3: bottom strip (desc + CTAs)
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen bg-[#f7fbff] text-[#1e1926] flex flex-col justify-between overflow-hidden">
        {/* Spacer to clear fixed navbar */}


        {/* Full screen spanning dividing lines */}
        <div aria-hidden="true" className="hidden lg:block absolute left-0 right-0 border-b border-[1.2px] border-[#261CC1]/80" style={{ top: "400px" }} />
        <div aria-hidden="true" className="hidden lg:block absolute top-0 bottom-0 border-r border-[1.2px] border-[#261CC1]/80 left-[35%] xl:left-[480px]" />

        {/* Content: two rows stacked */}
        <div className="flex flex-col flex-1 justify-center lg:justify-normal  pt-14 lg:pt-0">

          {/* ── ROW 1 (above horizontal line) ── */}
          <div className="hidden lg:flex">
            {/* Row 1 Left: MEPF text */}
            <div className="lg:w-[35%] xl:w-[480px] shrink-0 h-[400px] flex flex-col items-center justify-end min-h-[300px] px-10">
              <div className="flex flex-row justify-between w-full">

                <SplitWordReveal
                  text="MEPF"
                  as="p"
                  className="text-[1rem] font-lumierepolist font-semibold tracking-[0.25em] uppercase text-[#261CC1] m-0"
                  hoverColor="#1a1396"
                  stagger={0.1}
                  delay={0.2}
                />
                <SplitWordReveal
                  text="Design Firm"
                  as="p"
                  className="text-[1rem] font-mosvita font-semibold tracking-[0.25em] uppercase text-[#261CC1] m-0"
                  hoverColor="#1a1396"
                  stagger={0.08}
                  delay={0.35}
                />
              </div>


            </div>

            {/* Row 1 Right: Interactive Cursor Tracker Sandbox */}
            <div className="flex-1 h-[400px] ">
              <CursorTracker />
            </div>
          </div>

          {/* ── ROW 2 (below horizontal line) ── */}
          <div className="flex flex-col lg:flex-row justify-center lg:justify-start lg:items-stretch flex-1">
            {/* Row 2 Left: Subtext + Description */}
            <div className="hidden lg:flex lg:w-[35%] xl:w-[480px] shrink-0 lg:order-none pt-8 pb-6 pl-10 pr-6 flex-col justify-end lg:min-h-[300px]">
              {/* Bottom: Paragraph */}
              <SplitWordReveal
                text="Designing sustainable, high-performance building systems that bridge the gap between stunning aesthetics and flawless functional reality."
                as="p"
                className="text-[#0f0f0f] text-[1.05rem] md:text-[1.15rem] leading-[1.55] max-w-[440px] m-0"
                hoverColor="#444444"
                stagger={0.04}
                delay={0.5}
              />
            </div>

            {/* Row 2 Right: Headline + CTA */}
            <div className="lg:flex-1 order-1 lg:order-none bg-transparent lg:bg-[#261CC1] self-stretch pt-8 lg:pt-10 px-5 lg:pl-12 lg:pr-10 flex flex-col justify-end lg:justify-start items-end min-h-[55vh] lg:min-h-[300px] relative">
              <div
                aria-hidden="true"
                className="hidden lg:block  pointer-events-none absolute inset-0 opacity-[0.1] group-hover:opacity-[0.18] transition-opacity duration-500"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)",
                  backgroundSize: "10px 10px"
                }}
              />
              <SplitWordReveal
                text="A multi-disciplinary firm helping you bring your art to life."
                as="h1"

                className="font-extrabold font-metropolis text-[#1e1926] lg:text-[#f7fbff] leading-[1.08] tracking-[-0.035em] text-left lg:text-right m-0 mb-2 lg:mb-8 lg:ml-[clamp(3rem,12vw,400px)]"
                style={{ fontSize: "clamp(2rem, 5.5vw, 3.2rem)" }}

              />
              {/* Subheadline — mobile only (left panel is hidden on mobile) */}
              <p className="lg:hidden text-[#1e1926] text-[0.95rem] leading-[1.6] text-left w-full mb-8 m-0">
                Designing sustainable, high-performance building systems that bridge the gap between stunning aesthetics and flawless functional reality.
              </p>
              <AnimatedCTAButton
                href="/about"
                label="About Us"
                className="inline-flex self-start lg:self-end items-center bg-[#261CC1] justify-between lg:bg-[#f7fbff] text-[#f7fbff] lg:text-[#261CC1] px-5 py-3 font-bold text-[0.85rem] tracking-[0.08em] uppercase font-mosvita no-underline overflow-hidden"
                style={{ minWidth: "120px" }}
              />
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          BUILDING LIFELINES — GSAP parallax
      ══════════════════════════════════════════ */}
      <BuildingParallax />

     {/* ══════════════════════════════════════════
          TICKER
      ══════════════════════════════════════════ */}
       {/* 
      <div
        aria-hidden="true"
        className="bg-[#261CC1] py-3.5 overflow-hidden"
      >
        <div className="flex w-max animate-ticker hover:[animation-play-state:paused]">
          {[...Array(2)].map((_, pass) =>
            TICKER_ITEMS.map((item) => (
              <span
                key={`${pass}-${item}`}
                className="whitespace-nowrap text-[0.68rem] font-bold tracking-[0.22em] uppercase text-white/90 px-10"
              >
                {item} ·
              </span>
            ))
          )}
        </div>
      </div> */}
      {/* ══════════════════════════════════════════
          SCROLL REVEAL SPLIT — two-column image reveal
      ══════════════════════════════════════════ */}
      <ScrollRevealSplit />

      {/* ══════════════════════════════════════════
          MEPF EXPLODED VIEW — scroll-triggered 3D
      ══════════════════════════════════════════ */}
      <MepfExplode />

      {/* ══════════════════════════════════════════
          SOLUTIONS STACK — Industrialized technology stacking cards
      ══════════════════════════════════════════ */}
      <SolutionsStack />

      {/* ══════════════════════════════════════════
          IMAGE PARALLAX BANNER — Construction structure
      ══════════════════════════════════════════ */}
      <ImageParallaxSection
        image="/images/metal-structure.jpg"
        alt="Metal structure on a construction site"
      />

      {/* ══════════════════════════════════════════
          VALUE PILLARS — System guarantees accordion
      ══════════════════════════════════════════ */}
      <ValuePillars />

      <MatrixSection
        title={[
          "A consistent design",
          "process on every project",
        ]}
        description="Every project follows the same design workflow: load calculations, coordinated drawings, internal quality checks code compliance review. This keeps drawings consistent, makes revisions traceable, and lets us deliver commercial, industrial and high-rise projects to the same standard."
        link="/contact"
        linkLabel="Request a consultation"
        imageUrl="/images/mep-design-process.webp"
        imageAlt="MEP engineer reviewing coordinated HVAC, electrical and plumbing drawings"
        imagePosition="left"
      />

      {/* ══════════════════════════════════════════
    MATRIX SPLIT 2 - Experience (Image on Right)
══════════════════════════════════════════ */}
      <MatrixSection
        title="Proven Project Experience"
        description="Our MEP and fire protection designs are delivered on commercial, industrial and high-rise buildings across India, from concept design to approval-ready drawings and site support."
        link="/projects"
        linkLabel="View our projects"
        imageUrl="/images/mep-project-experience.webp"
        imageAlt="High-rise commercial building with MEP services installed"
        imagePosition="right"
      />

      {/* ══════════════════════════════════════════
          PRE-FOOTER ARCHITECTURAL SECTION
      ══════════════════════════════════════════ */}
      <Prefooter />
    </>
  );
}
