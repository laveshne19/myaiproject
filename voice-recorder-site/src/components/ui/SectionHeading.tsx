import { clsx } from "clsx";
import { Eyebrow } from "./Eyebrow";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  titleId,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
  titleId?: string;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        id={titleId}
        className={clsx(
          "text-balance text-4xl font-semibold tracking-[-0.02em] text-ink sm:text-5xl lg:text-6xl",
          align === "center" && "max-w-3xl"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={clsx(
            "text-balance text-lg leading-relaxed text-ink-muted",
            align === "center" ? "max-w-2xl" : "max-w-xl"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
