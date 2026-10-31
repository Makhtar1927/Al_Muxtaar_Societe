"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { Tabs } from "@/components/ui/tabs";

const TLE_S2_MATHS_CHAPTERS = [
  { id: 1, title: "Limites et Continuité", lecons: 4, isFree: true, desc: "Notion de limite, théorèmes de comparaison, continuité en un point et sur un intervalle, théorème des valeurs intermédiaires." },
  { id: 2, title: "Dérivation et Études de Fonctions", lecons: 5, isFree: false, desc: "Nombre dérivé, dérivabilité sur un intervalle, sens de variation, extremums, branches infinies et asymptotes." },
  { id: 3, title: "Fonction Logarithme Népérien (ln)", lecons: 4, isFree: false, desc: "Définition, propriétés algébriques, limites usuelles, dérivation et étude des fonctions composées avec ln." },
  { id: 4, title: "Fonction Exponentielle (exp)", lecons: 4, isFree: false, desc: "Définition comme réciproque de ln, croissances comparées, limites remarquables et équations différentielles simples." },
  { id: 5, title: "Suites Numériques", lecons: 4, isFree: false, desc: "Suites arithmétiques et géométriques, raisonnement par récurrence, convergence, suites adjacentes et suites récurrentes." },
  { id: 6, title: "Primitives et Calcul Intégral", lecons: 5, isFree: false, desc: "Tableau des primitives usuelles, intégrale définie, relation de Chasles, intégration par parties et calcul d'aires." },
  { id: 7, title: "Nombres Complexes", lecons: 6, isFree: false, desc: "Forme algébrique, trigonométrique et exponentielle, module et argument, équations du second degré, interprétation géométrique." },
  { id: 8, title: "Probabilités et Dénombrement", lecons: 4, isFree: false, desc: "Combinaisons et arrangements, probabilité conditionnelle, formule de Bayes, variables aléatoires et loi binomiale." },
  { id: 9, title: "Géométrie dans l'Espace", lecons: 4, isFree: false, desc: "Repérage dans l'espace, produit scalaire, produit vectoriel, équations cartésiennes de plans et sphères." },
];

export default function CataloguePage() {
  const [selectedLevel, setSelectedLevel] = React.useState("tle");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 space-y-10">
      {/* En-tête */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-turquoise-light px-3.5 py-1 text-xs font-bold text-turquoise mb-3">
          <Icon name="cours" size={16} />
          Référentiel des cours
        </div>
        <h1 className="text-3xl font-black tracking-tight text-navy sm:text-4xl">
          Catalogue des Programmes Officiels
        </h1>
        <p className="mt-2 text-sm text-navy-light sm:text-base">
          Consultez l&apos;arborescence des niveaux, séries et matières disponibles sur la plateforme Al_Muxtaar_Doc.
        </p>
      </div>

      {/* Sélecteur de Niveaux */}
      <div className="max-w-md mx-auto">
        <Tabs
          tabs={[
            { id: "tle", label: "Terminale", count: 1 },
            { id: "1ere", label: "Première (Bientôt)" },
            { id: "2nde", label: "Seconde (Bientôt)" },
          ]}
          activeTab={selectedLevel}
          onChange={setSelectedLevel}
        />
      </div>

      {/* CONTENU TERMINALE */}
      {selectedLevel === "tle" ? (
        <div className="space-y-10">
          {/* Sélection Série & Matière */}
          <div className="rounded-2xl border border-surface-muted bg-white p-6 shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-surface-muted pb-4">
              <div>
                <span className="text-xs font-bold text-turquoise uppercase tracking-wider">
                  Série S2 · Sciences Expérimentales
                </span>
                <h2 className="text-xl font-bold text-navy mt-0.5">
                  Mathématiques (Programme National)
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <Badge status="active">Disponible</Badge>
                <span className="text-xs text-navy-light">9 chapitres · 40 leçons</span>
              </div>
            </div>

            {/* Autres matières de la même série (Bientôt) */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-navy-light">
              <span className="font-semibold text-navy">Autres matières :</span>
              <span className="rounded-lg bg-surface px-2.5 py-1 border border-surface-muted">
                Physique-Chimie (Bientôt)
              </span>
              <span className="rounded-lg bg-surface px-2.5 py-1 border border-surface-muted">
                SVT (Bientôt)
              </span>
              <span className="rounded-lg bg-surface px-2.5 py-1 border border-surface-muted">
                Philosophie (Bientôt)
              </span>
            </div>
          </div>

          {/* Grille des 9 chapitres de Tle S2 Maths */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-navy">
                Chapitres de Terminale S2 — Mathématiques
              </h3>
              <Link href="/doc/tarifs" className="text-xs font-bold text-turquoise hover:underline">
                Débloquer tous les chapitres →
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TLE_S2_MATHS_CHAPTERS.map((chap) => (
                <Card
                  key={chap.id}
                  className={chap.isFree ? "border-2 border-turquoise/50 shadow-hover" : ""}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-navy-light/60">
                        Chapitre {chap.id}
                      </span>
                      {chap.isFree ? (
                        <Badge status="active">Extrait Gratuit</Badge>
                      ) : (
                        <Badge status="expired">Réservé Abonnés</Badge>
                      )}
                    </div>
                    <CardTitle className="text-base sm:text-lg">
                      {chap.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {chap.desc}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-xs text-navy-light pt-3 border-t border-surface-muted">
                      <span>{chap.lecons} leçons complètes</span>
                      <span className="font-semibold text-navy">
                        {chap.isFree ? "Accessible" : "700 FCFA / mois"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Niveaux Première et Seconde (en préparation) */
        <div className="rounded-2xl border border-dashed border-surface-muted bg-white p-12 text-center">
          <Icon name="calendrier" size={56} className="mx-auto mb-4" />
          <h3 className="text-lg font-bold text-navy">
            {selectedLevel === "1ere" ? "Programme de Première" : "Programme de Seconde"} en cours de rédaction
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-navy-light max-w-md mx-auto">
            Nos professeurs rédigent actuellement les contenus pour ces classes. La phase 1 est dédiée à la Terminale S2.
          </p>
          <div className="mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedLevel("tle")}
            >
              Revenir à la Terminale S2
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

