export const site = {
  name: "Aura",
  fullName: "Aura AI Voice Recorder",
  tagline: "The last recorder you'll ever carry.",
  description:
    "Aura is the AI voice recorder for people who can't afford to miss a word — meetings, lectures, interviews, and clinical notes, transcribed, translated, and summarized on-device and in the cloud.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://shivaaionline.in",
  basePath: "/voice-recorder",
  ogImage: "/og-cover.svg",
  twitter: "@auravoice",
  price: {
    currency: "USD",
    amount: "249",
  },
  keywords: [
    "AI voice recorder",
    "AI meeting recorder",
    "AI transcription device",
    "voice memo AI",
    "AI note taker",
    "lecture recorder",
    "digital voice recorder",
    "pocket voice recorder",
    "audio recorder with AI",
    "meeting summary device",
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
