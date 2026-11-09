"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Variants } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Github } from "lucide-brands";
import { siteConfig } from "@/lib/data";
import { useLoading } from "@/components/LoadingProvider";

// ─── PHOTO CONFIGURATION ──────────────────────────────────────
const HERO_PORTRAIT = {
  webp: "/images/akash-portrait.webp",
  png: "/images/akash-portrait.png",
  alt: "Akash Anderson portrait",
};
  export function Hero(){
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
    <section className="relative min-h-screen min-h-[100dvh] flex items-center justify-center pt-24 pb-16 sm:pt-28 sm:pb-20 lg:py-0 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] lg:w-[600px] h-[350px] sm:h-[500px] lg:h-[600px] rounded-full bg-accent/5 blur-[100px] sm:blur-[140px] pointer-events-none" />

      <div className="section-container relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          {/* Left Column: Headline, Bio & Action Buttons */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isLoading ? "hidden" : "visible"}
            className="lg:col-span-7 xl:col-span-6 max-w-xl mx-auto lg:mx-0 w-full flex flex-col justify-center text-center lg:text-left items-center lg:items-start"
          >
            <motion.h1
              variants={itemVariants}
              className="name-display text-[clamp(2.75rem,8vw,5.5rem)] text-highlight mb-4 sm:mb-6 tracking-tight break-words"
            >
              Akash Anderson
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="body-lg max-w-md mb-8 sm:mb-10 text-text-secondary text-sm sm:text-base md:text-lg leading-relaxed"
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
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 border border-border-strong text-text-secondary hover:text-text-primary hover:border-accent text-sm font-medium rounded-lg transition-all duration-200 w-full sm:w-auto active:scale-[0.98]"
              >
                <Github size={16} />
                GitHub
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Naturally Integrated Personal Portrait */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 35, scale: 0.98 }}
            animate={isLoading ? { opacity: 0 } : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 xl:col-span-6 flex items-end justify-center lg:justify-end relative w-full"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[390px] lg:max-w-[450px] xl:max-w-[490px] flex flex-col items-center lg:items-end">
              {/* Backlight Ambient Glow for Silhouette Depth */}
              <div
                aria-hidden="true"
                className="absolute top-1/4 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-6 w-[260px] sm:w-[340px] lg:w-[400px] h-[300px] sm:h-[380px] lg:h-[440px] rounded-full bg-accent/20 blur-[85px] sm:blur-[115px] pointer-events-none -z-10"
              />

              {/* Secondary Soft Depth Rim Glow */}
              <div
                aria-hidden="true"
                className="absolute top-10 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-16 w-[180px] sm:w-[240px] lg:w-[280px] h-[180px] sm:h-[240px] lg:h-[280px] rounded-full bg-surface/40 blur-[70px] sm:blur-[90px] pointer-events-none -z-10"
              />

              {/* Floating Container for Subtle Organic Presence */}
              <motion.div
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        y: [0, -6, 0],
                      }
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-full flex justify-center lg:justify-end"
              >
                {/* Natural shadow & smooth fade into hero background at bottom edge */}
                <div className="relative w-full drop-shadow-[0_20px_40px_rgba(15,76,117,0.35)]">
                  <picture>
                    <source srcSet={HERO_PORTRAIT.webp} type="image/webp" />
                    <img
                      src={HERO_PORTRAIT.png}
                      alt={HERO_PORTRAIT.alt}
                      className="w-full h-auto object-contain object-bottom select-none pointer-events-none [mask-image:linear-gradient(to_bottom,black_75%,transparent_98%)] [-webkit-mask-image:linear-gradient(to_bottom,black_75%,transparent_98%)]"
                      width={1024}
                      height={1024}
                      loading="eager"
                      fetchPriority="high"
                    />
                  </picture>
                </div>
              </motion.div>
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