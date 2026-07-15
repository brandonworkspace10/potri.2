const STATS = [
  { big: "168 hrs", label: "Covered every week — vs 40 from a human", tone: "text-brand" },
  { big: "6 days", label: "Signed Monday, working by Saturday", tone: "text-randy" },
  { big: "EN + ES", label: "Fluent bilingual on every single call", tone: "text-alyssa" },
  { big: "$5,200", label: "Flat per month for the full three-agent team", tone: "text-ink" },
];

export function ProofStrip() {
  return (
    <section className="border-y border-subtle bg-elevated">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.big}
            className={`px-8 py-10 lg:px-9 ${
              i > 0 ? "border-t border-subtle sm:border-t-0 sm:border-l" : ""
            } ${i === 2 ? "sm:border-t lg:border-t-0" : ""}`}
          >
            <p className={`text-[34px] font-semibold tracking-[-0.035em] ${s.tone}`}>
              {s.big}
            </p>
            <p className="mt-2 text-sm leading-[1.45] text-dim">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
