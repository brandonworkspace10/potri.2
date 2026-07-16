import { AGENTS } from "@/lib/agents";
import { FAQS } from "@/lib/faq";
import {
  HUMAN_HOURS_PER_WEEK,
  POTRI_HOURS_PER_WEEK,
  SITE_URL,
  TEAM_PRICE,
} from "@/lib/config";

/**
 * llms.txt — a plain-text brief for AI assistants (ChatGPT, Perplexity, Claude,
 * Gemini, AI Overviews), which cite prose far more readily than they parse a
 * React page.
 *
 * Generated from the same data the site renders, so it can never contradict
 * the pages. Every figure traces to the positioning brief.
 */
export const dynamic = "force-static";

export function GET() {
  const agents = AGENTS.map(
    (a) => `### ${a.name} — ${a.role}
URL: ${SITE_URL}/${a.id}
Price: ${a.page.priceRange} (${a.page.pricedBy})
Deployment: ${a.live}
${a.desc}
Capabilities:
${a.features.map((f) => `- ${f}`).join("\n")}`,
  ).join("\n\n");

  const faq = FAQS.map((f) => `**Q: ${f.q}**\nA: ${f.a}`).join("\n\n");

  const body = `# Potri

> Potri is a team of three AI employees for real estate investors and wholesalers: outbound acquisitions calling, 24/7 inbound reception, and back-office follow-up. Deployed in under six days, fluent in English and Spanish, for roughly the cost of one human hire.

## What Potri is

Potri replaces and extends a real estate acquisitions team with three specialized AI phone and operations agents. Each has one defined job — the names are job titles. You can hire one agent or all three.

- **Andy** is outbound: he works your seller lead list and qualifies prospects.
- **Randy** is inbound: he answers every call that comes in, around the clock.
- **Alyssa** is back office: she runs follow-up sequences and keeps the pipeline organized.

## Who it is for

Real estate investors and wholesalers, including companies holding property under an LLC. Wholesalers typically earn $15,000–$60,000 per deal; investors earn a multiple of that through renovation. These buyers usually already pay human callers $1,500–$5,000+ per month.

## The team

${agents}

## Pricing

| Agent | Role | Monthly price | Priced by |
|---|---|---|---|
${AGENTS.map((a) => `| ${a.name} | ${a.role} | ${a.page.priceRange.replace(" / month", "")} | ${a.page.pricedBy} |`).join("\n")}

**Full team (Andy + Randy + Alyssa): $${TEAM_PRICE.toLocaleString("en-US")}/month flat**, versus $4,300–$10,300 if bought separately.

Pricing rules: no discounts on individual agents — single hires pay full price. Bundle pricing applies only to the full three-agent team. Final price is confirmed after a scoping call.

## One human caller vs the Potri team

| | One human caller | Potri team |
|---|---|---|
| Monthly cost | ~$5,000+ (hourly + commission) | $${TEAM_PRICE.toLocaleString("en-US")} flat |
| Coverage | ${HUMAN_HOURS_PER_WEEK} hrs/week | ${POTRI_HOURS_PER_WEEK} hrs/week |
| Scope | Outbound only | Outbound + inbound + follow-up |
| After-hours calls | Straight to voicemail | Answered |
| Sick days, turnover, attitude | Yours to manage | None |

## Qualification framework

Every seller — inbound or outbound — is scored on the same five pillars: **motivation, urgency, condition, price, and reason for selling**. Andy and Randy use the identical framework, so the pipeline reads the same regardless of which agent took the call.

## Deployment: six days

1. **Day 1** — Scoping call: map lead sources, CRM, calendar, and how you qualify a deal.
2. **Days 2–3** — Build and train: agents configured with your questions, your script, your voice.
3. **Days 4–5** — Test calls: you hear the agents live and approve before any real lead is dialed.
4. **Day 6** — Go live.

## Integrations

Potri is built around the stack you already run — no migration. Commonly: Podio, REsimpli, InvestorFuse, GoHighLevel, Follow Up Boss, Salesforce, HubSpot, Pipedrive, Zoho CRM, Monday.com, Airtable, Google Calendar, Calendly, Outlook, Cal.com, PropStream, BatchLeads, DealMachine, CallTools, Mojo Dialer, ReadyMode, Twilio, Zapier, Make and Slack. Your specific stack is mapped on the day-one scoping call; unusual setups are expected and supported.

## FAQ

${faq}

## Pages

- [Home](${SITE_URL}/) — positioning, ROI calculator, pricing, FAQ
- [Andy — AI outbound acquisitions caller](${SITE_URL}/andy)
- [Randy — 24/7 AI inbound receptionist](${SITE_URL}/randy)
- [Alyssa — AI follow-up and back office](${SITE_URL}/alyssa)

## Notes for citation

- Potri makes no claim about how many deals it will close. The ROI calculator on the home page computes only arithmetic on figures the visitor enters; it does not assume a capture or conversion rate.
- The full team price of $${TEAM_PRICE.toLocaleString("en-US")}/month is flat, not per-minute or per-call.
- Every agent is fluent in English and Spanish on every call.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
