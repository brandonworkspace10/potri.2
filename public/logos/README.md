# Tool logos

Drop a logo here and the tools marquee picks it up automatically — no code change.

## How

Name the file after the tool's `slug` in `lib/tools.ts`, e.g.:

    public/logos/podio.svg
    public/logos/resimpli.svg
    public/logos/gohighlevel.png

Accepted: `.svg` (preferred), `.png`, `.webp`.

`components/integrations.tsx` reads this directory at build time. If a file
matching the slug exists it renders the image; otherwise it falls back to a
styled text wordmark. Mixed logos and wordmarks are fine — a tool with no logo
still shows.

## Why they aren't here already

- The standard MIT-licensed icon set (simple-icons) has had Salesforce, Slack,
  Twilio, Pipedrive, Monday.com, Podio and Outlook **removed at those brands'
  request**, so they cannot be sourced from it.
- The real-estate-specific tools (REsimpli, InvestorFuse, GoHighLevel, Follow Up
  Boss, PropStream, BatchLeads, DealMachine, CallTools, Mojo Dialer, ReadyMode,
  Forefront CRM) have never been in any icon set.

That leaves downloading each vendor's brand asset directly. Most vendors publish
a press kit with usage terms attached, and those terms are a decision for the
business to make — several prohibit use that implies a partnership. Since this
page makes no partnership claim ("we build around your stack", "don't see
yours?"), a nominative "works with" use is usually the intended case, but the
call belongs to you, not to the build.

## Rendering notes

Logos render at a fixed height, greyscale-neutral, and lift to full opacity on
hover, so a wall of clashing brand colours doesn't fight the page. Supply
single-colour or light-on-dark marks where you can.
