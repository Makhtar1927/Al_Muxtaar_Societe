'use client';

import React, { useState } from 'react';
import MathRenderer from './math-renderer';
import { Button } from '@/components/ui/button';

interface ExerciseCardProps {
  index: number;
  statementMd: string;
  solutionMd: string;
  difficulty: number;
}

const DIFF_LABELS: Record<number, { label: string; class: string }> = {
  1: { label: '⭐ Niveau 1 — Application directe', class: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  2: { label: '⭐⭐ Niveau 2 — Entraînement', class: 'bg-gold/15 text-navy border-gold/30' },
  3: { label: '⭐⭐⭐ Niveau 3 — Approfondissement Bac', class: 'bg-coral/15 text-coral border-coral/30' },
};

export default function ExerciseCard({
  index,
  statementMd,
  solutionMd,
  difficulty,
}: ExerciseCardProps) {
  const [showSolution, setShowSolution] = useState(false);
  const diff = DIFF_LABELS[difficulty] ?? DIFF_LABELS[1];

  return (
    <div className="bg-white rounded-2xl border border-navy/10 overflow-hidden shadow-sm transition-all hover:border-turquoise/30">
      {/* Exercise header */}
      <div className="bg-surface px-5 py-3.5 border-b border-navy/10 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center">
            {index}
          </span>
          <span className="font-semibold text-navy text-sm">Exercice {index}</span>
        </div>
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium border ${diff.class}`}
        >
          {diff.label}
        </span>
      </div>

      {/* Statement */}
      <div className="p-5">
        <MathRenderer content={statementMd} />
      </div>

      {/* Solution toggle */}
      <div className="px-5 pb-5">
        <Button
          type="button"
          variant={showSolution ? 'outline' : 'secondary'}
          size="sm"
          onClick={() => setShowSolution((prev) => !prev)}
          className="text-xs font-semibold"
        >
          {showSolution ? '👁 Masquer la correction' : '💡 Afficher la correction'}
        </Button>

        {showSolution && (
          <div className="mt-4 pt-4 border-t border-navy/10 bg-surface/50 rounded-xl p-4 animate-in fade-in duration-200">
            <p className="text-xs font-bold text-turquoise uppercase tracking-wider mb-2">
              Correction détaillée
            </p>
            <MathRenderer content={solutionMd} />
          </div>
        )}
      </div>
    </div>
  );
}

