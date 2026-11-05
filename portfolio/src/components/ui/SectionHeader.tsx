"use client";

interface SectionHeaderProps {
  title: string;
  className?: string;
}

export function SectionHeader({ title, className = "" }: SectionHeaderProps) {
  return (
    <div className={`flex items-center gap-4 mb-12 md:mb-16 ${className}`}>
      <span className="label-mono">{title}</span>
    </div>
  );
}

