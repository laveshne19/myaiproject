import { Check, Minus, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/motion";

type Cell = true | false | "partial";

const rows: { feature: string; aura: Cell; standard: Cell; phone: Cell }[] = [
  { feature: "Live AI transcription", aura: true, standard: false, phone: "partial" },
  { feature: "Speaker identification", aura: true, standard: false, phone: false },
  { feature: "Real-time translation (42 languages)", aura: true, standard: false, phone: false },
  { feature: "AI summaries & action items", aura: true, standard: false, phone: false },
  { feature: "Neural noise reduction", aura: true, standard: "partial", phone: "partial" },
  { feature: "Offline, on-device processing", aura: true, standard: true, phone: false },
  { feature: "40-hour battery life", aura: true, standard: "partial", phone: false },
  { feature: "Dedicated profession modes", aura: true, standard: false, phone: false },
  { feature: "Encrypted cloud sync", aura: true, standard: false, phone: "partial" },
];

const columns = [
  { key: "aura" as const, label: "Aura", highlight: true },
  { key: "standard" as const, label: "Standard recorders" },
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
          eyebrow="How it stacks up"
          title="Not another recorder with an app bolted on."
          description="Most recorders capture audio. Aura understands it. Here's the honest comparison."
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
