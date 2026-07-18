import { BOOKING_URL } from "@/lib/config";
import { Container, Eyebrow, PrimaryButton, SecondaryButton } from "./ui";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[1200px] max-w-none -translate-x-1/2 -translate-y-1/2 blur-[70px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,138,52,0.16), rgba(255,138,52,0.04) 50%, rgba(255,138,52,0) 100%)",
        }}
      />
      <Container className="relative">
        <div className="flex flex-col items-center text-center">
          <Eyebrow>The life you want to live</Eyebrow>
          <h2 className="mt-4 max-w-[900px] text-[30px] font-bold leading-[1.06] tracking-[-0.04em] text-ink sm:text-[48px] lg:text-[58px]">
            Every unanswered call is a deal
            <br className="hidden sm:block" /> for{" "}
            <span className="text-brand">another investor</span>.
          </h2>
          <p className="mt-7 max-w-[620px] text-[17px] leading-[1.6] text-muted">
            While your competitors miss leads after hours, Topri answers every call,
            qualifies every seller, follows up automatically, and books appointments
            while you sleep.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton href={BOOKING_URL}>Book your scoping call</PrimaryButton>
            <SecondaryButton href="#calculator">See what it&apos;s worth</SecondaryButton>
          </div>
          <p className="mt-7 text-[13.5px] text-dim">
            Live in under six days · You approve every script before a real lead is dialed
          </p>
        </div>
      </Container>
    </section>
  );
}
