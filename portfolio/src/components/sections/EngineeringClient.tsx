"use client";

import { Star } from "lucide-react";

/** Client component wrapper for the Star icon (lucide-react needs client context) */
export function GitStar() {
  return <Star size={12} className="text-text-muted" />;
}

