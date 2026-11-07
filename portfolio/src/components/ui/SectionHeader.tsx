"use client";

interface SectionHeaderProps {
  title: string;
  className?: string;
}

export function SectionHeader({ title, className = "" }: SectionHeaderProps) {
  return (
    <div className={`flex items-center gap-4 mb-8 sm:mb-10 md:mb-14 lg:mb-16 ${className}`}>
      <span className="label-mono text-xs sm:text-sm tracking-wider">{title}</span>
    </div>
  );
}
