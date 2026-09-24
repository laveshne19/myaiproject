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
    name: "Meetings",
    detail: "Walk out with a conclusion, to-do list, and suggestions — not an hour of raw audio.",
  },
  {
    icon: GraduationCap,
    name: "Lectures",
    detail: "A semester of classes becomes a searchable, summarized archive.",
  },
  {
    icon: Stethoscope,
    name: "Doctors",
    detail: "Dictate between patients; review structured notes in the app later.",
  },
  {
    icon: Scale,
    name: "Lawyers",
    detail: "Client consultations captured verbatim, summarized into action points.",
  },
  {
    icon: Newspaper,
    name: "Journalists",
    detail: "Interviews transcribed in any of 112 languages, ready to quote.",
  },
  {
    icon: BookOpen,
    name: "Students",
    detail: "Record the class, ask Recolx AI the questions you forgot to.",
  },
  {
    icon: Briefcase,
    name: "Sales & Business",
    detail: "Client calls turned into follow-ups and next steps automatically.",
  },
  {
    icon: Building2,
    name: "Corporate Teams",
    detail: "All-hands and reviews distilled into briefs everyone actually reads.",
  },
  {
    icon: Video,
    name: "Content Creators",
    detail: "Voice memos and interviews become drafts and scripts, fast.",
  },
];

export function Modes() {
  return (
    <section id="modes" className="relative py-28 lg:py-36">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Built for how you work"
          title="One recorder. Every kind of workday."
          description="With 71 built-in Pro Templates in the Recolx app, your notes come out structured for the work you actually do — whoever you are and whatever the room sounds like."
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
