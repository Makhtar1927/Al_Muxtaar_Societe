"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Search,
  Menu,
  X,
  FileText,
  Lock,
  Wallet,
  Eye,
  Edit3,
  Trash2,
  Save,
  Download,
  AlertTriangle,
  Sparkles,
  Phone,
  LucideIcon,
} from "lucide-react";

// ─── 1. Catalogue officiel des 24 icônes SVG Al Muxtaar ────────────────────────
export const ICON_NAMES = [
  "01_module_doc",
  "02_module_service",
  "03_module_boutique",
  "04_cours",
  "05_maths",
  "06_svt",
  "07_physique_chimie",
  "08_dashboard",
  "09_abonnement",
  "10_genie_en_herbe",
  "11_quiz",
  "12_hors_ligne",
  "13_illustration_3d",
  "14_progression",
  "15_certificat",
  "16_paiement_mobile",
  "17_securite_admin",
  "18_notification",
  "19_orientation",
  "20_developpement",
  "21_maintenance",
  "22_cadenas_acces",
  "23_eleve_profil",
  "24_calendrier_abonnement",
] as const;

export type IconName = (typeof ICON_NAMES)[number];

// ─── 2. Alias courts vers les icônes SVG officielles ───────────────────────────
export const ICON_ALIASES: Record<string, IconName> = {
  doc: "01_module_doc",
  module_doc: "01_module_doc",
  service: "02_module_service",
  module_service: "02_module_service",
  boutique: "03_module_boutique",
  module_boutique: "03_module_boutique",
  cours: "04_cours",
  maths: "05_maths",
  svt: "06_svt",
  physique: "07_physique_chimie",
  chimie: "07_physique_chimie",
  physique_chimie: "07_physique_chimie",
  dashboard: "08_dashboard",
  abonnement: "09_abonnement",
  genie: "10_genie_en_herbe",
  genie_en_herbe: "10_genie_en_herbe",
  quiz: "11_quiz",
  hors_ligne: "12_hors_ligne",
  illustration_3d: "13_illustration_3d",
  progression: "14_progression",
  certificat: "15_certificat",
  paiement: "16_paiement_mobile",
  paiement_mobile: "16_paiement_mobile",
  wave: "16_paiement_mobile",
  securite: "17_securite_admin",
  securite_admin: "17_securite_admin",
  admin: "17_securite_admin",
  notification: "18_notification",
  notifications: "18_notification",
  orientation: "19_orientation",
  developpement: "20_developpement",
  maintenance: "21_maintenance",
  cadenas: "22_cadenas_acces",
  cadenas_acces: "22_cadenas_acces",
  profil: "23_eleve_profil",
  eleve_profil: "23_eleve_profil",
  eleve: "23_eleve_profil",
  calendrier: "24_calendrier_abonnement",
  calendrier_abonnement: "24_calendrier_abonnement",
};

// ─── 3. Icônes utilitaires de repli (unicolores) pour celles qui n'ont pas de SVG dédié ─
const FALLBACK_LUCIDE_MAP: Record<string, LucideIcon> = {
  check: CheckCircle2,
  alert: AlertCircle,
  alert_triangle: AlertTriangle,
  clock: Clock,
  arrow_right: ArrowRight,
  external: ExternalLink,
  chevron_down: ChevronDown,
  search: Search,
  menu: Menu,
  close: X,
  file: FileText,
  lock: Lock,
  wallet: Wallet,
  eye: Eye,
  edit: Edit3,
  trash: Trash2,
  save: Save,
  download: Download,
  sparkles: Sparkles,
  phone: Phone,
};

export interface IconProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  name: IconName | keyof typeof ICON_ALIASES | keyof typeof FALLBACK_LUCIDE_MAP | string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  alt?: string;
  className?: string;
}

const SIZE_MAP: Record<string, number> = {
  xs: 18,
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64,
};

export function Icon({
  name,
  size = "md",
  alt,
  className,
  ...props
}: IconProps) {
  const pixelSize = typeof size === "number" ? size : SIZE_MAP[size] || 32;

  // 1. Vérifier si c'est un SVG officiel Al Muxtaar (direct ou via alias)
  const resolvedSvgName = (ICON_ALIASES[name] ||
    (ICON_NAMES as readonly string[]).includes(name)
      ? name
      : null) as IconName | null;

  if (resolvedSvgName) {
    const fileName = resolvedSvgName.endsWith(".svg")
      ? resolvedSvgName
      : `${resolvedSvgName}.svg`;

    return (
      <div
        className={cn(
          "inline-flex shrink-0 items-center justify-center select-none",
          className
        )}
        style={{ width: pixelSize, height: pixelSize }}
        {...props}
      >
        <Image
          src={`/assets/icons/${fileName}`}
          alt={alt || `Icône ${resolvedSvgName}`}
          width={pixelSize}
          height={pixelSize}
          className="h-full w-full object-contain"
          unoptimized
        />
      </div>
    );
  }

  // 2. Repli vers une icône unicolore Lucide si pas de SVG dédié
  const LucideComponent = FALLBACK_LUCIDE_MAP[name] || CheckCircle2;

  return (
    <div
      className={cn(
        "inline-flex shrink-0 items-center justify-center select-none text-current",
        className
      )}
      style={{ width: pixelSize, height: pixelSize }}
      {...props}
    >
      <LucideComponent
        size={pixelSize}
        strokeWidth={2}
        className="h-full w-full"
      />
    </div>
  );
}
