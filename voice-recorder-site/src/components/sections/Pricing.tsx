import { Check, CreditCard, ShieldCheck, Undo2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { fadeUp } from "@/lib/motion";
import { site } from "@/lib/site";

const plans = [
  {
    name: "Starter",
    price: "Free",
    cadence: "Included with device",
    description: "GPT-5.2 transcription, on the house.",
    features: [
      "GPT-5.2 transcription via the Recolx app",
      "Ask Recolx AI",
      "71 built-in Pro Templates",
      "112-language transcription",
      "Standard monthly usage limit",
    ],
    cta: "Included with Recolx Tap",
    highlight: false,
  },
  {
    name: "Pro",
    price: "₹1,399",
    cadence: "/ month",
    annual: "or ₹6,899/year billed annually",
    description: "Higher usage limits for regular use.",
    features: [
      "Everything in Starter",
      "Higher monthly transcription limit",
      "Custom vocabulary",
      "Priority processing",
    ],
    cta: "Upgrade to Pro",
    highlight: true,
  },
  {
    name: "Unlimited",
    price: "₹2,099",
    cadence: "/ month",
    annual: "or ₹17,399/year billed annually",
    description: "For teams and power users.",
    features: [
      "Everything in Pro",
      "Unlimited monthly transcription",
      "Multi-device sync",
      "Priority support",
    ],
    cta: "Upgrade to Unlimited",
    highlight: false,
  },
];

const assurances = [
  { icon: CreditCard, label: "No-cost EMI available" },
  { icon: Undo2, label: "Easy returns via Amazon" },
  { icon: ShieldCheck, label: "Secure checkout & GST invoice" },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-28 lg:py-36">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          eyebrow="Pricing"
          title="Own the hardware. Choose your AI usage."
          description={`The device is a one-time ₹${site.price.display} purchase. Every Recolx Tap includes free GPT-5.2 transcription via the app — upgrade to Pro or Unlimited for higher usage.`}
        />

        <Reveal variants={fadeUp}>
          <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 rounded-3xl border border-border bg-white/[0.03] p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold text-ink">Recolx Tap device</h3>
              <p className="text-sm text-ink-muted">The recorder itself — required once, works with every plan below.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-semibold tracking-tight text-ink">₹{site.price.display}</span>
              <span className="text-sm text-ink-faint line-through">₹{site.price.mrp}</span>
            </div>
            <Button href={site.amazonUrl} className="sm:ml-4">
              Buy on Amazon
            </Button>
          </div>
        </Reveal>

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

                <div className="flex flex-col gap-1">
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-semibold tracking-tight text-ink">
                      {plan.price}
                    </span>
                    <span className="pb-1 text-xs text-ink-faint">{plan.cadence}</span>
                  </div>
                  {plan.annual && (
                    <span className="text-xs text-ink-faint">{plan.annual}</span>
                  )}
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
