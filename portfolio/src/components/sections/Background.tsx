"use client";

import React, { useRef, useState, useEffect, forwardRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text";
import { timelineEntries } from "@/lib/data";
import type { TimelineEntry } from "@/lib/types";

export function Background() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll progress along the timeline container for progressive line illumination
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 65%", "end 60%"],
  });

  // Smooth spring physics for illuminated central line
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // Track active milestone based on viewport trigger position
  useEffect(() => {
    const handleScroll = () => {
      const triggerY = window.innerHeight * 0.55;
      let current = 0;

      itemRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // If the milestone marker has reached or passed the trigger line
        if (rect.top <= triggerY) {
          current = index;
        }
      });

      setActiveIndex(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="background"
      className="relative py-20 sm:py-24 md:py-32 lg:py-36 overflow-hidden"
    >
      {/* Anchor helper for #experience URL navigation */}
      <div id="experience" className="absolute -top-24" aria-hidden="true" />

      <div className="section-container">
        {/* Section Header */}
        <AnimatedSection>
          <SectionHeader title="EXPERIENCE" />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="max-w-2xl mb-14 sm:mb-16 md:mb-24">
            <h2 className="heading-2 text-highlight mb-3 sm:mb-4">
              Career & Milestones
            </h2>
            <p className="body-lg text-sm sm:text-base md:text-lg text-text-secondary">
              A chronological journey through my professional experience, engineering initiatives, and technical education.
            </p>
          </div>
        </AnimatedSection>

        {/* Alternating Vertical Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Base Inactive Central Line */}
          <div
            aria-hidden="true"
            className="absolute left-[18px] sm:left-[22px] md:left-1/2 -translate-x-1/2 top-4 bottom-8 w-[2px] bg-border/40"
          />

          {/* Progressive Active Illuminating Line */}
          {!prefersReducedMotion ? (
            <motion.div
              aria-hidden="true"
              style={{ height: lineHeight }}
              className="absolute left-[18px] sm:left-[22px] md:left-1/2 -translate-x-1/2 top-4 w-[2px] bg-gradient-to-b from-accent via-accent to-highlight shadow-[0_0_12px_rgba(50,130,184,0.55)] origin-top z-0"
            />
          ) : (
            <div
              aria-hidden="true"
              className="absolute left-[18px] sm:left-[22px] md:left-1/2 -translate-x-1/2 top-4 bottom-8 w-[2px] bg-accent/40 z-0"
            />
          )}

          {/* Timeline Milestones */}
          <div className="space-y-12 sm:space-y-14 md:space-y-20 lg:space-y-24">
            {timelineEntries.map((entry, index) => {
              const isLeft = index % 2 === 0;
              const isActive = index === activeIndex;
              const isCompleted = index < activeIndex;

              return (
                <TimelineEntryRow
                  key={entry.id}
                  entry={entry}
                  index={index}
                  isLeft={isLeft}
                  isActive={isActive}
                  isCompleted={isCompleted}
                  prefersReducedMotion={!!prefersReducedMotion}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

interface TimelineEntryRowProps {
  entry: TimelineEntry;
  index: number;
  isLeft: boolean;
  isActive: boolean;
  isCompleted: boolean;
  prefersReducedMotion: boolean;
}

const TimelineEntryRow = forwardRef<HTMLDivElement, TimelineEntryRowProps>(
  ({ entry, index, isLeft, isActive, isCompleted, prefersReducedMotion }, ref) => {
    return (
      <div
        ref={ref}
        className="relative flex flex-col md:flex-row items-start group"
      >
        {/* Milestone Marker Node */}
        {/* Mobile: positioned on left line (left-[18px] sm:left-[22px]) */}
        {/* Desktop: positioned on center line (left-1/2 -translate-x-1/2) */}
        <div className="absolute left-[18px] sm:left-[22px] md:left-1/2 -translate-x-1/2 top-1.5 md:top-2 z-10">
          <div
            className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full border transition-all duration-300 flex items-center justify-center ${
              isActive
                ? "bg-bg border-accent shadow-[0_0_16px_rgba(50,130,184,0.6)] scale-110"
                : isCompleted
                ? "bg-bg border-accent/70 shadow-[0_0_8px_rgba(50,130,184,0.25)]"
                : "bg-bg border-border/80 group-hover:border-border-strong"
            }`}
          >
            {/* Inner Circular Dot */}
            <div
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-highlight scale-100"
                  : isCompleted
                  ? "bg-accent/80 scale-90"
                  : "bg-border-strong scale-75 group-hover:scale-90 group-hover:bg-text-muted"
              }`}
            />
          </div>
        </div>

        {/* Content Container */}
        {/* Mobile: full width, padded left to clear marker */}
        {/* Desktop: alternates left/right with equal width */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{
            duration: 0.5,
            delay: prefersReducedMotion ? 0 : index * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`w-full pl-12 sm:pl-16 md:pl-0 ${
            isLeft
              ? "md:w-[calc(50%-2.5rem)] lg:w-[calc(50%-3.5rem)] md:mr-auto md:pr-8 lg:pr-12 md:text-right"
              : "md:w-[calc(50%-2.5rem)] lg:w-[calc(50%-3.5rem)] md:ml-auto md:pl-8 lg:pl-12 md:text-left"
          }`}
        >
          {/* Metadata Row: Period & Category Badge */}
          <div
            className={`flex flex-wrap items-center gap-2 mb-2 ${
              isLeft ? "md:justify-end" : "md:justify-start"
            }`}
          >
            {entry.categoryLabel && (
              <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded border border-border/80 text-text-muted bg-surface/30">
                {entry.categoryLabel}
              </span>
            )}
            <span className="font-mono text-[11px] sm:text-xs text-text-muted uppercase tracking-widest">
              {entry.period}
            </span>
            {entry.current && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono text-highlight bg-accent/15 border border-accent/30">
                <span className="w-1.5 h-1.5 rounded-full bg-highlight animate-pulse" />
                Active
              </span>
            )}
          </div>

          {/* Job Title / Project Heading with optional link */}
          <div
            className={`flex items-center gap-2 ${
              isLeft ? "md:justify-end" : "md:justify-start"
            }`}
          >
            {entry.link ? (
              <a
                href={entry.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 hover:underline"
              >
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-text-primary tracking-tight group-hover/link:text-highlight transition-colors duration-200">
                  <BlurredStagger text={entry.title} delay={0.015} />
                </h3>
                <ArrowUpRight
                  size={15}
                  className="text-text-muted group-hover/link:text-highlight transition-colors flex-shrink-0"
                />
              </a>
            ) : (
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-text-primary tracking-tight group-hover:text-highlight transition-colors duration-200">
                <BlurredStagger text={entry.title} delay={0.015} />
              </h3>
            )}
          </div>

          {/* Organization / Context Name */}
          <p className="text-xs sm:text-sm font-medium text-accent mt-1 tracking-wide">
            {entry.organization}
          </p>

          {/* Concise Description */}
          {entry.description && (
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mt-3">
              {entry.description}
            </p>
          )}

          {/* Outlined Technology / Skill Tags */}
          {entry.tags && entry.tags.length > 0 && (
            <div
              className={`flex flex-wrap gap-1.5 sm:gap-2 mt-4 ${
                isLeft ? "md:justify-end" : "md:justify-start"
              }`}
            >
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[11px] font-mono rounded-full border border-border/80 bg-surface-subtle/30 text-text-secondary hover:border-accent hover:text-highlight hover:bg-accent/5 transition-all duration-200 select-none"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    );
  }
);

TimelineEntryRow.displayName = "TimelineEntryRow";
