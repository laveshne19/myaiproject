import { Check, Minus, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/motion";

type Cell = true | false | "partial";

const markRows: { feature: string; recolx: Cell; plaud: Cell; phone: Cell }[] = [
  { feature: "Live AI transcription", recolx: true, plaud: true, phone: "partial" },
  { feature: "AI summaries (conclusion, to-do, suggestions)", recolx: true, plaud: true, phone: false },
  { feature: "Ask AI — chat with your own recordings", recolx: true, plaud: true, phone: false },
  { feature: "112-language transcription", recolx: true, plaud: true, phone: false },
  { feature: "Free tier included with device", recolx: true, plaud: true, phone: true },
];

const textRows: { feature: string; recolx: string; plaud: string }[] = [
  { feature: "Device price", recolx: "₹12,999 one-time (incl. GST)", plaud: "—" },
  { feature: "Pro plan", recolx: "₹1,399/mo (₹6,899/yr billed annually)", plaud: "₹1,999/mo (₹9,900/yr billed annually)" },
  { feature: "Unlimited plan", recolx: "₹2,099/mo (₹17,399/yr billed annually)", plaud: "₹2,999/mo (₹24,900/yr billed annually)" },
  { feature: "Built-in summary templates", recolx: "71", plaud: "10,000+" },
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
          title="Same plans. About 30% less."
          description="Recolx Tap and Plaud NotePin both pair with a companion app and offer Free, Pro, and Unlimited plans for higher usage. Recolx Tap's Pro and Unlimited plans are priced roughly 30% below Plaud's equivalent tiers."
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
                {markRows.map((row) => (
                  <tr key={row.feature} className="border-b border-border">
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
                {textRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i !== textRows.length - 1 ? "border-b border-border" : ""}
                  >
                    <td className="p-5 text-ink-muted">{row.feature}</td>
                    <td className="bg-signal/[0.04] p-5 text-center font-medium text-ink">
                      {row.recolx}
                    </td>
                    <td className="p-5 text-center text-ink-muted">{row.plaud}</td>
                    <td className="p-5 text-center text-ink-faint">—</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <p className="text-xs italic text-ink-faint">
          Comparison reflects publicly available information at time of publishing and may change.
        </p>
      </Container>
    </section>
  );
}
