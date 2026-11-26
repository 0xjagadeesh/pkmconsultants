import type { Metadata } from "next";

import { LocationBlock, PKM_OFFICES } from "@/components/blocks/location-block";
import { SectionLabel } from "@/components/blocks/section-label";
import { MaskRevealText } from "@/components/mask-reveal-text";
import { ContactStepsForm } from "./_components/contact-steps-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell PKM Consultants about your project. We advise on MEPF design scope for HVAC, plumbing, electrical, fire protection and ELV systems across India.",
};

const office = PKM_OFFICES[0];

export default function ContactPage() {
  return (
    <>
      {/* ── Enquiry: intro + 3-step form ── */}
      <section className="border-[#121212]/15 border-b bg-[#f7fbff] text-[#121212]">
        <div className="grid grid-cols-1 pt-24 lg:grid-cols-[35%_minmax(0,1fr)] lg:pt-36 xl:grid-cols-[480px_minmax(0,1fr)]">
          <div className="flex flex-col justify-between gap-12 border-[#121212]/15 border-b px-6 pb-12 sm:px-10 lg:border-r lg:border-b-0 lg:px-10 lg:pb-16">
            <div>
              <SectionLabel>Contact</SectionLabel>
              <MaskRevealText
                as="h1"
                className="m-0 mt-8 font-extrabold font-metropolis text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.04] tracking-[-0.035em]"
                delay={0.15}
                scrollTrigger={false}
                text="Tell us about your project"
              />
              <p className="m-0 mt-8 max-w-[40ch] text-[#555555] text-[1.02rem] leading-[1.7]">
                Share a few details and we will advise on the right MEPF design
                scope, codes and timeline for your building.
              </p>
            </div>

            {/* Direct contact */}
            <dl className="m-0 grid gap-6">
              {office?.email ? (
                <div>
                  <dt className="font-bold font-mosvita text-[#5b5a8a] text-[0.7rem] uppercase tracking-[0.18em]">
                    Email
                  </dt>
                  <dd className="m-0 mt-1">
                    <a
                      className="inline-flex min-h-11 items-center font-metropolis font-semibold text-[1.1rem] [overflow-wrap:anywhere] hover:text-[#261CC1] lg:pointer-fine:min-h-0"
                      href={office.email.href}
                    >
                      {office.email.label}
                    </a>
                  </dd>
                </div>
              ) : null}
              {office?.phone ? (
                <div>
                  <dt className="font-bold font-mosvita text-[#5b5a8a] text-[0.7rem] uppercase tracking-[0.18em]">
                    Phone
                  </dt>
                  <dd className="m-0 mt-1">
                    <a
                      className="inline-flex min-h-11 items-center font-metropolis font-semibold text-[1.1rem] hover:text-[#261CC1] lg:pointer-fine:min-h-0"
                      href={office.phone.href}
                    >
                      {office.phone.label}
                    </a>
                  </dd>
                </div>
              ) : null}
              <div>
                <dt className="font-bold font-mosvita text-[#5b5a8a] text-[0.7rem] uppercase tracking-[0.18em]">
                  Response time
                </dt>
                <dd className="m-0 mt-1 font-metropolis font-semibold text-[1.1rem]">
                  Within one business day
                </dd>
              </div>
            </dl>
          </div>

          <div className="px-6 py-12 sm:px-10 lg:px-12 lg:pt-0 lg:pb-16">
            <ContactStepsForm />
          </div>
        </div>
      </section>

      <LocationBlock />
    </>
  );
}
