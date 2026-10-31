"use client";

import * as React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Tabs } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Icon, ICON_NAMES } from "@/components/ui/icon";
import { Avatar, AVATAR_NAMES } from "@/components/ui/avatar";
import { Logo } from "@/components/ui/logo";

function DesignShowcaseContent() {
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("components");
  const [progressVal, setProgressVal] = React.useState(65);

  return (
    <div className="flex min-h-screen flex-col bg-surface text-navy">
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        {/* Banner */}
        <div className="mb-8 rounded-2xl bg-navy p-6 text-white shadow-soft sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-turquoise-light/20 px-3 py-1 text-xs font-bold text-turquoise">
                Design System v1.0
              </div>
              <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-4xl">
                Système de Design Al Muxtaar
              </h1>
              <p className="mt-1 text-sm text-surface-muted sm:text-base">
                Composants réutilisables, tokens de couleur, accessibilité mobile-first (≥ 44px) et catalogue d&apos;icônes/avatars officiels.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold">
                Mobile: 375 px
              </span>
              <span className="rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold">
                Desktop: 1280 px
              </span>
            </div>
          </div>
        </div>

        {/* Navigation des sections */}
        <div className="mb-8">
          <Tabs
            tabs={[
              { id: "components", label: "Composants UI" },
              { id: "logos", label: "3 Symboles SVG (Logo)", count: 3 },
              { id: "icons", label: "24 Icônes SVG", count: 24 },
              { id: "avatars", label: "16 Avatars Élèves", count: 16 },
              { id: "tokens", label: "Palette & Tokens" },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* SECTION LOGOS SVG */}
        {activeTab === "logos" && (
          <div className="space-y-8">
            <div className="rounded-2xl border border-surface-muted bg-white p-6 shadow-card">
              <h2 className="text-xl font-bold text-navy mb-2">Les 3 Symboles Officiels Al Muxtaar (SVG vectoriels)</h2>
              <p className="text-sm text-navy-light mb-6">
                Symboles en SVG natifs créés pour une netteté parfaite sur tous les écrans (mobile, retina, desktop), légers et scalables sans pixellisation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. Turquoise */}
                <div className="rounded-2xl border border-surface-muted bg-surface p-6 text-center space-y-4">
                  <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-turquoise/10 text-turquoise">
                    1. Turquoise Officiel (#02B9AE)
                  </span>
                  <div className="flex h-36 items-center justify-center bg-white rounded-xl border border-surface-muted p-4">
                    <Logo variant="turquoise" size="xl" showText={false} href={false} />
                  </div>
                  <div className="text-left space-y-1 text-xs text-navy-light">
                    <p className="font-semibold text-navy">Fichier : <code className="text-turquoise">al_muxtaar_symbole.svg</code></p>
                    <p>Usage : Header, affichage par défaut sur fond clair, documentation.</p>
                  </div>
                  <div className="pt-2 border-t border-surface-muted flex justify-center">
                    <Logo variant="turquoise" size="md" href={false} />
                  </div>
                </div>

                {/* 2. Blanc */}
                <div className="rounded-2xl border border-navy-light/20 bg-navy p-6 text-center space-y-4 text-white">
                  <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-white/10 text-white">
                    2. Blanc Pur (#FFFFFF)
                  </span>
                  <div className="flex h-36 items-center justify-center bg-navy-dark rounded-xl border border-white/10 p-4">
                    <Logo variant="blanc" size="xl" showText={false} href={false} />
                  </div>
                  <div className="text-left space-y-1 text-xs text-surface-muted">
                    <p className="font-semibold text-white">Fichier : <code className="text-turquoise-light">al_muxtaar_symbole_blanc.svg</code></p>
                    <p>Usage : Footer sombre, bandeaux bleu nuit, écrans de bienvenue.</p>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-center">
                    <Logo variant="blanc" size="md" textVariant="light" href={false} />
                  </div>
                </div>

                {/* 3. Bleu Nuit */}
                <div className="rounded-2xl border border-surface-muted bg-surface p-6 text-center space-y-4">
                  <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-navy/10 text-navy">
                    3. Bleu Nuit (#243447)
                  </span>
                  <div className="flex h-36 items-center justify-center bg-white rounded-xl border border-surface-muted p-4">
                    <Logo variant="bleu_nuit" size="xl" showText={false} href={false} />
                  </div>
                  <div className="text-left space-y-1 text-xs text-navy-light">
                    <p className="font-semibold text-navy">Fichier : <code className="text-navy">al_muxtaar_symbole_bleu_nuit.svg</code></p>
                    <p>Usage : Factures, impressions papier, filigranes monochromes, documents officiels.</p>
                  </div>
                  <div className="pt-2 border-t border-surface-muted flex justify-center">
                    <Logo variant="bleu_nuit" size="md" href={false} />
                  </div>
                </div>
              </div>

              {/* Échelle des tailles */}
              <div className="mt-8 pt-6 border-t border-surface-muted">
                <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-4">Échelle des tailles (sm · md · lg · xl)</h3>
                <div className="flex flex-wrap items-end gap-6 bg-surface p-6 rounded-xl">
                  <div className="space-y-1 text-center">
                    <Logo size="sm" href={false} />
                    <span className="text-[11px] text-navy-light block mt-1">sm (24px)</span>
                  </div>
                  <div className="space-y-1 text-center">
                    <Logo size="md" href={false} />
                    <span className="text-[11px] text-navy-light block mt-1">md (36px — Header)</span>
                  </div>
                  <div className="space-y-1 text-center">
                    <Logo size="lg" href={false} />
                    <span className="text-[11px] text-navy-light block mt-1">lg (48px)</span>
                  </div>
                  <div className="space-y-1 text-center">
                    <Logo size="xl" href={false} />
                    <span className="text-[11px] text-navy-light block mt-1">xl (68px)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 1: COMPOSANTS UI */}
        {activeTab === "components" && (
          <div className="space-y-10">
            {/* 1. Boutons */}
            <section className="rounded-2xl border border-surface-muted bg-white p-6 shadow-card">
              <h2 className="text-lg font-bold text-navy mb-4">1. Boutons (4 Variantes + Tailles)</h2>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Principal (Turquoise)</Button>
                <Button variant="secondary">Secondaire (Bleu Nuit)</Button>
                <Button variant="outline">Contour (Outline)</Button>
                <Button variant="ghost">Fantôme (Ghost)</Button>
                <Button variant="coral">Alerte (Corail)</Button>
                <Button variant="primary" isLoading>Chargement</Button>
                <Button variant="primary" disabled>Désactivé</Button>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3 pt-4 border-t border-surface-muted">
                <Button size="sm" variant="primary">Taille SM</Button>
                <Button size="md" variant="primary">Taille MD (Standard ≥ 44px)</Button>
                <Button size="lg" variant="primary">Taille LG</Button>
              </div>
            </section>

            {/* 2. Badges de statut */}
            <section className="rounded-2xl border border-surface-muted bg-white p-6 shadow-card">
              <h2 className="text-lg font-bold text-navy mb-4">2. Badges de Statut (Abonnements)</h2>
              <div className="flex flex-wrap items-center gap-4">
                <Badge status="pending" />
                <Badge status="active" />
                <Badge status="expired" />
                <Badge status="rejected" />
                <Badge status="default">Neutre</Badge>
              </div>
            </section>

            {/* 3. Formulaires (Inputs & Selects) */}
            <section className="rounded-2xl border border-surface-muted bg-white p-6 shadow-card">
              <h2 className="text-lg font-bold text-navy mb-4">3. Champs de Saisie & Sélecteurs</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Numéro de téléphone (+221)"
                  placeholder="77 123 45 67"
                  helperText="Format sénégalais à 9 chiffres sans le préfixe"
                />
                <Input
                  label="Champ avec erreur"
                  defaultValue="7700"
                  error="Le numéro doit contenir exactement 9 chiffres"
                />
                <Select
                  label="Niveau scolaire"
                  options={[
                    { value: "tle", label: "Terminale" },
                    { value: "1ere", label: "Première" },
                    { value: "2nde", label: "Seconde" },
                  ]}
                />
                <Select
                  label="Série"
                  error="Veuillez sélectionner une série valide"
                  options={[
                    { value: "s2", label: "S2 — Sciences Expérimentales" },
                    { value: "s1", label: "S1 — Sciences Exactes" },
                  ]}
                />
              </div>
            </section>

            {/* 4. Barre de progression & Onglets */}
            <section className="rounded-2xl border border-surface-muted bg-white p-6 shadow-card">
              <h2 className="text-lg font-bold text-navy mb-4">4. Progression Pédagogique ({progressVal}%)</h2>
              <div className="space-y-4 max-w-xl">
                <ProgressBar value={progressVal} showLabel color="turquoise" />
                <ProgressBar value={40} showLabel color="gold" />
                <ProgressBar value={85} showLabel color="coral" />
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" onClick={() => setProgressVal(Math.max(progressVal - 15, 0))}>
                    -15%
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setProgressVal(Math.min(progressVal + 15, 100))}>
                    +15%
                  </Button>
                </div>
              </div>
            </section>

            {/* 5. Toasts & Boîtes modales */}
            <section className="rounded-2xl border border-surface-muted bg-white p-6 shadow-card">
              <h2 className="text-lg font-bold text-navy mb-4">5. Retours Utilisateurs (Toasts & Modale)</h2>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  onClick={() => showToast("Abonnement activé avec succès !", "success", "Félicitations")}
                >
                  Toast Succès
                </Button>
                <Button
                  variant="coral"
                  onClick={() => showToast("Votre preuve de paiement a été rejetée.", "error", "Erreur")}
                >
                  Toast Erreur
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => showToast("Votre abonnement expire dans 3 jours.", "warning", "Rappel")}
                >
                  Toast Alerte
                </Button>
                <Button
                  variant="outline"
                  onClick={() => showToast("Nouveau chapitre disponible en Mathématiques.", "info", "Info")}
                >
                  Toast Info
                </Button>
                <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
                  Ouvrir la Modale
                </Button>
              </div>

              {/* Modale d'exemple */}
              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Confirmer la formule d'abonnement"
                description="Formule 1 Mois — 700 FCFA avec accès illimité."
              >
                <div className="space-y-4">
                  <p className="text-sm text-navy-light">
                    Effectuez le transfert vers notre numéro Wave puis transmettez le code de transaction dans l&apos;application.
                  </p>
                  <div className="rounded-xl bg-surface p-3 text-xs font-mono font-bold text-navy">
                    Code marchand Wave : +221 77 000 00 00
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                      Annuler
                    </Button>
                    <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                      J&apos;ai compris
                    </Button>
                  </div>
                </div>
              </Modal>
            </section>

            {/* 6. Empty State & Skeleton */}
            <section className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>État Vide (Empty State)</CardTitle>
                  <CardDescription>Quand aucun contenu ou paiement n&apos;est disponible</CardDescription>
                </CardHeader>
                <CardContent>
                  <EmptyState
                    icon={<Icon name="cours" size="lg" />}
                    title="Aucun exercice enregistré"
                    description="Terminez votre première leçon pour voir vos résultats et exercices ici."
                    action={
                      <Button variant="primary" size="sm">
                        Explorer le cours
                      </Button>
                    }
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Chargement (Squelettes)</CardTitle>
                  <CardDescription>Indicateurs de chargement fluides</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <div className="flex items-center gap-3 pt-2">
                    <Skeleton variant="circle" className="h-12 w-12" />
                    <div className="space-y-1.5 flex-1">
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-3 w-1/3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        )}

        {/* SECTION 2: 24 ICÔNES SVG OFFICIELLES */}
        {activeTab === "icons" && (
          <section className="rounded-2xl border border-surface-muted bg-white p-6 shadow-card">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-navy">Les 24 Icônes SVG Officielles</h2>
                <p className="text-sm text-navy-light">
                  Chargées dynamiquement depuis <code className="text-xs bg-surface px-1.5 py-0.5 rounded">/public/assets/icons/</code>
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {ICON_NAMES.map((iconName) => (
                <div
                  key={iconName}
                  className="flex flex-col items-center justify-center rounded-2xl border border-surface-muted bg-surface/50 p-4 text-center transition-all hover:border-turquoise hover:bg-white hover:shadow-card"
                >
                  <Icon name={iconName} size={48} />
                  <span className="mt-3 text-[11px] font-semibold text-navy break-all leading-tight">
                    {iconName}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 3: 16 AVATARS SVG OFFICIELS */}
        {activeTab === "avatars" && (
          <section className="rounded-2xl border border-surface-muted bg-white p-6 shadow-card">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-navy">Les 16 Avatars Élèves & Personnages</h2>
              <p className="text-sm text-navy-light">
                Sélection d&apos;avatars inclusifs pour les profils élèves, parents et équipe.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {AVATAR_NAMES.map((avatarName) => (
                <div
                  key={avatarName}
                  className="flex flex-col items-center justify-center rounded-2xl border border-surface-muted bg-surface/50 p-4 text-center transition-all hover:border-turquoise hover:bg-white hover:shadow-card"
                >
                  <Avatar name={avatarName} size="lg" isBordered />
                  <span className="mt-3 text-[11px] font-semibold text-navy break-all leading-tight">
                    {avatarName.replace("avatar_", "")}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 4: PALETTE & TOKENS */}
        {activeTab === "tokens" && (
          <section className="rounded-2xl border border-surface-muted bg-white p-6 shadow-card">
            <h2 className="text-xl font-bold text-navy mb-4">Palette de Couleurs & Tokens</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div className="rounded-2xl border border-surface-muted p-4">
                <div className="h-16 w-full rounded-xl bg-turquoise flex items-end p-2 text-white font-bold text-xs">
                  #00B8A9
                </div>
                <h3 className="mt-2 font-bold text-navy">Turquoise (Primaire)</h3>
                <p className="text-xs text-navy-light">Boutons d&apos;action, validation, liens actifs</p>
              </div>

              <div className="rounded-2xl border border-surface-muted p-4">
                <div className="h-16 w-full rounded-xl bg-navy flex items-end p-2 text-white font-bold text-xs">
                  #243447
                </div>
                <h3 className="mt-2 font-bold text-navy">Bleu Nuit (Secondaire)</h3>
                <p className="text-xs text-navy-light">Titres, en-tête, cartes d&apos;accentuation</p>
              </div>

              <div className="rounded-2xl border border-surface-muted p-4">
                <div className="h-16 w-full rounded-xl bg-gold flex items-end p-2 text-navy font-bold text-xs">
                  #F7B731
                </div>
                <h3 className="mt-2 font-bold text-navy">Or / Ambre (Récompense)</h3>
                <p className="text-xs text-navy-light">Statut en attente, scores de quiz, badges</p>
              </div>

              <div className="rounded-2xl border border-surface-muted p-4">
                <div className="h-16 w-full rounded-xl bg-coral flex items-end p-2 text-white font-bold text-xs">
                  #F0654C
                </div>
                <h3 className="mt-2 font-bold text-navy">Corail (Alerte)</h3>
                <p className="text-xs text-navy-light">Erreurs, avertissements d&apos;expiration, rejets</p>
              </div>

              <div className="rounded-2xl border border-surface-muted p-4">
                <div className="h-16 w-full rounded-xl bg-surface border border-surface-muted flex items-end p-2 text-navy font-bold text-xs">
                  #F4F8FB
                </div>
                <h3 className="mt-2 font-bold text-navy">Fond Doux (Surface)</h3>
                <p className="text-xs text-navy-light">Arrière-plan global, repos visuel</p>
              </div>

              <div className="rounded-2xl border border-surface-muted p-4">
                <div className="h-16 w-full rounded-xl bg-navy-dark flex items-end p-2 text-white font-bold text-xs">
                  #17222F
                </div>
                <h3 className="mt-2 font-bold text-navy">Texte Sombre (Foreground)</h3>
                <p className="text-xs text-navy-light">Contraste maximal pour la lecture de cours</p>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function DesignPage() {
  return (
    <ToastProvider>
      <DesignShowcaseContent />
    </ToastProvider>
  );
}

