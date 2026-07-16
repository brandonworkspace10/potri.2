export type Detail = { title: string; desc: string };

export type Agent = {
  /** anchor id on the home page, and the route slug for the agent's own page */
  id: string;
  mono: string;
  name: string;
  role: string;
  /** one-line summary shown under the name in the nav dropdown */
  blurb: string;
  /** design token backing this agent's colour, for CSS custom properties */
  accentVar: string;
  /** background utility for the monogram tile */
  tile: string;
  /** text utility for the agent's identity colour */
  accent: string;
  desc: string;
  features: string[];
  live: string;
  price: string;
  /** long-form content for the agent's own page */
  page: {
    title: string;
    description: string;
    headline: string;
    lede: string;
    accomplishes: Detail[];
    helps: Detail[];
    /** optional feature block specific to this agent */
    callout?: {
      eyebrow: string;
      title: string;
      body: string;
      points: string[];
    };
    priceRange: string;
    priceLow: number;
    priceHigh: number;
    pricedBy: string;
  };
};

export const AGENTS: Agent[] = [
  {
    id: "andy",
    mono: "A",
    name: "Andy",
    role: "Outbound · Acquisitions",
    blurb: "Dials and qualifies your seller leads",
    accentVar: "--color-andy",
    tile: "bg-andy",
    accent: "text-andy",
    desc: "Works your seller lead list all day. Qualifies every prospect on the five pillars — motivation, urgency, condition, price, and reason for selling — then books qualified sellers straight into your calendar.",
    features: [
      "Five-pillar qualification on every call",
      "Fluent English & Spanish",
      "Pushes clean data into your CRM",
      "Handles objections without hesitation",
    ],
    live: "Live in 2–4 days",
    price: "From $1,600/mo",
    page: {
      title: "Andy — AI Outbound Caller for Real Estate",
      description:
        "Andy works your seller lead list all day, qualifies every prospect on the five pillars, and books qualified sellers into your calendar. From $1,600/mo.",
      headline: "Your lead list gets worked. All of it.",
      lede: "Andy is the outbound half of your acquisitions team. He dials your seller leads, qualifies every one of them on the same five pillars, and puts the ones worth your time on your calendar — while you work the deals that are already live.",
      accomplishes: [
        {
          title: "Every lead gets called",
          desc: "Not just the ones somebody got to before 5pm. Andy works the list until the list is done.",
        },
        {
          title: "Every prospect scored the same way",
          desc: "Motivation, urgency, condition, price, and reason for selling — the five pillars, on call one and call one thousand.",
        },
        {
          title: "Qualified sellers land on your calendar",
          desc: "Booked straight in, not parked in a callback queue for someone to chase later.",
        },
        {
          title: "Your CRM stays clean",
          desc: "Andy pushes the call data in automatically. Nobody types notes at the end of a shift.",
        },
      ],
      helps: [
        {
          title: "You stop paying a salary for one channel",
          desc: "A human caller runs $1,500–$5,000 a month and covers outbound only, forty hours a week. Andy starts at $1,600 and doesn't clock out.",
        },
        {
          title: "Spanish-speaking sellers get the same call",
          desc: "Fluent English and Spanish on every dial, so a motivated seller never gets lost to language.",
        },
        {
          title: "Objections get handled in the moment",
          desc: "No hesitation, no shuffling through a script binder while the seller loses interest.",
        },
        {
          title: "No fatigue, turnover, or training cycle",
          desc: "Call one thousand sounds like call one. There is no bad day to manage around.",
        },
      ],
      callout: {
        eyebrow: "List reactivation",
        title: "Your old leads aren’t dead. They’re just unworked.",
        body: "Every lead you have ever paid for is still sitting in your CRM. The ones nobody called back. The ones that went quiet eight months ago. The ones somebody marked “not interested” before the seller had a reason to be interested. No human caller can justify working a list that cold — there are always warmer names in front of them. Andy has no such constraint. He works the old list because his hours aren’t the thing you’re rationing.",
        points: [
          "The dead list gets dialed, not archived",
          "A “no” from last year isn’t a “no” today — circumstances are exactly what change",
          "A two-year-old lead gets the same five-pillar qualification as a fresh one",
          "You already paid to acquire these names — working them again costs you nothing new",
        ],
      },
      priceRange: "$1,600 – $2,500 / month",
      priceLow: 1600,
      priceHigh: 2500,
      pricedBy: "Priced by call volume and script complexity",
    },
  },
  {
    id: "randy",
    mono: "R",
    name: "Randy",
    role: "Inbound · Reception",
    blurb: "Answers every inbound call, 24/7",
    accentVar: "--color-randy",
    tile: "bg-randy",
    accent: "text-randy",
    desc: "Answers every call that comes in — including the 11pm one you would have missed. Answers property questions, captures seller details, and runs the same qualification framework as Andy while you sleep.",
    features: [
      "24/7 — never a voicemail",
      "Consistent and professional every time",
      "Fluent English & Spanish",
    ],
    live: "Live in 1–3 days",
    price: "From $1,200/mo",
    page: {
      title: "Randy — 24/7 AI Receptionist for Real Estate",
      description:
        "Randy answers every inbound call around the clock — property questions answered, seller details captured, every caller qualified. From $1,200/mo.",
      headline: "The 11pm call gets answered.",
      lede: "Randy is the inbound half of your acquisitions team. Every call that comes in gets a conversation instead of a beep — property questions answered, seller details captured, and the same qualification Andy runs, at any hour.",
      accomplishes: [
        {
          title: "Never a voicemail",
          desc: "168 hours of coverage a week against a human's 40. After-hours calls become conversations, not messages you return tomorrow.",
        },
        {
          title: "Property questions answered on the spot",
          desc: "Sellers get their answers while they're still interested, instead of waiting for a callback that decides the deal.",
        },
        {
          title: "Seller details captured every time",
          desc: "The information you need lands in your system on the call, not from memory afterwards.",
        },
        {
          title: "The same five pillars as Andy",
          desc: "Inbound and outbound score sellers identically, so your pipeline reads the same regardless of who picked up.",
        },
      ],
      helps: [
        {
          title: "Deals stop dying in the gap",
          desc: "The seller who called at 9pm and hit voicemail called the next investor. That gap is where deals leak, and it closes.",
        },
        {
          title: "One professional first impression",
          desc: "Every caller gets the same composed, professional Randy — no bad days, no attitude, no whoever-was-nearest.",
        },
        {
          title: "Bilingual on every inbound call",
          desc: "English and Spanish, so a Spanish-speaking seller isn't a call you can't take.",
        },
        {
          title: "Live in as little as a day",
          desc: "Randy is the fastest of the three to stand up — 1–3 days from scoping call to answering.",
        },
      ],
      priceRange: "$1,200 – $1,800 / month",
      priceLow: 1200,
      priceHigh: 1800,
      pricedBy: "Priced by inbound volume and integrations",
    },
  },
  {
    id: "alyssa",
    mono: "A",
    name: "Alyssa",
    role: "Back office · Follow-up & ops",
    blurb: "Runs follow-up so nothing slips",
    accentVar: "--color-alyssa",
    tile: "bg-alyssa",
    accent: "text-alyssa",
    desc: "The one your competitors don’t have. Alyssa works behind the scenes — follow-up sequences, inbox organization, CRM hygiene — custom-built around how your operation actually runs.",
    features: [
      "Email & SMS follow-up sequences",
      "Custom workflows for your business",
      "Keeps the pipeline organized while you close",
    ],
    live: "Live in <7 days",
    price: "From $1,500/mo",
    page: {
      title: "Alyssa — AI Follow-Up & Back Office for Real Estate",
      description:
        "Alyssa runs email and SMS follow-up, inbox organization and CRM hygiene, built around how your operation actually runs. From $1,500/mo.",
      headline: "The one your competitors don’t have.",
      lede: "Alyssa works behind the scenes. Follow-up sequences, inbox organization, CRM hygiene — the operational work that decides whether a warm lead closes or quietly goes cold, built around how your business actually runs.",
      accomplishes: [
        {
          title: "Follow-up runs without you remembering",
          desc: "Email and SMS sequences fire on their own, so nothing falls through the cracks between the first call and the close.",
        },
        {
          title: "The pipeline stays organized while you close",
          desc: "CRM hygiene and inbox organization happen continuously, not in a Sunday-night catch-up session.",
        },
        {
          title: "Workflows matched to your business",
          desc: "Alyssa is scoped to your operation rather than dropped in from a template — however unusual the way you run it.",
        },
        {
          title: "Andy and Randy's work doesn't go stale",
          desc: "The leads they qualify get worked afterwards, which is where most of the value in a lead list actually sits.",
        },
      ],
      helps: [
        {
          title: "You stop personally chasing leads",
          desc: "The owner chasing follow-up is the most expensive labour in the business. That's the job Alyssa takes.",
        },
        {
          title: "Warm leads stop going cold",
          desc: "A lead nobody followed up on is indistinguishable from a lead you never generated. You already paid for it.",
        },
        {
          title: "Your competitors aren't doing this",
          desc: "Plenty of investors have a caller. Very few have the back office running itself behind the caller.",
        },
        {
          title: "Scoped to what you actually need",
          desc: "Priced after a consultation because the work is genuinely custom — not a fixed package you pay for regardless.",
        },
      ],
      priceRange: "$1,500 – $6,000 / month",
      priceLow: 1500,
      priceHigh: 6000,
      pricedBy: "Scoped after consultation — fully custom",
    },
  },
];

export const getAgent = (id: string) => AGENTS.find((a) => a.id === id);
