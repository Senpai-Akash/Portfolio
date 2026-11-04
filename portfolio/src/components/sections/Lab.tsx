"use client";

import { Beaker } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { labEntries } from "@/lib/data";
import type { LabEntry } from "@/lib/types";

const statusConfig: Record<LabEntry["status"], { label: string; color: string }> = {
  experiment: { label: "Experiment", color: "text-green-400" },
  prototype: { label: "Prototype", color: "text-blue-400" },
  research: { label: "Research", color: "text-purple-400" },
  concept: { label: "Concept", color: "text-amber-400" },
};

export function Lab() {
  const hasEntries = labEntries.length > 0;

  return (
    <section id="lab" className="py-24 md:py-32">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeader number="04" title="THE LAB" />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="max-w-2xl mb-12">
            <h2 className="heading-2 text-highlight mb-4">
              Experiments & Research
            </h2>
            <p className="body-lg">
              A space for technical explorations, unfinished prototypes,
              research notes, and ideas worth exploring further.
            </p>
          </div>
        </AnimatedSection>

        {hasEntries ? (
          <div className="grid md:grid-cols-2 gap-4">
            {labEntries.map((entry, i) => (
              <AnimatedSection key={entry.id} delay={0.1 + i * 0.05}>
                <LabCard entry={entry} />
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <AnimatedSection delay={0.2}>
            <div className="relative border border-dashed border-border rounded-xl p-12 md:p-16 text-center">
              {/* Background pattern */}
              <svg
                className="absolute inset-0 w-full h-full opacity-[0.03]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="lab-grid"
                    width="24"
                    height="24"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="1" cy="1" r="0.5" fill="currentColor" className="text-highlight" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#lab-grid)" />
              </svg>

              <div className="relative">
                <Beaker
                  size={32}
                  className="mx-auto mb-4 text-text-muted opacity-40"
                />
                <h3 className="heading-3 text-text-secondary mb-2">
                  Lab in progress
                </h3>
                <p className="body-sm max-w-sm mx-auto">
                  Experiments, prototypes, and research explorations will appear
                  here as they develop. Check back soon.
                </p>
              </div>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}

function LabCard({ entry }: { entry: LabEntry }) {
  const status = statusConfig[entry.status];
  const Wrapper = entry.url ? "a" : "div";
  const linkProps = entry.url
    ? { href: entry.url, target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...linkProps}
      className="block p-6 rounded-xl border border-border hover:border-border-strong bg-bg/50 hover:bg-surface/20 transition-all duration-200 group"
    >
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-mono font-medium ${status.color}`}>
          {status.label}
        </span>
        {entry.date && (
          <span className="text-xs font-mono text-text-muted">{entry.date}</span>
        )}
      </div>
      <h4 className="text-base font-medium text-text-primary group-hover:text-highlight transition-colors mb-2">
        {entry.title}
      </h4>
      <p className="text-sm text-text-muted leading-relaxed">
        {entry.description}
      </p>
      {entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] font-mono text-text-muted bg-border/30 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Wrapper>
  );
}

