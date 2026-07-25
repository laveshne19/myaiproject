"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, CloudUpload, Cpu, Mic, Waves } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const STAGES = [
  { icon: Mic, title: "Voice capture", detail: "Dual MEMS mics, 48kHz lossless." },
  { icon: Waves, title: "Noise filtering", detail: "Neural denoising, on-device." },
  { icon: Cpu, title: "On-device AI", detail: "Local inference, zero latency." },
  { icon: Brain, title: "Neural transcription", detail: "Speech-to-text, speaker ID." },
  { icon: CloudUpload, title: "Cloud sync", detail: "Encrypted summary, everywhere." },
];

export function TechDiagram() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const nodes = nodesRef.current?.children ?? [];

      if (reduce) {
        gsap.set(nodes, { opacity: 1, y: 0 });
        gsap.set(lineRef.current, { scaleX: 1 });
        return;
      }

      gsap.set(nodes, { opacity: 0, y: 28 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      tl.to(lineRef.current, { scaleX: 1, duration: 1.1, ease: "power2.inOut" }).to(
        nodes,
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.14, ease: "power3.out" },
        "-=0.7"
      );

      gsap.to(dotRef.current, {
        left: "100%",
        duration: 3.2,
        ease: "power1.inOut",
        repeat: -1,
        delay: 1.4,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 lg:py-36">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          eyebrow="Under the hood"
          title="Three AI engines. One seamless pipeline."
          description="On-device inference for instant response, neural models for accuracy, cloud intelligence for depth — orchestrated so you never notice the handoff."
        />

        <div className="relative py-10">
          <div className="absolute left-0 right-0 top-[2.75rem] hidden h-px bg-border sm:block">
            <div ref={lineRef} className="h-full w-full bg-signal/50" />
            <span
              ref={dotRef}
              className="absolute -top-[3px] left-0 h-2 w-2 rounded-full bg-signal shadow-[0_0_12px_2px_rgba(232,166,85,0.7)]"
            />
          </div>

          <div
            ref={nodesRef}
            className="relative grid grid-cols-1 gap-8 sm:grid-cols-5 sm:gap-4"
          >
            {STAGES.map((stage) => (
              <div key={stage.title} className="flex flex-col items-center gap-4 text-center">
                <span className="flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full border border-border-strong bg-bg-elevated text-signal shadow-[0_0_0_6px_rgba(255,255,255,0.02)]">
                  <stage.icon size={26} strokeWidth={1.6} />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold text-ink">{stage.title}</h3>
                  <p className="text-xs leading-relaxed text-ink-faint">{stage.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
