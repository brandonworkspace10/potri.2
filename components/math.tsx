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
    <section id="math" className="scroll-mt-20 border-y border-subtle bg-elevated py-24 lg:py-28">
      <Container>
        <SectionHeading eyebrow="The math" title="One human vs. the Potri team" />

        <div className="mt-13 overflow-x-auto">
          <table className="w-full min-w-[720px] border-separate border-spacing-0 text-left">
            <thead>
              <tr>
                <th className="w-[34%] px-7 pb-5" />
                <th className="w-[33%] px-7 pb-5 text-center text-[15px] font-semibold tracking-[-0.01em] text-dim">
                  One human caller
                </th>
                <th className="w-[33%] rounded-t-2xl border-x border-t border-[#5c3a1e] bg-card px-7 py-5 text-center text-[15px] font-semibold tracking-[-0.01em] text-brand">
                  Potri team
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([metric, human, potri], i) => {
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
                      {potri}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
