"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { timelineEntries } from "@/lib/data";
import type { TimelineEntry } from "@/lib/types";

const typeConfig: Record<TimelineEntry["type"], { label: string; accent: string }> = {
  education: { label: "Education", accent: "bg-blue-400" },
  experience: { label: "Experience", accent: "bg-green-400" },
  certification: { label: "Certification", accent: "bg-purple-400" },
  achievement: { label: "Achievement", accent: "bg-amber-400" },
};

export function Background() {
  const hasEntries = timelineEntries.length > 0;

  return (
    <section id="background" className="py-16 sm:py-20 md:py-28 lg:py-32 bg-surface-subtle/30">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeader title="BACKGROUND" />   
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="max-w-2xl mb-8 sm:mb-12">
            <h2 className="heading-2 text-highlight mb-3 sm:mb-4">
              Education & Experience
            </h2>
            <p className="body-lg text-sm sm:text-base md:text-lg">
              Key milestones in my journey as a developer and engineer.
            </p>
          </div>
        </AnimatedSection>

        {hasEntries ? (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[10px] sm:left-[11px] top-2 bottom-2 w-px bg-border md:left-1/2 md:-translate-x-px" />

            <div className="space-y-6 sm:space-y-8">
              {timelineEntries.map((entry, i) => (
                <AnimatedSection key={entry.id} delay={0.1 + i * 0.05}>
                  <TimelineItem entry={entry} index={i} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        ) : (
          <AnimatedSection delay={0.2}>
            <div className="border border-dashed border-border rounded-xl p-6 sm:p-8 md:p-14">
              <div className="max-w-md mx-auto text-center md:text-left">
                <h3 className="heading-3 text-text-secondary mb-2 sm:mb-3 text-lg sm:text-xl">
                  Timeline coming soon
                </h3>
                <p className="body-sm text-xs sm:text-sm text-text-muted">
                  Education history, work experience, certifications, and
                  achievements will be displayed here.
                </p>
                <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                  {/* Placeholder skeleton */}
                  {["Education", "Experience", "Certifications"].map((label) => (
                    <div key={label} className="flex items-center gap-2.5 sm:gap-3">
                      <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-border-strong flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-text-muted">{label}</span>
                      <div className="flex-1 h-px bg-border" />
                      <span className="text-[11px] sm:text-xs font-mono text-text-muted flex-shrink-0">
                        To be added
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}

function TimelineItem({
  entry,
  index,
}: {
  entry: TimelineEntry;
  index: number;
}) {
  const isLeft = index % 2 === 0;
  const config = typeConfig[entry.type];

  return (
    <div className="relative pl-7 sm:pl-8 md:pl-0">
      {/* Dot */}
      <div className="absolute left-[6px] sm:left-[7px] top-1.5 md:left-1/2 md:-translate-x-1/2 z-10">
        <div className={`w-[9px] sm:w-[10px] h-[9px] sm:h-[10px] rounded-full ${config.accent}`}>
          {entry.current && (
            <div
              className={`absolute inset-0 rounded-full ${config.accent} animate-ping opacity-30`}
            />
          )}
        </div>
      </div>

      {/* Content Card */}
      <div
        className={`md:w-[calc(50%-2rem)] ${
          isLeft ? "md:mr-auto md:pr-8 md:text-right" : "md:ml-auto md:pl-8"
        }`}
      >
        <div className="p-4 sm:p-5 rounded-lg border border-border bg-bg/50 hover:border-border-strong transition-colors duration-200">
          <div className="flex items-center gap-2 mb-2 md:justify-start">
            <span className="text-[10px] font-mono font-medium text-text-muted uppercase tracking-wider">
              {config.label}
            </span>
            {entry.current && (
              <span className="text-[10px] font-mono text-green-400">
                Current
              </span>
            )}
          </div>
          <h4 className="text-sm sm:text-base font-medium text-text-primary mb-1">
            {entry.title}
          </h4>
          <p className="text-xs sm:text-sm text-accent mb-1">{entry.organization}</p>
          <p className="text-[11px] sm:text-xs font-mono text-text-muted">{entry.period}</p>
          {entry.description && (
            <p className="text-xs sm:text-sm text-text-muted mt-2 leading-relaxed">
              {entry.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
