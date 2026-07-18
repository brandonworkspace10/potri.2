import { Container, SectionHeading } from "./ui";

const STEPS = [
  {
    day: "Day 1",
    title: "Scoping call",
    desc: "We map your lead sources, CRM, calendar, and exactly how you qualify a deal.",
  },
  {
    day: "Days 2–3",
    title: "Build & train",
    desc: "Agents configured with your questions, your script, your voice.",
  },
  {
    day: "Days 4–5",
    title: "Test calls",
    desc: "You hear the agents live and approve before a single real lead is dialed.",
  },
  {
    day: "Day 6",
    title: "Go live",
    desc: "Andy dials, Randy answers, Alyssa follows up. You close.",
  },
];

export function Deployment() {
  return (
    <section
      id="deployment"
      className="cv-auto scroll-mt-20 border-y border-subtle bg-elevated py-12 sm:py-20 lg:py-28"
    >
      <Container>
        <SectionHeading
          eyebrow="What happens next"
          title="Signed Monday. Working by Saturday."
          sub="No six-week onboarding. No implementation retainer."
        />

        <ol className="relative mt-10 grid sm:mt-14 gap-5 lg:grid-cols-4">
          {/* connecting rail */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-[38px] hidden h-px bg-subtle lg:block"
          />

          {STEPS.map((s, i) => (
            <li key={s.day} className="relative flex gap-4 lg:flex-col">
              <span className="relative z-10 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border border-strong bg-raised font-mono text-[11px] font-medium tabular-nums text-brand">
                {i + 1}
              </span>
              <div className="flex-1 rounded-2xl border border-subtle bg-card p-6 sm:p-7">
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-brand">
                  {s.day}
                </p>
                <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.015em] text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-[1.58] text-dim">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
