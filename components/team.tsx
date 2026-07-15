import { Container, SectionHeading } from "./ui";

type Agent = {
  mono: string;
  name: string;
  role: string;
  tile: string;
  accent: string;
  desc: string;
  features: string[];
  live: string;
  price: string;
};

const AGENTS: Agent[] = [
  {
    mono: "A",
    name: "Andy",
    role: "Outbound · Acquisitions",
    tile: "bg-andy",
    accent: "text-andy",
    desc: "Works your seller lead list all day. Qualifies every prospect on the five pillars — motivation, urgency, condition, price, and reason for selling — then books qualified sellers straight into your calendar.",
    features: [
      "Five-pillar qualification on every call",
      "Fluent English & Spanish",
      "Pushes clean data into your CRM",
      "Handles objections without hesitation",
    ],
    live: "Live in 2–4 days",
    price: "From $1,600/mo",
  },
  {
    mono: "R",
    name: "Randy",
    role: "Inbound · Reception",
    tile: "bg-randy",
    accent: "text-randy",
    desc: "Answers every call that comes in — including the 11pm one you would have missed. Answers property questions, captures seller details, and runs the same qualification framework as Andy while you sleep.",
    features: [
      "24/7 — never a voicemail",
      "Consistent and professional every time",
      "Fluent English & Spanish",
    ],
    live: "Live in 1–3 days",
    price: "From $1,200/mo",
  },
  {
    mono: "A",
    name: "Alyssa",
    role: "Back office · Follow-up & ops",
    tile: "bg-alyssa",
    accent: "text-alyssa",
    desc: "The one your competitors don’t have. Alyssa works behind the scenes — follow-up sequences, inbox organization, CRM hygiene — custom-built around how your operation actually runs.",
    features: [
      "Email & SMS follow-up sequences",
      "Custom workflows for your business",
      "Keeps the pipeline organized while you close",
    ],
    live: "Live in <7 days",
    price: "From $1,500/mo",
  },
];

export function Team() {
  return (
    <section id="team" className="scroll-mt-20 border-y border-subtle bg-elevated py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="The team"
          title="Three employees. Three jobs."
          sub="The names are job titles. Say “Andy” and you mean outbound. Say “Randy” and it’s inbound. Say “Alyssa” and it’s follow-up and operations."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {AGENTS.map((a) => (
            <article
              key={a.name}
              className="flex flex-col rounded-2xl border border-subtle bg-card p-8"
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl text-[20px] font-semibold text-base ${a.tile}`}
                  aria-hidden
                >
                  {a.mono}
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-[23px] font-semibold tracking-[-0.025em] text-ink">
                    {a.name}
                  </h3>
                  <p
                    className={`font-mono text-[9.5px] font-medium uppercase tracking-[0.28em] ${a.accent}`}
                  >
                    {a.role}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-[14.5px] leading-[1.6] text-dim">{a.desc}</p>

              <ul className="mt-5 flex flex-col gap-3">
                {a.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <span className={`shrink-0 text-[13px] leading-[1.6] ${a.accent}`} aria-hidden>
                      →
                    </span>
                    <span className="text-sm leading-[1.5] text-muted">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-7">
                <div className="border-t border-subtle pt-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[13px] text-dim">{a.live}</span>
                    <span className="text-[15px] font-semibold tracking-[-0.01em] text-ink">
                      {a.price}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
