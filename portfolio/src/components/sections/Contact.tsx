"use client";

import { Mail, FileText, ArrowUpRight, Download } from "lucide-react";
import { Github, Linkedin } from "lucide-brands";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "../ui/SectionHeader";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text";
import { DotPattern } from "@/components/ui/dot-pattern";
import { socialLinks } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  github: <Github size={20} />,
  linkedin: <Linkedin size={20} />,
  mail: <Mail size={20} />,
};

export function Contact() {
  return (
    <section id="contact" className="relative py-16 sm:py-20 md:py-28 lg:py-32 overflow-hidden">
      {/* Subtle Dot Pattern Ambient Layer */}
      <DotPattern
        width={24}
        height={24}
        cx={1}
        cy={1}
        cr={1}
        className="pointer-events-none absolute inset-0 h-full w-full fill-accent/10 [mask-image:radial-gradient(ellipse_600px_450px_at_50%_35%,white,transparent)]"
      />

      <div className="section-container relative z-10">
        <AnimatedSection>
          <SectionHeader title="CONTACT" />
        </AnimatedSection>

        <div className="max-w-2xl">
          <AnimatedSection delay={0.1}>
            <h2 className="heading-display text-[clamp(1.75rem,5vw,3rem)] text-highlight mb-4 sm:mb-6">
              <BlurredStagger text="Let's build something together." delay={0.02} />
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <p className="body-lg mb-8 sm:mb-10 max-w-lg text-sm sm:text-base md:text-lg">
              <BlurredStagger
                as="span"
                text="Whether you have a project idea, a question, or just want to connect — I'd love to hear from you."
                delay={0.008}
              />
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="space-y-3 sm:space-y-4">
              {/* Social links */}
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    link.url.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-lg border border-border hover:border-border-strong hover:bg-surface/20 active:bg-surface/30 transition-all duration-200 group"
                >
                  <span className="text-text-muted group-hover:text-accent transition-colors flex-shrink-0">
                    {iconMap[link.icon] ?? <Mail size={20} />}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-text-primary group-hover:text-highlight transition-colors block">
                      {link.label}
                    </span>
                    <p className="text-xs text-text-muted truncate">
                      {link.url === "#" || link.url === "mailto:#"
                        ? "Link to be added"
                        : link.url.replace("mailto:", "").replace("https://", "")}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-text-muted group-hover:text-accent transition-colors flex-shrink-0"
                  />
                </a>
              ))}

              {/* Resume download */}
              <a
                href="/Akash_Anderson_Resume.pdf"
                download="Akash_Anderson_Resume.pdf"
                className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-lg border border-dashed border-border hover:border-border-strong active:bg-surface/20 transition-all duration-200 group"
              >
                <span className="text-text-muted group-hover:text-accent transition-colors flex-shrink-0">
                  <FileText size={20} />
                </span>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-text-primary group-hover:text-highlight transition-colors block">
                    Résumé
                  </span>
                  <p className="text-xs text-text-muted truncate">
                    PDF • Direct Download
                  </p>
                </div>
                <Download
                  size={16}
                  className="text-text-muted group-hover:text-accent transition-colors flex-shrink-0"
                />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
