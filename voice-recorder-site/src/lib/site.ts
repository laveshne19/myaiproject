export const site = {
  name: "Recolx Tap",
  fullName: "Recolx Tap AI Voice Recorder",
  tagline: "The AI recorder that keeps up with everything you say.",
  description:
    "Recolx Tap is the AI voice recorder for people who can't afford to miss a word — meetings, lectures, and interviews, transcribed and structured into a conclusion, to-do list, and suggestions via the Recolx app, powered by GPT-5.2.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://shivaaionline.in",
  basePath: "/voice-recorder",
  ogImage: "/recolx-tap-device.webp",
  twitter: "@recolxai",
  amazonUrl: "https://www.amazon.in/dp/B0DYNFTBGS",
  contactEmail: "laveshne19@gmail.com",
  price: {
    currency: "INR",
    amount: "12999",
    display: "12,999",
    mrp: "29,990",
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
  { label: "Compare", href: "#compare" },
  { label: "Pricing", href: "#pricing" },
  { label: "Order", href: "#order" },
  { label: "FAQ", href: "#faq" },
];
