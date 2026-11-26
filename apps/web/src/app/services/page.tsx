import type { Metadata } from "next";
import type { FAQPage, WithContext } from "schema-dts";

import { FaqBlock } from "@/components/blocks/faq-block";
import { IntroBlock } from "@/components/blocks/intro-block";
import { PageCta } from "@/components/blocks/page-cta";
import { PageHero } from "@/components/blocks/page-hero";
import { PostItGrid } from "@/components/blocks/post-it-grid";
import { ImageRevealCrosshair } from "@/components/image-reveal-crosshair";
import { JsonLdScript } from "@/components/json-ld";
import { SERVICE_FAQS } from "@/data/pkm-content";
import { SCOPE_OF_SERVICES } from "@/data/pkm-portfolio";

export const metadata: Metadata = {
  title: "Services",
  description:
    "MEPF design services from PKM Consultants: HVAC, plumbing & public health, HT/LT electrical, fire protection and ELV for commercial, industrial and high-rise buildings.",
};

/** One compact card per discipline; the full scope lives on /services/[slug]. */
const DISCIPLINES = SCOPE_OF_SERVICES.map((service) => ({
  title: service.discipline,
  description: service.benefit,
  href: `/services/${service.slug}`,
}));

const FAQ_JSON_LD: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: SERVICE_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <JsonLdScript data={FAQ_JSON_LD} id="services-faq-json-ld" />

      <PageHero
        eyebrow="Services"
        intro="One coordinated process for HVAC, plumbing, electrical, fire and ELV design, from load calculations to site support."
        title={[
          "MEPF design that is",
          "coordinated, compliant",
          "and constructible",
        ]}
      />

      <IntroBlock
        body={[
          "We draw every service together against the architecture and structure, so clashes are solved on screen, not on site.",
        ]}
        image={{
          src: "/images/archi.webp",
          alt: "Architectural floor plan used for MEPF coordination",
        }}
        label="Approach"
        link={{ href: "/about#process", label: "See how we work" }}
        statement="Five disciplines, one coordinated set of drawings."
      />

      <PostItGrid
        items={DISCIPLINES}
        label="Disciplines"
        title="What we design"
      />

      <ImageRevealCrosshair
        alt="Building under construction with coordinated MEPF services"
        src="/images/building-1.jpg"
      />

      <FaqBlock items={SERVICE_FAQS} title="Questions about our services" />

      <PageCta />
    </>
  );
}
