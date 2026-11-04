"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Github } from "lucide-brands";
import { siteConfig } from "@/lib/data";

function GridVisual() {
  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px]">
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.15]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-accent" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Floating nodes */}
      <div className="absolute inset-0">
        {/* Central node cluster */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Central circle */}
          <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_20px_rgba(50,130,184,0.4)]" />

          {/* Connection lines radiating out */}
          <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] opacity-30" viewBox="-150 -150 300 300">
            <line x1="0" y1="0" x2="80" y2="-60" stroke="#3282B8" strokeWidth="0.75" />
            <line x1="0" y1="0" x2="-70" y2="-80" stroke="#3282B8" strokeWidth="0.75" />
            <line x1="0" y1="0" x2="90" y2="50" stroke="#3282B8" strokeWidth="0.75" />
            <line x1="0" y1="0" x2="-60" y2="70" stroke="#3282B8" strokeWidth="0.75" />
            <line x1="0" y1="0" x2="-100" y2="10" stroke="#3282B8" strokeWidth="0.75" />
            <line x1="0" y1="0" x2="30" y2="90" stroke="#3282B8" strokeWidth="0.75" />

            {/* Endpoint dots */}
            <circle cx="80" cy="-60" r="2" fill="#3282B8" />
            <circle cx="-70" cy="-80" r="2" fill="#3282B8" />
            <circle cx="90" cy="50" r="2" fill="#BBE1FA" />
            <circle cx="-60" cy="70" r="2" fill="#3282B8" />
            <circle cx="-100" cy="10" r="2" fill="#BBE1FA" />
            <circle cx="30" cy="90" r="2" fill="#3282B8" />

            {/* Secondary connections */}
            <line x1="80" y1="-60" x2="120" y2="-30" stroke="#3282B8" strokeWidth="0.5" opacity="0.5" />
            <line x1="-70" y1="-80" x2="-110" y2="-50" stroke="#3282B8" strokeWidth="0.5" opacity="0.5" />
            <line x1="90" y1="50" x2="130" y2="80" stroke="#3282B8" strokeWidth="0.5" opacity="0.5" />
            <circle cx="120" cy="-30" r="1.5" fill="#3282B8" opacity="0.5" />
            <circle cx="-110" cy="-50" r="1.5" fill="#3282B8" opacity="0.5" />
            <circle cx="130" cy="80" r="1.5" fill="#3282B8" opacity="0.5" />
          </svg>
        </div>

        {/* Decorative data elements */}
        <div className="absolute top-[15%] right-[10%] font-mono text-[10px] text-text-muted opacity-40 select-none">
          <div>sys.init()</div>
          <div className="text-accent">▸ ready</div>
        </div>
        <div className="absolute bottom-[20%] left-[8%] font-mono text-[10px] text-text-muted opacity-40 select-none">
          <div>nodes: 6</div>
          <div>edges: 9</div>
        </div>
      </div>

      {/* Atmospheric glow — subtle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-accent/5 blur-[80px]" />
    </div>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.12 },
    },
  };

  const itemVariants = prefersReducedMotion
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
    <section className="relative min-h-screen flex items-center pt-16">
      <div className="section-container w-full">
        <div className="grid lg:grid-cols-[1fr,1fr] gap-12 lg:gap-8 items-center">
          {/* Left: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            <motion.div variants={itemVariants} className="label-mono mb-6">
              Software Developer & Engineering Enthusiast
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="heading-display text-[clamp(3rem,8vw,5.5rem)] text-highlight mb-6"
            >
              Akash
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="body-lg max-w-md mb-10"
            >
              Building thoughtful software and exploring the boundaries of what
              technology can do. Focused on creating tools and experiences that
              are genuinely useful.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => {
                  document
                    .querySelector("#work")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-accent/20"
              >
                Explore My Work
                <ArrowDown size={16} />
              </button>

              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border-strong text-text-secondary hover:text-text-primary hover:border-accent text-sm font-medium rounded-lg transition-all duration-200"
              >
                <Github size={16} />
                GitHub
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <GridVisual />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0.5 } : { opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
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

