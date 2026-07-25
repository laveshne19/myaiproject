import {
  Briefcase,
  BookOpen,
  Building2,
  GraduationCap,
  Newspaper,
  Scale,
  Stethoscope,
  Users,
  Video,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/motion";

const modes = [
  {
    icon: Users,
    name: "Meeting",
    detail: "Speaker-tagged notes, decisions, and owners — before you've left the room.",
  },
  {
    icon: GraduationCap,
    name: "Lecture",
    detail: "Slides, definitions, and timestamps synced to every key concept.",
  },
  {
    icon: Stethoscope,
    name: "Medical",
    detail: "Clinical vocabulary tuned for rounds, referrals, and chart-ready notes.",
  },
  {
    icon: Scale,
    name: "Lawyer",
    detail: "Chain-of-custody timestamps and verbatim accuracy for depositions.",
  },
  {
    icon: Newspaper,
    name: "Journalist",
    detail: "Interview-grade isolation with instant, quotable transcripts.",
  },
  {
    icon: BookOpen,
    name: "Student",
    detail: "Class recordings become searchable, summarized study guides.",
  },
  {
    icon: Briefcase,
    name: "Business",
    detail: "Client calls turned into CRM-ready notes and follow-ups.",
  },
  {
    icon: Building2,
    name: "Corporate",
    detail: "All-hands and reviews distilled into leadership-ready briefs.",
  },
  {
    icon: Video,
    name: "Content Creator",
    detail: "Voice memos and interviews become clip-ready scripts, fast.",
  },
];

export function Modes() {
  return (
    <section id="modes" className="relative py-28 lg:py-36">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Nine minds, one recorder"
          title="Aura adapts to what you do."
          description="Every profession hears a room differently. Aura ships with dedicated modes that retune the AI's vocabulary, formatting, and priorities for the work you actually do."
        />
      </Container>

      <div className="mask-fade-x mt-2">
        <div className="scrollbar-none flex gap-4 overflow-x-auto px-6 pb-4 sm:px-8 lg:px-12">
          {modes.map((mode, i) => (
            <Reveal
              key={mode.name}
              variants={fadeUp}
              delay={(i % 4) * 0.05}
              className="w-[16rem] shrink-0 sm:w-[18rem]"
            >
              <article className="group flex h-full flex-col gap-6 rounded-3xl border border-border bg-white/[0.03] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-border-strong hover:bg-white/[0.06]">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-white/5 text-signal transition-transform duration-500 group-hover:scale-110">
                  <mode.icon size={20} strokeWidth={1.75} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold tracking-tight text-ink">{mode.name}</h3>
                  <p className="text-sm leading-relaxed text-ink-muted">{mode.detail}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
