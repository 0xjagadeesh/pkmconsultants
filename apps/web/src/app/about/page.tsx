import type { Metadata } from "next";
import type {
  AboutPage as AboutPageSchema,
  ProfessionalService,
  WithContext,
} from "schema-dts";

import { IntroBlock } from "@/components/blocks/intro-block";
import { LinkList } from "@/components/blocks/link-list";
import { PageCta } from "@/components/blocks/page-cta";
import { PageHero } from "@/components/blocks/page-hero";
import { StatsStrip } from "@/components/blocks/stats-strip";
import { JsonLdScript } from "@/components/json-ld";
import { ALL_PROJECTS, SCOPE_OF_SERVICES } from "@/data/pkm-portfolio";
import { getBaseUrl } from "@/utils";

const PAGE_TITLE = "About PKM Consultants | MEPF Design Consultants in Chennai";
const PAGE_DESCRIPTION =
  "PKM Consultants is a Chennai-based MEPF design firm. We design HVAC, plumbing, electrical, fire protection and ELV systems as one coordinated process for commercial, industrial and high-rise buildings across India.";
const PAGE_URL = `${getBaseUrl()}/about`;
const OG_IMAGE = `${getBaseUrl()}/images/about-hero-bg.jpg`;

export const metadata: Metadata = {
  // absolute: skip the "%s | PKM Consultants" template, the brand is already in the title
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    siteName: "PKM Consultants",
    locale: "en_IN",
    images: [{ url: OG_IMAGE, alt: "PKM Consultants MEPF design" }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE],
  },
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

// Display order: PHE, Fire Protection, Electrical, ELV, HVAC.
// Indexes point into SCOPE_OF_SERVICES; each links to its /services/[slug] page.
const DISCIPLINE_ORDER = [1, 2, 4, 3, 0];

const DISCIPLINE_LINKS = DISCIPLINE_ORDER.flatMap((i) => {
  const service = SCOPE_OF_SERVICES[i];
  if (!service) return [];
  return [
    {
      title: service.discipline,
      caption: service.shortTitle,
      href: `/services/${service.slug}`,
    },
  ];
});

const ABOUT_JSON_LD: WithContext<AboutPageSchema> = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: PAGE_URL,
  name: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  mainEntity: {
    "@type": "ProfessionalService",
    name: "PKM Consultants",
    description: PAGE_DESCRIPTION,
    url: getBaseUrl(),
    image: OG_IMAGE,
    email: "info@pkmconsultants.in",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot No. 34, Rayal Castle Phase 1, Kolapancheri",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      postalCode: "600072",
      addressCountry: "IN",
    },
    areaServed: { "@type": "Country", name: "India" },
    knowsAbout: SCOPE_OF_SERVICES.map((service) => service.discipline),
  } satisfies ProfessionalService,
};

/**
 * Order follows the reader's questions: who are you → proof → what do you do →
 * how do you work → contact. Values live on Home, experience on Home and
 * /projects, office details on /contact.
 */
export default function AboutPage() {
  return (
    <>
      <JsonLdScript data={ABOUT_JSON_LD} id="about-json-ld" />

      {/* 1. Hero — single H1 carrying the primary keyword */}
      <PageHero
        backgroundImage={{ src: "/images/about-hero-bg.jpg" }}
        eyebrow="About PKM Consultants"
        intro="A Chennai-based MEPF design firm turning HVAC, plumbing, electrical, fire and ELV design into clash-free, approval-ready drawings."
        title={["MEPF design consultants", "for buildings that work as one"]}
        tone="dark"
      />

      {/* 2. Who we are */}
      <IntroBlock
        body={[
          "Commercial, industrial, residential, institutional and metro projects across India, from concept design to approval drawings and site support.",
        ]}
        label="Who we are"
        statement="Our purpose is to deliver MEPF designs that are coordinated, code-compliant and ready for site on every project."
      />

      {/* 3. Proof at a glance */}
      <StatsStrip items={STATS} />

      {/* 4. What we do — internal links into /services/[slug] */}
      <LinkList
        items={DISCIPLINE_LINKS}
        label="Disciplines"
        title="MEPF engineering services we provide"
      />

      {/* 5. How we work — full method lives on /how-we-work */}
      <div id="process">
        <IntroBlock
          body={[
            "Six stages take every project from brief to building: site study, load calculations, coordinated design, code review, approval drawings and site support.",
          ]}
          image={{
            src: "/images/metal-structure.jpg",
            alt: "Steel structure on site awaiting coordinated building services",
          }}
          label="How we work"
          link={{ href: "/how-we-work", label: "See how we work" }}
          statement="One method, from load calculations to site support."
        />
      </div>

      {/* TODO: Leadership / team section (founder, years of experience,
          credentials) once real names and bios are available. */}

      <PageCta />
    </>
  );
}
