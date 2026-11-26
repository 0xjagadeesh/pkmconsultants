import { urlFor } from "@workspace/sanity/client";
import type { QueryBlogSlugPageDataResult } from "@workspace/sanity/types";
import { stegaClean } from "next-sanity";
import type {
  Answer,
  Article,
  ContactPoint,
  FAQPage,
  ImageObject,
  Organization,
  Person,
  Question,
  WebPage,
  WebSite,
  WithContext,
} from "schema-dts";

import { getBaseUrl } from "@/utils";

/** Site owner details used in structured data (matches footer / contact). */
const PKM_ORGANIZATION = {
  name: "PKM Consultants",
  description:
    "PKM Consultants – MEPF design and engineering consultancy based in Chennai, India.",
  email: "info@pkmconsultants.in",
  address: {
    streetAddress: "Plot No. 34, Rayal Castle Phase 1, Kolapancheri",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600072",
    addressCountry: "IN",
  },
};

type RichTextChild = {
  _type: string;
  text?: string;
  marks?: string[];
  _key: string;
};

type RichTextBlock = {
  _type: string;
  children?: RichTextChild[];
  style?: string;
  _key: string;
};

// Flexible FAQ type that can accept different rich text structures
type FlexibleFaq = {
  _id: string;
  title: string;
  richText?: RichTextBlock[] | null;
};

// Utility function to safely extract plain text from rich text blocks
function extractPlainTextFromRichText(
  richText: RichTextBlock[] | null | undefined
): string {
  if (!Array.isArray(richText)) {
    return "";
  }

  return richText
    .filter((block) => block._type === "block" && Array.isArray(block.children))
    .map(
      (block) =>
        block.children
          ?.filter((child) => child._type === "span" && Boolean(child.text))
          .map((child) => child.text)
          .join("") ?? ""
    )
    .join(" ")
    .trim();
}

// Utility function to safely render JSON-LD
export function JsonLdScript<T>({ data, id }: { data: T; id: string }) {
  return (
    <script id={id} type="application/ld+json">
      {JSON.stringify(data, null, 0)}
    </script>
  );
}

// FAQ JSON-LD Component
type FaqJsonLdProps = {
  faqs: FlexibleFaq[];
};

export function FaqJsonLd({ faqs }: FaqJsonLdProps) {
  if (!faqs?.length) {
    return null;
  }

  const validFaqs = stegaClean(
    faqs.filter((faq) => faq?.title && faq?.richText)
  );

  if (!validFaqs.length) {
    return null;
  }

  const faqJsonLd: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: validFaqs.map(
      (faq): Question => ({
        "@type": "Question",
        name: faq.title,
        acceptedAnswer: {
          "@type": "Answer",
          text: extractPlainTextFromRichText(faq.richText),
        } as Answer,
      })
    ),
  };

  return <JsonLdScript data={faqJsonLd} id="faq-json-ld" />;
}

const IMAGE_SIZE_WIDTH = 1920;
const IMAGE_SIZE_HEIGHT = 1080;
const IMAGE_QUALITY = 80;

function buildSafeImageUrl(image?: { id?: string | null }) {
  if (!image?.id) {
    return;
  }
  return urlFor({ ...image, _id: image.id })
    .size(IMAGE_SIZE_WIDTH, IMAGE_SIZE_HEIGHT)
    .dpr(2)
    .auto("format")
    .quality(IMAGE_QUALITY)
    .url();
}

// Article JSON-LD Component
type ArticleJsonLdProps = {
  article: QueryBlogSlugPageDataResult;
};
export function ArticleJsonLd({ article: rawArticle }: ArticleJsonLdProps) {
  if (!rawArticle) {
    return null;
  }
  const article = stegaClean(rawArticle);

  const baseUrl = getBaseUrl();
  const articleUrl = `${baseUrl}${article.slug}`;
  const imageUrl = buildSafeImageUrl(article.image);

  const articleJsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description || undefined,
    image: imageUrl ? [imageUrl] : undefined,
    author: article.authors
      ? [
          {
            "@type": "Person",
            name: article.authors.name,
            url: `${baseUrl}`,
            image: article.authors.image
              ? ({
                  "@type": "ImageObject",
                  url: buildSafeImageUrl(article.authors.image),
                } as ImageObject)
              : undefined,
          } as Person,
        ]
      : [],
    publisher: {
      "@type": "Organization",
      name: PKM_ORGANIZATION.name,
    } as Organization,
    datePublished: new Date(
      article.publishedAt || article._createdAt || new Date().toISOString()
    ).toISOString(),
    dateModified: new Date(
      article._updatedAt || new Date().toISOString()
    ).toISOString(),
    url: articleUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    } as WebPage,
  };

  return (
    <JsonLdScript data={articleJsonLd} id={`article-json-ld-${article.slug}`} />
  );
}

// Organization JSON-LD Component — PKM Consultants details live in code
// (the Sanity "settings" document still holds template seed data).
export function OrganizationJsonLd() {
  const baseUrl = getBaseUrl();

  const organizationJsonLd: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: PKM_ORGANIZATION.name,
    description: PKM_ORGANIZATION.description,
    url: baseUrl,
    email: PKM_ORGANIZATION.email,
    address: {
      "@type": "PostalAddress",
      ...PKM_ORGANIZATION.address,
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: PKM_ORGANIZATION.email,
      contactType: "customer service",
      areaServed: "IN",
    } as ContactPoint,
  };

  return <JsonLdScript data={organizationJsonLd} id="organization-json-ld" />;
}

// Website JSON-LD Component
export function WebSiteJsonLd() {
  const baseUrl = getBaseUrl();

  const websiteJsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: PKM_ORGANIZATION.name,
    description: PKM_ORGANIZATION.description,
    url: baseUrl,
    publisher: {
      "@type": "Organization",
      name: PKM_ORGANIZATION.name,
    } as Organization,
  };

  return <JsonLdScript data={websiteJsonLd} id="website-json-ld" />;
}

// Combined JSON-LD Component for site-wide structured data
type CombinedJsonLdProps = {
  includeWebsite?: boolean;
  includeOrganization?: boolean;
};

export function CombinedJsonLd({
  includeWebsite = false,
  includeOrganization = false,
}: CombinedJsonLdProps) {
  return (
    <>
      {includeWebsite && <WebSiteJsonLd />}
      {includeOrganization && <OrganizationJsonLd />}
    </>
  );
}
