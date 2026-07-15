import { Deployment } from "@/components/deployment";
import { FinalCta } from "@/components/final-cta";
import { Hero } from "@/components/hero";
import { MathSection } from "@/components/math";
import { Pricing } from "@/components/pricing";
import { Problem } from "@/components/problem";
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
        <Team />
        <Why />
        <RoiCalculator />
        <MathSection />
        <Pricing />
        <Deployment />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
