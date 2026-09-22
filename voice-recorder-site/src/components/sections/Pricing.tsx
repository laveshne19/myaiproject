import { Check, CreditCard, ShieldCheck, Undo2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { fadeUp } from "@/lib/motion";
import { site } from "@/lib/site";

const features = [
  "Recolx app pairing — transcribe, summarize & analyze every recording",
  "GPT-5.2-powered Ask Recolx AI",
  "71 built-in Pro Templates",
  "112-language transcription",
  "Conclusion, To-Do List & Suggestions on every recording",
  "EMI available from ₹352/month",
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
          title="One price. Everything included."
          description="No subscription tiers, no metered AI credits — the device, the app, and GPT-5.2 intelligence in a single purchase."
        />

        <Reveal variants={fadeUp}>
          <div className="mx-auto flex w-full max-w-xl flex-col gap-8 rounded-3xl border border-signal/50 bg-gradient-to-b from-signal/[0.08] to-transparent p-10 shadow-[0_0_0_1px_rgba(232,166,85,0.25),0_30px_80px_-30px_rgba(232,166,85,0.35)]">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-ink">Recolx Tap</h3>
              <p className="text-sm text-ink-muted">The recorder, the app, GPT-5.2 AI — everything included.</p>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-end gap-3">
                <span className="text-5xl font-semibold tracking-tight text-ink">
                  ₹{site.price.display}
                </span>
                <span className="pb-1.5 text-sm text-ink-faint line-through">₹{site.price.mrp}</span>
              </div>
              <span className="text-xs text-ink-faint">one-time · inclusive of all taxes</span>
            </div>

            <ul className="flex flex-col gap-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-ink-muted">
                  <Check size={16} className="mt-0.5 shrink-0 text-signal" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={site.amazonUrl} className="flex-1">
                Buy on Amazon
              </Button>
              <Button href="#" variant="secondary" className="flex-1">
                Buy on Recolx.ai
              </Button>
            </div>
          </div>
        </Reveal>

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
