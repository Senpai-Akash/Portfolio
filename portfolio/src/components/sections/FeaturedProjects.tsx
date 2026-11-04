"use client";

import { ExternalLink, ArrowUpRight } from "lucide-react";
import { Github } from "lucide-brands";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/types";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isReversed = index % 2 === 1;

  return (
    <div
      className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
        isReversed ? "lg:direction-rtl" : ""
      }`}
      style={isReversed ? { direction: "rtl" } : undefined}
    >
      {/* Visual preview */}
      <div style={{ direction: "ltr" }}>
        <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-surface border border-border group">
          {/* Placeholder visual composition */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              {/* Grid pattern background */}
              <svg
                className="absolute inset-0 w-full h-full opacity-[0.06]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id={`grid-${project.id}`}
                    width="32"
                    height="32"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 32 0 L 0 0 0 32"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-highlight"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#grid-${project.id})`} />
              </svg>

              {/* Project initial / icon */}
              <div className="relative z-10">
                <span className="font-heading text-5xl md:text-6xl font-bold text-accent/20 group-hover:text-accent/30 transition-colors duration-500">
                  {project.title
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <p className="mt-3 text-xs font-mono text-text-muted">
                  Preview coming soon
                </p>
              </div>
            </div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>

      {/* Content */}
      <div style={{ direction: "ltr" }}>
        <div className="space-y-5">
          <div>
            <span className="label-mono text-accent">{project.category}</span>
          </div>

          <h3 className="heading-2 text-highlight">{project.title}</h3>

          <p className="body-lg">{project.description}</p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono text-text-muted border border-border rounded"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 pt-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors group/link"
            >
              <Github size={16} />
              Source
              <ArrowUpRight
                size={14}
                className="opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200"
              />
            </a>

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors group/link"
              >
                <ExternalLink size={16} />
                Live Demo
                <ArrowUpRight
                  size={14}
                  className="opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200"
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturedProjects() {
  const featuredProjects = projects
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="work" className="py-24 md:py-32">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeader number="02" title="SELECTED WORK" />
        </AnimatedSection>

        <div className="space-y-24 md:space-y-32">
          {featuredProjects.map((project, index) => (
            <AnimatedSection key={project.id} delay={0.1}>
              <ProjectCard project={project} index={index} />
            </AnimatedSection>
          ))}
        </div>

        {/* More projects prompt */}
        {projects.length > featuredProjects.length && (
          <AnimatedSection delay={0.2}>
            <div className="mt-20 text-center">
              <p className="text-sm text-text-muted">
                More projects on{" "}
                <a
                  href="https://github.com/Senpai-Akash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-highlight transition-colors"
                >
                  GitHub →
                </a>
              </p>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}

