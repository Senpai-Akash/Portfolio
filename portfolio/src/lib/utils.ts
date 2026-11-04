import { clsx, type ClassValue } from "clsx";

/**
 * Merge class names. Lightweight alternative to clsx+twMerge
 * for cases where we just need conditional class joining.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Language → colour mapping for GitHub-style language badges.
 */
export const languageColors: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3776AB",
  Rust: "#DEA584",
  Go: "#00ADD8",
  Java: "#B07219",
  "C++": "#F34B7D",
  C: "#555555",
  HTML: "#E34C26",
  CSS: "#563D7C",
  Shell: "#89E051",
  Dart: "#00B4AB",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Ruby: "#CC342D",
  PHP: "#4F5D95",
  Lua: "#000080",
  Jupyter: "#F37626",
  "Jupyter Notebook": "#F37626",
};

/**
 * Format a number with abbreviation (e.g. 1200 → 1.2k)
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num.toString();
}

