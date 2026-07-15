import { Container, SectionHeading } from "./ui";

const ITEMS = [
  {
    title: "Consistency",
    desc: "The same quality on call 1 and call 1,000. No bad days, no attitude, no drift.",
    dot: "bg-andy",
  },
  {
    title: "Emotional intelligence",
    desc: "De-escalates and handles objections instantly — no shuffling through papers.",
    dot: "bg-randy",
  },
  {
    title: "24/7 coverage",
    desc: "168 hours a week versus a human’s 40. The 11pm call gets answered.",
    dot: "bg-alyssa",
  },
  {
    title: "Cost",
    desc: "The full three-agent team costs roughly what one human caller costs you today.",
    dot: "bg-andy",
  },
  {
    title: "Speed",
    desc: "Signed to fully live in under six days. Not six weeks.",
    dot: "bg-randy",
  },
  {
    title: "Bilingual",
    desc: "Fluent English and Spanish on every single call. No deal lost to language.",
    dot: "bg-alyssa",
  },
];

export function Why() {
  return (
    <section className="py-24 lg:py-30">
      <Container>
        <SectionHeading
          eyebrow="Why Potri wins"
          title={
            <>
              No bad days. No attitude.
              <br className="hidden sm:block" /> No voicemail.
            </>
          }
        />

        <div className="mt-13 overflow-hidden rounded-2xl border border-subtle bg-elevated">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {ITEMS.map((it, i) => (
              <div
                key={it.title}
                className={[
                  "flex flex-col gap-3 p-9",
                  // horizontal rules
                  i >= 1 ? "border-t border-subtle" : "",
                  i >= 2 ? "sm:border-t" : "",
                  i < 2 ? "sm:border-t-0" : "",
                  i < 3 ? "lg:border-t-0" : "lg:border-t",
                  // vertical rules
                  i % 2 === 1 ? "sm:border-l sm:border-subtle" : "",
                  i % 3 === 0 ? "lg:border-l-0" : "lg:border-l lg:border-subtle",
                ].join(" ")}
              >
                <span className={`h-[7px] w-[7px] rounded-full ${it.dot}`} aria-hidden />
                <h3 className="text-[18px] font-semibold tracking-[-0.015em] text-ink">
                  {it.title}
                </h3>
                <p className="text-[14.5px] leading-[1.58] text-dim">{it.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
