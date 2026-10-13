import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AnimatedCTAButton } from "@/components/animated-cta-button";
import { CursorTracker } from "@/components/cursor-tracker";
import { ImageParallaxSection } from "@/components/image-parallax-section";
import { Prefooter } from "@/components/prefooter";
import { SplitWordReveal } from "@/components/split-word-reveal";

export const metadata: Metadata = {
  title: "About us — PKM Consultants",
  description:
    "PKM Consultants is a Chennai-based MEPF design firm. We design HVAC, plumbing, electrical, fire protection and ELV systems as one coordinated process for commercial, industrial and high-rise buildings across India.",
};

/* ── CONTENT ─────────────────────────────────────────── */

// TODO: replace with the real team (or fetch from Sanity).
// Members without an `image` render a blueprint-grid placeholder.
const TEAM: { name: string; role: string; image?: string; }[] = [
  { name: "Full name", role: "Role" },
  { name: "Full name", role: "Role" },
  { name: "Full name", role: "Role" },
  { name: "Full name", role: "Role" },
];

const VALUES = [
  {
    title: "Speed & turnaround",
    description:
      "One fixed workflow means drawings and revisions arrive on a schedule you can plan around, from concept design to approval-ready sets.",
    href: "/services",
    linkLabel: "View our services",
    image: "/images/mep-design-process.webp",
    alt: "Engineer reviewing coordinated HVAC, electrical and plumbing drawings",
  },
  {
    title: "Budget precision",
    description:
      "Systems are sized from real load calculations, so you pay for the capacity the building needs and avoid costly rework on site.",
    href: "/projects",
    linkLabel: "View our projects",
    image: "/images/mep-project-experience.webp",
    alt: "High-rise commercial building with MEP services installed",
  },
  {
    title: "Code compliance & certification",
    description:
      "Designs are checked against the applicable codes before they leave the office, which keeps authority comments short and approvals moving.",
    href: "/contact",
    linkLabel: "Talk to our team",
    image: "/images/metal-structure.jpg",
    alt: "Metal structure on a construction site",
  },
];

const PROCESS = [
  {
    number: "01",
    title: "Load calculations",
    description:
      "Every design starts from the building's real cooling, power and water demand.",
  },
  {
    number: "02",
    title: "Coordinated drawings",
    description:
      "Mechanical, electrical, plumbing and fire services are drawn together so clashes show up on screen, not on site.",
  },
  {
    number: "03",
    title: "Internal quality checks",
    description:
      "Each drawing set is reviewed internally before it is issued.",
  },
  {
    number: "04",
    title: "Code compliance review",
    description:
      "Final drawings are checked against the applicable codes so they are ready for approval.",
  },
];

// TODO: fill in the real office details.
const OFFICE = {
  name: "Chennai office",
  description:
    "Design, technical coordination and project delivery for MEPF systems.",
  addressLines: ["Street address", "Chennai, Tamil Nadu"],
  phone: "",
  mapUrl: "",
};

/* ── SHARED CLASSES ──────────────────────────────────── */

const LABEL =
  "m-0 font-mosvita font-semibold text-[#261CC1] text-[0.95rem] leading-none";
const H2 =
  "m-0 font-extrabold font-metropolis text-[#1e1926] leading-[1.08] tracking-[-0.03em]";
const H2_SIZE = { fontSize: "clamp(1.9rem, 4vw, 3rem)" };
const BODY = "m-0 text-[#555555] text-[1.05rem] leading-[1.65]";
const GRID_BG = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)",
  backgroundSize: "10px 10px",
};

export default function AboutPage() {
  return (
    <>
      {/* ═══ ENERBLOCK-STYLE ARCHITECTURAL HERO (LOCKED TO EXACT SCREEN HEIGHT) ═══ */}
      <section className="relative h-screen max-h-screen max-h-dvh h-dvh bg-[#070f1a] text-white flex flex-col overflow-hidden border-b border-white/20">
        {/* Full-bleed architectural panoramic glass background */}
        <div className="absolute inset-0 z-0">
          <Image
            alt="Modern architectural glass building overlooking skyline"
            className="object-cover object-center brightness-[0.70] contrast-[1.1] saturate-[0.9]"
            fill
            priority
            sizes="100vw"
            src="/images/about-hero-bg.jpg"
          />
          {/* Subtle atmosphere & glass tint overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-black/45 via-slate-950/25 to-slate-950/75 backdrop-blur-[0.5px]"
          />
        </div>

        {/* 2x2 Grid with hairline crosshair dividing lines (fills exact viewport) */}
        <div className="relative z-10 grid flex-1 grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 h-full max-h-full overflow-hidden">
          {/* 1. TOP-LEFT QUADRANT: Company Eyebrow + Bold Headline */}
          <div className="relative flex flex-col justify-end p-6 pt-20 sm:p-8 sm:pt-24 lg:p-12 lg:pt-28 border-b border-white/20 lg:border-r border-white/20 overflow-hidden">
            <p className="m-0 font-mono text-xs uppercase tracking-[0.25em] text-white/70 font-semibold mb-3 sm:mb-4">
              COMPANY
            </p>
            <SplitWordReveal
              as="h1"
              className="m-0 max-w-[16ch] font-extrabold font-metropolis text-white leading-[1.08] tracking-[-0.035em]"
              style={{ fontSize: "clamp(1.9rem, 3.6vw, 3.5rem)" }}
              text="We industrialize construction through a digitalized methodology"
              delay={0.15}
              stagger={0.03}
              hoverColor="#38bdf8"
            />
          </div>

          {/* 2. TOP-RIGHT QUADRANT: Empty area with Cursor Tracker */}
          <div className="relative hidden lg:block border-b border-white/20 h-full overflow-hidden">
            <CursorTracker theme="dark" syncId="about-hero" />
          </div>

          {/* 3. BOTTOM-LEFT QUADRANT: Empty area with Cursor Tracker */}
          <div className="relative hidden lg:block border-r border-white/20 h-full overflow-hidden">
            <CursorTracker theme="dark" syncId="about-hero" />
          </div>

          {/* 4. BOTTOM-RIGHT QUADRANT: Strategic Paragraph Description */}
          <div className="relative flex flex-col justify-center p-6 sm:p-8 lg:p-12 border-t border-white/20 lg:border-t-0 h-full overflow-hidden">
            <p className="m-0 text-white/90 text-[1rem] sm:text-[1.125rem] lg:text-[1.2rem] leading-[1.55] font-normal max-w-[540px]">
              We deliver certainty through industrialized, digitized components that connect design, architecture, engineering, production, assembly and certification—ensuring measurable results in every project.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ WHAT IS PKM ═══ */}
      <section className="grid border-[#121212]/15 border-b bg-[#f7fbff] lg:grid-cols-[35%_1fr] xl:grid-cols-[480px_1fr]">
        <div className="px-5 pt-14 lg:border-[#121212]/15 lg:border-r lg:px-10 lg:pt-20">
          <p className={`${LABEL} lg:sticky lg:top-28`}>
            What is PKM Consultants?
          </p>
        </div>
        <div className="grid gap-10 px-5 py-10 lg:grid-cols-2 lg:gap-14 lg:px-14 lg:py-20">
          <div className="flex flex-col gap-6">
            <h2 className={H2} style={H2_SIZE}>
              MEPF design built for certainty on site
            </h2>
            <p className={BODY}>
              Building services projects often lose time to clashes between
              trades, late revisions and drawings that fail review. We
              coordinate mechanical, electrical, plumbing and fire protection
              design in one process so each trade has the information it needs
              before drawings are issued.
            </p>
            <p className={BODY}>
              Our work covers commercial, industrial and high-rise buildings
              across India, from concept design through approval-ready drawings
              and site support.
            </p>
          </div>
          <div className="relative aspect-[4/5] w-full">
            <Image
              alt="High-rise commercial building with MEP services installed"
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 30vw, 100vw"
              src="/images/mep-project-experience.webp"
            />
          </div>
        </div>
      </section>

      {/* ═══ PURPOSE ═══ */}
      <section className="relative overflow-hidden bg-[#261CC1] px-5 py-20 lg:px-10 lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.1]"
          style={GRID_BG}
        />
        <div className="relative mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[35%_1fr] xl:grid-cols-[480px_1fr]">
          <p className="m-0 font-mosvita font-semibold text-[#f7fbff] text-[0.95rem] leading-none">
            Purpose
          </p>
          <h2
            className="m-0 max-w-[24ch] font-extrabold font-metropolis text-[#f7fbff] leading-[1.1] tracking-[-0.03em]"
            style={{ fontSize: "clamp(1.9rem, 4.2vw, 3.4rem)" }}
          >
            Deliver MEPF designs that are coordinated, code-compliant and ready
            for site on every project.
          </h2>
        </div>
      </section>

      <ImageParallaxSection
        alt="Metal structure on a construction site"
        image="/images/metal-structure.jpg"
      />

      {/* ═══ TEAM ═══ */}
      <section className="border-[#121212]/15 border-b bg-[#f7fbff]">
        <div className="grid gap-6 px-5 pt-14 pb-10 lg:grid-cols-[35%_1fr] lg:gap-0 lg:px-0 lg:pt-20 lg:pb-14 xl:grid-cols-[480px_1fr]">
          <h2 className={`${H2} lg:px-10`} style={H2_SIZE}>
            A team that works as a system
          </h2>
          <p className={`${BODY} max-w-[560px] lg:px-14`}>
            Design only works when every discipline works in step. Our
            engineers and designers share one workflow, one set of standards
            and one review process.
          </p>
        </div>
        <ul className="m-0 grid list-none gap-px border-[#121212]/15 border-t bg-[#121212]/15 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member, index) => (
            <li
              className="bg-[#f7fbff]"
              key={`${member.name}-${member.role}-${index}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#dedcff]/60">
                {member.image ? (
                  <Image
                    alt={member.name}
                    className="object-cover"
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    src={member.image}
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-[0.25]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(38,28,193,0.5) 1px,transparent 1px), linear-gradient(90deg,rgba(38,28,193,0.5) 1px,transparent 1px)",
                      backgroundSize: "10px 10px",
                    }}
                  />
                )}
              </div>
              <div className="px-5 py-5">
                <p className="m-0 font-bold font-metropolis text-[#1e1926] text-[1.05rem]">
                  {member.name}
                </p>
                <p className="m-0 mt-1 text-[#555555] text-[0.95rem]">
                  {member.role}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ═══ VALUE ═══ */}
      <section className="border-[#121212]/15 border-b bg-[#f7fbff]">
        <div className="grid gap-6 px-5 pt-14 pb-10 lg:grid-cols-[35%_1fr] lg:gap-0 lg:px-0 lg:pt-20 lg:pb-14 xl:grid-cols-[480px_1fr]">
          <p className={`${LABEL} lg:px-10`}>Value</p>
          <h2
            className={`${H2} max-w-[22ch] lg:px-14`}
            style={H2_SIZE}
          >
            Guarantees that keep design on schedule, on budget and on code
          </h2>
        </div>
        <ul className="m-0 grid list-none gap-px border-[#121212]/15 border-t bg-[#121212]/15 p-0 lg:grid-cols-3">
          {VALUES.map((item) => (
            <li className="flex flex-col gap-5 bg-[#f7fbff] p-5 lg:p-8" key={item.title}>
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  alt={item.alt}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  src={item.image}
                />
              </div>
              <h3 className="m-0 font-bold font-metropolis text-[#261CC1] text-[1.3rem] leading-[1.25]">
                {item.title}
              </h3>
              <p className={`${BODY} text-[1rem]`}>{item.description}</p>
              <Link
                className="mt-auto font-bold font-mosvita text-[#261CC1] text-[0.85rem] tracking-[0.08em] underline-offset-4 hover:underline"
                href={item.href}
              >
                {item.linkLabel}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="border-[#121212]/15 border-b bg-[#f7fbff]">
        <div className="grid gap-6 px-5 pt-14 pb-10 lg:grid-cols-[35%_1fr] lg:gap-0 lg:px-0 lg:pt-20 lg:pb-14 xl:grid-cols-[480px_1fr]">
          <h2 className={`${H2} lg:px-10`} style={H2_SIZE}>
            The same process on every project
          </h2>
          <div className="flex flex-col items-start gap-8 lg:px-14">
            <p className={`${BODY} max-w-[560px]`}>
              Every project follows one design workflow. Drawings stay
              consistent, revisions are traceable, and each project is delivered
              to the same standard.
            </p>
            <AnimatedCTAButton
              className="inline-flex items-center justify-between self-start overflow-hidden bg-[#261CC1] px-5 py-3 font-bold font-mosvita text-[#f7fbff] text-[0.85rem] uppercase tracking-[0.08em] no-underline"
              href="/contact"
              label="Request a consultation"
              style={{ minWidth: "120px" }}
            />
          </div>
        </div>
        <ol className="m-0 grid list-none gap-px border-[#261CC1]/80 border-t-[1.2px] bg-[#261CC1]/30 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step) => (
            <li
              className="flex min-h-[260px] flex-col justify-between gap-10 bg-[#f7fbff] px-5 py-8 lg:px-8"
              key={step.number}
            >
              <span className="font-extrabold font-metropolis text-[#261CC1] text-[2.2rem] leading-none tracking-[-0.03em]">
                {step.number}
              </span>
              <div>
                <h3 className="m-0 mb-2 font-bold font-metropolis text-[#1e1926] text-[1.15rem] leading-[1.25]">
                  {step.title}
                </h3>
                <p className="m-0 text-[#555555] text-[0.95rem] leading-[1.6]">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ═══ LOCATION ═══ */}
      <section className="grid border-[#121212]/15 border-b bg-[#f7fbff] lg:grid-cols-[35%_1fr] xl:grid-cols-[480px_1fr]">
        <div className="flex flex-col gap-6 px-5 pt-14 lg:border-[#121212]/15 lg:border-r lg:px-10 lg:py-20">
          <p className={LABEL}>Location</p>
          <h2 className={H2} style={H2_SIZE}>
            Where we are
          </h2>
        </div>
        <div className="px-5 py-10 lg:px-14 lg:py-20">
          <div className="flex max-w-[520px] flex-col gap-4">
            <h3 className="m-0 font-bold font-metropolis text-[#261CC1] text-[1.3rem]">
              {OFFICE.name}
            </h3>
            <p className={`${BODY} text-[1rem]`}>{OFFICE.description}</p>
            <address className="not-italic text-[#1e1926] leading-[1.6]">
              {OFFICE.addressLines.map((line) => (
                <span className="block" key={line}>
                  {line}
                </span>
              ))}
            </address>
            {OFFICE.phone ? (
              <a
                className="font-bold text-[#1e1926] no-underline hover:underline"
                href={`tel:${OFFICE.phone.replace(/\s/g, "")}`}
              >
                {OFFICE.phone}
              </a>
            ) : null}
            {OFFICE.mapUrl ? (
              <a
                className="font-bold font-mosvita text-[#261CC1] text-[0.85rem] tracking-[0.08em] underline-offset-4 hover:underline"
                href={OFFICE.mapUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                View on map
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <Prefooter />
    </>
  );
}