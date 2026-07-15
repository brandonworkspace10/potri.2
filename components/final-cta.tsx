import { BOOKING_URL } from "@/lib/config";
import { Container, PrimaryButton, SecondaryButton } from "./ui";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-28 lg:py-36">
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
          <h2 className="max-w-[820px] text-[38px] font-bold leading-[1.03] tracking-[-0.04em] text-ink sm:text-[52px] lg:text-[60px]">
            Your competitors are still
            <br className="hidden sm:block" /> leaving voicemails.
          </h2>
          <p className="mt-6 max-w-[560px] text-[17px] leading-[1.6] text-muted">
            One scoping call maps your lead sources, your CRM, and how you qualify a deal.
            Six days later, Andy, Randy and Alyssa are working.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton href={BOOKING_URL}>Book a scoping call</PrimaryButton>
            <SecondaryButton href="#calculator">Run the numbers first</SecondaryButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
