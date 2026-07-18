import { Container, SectionHeading } from "./ui";

const ROWS: [string, string, string][] = [
  ["Monthly cost", "~$5,000+  hourly + commission", "$5,200 flat"],
  ["Coverage", "40 hrs / week", "168 hrs / week"],
  ["Scope", "Outbound only", "Outbound + inbound + follow-up"],
  ["After-hours calls", "Straight to voicemail", "Answered, every time"],
  ["Sick days, turnover, attitude", "Yours to manage", "None"],
];

export function MathSection() {
  return (
    <section id="math" className="cv-auto scroll-mt-20 border-y border-subtle bg-elevated py-12 sm:py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow="The math" title="One human vs. the Topri team" />

        <div className="mt-10 hidden overflow-x-auto sm:mt-13 sm:block">
          <table className="w-full min-w-[720px] border-separate border-spacing-0 text-left">
            <thead>
              <tr>
                <th className="w-[34%] px-7 pb-5" />
                <th className="w-[33%] px-7 pb-5 text-center text-[15px] font-semibold tracking-[-0.01em] text-dim">
                  One human caller
                </th>
                <th className="w-[33%] rounded-t-2xl border-x border-t border-[#5c3a1e] bg-card px-7 py-5 text-center text-[15px] font-semibold tracking-[-0.01em] text-brand">
                  Topri team
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([metric, human, topri], i) => {
                const last = i === ROWS.length - 1;
                return (
                  <tr key={metric}>
                    <td
                      className={`px-7 py-6 text-[15px] font-medium tracking-[-0.005em] text-muted ${
                        i > 0 ? "border-t border-subtle" : ""
                      }`}
                    >
                      {metric}
                    </td>
                    <td
                      className={`px-7 py-6 text-center text-[15px] tracking-[-0.005em] text-dim ${
                        i > 0 ? "border-t border-subtle" : ""
                      }`}
                    >
                      {human}
                    </td>
                    <td
                      className={[
                        "border-x border-[#5c3a1e] bg-card px-7 py-6 text-center text-[15px] font-semibold tracking-[-0.005em] text-ink",
                        "border-t border-t-subtle",
                        last ? "rounded-b-2xl border-b border-b-[#5c3a1e]" : "",
                      ].join(" ")}
                    >
                      {topri}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* mobile: one card per row instead of a clipped 3-column table */}
        <div className="mt-10 flex flex-col gap-3 sm:hidden">
          {ROWS.map(([metric, human, topri]) => (
            <div key={metric} className="rounded-2xl border border-subtle bg-card p-5">
              <p className="text-[13px] font-medium text-muted">{metric}</p>
              <div className="mt-3.5 grid grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-dim">
                    One human
                  </p>
                  <p className="mt-2 text-[13.5px] leading-[1.4] text-dim">{human}</p>
                </div>
                <div className="border-l border-subtle pl-4">
                  <p className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-brand">
                    Topri team
                  </p>
                  <p className="mt-2 text-[13.5px] font-semibold leading-[1.4] text-ink">
                    {topri}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
