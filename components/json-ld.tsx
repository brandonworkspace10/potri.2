import { AGENTS } from "@/lib/agents";
import { FAQS } from "@/lib/faq";
import { SITE_NAME, SITE_URL, TEAM_PRICE } from "@/lib/config";

/**
 * Structured data for search engines and AI assistants.
 * Every claim mirrors what's rendered on the page — no orphan assertions.
 */
export function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        description:
          "AI employees for real estate investors and wholesalers — outbound acquisitions calling, 24/7 inbound reception, and back-office follow-up.",
        knowsLanguage: ["en", "es"],
        knowsAbout: [
          "Real estate wholesaling",
          "Real estate investing",
          "Seller lead qualification",
          "AI cold calling",
          "AI receptionist",
          "Acquisitions",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-US",
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/#service`,
        name: "Topri AI acquisitions team",
        serviceType: "AI phone agents for real estate investors and wholesalers",
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: "US",
        availableLanguage: ["English", "Spanish"],
        description:
          "Three specialized AI employees — outbound acquisitions calling, 24/7 inbound reception, and follow-up operations — deployed in under six days.",
        offers: {
          "@type": "Offer",
          name: "Full team — Andy + Randy + Alyssa",
          price: TEAM_PRICE,
          priceCurrency: "USD",
          description:
            "Outbound, inbound and back office together, billed flat per month. Final pricing confirmed after a scoping call.",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Topri AI employees",
          itemListElement: AGENTS.map((a) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: `${a.name} — ${a.role}`,
              description: a.desc,
            },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
