import Image from "next/image";

type ImageBandProps = {
  src: string;
  alt: string;
};

/**
 * Short full-bleed image strip between sections (Enerblock image separator).
 * Static on purpose: no scroll animation.
 */
export function ImageBand({ src, alt }: ImageBandProps) {
  return (
    <div className="relative h-[180px] w-full overflow-hidden border-[#121212]/15 border-b sm:h-[220px] lg:h-[260px]">
      <Image
        alt={alt}
        className="rounded-none object-cover"
        fill
        sizes="100vw"
        src={src}
      />
    </div>
  );
}
