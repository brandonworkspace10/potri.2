import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AgentShaderBg } from "@/components/agent-shader-bg";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Container, PrimaryButton, SecondaryButton } from "@/components/ui";
import { AGENTS, getAgent } from "@/lib/agents";
import { BOOKING_URL, SITE_URL, TEAM_PRICE } from "@/lib/config";

type Params = { params: Promise<{ agent: string }> };

export function generateStaticParams() {
  return AGENTS.map((a) => ({ agent: a.id }));
}

// Only the three real slugs match this segment. Without this, [agent] swallows
// every unknown top-level path — including the /opengraph-image metadata route,
// which it served with a 404 status.
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { agent } = await params;
  const a = getAgent(agent);
  if (!a) return {};
  return {
    title: a.page.title,
    description: a.page.description,
    alternates: { canonical: `/${a.id}` },
    openGraph: {
      title: a.page.title,
      description: a.page.description,
      url: `${SITE_URL}/${a.id}`,
      type: "website",
    },
  };
}

export default async function AgentPage({ params }: Params) {
  const { agent } = await params;
  const a = getAgent(agent);
  if (!a) notFound();

  const others = AGENTS.filter((o) => o.id !== a.id);

  // Mirrors the rendered page: the service, its price bounds, and the trail
  // back to the team section. No claims beyond what the page shows.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${SITE_URL}/${a.id}#service`,
        name: `${a.name} — ${a.role}`,
        serviceType: a.page.title,
        description: a.page.description,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: "US",
        availableLanguage: ["English", "Spanish"],
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "USD",
          lowPrice: a.page.priceLow,
          highPrice: a.page.priceHigh,
          description: `${a.page.pricedBy}. Monthly price; final pricing confirmed after a scoping call.`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Topri", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "The team", item: `${SITE_URL}/#team` },
          { "@type": "ListItem", position: 3, name: a.name, item: `${SITE_URL}/${a.id}` },
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
          <AgentShaderBg accentVar={a.accentVar} />
          <Container className="relative">
            <div className="flex flex-col items-start py-12 sm:py-20 lg:py-24">
              <Link
                href="/#team"
                className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-dim transition-colors hover:text-ink"
              >
                ← The team
              </Link>

              <div className="mt-7 flex items-center gap-4">
                <span
                  className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl text-[22px] font-semibold text-base ${a.tile}`}
                  aria-hidden
                >
                  {a.mono}
                </span>
                <h1 className="flex flex-col gap-1.5">
                  <span className="text-[30px] font-bold tracking-[-0.03em] text-ink sm:text-[34px]">
                    {a.name}
                  </span>
                  <span
                    className={`font-mono text-[9.5px] font-medium uppercase tracking-[0.24em] ${a.accent}`}
                  >
                    {a.role}
                  </span>
                </h1>
              </div>

              <p className="mt-7 max-w-[760px] text-[25px] font-bold leading-[1.14] tracking-[-0.03em] text-ink sm:text-[38px]">
                {a.page.headline}
              </p>
              <p className="mt-5 max-w-[640px] text-[16px] leading-[1.65] text-muted sm:text-[17px]">
                {a.page.lede}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton href={BOOKING_URL}>Book a Free Lead-Flow Audit</PrimaryButton>
                <SecondaryButton href="/#calculator">See what it&apos;s worth</SecondaryButton>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-dim">
                <span>{a.live}</span>
                <span aria-hidden>·</span>
                <span>{a.page.priceRange}</span>
                <span aria-hidden>·</span>
                <span>English + Spanish</span>
              </div>
            </div>
          </Container>
        </section>

        {/* what they accomplish */}
        <section className="py-12 sm:py-20 lg:py-24">
          <Container>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.5em] text-brand">
              What {a.name} does
            </p>
            <h2 className="mt-4 max-w-[720px] text-[23px] font-bold leading-[1.16] tracking-[-0.025em] text-ink sm:text-[34px]">
              {a.desc}
            </h2>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {a.page.accomplishes.map((d) => (
                <div key={d.title} className="rounded-2xl border border-subtle bg-card p-6">
                  <span
                    className={`block h-[7px] w-[7px] rounded-full ${a.tile}`}
                    aria-hidden
                  />
                  <h3 className="mt-3 text-[17px] font-semibold tracking-[-0.015em] text-ink">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-[1.6] text-dim">{d.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* agent-specific feature block */}
        {a.page.callout ? (
          <section className="border-y border-subtle bg-elevated py-12 sm:py-20 lg:py-24">
            <Container>
              <div className="relative overflow-hidden rounded-2xl border border-subtle bg-card p-8 sm:p-11">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-24 -top-32 h-[360px] w-[520px] blur-[70px]"
                  style={{
                    background: `radial-gradient(closest-side, color-mix(in srgb, var(${a.accentVar}) 14%, transparent), transparent 100%)`,
                  }}
                />
                <div className="relative grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
                  <div>
                    <p
                      className={`font-mono text-[10px] font-medium uppercase tracking-[0.28em] ${a.accent}`}
                    >
                      {a.page.callout.eyebrow}
                    </p>
                    <h2 className="mt-4 max-w-[440px] text-[26px] font-bold leading-[1.12] tracking-[-0.03em] text-ink sm:text-[32px]">
                      {a.page.callout.title}
                    </h2>
                  </div>
                  <div>
                    <p className="text-[15px] leading-[1.7] text-muted">{a.page.callout.body}</p>
                    <ul className="mt-7 flex flex-col gap-3.5 border-t border-subtle pt-7">
                      {a.page.callout.points.map((pt) => (
                        <li key={pt} className="flex gap-3">
                          <span
                            className={`mt-[7px] block h-[5px] w-[5px] shrink-0 rounded-full ${a.tile}`}
                            aria-hidden
                          />
                          <span className="text-[14.5px] leading-[1.55] text-dim">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        ) : null}

        {/* how it helps you */}
        <section className="border-y border-subtle bg-elevated py-12 sm:py-20 lg:py-24">
          <Container>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.5em] text-brand">
              How {a.name} helps you
            </p>
            <h2 className="mt-4 max-w-[720px] text-[23px] font-bold leading-[1.16] tracking-[-0.025em] text-ink sm:text-[34px]">
              What it actually changes about your week.
            </h2>

            <ul className="mt-10 flex flex-col">
              {a.page.helps.map((d, i) => (
                <li
                  key={d.title}
                  className={`flex flex-col gap-2 py-6 sm:flex-row sm:gap-10 ${
                    i > 0 ? "border-t border-subtle" : ""
                  }`}
                >
                  <h3 className="w-full max-w-[320px] shrink-0 text-[17px] font-semibold tracking-[-0.015em] text-ink">
                    {d.title}
                  </h3>
                  <p className="text-[14.5px] leading-[1.65] text-dim">{d.desc}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* capability list + price */}
        <section className="py-12 sm:py-20 lg:py-24">
          <Container>
            <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
              <div className="rounded-2xl border border-subtle bg-card p-8">
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-dim">
                  On every call
                </p>
                <ul className="mt-6 flex flex-col gap-4">
                  {a.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span className={`shrink-0 text-[13px] leading-[1.6] ${a.accent}`} aria-hidden>
                        →
                      </span>
                      <span className="text-[15px] leading-[1.55] text-muted">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col rounded-2xl border border-subtle bg-card p-8">
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-dim">
                  Hire {a.name}
                </p>
                <p className="mt-4 text-[28px] font-bold tracking-[-0.035em] tabular-nums text-ink">
                  {a.page.priceRange}
                </p>
                <p className="mt-2 text-[13.5px] leading-[1.5] text-dim">{a.page.pricedBy}</p>
                <p className="mt-5 border-t border-subtle pt-5 text-[13.5px] leading-[1.6] text-dim">
                  Single hires pay full price — bundle pricing applies only to the full
                  three-agent team, which is a flat ${TEAM_PRICE.toLocaleString("en-US")}/mo.
                </p>
                <div className="mt-6">
                  <PrimaryButton href={BOOKING_URL} className="w-full">
                    Book a Free Lead-Flow Audit
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* the other two */}
        <section className="border-t border-subtle bg-elevated py-12 sm:py-20">
          <Container>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.5em] text-brand">
              The rest of the team
            </p>
            <h2 className="mt-4 text-[22px] font-bold tracking-[-0.025em] text-ink sm:text-[30px]">
              {a.name} works best with the other two.
            </h2>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {others.map((o) => (
                <Link
                  key={o.id}
                  href={`/${o.id}`}
                  className="flex items-center gap-4 rounded-2xl border border-subtle bg-card p-6 transition-colors hover:bg-raised"
                >
                  <span
                    className={`flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl text-[17px] font-semibold text-base ${o.tile}`}
                    aria-hidden
                  >
                    {o.mono}
                  </span>
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="text-[16px] font-semibold tracking-[-0.02em] text-ink">
                      {o.name}
                    </span>
                    <span
                      className={`font-mono text-[8.5px] font-medium uppercase tracking-[0.2em] ${o.accent}`}
                    >
                      {o.role}
                    </span>
                    <span className="mt-0.5 text-[13px] leading-[1.4] text-dim">{o.blurb}</span>
                  </span>
                  <span className="ml-auto shrink-0 pl-2 text-dim" aria-hidden>
                    →
                  </span>
                </Link>
              ))}
            </div>

            <p className="mt-8 text-[14px] leading-[1.6] text-dim">
              All three together run ${TEAM_PRICE.toLocaleString("en-US")}/mo — roughly what
              one human caller costs you today.{" "}
              <Link href="/#pricing" className="font-medium text-brand hover:text-ink">
                See full pricing →
              </Link>
            </p>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
