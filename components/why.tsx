import { Container, SectionHeading } from "./ui";

const ITEMS = [
  {
    title: "The same call, every time",
    desc: "Every seller gets the same professional conversation on call one and call one thousand.",
    dot: "bg-andy",
  },
  {
    title: "Objections handled live",
    desc: "De-escalates and answers in the moment — no hesitation, no shuffling through notes.",
    dot: "bg-randy",
  },
  {
    title: "The 9pm seller gets a person",
    desc: "168 hours of coverage a week, so the after-hours call becomes a conversation, not a beep.",
    dot: "bg-alyssa",
  },
  {
    title: "A team for one salary",
    desc: "Outbound, inbound and follow-up together cost roughly what a single caller costs you today.",
    dot: "bg-andy",
  },
  {
    title: "Working inside a week",
    desc: "Scoped Monday, dialing by Saturday. Six days from signature to live calls.",
    dot: "bg-randy",
  },
  {
    title: "Spanish-speaking sellers too",
    desc: "The same qualification, the same quality, in either language — on every call.",
    dot: "bg-alyssa",
  },
];

export function Why() {
  return (
    <section className="cv-auto py-12 sm:py-20 lg:py-30">
      <Container>
        <SectionHeading
          eyebrow="Streamline your success"
          title={
            <>
              Every seller gets your
              <br className="hidden sm:block" /> best call. Every time.
            </>
          }
        />

        <div className="mt-10 sm:mt-13 overflow-hidden rounded-2xl border border-subtle bg-elevated">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {ITEMS.map((it, i) => (
              <div
                key={it.title}
                className={[
                  "flex flex-col gap-3 p-5 sm:p-9",
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
