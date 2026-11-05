"use client";

import { Mail, FileText, ArrowUpRight } from "lucide-react";
import { Github, Linkedin } from "lucide-brands";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteConfig, socialLinks } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  github: <Github size={20} />,
  linkedin: <Linkedin size={20} />,
  mail: <Mail size={20} />,
};

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeader title="CONTACT" />
        </AnimatedSection>

        <div className="max-w-2xl">
          <AnimatedSection delay={0.1}>
            <h2 className="heading-display text-[clamp(2rem,5vw,3.5rem)] text-highlight mb-6">
              Let&apos;s build something together.
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <p className="body-lg mb-10 max-w-lg">
              Whether you have a project idea, a question, or just want to
              connect — I&apos;d love to hear from you.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="space-y-4">
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
                  className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-border-strong hover:bg-surface/20 transition-all duration-200 group"
                >
                  <span className="text-text-muted group-hover:text-accent transition-colors">
                    {iconMap[link.icon] ?? <Mail size={20} />}
                  </span>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-text-primary group-hover:text-highlight transition-colors">
                      {link.label}
                    </span>
                    <p className="text-xs text-text-muted">
                      {link.url === "#" || link.url === "mailto:#"
                        ? "Link to be added"
                        : link.url.replace("mailto:", "").replace("https://", "")}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-text-muted group-hover:text-accent transition-colors"
                  />
                </a>
              ))}

              {/* Resume download */}
              <a
                href="#"
                className="flex items-center gap-4 p-4 rounded-lg border border-dashed border-border hover:border-border-strong transition-all duration-200 group"
              >
                <span className="text-text-muted group-hover:text-accent transition-colors">
                  <FileText size={20} />
                </span>
                <div className="flex-1">
                  <span className="text-sm font-medium text-text-primary group-hover:text-highlight transition-colors">
                    Résumé
                  </span>
                  <p className="text-xs text-text-muted">
                    Download link to be added
                  </p>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-text-muted group-hover:text-accent transition-colors"
                />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

