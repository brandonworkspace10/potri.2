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
import { Why } from "@/components/why";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <ProofStrip />
        <Problem />
        <Relief />
        <Team />
        <Why />
        <RoiCalculator />
        <MathSection />
        <Pricing />
        <Deployment />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
