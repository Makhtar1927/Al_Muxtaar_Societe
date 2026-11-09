"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import {
  Home,
  Compass,
  BookOpen,
  Sparkles,
  User,
} from "lucide-react";

export function MobileBottomNav() {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsAuthenticated(!!user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session?.user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Définition des onglets de navigation mobile
  const navItems = [
    {
      label: "Accueil",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      label: "Catalogue",
      href: "/doc/catalogue",
      icon: Compass,
      isActive: pathname.startsWith("/doc/catalogue"),
    },
    {
      label: "Mes Cours",
      href: "/cours",
      icon: BookOpen,
      isActive: pathname.startsWith("/cours"),
    },
    {
      label: "Tarifs",
      href: "/doc/tarifs",
      icon: Sparkles,
      isActive: pathname.startsWith("/doc/tarifs") || pathname.startsWith("/abonnement"),
    },
    {
      label: isAuthenticated ? "Compte" : "Connexion",
      href: isAuthenticated ? "/compte" : "/connexion",
      icon: User,
      isActive: pathname.startsWith("/compte") || pathname.startsWith("/connexion") || pathname.startsWith("/inscription") || pathname.startsWith("/dashboard"),
    },
  ];

  // Masquer la bottom bar dans les vues admin
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <nav
      role="navigation"
      aria-label="Navigation principale mobile"
      className="fixed left-3 right-3 sm:left-6 sm:right-6 max-w-md mx-auto z-40 md:hidden transition-all duration-300"
      style={{
        bottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <div className="flex items-center justify-around rounded-full bg-white/95 backdrop-blur-xl border border-navy/10 px-2 py-1.5 shadow-[0_8px_30px_rgba(23,34,47,0.15)] ring-1 ring-black/5">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-full transition-all duration-200 select-none active:scale-95",
                item.isActive
                  ? "text-turquoise font-black"
                  : "text-navy/60 hover:text-navy font-medium"
              )}
            >
              {/* Pastille de fond subtile pour l'onglet actif */}
              {item.isActive && (
                <span className="absolute inset-x-1 inset-y-0.5 -z-10 rounded-full bg-turquoise/10 animate-in fade-in zoom-in-95 duration-200" />
              )}

              <IconComponent
                className={cn(
                  "w-5 h-5 transition-transform duration-200",
                  item.isActive && "scale-110 stroke-[2.5]"
                )}
              />

              <span className="text-[10px] tracking-tight mt-0.5 leading-none">
                {item.label}
              </span>

              {/* Point indicateur discret au-dessus de l'onglet actif */}
              {item.isActive && (
                <span className="w-1 h-1 rounded-full bg-turquoise mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

