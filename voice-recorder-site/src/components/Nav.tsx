"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { navLinks, site } from "@/lib/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <Container>
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 ${
            scrolled ? "glass-strong" : "border border-transparent bg-transparent"
          }`}
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-ink"
          >
            <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-signal">
              <span className="h-2.5 w-2.5 rounded-full bg-signal-ink" />
            </span>
            {site.name}
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-ink-muted transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button href="#demo" variant="ghost" className="h-10 px-4">
              Watch demo
            </Button>
            <Button href="#pricing" className="h-10 px-5">
              Buy Recolx Tap — ${site.price.amount}
            </Button>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="md:hidden"
          >
            <Container>
              <div className="mt-3 flex flex-col gap-1 rounded-2xl border border-border-strong bg-bg-elevated/98 p-4 shadow-2xl shadow-black/60 backdrop-blur-2xl">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-base text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-2 flex gap-3 px-3 pb-1">
                  <Button href="#demo" variant="secondary" className="flex-1">
                    Watch demo
                  </Button>
                  <Button href="#pricing" className="flex-1">
                    Buy now
                  </Button>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
