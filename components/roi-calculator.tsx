"use client";

import { useMemo, useState, type CSSProperties } from "react";
import {
  BOOKING_URL,
  HUMAN_HOURS_PER_WEEK,
  POTRI_HOURS_PER_WEEK,
  TEAM_PRICE,
} from "@/lib/config";
import { Container, PrimaryButton, SectionHeading } from "./ui";

const money = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

const money2 = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(n);

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (n: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  const trackStyle = {
    "--track-fill": `linear-gradient(to right, var(--color-brand) ${pct}%, var(--color-strong) ${pct}%)`,
  } as CSSProperties;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={label} className="text-sm font-medium text-muted">
          {label}
        </label>
        <span className="font-mono text-[15px] font-medium tabular-nums text-ink">
          {display}
        </span>
      </div>
      <input
        id={label}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        style={trackStyle}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-[18px] w-full"
      />
    </div>
  );
}

function Metric({
  label,
  value,
  hint,
  tone = "text-ink",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 p-5">
      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-dim">
        {label}
      </p>
      <p className={`text-[22px] font-semibold tracking-[-0.03em] tabular-nums ${tone}`}>
        {value}
      </p>
      {hint ? <p className="text-[12.5px] leading-[1.45] text-dim">{hint}</p> : null}
    </div>
  );
}

export function RoiCalculator() {
  const [callers, setCallers] = useState(1);
  const [costPerCaller, setCostPerCaller] = useState(5000);
  const [dealProfit, setDealProfit] = useState(25000);
  const [leads, setLeads] = useState(400);
  // visitor-supplied assumptions — deliberately theirs, not ours
  const [missedCalls, setMissedCalls] = useState(25);
  const [closeRate, setCloseRate] = useState(5);

  const r = useMemo(() => {
    const humanMonthly = callers * costPerCaller;
    const deltaMonthly = humanMonthly - TEAM_PRICE; // positive = Potri is cheaper
    const deltaAnnual = deltaMonthly * 12;
    const humanHours = callers * HUMAN_HOURS_PER_WEEK;

    const potriAnnual = TEAM_PRICE * 12;
    const dealsRecoveredPerYear = missedCalls * 12 * (closeRate / 100);
    const upsideAnnual = dealsRecoveredPerYear * dealProfit;

    return {
      humanMonthly,
      deltaMonthly,
      deltaAnnual,
      humanHours,
      potriAnnual,
      dealsRecoveredPerYear,
      upsideAnnual,
      netAnnual: upsideAnnual - potriAnnual,
      costPerLeadHuman: leads > 0 ? humanMonthly / leads : 0,
      costPerLeadPotri: leads > 0 ? TEAM_PRICE / leads : 0,
      // how long one extra closed deal pays for the team
      monthsCoveredByOneDeal: dealProfit / TEAM_PRICE,
      // extra deals per year required for the team to pay for itself
      dealsPerYearToBreakEven: (TEAM_PRICE * 12) / dealProfit,
    };
  }, [callers, costPerCaller, dealProfit, leads, missedCalls, closeRate]);

  const cheaper = r.deltaMonthly > 0;
  const same = r.deltaMonthly === 0;

  return (
    <section id="calculator" className="scroll-mt-20 border-y border-subtle bg-elevated py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Run the numbers"
          title="What does your current setup actually cost?"
          sub="Move the sliders to match your operation. Everything below is arithmetic on the numbers you enter — not a projection of results."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[440px_1fr]">
          {/* inputs */}
          <div className="flex flex-col gap-7 rounded-2xl border border-subtle bg-card p-8">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-dim">
              Your operation
            </p>

            <Slider
              label="Human callers on payroll"
              value={callers}
              min={0}
              max={6}
              step={1}
              display={callers === 1 ? "1 caller" : `${callers} callers`}
              onChange={setCallers}
            />
            <Slider
              label="Cost per caller / month"
              value={costPerCaller}
              min={1500}
              max={8000}
              step={100}
              display={money(costPerCaller)}
              onChange={setCostPerCaller}
            />
            <Slider
              label="Seller leads / month"
              value={leads}
              min={50}
              max={2000}
              step={50}
              display={leads.toLocaleString("en-US")}
              onChange={setLeads}
            />
            <Slider
              label="Average profit per closed deal"
              value={dealProfit}
              min={5000}
              max={60000}
              step={1000}
              display={money(dealProfit)}
              onChange={setDealProfit}
            />

            <div className="border-t border-subtle pt-6">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-dim">
                Your assumptions
              </p>
            </div>

            <Slider
              label="Calls you miss each month"
              value={missedCalls}
              min={0}
              max={200}
              step={5}
              display={`${missedCalls} calls`}
              onChange={setMissedCalls}
            />
            <Slider
              label="Your close rate on qualified sellers"
              value={closeRate}
              min={1}
              max={25}
              step={1}
              display={`${closeRate}%`}
              onChange={setCloseRate}
            />

            <p className="border-t border-subtle pt-5 text-[12.5px] leading-[1.55] text-dim">
              Wholesalers typically earn $15K–$60K per deal; investors earn a multiple of
              that through renovations. Potri’s full team is a flat {money(TEAM_PRICE)}/mo —
              final pricing is confirmed on a scoping call.
            </p>
          </div>

          {/* results */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-subtle bg-card">
            {/* headline comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="border-b border-subtle p-8 sm:border-b-0 sm:border-r">
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-dim">
                  Your cost today
                </p>
                <p className="mt-3 text-[40px] font-bold tracking-[-0.04em] tabular-nums text-muted">
                  {money(r.humanMonthly)}
                </p>
                <p className="mt-1.5 text-[13px] text-dim">
                  {callers === 0
                    ? "No callers on payroll"
                    : `${r.humanHours} hrs/week · outbound only`}
                </p>
              </div>
              <div className="p-8">
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-brand">
                  With the Potri team
                </p>
                <p className="mt-3 text-[40px] font-bold tracking-[-0.04em] tabular-nums text-ink">
                  {money(TEAM_PRICE)}
                </p>
                <p className="mt-1.5 text-[13px] text-dim">
                  {POTRI_HOURS_PER_WEEK} hrs/week · outbound + inbound + follow-up
                </p>
              </div>
            </div>

            {/* delta banner */}
            <div className="border-y border-subtle bg-raised px-8 py-7">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-dim">
                Difference
              </p>
              <p
                className={`mt-2 text-[44px] font-bold leading-none tracking-[-0.04em] tabular-nums ${
                  cheaper ? "text-alyssa" : same ? "text-ink" : "text-brand"
                }`}
              >
                {same
                  ? "Same cost"
                  : `${cheaper ? "−" : "+"}${money(Math.abs(r.deltaMonthly))}/mo`}
              </p>
              <p className="mt-2.5 max-w-[640px] text-[13.5px] leading-[1.5] text-muted">
                {same ? (
                  <>
                    Identical spend — except you also get Randy on inbound and Alyssa on
                    follow-up, which a human caller never did.
                  </>
                ) : cheaper ? (
                  <>
                    You&apos;d save{" "}
                    <span className="font-semibold text-ink">
                      {money(Math.abs(r.deltaAnnual))}
                    </span>{" "}
                    a year — and still add inbound and follow-up coverage a human caller
                    never gave you.
                  </>
                ) : (
                  <>
                    Potri costs{" "}
                    <span className="font-semibold text-ink">
                      {money(Math.abs(r.deltaAnnual))}
                    </span>{" "}
                    more a year than your current payroll — but it covers outbound,
                    inbound and follow-up, around the clock, in two languages.
                  </>
                )}
              </p>
            </div>

            {/* upside — computed entirely from the visitor's own assumptions */}
            <div className="border-b border-subtle px-8 py-7">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-dim">
                If Potri answers what you currently miss
              </p>
              <div className="mt-3 flex flex-wrap items-end gap-x-8 gap-y-4">
                <div>
                  <p className="text-[34px] font-bold leading-none tracking-[-0.04em] tabular-nums text-ink">
                    {r.dealsRecoveredPerYear.toFixed(1)}
                  </p>
                  <p className="mt-1.5 text-[12.5px] text-dim">deals recovered / year</p>
                </div>
                <div className="text-dim">→</div>
                <div>
                  <p className="text-[34px] font-bold leading-none tracking-[-0.04em] tabular-nums text-alyssa">
                    {money(r.upsideAnnual)}
                  </p>
                  <p className="mt-1.5 text-[12.5px] text-dim">gross upside / year</p>
                </div>
                <div className="text-dim">−</div>
                <div>
                  <p className="text-[34px] font-bold leading-none tracking-[-0.04em] tabular-nums text-muted">
                    {money(r.potriAnnual)}
                  </p>
                  <p className="mt-1.5 text-[12.5px] text-dim">Potri / year</p>
                </div>
              </div>

              <p className="mt-5 max-w-[640px] text-[13px] leading-[1.55] text-dim">
                <span className="font-medium text-muted">
                  These are your assumptions, not our promises.
                </span>{" "}
                {missedCalls} missed calls a month closing at {closeRate}% is your number,
                not ours. Potri answers, qualifies and follows up — it can&apos;t make a
                seller sell.
              </p>
            </div>

            {/* metric grid */}
            <div className="grid grid-cols-1 divide-y divide-subtle sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
              <div className="sm:border-b sm:border-subtle lg:border-b-0">
                <Metric
                  label="Coverage"
                  value={`${r.humanHours} → ${POTRI_HOURS_PER_WEEK}`}
                  hint="Hours covered per week"
                />
              </div>
              <div className="sm:border-b sm:border-l sm:border-subtle lg:border-b-0">
                <Metric
                  label="Cost per lead"
                  value={`${money2(r.costPerLeadHuman)} → ${money2(r.costPerLeadPotri)}`}
                  hint={`Across ${leads.toLocaleString("en-US")} leads/mo`}
                />
              </div>
              <div className="sm:border-subtle lg:border-l">
                <Metric
                  label="One closed deal"
                  value={`${r.monthsCoveredByOneDeal.toFixed(1)} months`}
                  hint="How long a single extra deal pays for the team"
                  tone="text-brand"
                />
              </div>
              <div className="sm:border-l sm:border-subtle lg:border-l">
                <Metric
                  label="Break-even"
                  value={`${r.dealsPerYearToBreakEven.toFixed(1)} deals/yr`}
                  hint="Extra deals needed to cover the team for a year"
                  tone="text-brand"
                />
              </div>
            </div>

            <div className="mt-auto flex flex-col items-start gap-4 border-t border-subtle p-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[420px] text-[13px] leading-[1.5] text-dim">
                Bring these numbers to the call and we&apos;ll scope the exact build
                against them.
              </p>
              <PrimaryButton href={BOOKING_URL}>Book a scoping call</PrimaryButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
