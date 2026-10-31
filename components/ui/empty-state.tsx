import * as React from "react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-surface-muted bg-white/60 p-8 text-center sm:p-12",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface text-turquoise">
          {icon}
        </div>
      )}
      <h3 className="text-base font-bold text-navy sm:text-lg">{title}</h3>
      <p className="mt-1.5 max-w-sm text-xs sm:text-sm text-navy-light">
        {description}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

