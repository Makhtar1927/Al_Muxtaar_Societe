import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

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

// Alias courts et pratiques pour le code
export const ICON_ALIASES: Record<string, IconName> = {
  doc: "01_module_doc",
  service: "02_module_service",
  boutique: "03_module_boutique",
  cours: "04_cours",
  maths: "05_maths",
  svt: "06_svt",
  physique: "07_physique_chimie",
  dashboard: "08_dashboard",
  abonnement: "09_abonnement",
  genie: "10_genie_en_herbe",
  quiz: "11_quiz",
  hors_ligne: "12_hors_ligne",
  illustration_3d: "13_illustration_3d",
  progression: "14_progression",
  certificat: "15_certificat",
  paiement: "16_paiement_mobile",
  securite: "17_securite_admin",
  notification: "18_notification",
  orientation: "19_orientation",
  developpement: "20_developpement",
  maintenance: "21_maintenance",
  cadenas: "22_cadenas_acces",
  profil: "23_eleve_profil",
  calendrier: "24_calendrier_abonnement",
};

export interface IconProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  name: IconName | keyof typeof ICON_ALIASES;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  alt?: string;
}

export function Icon({
  name,
  size = "md",
  alt,
  className,
  ...props
}: IconProps) {
  const resolvedName = (ICON_ALIASES[name] || name) as IconName;
  const fileName = resolvedName.endsWith(".svg") ? resolvedName : `${resolvedName}.svg`;

  const sizeMap: Record<string, number> = {
    xs: 18,
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
  };

  const pixelSize = typeof size === "number" ? size : sizeMap[size] || 32;

  return (
    <div
      className={cn("inline-flex shrink-0 items-center justify-center select-none", className)}
      style={{ width: pixelSize, height: pixelSize }}
      {...props}
    >
      <Image
        src={`/assets/icons/${fileName}`}
        alt={alt || `Icône ${resolvedName}`}
        width={pixelSize}
        height={pixelSize}
        className="h-full w-full object-contain"
        unoptimized
      />
    </div>
  );
}

