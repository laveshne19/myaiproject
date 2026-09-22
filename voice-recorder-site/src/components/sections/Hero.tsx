import { ChevronDown, Play } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { HeroBackground } from "@/components/HeroBackground";
import { HeroVisual } from "@/components/HeroVisual";
import { fadeUp } from "@/lib/motion";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="product"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-32 pb-20"
    >
      <HeroBackground />
      <Container className="relative grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="flex flex-col items-start gap-8">
          <Reveal variants={fadeUp}>
            <Eyebrow>Recolx Tap · Now shipping</Eyebrow>
          </Reveal>

          <Reveal variants={fadeUp} delay={0.05}>
            <h1
              data-speakable-title
              className="text-balance text-5xl font-semibold leading-[1.03] tracking-[-0.03em] text-ink sm:text-6xl lg:text-[5.2rem]"
            >
              Every word,
              <br />
              <span className="text-ink-muted">remembered</span>{" "}
              <span className="text-signal">perfectly.</span>
            </h1>
          </Reveal>

          <Reveal variants={fadeUp} delay={0.1}>
            <p className="max-w-lg text-balance text-lg leading-relaxed text-ink-muted sm:text-xl">
              Recolx Tap is the AI voice recorder built for the moments you can&apos;t
              afford to lose — meetings, lectures, and interviews. Pair it with the
              Recolx app and GPT-5.2 turns every recording into notes you&apos;ll
              actually read.
            </p>
          </Reveal>

          <Reveal variants={fadeUp} delay={0.15}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href={site.amazonUrl} variant="primary" className="h-14 px-8 text-base">
                Buy on Amazon — ₹{site.price.display}
              </Button>
              <Button href="#demo" variant="secondary" className="h-14 px-8 text-base">
                <Play size={16} className="fill-current" />
                Watch it think
              </Button>
            </div>
          </Reveal>

          <Reveal variants={fadeUp} delay={0.2}>
            <div className="flex items-center gap-3 pt-2 text-sm text-ink-faint">
              <span className="flex items-center gap-1 text-signal">★★★★</span>
              <p>3.8 rated · 160+ reviews on Amazon.in</p>
            </div>
          </Reveal>
        </div>

        <Reveal variants={fadeUp} delay={0.15} className="relative">
          <HeroVisual />
        </Reveal>
      </Container>

      <div className="absolute inset-x-0 bottom-6 flex justify-center">
        <a
          href="#features"
          className="flex flex-col items-center gap-2 text-ink-faint transition-colors hover:text-ink-muted"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Scroll</span>
          <ChevronDown size={16} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}
