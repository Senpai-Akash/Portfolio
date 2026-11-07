"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  // -30px margin ensures mobile viewports trigger smoothly without excessive scroll
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

const motionComponents = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  div: motion.div,
};

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

export function AnimatedText({
  children,
  className,
  delay = 0,
  as: Component = "div",
}: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <Component className={className}>{children}</Component>;
  }

  const MotionComponent = motionComponents[Component] || motion.div;

  return (
    <MotionComponent
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      transition={{
        duration: 0.45,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionComponent>
  );
}
