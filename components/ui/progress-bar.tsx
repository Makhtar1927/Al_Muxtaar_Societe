import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 à 100
  max?: number;
  showLabel?: boolean;
  color?: "turquoise" | "gold" | "coral" | "navy";
}

export function ProgressBar({
  value,
  max = 100,
  showLabel = false,
  color = "turquoise",
  className,
  ...props
}: ProgressBarProps) {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const colorStyles = {
    turquoise: "bg-turquoise",
    gold: "bg-gold",
    coral: "bg-coral",
    navy: "bg-navy",
  };

  return (
    <div className={cn("w-full space-y-1.5", className)} {...props}>
      {showLabel && (
        <div className="flex justify-between text-xs font-semibold text-navy">
          <span>Progression</span>
          <span className="font-bold">{percentage}%</span>
        </div>
      )}
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-surface-muted">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            colorStyles[color]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

