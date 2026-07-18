import { Container, Eyebrow } from "./ui";

/**
 * The "what I need" step of the sales narrative, in reading form. Everything
 * here traces to the day-one scoping call in the brief: lead sources, CRM,
 * calendar, and how the buyer qualifies a deal.
 */
export function WhatYouNeed() {
  return (
    <section id="what-you-need" className="cv-auto scroll-mt-20 py-12 sm:py-20 lg:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[380px_1fr] lg:gap-24">
          <div className="flex flex-col gap-5">
            <Eyebrow>What you need</Eyebrow>
            <h2 className="text-[27px] font-bold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[38px]">
              Everything you need,
              <br />
              you already have.
            </h2>
          </div>

          <div className="flex max-w-[640px] flex-col gap-5 text-[15.5px] leading-[1.75] text-muted">
            <p>
              There&apos;s no software to buy, no system to migrate to, and no technical
              person you need on your side. The team is built around what your operation
              already runs — that&apos;s what the scoping call is for.
            </p>
            <p>
              What you bring is simple: <span className="font-medium text-ink">a seller
              lead source</span> — fresh campaigns, or the old list sitting in your CRM
              that nobody calls anymore. <span className="font-medium text-ink">A
              calendar</span> where booked appointments can land.{" "}
              <span className="font-medium text-ink">Your CRM</span>, whichever one it
              is, exactly as it is today. And{" "}
              <span className="font-medium text-ink">how you qualify a deal</span> — the
              questions you&apos;d ask a seller yourself, because the five pillars get
              scripted from the way you actually buy, not from a template.
            </p>
            <p>
              The only time it costs you is one scoping call, and the only decision you
              make after that is listening to your agents on test calls and saying
              &quot;go.&quot; If you can take a booked appointment with a qualified
              seller, you are equipped for everything this does.
            </p>

            <ul className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["CRM integration", "bg-andy"],
                ["Calendar & booking", "bg-randy"],
                ["Follow-up systems", "bg-alyssa"],
                ["Help & escalations", "bg-andy"],
              ].map(([label, dot]) => (
                <li
                  key={label}
                  className="flex items-center gap-2 rounded-xl border border-subtle bg-card px-3.5 py-3 text-[13px] font-medium text-ink"
                >
                  <span className={`h-[6px] w-[6px] shrink-0 rounded-full ${dot}`} aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
