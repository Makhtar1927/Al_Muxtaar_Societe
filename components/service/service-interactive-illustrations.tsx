"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ── 1. Illustration : Développement Web & Mobile Moderne ────────────────────
export function DevSolutionsIllustration({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full aspect-[16/10] max-h-72 select-none overflow-hidden rounded-2xl bg-gradient-to-br from-[#17222F] via-[#243447] to-[#0F172A] p-4 text-white shadow-xl border border-white/10", className)}>
      {/* Grille de fond animée */}
      <div className="absolute inset-0 bg-[radial-gradient(#00B8A9_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />

      {/* Aura lumineuse */}
      <div className="absolute -top-12 -right-12 h-44 w-44 rounded-full bg-turquoise/25 blur-3xl animate-pulse" />
      <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-gold/20 blur-2xl" />

      {/* Laptop & Code IDE */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        {/* Barre de fenêtre IDE */}
        <div className="flex items-center justify-between rounded-t-xl bg-black/40 px-3 py-2 border-b border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-coral/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-gold/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-turquoise/80" />
          </div>
          <span className="font-mono text-[11px] text-white/60 font-semibold tracking-wider">
            app.almuxtaar.sn ~ React · Next.js · PWA
          </span>
          <span className="rounded bg-turquoise/20 px-2 py-0.5 text-[9px] font-bold text-turquoise uppercase tracking-wider">
            Build: Passer
          </span>
        </div>

        {/* Corps de l'IDE : Code & Preview Mobile */}
        <div className="grid grid-cols-12 gap-3 py-2 flex-1 items-center">
          {/* Bloc Code */}
          <div className="col-span-7 space-y-1.5 font-mono text-[10px] sm:text-xs">
            <div className="flex items-center gap-2 text-white/40">
              <span className="text-white/20">01</span>
              <span className="text-turquoise">import</span> &#123; createPlatform &#125; <span className="text-turquoise">from</span> <span className="text-gold">&quot;al-muxtaar&quot;</span>;
            </div>
            <div className="flex items-center gap-2 text-white/40">
              <span className="text-white/20">02</span>
              <span className="text-turquoise">const</span> <span className="text-white font-bold">solution</span> = <span className="text-gold">new</span> Solution(&#123;
            </div>
            <div className="flex items-center gap-2 pl-4 text-white/60">
              <span className="text-white/20">03</span>
              <span className="text-turquoise">speed:</span> <span className="text-gold">&quot;4G Sénégal PWA&quot;</span>,
            </div>
            <div className="flex items-center gap-2 pl-4 text-white/60">
              <span className="text-white/20">04</span>
              <span className="text-turquoise">offline:</span> <span className="text-emerald-400">true</span>,
            </div>
            <div className="flex items-center gap-2 text-white/40">
              <span className="text-white/20">05</span>
              &#125;);
            </div>
            <div className="flex items-center gap-2 pt-1 text-emerald-400 font-bold">
              <span className="text-white/20">&gt;</span>
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-ping mr-1" />
              <span>Système prêt pour déploiement</span>
            </div>
          </div>

          {/* Maquette Smartphone Interactive */}
          <div className="col-span-5 flex justify-end">
            <div className="w-24 sm:w-28 rounded-2xl border-2 border-white/20 bg-black/60 p-1.5 shadow-2xl backdrop-blur-md">
              <div className="h-1.5 w-8 rounded-full bg-white/30 mx-auto mb-1.5" />
              <div className="space-y-1.5 rounded-xl bg-white/5 p-1.5">
                <div className="h-4 rounded bg-turquoise/30 flex items-center justify-between px-1">
                  <span className="h-2 w-2 rounded-full bg-turquoise" />
                  <span className="h-1 w-6 rounded bg-white/40" />
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="h-7 rounded bg-white/10 flex flex-col justify-end p-1">
                    <span className="h-1 w-full rounded bg-gold/50" />
                  </div>
                  <div className="h-7 rounded bg-white/10 flex flex-col justify-end p-1">
                    <span className="h-1 w-full rounded bg-turquoise/50" />
                  </div>
                </div>
                <div className="h-3 rounded bg-emerald-500/30 flex items-center justify-center">
                  <span className="text-[8px] font-black text-emerald-300">PWA INSTALLÉE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pied de l'IDE : Métriques d'optimisation */}
        <div className="flex items-center justify-between rounded-b-xl bg-black/30 px-3 py-1.5 text-[10px] text-white/70 border-t border-white/5">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Lighthouse 100/100 Mobile
          </span>
          <span className="font-mono text-gold font-bold">Next.js 14 · Supabase · PostgreSQL</span>
        </div>
      </div>
    </div>
  );
}

// ── 2. Illustration : Gestion Scolaire & ERP Éducatif ───────────────────────
export function SchoolManagementIllustration({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full aspect-[16/10] max-h-72 select-none overflow-hidden rounded-2xl bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#17222F] p-4 text-white shadow-xl border border-white/10", className)}>
      <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-gold/20 blur-3xl animate-pulse" />
      <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-turquoise/20 blur-3xl" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        {/* En-tête ERP */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-black text-xs">
              M
            </div>
            <div>
              <span className="block text-xs font-black tracking-tight text-white">
                Portail Établissement Sénégalais
              </span>
              <span className="block text-[9px] text-white/50">
                Lycée &amp; Collège · Année Scolaire 2024–2025
              </span>
            </div>
          </div>
          <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
            En direct
          </span>
        </div>

        {/* Tableau de bord interactif */}
        <div className="grid grid-cols-3 gap-2.5 py-2 flex-1 items-center">
          {/* Carte 1 : Effectif & Scolarité */}
          <div className="rounded-xl bg-white/5 p-2.5 border border-white/10 space-y-1">
            <span className="text-[10px] text-white/60 block">Inscriptions</span>
            <span className="text-lg font-black text-white block">1 240</span>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-turquoise rounded-full w-[94%]" />
            </div>
            <span className="text-[9px] text-turquoise font-semibold block">94% scolarités à jour</span>
          </div>

          {/* Carte 2 : Moyennes & Bulletins */}
          <div className="rounded-xl bg-white/5 p-2.5 border border-white/10 space-y-1">
            <span className="text-[10px] text-white/60 block">Moyenne Générale</span>
            <span className="text-lg font-black text-gold block">14.62 / 20</span>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gold rounded-full w-[82%]" />
            </div>
            <span className="text-[9px] text-gold font-semibold block">Génération bulletins 1-clic</span>
          </div>

          {/* Carte 3 : Alertes Parents SMS/WhatsApp */}
          <div className="rounded-xl bg-white/5 p-2.5 border border-white/10 space-y-1">
            <span className="text-[10px] text-white/60 block">Notification Parents</span>
            <span className="text-lg font-black text-emerald-400 block">100%</span>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full w-full" />
            </div>
            <span className="text-[9px] text-emerald-400 font-semibold block">WhatsApp &amp; SMS direct</span>
          </div>
        </div>

        {/* Badge récapitulatif */}
        <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-1.5 text-[10px] text-white/80">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-gold animate-ping" />
            Conforme programmes &amp; nomenclature IGEF Sénégal
          </span>
          <span className="font-mono text-turquoise font-bold">Impression Bulletins MEN</span>
        </div>
      </div>
    </div>
  );
}

// ── 3. Illustration : Réparation, Installation & Maintenance Informatique ───
export function NetworkMaintenanceIllustration({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full aspect-[16/10] max-h-72 select-none overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B1522] via-[#17222F] to-[#1E293B] p-4 text-white shadow-xl border border-white/10", className)}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-44 w-44 rounded-full bg-turquoise/15 blur-3xl animate-pulse" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        {/* Titre infrastructure & Réparation PC */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-black tracking-tight text-white uppercase">
              Atelier Réparation PC, Installation &amp; Réseau
            </span>
          </div>
          <span className="font-mono text-[10px] text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded">
            Diagnostic en cours : OK
          </span>
        </div>

        {/* Schéma Double Volet : Dépannage Matériel PC & Réseau Local */}
        <div className="grid grid-cols-12 gap-3 py-2 flex-1 items-center">
          {/* Bloc Réparation Ordinateur & Système */}
          <div className="col-span-6 rounded-xl bg-black/60 p-2.5 border border-white/15 space-y-1.5">
            <div className="flex items-center justify-between border-b border-white/10 pb-1">
              <span className="text-[10px] font-black text-gold">DÉPANNAGE PC &amp; LAPTOP</span>
              <span className="text-[8px] font-mono text-emerald-400">100% Récupéré</span>
            </div>
            
            <div className="space-y-1 text-[9px]">
              <div className="flex items-center justify-between bg-white/5 rounded px-2 py-1">
                <span className="text-white/80">Diagnostic matériel &amp; RAM/SSD</span>
                <span className="text-turquoise font-bold">Remplacement express</span>
              </div>
              <div className="flex items-center justify-between bg-white/5 rounded px-2 py-1">
                <span className="text-white/80">Formatage &amp; Windows / Linux</span>
                <span className="text-emerald-400 font-bold">Système neuf</span>
              </div>
              <div className="flex items-center justify-between bg-white/5 rounded px-2 py-1">
                <span className="text-white/80">Nettoyage virus &amp; Récup. données</span>
                <span className="text-gold font-bold">Sécurisé</span>
              </div>
            </div>
          </div>

          {/* Bloc Baie & Réseaux Wi-Fi */}
          <div className="col-span-6 rounded-xl bg-white/5 p-2.5 border border-white/10 space-y-1.5">
            <div className="flex items-center justify-between border-b border-white/10 pb-1">
              <span className="text-[10px] font-black text-turquoise">CÂBLAGE &amp; RÉSEAU WI-FI</span>
              <span className="text-[8px] font-mono text-gold">Switch 16P Gigabit</span>
            </div>

            {/* Ports RJ45 avec voyants d'activité */}
            <div className="grid grid-cols-8 gap-1 py-0.5">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="h-2 rounded-[2px] bg-white/20 flex items-center justify-center">
                  <div className={`h-1 w-1 rounded-full ${i % 3 === 0 ? "bg-emerald-400 animate-pulse" : i % 2 === 0 ? "bg-turquoise" : "bg-gold"}`} />
                </div>
              ))}
            </div>

            <div className="space-y-1 text-[9px] pt-0.5">
              <div className="flex items-center justify-between text-white/70">
                <span>Parc 35 Postes installés</span>
                <span className="text-emerald-400 font-bold">Zéro Panne</span>
              </div>
              <div className="flex items-center justify-between text-white/70">
                <span>Onduleur &amp; Protection surtension</span>
                <span className="text-turquoise font-bold">230V Protégé</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bas de page maintenance */}
        <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-1.5 text-[10px] text-white/70">
          <span className="text-gold font-bold">Intervention à domicile, bureau ou atelier</span>
          <span className="font-mono text-emerald-400">Dakar &amp; Toutes Régions · Réponse &lt; 24h</span>
        </div>
      </div>
    </div>
  );
}

// ── 3 bis. Illustration : Système d'Information Dahiras & Associations ──────
export function DahiraManagementIllustration({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full aspect-[16/10] max-h-72 select-none overflow-hidden rounded-2xl bg-gradient-to-br from-[#064E3B] via-[#062D24] to-[#0B1522] p-4 text-white shadow-xl border border-emerald-500/30", className)}>
      <div className="absolute -top-12 -right-12 h-44 w-44 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />
      <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-gold/20 blur-2xl" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        {/* En-tête Dahira */}
        <div className="flex items-center justify-between border-b border-emerald-400/20 pb-2">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-emerald-500/30 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-black text-xs">
              D
            </div>
            <div>
              <span className="block text-xs font-black tracking-tight text-white">
                Système d&apos;Information Dahira &amp; Communauté
              </span>
              <span className="block text-[9px] text-emerald-200/70">
                Fédération · Sections Dakar, Touba, Tivaouane &amp; Diaspora
              </span>
            </div>
          </div>
          <span className="rounded-full bg-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-200 border border-emerald-400/40">
            Plateforme Active
          </span>
        </div>

        {/* Tableau de bord Dahira */}
        <div className="grid grid-cols-3 gap-2.5 py-2 flex-1 items-center">
          {/* Carte 1 : Membres & Cotisations (Sass) */}
          <div className="rounded-xl bg-black/40 p-2.5 border border-emerald-500/20 space-y-1">
            <span className="text-[10px] text-emerald-200/70 block">Membres &amp; Adhésions</span>
            <span className="text-lg font-black text-white block">850 inscrits</span>
            <div className="h-1.5 w-full bg-emerald-950 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full w-[88%]" />
            </div>
            <span className="text-[9px] text-emerald-300 font-semibold block">88% cotisations à jour</span>
          </div>

          {/* Carte 2 : Collecte Digitale Wave & OM */}
          <div className="rounded-xl bg-black/40 p-2.5 border border-gold/30 space-y-1 shadow-lg shadow-gold/5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gold/80 block">Caisse &amp; Dons</span>
              <span className="text-[8px] rounded bg-gold/20 px-1 font-bold text-gold">Wave · OM</span>
            </div>
            <span className="text-base sm:text-lg font-black text-gold block">3 450 000 F</span>
            <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden">
              <div className="h-full bg-gold rounded-full w-[95%]" />
            </div>
            <span className="text-[9px] text-gold font-semibold block">Zakat, Sadaqa &amp; Sass</span>
          </div>

          {/* Carte 3 : Événements & Diffusion SMS/WhatsApp */}
          <div className="rounded-xl bg-black/40 p-2.5 border border-white/10 space-y-1">
            <span className="text-[10px] text-white/70 block">Magal / Gamou / Thiante</span>
            <span className="text-xs font-black text-white block">Agenda &amp; Réunions</span>
            <div className="rounded bg-white/5 p-1 text-[8px] text-white/80 space-y-0.5">
              <div className="flex items-center justify-between">
                <span>SMS envoyé</span>
                <span className="text-emerald-400 font-bold">850 reçus</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Groupe WhatsApp</span>
                <span className="text-turquoise font-bold">Synchronisé</span>
              </div>
            </div>
            <span className="text-[9px] text-turquoise font-semibold block">Rappels automatiques</span>
          </div>
        </div>

        {/* Pied de carte */}
        <div className="flex items-center justify-between rounded-xl bg-black/30 px-3 py-1.5 text-[10px] text-white/80 border border-emerald-500/20">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-gold" />
            Transparence financière &amp; reçus électroniques automatiques
          </span>
          <span className="font-mono text-gold font-bold">App Mobile &amp; Web</span>
        </div>
      </div>
    </div>
  );
}

// ── 4. Illustration : Cloud, Sécurité & Noms de domaine .SN ─────────────────
export function CloudSecurityIllustration({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full aspect-[16/10] max-h-72 select-none overflow-hidden rounded-2xl bg-gradient-to-br from-[#111827] via-[#0D233A] to-[#1E293B] p-4 text-white shadow-xl border border-white/10", className)}>
      <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-emerald-500/15 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-turquoise/20 blur-3xl" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        {/* Certificat SSL & Domaine */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <span className="font-mono text-xs font-bold text-white">
              https://votre-entreprise.sn
            </span>
          </div>
          <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[9px] font-black text-emerald-300">
            SSL 256 BITS ACTIF
          </span>
        </div>

        {/* Contenu central Cloud & Sauvegarde */}
        <div className="grid grid-cols-12 gap-3 py-2 flex-1 items-center">
          <div className="col-span-7 space-y-2">
            <div className="rounded-xl bg-white/5 p-2 border border-white/10">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-white/70">Messagerie Pro @votre-entreprise.sn</span>
                <span className="text-emerald-400 font-bold">100% Sécurisé</span>
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-[9px] text-white/40 font-mono">
                <span>Anti-Spam</span> · <span>DKIM</span> · <span>DMARC</span> · <span>SPF</span>
              </div>
            </div>

            <div className="rounded-xl bg-white/5 p-2 border border-white/10">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-white/70">Sauvegarde automatique cloud quotidien</span>
                <span className="text-turquoise font-bold">Chiffré AES</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mt-1">
                <div className="h-full bg-turquoise rounded-full w-full animate-pulse" />
              </div>
            </div>
          </div>

          {/* Sceau .SN Officiel NIC Sénégal */}
          <div className="col-span-5 flex flex-col items-center justify-center rounded-xl bg-black/40 p-3 border border-white/15 text-center">
            <div className="h-10 w-10 rounded-full border-2 border-emerald-400 bg-emerald-500/20 flex items-center justify-center font-black text-emerald-300 text-sm mb-1 shadow-lg shadow-emerald-500/20">
              .SN
            </div>
            <span className="text-[11px] font-black text-white">Domaine National</span>
            <span className="text-[9px] text-white/50">Enregistrement agréé</span>
          </div>
        </div>

        {/* Footer Sécurité */}
        <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-1.5 text-[10px] text-white/70">
          <span>Protection pare-feu contre attaques DDoS</span>
          <span className="text-gold font-bold">Disponibilité garantie 99.9%</span>
        </div>
      </div>
    </div>
  );
}

// ── 5. Illustration : Conseil, Audit & Orientation Informatique ──────────────
export function AuditConsultingIllustration({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full aspect-[16/10] max-h-72 select-none overflow-hidden rounded-2xl bg-gradient-to-br from-[#17222F] via-[#243447] to-[#0A192F] p-4 text-white shadow-xl border border-white/10", className)}>
      <div className="absolute top-0 left-1/4 h-36 w-36 rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-36 w-36 rounded-full bg-turquoise/20 blur-3xl" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        {/* Titre Stratégie */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-gold animate-ping" />
            <span className="text-xs font-black tracking-tight text-white uppercase">
              Audit Numérique, Stratégie &amp; Formation Métier
            </span>
          </div>
          <span className="font-mono text-[10px] text-gold font-bold">Diagnostic Pro</span>
        </div>

        {/* Parcours d'accompagnement en 3 étapes */}
        <div className="grid grid-cols-3 gap-2 py-2 flex-1 items-center">
          <div className="rounded-xl bg-white/5 p-2.5 border border-white/10 space-y-1 text-center">
            <span className="text-xs font-black text-turquoise block">01 · Audit</span>
            <span className="text-[10px] text-white/80 font-semibold block">Analyse des besoins</span>
            <span className="text-[9px] text-white/50 block">Rapport d&apos;optimisation</span>
          </div>

          <div className="rounded-xl bg-white/10 p-2.5 border border-gold/40 space-y-1 text-center shadow-lg shadow-gold/10">
            <span className="text-xs font-black text-gold block">02 · Solution</span>
            <span className="text-[10px] text-white font-bold block">Feuille de route</span>
            <span className="text-[9px] text-gold/90 block">Architecture sur-mesure</span>
          </div>

          <div className="rounded-xl bg-white/5 p-2.5 border border-white/10 space-y-1 text-center">
            <span className="text-xs font-black text-emerald-400 block">03 · Transfert</span>
            <span className="text-[10px] text-white/80 font-semibold block">Formation des équipes</span>
            <span className="text-[9px] text-white/50 block">Autonomie totale</span>
          </div>
        </div>

        {/* Volet Orientation Informatique */}
        <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-1.5 text-[10px] text-white/80">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-turquoise" />
            Orientation bacheliers vers les filières tech porteuses (IA, Cybersécurité, Dév Web)
          </span>
          <span className="font-mono text-gold font-bold">Conseil Certifié</span>
        </div>
      </div>
    </div>
  );
}

