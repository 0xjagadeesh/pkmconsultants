/**
 * Detail-page copy for /services/[slug]. One entry per discipline in
 * SCOPE_OF_SERVICES (pkm-portfolio.ts), which still owns the name,
 * short title, benefit line and deliverables. Move to Sanity when the schema exists.
 */
import type { FaqItem } from "@/components/blocks/faq-block";
import type { PostItItem } from "@/components/blocks/post-it-grid";
import type { RevealBlock } from "@/components/scroll-reveal-split";
import type { ServiceSlug } from "@/data/pkm-portfolio";

type Img = { src: string; alt: string };

export type ServiceDetail = {
  /** Short code shown in the hero eyebrow and headings */
  code: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string[];
  heroIntro: string;
  heroImage: Img;
  /** ScrollRevealSplit section */
  reveal: {
    image: Img;
    headingLines: string[];
    subtitle: string;
    blocks: RevealBlock[];
  };
  systems: PostItItem[];
  /** Short codes rendered as square tags */
  standards: string[];
  /** Max 4; all mirrored in FAQPage schema */
  faqs: FaqItem[];
};

const PROJECTS_LINK = { href: "/projects", linkLabel: "View projects" };
const CONTACT_LINK = { href: "/contact", linkLabel: "Start a project" };

export const SERVICE_DETAILS: Record<ServiceSlug, ServiceDetail> = {
  hvac: {
    code: "HVAC",
    metaTitle: "HVAC Design Consultants in Chennai | PKM Consultants",
    metaDescription:
      "HVAC design and engineering by PKM Consultants, Chennai: heat load calculations, chilled water, VRF and ducted systems, ventilation and smoke extraction for commercial, industrial and high-rise buildings.",
    heroTitle: [
      "HVAC design sized",
      "for how the building",
      "is actually used",
    ],
    heroIntro:
      "Air conditioning, ventilation and smoke control designed from real heat loads and coordinated with every other service.",
    heroImage: { src: "/images/hvac.webp", alt: "HVAC ductwork and equipment" },
    reveal: {
      image: {
        src: "/images/sustainability.jpg",
        alt: "Building facade whose orientation sets the HVAC cooling load",
      },
      headingLines: [
        "Cooling loads calculated,",
        "routes coordinated, plant",
        "sized with certainty",
      ],
      subtitle:
        "Room-by-room heat loads based on orientation, occupancy and equipment.",
      blocks: [
        {
          label: "Energy",
          description:
            "Right-sized chillers, VRF and air handling units cut both capital and running cost.",
          ...PROJECTS_LINK,
        },
        {
          label: "Coordination",
          description:
            "Ducts and chilled water pipes are drawn with beams, sprinklers and lighting, so ceilings close on time.",
          ...CONTACT_LINK,
        },
      ],
    },
    systems: [
      {
        tag: "Calculations",
        title: "Heat load & equipment selection",
        description: "Cooling loads, airflow and equipment selection per room.",
      },
      {
        tag: "Central plant",
        title: "Chilled water systems",
        description:
          "Chillers, cooling towers, pumping and chilled water piping.",
      },
      {
        tag: "Distributed",
        title: "VRF & ducted split systems",
        description:
          "Outdoor units, refrigerant piping and indoor unit layouts.",
      },
      {
        tag: "Air distribution",
        title: "Ductwork & diffusers",
        description:
          "Duct sizing and diffuser layouts coordinated with ceilings.",
      },
      {
        tag: "Ventilation",
        title: "Basement & toilet ventilation",
        description:
          "Car park jet fans, toilet and kitchen exhaust, fresh air.",
      },
      {
        tag: "Life safety",
        title: "Smoke control & pressurisation",
        description:
          "Stair and lift lobby pressurisation and smoke extraction.",
      },
    ],
    standards: ["NBC", "ASHRAE", "ECBC", "IGBC", "LEED"],
    faqs: [
      {
        question: "Which HVAC system is right for my building?",
        answer:
          "It depends on size, usage hours and budget. After the heat load, we compare chilled water, VRF and split options and recommend one.",
      },
      {
        question: "Do you design smoke extraction and stair pressurisation?",
        answer:
          "Yes. Smoke control is part of our HVAC scope and is designed to support the fire NOC.",
      },
      {
        question: "Can HVAC design support IGBC or LEED certification?",
        answer:
          "Yes. Right-sized, efficient plant helps meet the energy credits for green building certification.",
      },
    ],
  },

  phe: {
    code: "PHE",
    metaTitle:
      "Plumbing & Public Health Engineering (PHE) Consultants in Chennai | PKM Consultants",
    metaDescription:
      "Plumbing and public health engineering design by PKM Consultants, Chennai: water supply, drainage, sewerage, pumping and rainwater harvesting to NBC and BIS standards.",
    heroTitle: [
      "Plumbing & public",
      "health engineering",
      "that drains first time",
    ],
    heroIntro:
      "Water supply, drainage, sewerage and rainwater harvesting, coordinated with slabs, shafts and every other service.",
    heroImage: {
      src: "/images/plumbing.webp",
      alt: "Plumbing pipework installation",
    },
    reveal: {
      image: {
        src: "/images/coor-section-2-pkm.gif",
        alt: "Coordinated MEPF model showing plumbing routes",
      },
      headingLines: [
        "Water in, drainage out,",
        "every slope checked",
        "against the structure",
      ],
      subtitle:
        "Plumbing drawn with gravity, shafts and slab levels in mind, ready for municipal approval.",
      blocks: [
        {
          label: "Demand",
          description:
            "Water demand, tank capacities and pump duties are calculated before layouts begin.",
          ...PROJECTS_LINK,
        },
        {
          label: "Drainage",
          description:
            "Soil, waste and storm lines are routed against beams and sunken slabs, so falls work first time.",
          ...CONTACT_LINK,
        },
      ],
    },
    systems: [
      {
        tag: "Supply",
        title: "Domestic & flushing water",
        description: "Demand, tank sizing, pumping and distribution.",
      },
      {
        tag: "Drainage",
        title: "Soil, waste & vent piping",
        description: "Stacks sized for fixture units, routed through shafts.",
      },
      {
        tag: "External",
        title: "Sewerage & storm water",
        description: "External networks, manholes and municipal connections.",
      },
      {
        tag: "Pumping",
        title: "Pumping systems",
        description: "Transfer, booster and sump pumps with pump room layouts.",
      },
      {
        tag: "Sustainability",
        title: "Rainwater harvesting",
        description: "Recharge pits and collection to municipal norms.",
      },
      {
        tag: "Hot water",
        title: "Hot water systems",
        description:
          "Solar and heat pump systems for homes, hotels and hospitals.",
      },
    ],
    standards: ["NBC", "BIS", "Municipal norms", "IGBC"],
    faqs: [
      {
        question: "What does a PHE consultant do?",
        answer:
          "Designs everything that moves water through a building: supply, drainage, sewerage, pumping and rainwater harvesting.",
      },
      {
        question: "Can you design plumbing without the other MEPF services?",
        answer:
          "Yes. PHE is one of the disciplines we most often design on its own, alongside the architect and other consultants.",
      },
      {
        question: "Do you review plumbing designs prepared by others?",
        answer:
          "Yes, including for metro and transit stations, checking compliance and constructability.",
      },
    ],
  },

  fps: {
    code: "FPS",
    metaTitle:
      "Fire Protection System (FPS) Design Consultants in Chennai | PKM Consultants",
    metaDescription:
      "Fire protection and life safety design by PKM Consultants, Chennai: hydrants, wet risers, sprinklers, fire pumps and tanks to NBC, NFPA and fire NOC requirements.",
    heroTitle: ["Fire protection", "designed to clear", "the fire NOC"],
    heroIntro:
      "Hydrant, wet riser and sprinkler systems, with pump and tank calculations that hold up to review.",
    heroImage: {
      src: "/images/fps.webp",
      alt: "Fire sprinkler and hydrant pipework",
    },
    reveal: {
      image: {
        src: "/images/certification.jpg",
        alt: "Engineer marking up a fire fighting layout on a tablet",
      },
      headingLines: [
        "Fire schemes drawn to",
        "the authority's checklist",
        "from the first sketch",
      ],
      subtitle:
        "Designed from height, occupancy and hazard class, to match what the fire authority will ask for.",
      blocks: [
        {
          label: "Approval",
          description:
            "Layouts, pump heads and tank capacities follow fire service norms, so the NOC moves without rework.",
          ...PROJECTS_LINK,
        },
        {
          label: "Hydraulics",
          description:
            "Sprinkler and hydrant hydraulics are calculated and documented for review.",
          ...CONTACT_LINK,
        },
      ],
    },
    systems: [
      {
        tag: "External",
        title: "Yard hydrant systems",
        description: "Hydrant ring mains, spacing and fire brigade inlets.",
      },
      {
        tag: "Internal",
        title: "Wet riser & downcomer",
        description: "Riser sizing, landing valves and hose reels per floor.",
      },
      {
        tag: "Automatic",
        title: "Sprinkler systems",
        description: "Layouts by hazard class with hydraulic calculations.",
      },
      {
        tag: "Pumping",
        title: "Fire pump rooms",
        description: "Main, diesel and jockey pumps with pump room layouts.",
      },
      {
        tag: "Storage",
        title: "Fire water tanks",
        description: "Static storage sized for the building's category.",
      },
      {
        tag: "Special hazards",
        title: "Gas suppression & extinguishers",
        description: "Clean agent systems and portable extinguisher schedules.",
      },
    ],
    standards: ["NBC Part 4", "NFPA", "BIS", "TNFRS NOC"],
    faqs: [
      {
        question: "Do you help with the fire NOC process?",
        answer:
          "Yes. We prepare approval drawings and calculations and support authority comments during the NOC.",
      },
      {
        question: "Which buildings need sprinklers?",
        answer:
          "The building code sets this by height, occupancy and area. We confirm it at concept stage so it is budgeted from day one.",
      },
      {
        question: "Do you review fire fighting designs by other consultants?",
        answer:
          "Yes, for compliance and constructability, including metro and transit stations.",
      },
    ],
  },

  elv: {
    code: "ELV",
    metaTitle:
      "ELV, Fire Alarm & Low Voltage System Design in Chennai | PKM Consultants",
    metaDescription:
      "ELV design by PKM Consultants, Chennai: addressable fire alarm, public address, CCTV, access control and structured cabling coordinated with the building's MEPF services.",
    heroTitle: ["ELV & fire alarm", "systems that keep", "the building aware"],
    heroIntro:
      "Fire detection, public address, CCTV and low voltage networks with clear coverage and cable routes from the start.",
    heroImage: {
      src: "/images/panel.jpg",
      alt: "Low voltage panels and cabling",
    },
    reveal: {
      image: {
        src: "/images/scalable-model.jpg",
        alt: "Control station with low voltage wiring and indicators",
      },
      headingLines: [
        "Detection, alarm and",
        "security working as",
        "one building system",
      ],
      subtitle:
        "Designed alongside electrical and HVAC, not squeezed in at fit-out.",
      blocks: [
        {
          label: "Coverage",
          description:
            "Detectors, speakers and cameras placed for real coverage of every room, corridor and stair.",
          ...PROJECTS_LINK,
        },
        {
          label: "Integration",
          description:
            "Fire alarm signals drive fan shutdown, lift homing and door release as one sequence.",
          ...CONTACT_LINK,
        },
      ],
    },
    systems: [
      {
        tag: "Detection",
        title: "Addressable fire alarm",
        description: "Detectors, call points, sounders and panel locations.",
      },
      {
        tag: "Evacuation",
        title: "Public address & voice evacuation",
        description: "Speaker coverage and zoning for emergencies.",
      },
      {
        tag: "Security",
        title: "CCTV surveillance",
        description: "Camera coverage, recording and network design.",
      },
      {
        tag: "Security",
        title: "Access control",
        description: "Readers and controllers with fire alarm door release.",
      },
      {
        tag: "Networks",
        title: "Structured cabling & data",
        description: "Backbone, horizontal cabling, racks and containment.",
      },
      {
        tag: "Integration",
        title: "Building management interfaces",
        description: "Fire alarm links to HVAC, lifts and access control.",
      },
    ],
    standards: ["NBC", "IS 2189", "NFPA 72", "Fire authority"],
    faqs: [
      {
        question: "What is included in ELV design?",
        answer:
          "Fire alarm, public address, CCTV, access control and structured cabling, plus the containment that carries them.",
      },
      {
        question: "Is the fire alarm part of fire NOC approval?",
        answer:
          "Yes. Fire detection and alarm layouts are reviewed with the fire fighting design for the NOC.",
      },
      {
        question: "Can ELV be designed after the electrical design is done?",
        answer:
          "It can, but designing both together avoids shared containment and power issues later.",
      },
    ],
  },

  electrical: {
    code: "Electrical",
    metaTitle:
      "Electrical Design Consultants in Chennai | HT & LT Systems | PKM Consultants",
    metaDescription:
      "Electrical design by PKM Consultants, Chennai: HT and LT power distribution, SLDs, load calculations, lighting, substations, DG sets and earthing for commercial, industrial and high-rise buildings.",
    heroTitle: ["Electrical design", "from substation", "to switch"],
    heroIntro:
      "HT and LT power, lighting and earthing designed from calculated loads, with SLDs and BOQs ready for tender.",
    heroImage: {
      src: "/images/electrical.jpg",
      alt: "Electrical panels in a plant room",
    },
    reveal: {
      image: {
        src: "/images/certification.jpg",
        alt: "Engineer reviewing an electrical single line diagram on a tablet",
      },
      headingLines: [
        "Power distribution",
        "calculated, documented",
        "and safe to run",
      ],
      subtitle:
        "Cable trays, rising mains and panel rooms coordinated with every other service.",
      blocks: [
        {
          label: "Loads",
          description:
            "Connected and demand loads set transformer, DG and cable sizes, so nothing is oversized.",
          ...PROJECTS_LINK,
        },
        {
          label: "Documents",
          description:
            "Single line diagrams, load schedules and BOQs are issued with every design.",
          ...CONTACT_LINK,
        },
      ],
    },
    systems: [
      {
        tag: "HT",
        title: "Substation & transformers",
        description: "HT supply, transformer sizing and substation layouts.",
      },
      {
        tag: "Backup",
        title: "DG sets & UPS",
        description: "Standby power for essential and critical loads.",
      },
      {
        tag: "LT",
        title: "LT distribution & SLDs",
        description: "Panels, rising mains and single line diagrams.",
      },
      {
        tag: "Interiors",
        title: "Lighting & power layouts",
        description: "Lighting to lux levels, switching and power outlets.",
      },
      {
        tag: "Containment",
        title: "Cable trays & trenches",
        description: "Cable sizing and routes coordinated with structure.",
      },
      {
        tag: "Safety",
        title: "Earthing & lightning protection",
        description: "Earth pits, bonding and lightning protection.",
      },
    ],
    standards: ["NBC Part 8", "NEC", "CEA", "IS 3043", "ECBC"],
    faqs: [
      {
        question: "What is the difference between HT and LT electrical design?",
        answer:
          "HT covers the incoming supply, transformers and substation. LT covers everything after: panels, distribution, lighting and power.",
      },
      {
        question: "Do you prepare the electrical BOQ?",
        answer:
          "Yes. Every design is issued with a single line diagram, load schedule and bill of quantities.",
      },
      {
        question: "Can you size the DG set and transformer for my project?",
        answer:
          "Yes. We calculate connected and demand loads, then size the transformer, DG set and UPS.",
      },
    ],
  },
};
