import { Container, SectionHeading } from "./ui";

/** Tools this buyer actually runs. Listed as examples of what we build around — not as certified integrations. */
const ROW_ONE = [
  "Podio",
  "REsimpli",
  "InvestorFuse",
  "GoHighLevel",
  "Follow Up Boss",
  "Salesforce",
  "HubSpot",
  "Pipedrive",
  "Zoho CRM",
  "Monday.com",
  "Airtable",
  "Forefront CRM",
  "Close",
  "Zendesk Sell",
];

const ROW_TWO = [
  "Google Calendar",
  "Calendly",
  "Outlook",
  "Cal.com",
  "PropStream",
  "BatchLeads",
  "DealMachine",
  "CallTools",
  "Mojo Dialer",
  "ReadyMode",
  "Twilio",
  "Zapier",
  "Make",
  "Slack",
];

function Chip({ label }: { label: string }) {
  return (
    <span className="flex shrink-0 items-center whitespace-nowrap rounded-xl border border-subtle bg-card px-5 py-3.5 text-[14px] font-medium text-muted">
      {label}
    </span>
  );
}

function Marquee({ items, dir }: { items: string[]; dir: "l" | "r" }) {
  return (
    <div className="marquee">
      {/* rendered twice — the loop depends on the duplicate */}
      <div className={`marquee-track ${dir === "l" ? "marquee-l" : "marquee-r"}`}>
        {[...items, ...items].map((t, i) => (
          <Chip key={`${t}-${i}`} label={t} />
        ))}
      </div>
    </div>
  );
}

export function Integrations() {
  return (
    <section id="integrations" className="scroll-mt-20 py-16 sm:py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Your stack"
          title="We connect with your favorite tools"
          sub="Potri gets built around the software you already run. Nothing to rip out, nothing to migrate — your CRM, your calendar, your dialer, your data."
        />
      </Container>

      <div className="mt-10 flex flex-col gap-3 sm:mt-14" aria-hidden>
        <Marquee items={ROW_ONE} dir="l" />
        <Marquee items={ROW_TWO} dir="r" />
      </div>

      <Container>
        <div className="mx-auto mt-10 max-w-[720px] rounded-2xl border border-subtle bg-card p-7 text-center sm:mt-12">
          <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-ink">
            Don&apos;t see yours? That&apos;s not a problem.
          </h3>
          <p className="mx-auto mt-3 max-w-[560px] text-[14.5px] leading-[1.6] text-dim">
            Every build is custom. On the day-one scoping call we map whatever you
            actually use — however unusual the setup — and Andy, Randy and Alyssa are
            configured around it. If your operation runs on it, we build to it.
          </p>
        </div>
      </Container>
    </section>
  );
}
