import type { Metadata } from "next";
import { SITE_URL } from "@/lib/config";
import { Block, LegalPage } from "../legal-layout";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms for using the Potri website: what the published pricing means, what we do and don't promise, and trademark notices.",
  alternates: { canonical: "/terms" },
  openGraph: { url: `${SITE_URL}/terms`, title: "Terms of Use | Potri" },
};

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms of Use" updated="July 17, 2026">
      <Block title="What this site is">
        <p>
          This website describes the Potri service — AI phone and operations agents for
          real estate investors and wholesalers — and lets you book a scoping call. It is
          informational. Using the site does not create a service agreement; that happens
          in writing, after a scoping call.
        </p>
      </Block>

      <Block title="Pricing shown on this site">
        <p>
          Published prices are real but indicative: each agent&apos;s final monthly price
          is confirmed after the scoping call, within the ranges shown, based on call
          volume, integrations, and scope. The full-team price is a flat monthly rate.
          Prices may change for future clients; a signed agreement fixes yours.
        </p>
      </Block>

      <Block title="What we deliberately do not promise">
        <p>
          Potri answers, qualifies, and follows up. It does not close deals, and we make
          no claim about how many deals, appointments, or dollars any client will get.
          The ROI calculator on this site performs arithmetic on numbers you enter — it
          is your model of your business, not a forecast by us. Any figures it shows are
          illustrations of your own assumptions.
        </p>
      </Block>

      <Block title="Compliance responsibilities">
        <p>
          Outbound calling to consumers is regulated (including under TCPA and state
          equivalents). How the agents are configured for your lead sources, consent
          basis, calling hours, and disclosures is scoped with you during onboarding.
          This website does not constitute legal advice, and operating lawfully with
          your data and your lists remains your responsibility as the client.
        </p>
      </Block>

      <Block title="Trademarks">
        <p>
          Third-party product names and logos on this site — CRMs, dialers, calendars,
          and other tools — belong to their respective owners. They appear to describe
          what Potri can be built around, and do not imply certification, partnership,
          or endorsement by those companies.
        </p>
      </Block>

      <Block title="Intellectual property">
        <p>
          The content, design, and branding of this site belong to Potri. Don&apos;t
          scrape it into your own marketing or pass it off as yours.
        </p>
      </Block>

      <Block title="No warranties; limitation of liability">
        <p>
          The site is provided as-is. We work to keep it accurate, but we don&apos;t
          warrant that every detail is current at every moment. To the maximum extent
          permitted by law, we aren&apos;t liable for decisions made on the basis of
          this website alone — the scoping call exists precisely so your specifics get
          addressed before any commitment.
        </p>
      </Block>

      <Block title="Changes">
        <p>These terms may be updated; the date above reflects the current version.</p>
      </Block>
    </LegalPage>
  );
}
