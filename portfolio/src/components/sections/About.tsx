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

        <div className="grid lg:grid-cols-[1.1fr,1.1fr] gap-8 sm:gap-12 lg:gap-16 items-start">
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
              <p className="text-text-secondary">
                From real-time systems and machine learning predictive engines to
                interactive web experiences, I thrive on exploring how modern
                technologies connect to create delightful, human-centric software.
              </p>
            </div>
          </AnimatedSection>

          {/* Right column */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-6 body-lg">
              <p className="text-text-secondary">
                My approach combines strong fundamentals with practical experimentation.
                Whether designing responsive frontends, architecting backend microservices,
                or exploring computer vision and machine learning models, I focus on delivering
                resilient, maintainable code.
              </p>
              <p className="text-text-muted">
                Constantly learning, building, and refining tools for the modern web.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
