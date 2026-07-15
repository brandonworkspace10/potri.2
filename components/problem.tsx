import { Container, Eyebrow } from "./ui";

const PROBLEMS = [
  {
    title: "Overpaying for inconsistency",
    desc: "$1,500–$5,000+ per month for one human caller — and the quality swings with their mood.",
  },
  {
    title: "Missed leads",
    desc: "The 11pm call hits voicemail. The deal dies in the gap before you ever hear about it.",
  },
  {
    title: "Human friction",
    desc: "Fatigue, attitude, turnover, sick days, training cycles. You manage all of it.",
  },
  {
    title: "Manual follow-up",
    desc: "You end up personally chasing leads instead of closing the ones already warm.",
  },
  {
    title: "Language barriers",
    desc: "Deals lost outright because the person dialing only speaks English.",
  },
];

export function Problem() {
  return (
    <section className="py-24 lg:py-30">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[400px_1fr] lg:gap-28">
          <div className="flex flex-col gap-5">
            <Eyebrow>The cost of doing nothing</Eyebrow>
            <h2 className="text-[34px] font-bold leading-[1.06] tracking-[-0.035em] text-ink sm:text-[42px] lg:text-[46px]">
              Every deal you lose
              <br />
              has a reason.
            </h2>
            <p className="text-base leading-[1.6] text-dim">
              You already know the symptoms. What they quietly cost you is the part
              nobody puts on a spreadsheet.
            </p>

            <div className="mt-2 rounded-2xl border border-subtle bg-card p-6">
              <p className="text-[15px] leading-[1.6] text-muted">
                A wholesaler clears{" "}
                <span className="font-semibold text-ink">$15,000–$60,000</span> on a deal.
                An investor earns a multiple of that after renovation.
              </p>
              <p className="mt-3 text-[15px] leading-[1.6] text-muted">
                One deal lost to a voicemail costs more than{" "}
                <span className="font-semibold text-brand">a year of Potri</span>.
              </p>
            </div>
          </div>

          <ul className="flex flex-col">
            {PROBLEMS.map((p, i) => (
              <li
                key={p.title}
                className={`flex gap-7 py-6 ${i > 0 ? "border-t border-subtle" : ""}`}
              >
                <span className="w-6 shrink-0 pt-1 font-mono text-xs tracking-[0.2em] text-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[18px] font-semibold tracking-[-0.015em] text-ink">
                    {p.title}
                  </h3>
                  <p className="text-[15px] leading-[1.55] text-dim">{p.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
