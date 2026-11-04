"use client";
import { type LucideProps } from 'lucide-react';
import { ArrowUp, Mail } from "lucide-react";
import { Github, Linkedin } from "lucide-brands";
import { navItems, socialLinks } from "@/lib/data";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const iconMap: Record<string, React.ReactNode> = {
    github: <Github size={16} />,
    linkedin: <Linkedin size={16} />,
    mail: <Mail size={16} />,
  };

  return (
    <footer className="border-t border-border bg-bg">
      <div className="section-container py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
          {/* Left: Wordmark + copyright */}
          <div className="space-y-3">
            <button
              onClick={scrollToTop}
              className="font-heading font-bold text-lg tracking-tight text-text-primary hover:text-highlight transition-colors"
            >
              AKASH
            </button>
            <p className="text-xs text-text-muted">
              © {new Date().getFullYear()} Akash. All rights reserved.
            </p>
          </div>

          {/* Center: Navigation */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-sm text-text-muted hover:text-text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right: Social + Back to top */}
          <div className="flex items-center gap-4">
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
                className="p-2 text-text-muted hover:text-accent transition-colors"
                aria-label={link.label}
              >
                {iconMap[link.icon] ?? <Mail size={16} />}
              </a>
            ))}

            <div className="w-px h-5 bg-border mx-1" />

            <button
              onClick={scrollToTop}
              className="p-2 text-text-muted hover:text-accent transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

