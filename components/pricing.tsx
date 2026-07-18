import { BOOKING_URL, OUTBOUND_INBOUND_PRICE, PROMO, TEAM_PRICE } from "@/lib/config";
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
    <section id="pricing" className="cv-auto scroll-mt-20 py-12 sm:py-20 lg:py-30">
      <Container>
        {PROMO.active ? (
          <div className="mb-8 flex justify-center">
            <div className="inline-flex flex-col items-center gap-1.5 rounded-2xl border border-[#5c3a1e] bg-card px-6 py-4 text-center sm:flex-row sm:gap-3 sm:py-3">
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-brand">
                Limited-time offer
              </span>
              <span className="hidden text-dim sm:inline">·</span>
              <span className="text-[14px] font-semibold text-ink">{PROMO.headline}</span>
            </div>
          </div>
        ) : null}

        <SectionHeading eyebrow="The cost" title="Hire one. A pair. Or the whole team." />

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

        {/* two packages: outbound+inbound, then the full team */}
        <div className="mt-6 grid gap-5 lg:grid-cols-2 lg:items-stretch">
          {/* outbound + inbound bundle */}
          <div className="relative flex flex-col overflow-hidden rounded-2xl border border-subtle bg-card">
            <div className="flex flex-1 flex-col gap-6 p-7 sm:p-9">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-andy" aria-hidden />
                  <span className="h-2 w-2 rounded-full bg-randy" aria-hidden />
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-muted">
                    Outbound + Inbound — Andy + Randy
                  </p>
                </div>
                <p className="mt-4 text-[16px] leading-[1.6] text-muted">
                  Every seller lead worked and every call answered — dialing and
                  reception together, without the back-office layer.
                </p>
                {PROMO.active ? (
                  <p className="mt-4 text-[13.5px] leading-[1.5] text-brand">
                    Pairs with the current promo — add Alyssa and she&apos;s free for
                    your first 6 months.
                  </p>
                ) : null}
              </div>

              <div className="mt-auto flex flex-col items-start gap-4">
                <p className="text-[14px] tabular-nums text-dim line-through decoration-dim/60">
                  $2,800 – $4,300 separately
                </p>
                <p className="text-[38px] font-bold leading-none tracking-[-0.04em] tabular-nums text-ink sm:text-[42px]">
                  ${OUTBOUND_INBOUND_PRICE.toLocaleString("en-US")}
                  <span className="text-[19px] font-semibold text-muted">/mo</span>
                </p>
                <PrimaryButton href={BOOKING_URL}>Book a scoping call</PrimaryButton>
              </div>
            </div>
          </div>

          {/* full team bundle */}
          <div className="relative flex flex-col overflow-hidden rounded-2xl border border-[#5c3a1e] bg-card">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-32 -top-40 h-[420px] w-[620px] blur-[70px]"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(255,138,52,0.16), rgba(255,138,52,0) 100%)",
              }}
            />
            <div className="relative flex flex-1 flex-col gap-6 p-7 sm:p-9">
              <div>
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-brand">
                  Full team — Andy + Randy + Alyssa
                </p>
                <p className="mt-4 text-[16px] leading-[1.6] text-muted">
                  Your entire calling and follow-up operation — outbound, inbound, and
                  back office — for roughly what one human caller costs you today.
                </p>
                {PROMO.active ? (
                  <p className="mt-4 text-[13.5px] leading-[1.5] text-brand">
                    Right now: hire any 2 agents and the 3rd is free for 6 months, then
                    it rolls into the flat team rate below.
                  </p>
                ) : null}
              </div>

              <div className="mt-auto flex flex-col items-start gap-4">
                <p className="text-[14px] tabular-nums text-dim line-through decoration-dim/60">
                  $4,300 – $10,300 separately
                </p>
                <p className="text-[38px] font-bold leading-none tracking-[-0.04em] tabular-nums text-brand sm:text-[42px]">
                  ${TEAM_PRICE.toLocaleString("en-US")}
                  <span className="text-[19px] font-semibold text-muted">/mo</span>
                </p>
                <PrimaryButton href={BOOKING_URL}>Book a scoping call</PrimaryButton>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 max-w-[760px] text-[13px] leading-[1.6] text-dim">
          <span className="font-medium text-muted">Pricing rules:</span> no discounts on
          individual agents — single hires pay full price. Bundle pricing applies to the
          Outbound + Inbound package and the full three-agent team.
          {PROMO.active ? (
            <>
              {" "}
              Current promo: hire 2 agents and the 3rd is free for 6 months, then it
              moves to its normal monthly price.
            </>
          ) : null}{" "}
          Final price confirmed after a scoping call.
        </p>
      </Container>
    </section>
  );
}
