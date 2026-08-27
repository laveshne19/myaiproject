import Link from "next/link";
import { AtSign, Camera, PlayCircle, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/NewsletterForm";
import { site } from "@/lib/site";

const columns = [
  {
    heading: "Product",
    links: [
      { label: "Recolx Tap Recorder", href: "#product" },
      { label: "AI Intelligence", href: "#demo" },
      { label: "Modes", href: "#modes" },
      { label: "Compare", href: "#compare" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    heading: "Use cases",
    links: [
      { label: "Meetings", href: "#modes" },
      { label: "Lectures", href: "#modes" },
      { label: "Medical", href: "#modes" },
      { label: "Legal", href: "#modes" },
      { label: "Journalism", href: "#modes" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Recolx Tap", href: "#" },
      { label: "Journal", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press kit", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Warranty", href: "#" },
      { label: "Privacy policy", href: "#" },
      { label: "Terms of service", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
];

const socials = [
  { icon: AtSign, href: "https://twitter.com/recolxai", label: "Twitter" },
  { icon: Camera, href: "https://instagram.com/recolxai", label: "Instagram" },
  { icon: Users, href: "https://linkedin.com/company/recolxai", label: "LinkedIn" },
  { icon: PlayCircle, href: "https://youtube.com/@recolxai", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-bg-elevated">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_2fr]">
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2.5 text-xl font-semibold text-ink">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-signal">
                <span className="h-3 w-3 rounded-full bg-signal-ink" />
              </span>
              {site.name}
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
              {site.description}
            </p>

            <NewsletterForm id="footer-email" />
            <p className="text-xs text-ink-faint">
              One dispatch a month. Product notes, field recordings, zero noise.
            </p>

            <div className="flex gap-3 pt-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink-muted transition-colors hover:border-border-strong hover:text-ink"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.heading} className="flex flex-col gap-4">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
                  {col.heading}
                </h3>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-ink-muted transition-colors hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.fullName}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-ink-muted">Privacy</Link>
            <Link href="#" className="hover:text-ink-muted">Terms</Link>
            <Link href="#" className="hover:text-ink-muted">Sitemap</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
