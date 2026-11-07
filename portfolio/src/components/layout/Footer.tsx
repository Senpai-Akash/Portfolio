"use client";
import { useEffect, useState } from "react";

import { ArrowUp, Mail } from "lucide-react";
import { Github, Linkedin } from "lucide-brands";
import { navItems, socialLinks } from "@/lib/data";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const iconMap: Record<string, React.ReactNode> = {
    github: <Github size={17} />,
    linkedin: <Linkedin size={17} />,
    mail: <Mail size={17} />,
  };

  return (
    <footer className="border-t border-border bg-bg">
      <div className="section-container py-10 sm:py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 text-center md:text-left">
          {/* Left: Wordmark + copyright */}
          <div className="space-y-2 sm:space-y-3">
            <button
              onClick={scrollToTop}
              className="font-heading font-bold text-lg sm:text-xl tracking-tight text-text-primary hover:text-highlight transition-colors cursor-pointer"
            >
              AKASH
            </button>
            <p className="text-xs text-text-muted">

              © {year ?? 2026} Akash Anderson. All rights reserved.

            </p>
          </div>

          {/* Center: Navigation */}
          <nav className="flex flex-wrap justify-center md:justify-start gap-x-5 sm:gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-xs sm:text-sm text-text-muted hover:text-text-primary active:text-highlight transition-colors py-1 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right: Social + Back to top */}
          <div className="flex items-center justify-center md:justify-end gap-3 sm:gap-4">
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
                className="w-9 h-9 flex items-center justify-center rounded-lg text-text-muted hover:text-accent hover:bg-surface-subtle active:bg-surface-subtle transition-colors cursor-pointer"
                aria-label={link.label}
              >
                {iconMap[link.icon] ?? <Mail size={17} />}
              </a>
            ))}

            <div className="w-px h-5 bg-border mx-1" />

            <button
              onClick={scrollToTop}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-text-muted hover:text-accent hover:bg-surface-subtle active:bg-surface-subtle transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp size={17} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
