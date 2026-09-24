const LOGOS = [
  "CONSULTING",
  "HEALTHCARE",
  "LEGAL",
  "JOURNALISM",
  "ACADEMIA",
  "FIELD RESEARCH",
  "PRODUCT & DESIGN",
  "SALES TEAMS",
];

export function LogoMarquee() {
  const loop = [...LOGOS, ...LOGOS];
  return (
    <div className="mask-fade-x relative overflow-hidden py-2">
      <div className="flex w-max animate-marquee items-center gap-16">
        {loop.map((logo, i) => (
          <span
            key={`${logo}-${i}`}
            className="shrink-0 font-mono text-sm tracking-[0.18em] text-ink-faint"
          >
            {logo}
          </span>
        ))}
      </div>
    </div>
  );
}
