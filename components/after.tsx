import { Container, Eyebrow } from "./ui";

/**
 * The "what happens after" step of the narrative — life once the agents are
 * live, in reading form. Qualitative on purpose: no invented volumes or
 * rates, just the brief's own division of labour.
 */
export function After() {
  return (
    <section
      id="after"
      className="cv-auto scroll-mt-20 border-y border-subtle bg-elevated py-12 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[380px_1fr] lg:gap-24">
          <div className="flex flex-col gap-5">
            <Eyebrow>After day six</Eyebrow>
            <h2 className="text-[27px] font-bold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[38px]">
              What a normal week
              <br />
              looks like now.
            </h2>
          </div>

          <div className="flex max-w-[640px] flex-col gap-5 text-[15.5px] leading-[1.75] text-muted">
            <p>
              Your morning starts with a calendar, not a backlog. Overnight, Randy took
              the calls you used to lose — the 9pm seller got a real conversation,
              answered in their language, qualified on your five pillars, details already
              in your CRM. Andy spent the day before working the list — all of it, not
              just the warm top — and the sellers worth your time are booked, not
              sitting in a callback queue.
            </p>
            <p>
              The follow-up you used to carry in your head is running on its own.
              The seller who said &quot;call me in a few months&quot; is scheduled to
              hear from you in a few months, whether or not that week is busy. Nothing
              in the pipeline depends on you remembering it.
            </p>
            <p>
              Which changes what your job is. You stop being the receptionist, the
              dialer, and the follow-up system, and you keep the one role that actually
              makes money in this business:{" "}
              <span className="font-medium text-ink">
                sitting with a motivated seller and closing the deal
              </span>
              . The team hands you that moment, prepared — and everything before it
              stops being yours to manage.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
