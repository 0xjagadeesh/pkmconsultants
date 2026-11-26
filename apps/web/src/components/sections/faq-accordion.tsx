import { Badge } from "@workspace/ui/components/badge";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import type { PagebuilderType } from "@/types";
import { FixedAccordion } from "../elements/fixed-accordion";
import { RichText } from "../elements/rich-text";
import { FaqJsonLd } from "../json-ld";

type FaqAccordionProps = PagebuilderType<"faqAccordion">;

export function FaqAccordion({
  eyebrow,
  title,
  subtitle,
  faqs,
  link,
}: FaqAccordionProps) {
  return (
    <section className="my-8" id="faq">
      <FaqJsonLd faqs={faqs} />
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex w-full flex-col items-center">
          <div className="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:text-center">
            {eyebrow && <Badge variant="secondary">{eyebrow}</Badge>}
            <h2 className="font-semibold text-3xl md:text-5xl">{title}</h2>
            <h3 className="text-balance font-normal text-[#374151] text-lg dark:text-zinc-400">
              {subtitle}
            </h3>
          </div>
        </div>
        <div className="mx-auto my-16 max-w-xl">
          <FixedAccordion
            answerClassName="pb-4 text-muted-foreground"
            iconClassName="size-3.5"
            itemClassName="border-b"
            items={(faqs ?? []).map((faq, index) => ({
              id: faq?._id ?? String(index),
              question: faq?.title,
              answer: (
                <RichText
                  className="text-sm md:text-base"
                  richText={faq?.richText ?? []}
                />
              ),
            }))}
            questionClassName="font-medium text-[15px] leading-6"
            triggerClassName="flex items-center justify-between gap-4 py-4"
          />

          {link?.href && (
            <div className="w-full py-6">
              <p className="mb-1 text-xs">{link?.title}</p>
              <Link
                className="flex items-center gap-2"
                href={link.href ?? "#"}
                target={link.openInNewTab ? "_blank" : "_self"}
              >
                <p className="font-medium text-[15px] leading-6">
                  {link?.description}
                </p>
                <span className="rounded-full border p-1">
                  <ArrowUpRight
                    className="text-[#374151] dark:text-neutral-300"
                    size={16}
                  />
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
