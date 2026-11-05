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
    <section id="background" className="py-24 md:py-32 bg-surface-subtle/30">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeader title="BACKGROUND" />   
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="max-w-2xl mb-12">
            <h2 className="heading-2 text-highlight mb-4">
              Education & Experience
            </h2>
            <p className="body-lg">
              Key milestones in my journey as a developer and engineer.
            </p>
          </div>
        </AnimatedSection>

        {hasEntries ? (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border md:left-1/2 md:-translate-x-px" />

            <div className="space-y-8">
              {timelineEntries.map((entry, i) => (
                <AnimatedSection key={entry.id} delay={0.1 + i * 0.05}>
                  <TimelineItem entry={entry} index={i} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        ) : (
          <AnimatedSection delay={0.2}>
            <div className="border border-dashed border-border rounded-xl p-12 md:p-16">
              <div className="max-w-md mx-auto text-center md:text-left">
                <h3 className="heading-3 text-text-secondary mb-3">
                  Timeline coming soon
                </h3>
                <p className="body-sm">
                  Education history, work experience, certifications, and
                  achievements will be displayed here.
                </p>
                <div className="mt-8 space-y-4">
                  {/* Placeholder skeleton */}
                  {["Education", "Experience", "Certifications"].map((label) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-border-strong" />
                      <span className="text-sm text-text-muted">{label}</span>
                      <div className="flex-1 h-px bg-border" />
                      <span className="text-xs font-mono text-text-muted">
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
    <div className="relative pl-8 md:pl-0">
      {/* Dot */}
      <div className="absolute left-[7px] top-1.5 md:left-1/2 md:-translate-x-1/2 z-10">
        <div className={`w-[10px] h-[10px] rounded-full ${config.accent}`}>
          {entry.current && (
            <div
              className={`absolute inset-0 rounded-full ${config.accent} animate-ping opacity-30`}
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div
        className={`md:w-[calc(50%-2rem)] ${
          isLeft ? "md:mr-auto md:pr-8 md:text-right" : "md:ml-auto md:pl-8"
        }`}
      >
        <div className="p-5 rounded-lg border border-border bg-bg/50 hover:border-border-strong transition-colors duration-200">
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
          <h4 className="text-base font-medium text-text-primary mb-1">
            {entry.title}
          </h4>
          <p className="text-sm text-accent mb-1">{entry.organization}</p>
          <p className="text-xs font-mono text-text-muted">{entry.period}</p>
          {entry.description && (
            <p className="text-sm text-text-muted mt-2 leading-relaxed">
              {entry.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

