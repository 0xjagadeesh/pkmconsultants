import type { Metadata } from "next";
import { ImageBand } from "@/components/blocks/image-band";
import { IntroBlock } from "@/components/blocks/intro-block";
import { LinkList } from "@/components/blocks/link-list";
import { LocationBlock } from "@/components/blocks/location-block";
import { NumberedList } from "@/components/blocks/numbered-list";
import { PageCta } from "@/components/blocks/page-cta";
import { PageHero } from "@/components/blocks/page-hero";
import { SectionLabel } from "@/components/blocks/section-label";
import { SplitFeature } from "@/components/blocks/split-feature";
import { StatsStrip } from "@/components/blocks/stats-strip";
import { ValuesList } from "@/components/blocks/values-list";
import { DESIGN_PROCESS, VALUES } from "@/data/pkm-content";
import { ALL_PROJECTS, SCOPE_OF_SERVICES } from "@/data/pkm-portfolio";

export const metadata: Metadata = {
  title: "About us",
  description:
    "PKM Consultants is a Chennai-based MEPF design firm. We design HVAC, plumbing, electrical, fire protection and ELV systems as one coordinated process for commercial, industrial and high-rise buildings across India.",
};

const STATS = [
  {
    label: "Projects",
    value: String(ALL_PROJECTS.length),
    caption: "Designed, reviewed or delivered with partners",
  },
  {
    label: "Metro & transit",
    value: String(
      ALL_PROJECTS.filter((p) => p.category === "Metro & Transit").length
    ),
    caption: "Stations and transit facilities",
  },
  {
    label: "Sectors",
    value: String(new Set(ALL_PROJECTS.map((p) => p.category)).size),
    caption: "Residential to industrial",
  },
  {
    label: "Disciplines",
    value: String(SCOPE_OF_SERVICES.length),
    caption: "Coordinated in one design",
  },
];

const DISCIPLINE_LINKS = SCOPE_OF_SERVICES.map((service, i) => ({
  title: service.discipline,
  caption: service.shortTitle,
  href: `/services#scope-${i + 1}`,
}));

export default function AboutPage() {
  return (
    <>
      <PageHero
        backgroundImage={{ src: "/images/about-hero-bg.jpg" }}
        eyebrow="Company"
        intro="PKM Consultants is a Chennai-based MEPF design firm. We coordinate HVAC, plumbing, electrical, fire protection and ELV design so every project reaches site with clash-free, approval-ready drawings."
        title={["We design building services", "that work as one system"]}
        tone="dark"
      />

      <IntroBlock
        body={[
          "Building services projects often lose time to clashes between trades, late revisions and drawings that fail review. We coordinate mechanical, electrical, plumbing and fire protection design in one process so each trade has the information it needs before drawings are issued.",
          "Our work covers commercial, industrial, residential, institutional and metro projects across India, from concept design through approval-ready drawings, design review and site support.",
        ]}
        image={{
          src: "/images/metal-structure.jpg",
          alt: "Metal structure on a construction site",
        }}
        label="What is PKM Consultants?"
        statement="MEPF design built for certainty on site."
      />

      {/* Purpose — brand statement */}
      <section className="relative overflow-hidden border-white/20 border-b bg-[#261CC1] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[length:10px_10px] opacity-[0.08]"
        />
        <div className="relative grid grid-cols-1 lg:grid-cols-[35%_minmax(0,1fr)] xl:grid-cols-[480px_minmax(0,1fr)]">
          <div className="border-white/20 px-6 pt-16 pb-6 sm:px-10 lg:border-r lg:px-10 lg:py-28">
            <SectionLabel tone="brand">Purpose</SectionLabel>
          </div>
          <p className="m-0 max-w-[24ch] px-6 pb-16 font-extrabold font-metropolis text-[clamp(1.9rem,4.2vw,3.4rem)] leading-[1.1] tracking-[-0.03em] sm:px-10 lg:px-12 lg:py-28">
            Deliver MEPF designs that are coordinated, code-compliant and ready
            for site on every project.
          </p>
        </div>
      </section>

      <StatsStrip items={STATS} />

      <NumberedList
        intro="One fixed workflow means drawings and revisions arrive on a schedule you can plan around, from concept design to approval-ready sets."
        items={DESIGN_PROCESS}
        label="Method"
        title="A team that works as one system"
      />

      <ImageBand
        alt="Electrical panels in a plant room"
        src="/images/electrical.jpg"
      />

      <ValuesList
        items={VALUES}
        title="Design guarantees that hold up on site"
      />

      <LinkList
        intro="Every discipline is designed in the same coordinated set of drawings."
        items={DISCIPLINE_LINKS}
        label="Disciplines"
        title="What we design"
      />

      <SplitFeature
        description="Our plumbing, fire fighting and electrical designs are delivered on residential, commercial, industrial and metro projects across India, including design review for transit stations."
        image={{
          src: "/images/building-1.jpg",
          alt: "Building under construction",
        }}
        label="Experience"
        link={{ href: "/projects", label: "View our projects" }}
        title="Proven project experience"
      />

      <LocationBlock />
      <PageCta />
    </>
  );
}
