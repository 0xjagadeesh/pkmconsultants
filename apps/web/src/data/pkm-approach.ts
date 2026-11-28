/**
 * Copy for /how-we-work (layout modelled on the Enerblock approach page).
 * Move to Sanity when the schema exists.
 */
import type { KeyPoint } from "@/components/blocks/key-points-stack";
import type { ProcessStep } from "@/components/blocks/process-steps";
import type { ValuePillarItem } from "@/components/value-pillars";

export const APPROACH_HERO = {
  eyebrow: "How we work",
  title: ["A method for", "coordinated and", "buildable MEPF"],
  intro:
    "We connect load calculations, coordinated drawings and site support in one continuous workflow, so building services are resolved on screen before they reach site.",
  image: {
    src: "/images/metal-structure.jpg",
    alt: "Steel structure on a construction site awaiting building services",
  },
  caption: "Building services designed as one coordinated system",
};

export const APPROACH_INTRO = {
  title: ["What changes when", "services are", "coordinated"],
  body: [
    "On many projects, HVAC, plumbing, electrical and fire services are drawn separately and only meet on site. Ducts hit beams, drainage falls clash with slabs, and decisions are made too late.",
    "Our approach reverses that order: resolve the critical interfaces early, draw every service against the structure, and turn site work into installation of a coordinated design.",
  ],
  image: {
    src: "/images/sustainability.jpg",
    alt: "Building facade whose loads and services are coordinated in design",
  },
};

export const APPROACH_DELIVERS = {
  title: ["What PKM", "delivers"],
  body: [
    "A single, coordinated MEPF design process for commercial, industrial, residential and metro projects. It is not about adding more drawings, but about closing decisions at the right time and issuing information each trade can build from.",
    "The result is a more predictable project: fewer revisions, fewer site changes and clearer approvals.",
  ],
  image: {
    src: "/images/certification.jpg",
    alt: "Engineer marking up a coordinated services drawing",
  },
};

export const APPROACH_POINTS: KeyPoint[] = [
  {
    title: "Clash-free ceilings",
    text: "Ducts, pipes, trays and sprinklers are routed together before drawings are issued.",
  },
  {
    title: "Right-sized plant",
    text: "Equipment is selected from calculated loads, not thumb rules.",
  },
  {
    title: "Approval-ready drawings",
    text: "Codes and authority requirements are designed in, not checked at the end.",
  },
  {
    title: "Traceable revisions",
    text: "Every change is reviewed and recorded, so the latest set is always clear.",
  },
  {
    title: "One point of coordination",
    text: "One team owns the interfaces between all five disciplines.",
  },
];

export const APPROACH_IMAGES = {
  large: {
    src: "/images/building-1.jpg",
    alt: "High-rise building with coordinated MEPF services",
  },
  small: {
    src: "/images/hvac.webp",
    alt: "HVAC ductwork installed to coordinated drawings",
  },
};

export const APPROACH_STEPS: ProcessStep[] = [
  {
    title: "Brief and site study",
    text: "We review the architectural set, site and client requirements, and agree the services scope and the codes that apply.",
  },
  {
    title: "Load calculations",
    text: "Cooling, power, water and fire demands are calculated, so every system is sized for how the building will be used.",
  },
  {
    title: "Coordinated design",
    text: "HVAC, plumbing, electrical, fire and ELV are drawn together against the structure, so clashes are resolved on screen, not on site.",
  },
  {
    title: "Quality and code review",
    text: "Each drawing set is checked internally and against national codes and local authority requirements before it is issued.",
  },
  {
    title: "Approval and tender drawings",
    text: "We issue approval-ready drawings, calculations and BOQs, and support fire NOC and statutory submissions.",
  },
  {
    title: "Site support",
    text: "We answer site queries and review changes, so what is installed matches what was designed.",
  },
];

export const APPROACH_DELIVERABLES: ValuePillarItem[] = [
  {
    id: "drawings",
    title: "Coordinated drawings",
    description:
      "Plans, sections and shaft details for every discipline, drawn together and issued as one consistent set.",
    href: "/services",
    buttonLabel: "Our services",
    image: "/images/archi.webp",
    imageAlt: "Coordinated MEPF floor plan",
  },
  {
    id: "calculations",
    title: "Calculations & BOQs",
    description:
      "Load calculations, single line diagrams, pump and tank sizing, and bills of quantities ready for tender.",
    href: "/services/electrical",
    buttonLabel: "Electrical design",
    image: "/images/electrical.jpg",
    imageAlt: "Electrical panels sized from load calculations",
  },
  {
    id: "approvals",
    title: "Approval support",
    description:
      "Drawings and documentation prepared for fire NOC and statutory approvals, with support through authority comments.",
    href: "/services/fps",
    buttonLabel: "Fire protection",
    image: "/images/fps.webp",
    imageAlt: "Fire protection layout prepared for approval",
  },
];

export const APPROACH_BAND = {
  src: "/images/industrial-backing.jpg",
  alt: "Industrial building with coordinated building services",
};

export const APPROACH_VIDEO_BAND = {
  src: "/images/coor-section-2-pkm.gif",
  alt: "Animated coordination model of MEPF services",
};
