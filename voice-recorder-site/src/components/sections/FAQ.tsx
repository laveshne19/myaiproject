"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/motion";
import { faqs } from "@/lib/faq";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28 lg:py-36">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow="Questions" title="Everything before you press record." />

        <Reveal variants={fadeUp} className="mx-auto w-full max-w-3xl">
          <div className="flex flex-col divide-y divide-border rounded-3xl border border-border bg-white/[0.02]">
            {faqs.map((item, i) => {
              const expanded = open === i;
              return (
                <div key={item.question}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(expanded ? null : i)}
                      aria-expanded={expanded}
                      aria-controls={`faq-panel-${i}`}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-8"
                    >
                      <span
                        data-speakable-summary
                        className="text-base font-medium text-ink sm:text-lg"
                      >
                        {item.question}
                      </span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-ink-muted transition-transform duration-300 ${
                          expanded ? "rotate-45 border-signal text-signal" : ""
                        }`}
                      >
                        <Plus size={15} />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed text-ink-muted sm:px-8">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
