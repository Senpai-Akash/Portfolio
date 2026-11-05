"use client";

import { useState, useRef, useCallback } from "react";
import type { ContributionCalendar, ContributionDay } from "@/lib/types";

// ─── EXACT PORTFOLIO COLOR TOKENS ─────────────────────────────
// Level 0: #24343D
// Level 1: #0F4C75
// Level 2: #1D6797
// Level 3: #3282B8
// Level 4: #BBE1FA
const LEVEL_COLORS: Record<string, string> = {
  NONE: "#24343D",
  FIRST_QUARTILE: "#0F4C75",
  SECOND_QUARTILE: "#1D6797",
  THIRD_QUARTILE: "#3282B8",
  FOURTH_QUARTILE: "#BBE1FA",
};

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getContributionText(count: number): string {
  if (count === 0) return "No contributions";
  if (count === 1) return "1 contribution";
  return `${count.toLocaleString()} contributions`;
}

interface ContributionGraphClientProps {
  calendar: ContributionCalendar;
  username: string;
  githubUrl: string;
}

export function ContributionGraphClient({
  calendar,
  username,
  githubUrl,
}: ContributionGraphClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredDay, setHoveredDay] = useState<{
    day: ContributionDay;
    x: number;
    y: number;
  } | null>(null);

  const handleMouseEnter = useCallback(
    (day: ContributionDay, e: React.MouseEvent<SVGRectElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const container = containerRef.current?.getBoundingClientRect();
      if (container) {
        setHoveredDay({
          day,
          x: rect.left - container.left + rect.width / 2,
          y: rect.top - container.top,
        });
      }
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredDay(null);
  }, []);

  const weeks = calendar.weeks || [];

  // Dimensions
  const cellSize = 11;
  const cellGap = 3;
  const step = cellSize + cellGap;
  const leftPadding = 32; // Space for weekday labels
  const topPadding = 22;  // Space for month labels

  // Month label positions (detect month changes across weeks)
  const monthLabels: { label: string; x: number }[] = [];
  let prevMonth = -1;

  weeks.forEach((week, colIndex) => {
    if (week.contributionDays.length > 0) {
      const firstDay = week.contributionDays[0];
      const month = parseInt(firstDay.date.split("-")[1], 10) - 1;
      // Ensure month labels aren't placed too close to each other
      if (month !== prevMonth) {
        prevMonth = month;
        monthLabels.push({
          label: MONTH_NAMES[month],
          x: leftPadding + colIndex * step,
        });
      }
    }
  });

  const svgWidth = leftPadding + weeks.length * step + 4;
  const svgHeight = topPadding + 7 * step + 4;

  return (
    <div>
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="label-mono text-accent mb-1.5">GitHub Contributions</h3>
          
        </div>

        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:text-highlight transition-colors self-start sm:self-auto group"
        >
          <span>@{username}</span>
          <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ↗
          </span>
        </a>
      </div>

      {/* Calendar Graph Container with horizontal scroll on small screens */}
      <div
        ref={containerRef}
        className="relative overflow-x-auto pb-2 scrollbar-thin"
      >
        <svg
          width={svgWidth}
          height={svgHeight}
          aria-label={`GitHub contribution calendar for ${username}`}
          role="img"
          className="select-none block"
          style={{ minWidth: svgWidth }}
        >
          {/* Month labels */}
          {monthLabels.map((m, idx) => (
            <text
              key={`month-${idx}-${m.label}`}
              x={m.x}
              y={13}
              fontSize="10"
              fill="#7a99ad"
              fontFamily="var(--font-mono), monospace"
            >
              {m.label}
            </text>
          ))}

          {/* Weekday labels (Mon, Wed, Fri) */}
          {[1, 3, 5].map((dayIndex) => (
            <text
              key={`weekday-${dayIndex}`}
              x={4}
              y={topPadding + dayIndex * step + cellSize * 0.8}
              fontSize="9"
              fill="#7a99ad"
              fontFamily="var(--font-mono), monospace"
            >
              {WEEKDAY_NAMES[dayIndex]}
            </text>
          ))}

          {/* Contribution Cells */}
          {weeks.map((week, colIndex) =>
            week.contributionDays.map((day) => {
              const x = leftPadding + colIndex * step;
              const y = topPadding + day.weekday * step;
              const color = LEVEL_COLORS[day.contributionLevel] ?? LEVEL_COLORS.NONE;

              return (
                <rect
                  key={day.date}
                  x={x}
                  y={y}
                  width={cellSize}
                  height={cellSize}
                  rx={2}
                  ry={2}
                  fill={color}
                  className="transition-all duration-150 cursor-pointer hover:stroke-highlight hover:stroke-[1.5]"
                  onMouseEnter={(e) => handleMouseEnter(day, e)}
                  onMouseLeave={handleMouseLeave}
                  tabIndex={0}
                  onFocus={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const container = containerRef.current?.getBoundingClientRect();
                    if (container) {
                      setHoveredDay({
                        day,
                        x: rect.left - container.left + rect.width / 2,
                        y: rect.top - container.top,
                      });
                    }
                  }}
                  onBlur={() => setHoveredDay(null)}
                  aria-label={`${getContributionText(day.contributionCount)} on ${formatDate(day.date)}`}
                />
              );
            })
          )}
        </svg>

        {/* Hover Tooltip */}
        {hoveredDay && (
          <div
            className="pointer-events-none absolute z-30 px-3 py-1.5 rounded-lg text-xs font-mono bg-surface border border-border-strong text-text-primary shadow-xl -translate-x-1/2 -translate-y-full transition-opacity duration-150"
            style={{
              left: `${hoveredDay.x}px`,
              top: `${hoveredDay.y - 8}px`,
            }}
          >
            <p className="font-semibold text-highlight">
              {getContributionText(hoveredDay.day.contributionCount)}
            </p>
            <p className="text-[11px] text-text-muted mt-0.5">
              {formatDate(hoveredDay.day.date)}
            </p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between gap-4 mt-4 pt-3 border-t border-border/50 text-xs font-mono text-text-muted">
        <p className="text-xl font-heading font-semibold text-highlight tracking-tight">
            {calendar.totalContributions.toLocaleString()}
            <span className="text-sm font-normal text-text-secondary ml-2 font-mono">
              contributions in the last year
            </span>
          </p>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px]">Less</span>
          {(["NONE", "FIRST_QUARTILE", "SECOND_QUARTILE", "THIRD_QUARTILE", "FOURTH_QUARTILE"] as const).map(
            (lvl) => (
              <div
                key={lvl}
                className="w-[11px] h-[11px] rounded-sm"
                style={{ backgroundColor: LEVEL_COLORS[lvl] }}
                title={lvl}
                aria-hidden="true"
              />
            )
          )}
          <span className="text-[10px]">More</span>
        </div>
      </div>
    </div>
  );
}

