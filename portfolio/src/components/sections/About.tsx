"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function About() {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-28 lg:py-32">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeader title="ABOUT" />
        </AnimatedSection>

        <div className="grid lg:grid-cols-[1fr,1.2fr] gap-8 sm:gap-12 lg:gap-20">
          {/* Left column — introduction */}
          <AnimatedSection delay={0.1}>
            <h2 className="heading-2 text-highlight mb-4 sm:mb-6">
              Developer, thinker, builder.
            </h2>
            <div className="space-y-4 body-lg">
              <p>
                I&apos;m Akash — a software developer interested in building
                products that solve real problems. I care about clean
                architecture, thoughtful interfaces, and engineering that serves
                a clear purpose.
              </p>
              <p className="text-text-muted">
                More about my journey and background coming soon.
              </p>
            </div>
          </AnimatedSection>

          {/* Right column — details */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-8 sm:space-y-10">
              
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
