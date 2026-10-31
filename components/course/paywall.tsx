'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';

export default function Paywall() {
  return (
    <div className="py-12 px-4 max-w-xl mx-auto">
      <Card className="border-2 border-turquoise/30 shadow-lg text-center">
        <CardHeader className="space-y-3">
          <div className="mx-auto w-16 h-16 rounded-full bg-surface-muted/30 flex items-center justify-center">
            <Icon name="cadenas" size={44} />
          </div>
          <CardTitle className="text-2xl text-navy">Contenu réservé aux abonnés</CardTitle>
          <CardDescription className="text-base text-text/75">
            Cette leçon complète fait partie du programme officiel Terminale S2 d&apos;Al Muxtaar Doc.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-2xl bg-surface p-4 border border-navy/10 text-left space-y-2">
            <p className="font-semibold text-navy text-sm">Ce que comprend l&apos;abonnement :</p>
            <ul className="text-sm text-text/80 space-y-1.5 list-disc list-inside">
              <li>L&apos;intégralité des 11 chapitres de Mathématiques Tle S2</li>
              <li>Cours détaillés avec formules mathématiques KaTeX haute définition</li>
              <li>Exercices d&apos;application corrigés étape par étape</li>
              <li>Quiz d&apos;auto-évaluation avec corrections immédiates</li>
              <li>Accès illimité 24h/24 sur téléphone et ordinateur</li>
            </ul>
          </div>

          <div className="p-3 rounded-xl bg-turquoise/10 border border-turquoise/20">
            <p className="text-xs text-turquoise font-bold uppercase tracking-wide">Tarif solidaire</p>
            <p className="text-2xl font-bold text-navy mt-1">700 FCFA <span className="text-sm font-normal text-text/60">/ mois</span></p>
            <p className="text-xs text-text/60 mt-0.5">ou 2 000 FCFA pour 3 mois (Paiement Wave direct)</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/abonnement" className="flex-1">
              <Button variant="primary" className="w-full">
                S&apos;abonner maintenant
              </Button>
            </Link>
            <Link href="/doc/tarifs" className="flex-1">
              <Button variant="outline" className="w-full">
                Voir les tarifs
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
