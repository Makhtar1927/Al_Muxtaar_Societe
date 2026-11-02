'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { WaveLogo } from '@/components/ui/icons/wave-logo';

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
            Seule la première leçon de chaque matière est en libre accès. Cette leçon fait partie du programme complet réservé aux abonnés.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-2xl bg-surface p-4 border border-navy/10 text-left space-y-2">
            <p className="font-semibold text-navy text-sm">Ce que comprend votre abonnement :</p>
            <ul className="text-sm text-text/80 space-y-1.5 list-disc list-inside">
              <li>L&apos;intégralité des 13 chapitres de Mathématiques Tle S2 débloqués</li>
              <li>Toutes les fiches réflexes types et simulateurs interactifs</li>
              <li>Exercices d&apos;application corrigés étape par étape</li>
              <li>Quiz d&apos;auto-évaluation avec corrections immédiates</li>
              <li>Accès immédiat à toutes les nouvelles leçons publiées</li>
              <li>Accès illimité 24h/24 sur téléphone et ordinateur</li>
            </ul>
          </div>

          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-turquoise/10 via-white to-[#1DC3EC]/10 border border-[#1DC3EC]/30 flex items-center justify-between gap-3 text-left">
            <div>
              <p className="text-[11px] text-[#0284C7] font-black uppercase tracking-wider">Tarif Solidaire Officiel</p>
              <p className="text-xl sm:text-2xl font-black text-navy mt-0.5">
                700 FCFA <span className="text-xs font-normal text-text/60">/ mois</span>
              </p>
              <p className="text-[11px] text-text/60 mt-0.5">ou 2 000 FCFA pour 3 mois (Paiement Wave direct)</p>
            </div>
            <WaveLogo size={36} />
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
