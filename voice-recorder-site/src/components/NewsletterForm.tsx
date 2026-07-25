"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { clsx } from "clsx";

export function NewsletterForm({
  id,
  className,
  align = "left",
}: {
  id: string;
  className?: string;
  align?: "left" | "center";
}) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
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
      className={clsx(
        "flex w-full max-w-sm items-center gap-2",
        align === "center" && "mx-auto",
        className
      )}
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <input
        id={id}
        type="email"
        required
        placeholder="you@work.com"
        className="h-12 w-full rounded-full border border-border bg-white/5 px-5 text-sm text-ink placeholder:text-ink-faint focus:border-signal focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-signal text-signal-ink transition-colors hover:bg-signal-strong"
      >
        <ArrowRight size={17} />
      </button>
    </form>
  );
}
