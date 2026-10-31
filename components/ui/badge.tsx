import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeStatus = "pending" | "active" | "expired" | "rejected" | "default";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: BadgeStatus;
  children?: React.ReactNode;
}

export function Badge({
  className,
  status = "default",
  children,
  ...props
}: BadgeProps) {
  const statusStyles: Record<BadgeStatus, string> = {
    // En attente : or / ambre
    pending:
      "bg-gold-light text-[#A86E00] border border-gold/40",
    // Actif : turquoise / vert émeraude
    active:
      "bg-turquoise-light text-turquoise font-bold border border-turquoise/40",
    // Expiré : gris / neutre
    expired:
      "bg-surface-muted text-navy-light border border-navy/15",
    // Rejeté : corail / rouge
    rejected:
      "bg-coral-light text-coral font-bold border border-coral/40",
    // Défaut
    default:
      "bg-surface text-navy border border-surface-muted",
  };

  const defaultLabels: Record<BadgeStatus, string> = {
    pending: "En attente",
    active: "Actif",
    expired: "Expiré",
    rejected: "Rejeté",
    default: "",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-colors",
        statusStyles[status],
        className
      )}
      {...props}
    >
      <span
        className={cn("h-1.5 w-1.5 rounded-full", {
          "bg-gold animate-pulse": status === "pending",
          "bg-turquoise": status === "active",
          "bg-navy-light/60": status === "expired",
          "bg-coral": status === "rejected",
          "bg-navy/40": status === "default",
        })}
      />
      {children || defaultLabels[status]}
    </span>
  );
}

