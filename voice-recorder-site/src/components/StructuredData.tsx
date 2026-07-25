import { site } from "@/lib/site";
import { faqs } from "@/lib/faq";

const organization = {
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.fullName,
  url: site.url,
  logo: `${site.url}${site.basePath}/icon.svg`,
  sameAs: [
    "https://twitter.com/auravoice",
    "https://www.instagram.com/auravoice",
  ],
};

const product = {
  "@type": "Product",
  "@id": `${site.url}/#product`,
  name: site.fullName,
  description: site.description,
  brand: { "@type": "Brand", name: site.name },
  image: `${site.url}${site.basePath}${site.ogImage}`,
  offers: {
    "@type": "Offer",
    priceCurrency: site.price.currency,
    price: site.price.amount,
    availability: "https://schema.org/InStock",
    url: `${site.url}${site.basePath}#pricing`,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "2148",
  },
};

const faq = {
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const breadcrumb = {
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: site.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: site.fullName,
      item: `${site.url}${site.basePath}`,
    },
  ],
};

const speakable = {
  "@type": "WebPage",
  "@id": `${site.url}${site.basePath}#webpage`,
  url: `${site.url}${site.basePath}`,
  name: site.fullName,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["[data-speakable-title]", "[data-speakable-summary]"],
  },
};

const graph = {
  "@context": "https://schema.org",
  "@graph": [organization, product, faq, breadcrumb, speakable],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
