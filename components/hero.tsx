import { BOOKING_URL } from "@/lib/config";
import { DottedSurface } from "./dotted-surface";
import { Container, PrimaryButton, SecondaryButton } from "./ui";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* animated dot field, then the glow over it, then content on top */}
      <DottedSurface placeholderSrc="/hero-field.webp" />

      {/* radial brand glow behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-260px] h-[560px] w-[900px] max-w-none -translate-x-1/2 blur-[60px] sm:h-[760px] sm:w-[1500px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,138,52,0.20), rgba(255,138,52,0.05) 45%, rgba(255,138,52,0) 100%)",
        }}
      />

      <Container className="relative">
        <div className="flex flex-col items-center pb-12 pt-10 text-center sm:pb-20 sm:pt-20 md:pb-28 md:pt-32">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-subtle bg-card px-3 py-2 sm:px-3.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
            {/* tracking has to relax on narrow screens or this wraps and drags the dot off-centre */}
            <span className="whitespace-nowrap font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-muted sm:text-[11px] sm:tracking-[0.4em]">
              AI employees for real estate investors
            </span>
          </div>

          <h1 className="mt-6 max-w-[1000px] text-[32px] sm:mt-7 font-bold leading-[1.02] tracking-[-0.04em] text-ink sm:text-[58px] sm:leading-[0.98] lg:text-[76px]">
            <span
              className="shimmer-text"
              style={
                {
                  "--shimmer-highlight": "rgba(255, 138, 52, 0.8)",
                  "--shimmer-core": "rgba(255, 196, 138, 0.95)",
                } as React.CSSProperties
              }
            >
              Your next deal shouldn&apos;t
            </span>
            <br className="hidden sm:block" /> go to{" "}
            <span className="shimmer-text text-brand">voicemail</span>
            .
          </h1>

          <p className="mt-5 max-w-[700px] text-[16px] sm:mt-7 sm:text-[17px] leading-[1.6] text-muted sm:text-[19px]">
            Topri is three AI employees for real estate investors and wholesalers. Andy
            cold-calls and qualifies your seller leads. Randy answers every inbound call, 24/7.
            Alyssa runs the follow-up. Live in under six days, for roughly what one caller
            costs you today.
          </p>

          <div className="mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row">
            <PrimaryButton href={BOOKING_URL}>Book a scoping call</PrimaryButton>
            <SecondaryButton href="#calculator">See what it&apos;s worth</SecondaryButton>
          </div>

          <p className="mt-6 text-[13px] text-dim">
            English + Spanish on every call · You approve every script · Live in under six days
          </p>
        </div>
      </Container>
    </section>
  );
}
