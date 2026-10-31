import React from 'react';
import Link from 'next/link';
import TrigCircle from '@/components/interactive/trig-circle';
import FunctionGrapher from '@/components/interactive/function-grapher';

export const metadata = {
  title: 'Laboratoire Mathématique — Al Muxtaar Doc',
  description: 'Simulations et illustrations interactives du programme Terminale S2.',
};

export default function MathLabPage() {
  return (
    <main className="min-h-screen bg-surface py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <nav className="text-xs text-text/50 flex items-center gap-2">
          <Link href="/dashboard" className="hover:text-turquoise transition-colors">
            Tableau de bord
          </Link>
          <span>/</span>
          <Link href="/cours/terminale/s2/mathematiques" className="hover:text-turquoise transition-colors">
            Mathématiques Tle S2
          </Link>
          <span>/</span>
          <span className="text-navy font-semibold">Laboratoire Interactif</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-2xl border border-navy/10 p-6 shadow-sm">
          <span className="text-xs font-bold text-turquoise uppercase tracking-wider">
            Outils Visuels & Pédagogiques
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy mt-1">
            Laboratoire Mathématique Interactif
          </h1>
          <p className="text-sm text-text/75 mt-1.5 leading-relaxed">
            Manipulez les concepts clés du programme officiel sénégalais : cercle trigonométrique, limites, fonctions exponentielles, logarithmes et droites tangentes.
          </p>
        </div>

        {/* Widget 1: Trigonometric Circle */}
        <section className="space-y-3">
          <TrigCircle />
        </section>

        {/* Widget 2: Function Grapher & Tangent */}
        <section className="space-y-3">
          <FunctionGrapher />
        </section>

        {/* Practical Bac Tips Card */}
        <div className="bg-navy rounded-2xl p-6 text-white space-y-3 shadow-md">
          <h3 className="text-lg font-bold text-gold flex items-center gap-2">
            <span>💡</span> Conseil de révision pour le Baccalauréat S2
          </h3>
          <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
            Dans les épreuves du Bac Sénégal, l&apos;équation de la tangente au point d&apos;abscisse $x_0$ est systématiquement demandée sous la forme $y = f&apos;(x_0)(x - x_0) + f(x_0)$. N&apos;oubliez jamais de vérifier si la fonction est dérivable en ce point avant d&apos;appliquer la formule !
          </p>
          <div className="pt-2">
            <Link
              href="/cours/terminale/s2/mathematiques"
              className="inline-flex items-center text-xs font-bold text-turquoise hover:underline"
            >
              Retourner aux chapitres de cours →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

