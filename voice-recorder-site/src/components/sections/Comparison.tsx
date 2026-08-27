import { Check, Minus, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/motion";

type Cell = true | false | "partial";

const rows: { feature: string; recolx: Cell; plaud: Cell; phone: Cell }[] = [
  { feature: "Live AI transcription", recolx: true, plaud: true, phone: "partial" },
  { feature: "Works without the companion app", recolx: true, plaud: false, phone: "partial" },
  { feature: "On-device processing (no cloud round-trip)", recolx: true, plaud: false, phone: false },
  { feature: "Full AI features without a subscription", recolx: true, plaud: false, phone: true },
  { feature: "Speaker identification", recolx: true, plaud: "partial", phone: false },
  { feature: "Real-time translation (42 languages)", recolx: true, plaud: "partial", phone: false },
  { feature: "AI summaries & action items", recolx: true, plaud: true, phone: false },
  { feature: "Dedicated profession modes", recolx: true, plaud: false, phone: false },
  { feature: "40-hour battery life", recolx: true, plaud: "partial", phone: false },
  { feature: "Encrypted cloud sync", recolx: true, plaud: "partial", phone: "partial" },
];

const columns = [
  { key: "recolx" as const, label: "Recolx Tap", highlight: true },
  { key: "plaud" as const, label: "Plaud NotePin" },
  { key: "phone" as const, label: "Phone voice memos" },
];

function Mark({ value }: { value: Cell }) {
  if (value === true)
    return (
      <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-signal/15 text-signal">
        <Check size={13} strokeWidth={2.5} />
      </span>
    );
  if (value === "partial")
    return (
      <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-ink-faint">
        <Minus size={13} strokeWidth={2.5} />
      </span>
    );
  return (
    <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-ink-faint/60">
      <X size={13} strokeWidth={2.5} />
    </span>
  );
}

export function Comparison() {
  return (
    <section id="compare" className="relative py-28 lg:py-36">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Recolx Tap vs Plaud NotePin"
          title="Not another recorder that needs a subscription to be useful."
          description="Plaud pairs a small recorder with a phone app and a metered AI-credit plan. Recolx Tap processes transcription and summaries on-device by default — no app dependency, no subscription required to get accurate transcripts. Here's the honest side-by-side."
        />

        <Reveal variants={fadeUp}>
          <div className="overflow-x-auto rounded-3xl border border-border">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-5 text-left font-medium text-ink-muted">Capability</th>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className={`p-5 text-center font-medium ${
                        col.highlight ? "bg-signal/10 text-signal" : "text-ink-muted"
                      }`}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i !== rows.length - 1 ? "border-b border-border" : ""}
                  >
                    <td className="p-5 text-ink-muted">{row.feature}</td>
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`p-5 text-center ${col.highlight ? "bg-signal/[0.04]" : ""}`}
                      >
                        <Mark value={row[col.key]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
