import fs from "node:fs";
import path from "node:path";
import { CRM_TOOLS, OPS_TOOLS, type Tool } from "@/lib/tools";
import { Container } from "./ui";

const STATS = [
  { big: "168 hrs", label: "Covered every week — vs 40 from a human", tone: "text-brand" },
  { big: "6 days", label: "Signed Monday, working by Saturday", tone: "text-randy" },
  { big: "EN + ES", label: "Fluent bilingual on every single call", tone: "text-alyssa" },
  { big: "$5,200", label: "Flat per month for the full three-agent team", tone: "text-ink" },
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
    <span className="flex h-[54px] shrink-0 items-center justify-center whitespace-nowrap rounded-xl border border-subtle bg-card px-5">
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element -- static marquee art, no layout shift to solve
        <img
          src={logo}
          alt={tool.name}
          height={22}
          className="h-[22px] w-auto opacity-70 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0"
        />
      ) : (
        <span className="text-[14px] font-medium text-muted">{tool.name}</span>
      )}
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
      className="scroll-mt-20 border-y border-subtle bg-elevated py-10 sm:py-12"
    >
      <Container>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.big} className="rounded-2xl border border-subtle bg-card p-6 sm:p-7">
              <p
                className={`text-[30px] font-semibold tracking-[-0.035em] sm:text-[34px] ${s.tone}`}
              >
                {s.big}
              </p>
              <p className="mt-2 text-sm leading-[1.45] text-dim">{s.label}</p>
            </div>
          ))}
        </div>
      </Container>

      <div className="mt-10 sm:mt-12">
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
