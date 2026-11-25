import { LineButton } from "@/components/blocks/line-button";
import { SectionLabel } from "@/components/blocks/section-label";

export type Office = {
  name: string;
  description: string;
  addressLines: string[];
  phone?: { label: string; href: string };
  email?: { label: string; href: string };
  mapUrl?: string;
};

/** PKM Consultants offices. Shared by the About and Contact pages. */
export const PKM_OFFICES: Office[] = [
  {
    name: "Design office",
    description:
      "MEPF design, technical coordination and project delivery for commercial, industrial and high-rise buildings across India.",
    addressLines: [
      "Plot No. 34, Rayal Castle Phase 1",
      "Kolapancheri, Poonamallee Taluk",
      "Tiruvallur District, Chennai 600 072",
    ],
    phone: { label: "+91 98765 43210", href: "tel:+919876543210" },
    email: {
      label: "info@pkmconsultants.in",
      href: "mailto:info@pkmconsultants.in",
    },
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Kolapancheri%2C+Poonamallee%2C+Chennai+600072",
  },
];

type LocationBlockProps = {
  title?: string;
  offices?: Office[];
};

/** Dark "Where we are" block (Enerblock location pattern). */
export function LocationBlock({
  title = "Where we are",
  offices = PKM_OFFICES,
}: LocationBlockProps) {
  return (
    <section className="border-white/15 border-b bg-[#0d0c11] text-white">
      <div className="grid grid-cols-1 lg:grid-cols-[35%_minmax(0,1fr)] xl:grid-cols-[480px_minmax(0,1fr)]">
        <div className="border-white/15 px-6 pt-12 pb-8 sm:px-10 lg:border-r lg:px-10 lg:py-16">
          <SectionLabel tone="dark">Location</SectionLabel>
          <h2 className="m-0 mt-6 font-extrabold font-metropolis text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1.08] tracking-[-0.03em]">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {offices.map((office, i) => (
            <address
              className={`flex flex-col gap-6 border-white/15 border-t px-6 py-10 not-italic sm:px-10 lg:min-h-[420px] lg:px-12 lg:py-16 ${
                i === 0 ? "lg:border-t-0" : ""
              } ${i % 2 === 1 ? "md:border-l" : ""}`}
              key={office.name}
            >
              <p className="m-0 font-bold font-mosvita text-[0.8rem] text-white/70 uppercase tracking-[0.2em]">
                {office.name}
              </p>
              <p className="m-0 max-w-[40ch] text-[1rem] text-white/80 leading-[1.6]">
                {office.description}
              </p>
              <div className="mt-auto flex flex-col gap-1 text-[1.05rem] leading-[1.6]">
                {office.addressLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
                {office.phone ? (
                  <a
                    className="mt-3 inline-flex min-h-11 items-center hover:text-[#dedcff] lg:pointer-fine:min-h-0"
                    href={office.phone.href}
                  >
                    {office.phone.label}
                  </a>
                ) : null}
                {office.email ? (
                  <a
                    className="inline-flex min-h-11 items-center [overflow-wrap:anywhere] hover:text-[#dedcff] lg:pointer-fine:min-h-0"
                    href={office.email.href}
                  >
                    {office.email.label}
                  </a>
                ) : null}
              </div>
              {office.mapUrl ? (
                <div>
                  <LineButton
                    external
                    href={office.mapUrl}
                    label="View on map"
                    tone="dark"
                  />
                </div>
              ) : null}
            </address>
          ))}
        </div>
      </div>
    </section>
  );
}
