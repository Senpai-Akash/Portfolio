"use client";

import { ArrowUp, Mail } from "lucide-react";
import { Github, Linkedin } from "lucide-brands";
import { navItems, socialLinks } from "@/lib/data";
import { SocialTooltip, type SocialItem } from "@/components/ui/social-media";

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
    github: <Github size={18} />,
    linkedin: <Linkedin size={18} />,
    mail: <Mail size={18} />,
  };

  const socialColors: Record<string, string> = {
    github: "#24292e",
    linkedin: "#0a66c2",
    mail: "#ea4335",
  };

  const socialItems: SocialItem[] = socialLinks.map((link) => ({
    href: link.url,
    ariaLabel: link.label,
    tooltip: link.label === "Email" ? "Email Me" : link.label,
    color: socialColors[link.icon] ?? "#3282b8",
    icon: iconMap[link.icon] ?? <Mail size={18} />,
  }));

  return (
    <footer className="relative z-10 border-t border-border bg-bg/80 backdrop-blur-xs">
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
            <p className="text-xs text-text-muted" suppressHydrationWarning>
              © {new Date().getFullYear()} Akash Anderson. All rights reserved.
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

          {/* Right: Interactive Social Media Tooltips + Back to top */}
          <div className="flex items-center justify-center md:justify-end gap-3 sm:gap-4">
            <SocialTooltip
              items={socialItems}
              tooltipPosition="top"
              size="md"
            />

            <div className="w-px h-5 bg-border mx-1" />

            <button
              onClick={scrollToTop}
              className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-surface-subtle/80 border border-border text-text-secondary hover:text-highlight hover:border-accent/40 active:bg-surface-subtle transition-all duration-200 cursor-pointer shadow-xs group"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp size={18} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
