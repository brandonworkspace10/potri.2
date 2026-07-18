import { JsonLd } from "@/components/json-ld";
import { After } from "@/components/after";
import { Deployment } from "@/components/deployment";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Hero } from "@/components/hero";
import { MathSection } from "@/components/math";
import { Pricing } from "@/components/pricing";
import { Problem } from "@/components/problem";
import { Relief } from "@/components/relief";
import { ProofStrip } from "@/components/proof-strip";
import { RoiCalculator } from "@/components/roi-calculator";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Team } from "@/components/team";
import { WhatYouNeed } from "@/components/what-you-need";
import { Why } from "@/components/why";

export default function Home() {
  return (
    <>
      <JsonLd />
      <SiteNav />
      {/* Narrative order: outcomes -> benefits -> cost -> what you need ->
          what happens -> what happens after -> close. */}
      <main className="flex-1">
        <Hero />
        <ProofStrip />
        <Relief />
        <Team />
        <Why />
        <Problem />
        <Pricing />
        <MathSection />
        <RoiCalculator />
        <WhatYouNeed />
        <Deployment />
        <After />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
