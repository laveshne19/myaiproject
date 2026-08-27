export const site = {
  name: "Recolx Tap",
  fullName: "Recolx Tap AI Voice Recorder",
  tagline: "The AI recorder that keeps up with everything you say.",
  description:
    "Recolx Tap is the AI voice recorder for people who can't afford to miss a word — meetings, lectures, interviews, and clinical notes, transcribed, translated, and summarized on-device and in the cloud. No phone-app-only workaround, no bolted-on subscription required for the basics.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://shivaaionline.in",
  basePath: "/voice-recorder",
  ogImage: "/og-cover.svg",
  twitter: "@recolxai",
  price: {
    currency: "USD",
    amount: "249",
  },
  keywords: [
    "Recolx Tap",
    "AI voice recorder",
    "Plaud alternative",
    "Plaud NotePin alternative",
    "AI meeting recorder",
    "AI transcription device",
    "voice memo AI",
    "AI note taker",
    "wearable AI recorder",
    "lecture recorder",
    "digital voice recorder",
    "pocket voice recorder",
    "audio recorder with AI",
    "meeting summary device",
    "best AI voice recorder 2026",
  ],
};

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Product", href: "#product" },
  { label: "Intelligence", href: "#demo" },
  { label: "Modes", href: "#modes" },
  { label: "Compare", href: "#compare" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];
