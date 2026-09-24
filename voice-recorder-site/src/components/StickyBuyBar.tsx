"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function StickyBuyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-4 transition-all duration-300 md:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <div className="glass-strong flex items-center justify-between gap-4 rounded-2xl px-4 py-3 shadow-2xl shadow-black/40">
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-ink">{site.name}</span>
          <span className="text-xs text-ink-muted">₹{site.price.display} · No-cost EMI</span>
        </div>
        <Button href={site.amazonUrl} className="h-11 px-5 text-sm">
          Buy now
        </Button>
      </div>
    </div>
  );
}
