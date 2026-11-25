import type { Metadata } from "next";
import { FaqBlock } from "@/components/blocks/faq-block";
import { ImageBand } from "@/components/blocks/image-band";
import { IntroBlock } from "@/components/blocks/intro-block";
import { NumberedList } from "@/components/blocks/numbered-list";
import { PageCta } from "@/components/blocks/page-cta";
import { PageHero } from "@/components/blocks/page-hero";
import { PostItGrid } from "@/components/blocks/post-it-grid";
import { ValuesList } from "@/components/blocks/values-list";
import { DESIGN_PROCESS, SERVICE_FAQS, VALUES } from "@/data/pkm-content";
import { SCOPE_OF_SERVICES } from "@/data/pkm-portfolio";

export const metadata: Metadata = {
  title: "Services",
  description:
    "MEPF design services from PKM Consultants: HVAC, plumbing & public health, HT/LT electrical, fire protection, ELV and STP/WTP for commercial, industrial and high-rise buildings.",
};

/** Anchor id for each discipline's scope row */
const scopeId = (index: number) => `scope-${index + 1}`;

const DISCIPLINES = SCOPE_OF_SERVICES.map((service, i) => ({
  tag: service.shortTitle,
  title: service.discipline,
  description: service.description,
  href: `#${scopeId(i)}`,
}));

const SCOPE = SCOPE_OF_SERVICES.map((service) => ({
  tag: service.shortTitle,
  title: service.discipline,
  description: service.description,
  points: service.deliverables,
}));

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        intro="We design mechanical, electrical, plumbing and fire protection systems as one coordinated process, from load calculations to approval-ready drawings and site support."
        title={[
          "MEPF design that is",
          "coordinated, compliant",
          "and constructible",
        ]}
      />

      <IntroBlock
        body={[
          "Most site problems start when building services are designed in isolation. Ducts meet beams, drainage slopes clash with slabs and late changes ripple through every trade.",
          "We draw HVAC, plumbing, electrical and fire services together against the architecture and structure, so drawings are consistent and every revision is traceable.",
        ]}
        image={{
          src: "/images/archi.webp",
          alt: "Architectural floor plan used for MEPF coordination",
        }}
        label="Approach"
        statement="Five disciplines, one coordinated set of drawings."
      />

      <PostItGrid
        intro="Appoint us for a single discipline or the full coordinated package. Select a discipline to see exactly what is included."
        items={DISCIPLINES}
        label="Disciplines"
        title="What we design"
      />

      <NumberedList
        id="scope"
        intro="What is included when you appoint us for each discipline, conforming to NBC, BIS, NFPA and local authority norms."
        itemId={scopeId}
        items={SCOPE}
        label="Scope"
        title="What we deliver in each discipline"
      />

      <ImageBand alt="Plumbing services layout" src="/images/plumbing.webp" />

      <NumberedList
        intro="Every project follows the same workflow, which keeps drawings consistent and lets us deliver commercial, industrial and high-rise projects to the same standard."
        items={DESIGN_PROCESS}
        label="Process"
        title="How we work"
        tone="dark"
      />

      <ValuesList
        items={VALUES}
        title="Design guarantees that hold up on site"
      />

      <FaqBlock items={SERVICE_FAQS} title="Questions about our services" />

      <PageCta />
    </>
  );
}
