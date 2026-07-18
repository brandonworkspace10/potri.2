import { BOOKING_URL } from "@/lib/config";
import { Container, PrimaryButton, SectionHeading } from "./ui";

type SampleCall = {
  agent: string;
  dot: string;
  title: string;
  blurb: string;
  /**
   * Filename in /public/calls (e.g. "andy-cold-seller.mp3"). Drop the real
   * recording in and set this to make the card play inline. Left undefined
   * until real audio exists — the card then invites the visitor to hear it
   * on their audit rather than shipping an empty player.
   */
  src?: string;
};

const SAMPLE_CALLS: SampleCall[] = [
  {
    agent: "Andy",
    dot: "bg-andy",
    title: "Outbound — a cold seller, qualified",
    blurb: "A name off a cold list, worked through the five pillars and booked.",
  },
  {
    agent: "Randy",
    dot: "bg-randy",
    title: "Inbound — the 9pm call, answered",
    blurb: "An after-hours seller who'd have hit voicemail, handled live instead.",
  },
  {
    agent: "Alyssa",
    dot: "bg-alyssa",
    title: "Follow-up — a cold lead, revived",
    blurb: "A gone-quiet lead brought back with a follow-up that actually fired.",
  },
];

export function SampleCalls() {
  const anyPlayable = SAMPLE_CALLS.some((c) => c.src);

  return (
    <section id="calls" className="cv-auto scroll-mt-20 py-12 sm:py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="The proof"
          title="Don't take our word for it. Hear them work."
          sub="A cold seller qualified, a 9pm caller answered, a dead lead revived — hear how your sellers actually get handled before you sign anything."
        />

        <div className="mt-10 grid gap-5 sm:mt-13 lg:grid-cols-3">
          {SAMPLE_CALLS.map((c) => (
            <div
              key={c.agent}
              className="flex flex-col rounded-2xl border border-subtle bg-card p-6"
            >
              <div className="flex items-center gap-2.5">
                <span className={`h-2 w-2 rounded-full ${c.dot}`} aria-hidden />
                <span className="text-[14px] font-semibold text-ink">{c.agent}</span>
              </div>
              <p className="mt-3.5 text-[15px] font-semibold leading-[1.4] text-ink">
                {c.title}
              </p>
              <p className="mt-2 text-[13.5px] leading-[1.55] text-dim">{c.blurb}</p>
              <div className="mt-5">
                {c.src ? (
                  <audio
                    controls
                    preload="none"
                    src={`/calls/${c.src}`}
                    className="w-full"
                  >
                    Your browser does not support the audio element.
                  </audio>
                ) : (
                  <div className="flex items-center gap-2 rounded-lg border border-subtle bg-raised px-3.5 py-2.5 text-[12.5px] font-medium text-dim">
                    <span aria-hidden>▶</span>
                    Played live on your free audit
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {!anyPlayable ? (
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[560px] text-[13.5px] leading-[1.6] text-dim">
              We play real recordings with you on your free lead-flow audit, so you hear
              exactly how the agents sound before you commit to anything.
            </p>
            <PrimaryButton href={BOOKING_URL}>Book a Free Lead-Flow Audit</PrimaryButton>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
