import type { Metadata } from "next";
import { SITE_URL } from "@/lib/config";
import { Block, LegalPage } from "../legal-layout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Potri handles information on this website: what we collect, what we don't, and the third parties involved.",
  alternates: { canonical: "/privacy" },
  openGraph: { url: `${SITE_URL}/privacy`, title: "Privacy Policy | Potri" },
};

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" updated="July 17, 2026">
      <Block title="The short version">
        <p>
          This website is a marketing site. It has no sign-up forms, sets no cookies of
          its own, and currently runs no analytics. Most of what a privacy policy usually
          has to disclose, we simply don&apos;t do.
        </p>
      </Block>

      <Block title="What we collect on this site">
        <p>
          Nothing directly. There are no forms on this site, so browsing it sends us no
          personal information. The ROI calculator runs entirely in your browser — the
          numbers you enter are never transmitted to us or stored anywhere.
        </p>
        <p>
          Our hosting provider, Vercel, generates standard server access logs (IP
          address, pages requested, browser type) as part of operating the
          infrastructure. We use these only in aggregate, if at all.
        </p>
      </Block>

      <Block title="Booking a call">
        <p>
          When you book a scoping call, scheduling is handled by a third-party scheduling
          provider. The information you enter there (name, email, phone) is collected
          under that provider&apos;s privacy policy and shared with us so we can hold the
          call. We use it to prepare for and follow up on your enquiry — not for
          unrelated marketing lists.
        </p>
      </Block>

      <Block title="Cookies and tracking">
        <p>
          This site sets no cookies of its own and includes no advertising trackers or
          social-media pixels. If we add privacy-respecting analytics in the future, we
          will update this policy first.
        </p>
      </Block>

      <Block title="The Potri service itself">
        <p>
          If you become a client, the Potri agents handle call data — recordings,
          transcripts, seller details — on your behalf. How that data is processed,
          stored, and integrated with your CRM is defined in your service agreement
          during onboarding, not by this website policy.
        </p>
      </Block>

      <Block title="Your rights">
        <p>
          If you have shared personal information with us (for example, by booking a
          call) and want it corrected or deleted, tell us on the call or reply to any
          message we have sent you, and we will handle it promptly.
        </p>
      </Block>

      <Block title="Changes">
        <p>
          If our practices change, this page changes first, along with the date at the
          top.
        </p>
      </Block>
    </LegalPage>
  );
}
