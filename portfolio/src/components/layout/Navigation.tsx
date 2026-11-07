"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useLoading } from "@/components/LoadingProvider";
import { navItems } from "@/lib/data";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isLoading } = useLoading();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isLoading
            ? "opacity-0 -translate-y-4 pointer-events-none"
            : "opacity-100 translate-y-0"
        } ${
          isScrolled
            ? "bg-bg/85 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <nav className="section-container flex items-center justify-between h-16 md:h-18">
          {/* Wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsMobileOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-heading font-bold text-lg sm:text-xl tracking-tight text-text-primary hover:text-highlight transition-colors py-2"
          >
            AKASH
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7 lg:gap-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 relative group py-1"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
              </button>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-subtle transition-all duration-200 cursor-pointer"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>

          {/* Mobile: Theme + Hamburger (Min 44px tap targets for mobile usability) */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-lg text-text-muted hover:text-text-primary active:bg-surface-subtle transition-colors cursor-pointer"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-lg text-text-muted hover:text-text-primary active:bg-surface-subtle transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl md:hidden flex flex-col justify-between pt-24 pb-12 px-6"
          >
            <nav className="flex flex-col items-center justify-center flex-1 gap-6 sm:gap-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  onClick={() => handleNavClick(item.href)}
                  className="w-full text-center py-2.5 px-4 text-2xl font-heading font-medium text-text-secondary hover:text-highlight active:text-highlight active:bg-surface-subtle/50 rounded-xl transition-all"
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>

            <div className="text-center">
              <span className="text-xs font-mono text-text-muted">
                Portfolio • Akash Anderson
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
