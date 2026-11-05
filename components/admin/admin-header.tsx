"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import NotificationBell from "@/components/notifications/notification-bell";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  CreditCard,
  Users,
  BookOpen,
  Receipt,
  FileText,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface AdminNavProps {
  pendingCount?: number;
}

const ADMIN_NAV_LINKS = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/abonnements", label: "Abonnements", icon: CreditCard, hasPendingBadge: true },
  { href: "/admin/eleves", label: "Élèves", icon: Users },
  { href: "/admin/influenceurs", label: "Influenceurs", icon: Sparkles },
  { href: "/admin/contenu", label: "Contenu & Cours", icon: BookOpen },
  { href: "/admin/tarifs", label: "Tarifs & Formules", icon: Receipt },
  { href: "/admin/journal", label: "Audit & Erreurs", icon: FileText },
];

export function AdminHeader({ pendingCount = 0 }: AdminNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [adminName, setAdminName] = React.useState("Administrateur");

  React.useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("first_name, last_name")
          .eq("id", user.id)
          .maybeSingle();
        if (profile?.first_name) {
          setAdminName(`${profile.first_name} ${profile.last_name ?? ""}`.trim());
        }
      }
    });
  }, []);

  // Fermer le menu mobile au changement de page ou touche Échap
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/connexion");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-navy/10 bg-white/95 backdrop-blur-md shadow-sm">
      {/* ── 1. Top Bar Principale ── */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo & Badge Admin */}
        <div className="flex items-center gap-3">
          <Logo size="md" priority />
          <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-navy px-3 py-1 text-xs font-black text-white uppercase tracking-wider shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-turquoise" />
            <span>Admin Back-Office</span>
          </div>
        </div>

        {/* Droite : Notifications, Espace Élève, Profil, Déconnexion */}
        <div className="flex items-center gap-2 sm:gap-3">
          <NotificationBell />

          <Link href="/dashboard" className="hidden sm:inline-flex">
            <Button
              variant="outline"
              size="sm"
              className="text-xs font-bold text-navy hover:text-turquoise hover:border-turquoise border-navy/20 gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Espace Élève</span>
            </Button>
          </Link>

          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-navy/10">
            <div className="w-7 h-7 rounded-full bg-navy/10 text-navy font-black text-xs flex items-center justify-center">
              {adminName[0]?.toUpperCase() ?? "A"}
            </div>
            <span className="text-xs font-bold text-navy truncate max-w-[120px]">{adminName}</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="hidden sm:inline-flex text-xs text-text/60 hover:text-rose-600 hover:bg-rose-50 gap-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Déconnexion</span>
          </Button>

          {/* Toggle Menu Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl text-navy hover:bg-surface border border-navy/10 transition-colors"
            aria-label="Menu administration"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── 2. Barre d'onglets de navigation Admin (Desktop & Tablette) ── */}
      <div className="hidden md:block bg-surface/70 border-t border-navy/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="flex items-center gap-1.5 overflow-x-auto py-1.5 scrollbar-none">
            {ADMIN_NAV_LINKS.map((item) => {
              const IconComp = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all shrink-0 relative",
                    isActive
                      ? "bg-white text-turquoise shadow-sm border border-navy/10"
                      : "text-navy/70 hover:text-navy hover:bg-white/60"
                  )}
                >
                  <IconComp className={cn("w-4 h-4", isActive ? "text-turquoise" : "text-navy/50")} />
                  <span>{item.label}</span>
                  {item.hasPendingBadge && pendingCount > 0 && (
                    <span className="ml-1 rounded-full bg-amber-500 text-white text-[10px] font-black px-1.5 py-0.2 animate-pulse">
                      {pendingCount}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-turquoise rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ── 3. Fond d'estompage / Backdrop Overlay (ferme le menu au clic en dessous) ── */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 z-30 bg-navy/40 backdrop-blur-xs md:hidden animate-in fade-in duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── 4. Tiroir Mobile Responsive ── */}
      {isMobileMenuOpen && (
        <div className="relative z-40 md:hidden border-t border-navy/10 bg-white px-4 py-4 space-y-2 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          {/* Header Mobile Profil */}
          <div className="pb-3 border-b border-navy/10 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-navy">{adminName}</p>
              <p className="text-[10px] text-text/50">Compte Administrateur</p>
            </div>
            <span className="rounded-full bg-navy px-2.5 py-0.5 text-[10px] font-black text-white">
              Admin
            </span>
          </div>

          <div className="pt-1 text-[11px] font-bold text-navy/40 uppercase tracking-wider">
            Rubriques Administrateur
          </div>

          {ADMIN_NAV_LINKS.map((item) => {
            const IconComp = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all",
                  isActive
                    ? "bg-navy text-white shadow-sm"
                    : "text-navy hover:bg-surface"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <IconComp className={cn("w-4 h-4", isActive ? "text-turquoise" : "text-navy/50")} />
                  <span>{item.label}</span>
                </div>
                {item.hasPendingBadge && pendingCount > 0 && (
                  <span className="rounded-full bg-amber-500 text-white text-[10px] font-black px-2 py-0.5">
                    {pendingCount} à valider
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-navy/10 flex flex-col gap-2">
            <Link
              href="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-surface px-3 py-2.5 text-xs font-bold text-navy hover:bg-surface-muted"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Basculer vers l&apos;Espace Élève</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleSignOut();
              }}
              className="flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50"
            >
              <LogOut className="w-4 h-4" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
