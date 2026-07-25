import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMarquee } from "@/components/LogoMarquee";
import { fadeUp } from "@/lib/motion";

const testimonials = [
  {
    quote:
      "I stopped taking notes in client calls entirely. Aura's summary is more organized than what I used to write myself.",
    name: "Sofia Reyes",
    role: "Principal, Northfield Partners",
  },
  {
    quote:
      "Between rounds, the last thing I want is to type. Aura keeps up with clinical shorthand better than I expected.",
    name: "Dr. Amir Khalid",
    role: "Attending Physician",
  },
  {
    quote:
      "The speaker separation is the feature I didn't know I needed — three overlapping voices, perfectly untangled.",
    name: "Jonah Ubert",
    role: "Investigative Reporter",
  },
  {
    quote:
      "My lecture notes went from frantic scribbles to a searchable archive of an entire semester.",
    name: "Lena Cho",
    role: "Graduate Student, Applied Physics",
  },
  {
    quote:
      "Battery life is the real unlock. I record all day and it's still at 40% by the time I plug it in.",
    name: "Marcus Webb",
    role: "Field Producer",
  },
  {
    quote:
      "Deposition-grade accuracy from a device this small still doesn't feel real to me.",
    name: "Priya Nandan",
    role: "Litigation Associate",
  },
];

const stats = [
  { value: "4.9 / 5", label: "Average rating, 2,148 reviews" },
  { value: "40,000+", label: "Professionals recording daily" },
  { value: "60", label: "Countries shipped to" },
  { value: "98.7%", label: "Transcription accuracy" },
];

export function Testimonials() {
  return (
    <section className="relative py-28 lg:py-36">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          eyebrow="Field notes"
          title="People who can't afford to mishear something, trust Aura."
        />

        <LogoMarquee />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} variants={fadeUp} delay={(i % 3) * 0.08}>
              <figure className="flex h-full flex-col gap-6 rounded-3xl border border-border bg-white/[0.03] p-7">
                <div className="flex gap-1 text-signal" aria-hidden>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={14} className="fill-current" />
                  ))}
                </div>
                <blockquote className="flex-1 text-balance text-sm leading-relaxed text-ink-muted">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3 border-t border-border pt-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-medium text-ink-muted">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-sm font-medium text-ink">{t.name}</span>
                    <span className="text-xs text-ink-faint">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal variants={fadeUp}>
          <div className="grid grid-cols-2 gap-6 rounded-3xl border border-border bg-white/[0.03] px-8 py-10 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 text-center">
                <span className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  {s.value}
                </span>
                <span className="text-xs text-ink-faint">{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
