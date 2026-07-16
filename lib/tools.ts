export type Tool = {
  name: string;
  /** matches an optional file at public/logos/<slug>.(svg|png|webp) */
  slug: string;
};

/**
 * The stack this buyer actually runs. Listed as examples of what Potri gets
 * built around — not as certified integrations, which we have none to claim.
 *
 * Add a logo by dropping public/logos/<slug>.svg — see public/logos/README.md.
 */
export const CRM_TOOLS: Tool[] = [
  { name: "Podio", slug: "podio" },
  { name: "REsimpli", slug: "resimpli" },
  { name: "InvestorFuse", slug: "investorfuse" },
  { name: "GoHighLevel", slug: "gohighlevel" },
  { name: "Follow Up Boss", slug: "followupboss" },
  { name: "Salesforce", slug: "salesforce" },
  { name: "HubSpot", slug: "hubspot" },
  { name: "Pipedrive", slug: "pipedrive" },
  { name: "Zoho CRM", slug: "zoho" },
  { name: "Monday.com", slug: "monday" },
  { name: "Airtable", slug: "airtable" },
  { name: "Forefront CRM", slug: "forefront" },
  { name: "Close", slug: "close" },
  { name: "REI Reply", slug: "reireply" },
];

export const OPS_TOOLS: Tool[] = [
  { name: "Google Calendar", slug: "googlecalendar" },
  { name: "Calendly", slug: "calendly" },
  { name: "Outlook", slug: "outlook" },
  { name: "Cal.com", slug: "calcom" },
  { name: "PropStream", slug: "propstream" },
  { name: "BatchLeads", slug: "batchleads" },
  { name: "DealMachine", slug: "dealmachine" },
  { name: "CallTools", slug: "calltools" },
  { name: "Mojo Dialer", slug: "mojodialer" },
  { name: "ReadyMode", slug: "readymode" },
  { name: "Twilio", slug: "twilio" },
  { name: "Zapier", slug: "zapier" },
  { name: "Make", slug: "make" },
  { name: "Slack", slug: "slack" },
];
