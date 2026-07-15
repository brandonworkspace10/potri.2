export type Agent = {
  /** anchor id — the team card and the nav dropdown both use it */
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
  },
];
