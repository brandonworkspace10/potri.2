import { Container } from "./ui";

const STATS = [
  { big: "168 hrs", label: "Covered every week — vs 40 from a human", tone: "text-brand" },
  { big: "6 days", label: "Signed Monday, working by Saturday", tone: "text-randy" },
  { big: "EN + ES", label: "Fluent bilingual on every single call", tone: "text-alyssa" },
  { big: "$5,200", label: "Flat per month for the full three-agent team", tone: "text-ink" },
];

export function ProofStrip() {
  return (
    <section className="border-y border-subtle bg-elevated py-10 sm:py-12">
      <Container>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.big}
              className="rounded-2xl border border-subtle bg-card p-6 sm:p-7"
            >
              <p className={`text-[30px] font-semibold tracking-[-0.035em] sm:text-[34px] ${s.tone}`}>
                {s.big}
              </p>
              <p className="mt-2 text-sm leading-[1.45] text-dim">{s.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
