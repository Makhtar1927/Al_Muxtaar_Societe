import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, helperText, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-bold text-navy uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            type={type}
            ref={ref}
            className={cn(
              "flex h-11 w-full rounded-2xl border bg-white px-4 py-2 text-sm text-navy transition-all duration-200 placeholder:text-navy-light/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise focus-visible:border-turquoise disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]",
              error
                ? "border-coral focus-visible:ring-coral focus-visible:border-coral"
                : "border-surface-muted hover:border-navy/30",
              className
            )}
            {...props}
          />
        </div>
        {error ? (
          <p className="text-xs font-medium text-coral flex items-center gap-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-coral" />
            {error}
          </p>
        ) : helperText ? (
          <p className="text-xs text-navy-light">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
