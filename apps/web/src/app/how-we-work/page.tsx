import type { Metadata } from "next";

import { DoubleCrossImage } from "@/components/blocks/double-cross-image";
import { IntroCross } from "@/components/blocks/intro-cross";
import { KeyPointsStack } from "@/components/blocks/key-points-stack";
import { MethodHero } from "@/components/blocks/method-hero";
import { PageCta } from "@/components/blocks/page-cta";
import { ParallaxBand } from "@/components/blocks/parallax-band";
import { ProcessSteps } from "@/components/blocks/process-steps";
import { ServiceNavList } from "@/components/blocks/service-nav-list";
import { ValuePillars } from "@/components/value-pillars";
import {
  APPROACH_BAND,
  APPROACH_DELIVERABLES,
  APPROACH_DELIVERS,
  APPROACH_HERO,
  APPROACH_IMAGES,
  APPROACH_INTRO,
  APPROACH_POINTS,
  APPROACH_STEPS,
  APPROACH_VIDEO_BAND,
} from "@/data/pkm-approach";
import { SCOPE_OF_SERVICES } from "@/data/pkm-portfolio";
import { getBaseUrl } from "@/utils";

export const metadata: Metadata = {
  title: "How We Work",
  description:
    "PKM Consultants' MEPF design method: load calculations, coordinated drawings, code review, approval drawings and site support in one continuous workflow.",
  alternates: { canonical: `${getBaseUrl()}/how-we-work` },
};

const DISCIPLINES = SCOPE_OF_SERVICES.map((service, i) => ({
  number: String(i + 1).padStart(2, "0"),
  title: service.discipline,
  href: `/services/${service.slug}`,
  icon: service.slug,
}));

/** Layout follows the Enerblock approach page, section for section. */
export default function HowWeWorkPage() {
  return (
    <>
      <MethodHero {...APPROACH_HERO} />

      <IntroCross {...APPROACH_INTRO} />

      {/* Full-screen coordination model (stands in for the reference video) */}
      <ParallaxBand
        alt={APPROACH_VIDEO_BAND.alt}
        heightClassName="h-svh"
        src={APPROACH_VIDEO_BAND.src}
        unoptimized
      />

      <KeyPointsStack points={APPROACH_POINTS} {...APPROACH_DELIVERS} />

      <DoubleCrossImage {...APPROACH_IMAGES} />

      <ProcessSteps
        id="process"
        intro="Our method turns each project into a sequence. Decisions are made at the stage where they cost least, so site work becomes installation, not correction."
        steps={APPROACH_STEPS}
        title="How we work"
      />

      <ValuePillars
        defaultOpenIndex={0}
        items={APPROACH_DELIVERABLES}
        pretitle="DELIVERABLES"
        titleLines={["What you receive", "at every stage", "of the design"]}
      />

      <ParallaxBand alt={APPROACH_BAND.alt} src={APPROACH_BAND.src} />

      <ServiceNavList
        items={DISCIPLINES}
        label="Disciplines"
        title={["The method covers", "every MEPF discipline"]}
      />

      <PageCta />
    </>
  );
}
