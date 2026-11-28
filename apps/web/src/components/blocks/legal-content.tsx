import Link from "next/link";

import { SectionLabel } from "@/components/blocks/section-label";

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export type LegalSection = {
  /** Anchor id, e.g. "cookies" → /privacy#cookies */
  id: string;
  title: string;
  blocks: LegalBlock[];
};

type LegalContentProps = {
  sections: LegalSection[];
  /** Contact shown at the end of the document */
  contact: { email: string; address: string[] };
  /** Optional link to the companion document */
  related?: { href: string; label: string };
};

const EMAIL = /([\w.+-]+@[\w-]+\.[\w.]+)/g;

/** Turns any email address in a sentence into a mailto link. */
function withEmailLinks(text: string) {
  return text.split(EMAIL).map((part, i) =>
    i % 2 === 1 ? (
      <a
        className="text-[#261CC1] underline underline-offset-2 hover:text-[#1a1396]"
        href={`mailto:${part}`}
        key={part}
      >
        {part}
      </a>
    ) : (
      part
    )
  );
}

/**
 * Long-form legal document on the architectural grid: a sticky, numbered
 * table of contents on the left and numbered sections on the right.
 */
export function LegalContent({
  sections,
  contact,
  related,
}: LegalContentProps) {
  return (
    <section className="border-[#121212]/15 border-b bg-[#f7fbff] text-[#121212]">
      <div className="grid grid-cols-1 lg:grid-cols-[35%_minmax(0,1fr)] xl:grid-cols-[480px_minmax(0,1fr)]">
        {/* Contents */}
        <nav
          aria-label="Contents"
          className="border-[#121212]/15 border-b lg:border-r lg:border-b-0"
        >
          <div className="px-6 pt-12 pb-10 sm:px-10 lg:sticky lg:top-24 lg:px-10 lg:py-16">
            <SectionLabel>Contents</SectionLabel>
            <ol className="m-0 mt-6 grid list-none gap-1 p-0">
              {sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    className="group flex min-h-11 items-center gap-4 text-[#121212] text-[0.98rem] no-underline transition-colors hover:text-[#261CC1] lg:min-h-9"
                    href={`#${section.id}`}
                  >
                    <span className="w-6 shrink-0 font-bold font-mosvita text-[#261CC1] text-[0.8rem] tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        {/* Document */}
        <div>
          {sections.map((section, i) => (
            <article
              aria-labelledby={`${section.id}-title`}
              className={`scroll-mt-24 px-6 py-10 sm:px-10 lg:px-12 lg:py-12 ${
                i > 0 ? "border-[#121212]/15 border-t" : ""
              }`}
              id={section.id}
              key={section.id}
            >
              <h2
                className="m-0 flex items-baseline gap-4 font-extrabold font-metropolis text-[clamp(1.3rem,2.2vw,1.75rem)] leading-[1.2] tracking-[-0.025em]"
                id={`${section.id}-title`}
              >
                <span className="font-bold font-mosvita text-[#261CC1] text-[0.9rem] tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {section.title}
              </h2>
              <div className="mt-5 grid max-w-[70ch] gap-4 text-[#3a3846] text-[1rem] leading-[1.75]">
                {section.blocks.map((block) =>
                  block.type === "p" ? (
                    <p className="m-0" key={block.text}>
                      {withEmailLinks(block.text)}
                    </p>
                  ) : (
                    <ul
                      className="m-0 grid list-none gap-2.5 p-0"
                      key={block.items.join("|")}
                    >
                      {block.items.map((item) => (
                        <li className="flex gap-3" key={item}>
                          <span
                            aria-hidden="true"
                            className="mt-[0.7em] inline-block size-1.5 shrink-0 bg-[#261CC1]"
                          />
                          <span>{withEmailLinks(item)}</span>
                        </li>
                      ))}
                    </ul>
                  )
                )}
              </div>
            </article>
          ))}

          {/* Contact card */}
          <div className="border-[#121212]/15 border-t px-6 py-10 sm:px-10 lg:px-12 lg:py-12">
            <SectionLabel>Questions</SectionLabel>
            <address className="mt-5 grid gap-1 text-[#3a3846] text-[1rem] not-italic leading-[1.7]">
              <span className="font-semibold text-[#121212]">
                PKM Consultants
              </span>
              {contact.address.map((line) => (
                <span key={line}>{line}</span>
              ))}
              <a
                className="mt-2 w-fit text-[#261CC1] underline underline-offset-2 hover:text-[#1a1396]"
                href={`mailto:${contact.email}`}
              >
                {contact.email}
              </a>
            </address>
            {related ? (
              <p className="m-0 mt-8 text-[0.95rem]">
                See also{" "}
                <Link
                  className="text-[#261CC1] underline underline-offset-2 hover:text-[#1a1396]"
                  href={related.href}
                >
                  {related.label}
                </Link>
                .
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
