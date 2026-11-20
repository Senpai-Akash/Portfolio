import React from "react";
import { cn } from "@/lib/utils";

// Define the type for a single social media item
export interface SocialItem {
  href: string;
  ariaLabel: string;
  tooltip: string;
  svgUrl?: string; // External SVG URL
  icon?: React.ReactNode; // Optional React / Lucide icon element
  color: string; // Color for customization
}

// Define the props for the SocialTooltip component
export interface SocialTooltipProps
  extends React.HTMLAttributes<HTMLUListElement> {
  items: SocialItem[];
  tooltipPosition?: "top" | "bottom";
  size?: "sm" | "md" | "lg";
}

const SocialTooltip = React.forwardRef<HTMLUListElement, SocialTooltipProps>(
  (
    {
      className,
      items,
      tooltipPosition = "bottom",
      size = "md",
      ...props
    },
    ref,
  ) => {
    // Sizing presets
    const sizeConfig = {
      sm: {
        container: "w-9 h-9",
        icon: "w-4 h-4",
        tooltip: "text-xs px-2 py-1",
      },
      md: {
        container: "w-10 h-10 sm:w-11 sm:h-11",
        icon: "w-5 h-5",
        tooltip: "text-xs px-2.5 py-1",
      },
      lg: {
        container: "w-12 h-12",
        icon: "w-6 h-6 sm:w-7 sm:h-7",
        tooltip: "text-sm px-2.5 py-1.5",
      },
    }[size];

    // Base styles for the component
    const baseIconStyles = cn(
      "relative flex items-center justify-center rounded-full bg-surface-subtle/80 border border-border overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:border-transparent cursor-pointer",
      sizeConfig.container,
    );

    const baseSvgStyles = cn(
      "relative z-10 text-text-secondary transition-colors duration-300 ease-in-out group-hover:text-white flex items-center justify-center",
      sizeConfig.icon,
    );

    const baseFilledStyles =
      "absolute bottom-0 left-0 w-full h-0 transition-all duration-300 ease-in-out group-hover:h-full";

    const baseTooltipStyles = cn(
      "absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md text-white font-medium opacity-0 invisible transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible shadow-lg pointer-events-none z-30",
      sizeConfig.tooltip,
      tooltipPosition === "top"
        ? "bottom-full mb-2.5 group-hover:mb-3.5"
        : "top-full mt-2.5 group-hover:mt-3.5",
    );

    return (
      <ul
        ref={ref}
        className={cn("flex items-center justify-center gap-3 sm:gap-4", className)}
        {...props}
      >
        {items.map((item, index) => (
          <li key={index} className="relative group">
            <a
              href={item.href}
              aria-label={item.ariaLabel}
              className={cn(baseIconStyles)}
              target={item.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                item.href.startsWith("mailto:")
                  ? undefined
                  : "noopener noreferrer"
              }
            >
              <div
                className={cn(baseFilledStyles)}
                style={{ backgroundColor: item.color }}
              />
              {item.icon ? (
                <span className={cn(baseSvgStyles)}>{item.icon}</span>
              ) : (
                <img
                  src={item.svgUrl}
                  alt={item.ariaLabel}
                  className={cn(baseSvgStyles)}
                />
              )}
            </a>
            <div
              className={cn(baseTooltipStyles)}
              style={{ backgroundColor: item.color }}
            >
              {item.tooltip}
            </div>
          </li>
        ))}
      </ul>
    );
  },
);

SocialTooltip.displayName = "SocialTooltip";

export { SocialTooltip };

export default SocialTooltip;
