"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import NotificationBell from "@/components/notifications/notification-bell";
import { Logo } from "@/components/ui/logo";
import { createClient } from "@/lib/supabase/client";
import {
  ShieldCheck,
  ChevronDown,
  User,
  BookOpen,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  GraduationCap,
} from "lucide-react";

interface UserProfile {
  first_name?: string | null;
  last_name?: string | null;
  role?: string | null;
  avatar?: string | null;
  phone?: string | null;
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);
  const [profile, setProfile] = React.useState<UserProfile | null>(null);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const mobileMenuRef = React.useRef<HTMLDivElement>(null);
  const mobileToggleRef = React.useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    const supabase = createClient();

    async function loadUserProfile(u: any) {
      if (!u) {
        setProfile(null);
        setIsAdmin(false);
        return;
      }
      const { data } = await supabase
        .from("profiles")
        .select("first_name, last_name, role, avatar, phone")
        .eq("id", u.id)
        .maybeSingle();

      setProfile(data);
      setIsAdmin(data?.role === "admin");
    }

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      loadUserProfile(user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      loadUserProfile(u);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fermer le dropdown au clic extérieur
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }
    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen]);

  // Fermer le menu mobile au clic/tap extérieur sur l'écran
  React.useEffect(() => {
    if (!isMobileMenuOpen) return;

    function handleClickOutside(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;
      const isInsideMenu = mobileMenuRef.current?.contains(target);
      const isInsideToggle = mobileToggleRef.current?.contains(target);

      if (!isInsideMenu && !isInsideToggle) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Fermer les menus lors d'un changement de route ou touche Échap
  React.useEffect(() => {
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsProfileOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setIsAdmin(false);
    router.push("/connexion");
    router.refresh();
  }

  const navLinks = [
    { href: "/doc", label: "Al_Muxtaar_Doc", badge: "Actif" },
    { href: "/service", label: "Al_Muxtaar_Service", badge: "Ingénierie" },
    { href: "/boutique", label: "Al_Muxtaar_Boutique", badge: "Matériels" },
  ];

  const displayName = profile?.first_name
    ? `${profile.first_name} ${profile.last_name ?? ""}`.trim()
    : "Mon Compte";

  const initials = profile?.first_name
    ? `${profile.first_name[0]}${profile.last_name?.[0] ?? ""}`.toUpperCase()
    : "AM";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface-muted bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* ── 1. Logo ── */}
        <div className="flex items-center gap-3">
          <Logo size="md" priority />
        </div>

        {/* ── 2. Modules Navigation (Desktop) ── */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-bold transition-all",
                  isActive
                    ? "bg-surface text-turquoise shadow-sm"
                    : "text-navy hover:bg-surface/70 hover:text-turquoise"
                )}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider",
                      link.badge === "Actif"
                        ? "bg-turquoise-light text-turquoise"
                        : link.badge === "Ingénierie"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-coral-light text-coral"
                    )}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* ── 3. Actions & Profil (Desktop) ── */}
        <div className="hidden md:flex items-center gap-2">
          <NotificationBell />

          {user ? (
            <div className="flex items-center gap-2">
              {/* Badge Admin direct vers dashboard admin */}
              {isAdmin && (
                <Link
                  href="/admin"
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border",
                    pathname.startsWith("/admin")
                      ? "bg-turquoise text-white border-turquoise shadow-sm"
                      : "bg-navy text-white hover:bg-navy/90 border-transparent"
                  )}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-turquoise-light shrink-0" />
                  <span>Espace Admin</span>
                </Link>
              )}

              {/* Menu Profil Déroulant */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className={cn(
                    "flex items-center gap-2 py-1.5 px-2.5 rounded-2xl border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-turquoise",
                    isProfileOpen
                      ? "border-turquoise bg-turquoise/5 shadow-sm"
                      : "border-navy/10 bg-white hover:bg-surface hover:border-navy/20"
                  )}
                  aria-expanded={isProfileOpen}
                  aria-label="Menu utilisateur"
                >
                  {/* Avatar */}
                  <div className="w-7 h-7 rounded-full bg-navy/10 text-navy font-black text-xs flex items-center justify-center ring-1 ring-navy/10 overflow-hidden shrink-0">
                    {profile?.avatar ? (
                      <Image
                        src={`/assets/avatars/${profile.avatar}`}
                        alt={displayName}
                        width={28}
                        height={28}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{initials}</span>
                    )}
                  </div>
                  {/* Nom + rôle */}
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-navy truncate max-w-[100px] leading-tight">
                      {profile?.first_name || "Mon compte"}
                    </span>
                    <span className="text-[10px] text-text/50 font-medium leading-none">
                      {isAdmin ? "Administrateur" : "Élève"}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 text-navy/40 transition-transform duration-200 shrink-0",
                      isProfileOpen && "rotate-180"
                    )}
                  />
                </button>

                {/* Popover Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-navy/10 shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    {/* En-tête identité */}
                    <div className="px-4 py-3 bg-gradient-to-br from-surface to-white border-b border-navy/5 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-navy/10 text-navy font-black text-sm flex items-center justify-center overflow-hidden shrink-0">
                        {profile?.avatar ? (
                          <Image
                            src={`/assets/avatars/${profile.avatar}`}
                            alt={displayName}
                            width={36}
                            height={36}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span>{initials}</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-navy truncate">{displayName}</p>
                        <p className="text-[10px] text-text/50 truncate">{profile?.phone || "Compte vérifié"}</p>
                        {isAdmin ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-navy px-2 py-0.5 text-[9px] font-black text-white mt-1">
                            <ShieldCheck className="w-2.5 h-2.5 text-turquoise" />
                            Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-turquoise-light px-2 py-0.5 text-[9px] font-bold text-turquoise mt-1">
                            <GraduationCap className="w-2.5 h-2.5" />
                            Élève
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="py-1">
                      {isAdmin && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-turquoise/5 text-turquoise font-bold text-xs transition-colors"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                          <span>Panneau Administration</span>
                        </Link>
                      )}
                      <Link
                        href="/cours"
                        className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-surface text-navy text-xs font-semibold transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-navy/50 shrink-0" />
                        <span>Mes cours & fiches</span>
                      </Link>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-surface text-navy text-xs font-semibold transition-colors"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-navy/50 shrink-0" />
                        <span>Tableau de bord révision</span>
                      </Link>
                      <Link
                        href="/compte"
                        className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-surface text-navy text-xs font-semibold transition-colors"
                      >
                        <User className="w-3.5 h-3.5 text-navy/50 shrink-0" />
                        <span>Mon profil & paramètres</span>
                      </Link>
                    </div>

                    {/* Séparateur + Déconnexion */}
                    <div className="border-t border-navy/5">
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left"
                      >
                        <LogOut className="w-3.5 h-3.5 shrink-0" />
                        <span>Déconnexion</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/connexion">
                <Button variant="outline" size="sm" className="font-bold text-xs">
                  Connexion
                </Button>
              </Link>
              <Link href="/inscription">
                <Button variant="primary" size="sm" className="font-bold text-xs">
                  S&apos;inscrire
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* ── 4. Mobile Actions & Toggle (< 768px) ── */}
        <div className="flex md:hidden items-center gap-2">
          <NotificationBell />
          <button
            ref={mobileToggleRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-navy/10 text-navy hover:bg-surface transition-colors"
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* ── 5. Fond d'estompage / Backdrop Overlay (ferme le menu au clic en dessous) ── */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 z-30 bg-navy/40 backdrop-blur-xs md:hidden animate-in fade-in duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── 6. Tiroir Mobile Responsive ── */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="relative z-40 md:hidden border-b border-surface-muted bg-white px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-2 duration-200"
        >
          {user && (
            <div className="mb-4 p-3.5 bg-surface/80 rounded-2xl border border-navy/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-navy/10 text-navy font-black text-sm flex items-center justify-center overflow-hidden shrink-0">
                  {profile?.avatar ? (
                    <Image
                      src={`/assets/avatars/${profile.avatar}`}
                      alt={displayName}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{initials}</span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-navy">{displayName}</p>
                  <p className="text-xs text-text/50">
                    {profile?.phone || user.email || "Connecté"}
                  </p>
                </div>
              </div>
              {isAdmin ? (
                <span className="rounded-full bg-navy px-2.5 py-0.5 text-[10px] font-black text-white">
                  Admin
                </span>
              ) : (
                <span className="rounded-full bg-turquoise-light px-2.5 py-0.5 text-[10px] font-bold text-turquoise">
                  Élève
                </span>
              )}
            </div>
          )}

          <div className="flex flex-col space-y-1.5">
            {/* Si admin, bouton proéminent vers l'administration */}
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full mb-2"
              >
                <div className="flex items-center justify-between p-3 rounded-2xl bg-navy text-white font-bold text-sm shadow-sm">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-turquoise" />
                    <span>Tableau de Bord Administrateur</span>
                  </div>
                  <span className="text-xs text-turquoise">Ouvrir →</span>
                </div>
              </Link>
            )}

            {/* Modules de l'écosystème */}
            <div className="text-[11px] font-bold text-navy/40 uppercase tracking-wider px-2 pt-1">
              Modules Écosystème
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-navy hover:bg-surface"
              >
                <span>{link.label}</span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-bold",
                    link.badge === "Actif"
                      ? "bg-turquoise-light text-turquoise"
                      : link.badge === "Ingénierie"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-coral-light text-coral"
                  )}
                >
                  {link.badge}
                </span>
              </Link>
            ))}

            {/* Navigation élève / profil */}
            {user ? (
              <div className="pt-3 border-t border-navy/10 flex flex-col gap-1.5">
                <div className="text-[11px] font-bold text-navy/40 uppercase tracking-wider px-2">
                  Espace Personnel
                </div>
                <Link
                  href="/cours"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-navy hover:bg-surface"
                >
                  <BookOpen className="w-4 h-4 text-turquoise" />
                  <span>Mes cours & fiches</span>
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-navy hover:bg-surface"
                >
                  <LayoutDashboard className="w-4 h-4 text-navy/60" />
                  <span>Tableau de bord de révision</span>
                </Link>
                <Link
                  href="/compte"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-navy hover:bg-surface"
                >
                  <User className="w-4 h-4 text-navy/60" />
                  <span>Mon profil & paramètres</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 text-left mt-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
                </button>
              </div>
            ) : (
              <div className="pt-3 border-t border-navy/10">
                <Link
                  href="/connexion"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full block"
                >
                  <Button variant="primary" size="md" className="w-full font-bold">
                    Connexion / S&apos;inscrire
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
