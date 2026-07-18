# SEO / AEO roadmap

State of the site's search work as of 2026-07-16, and what comes next.
Everything in "Shipped" is live on `main`; everything in "Blocked" needs a
business decision before code can help.

## Shipped

**Technical**
- Titles 49–62 chars, descriptions 135–156 chars on every page (SERP limits)
- Canonicals, `metadataBase`, OG/Twitter cards, `robots.txt`, `sitemap.xml`
- OG image generated at build (`app/opengraph-image.tsx`) — wordmark, headline, three agent chips
- `[agent]` route restricted with `dynamicParams = false` (it was swallowing `/opengraph-image` and serving it as a 404)
- Home JS cut 54% (1.19MB → 549KB) by loading three.js and the shader lib after hydration
- One `h1` per page, no heading-level skips, agent `h1` carries the role keywords

**Structured data** — all generated from `lib/agents.ts` / `lib/faq.ts` / `lib/compare.ts`, so schema can never contradict the rendered copy
- Home: `Organization`, `WebSite`, `Service` (+ full-team `Offer`), `FAQPage` (13 questions)
- Agent pages: `Service` with `AggregateOffer` price bounds, `BreadcrumbList`
- Compare page: `FAQPage` (5 questions), `BreadcrumbList`

**AEO**
- `/llms.txt` — plain-text brief for ChatGPT/Perplexity/Claude/Gemini/AI Overviews, generated from the same data as the pages. Includes "notes for citation" stating Topri publishes no capture/close rate.
- FAQ answers live in the HTML source (crawlable while collapsed)
- Definitional questions targeting category queries ("What is an AI acquisitions caller?", "How much does an AI cold caller cost?")

**Pages (the cluster so far)**
- `/` — brand + commercial head terms
- `/andy`, `/randy`, `/alyssa` — outbound caller / AI receptionist / follow-up intent
- `/ai-vs-human-cold-caller` — bottom-of-funnel comparison intent

## Blocked on business decisions — code can't fix these

1. ~~Two live sites both branded Topri~~ **Resolved 2026-07-16**:
   real-lead-in.vercel.app was a test production; this repo is the real one
   and `topri.com` connects to it. Once DNS is live, take the test deployment
   offline (or noindex it) so its $697–$1,497 FAQ schema stops answering
   "how much does Topri cost".
2. ~~`SITE_URL` is a guess~~ **Resolved**: set to `https://topri.com`.
3. **Two FAQ answers not written because the policy doesn't exist yet:**
   "Will sellers know they're talking to AI?" and "Is this TCPA compliant?"
   Both are top objections and strong AEO queries. Need Brandon's actual
   policy — a guessed compliance claim is worse than silence.
4. **No analytics.** CRO without measurement is guesswork. Enabling Vercel
   Analytics (or adding a lightweight alternative) is a 10-minute task once
   chosen deliberately.

## Next pages, in priority order

Each targets one query intent, sourced from the brief — no fabricated stats.

1. `/pricing` — "AI cold caller pricing / cost" queries. Expand the pricing
   section into a page: per-agent ranges, what moves price within the range,
   the bundle math, pricing-rule FAQ with its own `FAQPage` schema.
2. `/list-reactivation` — "revive old seller leads / dead lead follow up".
   Andy's callout block already proves the angle; a page can own the query.
3. `/spanish-speaking-sellers` — bilingual qualification is a real
   differentiator with almost no competition on the query.
4. `/vs/answering-service` — second comparison page: AI receptionist vs
   answering service, aimed at Randy's buyer.
5. Glossary stubs only if the cluster gains traction: five-pillar
   qualification, speed-to-lead, list reactivation — each links into an agent
   page.

## Standing rules (why the site is built this way)

- Schema is generated from the same TS objects the pages render — copy edits
  update Google's view automatically.
- No `Review`/`AggregateRating` schema until real reviews exist; no
  testimonials until real customers say real things. Fabricated proof is a
  manual-action risk and this buyer checks.
- The calculator asserts no capture rate; every projected number is arithmetic
  on visitor inputs. Keep it that way — it's the page's credibility.
- `llms.txt`, FAQ schema and page copy must never disagree; they all read from
  one source of truth per topic.
