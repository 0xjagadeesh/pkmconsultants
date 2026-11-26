import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { BreadcrumbList, FAQPage, Service, WithContext } from "schema-dts";

import { FaqBlock2 } from "@/components/blocks/faq-block-2";
import { NumberedList } from "@/components/blocks/numbered-list";
import { PageCta } from "@/components/blocks/page-cta";
import { PageHero } from "@/components/blocks/page-hero";
import { PostItGrid } from "@/components/blocks/post-it-grid";
import { ServiceNavList } from "@/components/blocks/service-nav-list";
import { JsonLdScript } from "@/components/json-ld";
import { ScrollRevealSplit } from "@/components/scroll-reveal-split";
import { SCOPE_OF_SERVICES } from "@/data/pkm-portfolio";
import { SERVICE_DETAILS } from "@/data/pkm-services";
import { getBaseUrl } from "@/utils";

type Props = { params: Promise<{ slug: string }> };

/** FAQs shown (and mirrored in schema) per service page. */
const MAX_FAQS = 4;

/** Only the five disciplines exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return SCOPE_OF_SERVICES.map((service) => ({ slug: service.slug }));
}

function getService(slug: string) {
  const scope = SCOPE_OF_SERVICES.find((service) => service.slug === slug);
  if (!scope) {
    return null;
  }
  return { scope, detail: SERVICE_DETAILS[scope.slug] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) {
    return {};
  }
  const { detail } = service;
  const url = `${getBaseUrl()}/services/${slug}`;
  const image = `${getBaseUrl()}${detail.heroImage.src}`;

  return {
    title: { absolute: detail.metaTitle },
    description: detail.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: detail.metaTitle,
      description: detail.metaDescription,
      siteName: "PKM Consultants",
      locale: "en_IN",
      images: [{ url: image, alt: detail.heroImage.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: detail.metaTitle,
      description: detail.metaDescription,
      images: [image],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) {
    notFound();
  }
  const { scope, detail } = service;
  const { reveal } = detail;
  const faqs = detail.faqs.slice(0, MAX_FAQS);

  // Other disciplines, starting with the next one and wrapping around
  const position = SCOPE_OF_SERVICES.findIndex((s) => s.slug === scope.slug);
  const nextServices = SCOPE_OF_SERVICES.flatMap((_, offset) => {
    const index = (position + 1 + offset) % SCOPE_OF_SERVICES.length;
    const s = SCOPE_OF_SERVICES[index];
    if (!s || s.slug === scope.slug) return [];
    return [
      {
        number: String(index + 1).padStart(2, "0"),
        title: s.discipline,
        href: `/services/${s.slug}`,
        icon: s.slug,
      },
    ];
  });
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/services/${slug}`;

  const serviceJsonLd: WithContext<Service> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: scope.discipline,
    serviceType: `${detail.code} design`,
    description: detail.metaDescription,
    url,
    areaServed: { "@type": "Country", name: "India" },
    provider: {
      "@type": "ProfessionalService",
      name: "PKM Consultants",
      url: baseUrl,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        postalCode: "600072",
        addressCountry: "IN",
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${scope.discipline} systems`,
      itemListElement: detail.systems.map((system) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: system.title,
          description: system.description,
        },
      })),
    },
  };

  const faqJsonLd: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${baseUrl}/services`,
      },
      { "@type": "ListItem", position: 3, name: scope.discipline, item: url },
    ],
  };

  return (
    <>
      <JsonLdScript data={serviceJsonLd} id={`service-json-ld-${slug}`} />
      <JsonLdScript data={faqJsonLd} id={`service-faq-json-ld-${slug}`} />
      <JsonLdScript data={breadcrumbJsonLd} id={`breadcrumb-json-ld-${slug}`} />

      <PageHero
        backgroundImage={detail.heroImage}
        eyebrow={`Services / ${detail.code}`}
        intro={detail.heroIntro}
        meta={[
          { label: "Discipline", value: scope.shortTitle },
          { label: "Stages", value: "Concept to site support" },
          { label: "Coverage", value: "Projects across India" },
        ]}
        title={detail.heroTitle}
        tone="dark"
      />

      <ScrollRevealSplit
        blocks={reveal.blocks}
        headingLines={reveal.headingLines}
        image={reveal.image}
        subtitle={reveal.subtitle}
      />

      <PostItGrid
        items={detail.systems}
        label="Systems"
        title={`${detail.code} systems we design`}
      />

      <NumberedList
        items={[
          {
            tag: "Deliverables",
            title: "Drawings & documents you receive",
            description: "Every set is checked and coordinated before issue.",
            points: scope.deliverables,
          },
          {
            tag: "Compliance",
            title: "Codes & standards",
            description: "Plus the local approving authority for each project.",
            tags: detail.standards,
          },
        ]}
        label="Scope"
        link={{ href: "/about#process", label: "See how we work" }}
        title="What is included"
      />

      <FaqBlock2
        image={detail.heroImage}
        items={faqs}
        title={`Questions about ${detail.code} design`}
      />

      <ServiceNavList
        items={nextServices}
        title={["Explore our other", "MEPF services"]}
      />

      <PageCta />
    </>
  );
}
