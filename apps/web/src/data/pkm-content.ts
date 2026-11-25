/**
 * Shared copy for the inner pages (Services, About, Projects).
 * Edit here; pages read from this file. Move to Sanity when the schema exists.
 */
import type { FaqItem } from "@/components/blocks/faq-block";
import type { NumberedItem } from "@/components/blocks/numbered-list";
import type { ValueItem } from "@/components/blocks/values-list";

/** Design workflow every project follows (also used on the home page copy). */
export const DESIGN_PROCESS: NumberedItem[] = [
  {
    title: "Load calculations",
    description:
      "Every design starts from the building's real cooling, power and water demand, so systems are sized for how the building will actually be used.",
  },
  {
    title: "Coordinated drawings",
    description:
      "Mechanical, electrical, plumbing and fire services are drawn together so clashes show up on screen, not on site.",
  },
  {
    title: "Internal quality checks",
    description:
      "Each drawing set is reviewed internally before it is issued, which keeps revisions traceable and drawings consistent.",
  },
  {
    title: "Code compliance review",
    description:
      "Final drawings are checked against NBC, NFPA, BIS and local authority requirements so they are ready for approval.",
  },
  {
    title: "Site support",
    description:
      "We stay involved through execution, answering site queries and reviewing changes so what is built matches what was designed.",
  },
];

/** System guarantees shown in the Values block. */
export const VALUES: ValueItem[] = [
  {
    title: "Fewer site changes",
    description:
      "HVAC, electrical, plumbing and fire services are designed together from concept stage, so clashes are resolved before installation begins.",
  },
  {
    title: "Lower operating costs",
    description:
      "Accurate load calculations and right-sized systems cut wasted energy and support IGBC, LEED and ECBC requirements.",
  },
  {
    title: "Faster approvals",
    description:
      "NBC and NFPA-compliant drawings with clear documentation help you secure fire and statutory approvals sooner.",
  },
];

export const SERVICE_FAQS: FaqItem[] = [
  {
    question: "Which codes do your designs follow?",
    answer:
      "Designs follow the National Building Code of India (NBC), relevant BIS standards, NFPA for fire protection and the requirements of the local fire and municipal authorities for each project.",
  },
  {
    question: "Can you take on a single discipline, or only full MEPF?",
    answer:
      "Both. We regularly design plumbing, fire fighting or electrical on their own, and we also deliver the full coordinated MEPF package for a building.",
  },
  {
    question: "Do you help with fire NOC and statutory approvals?",
    answer:
      "Yes. Our drawings are prepared to clear approval, and we support the documentation and authority comments during the fire NOC process.",
  },
  {
    question: "Do you work with architects' existing drawings?",
    answer:
      "Yes. We start from the architectural set and coordinate MEPF services around structure and ceiling heights before drawings are issued.",
  },
  {
    question: "Do you review designs prepared by other consultants?",
    answer:
      "Yes. We provide design review consultancy, including for metro and transit stations, checking plumbing and fire fighting designs for compliance and constructability.",
  },
];
