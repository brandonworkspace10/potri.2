import fs from "node:fs";
import path from "node:path";
import { CRM_TOOLS, OPS_TOOLS, type Tool } from "@/lib/tools";
import { Container } from "./ui";

// Labels are kept short enough to sit on one line — a wrapping label drags
// every card in the row to its height and pads the short ones with dead space.
const STATS = [
  { big: "168 hrs", label: "Covered weekly, vs a human's 40", tone: "text-brand" },
  { big: "6 days", label: "Signed Monday, live Saturday", tone: "text-randy" },
  { big: "EN + ES", label: "Fluent on every single call", tone: "text-alyssa" },
  { big: "$5,200", label: "Flat monthly, all three agents", tone: "text-ink" },
];

const EXT = ["svg", "png", "webp"] as const;

/**
 * Resolved once at build time: which slugs have a logo file on disk.
 * Drop one into public/logos and it replaces the wordmark with no code change.
 */
function resolveLogos(): Map<string, string> {
  const dir = path.join(process.cwd(), "public", "logos");
  const found = new Map<string, string>();
  if (!fs.existsSync(dir)) return found;
  for (const file of fs.readdirSync(dir)) {
    const ext = file.split(".").pop()?.toLowerCase();
    if (!ext || !EXT.includes(ext as (typeof EXT)[number])) continue;
    found.set(file.slice(0, -(ext.length + 1)), `/logos/${file}`);
  }
  return found;
}

function Chip({ tool, logo }: { tool: Tool; logo?: string }) {
  return (
    <span className="flex h-[54px] shrink-0 items-center gap-2.5 whitespace-nowrap rounded-xl border border-subtle bg-card px-4">
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element -- fixed-size marquee art; next/image buys nothing here
        <img
          src={logo}
          alt=""
          width={22}
          height={22}
          decoding="async"
          // several of these marks ship on a white plate — rounding reads as an
          // app icon rather than a white box punched into the card
          className="h-[22px] w-[22px] shrink-0 rounded-[5px] object-contain"
        />
      ) : null}
      <span className="text-[14px] font-medium text-muted">{tool.name}</span>
    </span>
  );
}

function Marquee({
  items,
  dir,
  logos,
}: {
  items: Tool[];
  dir: "l" | "r";
  logos: Map<string, string>;
}) {
  return (
    <div className="marquee">
      {/* rendered twice — the -50% loop depends on the duplicate */}
      <div className={`marquee-track ${dir === "l" ? "marquee-l" : "marquee-r"}`}>
        {[...items, ...items].map((t, i) => (
          <Chip key={`${t.slug}-${i}`} tool={t} logo={logos.get(t.slug)} />
        ))}
      </div>
    </div>
  );
}

export function ProofStrip() {
  const logos = resolveLogos();

  return (
    <section
      id="integrations"
      className="scroll-mt-20 border-y border-subtle bg-elevated py-8 sm:py-10"
    >
      <Container>
        <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.big} className="rounded-xl border border-subtle bg-card p-4 sm:p-5">
              <p
                className={`text-[21px] font-semibold tracking-[-0.03em] sm:text-[23px] ${s.tone}`}
              >
                {s.big}
              </p>
              <p className="mt-1 text-[12.5px] leading-[1.4] text-dim">{s.label}</p>
            </div>
          ))}
        </div>
      </Container>

      <div className="mt-8 sm:mt-10">
        <Container>
          <p className="text-center font-mono text-[10px] font-medium uppercase tracking-[0.32em] text-dim">
            Connects with the tools you already run
          </p>
        </Container>

        <div className="mt-6 flex flex-col gap-3" aria-hidden>
          <Marquee items={CRM_TOOLS} dir="l" logos={logos} />
          <Marquee items={OPS_TOOLS} dir="r" logos={logos} />
        </div>

        <Container>
          <p className="mx-auto mt-7 max-w-[620px] text-center text-[13.5px] leading-[1.6] text-dim">
            <span className="font-medium text-muted">Don&apos;t see yours?</span> Every
            build is custom. We map whatever you actually run on the day-one scoping call
            and configure the team around it.
          </p>
        </Container>
      </div>
    </section>
  );
}
