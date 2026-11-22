"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface BlurredStaggerProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "p" | "div";
}

export const BlurredStagger = ({
  text,
  className = "",
  delay = 0.015,
  duration = 0.3,
  as: Component = "span",
}: BlurredStaggerProps) => {
  const prefersReducedMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
      },
    },
  };

  const letterAnimation = {
    hidden: {
      opacity: 0,
      filter: "blur(8px)",
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration,
      },
    },
  };

  if (prefersReducedMotion) {
    const Tag = Component;
    return <Tag className={className}>{text}</Tag>;
  }

  const MotionTag = (motion[Component] || motion.span) as typeof motion.span;

  // Split into words so that natural line breaks and word-wrapping are preserved without horizontal overflow
  const words = text.split(" ");

  return (
    <MotionTag
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.2,
      }}
      className={className}
      aria-label={text}
    >
      {words.map((word, wordIdx) => (
        <span key={`${word}-${wordIdx}`} className="inline-block whitespace-nowrap">
          {word.split("").map((char, charIdx) => (
            <motion.span
              key={`${char}-${charIdx}`}
              variants={letterAnimation}
              aria-hidden="true"
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
          {wordIdx < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </MotionTag>
  );
};

export default BlurredStagger;
