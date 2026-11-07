"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Copy, Check, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useLoading } from "@/components/LoadingProvider";
import { navItems, socialLinks } from "@/lib/data";

/**
 * Tech-inspired corner reticle brackets that define the visual aesthetic of the reference navbar.
 * Renders 4 corner right-angle borders (top-left, top-right, bottom-left, bottom-right).
 */
function CornerBrackets({
  active = false,
  highlight = false,
  size = "sm",
}: {
  active?: boolean;
  highlight?: boolean;
  size?: "sm" | "md";
}) {
  const bracketSize = size === "md" ? "w-2 h-2" : "w-1.5 h-1.5";
  const borderColor = active
    ? "border-highlight"
    : highlight
    ? "border-accent group-hover:border-highlight"
    : "border-accent group-hover:border-highlight";
  const opacity = active
    ? "opacity-100"
    : highlight
    ? "opacity-60 group-hover:opacity-100"
    : "opacity-0 group-hover:opacity-100";

  return (
    <>
      {/* Top-Left */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -top-[3px] -left-[3px] ${bracketSize} border-t-2 border-l-2 ${borderColor} ${opacity} transition-all duration-200 group-hover:scale-110`}
      />
      {/* Top-Right */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -top-[3px] -right-[3px] ${bracketSize} border-t-2 border-r-2 ${borderColor} ${opacity} transition-all duration-200 group-hover:scale-110`}
      />
      {/* Bottom-Left */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-[3px] -left-[3px] ${bracketSize} border-b-2 border-l-2 ${borderColor} ${opacity} transition-all duration-200 group-hover:scale-110`}
      />
      {/* Bottom-Right */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-[3px] -right-[3px] ${bracketSize} border-b-2 border-r-2 ${borderColor} ${opacity} transition-all duration-200 group-hover:scale-110`}
      />
    </>
  );
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [displayedName, setDisplayedName] = useState("A");
  const { theme, toggleTheme } = useTheme();
  const { isLoading } = useLoading();

  const userEmail = "akashanderson889@gmail.com";
  const fullName = "Akash";

  // Typewriter effect for brand name on hover / click
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isLogoHovered) {
      intervalId = setInterval(() => {
        setDisplayedName((prev) => {
          if (prev.length < fullName.length) {
            return fullName.slice(0, prev.length + 1);
          }
          return prev;
        });
      }, 75);
    } else {
      intervalId = setInterval(() => {
        setDisplayedName((prev) => {
          if (prev.length > 1) {
            return fullName.slice(0, prev.length - 1);
          }
          return "A";
        });
      }, 45);
    }

    return () => clearInterval(intervalId);
  }, [isLogoHovered]);

  // Handle scroll detection and active section observation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);

      const scrollPosition = window.scrollY + 160;
      let currentSection = "";

      for (const item of navItems) {
        const el = document.querySelector(item.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            currentSection = item.href;
          }
        }
      }

      if (window.scrollY < 120) {
        setActiveSection("");
      } else if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleNavClick = useCallback((href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(userEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
      window.location.href = `mailto:${userEmail}`;
    }
  }, [userEmail]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isLoading
            ? "opacity-0 -translate-y-4 pointer-events-none"
            : "opacity-100 translate-y-0"
        } ${
          isScrolled
            ? "bg-bg/85 backdrop-blur-xl border-b border-border shadow-sm py-2.5 sm:py-3"
            : "bg-bg/40 backdrop-blur-md border-b border-border/30 py-3 sm:py-4"
        }`}
      >
        <div className="section-container flex items-center justify-between">
          {/* Logo / Brand with Tech Reticles (Compact initial "A", typed out to "Akash" on hover/click) */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsMobileOpen(false);
              setIsLogoHovered(true);
              window.scrollTo({ top: 0, behavior: "smooth" });
              setTimeout(() => setIsLogoHovered(false), 2400);
            }}
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
            onFocus={() => setIsLogoHovered(true)}
            onBlur={() => setIsLogoHovered(false)}
            className="relative group inline-flex items-center justify-center min-w-[34px] sm:min-w-[38px] px-2.5 sm:px-3 py-1 sm:py-1.5 border border-dashed border-border/40 hover:border-accent/70 bg-transparent transition-all duration-200 ease-out cursor-pointer select-none"
            aria-label="Akash - Back to top"
          >
            <CornerBrackets highlight size="sm" />
            <div className="flex items-center font-heading font-bold text-sm sm:text-base tracking-widest text-text-primary group-hover:text-highlight transition-colors uppercase">
              <span>{displayedName}</span>
              {(isLogoHovered || displayedName.length > 1) && (
                <span
                  aria-hidden="true"
                  className="text-highlight font-mono font-semibold text-xs sm:text-sm animate-pulse ml-0.5"
                >
                  _
                </span>
              )}
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 lg:gap-2.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative group inline-flex items-center px-3.5 lg:px-4 py-1.5 text-xs lg:text-[13px] font-medium tracking-tight border border-dashed transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "border-accent/60 bg-surface/30 text-highlight font-semibold shadow-xs"
                      : "border-transparent hover:border-border/60 hover:bg-surface-subtle/30 text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <CornerBrackets active={isActive} size="sm" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Distinctive "Copy Email" Action Button */}
            <button
              onClick={handleCopyEmail}
              className="relative group inline-flex items-center gap-1.5 px-3.5 py-1.5 ml-1 text-xs lg:text-[13px] font-medium tracking-tight border border-dashed border-accent/40 bg-accent/15 hover:bg-accent/25 text-highlight transition-all duration-200 cursor-pointer active:scale-95"
              aria-label="Copy email address"
            >
              <CornerBrackets highlight size="sm" />
              {copied ? (
                <>
                  <Check size={13} className="text-highlight animate-in fade-in zoom-in-75 duration-150" />
                  <span className="text-highlight font-semibold">Email copied!</span>
                </>
              ) : (
                <>
                  <Copy size={13} className="text-highlight/80 group-hover:text-highlight transition-colors" />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            {/* Theme Toggle Button with Corner Reticle styling */}
            <button
              onClick={toggleTheme}
              className="relative group w-8 h-8 lg:w-8.5 lg:h-8.5 ml-1 flex items-center justify-center border border-dashed border-border/40 hover:border-accent/60 text-text-muted hover:text-text-primary hover:bg-surface-subtle/30 transition-all duration-200 cursor-pointer"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <CornerBrackets size="sm" />
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>

          {/* Mobile Actions: Copy Email + Theme Toggle + Menu Toggle */}
          <div className="flex md:hidden items-center gap-1.5">
            {/* Quick Copy Email button on Mobile */}
            <button
              onClick={handleCopyEmail}
              className="relative group inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium border border-dashed border-accent/40 bg-accent/15 text-highlight cursor-pointer active:scale-95 transition-all"
              aria-label="Copy email address"
            >
              <CornerBrackets highlight size="sm" />
              {copied ? (
                <Check size={13} className="text-highlight" />
              ) : (
                <Copy size={13} className="text-highlight/80" />
              )}
              <span className="hidden xs:inline text-[11px]">
                {copied ? "Copied" : "Email"}
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative group w-8.5 h-8.5 flex items-center justify-center border border-dashed border-border/40 text-text-muted active:text-text-primary active:bg-surface-subtle/30 cursor-pointer"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <CornerBrackets size="sm" />
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Menu Open/Close Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="relative group w-8.5 h-8.5 flex items-center justify-center border border-dashed border-border/40 text-text-primary active:bg-surface-subtle/30 cursor-pointer ml-0.5"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileOpen}
            >
              <CornerBrackets highlight size="sm" />
              {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer / Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-2xl md:hidden flex flex-col justify-between pt-24 pb-10 px-6 sm:px-10"
          >
            {/* Nav list */}
            <div className="flex flex-col gap-3 my-auto">
              <span className="text-[11px] font-mono tracking-wider text-text-muted uppercase mb-1">
                Navigation
              </span>
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.href;
                return (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 + 0.08, duration: 0.2 }}
                    onClick={() => handleNavClick(item.href)}
                    className={`relative group w-full text-left py-3 px-4.5 border border-dashed transition-all duration-200 cursor-pointer flex items-center justify-between ${
                      isActive
                        ? "border-accent/70 bg-surface/30 text-highlight"
                        : "border-border/30 hover:border-border/70 text-text-secondary active:text-text-primary"
                    }`}
                  >
                    <CornerBrackets active={isActive} size="md" />
                    <span className="font-heading font-medium text-xl sm:text-2xl tracking-tight">
                      {item.label}
                    </span>
                    <span className="font-mono text-xs text-text-muted group-hover:text-accent transition-colors">
                      0{idx + 1}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile Footer / Quick Actions */}
            <div className="flex flex-col gap-4 border-t border-dashed border-border/40 pt-5">
              <div className="flex items-center justify-between">
                <button
                  onClick={handleCopyEmail}
                  className="relative group inline-flex items-center gap-2 py-2 px-3.5 border border-dashed border-accent/40 bg-accent/15 text-highlight text-xs font-mono cursor-pointer"
                >
                  <CornerBrackets highlight size="sm" />
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? "Email copied to clipboard!" : "Copy email address"}</span>
                </button>

                <div className="flex items-center gap-2">
                  {socialLinks.slice(0, 2).map((soc) => (
                    <a
                      key={soc.label}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group p-2 border border-dashed border-border/40 text-text-muted hover:text-text-primary text-xs flex items-center gap-1"
                      aria-label={soc.label}
                    >
                      <CornerBrackets size="sm" />
                      <span>{soc.label}</span>
                      <ArrowUpRight size={11} className="opacity-70" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-text-muted">
                <span>Portfolio • Akash</span>
                <span>2026</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
