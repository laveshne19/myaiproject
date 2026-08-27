import { Check, ShieldCheck, Truck, Undo2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { fadeUp } from "@/lib/motion";

const plans = [
  {
    name: "Recolx Tap",
    price: "$249",
    cadence: "one-time",
    description: "The recorder, on-device AI, forever.",
    features: [
      "40-hour battery, pocket charging case",
      "Unlimited on-device transcription",
      "3 cloud AI summaries / month",
      "All 9 profession modes",
      "1-year hardware warranty",
    ],
    cta: "Buy Recolx Tap",
    highlight: false,
  },
  {
    name: "Recolx Tap + AI Pro",
    price: "$299",
    cadence: "first year included",
    description: "Everything, plus unlimited cloud intelligence.",
    features: [
      "Everything in Recolx Tap",
      "Unlimited cloud transcription & summaries",
      "Real-time translation, 42 languages",
      "Multi-device sync & sharing",
      "Priority support, 60-day trial",
    ],
    cta: "Buy the bundle",
    highlight: true,
  },
  {
    name: "AI Pro",
    price: "$12",
    cadence: "/ month, for existing owners",
    description: "Upgrade a Recolx Tap you already own.",
    features: [
      "Unlimited cloud transcription & summaries",
      "Real-time translation, 42 languages",
      "Multi-device sync & sharing",
      "Cancel anytime",
    ],
    cta: "Add AI Pro",
    highlight: false,
  },
];

const assurances = [
  { icon: Truck, label: "Free worldwide shipping" },
  { icon: Undo2, label: "60-day money-back trial" },
  { icon: ShieldCheck, label: "Encrypted by default" },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-28 lg:py-36">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          eyebrow="Pricing"
          title="Own the hardware. Choose the intelligence."
          description="One honest price for the device, and an optional subscription for teams that live in the cloud."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} variants={fadeUp} delay={i * 0.08}>
              <div
                className={`relative flex h-full flex-col gap-8 rounded-3xl border p-8 ${
                  plan.highlight
                    ? "border-signal/50 bg-gradient-to-b from-signal/[0.08] to-transparent shadow-[0_0_0_1px_rgba(232,166,85,0.25),0_30px_80px_-30px_rgba(232,166,85,0.35)] lg:-translate-y-4"
                    : "border-border bg-white/[0.03]"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-8 rounded-full bg-signal px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-signal-ink">
                    Most popular
                  </span>
                )}
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-ink">{plan.name}</h3>
                  <p className="text-sm text-ink-muted">{plan.description}</p>
                </div>

                <div className="flex items-end gap-2">
                  <span className="text-4xl font-semibold tracking-tight text-ink">
                    {plan.price}
                  </span>
                  <span className="pb-1 text-xs text-ink-faint">{plan.cadence}</span>
                </div>

                <ul className="flex flex-1 flex-col gap-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink-muted">
                      <Check size={16} className="mt-0.5 shrink-0 text-signal" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  href="#"
                  variant={plan.highlight ? "primary" : "secondary"}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal variants={fadeUp}>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-border pt-10">
            {assurances.map((a) => (
              <span key={a.label} className="flex items-center gap-2.5 text-sm text-ink-muted">
                <a.icon size={16} className="text-signal" />
                {a.label}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
