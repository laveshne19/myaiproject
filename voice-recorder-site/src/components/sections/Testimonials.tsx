import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMarquee } from "@/components/LogoMarquee";
import { fadeUp } from "@/lib/motion";

const reasons = [
  {
    title: "No overlapping-voice confusion",
    detail:
      "Speaker separation untangles multi-person conversations automatically — no manual labeling after the fact.",
  },
  {
    title: "Clinical- and legal-grade vocabulary",
    detail:
      "Dedicated Medical and Legal modes retune the transcription engine for technical terminology and chain-of-custody timestamps.",
  },
  {
    title: "Full-day battery, not a session timer",
    detail:
      "Up to 40 hours of continuous recording, so it survives a full conference day or a semester of back-to-back lectures.",
  },
  {
    title: "Works before you're online",
    detail:
      "Transcription runs on-device by default — no dead zone or spotty conference-hall Wi-Fi turns your recording into raw, unusable audio.",
  },
  {
    title: "Built for how you actually work",
    detail:
      "Nine profession-specific modes retune vocabulary, formatting, and summary style — from courtroom depositions to investigative interviews.",
  },
  {
    title: "Try it risk-free",
    detail:
      "Every Recolx Tap ships with a 60-day trial. If it doesn't earn a permanent place in your pocket, send it back for a full refund.",
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
