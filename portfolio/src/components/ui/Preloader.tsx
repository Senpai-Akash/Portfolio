"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // If reduced motion is preferred, finish quickly
    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        setProgress(100);
        setIsVisible(false);
        onComplete();
      }, 200);
      return () => clearTimeout(timer);
    }

    // Lock scrolling while loading
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const duration = 1400; // 1.4 seconds smooth loading animation
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          onComplete();
          document.body.style.overflow = "";
          document.documentElement.style.overflow = "";
        }, 300);
      }
    }, 25);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [onComplete, prefersReducedMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -24,
            scale: 0.98,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
        >
          {/* Ambient background glow */}
          <div className="absolute w-[360px] h-[360px] rounded-full bg-accent/10 blur-[100px] pointer-events-none" />

          {/* Grid pattern background matching hero */}
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="preloader-grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-accent"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#preloader-grid)" />
            </svg>
          </div>

          {/* Center of page: Name "Akash" + Loading Sequence */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4">
            <motion.div
              initial={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: 16, scale: 0.96 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <h1 className="font-heading font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-highlight select-none drop-shadow-[0_0_35px_rgba(50,130,184,0.35)]">
                Akash
              </h1>
            </motion.div>

            {/* Minimalist Progress Bar */}
            <motion.div
              initial={
                prefersReducedMotion ? { opacity: 1 } : { opacity: 0, width: 0 }
              }
              animate={{ opacity: 1, width: "200px" }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-[2px] w-48 sm:w-60 bg-surface-subtle/80 rounded-full overflow-hidden mt-6 relative"
            >
              <div
                className="h-full bg-gradient-to-r from-accent to-highlight shadow-[0_0_12px_rgba(50,130,184,0.8)] transition-all duration-75 ease-out"
                style={{ width: `${progress}%` }}
              />
            </motion.div>

            {/* System status indicator */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="flex items-center gap-2 mt-4 font-mono text-[11px] sm:text-xs text-text-muted select-none"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  progress === 100 ? "bg-highlight" : "bg-accent animate-pulse"
                }`}
              />
              <span>
                {progress < 100 ? (
                  <>
                    sys.init() <span className="text-text-secondary">{"//"} {progress}%</span>
                  </>
                ) : (
                  <span className="text-accent font-semibold">▸ ready</span>
                )}
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
