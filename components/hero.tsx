import { BOOKING_URL } from "@/lib/config";
import { Container, PrimaryButton, SecondaryButton } from "./ui";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* radial brand glow behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-260px] h-[760px] w-[1500px] max-w-none -translate-x-1/2 blur-[60px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,138,52,0.20), rgba(255,138,52,0.05) 45%, rgba(255,138,52,0) 100%)",
        }}
      />

      <Container className="relative">
        <div className="flex flex-col items-center pb-24 pt-24 text-center md:pb-28 md:pt-32">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-subtle bg-card px-3.5 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.4em] text-muted">
              AI employees for real estate
            </span>
          </div>

          <h1 className="mt-7 max-w-[1000px] text-[42px] font-bold leading-[0.98] tracking-[-0.04em] text-ink sm:text-[58px] lg:text-[78px]">
            Stop paying <span className="text-brand">$5,000/month</span>
            <br className="hidden sm:block" />{" "}
            for one tired human.
          </h1>

          <p className="mt-7 max-w-[680px] text-[17px] leading-[1.6] text-muted sm:text-[19px]">
            For $5,200/mo Potri gives you a full acquisitions team — Andy dials and
            qualifies your seller leads, Randy answers every inbound call 24/7, and
            Alyssa runs your follow-up so nothing falls through the cracks.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton href={BOOKING_URL}>Book a scoping call</PrimaryButton>
            <SecondaryButton href="#calculator">Run the numbers</SecondaryButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
