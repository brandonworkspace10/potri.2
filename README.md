# topri.2

Marketing site for **Topri** — AI employees for real estate investors & wholesalers.

Three specialized agents — **Andy** (outbound acquisitions), **Randy** (inbound reception),
and **Alyssa** (back-office follow-up & ops) — deployed in under six days, for roughly the
cost of one human hire.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **TypeScript**
- **Tailwind CSS v4** — design tokens live in `app/globals.css` under `@theme`
- **Geist / Geist Mono** via `next/font/google`

## Getting started

```bash
bun install
bun run dev      # http://localhost:3000
bun run build    # production build
```

## Structure

```
app/
  layout.tsx        # fonts + metadata
  page.tsx          # composes every section in order
  globals.css       # design tokens (@theme) + range-slider styling
components/
  ui.tsx            # Container, Eyebrow, Wordmark, buttons, SectionHeading
  site-nav.tsx      # sticky nav
  hero.tsx          # headline + radial brand glow
  proof-strip.tsx   # 168hrs / 6 days / EN+ES / $5,200
  problem.tsx       # "Every deal you lose has a reason"
  team.tsx          # Andy / Randy / Alyssa cards
  why.tsx           # 3x2 advantage grid
  roi-calculator.tsx# interactive cost calculator (client component)
  math.tsx          # one human vs. the Topri team
  pricing.tsx       # per-agent table + $5,200 team bundle
  deployment.tsx    # 6-day timeline
  final-cta.tsx
  site-footer.tsx
lib/
  config.ts         # BOOKING_URL, TEAM_PRICE, coverage hours
```

## Design tokens

Defined once in `app/globals.css`. Each agent has a fixed identity colour:

| Token | Value | Used for |
|---|---|---|
| `base` / `elevated` / `card` / `raised` | `#0a0b0d` → `#1c1f24` | surfaces, darkest to lightest |
| `subtle` / `strong` | `#24262b` / `#2e3238` | hairline borders |
| `ink` / `muted` / `dim` | `#f5f6f7` / `#9ba1a9` / `#6b7280` | text, brightest to faintest |
| `brand` / `andy` | `#ff8a34` | brand accent + Andy |
| `randy` | `#4d8dff` | Randy |
| `alyssa` | `#35c88a` | Alyssa |

CTAs are deliberately white-on-black so the agent colours never compete with buttons.

## The ROI calculator

`components/roi-calculator.tsx` takes four inputs (callers on payroll, cost per caller,
seller leads/month, average profit per closed deal) and derives everything else as plain
arithmetic against the flat `TEAM_PRICE`:

- **Difference** — `callers × costPerCaller − 5200`, shown per month and per year
- **Coverage** — `callers × 40` → `168` hours/week
- **Cost per lead** — each option's monthly cost ÷ leads
- **One closed deal** — `dealProfit ÷ 5200` = months of team covered by a single extra deal
- **Break-even** — `(5200 × 12) ÷ dealProfit` = extra deals/year needed to cover the team

It deliberately makes **no claim about how many deals Topri will close**. It states the bar
the agents have to clear, using the visitor's own numbers.

## Before launch

- [ ] **Set `BOOKING_URL` in `lib/config.ts`** — currently `#book`; every CTA reads from it
- [ ] Add a custom domain, then set `metadataBase` in `app/layout.tsx`
- [ ] Add an OG image (`app/opengraph-image.png`)
- [ ] Confirm the pricing figures still match the current positioning brief
- [ ] Decide Alyssa's monogram — the source brief renders it as "L"; this site uses "A"

## Design source

The visual direction was mocked in Figma before implementation:
<https://www.figma.com/design/9tIh8ZSscmlgK7Mv1vEixB>

## Content source

All copy derives from the internal positioning & pricing brief
(`Topri_Positioning_and_Pricing.pdf`). Section headings and connective copy were written
for the site. There are no testimonials or customer logos, because there are no real ones
to show yet.
