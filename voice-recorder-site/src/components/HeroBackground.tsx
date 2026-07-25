export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute left-1/2 top-[-10%] h-[70vh] w-[70vh] -translate-x-1/2 animate-drift rounded-full bg-signal/15 blur-[120px]" />
      <div
        className="absolute right-[8%] top-[20%] h-[45vh] w-[45vh] animate-drift rounded-full bg-orange-400/10 blur-[110px]"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="absolute left-[6%] bottom-[-5%] h-[50vh] w-[50vh] animate-drift rounded-full bg-amber-200/[0.06] blur-[130px]"
        style={{ animationDelay: "-12s" }}
      />
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent)",
        }}
      />
      <div className="noise absolute inset-0" />
    </div>
  );
}
