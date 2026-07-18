import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Container, Eyebrow, PrimaryButton, SecondaryButton } from "@/components/ui";
import { AGENTS } from "@/lib/agents";
import { FAQS, HUMAN_WINS, ROWS, TRUE_COSTS } from "@/lib/compare";
import { BOOKING_URL, SITE_URL, TEAM_PRICE } from "@/lib/config";

const PATH = "/ai-vs-human-cold-caller";
const TITLE = "AI Cold Caller vs Hiring a Human: The Real Math";
const DESCRIPTION =
  "What a human cold caller actually costs, what an AI caller covers, and which one to hire. An honest comparison for real estate investors and wholesalers.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    type: "article",
  },
};

export default function ComparePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}${PATH}#faq`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Topri", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "AI cold caller vs hiring a human",
            item: `${SITE_URL}${PATH}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav />
      <main className="flex-1">
        {/* hero */}
        <section className="relative overflow-hidden border-b border-subtle">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[-300px] h-[520px] w-[900px] max-w-none -translate-x-1/2 blur-[70px]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,138,52,0.16), rgba(255,138,52,0) 100%)",
            }}
          />
          <Container className="relative">
            <div className="flex flex-col items-start py-12 sm:py-20 lg:py-24">
              <Eyebrow>The comparison</Eyebrow>
              <h1 className="mt-5 max-w-[820px] text-[29px] font-bold leading-[1.08] tracking-[-0.035em] text-ink sm:text-[46px] lg:text-[54px]">
                AI cold caller vs hiring a human:{" "}
                <span className="text-brand">the real math</span>
              </h1>
              <p className="mt-6 max-w-[660px] text-[17px] leading-[1.65] text-muted">
                Short answer: hire an AI caller for the top of the funnel and a human for
                the close. Below is what a human caller actually costs, what each side
                genuinely does better, and when hiring a person is still the right call.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton href={BOOKING_URL}>Book a scoping call</PrimaryButton>
                <SecondaryButton href="/#calculator">Run your own numbers</SecondaryButton>
              </div>
            </div>
          </Container>
        </section>

        {/* the honest cost */}
        <section className="py-12 sm:py-20 lg:py-24">
          <Container>
            <Eyebrow>What a human caller costs</Eyebrow>
            <h2 className="mt-4 max-w-[760px] text-[23px] font-bold leading-[1.16] tracking-[-0.025em] text-ink sm:text-[34px]">
              The salary is the cheapest part of a human cold caller.
            </h2>
            <p className="mt-5 max-w-[660px] text-[15.5px] leading-[1.7] text-dim">
              A caller runs $1,500–$5,000+ a month. That figure is easy to compare against
              a software price, which is exactly why it&apos;s the wrong number to compare
              against. Here is the rest of the bill.
            </p>

            <ul className="mt-10 flex flex-col">
              {TRUE_COSTS.map((d, i) => (
                <li
                  key={d.title}
                  className={`flex flex-col gap-2 py-6 sm:flex-row sm:gap-10 ${
                    i > 0 ? "border-t border-subtle" : ""
                  }`}
                >
                  <h3 className="w-full max-w-[300px] shrink-0 text-[17px] font-semibold tracking-[-0.015em] text-ink">
                    {d.title}
                  </h3>
                  <p className="text-[14.5px] leading-[1.65] text-dim">{d.desc}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* table */}
        <section className="border-y border-subtle bg-elevated py-12 sm:py-20 lg:py-24">
          <Container>
            <Eyebrow>Side by side</Eyebrow>
            <h2 className="mt-4 text-[23px] font-bold leading-[1.16] tracking-[-0.025em] text-ink sm:text-[34px]">
              One human caller vs the Topri team
            </h2>

            {/* desktop table */}
            <div className="mt-10 hidden overflow-x-auto sm:block">
              <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left">
                <thead>
                  <tr>
                    <th className="w-[32%] px-6 pb-5" />
                    <th className="w-[34%] px-6 pb-5 text-[15px] font-semibold text-dim">
                      One human caller
                    </th>
                    <th className="w-[34%] rounded-t-2xl border-x border-t border-[#5c3a1e] bg-card px-6 py-5 text-[15px] font-semibold text-brand">
                      Topri team
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map(([metric, human, topri], i) => {
                    const last = i === ROWS.length - 1;
                    return (
                      <tr key={metric}>
                        <td
                          className={`px-6 py-5 text-[14.5px] font-medium text-muted ${
                            i > 0 ? "border-t border-subtle" : ""
                          }`}
                        >
                          {metric}
                        </td>
                        <td
                          className={`px-6 py-5 text-[14.5px] text-dim ${
                            i > 0 ? "border-t border-subtle" : ""
                          }`}
                        >
                          {human}
                        </td>
                        <td
                          className={[
                            "border-x border-t border-t-subtle border-[#5c3a1e] bg-card px-6 py-5 text-[14.5px] font-semibold text-ink",
                            last ? "rounded-b-2xl border-b border-b-[#5c3a1e]" : "",
                          ].join(" ")}
                        >
                          {topri}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* mobile cards */}
            <div className="mt-10 flex flex-col gap-3 sm:hidden">
              {ROWS.map(([metric, human, topri]) => (
                <div key={metric} className="rounded-2xl border border-subtle bg-card p-5">
                  <p className="text-[13px] font-medium text-muted">{metric}</p>
                  <div className="mt-3.5 grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-dim">
                        One human
                      </p>
                      <p className="mt-2 text-[13.5px] leading-[1.4] text-dim">{human}</p>
                    </div>
                    <div className="border-l border-subtle pl-4">
                      <p className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-brand">
                        Topri team
                      </p>
                      <p className="mt-2 text-[13.5px] font-semibold leading-[1.4] text-ink">
                        {topri}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* where a human wins — the part most comparison pages leave out */}
        <section className="py-12 sm:py-20 lg:py-24">
          <Container>
            <Eyebrow>Where a human still wins</Eyebrow>
            <h2 className="mt-4 max-w-[760px] text-[23px] font-bold leading-[1.16] tracking-[-0.025em] text-ink sm:text-[34px]">
              Four things you should not hire an AI caller for.
            </h2>
            <p className="mt-5 max-w-[660px] text-[15.5px] leading-[1.7] text-dim">
              Any vendor telling you their AI replaces your whole acquisitions team is
              selling you something. Topri does one part of the job. Here is the part it
              doesn&apos;t.
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {HUMAN_WINS.map((d) => (
                <div key={d.title} className="rounded-2xl border border-subtle bg-card p-6">
                  <span className="block h-[7px] w-[7px] rounded-full bg-strong" aria-hidden />
                  <h3 className="mt-3 text-[17px] font-semibold tracking-[-0.015em] text-ink">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-[1.6] text-dim">{d.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* verdict */}
        <section className="border-y border-subtle bg-elevated py-12 sm:py-20 lg:py-24">
          <Container>
            <div className="mx-auto max-w-[760px]">
              <Eyebrow>The verdict</Eyebrow>
              <h2 className="mt-4 text-[23px] font-bold leading-[1.16] tracking-[-0.025em] text-ink sm:text-[34px]">
                Hire the AI for the funnel. Keep the human for the close.
              </h2>
              <div className="mt-6 flex flex-col gap-4 text-[15.5px] leading-[1.75] text-dim">
                <p>
                  The choice is usually framed as replacement, and framed that way the
                  answer is no. A caller who dials your list, qualifies on fixed criteria
                  and books appointments is doing work that rewards volume and consistency
                  — which is exactly what software is good at and people are not. Sitting
                  across from a seller and agreeing a number is the reverse.
                </p>
                <p>
                  The reason the maths favours Topri isn&apos;t that the agents are better
                  at calling than a good human. It&apos;s that the same{" "}
                  <span className="font-medium text-muted">
                    ${TEAM_PRICE.toLocaleString("en-US")}
                  </span>{" "}
                  buys outbound, inbound and follow-up at 168 hours a week instead of one
                  channel at 40 — and your closer stops spending mornings dialing.
                </p>
                <p>
                  If you only ever wanted one thing dialed occasionally, hire a person.
                  If the constraint is that nobody has time to work the whole list, answer
                  the 9pm call, and run follow-up as well, that&apos;s the case for this.
                </p>
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton href={BOOKING_URL}>Book a scoping call</PrimaryButton>
                <SecondaryButton href="/#calculator">Run your own numbers</SecondaryButton>
              </div>
            </div>
          </Container>
        </section>

        {/* faq */}
        <section className="py-12 sm:py-20 lg:py-24">
          <Container>
            <Eyebrow>Questions</Eyebrow>
            <h2 className="mt-4 text-[23px] font-bold leading-[1.16] tracking-[-0.025em] text-ink sm:text-[34px]">
              AI vs human cold calling, answered
            </h2>
            <div className="mt-10 max-w-[860px] overflow-hidden rounded-2xl border border-subtle bg-elevated">
              {FAQS.map((f, i) => (
                <details
                  key={f.q}
                  name="compare-faq"
                  className={`group ${i > 0 ? "border-t border-subtle" : ""}`}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 transition-colors hover:bg-card sm:gap-6 sm:px-7 sm:py-6 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-[16px] font-semibold tracking-[-0.015em] text-ink">
                      {f.q}
                    </h3>
                    <span
                      aria-hidden
                      className="shrink-0 text-[18px] leading-none text-dim transition-[rotate,color] duration-200 group-open:rotate-45 group-open:text-brand"
                    >
                      +
                    </span>
                  </summary>
                  <p className="px-5 pb-6 text-[14px] leading-[1.65] text-dim sm:px-7 sm:pb-7 sm:pr-16 sm:text-[14.5px]">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        {/* into the cluster */}
        <section className="border-t border-subtle bg-elevated py-12 sm:py-20">
          <Container>
            <Eyebrow>Meet the team</Eyebrow>
            <h2 className="mt-4 text-[26px] font-bold tracking-[-0.03em] text-ink sm:text-[30px]">
              The three agents doing the work
            </h2>
            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              {AGENTS.map((a) => (
                <Link
                  key={a.id}
                  href={`/${a.id}`}
                  className="flex items-center gap-4 rounded-2xl border border-subtle bg-card p-6 transition-colors hover:bg-raised"
                >
                  <span
                    className={`flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl text-[17px] font-semibold text-base ${a.tile}`}
                    aria-hidden
                  >
                    {a.mono}
                  </span>
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="text-[16px] font-semibold tracking-[-0.02em] text-ink">
                      {a.name}
                    </span>
                    <span
                      className={`font-mono text-[8.5px] font-medium uppercase tracking-[0.2em] ${a.accent}`}
                    >
                      {a.role}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
