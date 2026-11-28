import type { Metadata } from "next";

import { LegalContent } from "@/components/blocks/legal-content";
import { PageHero } from "@/components/blocks/page-hero";
import { LEGAL_CONTACT, LEGAL_UPDATED, TERMS_SECTIONS } from "@/data/pkm-legal";
import { getBaseUrl } from "@/utils";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms for using the PKM Consultants website, including how enquiries, design engagements and intellectual property in our drawings are handled.",
  alternates: { canonical: `${getBaseUrl()}/terms` },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        intro="The terms that apply when you use this website. Our design services are provided under a separate written proposal or agreement."
        meta={[
          { label: "Last updated", value: LEGAL_UPDATED },
          { label: "Applies to", value: "This website" },
          { label: "Governing law", value: "India · Courts at Chennai" },
          { label: "Contact", value: LEGAL_CONTACT.email },
        ]}
        title="Terms & Conditions"
      />
      <LegalContent
        contact={LEGAL_CONTACT}
        related={{ href: "/privacy", label: "Privacy Policy" }}
        sections={TERMS_SECTIONS}
      />
    </>
  );
}
