"use client";

import { MaskRevealText } from "./mask-reveal-text";
import { ButtonZoomIn } from "./buttonzoomin";
import { ImageClipReveal } from "./image-clip-reveal";

export interface MatrixSectionProps {
  /** Section title headline (string or array of lines) */
  title: string | string[];
  /** Detailed narrative description */
  description: string;
  /** Destination link (internal route or external URL) */
  link?: string;
  /** Label for the architectural action button */
  linkLabel?: string;
  /** Image source URL or local path */
  imageUrl?: string;
  /** Accessible image alt description */
  imageAlt?: string;
  /**
   * Position of the image relative to the content on desktop:
   * - 'right': Content on Left, Image on Right (default)
   * - 'left': Image on Left, Content on Right
   */
  imagePosition?: "left" | "right";
  /** Optional layout direction alias ('left' | 'right') */
  direction?: "left" | "right";
  /** Optional extra container class name */
  className?: string;
  /** Optional background color class (defaults to bg-[#f2f1ed]) */
  bgClass?: string;
  /** Optional button variant ('white' | 'black') */
  buttonVariant?: "white" | "black";
  /** Optional custom button outline color */
  buttonOutlineColor?: string;
  /** Optional custom button accent color */
  buttonAccentColor?: string;
}

const DEFAULT_IMAGE = "/images/coor-section-2-pkm.gif";
const DEFAULT_ALT = "MEPF engineering on site";

/**
 * MatrixSection / MatrixSplitSection
 *
 * An editorial architectural two-column showcase section featuring:
 * - Clear, continuous structural divider line (border-r / border-b border-[#121212]/20).
 * - Sticky text column that stays locked in viewport while scrolling.
 * - ImageClipReveal with architectural crosshair tracking (X/Y scaled to 90% of container size).
 * - Dual-layer ArchitecturalButton with vertical compartment divider.
 */
export function MatrixSection({
  title,
  description,
  link,
  linkLabel = "Learn more",
  imageUrl = DEFAULT_IMAGE,
  imageAlt = DEFAULT_ALT,
  imagePosition,
  direction,
  className = "",
  bgClass = "bg-[#f7fbff]",
  buttonVariant,
  buttonOutlineColor,
  buttonAccentColor,
}: MatrixSectionProps) {
  // Resolve effective layout alignment (defaults to image on the right)
  const position = imagePosition || direction || "right";
  const isImageLeft = position === "left";

  const titleLines = Array.isArray(title)
    ? title
    : typeof title === "string"
      ? title.split("\n")
      : [String(title)];

  const isExternalLink = link?.startsWith("http://") || link?.startsWith("https://");

  /* ── Content Column: Sticky narrative block ── */
  const ContentColumn = (
    <div className="w-full h-full flex flex-col justify-start py-6 px-4">
      <div className="max-w-[540px]">
        {/* Mask Title with one-time animation */}
        <MaskRevealText
          as="h2"
          className="font-metropolis text-[#121212] font-medium text-[clamp(2.1rem,4vw,3.4rem)] leading-[1.08] tracking-[-0.035em] m-0"
          lines={titleLines}
          maskColor="#121212"
          duration={0.9}
          stagger={0.12}
          replayOnScroll={false}
        />

        {/* Narrative Description */}
        <p className="text-[0.92rem] sm:text-[0.98rem] lg:text-[1.02rem] leading-[1.68] text-[#121212]/80 font-metropolis mt-6 lg:mt-8 mb-8 lg:mb-10 m-0">
          {description}
        </p>

        {/* Ghost Black Architectural Button */}
        {link && (
          <div>
            <ButtonZoomIn
              href={link}
              label={linkLabel}
              variant={buttonVariant || "white"}
              outlineColor={buttonOutlineColor}
              accentColor={buttonAccentColor}
              target={isExternalLink ? "_blank" : undefined}
              rel={isExternalLink ? "noopener noreferrer" : undefined}
            />
          </div>
        )}
      </div>
    </div>
  );

  /* ── Image Column: Architectural ImageClipReveal with crosshairs (matching scroll-reveal-split gap) ── */
  const ImageColumn = (
    <div className="relative w-full h-full min-h-[500px] sm:min-h-[600px] lg:min-h-[100svh] overflow-hidden bg-[#f7fbff]">
      <ImageClipReveal
        src={imageUrl || DEFAULT_IMAGE}
        alt={imageAlt || DEFAULT_ALT}
        fill
        zoomFrom={1.14}
        scrub={1.2}
        triggerStart="top 80%"
        triggerEnd="top 15%"
      />
    </div>
  );

  return (
    <section
      className={`matrix__section relative w-full ${bgClass} text-[#121212] border-b border-[#121212]/20 ${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 relative w-full min-h-[100svh]">
        {isImageLeft ? (
          <>
            {/* Left column: Image */}
            <div className="w-full h-full border-b lg:border-b-0 lg:border-r border-[#121212]/20">
              {ImageColumn}
            </div>
            {/* Right column: Content */}
            <div className="w-full h-full">
              {ContentColumn}
            </div>
          </>
        ) : (
          <>
            {/* Left column: Content */}
            <div className="w-full h-full border-b lg:border-b-0 lg:border-r border-[#121212]/20">
              {ContentColumn}
            </div>
            {/* Right column: Image */}
            <div className="w-full h-full">
              {ImageColumn}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/** Reusable aliases */
export const MatrixSplitSection = MatrixSection;
export const InteractiveSplitSection = MatrixSection;
