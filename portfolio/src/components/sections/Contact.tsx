"use client";

import { Mail, FileText, ArrowUpRight, Download } from "lucide-react";
import { Github, Linkedin } from "lucide-brands";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { socialLinks } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  github: <Github size={20} />,
  linkedin: <Linkedin size={20} />,
  mail: <Mail size={20} />,
};

export function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-20 md:py-28 lg:py-32">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeader title="CONTACT" />
        </AnimatedSection>

        <div className="max-w-2xl">
          <AnimatedSection delay={0.1}>
            <h2 className="heading-display text-[clamp(1.75rem,5vw,3rem)] text-highlight mb-4 sm:mb-6">
              Let&apos;s build something together.
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <p className="body-lg mb-8 sm:mb-10 max-w-lg text-sm sm:text-base md:text-lg">
              Whether you have a project idea, a question, or just want to
              connect — I&apos;d love to hear from you.
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
