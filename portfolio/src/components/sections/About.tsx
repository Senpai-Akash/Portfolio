"use client";

import { AnimatedSection, AnimatedText } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeader title="ABOUT" />
        </AnimatedSection>

        <div className="grid lg:grid-cols-[1fr,1.2fr] gap-12 lg:gap-20">
          {/* Left column — introduction */}
          <AnimatedSection delay={0.1}>
            <h2 className="heading-2 text-highlight mb-6">
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
                {/* Placeholder for additional personal background */}
                More about my journey and background coming soon.
              </p>
            </div>
          </AnimatedSection>

          {/* Right column — details */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-10">
              {/* Technical Interests */}
              <div>
                <h3 className="label-mono text-accent mb-4">Technical Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Full-Stack Development",
                    "AI & Machine Learning",
                    "System Design",
                    "Developer Tools",
                    "Recommendation Systems",
                    "Open Source",
                  ].map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1.5 text-sm text-text-secondary border border-border rounded-md hover:border-border-strong hover:text-text-primary transition-colors duration-200"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Engineering Philosophy */}
              <div>
                <h3 className="label-mono text-accent mb-4">Approach</h3>
                <div className="space-y-3">
                  {[
                    {
                      label: "Build with intention",
                      desc: "Every line of code should have a reason to exist.",
                    },
                    {
                      label: "Ship and learn",
                      desc: "Working software teaches more than perfect plans.",
                    },
                    {
                      label: "Stay curious",
                      desc: "The best engineering comes from exploring unfamiliar territory.",
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-3">
                      <div className="w-1 bg-accent/40 rounded-full flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-text-primary">
                          {item.label}
                        </p>
                        <p className="text-sm text-text-muted">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Currently Learning */}
              <div>
                <h3 className="label-mono text-accent mb-4">Currently Exploring</h3>
                <p className="body-sm">
                  {/* Placeholder — update with actual current learning interests */}
                  Areas of active exploration and learning will appear here.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

