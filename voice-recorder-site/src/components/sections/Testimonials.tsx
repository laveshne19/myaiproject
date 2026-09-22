import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMarquee } from "@/components/LogoMarquee";
import { fadeUp } from "@/lib/motion";

const reasons = [
  {
    title: "One price, not a subscription",
    detail:
      "GPT-5.2 transcription, summaries, and Ask Recolx AI are included free with the ₹12,999 device — upgrade to Pro or Unlimited only if you need more.",
  },
  {
    title: "Structured summaries, not a wall of text",
    detail:
      "Every recording becomes a clear conclusion, to-do list, and suggestions inside the Recolx app — not raw transcript you have to read yourself.",
  },
  {
    title: "Ask questions about your own recordings",
    detail:
      "Ask Recolx AI answers follow-up questions pulled directly from the transcript, powered by GPT-5.2.",
  },
  {
    title: "71 Pro Templates",
    detail:
      "Built-in summary formats so notes come out structured for the way you actually work — not one generic format for everything.",
  },
  {
    title: "Transcribes in 112 languages",
    detail: "Record in one language, get a transcript you can read in another.",
  },
  {
    title: "Easy on the wallet",
    detail:
      "No-cost EMI available from ₹352/month, secure checkout, and a GST invoice for business purchases.",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-28 lg:py-36">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          eyebrow="Why it holds up"
          title="Built for people who can't afford to mishear something."
        />

        <LogoMarquee />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} variants={fadeUp} delay={(i % 3) * 0.08}>
              <figure className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-white/[0.03] p-7">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-signal/15 text-signal">
                  <Check size={16} strokeWidth={2.5} />
                </span>
                <figcaption className="text-sm font-medium text-ink">{r.title}</figcaption>
                <p className="flex-1 text-balance text-sm leading-relaxed text-ink-muted">
                  {r.detail}
                </p>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
