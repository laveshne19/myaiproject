import {
  AudioLines,
  CloudUpload,
  Fingerprint,
  Languages,
  Mic,
  Search,
  Share2,
  Sparkles,
  Waves,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/motion";

const features = [
  {
    icon: AudioLines,
    title: "AI Transcription",
    description:
      "Studio-grade speech-to-text at 98.7% accuracy, streaming as you speak — technical terms, accents, and crosstalk included.",
    span: "lg:col-span-2 lg:row-span-2",
    big: true,
  },
  {
    icon: Mic,
    title: "AI Recording",
    description: "Lossless capture with adaptive gain, even from across a boardroom.",
  },
  {
    icon: Sparkles,
    title: "AI Summaries",
    description: "Every recording distilled into a page you'll actually read.",
  },
  {
    icon: Languages,
    title: "Live Translation",
    description: "42 languages, translated in real time as the room talks.",
  },
  {
    icon: Waves,
    title: "Noise Reduction",
    description: "Neural filtering isolates the human voice from any environment.",
  },
  {
    icon: Fingerprint,
    title: "Speaker ID",
    description: "Every voice tagged and separated, automatically, by name.",
  },
  {
    icon: CloudUpload,
    title: "Cloud Sync",
    description: "End-to-end encrypted backup the instant you're back online.",
  },
  {
    icon: Share2,
    title: "One-Click Share",
    description: "Send a transcript, clip, or summary anywhere in a tap.",
  },
  {
    icon: Search,
    title: "Voice Search",
    description: "Search anything you've ever said — find the moment, not the file.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-28 lg:py-36" aria-labelledby="features-heading">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          eyebrow="Built-in intelligence"
          title={
            <span id="features-heading">
              One device.
              <br className="hidden sm:block" /> Nine ways it thinks for you.
            </span>
          }
          description="Aura isn't a microphone with an app attached. Every recording runs through the same on-device and cloud AI stack — before you've even finished the sentence."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[13rem]">
          {features.map((feature, i) => (
            <Reveal
              key={feature.title}
              variants={fadeUp}
              delay={(i % 4) * 0.06}
              className={feature.span}
            >
              <article
                className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border bg-white/[0.03] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-border-strong hover:bg-white/[0.06] ${
                  feature.big ? "min-h-[18rem]" : "min-h-[13rem]"
                }`}
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-signal/0 blur-3xl transition-all duration-500 group-hover:bg-signal/15"
                  aria-hidden
                />
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-white/5 text-signal">
                  <feature.icon size={20} strokeWidth={1.75} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3
                    className={`font-semibold tracking-tight text-ink ${
                      feature.big ? "text-2xl" : "text-lg"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {feature.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
