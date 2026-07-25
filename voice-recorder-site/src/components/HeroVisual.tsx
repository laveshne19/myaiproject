"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const EQ_BARS = Array.from({ length: 20 }, (_, i) => i);

export function HeroVisual() {
  const stageRef = useRef<HTMLDivElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) return;

      gsap.set(deviceRef.current, { opacity: 0, y: 60, scale: 0.9, rotateX: 8 });
      gsap.set(chipsRef.current?.children ?? [], { opacity: 0, y: 18, scale: 0.92 });

      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(deviceRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 1.3,
        ease: "power4.out",
      }).to(
        chipsRef.current?.children ?? [],
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: "power3.out" },
        "-=0.6"
      );

      if (!stageRef.current || !deviceRef.current) return;
      const xTo = gsap.quickTo(deviceRef.current, "rotateY", { duration: 0.7, ease: "power3" });
      const yTo = gsap.quickTo(deviceRef.current, "rotateX", { duration: 0.7, ease: "power3" });

      const stage = stageRef.current;
      const onMove = (e: PointerEvent) => {
        const rect = stage.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        xTo(px * 14);
        yTo(py * -14);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };
      stage.addEventListener("pointermove", onMove);
      stage.addEventListener("pointerleave", onLeave);
      return () => {
        stage.removeEventListener("pointermove", onMove);
        stage.removeEventListener("pointerleave", onLeave);
      };
    }, stageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={stageRef}
      className="relative mx-auto aspect-[4/5] w-full max-w-md [perspective:1400px]"
    >
      <svg
        className="absolute inset-0 h-full w-full animate-spin-slow opacity-40"
        viewBox="0 0 400 400"
        fill="none"
        aria-hidden
      >
        <circle cx="200" cy="200" r="188" stroke="var(--border-strong)" strokeDasharray="2 10" />
      </svg>
      <svg
        className="absolute inset-8 h-[calc(100%-4rem)] w-[calc(100%-4rem)] opacity-25"
        style={{ animation: "spin-slow 20s linear infinite reverse" }}
        viewBox="0 0 400 400"
        fill="none"
        aria-hidden
      >
        <circle cx="200" cy="200" r="160" stroke="var(--signal)" strokeDasharray="1 14" />
      </svg>

      <div
        ref={deviceRef}
        className="glass-strong noise absolute inset-[12%] flex flex-col items-center justify-between overflow-hidden rounded-[2.75rem] p-7 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.75)] [transform-style:preserve-3d]"
      >
        <div className="flex w-full items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
            Aura · 01
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
            <span className="h-1.5 w-1.5 animate-pulse-ring rounded-full bg-signal" />
            Live
          </span>
        </div>

        <div className="relative flex h-40 w-40 items-center justify-center">
          <div className="absolute h-full w-full rounded-full bg-signal/25 blur-2xl" />
          <div className="absolute h-28 w-28 rounded-full border border-signal/40" />
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b from-signal to-signal-strong shadow-[inset_0_2px_6px_rgba(255,255,255,0.4),0_10px_30px_-6px_rgba(232,166,85,0.7)]">
            <div className="h-3.5 w-3.5 rounded-sm bg-signal-ink" />
          </div>
        </div>

        <div className="flex h-10 w-full items-end justify-center gap-[3px]">
          {EQ_BARS.map((i) => (
            <span
              key={i}
              className="w-[3px] animate-[eq_1.1s_ease-in-out_infinite] rounded-full bg-signal/70"
              style={{
                height: "100%",
                animationDelay: `${(i % 7) * 0.09}s`,
                opacity: 0.5 + (i % 5) * 0.1,
              }}
            />
          ))}
        </div>
      </div>

      <div ref={chipsRef} className="pointer-events-none absolute inset-0">
        <div className="glass absolute -left-4 top-6 rounded-2xl px-4 py-3 text-left sm:-left-10">
          <p className="text-lg font-semibold text-ink">98.7%</p>
          <p className="text-[11px] text-ink-muted">Transcription accuracy</p>
        </div>
        <div className="glass absolute -right-2 top-[38%] rounded-2xl px-4 py-3 text-left sm:-right-8">
          <p className="text-lg font-semibold text-ink">42</p>
          <p className="text-[11px] text-ink-muted">Languages, live</p>
        </div>
        <div className="glass absolute -left-2 bottom-8 rounded-2xl px-4 py-3 text-left sm:-left-8">
          <p className="text-lg font-semibold text-ink">40 hrs</p>
          <p className="text-[11px] text-ink-muted">On a single charge</p>
        </div>
      </div>
    </div>
  );
}
