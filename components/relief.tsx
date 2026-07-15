import { Container, Eyebrow } from "./ui";

const OUTCOMES = [
  { step: "Answered", desc: "Before it ever reaches voicemail", dot: "bg-randy" },
  { step: "Qualified", desc: "Motivation, urgency, condition, price, timeline", dot: "bg-andy" },
  { step: "Logged", desc: "Clean data pushed straight into your CRM", dot: "bg-andy" },
  { step: "Followed up", desc: "Sequences running without you touching them", dot: "bg-alyssa" },
  { step: "Booked", desc: "On your calendar when you wake up", dot: "bg-alyssa" },
];

export function Relief() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[1100px] max-w-none -translate-x-1/2 -translate-y-1/2 blur-[80px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,138,52,0.10), rgba(255,138,52,0) 100%)",
        }}
      />
      <Container className="relative">
        <div className="flex flex-col items-center text-center">
          <Eyebrow>What changes</Eyebrow>
          <h2 className="mt-4 max-w-[900px] text-[30px] font-bold leading-[1.18] tracking-[-0.03em] text-ink sm:text-[38px] lg:text-[42px]">
            Imagine waking up knowing every seller who called overnight was already{" "}
            <span className="text-brand">answered, qualified, logged, and booked</span>.
          </h2>
          <p className="mt-6 max-w-[600px] text-[17px] leading-[1.6] text-muted">
            Not a list of missed calls to work through. A calendar with appointments on it.
          </p>
        </div>

        <ol className="mx-auto mt-14 grid max-w-[1100px] gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {OUTCOMES.map((o) => (
            <li
              key={o.step}
              className="flex flex-col gap-2.5 rounded-2xl border border-subtle bg-card p-6"
            >
              <span className={`h-[7px] w-[7px] rounded-full ${o.dot}`} aria-hidden />
              <h3 className="text-[17px] font-semibold tracking-[-0.015em] text-ink">
                {o.step}
              </h3>
              <p className="text-[13.5px] leading-[1.5] text-dim">{o.desc}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
