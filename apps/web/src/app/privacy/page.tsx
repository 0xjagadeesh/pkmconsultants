import type { Metadata } from "next";

import { LegalContent } from "@/components/blocks/legal-content";
import { PageHero } from "@/components/blocks/page-hero";
import {
  LEGAL_CONTACT,
  LEGAL_UPDATED,
  PRIVACY_SECTIONS,
} from "@/data/pkm-legal";
import { getBaseUrl } from "@/utils";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How PKM Consultants collects, uses and protects personal data from website visitors, enquiries and project clients, under India's Digital Personal Data Protection Act, 2023.",
  alternates: { canonical: `${getBaseUrl()}/privacy` },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        intro="How we collect, use and protect personal data when you visit this website, send us an enquiry or work with us on a project."
        meta={[
          { label: "Last updated", value: LEGAL_UPDATED },
          { label: "Applies to", value: "Website, enquiries & projects" },
          { label: "Law", value: "DPDP Act, 2023 (India)" },
          { label: "Contact", value: LEGAL_CONTACT.email },
        ]}
        title="Privacy Policy"
      />
      <LegalContent
        contact={LEGAL_CONTACT}
        related={{ href: "/terms", label: "Terms & Conditions" }}
        sections={PRIVACY_SECTIONS}
      />
    </>
  );
}
