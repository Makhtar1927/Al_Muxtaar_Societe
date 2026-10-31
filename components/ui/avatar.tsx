import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const AVATAR_NAMES = [
  "avatar_00_defaut_neutre",
  "avatar_01_eleve_garcon",
  "avatar_02_eleve_garcon_lunettes",
  "avatar_03_eleve_fille_tresses",
  "avatar_04_eleve_fille_voile",
  "avatar_05_enseignant",
  "avatar_06_enseignante",
  "avatar_07_pere",
  "avatar_08_mere",
  "avatar_09_admin_homme",
  "avatar_10_admin_femme_support",
  "avatar_11_jeune_homme",
  "avatar_12_jeune_femme_locks",
  "avatar_13_petit_garcon",
  "avatar_14_petite_fille",
  "avatar_15_grand_pere",
  "avatar_16_grand_mere",
] as const;

export type AvatarName = (typeof AVATAR_NAMES)[number];

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: AvatarName | string;
  size?: "sm" | "md" | "lg" | "xl" | number;
  alt?: string;
  isBordered?: boolean;
}

export function Avatar({
  name = "avatar_00_defaut_neutre",
  size = "md",
  alt = "Avatar élève Al Muxtaar",
  isBordered = false,
  className,
  ...props
}: AvatarProps) {
  // Déterminer le fichier d'avatar
  let fileName = name;
  if (!fileName.endsWith(".svg") && !fileName.includes("/")) {
    fileName = `${fileName}.svg`;
  }
  const avatarPath = fileName.startsWith("/")
    ? fileName
    : `/assets/avatars/${fileName}`;

  const sizeMap: Record<string, number> = {
    sm: 36,
    md: 48,
    lg: 64,
    xl: 96,
  };

  const pixelSize = typeof size === "number" ? size : sizeMap[size] || 48;

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-muted select-none",
        isBordered && "ring-2 ring-turquoise ring-offset-2 ring-offset-white",
        className
      )}
      style={{ width: pixelSize, height: pixelSize }}
      {...props}
    >
      <Image
        src={avatarPath}
        alt={alt}
        width={pixelSize}
        height={pixelSize}
        className="h-full w-full object-cover"
        unoptimized
      />
    </div>
  );
}

