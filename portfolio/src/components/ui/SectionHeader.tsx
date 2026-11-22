"use client";

import { BlurredStagger } from "@/components/ui/blurred-stagger-text";

interface SectionHeaderProps {
  title: string;
  className?: string;
}

export function SectionHeader({ title, className = "" }: SectionHeaderProps) {
  return (
    <div className={`flex items-center gap-4 mb-8 sm:mb-10 md:mb-14 lg:mb-16 ${className}`}>
      <BlurredStagger
        as="span"
        text={title}
        delay={0.03}
        className="label-mono text-xs sm:text-sm tracking-wider inline-block"
      />
    </div>
  );
}
