import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { AIDemo } from "@/components/sections/AIDemo";
import { Modes } from "@/components/sections/Modes";
import { Testimonials } from "@/components/sections/Testimonials";
import { Comparison } from "@/components/sections/Comparison";
import { TechDiagram } from "@/components/sections/TechDiagram";
import { Pricing } from "@/components/sections/Pricing";
import { OrderInquiry } from "@/components/sections/OrderInquiry";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-signal focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-signal-ink"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" className="flex-1">
        <Hero />
        <Features />
        <AIDemo />
        <Modes />
        <TechDiagram />
        <Testimonials />
        <Comparison />
        <Pricing />
        <OrderInquiry />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyBuyBar />
    </>
  );
}
