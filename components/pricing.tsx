import { BOOKING_URL, TEAM_PRICE } from "@/lib/config";
import { Container, PrimaryButton, SectionHeading } from "./ui";

const ROWS = [
  {
    agent: "Andy",
    dot: "bg-andy",
    role: "Outbound acquisitions",
    price: "$1,600 – $2,500",
    by: "Call volume & script complexity",
  },
  {
    agent: "Randy",
    dot: "bg-randy",
    role: "Inbound reception",
    price: "$1,200 – $1,800",
    by: "Inbound volume & integrations",
  },
  {
    agent: "Alyssa",
    dot: "bg-alyssa",
    role: "Follow-up & operations",
    price: "$1,500 – $6,000",
    by: "Scoped after consultation — fully custom",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 py-16 sm:py-20 lg:py-30">
      <Container>
        <SectionHeading eyebrow="Pricing" title="Hire one. Or hire the team." />

        <div className="mt-10 hidden overflow-x-auto sm:mt-13 sm:block">
          <table className="w-full min-w-[720px] border-separate border-spacing-0 text-left">
            <thead>
              <tr className="bg-raised">
                {["Agent", "Role", "Monthly price", "Priced by"].map((h, i) => (
                  <th
                    key={h}
                    className={[
                      "border-y border-subtle px-6 py-4 font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-muted",
                      i === 0 ? "rounded-l-xl border-l" : "",
                      i === 3 ? "rounded-r-xl border-r" : "",
                    ].join(" ")}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.agent}>
                  <td className="border-b border-subtle px-6 py-6">
                    <span className="flex items-center gap-2.5">
                      <span className={`h-2 w-2 rounded-full ${r.dot}`} aria-hidden />
                      <span className="text-[15px] font-semibold text-ink">{r.agent}</span>
                    </span>
                  </td>
                  <td className="border-b border-subtle px-6 py-6 text-[15px] text-muted">
                    {r.role}
                  </td>
                  <td className="border-b border-subtle px-6 py-6 text-[15px] font-semibold tabular-nums text-ink">
                    {r.price}
                  </td>
                  <td className="border-b border-subtle px-6 py-6 text-[14px] text-dim">
                    {r.by}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* mobile: the 4-column table clips below sm, so stack it */}
        <div className="mt-10 flex flex-col gap-3 sm:hidden">
          {ROWS.map((r) => (
            <div key={r.agent} className="rounded-2xl border border-subtle bg-card p-5">
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2.5">
                  <span className={`h-2 w-2 rounded-full ${r.dot}`} aria-hidden />
                  <span className="text-[15px] font-semibold text-ink">{r.agent}</span>
                </span>
                <span className="text-[15px] font-semibold tabular-nums text-ink">
                  {r.price}
                </span>
              </div>
              <p className="mt-2.5 text-[14px] text-muted">{r.role}</p>
              <p className="mt-3.5 border-t border-subtle pt-3.5 text-[13px] leading-[1.5] text-dim">
                {r.by}
              </p>
            </div>
          ))}
        </div>

        {/* full team bundle */}
        <div className="relative mt-6 overflow-hidden rounded-2xl border border-[#5c3a1e] bg-card">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-40 h-[420px] w-[620px] blur-[70px]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,138,52,0.16), rgba(255,138,52,0) 100%)",
            }}
          />
          <div className="relative flex flex-col gap-7 p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between lg:p-11">
            <div className="max-w-[520px]">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-brand">
                Full team — Andy + Randy + Alyssa
              </p>
              <p className="mt-4 text-[17px] leading-[1.6] text-muted">
                Your entire calling and follow-up operation — outbound, inbound, and back
                office — for roughly what one human caller costs you today.
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-start gap-4 lg:items-end">
              <p className="text-[15px] tabular-nums text-dim line-through decoration-dim/60">
                $4,300 – $10,300 separately
              </p>
              <p className="text-[46px] font-bold leading-none tracking-[-0.045em] tabular-nums text-brand sm:text-[56px]">
                ${TEAM_PRICE.toLocaleString("en-US")}
                <span className="text-[24px] font-semibold text-muted">/mo</span>
              </p>
              <PrimaryButton href={BOOKING_URL}>Book a scoping call</PrimaryButton>
            </div>
          </div>
        </div>

        <p className="mt-6 max-w-[760px] text-[13px] leading-[1.6] text-dim">
          <span className="font-medium text-muted">Pricing rules:</span> no discounts on
          individual agents — single hires pay full price. Bundle pricing applies only to
          the full three-agent team. Final price confirmed after a scoping call.
        </p>
      </Container>
    </section>
  );
}
