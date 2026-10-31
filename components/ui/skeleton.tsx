import * as React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "rectangle" | "circle" | "card";
}

export function Skeleton({
  className,
  variant = "rectangle",
  ...props
}: SkeletonProps) {
  const variantStyles = {
    rectangle: "rounded-xl",
    circle: "rounded-full",
    card: "rounded-2xl h-40 w-full",
  };

  return (
    <div
      className={cn(
        "animate-pulse bg-surface-muted/80",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

