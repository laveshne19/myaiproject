"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { site } from "@/lib/site";

const STATS = [
  { value: "GPT-5.2", label: "AI transcription engine" },
  { value: "112", label: "Languages transcribed" },
  { value: "71", label: "Pro summary templates" },
];

export function HeroVisual() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) return;

      gsap.set(deviceRef.current, { opacity: 0, y: 60, scale: 0.94, rotateX: 8 });
      gsap.set(statsRef.current?.children ?? [], { opacity: 0, y: 14 });

      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(deviceRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 1.3,
        ease: "power4.out",
      }).to(
        statsRef.current?.children ?? [],
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        "-=0.5"
      );

      if (!stageRef.current || !deviceRef.current) return;
      const xTo = gsap.quickTo(deviceRef.current, "rotateY", { duration: 0.7, ease: "power3" });
      const yTo = gsap.quickTo(deviceRef.current, "rotateX", { duration: 0.7, ease: "power3" });

      const stage = stageRef.current;
      const onMove = (e: PointerEvent) => {
        const rect = stage.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        xTo(px * 8);
        yTo(py * -8);
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
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="mx-auto flex w-full max-w-md flex-col gap-5">
      <div
        ref={stageRef}
        className="relative aspect-[4/5] w-full [perspective:1400px]"
      >
        <svg
          className="absolute inset-0 h-full w-full animate-spin-slow opacity-40"
          viewBox="0 0 400 400"
          fill="none"
          aria-hidden
        >
          <circle cx="200" cy="200" r="188" stroke="var(--border-strong)" strokeDasharray="2 10" />
        </svg>

        <div
          ref={deviceRef}
          className="glass-strong noise absolute inset-[7%] flex items-center justify-center overflow-hidden rounded-[2.75rem] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.75)] [transform-style:preserve-3d]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${site.basePath}/recolx-tap-device.webp`}
            alt="Recolx Tap AI voice recorder — actual product photo"
            className="h-full w-full object-contain p-5"
          />
        </div>
      </div>

      <div ref={statsRef} className="grid grid-cols-3 gap-3">
        {STATS.map((stat) => (
          <div key={stat.value} className="glass rounded-2xl px-3 py-3 text-center">
            <p className="text-base font-semibold text-ink">{stat.value}</p>
            <p className="text-[10px] leading-tight text-ink-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
