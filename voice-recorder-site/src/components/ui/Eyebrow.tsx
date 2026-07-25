import { clsx } from "clsx";

export function Eyebrow({
  children,
  className,
  dot = true,
}: {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted",
        className
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />}
      {children}
    </span>
  );
}
