import type { Detail } from "./agents";

/**
 * Content for the AI-vs-human comparison page. Sourced from the positioning
 * brief — the $1,500–$5,000 caller cost, 40 vs 168 hours, outbound-only scope,
 * and the five-pillar framework. No performance claims.
 */

export const TRUE_COSTS: Detail[] = [
  {
    title: "The salary is the part you already knew",
    desc: "$1,500–$5,000+ a month, hourly plus commission, for one caller covering one channel. It is the only line of this list that shows up on a P&L.",
  },
  {
    title: "Training is a cost, and it recurs",
    desc: "Every hire learns your scripts, your criteria, your market and your CRM from scratch. Turnover means paying that cost again, and the calls made during the learning curve are your leads.",
  },
  {
    title: "Turnover is not an edge case",
    desc: "Cold calling has among the highest churn of any sales role. The question is not whether you re-hire but how often, and what the pipeline looks like in the gap.",
  },
  {
    title: "Management is your time",
    desc: "Someone checks whether the calls got made, whether the notes got logged, whether the tone was right. That someone is usually the owner — the most expensive labour in the business.",
  },
  {
    title: "Coverage stops at 40 hours",
    desc: "Nights, weekends and holidays are not covered at any salary. A motivated seller who calls at 9pm on Saturday reaches voicemail, and voicemail is where deals go to die.",
  },
];

export const HUMAN_WINS: Detail[] = [
  {
    title: "Closing the deal",
    desc: "Potri qualifies and books. It does not negotiate a contract, walk a property, or sit at a kitchen table. The appointment lands on your calendar precisely so a human can do that part.",
  },
  {
    title: "Genuinely unusual situations",
    desc: "Probate tangles, multi-party disputes, a seller whose circumstances don't fit any script. Qualification frameworks are built for the pattern, and these are the exceptions.",
  },
  {
    title: "Long-term relationship building",
    desc: "The agent, the wholesaler down the road, the investor you split a deal with. That network is built by a person over years, and no phone agent replaces it.",
  },
  {
    title: "Judgment about your business",
    desc: "Which markets to enter, which deals to walk from, what to pay. Potri executes a defined job well; it does not decide strategy.",
  },
];

export const ROWS: [string, string, string][] = [
  ["Monthly cost", "~$5,000+ (hourly + commission)", "$5,200 flat, all three agents"],
  ["Coverage", "40 hrs/week", "168 hrs/week"],
  ["Scope", "Outbound calling only", "Outbound + inbound + follow-up"],
  ["After-hours calls", "Straight to voicemail", "Answered, every time"],
  ["Languages", "Whatever that person speaks", "English and Spanish, every call"],
  ["Qualification consistency", "Varies by caller and by day", "Same five pillars, call 1 and call 1,000"],
  ["Ramp time", "Weeks of training per hire", "Live in under six days"],
  ["Sick days, turnover, attitude", "Yours to manage", "None"],
  ["Closing the deal", "Yes", "No — books the appointment for you"],
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Is an AI cold caller better than hiring a human cold caller?",
    a: "For the top of the funnel — dialing a list, qualifying against fixed criteria, and booking appointments — an AI caller covers 168 hours a week instead of 40, applies the same framework to every seller, and costs about what one human costs. For closing the deal, negotiating a contract, or handling a genuinely unusual situation, a human is still better. Most investors use both: Potri qualifies and books, and a human takes the appointment.",
  },
  {
    q: "What does a human cold caller actually cost?",
    a: "The salary is $1,500–$5,000+ per month depending on hours and commission. The costs that don't appear on the P&L are training every new hire on your scripts and market, re-paying that cost at each turnover, the owner's time spent managing whether calls got made, and the nights and weekends that are never covered at any salary.",
  },
  {
    q: "Can AI replace my entire acquisitions team?",
    a: "No, and Potri does not claim to. It replaces the calling, qualification and follow-up work — the outbound dialing, the inbound answering, and the sequences in between. It hands you a booked appointment with a qualified seller. Someone still has to run that appointment and close the deal.",
  },
  {
    q: "Will sellers hang up on an AI caller?",
    a: "Some will, exactly as some hang up on a human cold caller. What changes is the volume and consistency underneath: every lead on the list gets dialed rather than only the ones somebody reached before 5pm, and every seller who does engage is qualified on the same five pillars. Potri deliberately publishes no capture or conversion rate, because it has not earned one to publish.",
  },
  {
    q: "How long does it take to replace a cold caller with AI?",
    a: "Under six days with Potri. Day one is a scoping call mapping your lead sources, CRM, calendar and qualification criteria. Days two and three are build and training. Days four and five are test calls that you listen to and approve. Day six it goes live. A human hire, by comparison, takes weeks of recruiting plus weeks of ramp.",
  },
];
