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
    <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
      {/* Visual preview */}
      <div className={isReversed ? "lg:order-2" : "lg:order-1"}>
        <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] rounded-xl overflow-hidden bg-surface border border-border group shadow-sm">
          {/* Visual composition */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
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
                <span className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-accent/25 group-hover:text-accent/35 transition-colors duration-500">
                  {project.title
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <p className="mt-2 sm:mt-3 text-[11px] sm:text-xs font-mono text-text-muted">
                  Interactive Preview Coming Soon
                </p>
              </div>
            </div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>

      {/* Content */}
      <div className={isReversed ? "lg:order-1" : "lg:order-2"}>
        <div className="space-y-4 sm:space-y-5">
          <div>
            <span className="label-mono text-accent text-xs">
              {project.category}
            </span>
          </div>

          <h3 className="heading-2 text-highlight text-xl sm:text-2xl md:text-3xl">
            {project.title}
          </h3>

          <p className="body-lg text-sm sm:text-base md:text-lg">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono text-text-muted border border-border rounded-md bg-surface/10"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-text-secondary hover:text-accent active:text-highlight transition-colors py-1 group/link"
            >
              <Github size={16} />
              <span>Source</span>
              <ArrowUpRight
                size={14}
                className="opacity-60 sm:opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200"
              />
            </a>

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-text-secondary hover:text-accent active:text-highlight transition-colors py-1 group/link"
              >
                <ExternalLink size={16} />
                <span>Live Demo</span>
                <ArrowUpRight
                  size={14}
                  className="opacity-60 sm:opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200"
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
    <section id="work" className="py-16 sm:py-20 md:py-28 lg:py-32">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeader title="SELECTED WORK" />
        </AnimatedSection>

        <div className="space-y-16 sm:space-y-20 lg:space-y-28">
          {featuredProjects.map((project, i) => (
            <AnimatedSection key={project.id} delay={i * 0.1}>
              <ProjectCard project={project} index={i} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
