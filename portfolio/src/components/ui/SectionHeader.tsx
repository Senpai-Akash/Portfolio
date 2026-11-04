"use client";

interface SectionHeaderProps {
  number: string;
  title: string;
  className?: string;
}

export function SectionHeader({ number, title, className = "" }: SectionHeaderProps) {
  return (
    <div className={`flex items-center gap-4 mb-12 md:mb-16 ${className}`}>
      <span className="label-mono text-accent">{number}</span>
      <div className="h-px flex-1 max-w-[60px] bg-border-strong" />
      <span className="label-mono">{title}</span>
    </div>
  );
}

