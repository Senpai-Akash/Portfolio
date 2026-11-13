"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Variants } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Github } from "lucide-brands";
import { siteConfig } from "@/lib/data";
import { useLoading } from "@/components/LoadingProvider";
import { AsciiPortrait } from "@/components/ui/AsciiPortrait";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const { isLoading } = useLoading();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.12 },
    },
  };

  const itemVariants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 25 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      };

  return (
    <section className="relative min-h-screen min-h-[100dvh] flex items-center justify-center pt-24 pb-16 sm:pt-28 sm:pb-20 lg:py-0 lg:overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] lg:w-[600px] h-[350px] sm:h-[500px] lg:h-[600px] rounded-full bg-accent/5 blur-[100px] sm:blur-[140px] pointer-events-none" />

      <div className="section-container relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-0 items-center min-h-[calc(100vh-6rem)] lg:min-h-screen">
          {/* Left Column: Headline, Bio & Action Buttons (Layered on top of overlapping ASCII portrait) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isLoading ? "hidden" : "visible"}
            className="relative z-20 lg:col-span-7 xl:col-span-6 max-w-xl mx-auto lg:mx-0 w-full flex flex-col justify-center text-center lg:text-left items-center lg:items-start pointer-events-auto"
          >
            <motion.h1
              variants={itemVariants}
              className="name-display text-[clamp(2.75rem,8vw,5.5rem)] text-highlight mb-4 sm:mb-6 tracking-tight break-words drop-shadow-[0_4px_16px_rgba(27,38,44,0.9)]"
            >
              Akash Anderson
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="body-lg max-w-md mb-8 sm:mb-10 text-text-secondary text-sm sm:text-base md:text-lg leading-relaxed drop-shadow-[0_2px_8px_rgba(27,38,44,0.85)]"
            >
              Building thoughtful software and exploring the boundaries of what
              technology can do. Focused on creating tools and experiences that
              are genuinely useful.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => {
                  document
                    .querySelector("#work")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-accent/20 cursor-pointer w-full sm:w-auto active:scale-[0.98]"
              >
                Explore My Work
                <ArrowDown size={16} />
              </button>

              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 border border-border-strong text-text-secondary hover:text-text-primary hover:border-accent text-sm font-medium rounded-lg transition-all duration-200 w-full sm:w-auto active:scale-[0.98] bg-bg/40 backdrop-blur-xs"
              >
                <Github size={16} />
                GitHub
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Oversized High-Resolution ASCII Character Portrait */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 35, scale: 0.98 }}
            animate={isLoading ? { opacity: 0 } : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 xl:col-span-6 flex items-center justify-center lg:justify-end relative w-full z-10"
          >
            {/* Breakout Container: Allows the portrait to occupy the right half and overlap into the left text */}
            <div className="relative lg:absolute lg:right-[-6%] xl:right-[-4%] 2xl:right-[2%] lg:top-1/2 lg:-translate-y-1/2 w-full max-w-[360px] sm:max-w-[460px] md:max-w-[540px] lg:max-w-none lg:w-[680px] xl:w-[780px] 2xl:w-[840px] h-[480px] sm:h-[580px] md:h-[680px] lg:h-[780px] xl:h-[860px] 2xl:h-[920px] flex flex-col items-center lg:items-end pointer-events-auto">
              {/* Backlight Ambient Glow for Silhouette Depth */}
              <div
                aria-hidden="true"
                className="absolute top-1/4 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-16 w-[360px] sm:w-[480px] lg:w-[620px] xl:w-[720px] h-[400px] sm:h-[540px] lg:h-[700px] xl:h-[800px] rounded-full bg-accent/20 blur-[100px] sm:blur-[140px] pointer-events-none -z-10"
              />

              {/* Secondary Soft Depth Rim Glow */}
              <div
                aria-hidden="true"
                className="absolute top-12 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-28 w-[260px] sm:w-[360px] lg:w-[480px] h-[260px] sm:h-[360px] lg:h-[480px] rounded-full bg-surface/35 blur-[80px] sm:blur-[110px] pointer-events-none -z-10"
              />

              {/* Interactive ASCII Portrait Canvas */}
              <div className="relative w-full h-full drop-shadow-[0_20px_45px_rgba(15,76,117,0.4)]">
                <AsciiPortrait imageSrc="/images/akash-portrait.png" className="w-full h-full" />
              </div>

              {/* Subtle tech label */}
              <div className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] text-text-muted/60 tracking-wider mt-1 select-none uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-accent/70 animate-pulse" />
                <span>interactive ascii canvas // hover to scatter</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0.5 } : { opacity: 0 }}
        animate={isLoading ? { opacity: 0 } : { opacity: 0.5 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} className="text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
  }