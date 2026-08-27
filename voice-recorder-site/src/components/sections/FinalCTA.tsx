import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { NewsletterForm } from "@/components/NewsletterForm";
import { fadeUp } from "@/lib/motion";

export function FinalCTA() {
  return (
    <section className="relative py-24 lg:py-32">
      <Container>
        <Reveal variants={fadeUp}>
          <div className="glass-strong noise relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center sm:px-16 sm:py-20">
            <div
              className="pointer-events-none absolute left-1/2 top-0 h-64 w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/20 blur-[110px]"
              aria-hidden
            />
            <div className="relative flex flex-col items-center gap-8">
              <h2 className="text-balance text-4xl font-semibold tracking-[-0.02em] text-ink sm:text-5xl lg:text-6xl">
                Stop taking notes.
                <br />
                Start being present.
              </h2>
              <p className="max-w-xl text-balance text-lg text-ink-muted">
                Recolx Tap ships worldwide with a 60-day trial. If it doesn&apos;t change
                how you work, send it back.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button href="#pricing" className="h-14 px-8 text-base">
                  Buy Recolx Tap — $249
                </Button>
                <Button href="#demo" variant="secondary" className="h-14 px-8 text-base">
                  Watch the demo
                </Button>
              </div>

              <div className="mt-4 flex w-full max-w-sm flex-col items-center gap-3 border-t border-border pt-8">
                <p className="text-xs uppercase tracking-[0.2em] text-ink-faint">
                  Not ready yet? Get the field guide
                </p>
                <NewsletterForm id="cta-email" align="center" />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
