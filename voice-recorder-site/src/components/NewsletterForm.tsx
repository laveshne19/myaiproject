"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { clsx } from "clsx";

type Status = "idle" | "loading" | "done" | "error";

export function NewsletterForm({
  id,
  className,
  align = "left",
}: {
  id: string;
  className?: string;
  align?: "left" | "center";
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");

  if (status === "done") {
    return (
      <div
        className={clsx(
          "flex h-12 w-full max-w-sm items-center gap-2 rounded-full border border-signal/40 bg-signal/10 px-5 text-sm text-signal",
          align === "center" && "mx-auto",
          className
        )}
      >
        <Check size={16} />
        You&apos;re on the list.
      </div>
    );
  }

  return (
    <form
      name="newsletter"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      className={clsx(
        "flex w-full max-w-sm items-center gap-2",
        align === "center" && "mx-auto",
        className
      )}
      onSubmit={async (e) => {
        e.preventDefault();
        if (status === "loading") return;
        setStatus("loading");
        try {
          const res = await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ "form-name": "newsletter", email }).toString(),
          });
          setStatus(res.ok ? "done" : "error");
        } catch {
          setStatus("error");
        }
      }}
    >
      <input type="hidden" name="form-name" value="newsletter" />
      <p className="hidden">
        <label>
          Don&apos;t fill this out: <input name="bot-field" />
        </label>
      </p>
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <input
        id={id}
        type="email"
        name="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@work.com"
        className="h-12 w-full rounded-full border border-border bg-white/5 px-5 text-sm text-ink placeholder:text-ink-faint focus:border-signal focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        disabled={status === "loading"}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-signal text-signal-ink transition-colors hover:bg-signal-strong disabled:opacity-60"
      >
        {status === "loading" ? (
          <Loader2 size={17} className="animate-spin" />
        ) : (
          <ArrowRight size={17} />
        )}
      </button>
      {status === "error" && (
        <span className="text-xs text-red-400">Try again</span>
      )}
    </form>
  );
}
