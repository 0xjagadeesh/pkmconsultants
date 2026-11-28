/**
 * Shared copy for the inner pages.
 * Edit here; pages read from this file. Move to Sanity when the schema exists.
 */
import type { FaqItem } from "@/components/blocks/faq-block";

/** Questions on the /services index (also emitted as FAQPage schema). */
export const SERVICE_FAQS: FaqItem[] = [
  {
    question: "Which codes do your designs follow?",
    answer:
      "National codes, fire and municipal authority norms for each project. Every service page lists the exact standards.",
  },
  {
    question: "Can you take on a single discipline, or only full MEPF?",
    answer:
      "Both. We often design plumbing, fire fighting or electrical on their own, or the full coordinated MEPF package.",
  },
  {
    question: "Do you help with fire NOC and statutory approvals?",
    answer:
      "Yes. Our drawings are prepared to clear approval, and we support documentation and authority comments during the fire NOC.",
  },
  {
    question: "Do you work with architects' existing drawings?",
    answer:
      "Yes. We start from the architectural set and route services around structure and ceiling heights before issue.",
  },
  {
    question: "Do you review designs prepared by other consultants?",
    answer:
      "Yes, including metro and transit stations, checking plumbing and fire fighting designs for compliance and constructability.",
  },
];
