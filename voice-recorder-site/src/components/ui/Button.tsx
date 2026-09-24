import { clsx } from "clsx";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-40 disabled:pointer-events-none";

const sizes = "h-12 px-6";

const variants: Record<Variant, string> = {
  primary:
    "bg-signal text-signal-ink hover:bg-signal-strong shadow-[0_0_0_1px_rgba(232,166,85,0.4),0_18px_40px_-12px_rgba(232,166,85,0.55)] hover:shadow-[0_0_0_1px_rgba(255,185,104,0.6),0_22px_50px_-10px_rgba(255,185,104,0.65)] active:scale-[0.97]",
  secondary:
    "glass text-ink hover:border-border-strong hover:bg-white/[0.08] active:scale-[0.97]",
  ghost: "text-ink-muted hover:text-ink",
};

type ButtonProps = {
  variant?: Variant;
  href?: string;
  className?: string;
  children: React.ReactNode;
} & ComponentPropsWithoutRef<"button">;

export function Button({
  variant = "primary",
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = clsx(base, sizes, variants[variant], className);

  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    return (
      <Link
        href={href}
        className={classes}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
