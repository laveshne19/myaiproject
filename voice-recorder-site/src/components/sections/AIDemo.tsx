"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Circle, Mic, Sparkles, FileText, ListChecks } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

const STAGES = [
  {
    key: "listen",
    label: "Listening",
    icon: Mic,
    caption: "0:00 — recording starts, on-device AI activates instantly.",
  },
  {
    key: "transcript",
    label: "Transcript",
    icon: FileText,
    caption: "0:04 — every speaker separated and captioned in real time.",
  },
  {
    key: "summary",
    label: "Summary",
    icon: Sparkles,
    caption: "0:41 — key themes distilled into a mindmap and a page.",
  },
  {
    key: "actions",
    label: "Action items",
    icon: ListChecks,
    caption: "0:44 — owners and deadlines pulled straight from the room.",
  },
] as const;

const TRANSCRIPT = [
  { speaker: "Mira", color: "bg-signal", line: "Let's lock the launch date before we lose the room." },
  { speaker: "Dev", color: "bg-sky-400", line: "If QA signs off Thursday, we can ship the 14th." },
  { speaker: "Priya", color: "bg-violet-400", line: "I'll own the press list — done by Wednesday." },
];

const SUMMARY_POINTS = [
  "Launch date tentatively set for the 14th, pending QA sign-off.",
  "Press outreach owned by Priya, due Wednesday.",
  "Engineering to confirm final build by Thursday EOD.",
];

const ACTIONS = [
  { task: "Confirm QA sign-off", owner: "Dev", done: true },
  { task: "Finalize press list", owner: "Priya", done: true },
  { task: "Lock launch date", owner: "Mira", done: false },
];

const AUTO_MS = 4200;

export function AIDemo() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((v) => (v + 1) % STAGES.length), AUTO_MS);
    return () => clearInterval(id);
  }, [paused]);

  const select = (i: number) => {
    setActive(i);
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 9000);
  };

  const stage = STAGES[active];

  return (
    <section id="demo" className="relative py-28 lg:py-36">
      <Container className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-12">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <Eyebrow>Watch it think</Eyebrow>
            <h2 className="text-balance text-4xl font-semibold tracking-[-0.02em] text-ink sm:text-5xl">
              From raw audio to
              <br className="hidden sm:block" /> a finished brief.
            </h2>
            <p className="max-w-lg text-lg leading-relaxed text-ink-muted">
              This is the same pipeline that runs on every Aura recording —
              no uploads, no waiting room. Follow one meeting from first word
              to final action item.
            </p>
          </div>

          <div className="flex flex-col gap-2" role="tablist" aria-label="AI processing stages">
            {STAGES.map((s, i) => (
              <button
                key={s.key}
                role="tab"
                aria-selected={active === i}
                onClick={() => select(i)}
                className={`group flex items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-all duration-300 ${
                  active === i
                    ? "border-border-strong bg-white/[0.06]"
                    : "border-transparent hover:bg-white/[0.03]"
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    active === i
                      ? "border-signal bg-signal text-signal-ink"
                      : "border-border text-ink-muted"
                  }`}
                >
                  <s.icon size={16} />
                </span>
                <span className="flex-1">
                  <span
                    className={`block text-sm font-medium ${
                      active === i ? "text-ink" : "text-ink-muted"
                    }`}
                  >
                    {s.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-ink-faint">{s.caption}</span>
                </span>
                <span className="relative h-1 w-14 shrink-0 overflow-hidden rounded-full bg-white/10">
                  {active === i && !paused && (
                    <motion.span
                      key={active}
                      className="absolute inset-y-0 left-0 rounded-full bg-signal"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: AUTO_MS / 1000, ease: "linear" }}
                    />
                  )}
                  {active === i && paused && (
                    <span className="absolute inset-y-0 left-0 w-full rounded-full bg-signal" />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="glass-strong noise relative flex min-h-[26rem] flex-col overflow-hidden rounded-[2.25rem] p-2 sm:min-h-[30rem]">
          <div className="flex items-center justify-between px-6 py-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
              Team Sync · Live
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-signal">
              <span className="h-1.5 w-1.5 animate-pulse-ring rounded-full bg-signal" />
              {stage.label}
            </span>
          </div>

          <div className="relative flex-1 px-6 pb-6">
            <AnimatePresence mode="wait">
              {active === 0 && (
                <motion.div
                  key="listen"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="flex h-full flex-col items-center justify-center gap-8"
                >
                  <div className="flex h-24 items-end gap-1.5">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <span
                        key={i}
                        className="w-1.5 animate-[eq_1.2s_ease-in-out_infinite] rounded-full bg-signal/70"
                        style={{
                          height: "100%",
                          animationDelay: `${(i % 9) * 0.08}s`,
                          opacity: 0.4 + (i % 6) * 0.1,
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-center text-sm text-ink-muted">
                    Capturing audio at 48kHz — noise reduction active
                  </p>
                </motion.div>
              )}

              {active === 1 && (
                <motion.div
                  key="transcript"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="flex h-full flex-col justify-center gap-5"
                >
                  {TRANSCRIPT.map((t, i) => (
                    <motion.div
                      key={t.speaker}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.25, duration: 0.5 }}
                      className="flex items-start gap-3"
                    >
                      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${t.color}`} />
                      <p className="text-sm leading-relaxed text-ink">
                        <span className="font-medium text-ink-muted">{t.speaker}: </span>
                        {t.line}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {active === 2 && (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="flex h-full flex-col justify-center gap-6"
                >
                  <svg viewBox="0 0 320 110" className="h-24 w-full opacity-90" aria-hidden>
                    <line x1="160" y1="55" x2="60" y2="20" stroke="var(--border-strong)" strokeWidth="1" />
                    <line x1="160" y1="55" x2="260" y2="20" stroke="var(--border-strong)" strokeWidth="1" />
                    <line x1="160" y1="55" x2="90" y2="95" stroke="var(--border-strong)" strokeWidth="1" />
                    <line x1="160" y1="55" x2="240" y2="95" stroke="var(--border-strong)" strokeWidth="1" />
                    <circle cx="160" cy="55" r="16" fill="var(--signal)" />
                    <circle cx="60" cy="20" r="8" fill="var(--surface-strong)" stroke="var(--border-strong)" />
                    <circle cx="260" cy="20" r="8" fill="var(--surface-strong)" stroke="var(--border-strong)" />
                    <circle cx="90" cy="95" r="8" fill="var(--surface-strong)" stroke="var(--border-strong)" />
                    <circle cx="240" cy="95" r="8" fill="var(--surface-strong)" stroke="var(--border-strong)" />
                  </svg>
                  <ul className="flex flex-col gap-3">
                    {SUMMARY_POINTS.map((point, i) => (
                      <motion.li
                        key={point}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2, duration: 0.5 }}
                        className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {active === 3 && (
                <motion.div
                  key="actions"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="flex h-full flex-col justify-center gap-3"
                >
                  {ACTIONS.map((a, i) => (
                    <motion.div
                      key={a.task}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2, duration: 0.5 }}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-white/[0.03] px-4 py-3.5"
                    >
                      <span className="flex items-center gap-3 text-sm text-ink">
                        {a.done ? (
                          <CheckCircle2 size={18} className="text-signal" />
                        ) : (
                          <Circle size={18} className="text-ink-faint" />
                        )}
                        <span className={a.done ? "text-ink-muted line-through" : ""}>
                          {a.task}
                        </span>
                      </span>
                      <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                        {a.owner}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
