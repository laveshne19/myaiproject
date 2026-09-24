"use client";

import { useState } from "react";
import { Check, Loader2, Mail, MessageSquare, ShoppingBag } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { fadeUp } from "@/lib/motion";
import { site } from "@/lib/site";

type Status = "idle" | "loading" | "done" | "error";

const inputClass =
  "h-12 w-full rounded-2xl border border-border bg-white/5 px-4 text-sm text-ink placeholder:text-ink-faint focus:border-signal focus:outline-none";

export function OrderInquiry() {
  const [status, setStatus] = useState<Status>("idle");

  return (
    <section id="order" className="relative py-28 lg:py-36">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Orders & enquiries"
          title="Bulk order? Question? Talk to us directly."
          description="Buying for a team, need a GST invoice, or just have a question before you order — send it here and we'll reply on email."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr]">
          <Reveal variants={fadeUp}>
            <div className="flex h-full flex-col gap-6 rounded-3xl border border-border bg-white/[0.03] p-8">
              <div className="flex flex-col gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-white/5 text-signal">
                  <ShoppingBag size={20} strokeWidth={1.75} />
                </span>
                <h3 className="text-lg font-semibold text-ink">Ready to buy now?</h3>
                <p className="text-sm leading-relaxed text-ink-muted">
                  Recolx Tap ships Prime from Amazon.in with no-cost EMI and a GST
                  invoice for business purchases.
                </p>
              </div>
              <Button href={site.amazonUrl} className="w-full">
                Buy on Amazon — ₹{site.price.display}
              </Button>
              <div className="flex flex-col gap-3 border-t border-border pt-6 text-sm text-ink-muted">
                <span className="flex items-center gap-2.5">
                  <Mail size={16} className="shrink-0 text-signal" />
                  <a
                    href={`mailto:${site.contactEmail}`}
                    className="transition-colors hover:text-ink"
                  >
                    {site.contactEmail}
                  </a>
                </span>
                <span className="flex items-center gap-2.5">
                  <MessageSquare size={16} className="shrink-0 text-signal" />
                  Replies within 1 business day
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal variants={fadeUp} delay={0.08}>
            {status === "done" ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 rounded-3xl border border-signal/40 bg-signal/10 p-10 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-signal text-signal-ink">
                  <Check size={24} />
                </span>
                <h3 className="text-xl font-semibold text-ink">Got it — we&apos;ll be in touch.</h3>
                <p className="max-w-sm text-sm text-ink-muted">
                  Your enquiry has been sent. We reply from {site.contactEmail} within
                  1 business day.
                </p>
              </div>
            ) : (
              <form
                name="order-inquiry"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                className="flex flex-col gap-4 rounded-3xl border border-border bg-white/[0.03] p-8"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (status === "loading") return;
                  setStatus("loading");
                  const form = e.currentTarget;
                  const data = new FormData(form);
                  try {
                    const res = await fetch("/", {
                      method: "POST",
                      headers: { "Content-Type": "application/x-www-form-urlencoded" },
                      body: new URLSearchParams(
                        data as unknown as Record<string, string>
                      ).toString(),
                    });
                    setStatus(res.ok ? "done" : "error");
                  } catch {
                    setStatus("error");
                  }
                }}
              >
                <input type="hidden" name="form-name" value="order-inquiry" />
                <p className="hidden">
                  <label>
                    Don&apos;t fill this out: <input name="bot-field" />
                  </label>
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="oi-name" className="text-xs font-medium text-ink-muted">
                      Name
                    </label>
                    <input id="oi-name" name="name" required placeholder="Your name" className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="oi-email" className="text-xs font-medium text-ink-muted">
                      Email
                    </label>
                    <input id="oi-email" name="email" type="email" required placeholder="you@work.com" className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="oi-phone" className="text-xs font-medium text-ink-muted">
                      Phone (optional)
                    </label>
                    <input id="oi-phone" name="phone" type="tel" placeholder="+91" className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="oi-qty" className="text-xs font-medium text-ink-muted">
                      Quantity
                    </label>
                    <select id="oi-qty" name="quantity" className={inputClass} defaultValue="1">
                      <option value="1">1 unit</option>
                      <option value="2-5">2–5 units</option>
                      <option value="6-20">6–20 units (team)</option>
                      <option value="20+">20+ units (bulk / corporate)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="oi-message" className="text-xs font-medium text-ink-muted">
                    Message
                  </label>
                  <textarea
                    id="oi-message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell us what you need — bulk pricing, GST details, questions about the app…"
                    className="w-full rounded-2xl border border-border bg-white/5 px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-signal focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-1 flex h-12 items-center justify-center gap-2 rounded-full bg-signal text-sm font-medium text-signal-ink transition-colors hover:bg-signal-strong disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    "Send enquiry"
                  )}
                </button>
                {status === "error" && (
                  <p className="text-center text-xs text-red-400">
                    Something went wrong — please retry, or email us directly at {site.contactEmail}.
                  </p>
                )}
              </form>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
