'use client';

import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { upsertExerciseAction, deleteExerciseAction } from '@/lib/content/actions';

interface Lesson   { id: string; title: string }
interface Exercise { id: string; lesson_id: string; statement_md: string; solution_md: string; difficulty: number; sort_order: number }

interface Props {
  lesson:    Lesson;
  exercises: Exercise[];
  onBack:    () => void;
}

const DIFF_OPTIONS = [
  { value: 1, label: '⭐ Facile' },
  { value: 2, label: '⭐⭐ Moyen' },
  { value: 3, label: '⭐⭐⭐ Difficile' },
];

function ExerciseForm({
  exercise,
  lessonId,
  sortOrder,
  onSaved,
  onCancel,
}: {
  exercise?: Exercise;
  lessonId: string;
  sortOrder: number;
  onSaved: () => void;
  onCancel: () => void;
}) {
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [statement, setStatement] = useState(exercise?.statement_md ?? '');
  const [solution, setSolution] = useState(exercise?.solution_md ?? '');
  const [difficulty, setDifficulty] = useState(exercise?.difficulty ?? 1);

  function handleSave() {
    if (!statement.trim()) { showToast('L\'énoncé est obligatoire', 'error'); return; }
    if (!solution.trim()) { showToast('La solution est obligatoire', 'error'); return; }
    const fd = new FormData();
    if (exercise?.id) fd.append('id', exercise.id);
    fd.append('lesson_id', lessonId);
    fd.append('statement_md', statement);
    fd.append('solution_md', solution);
    fd.append('difficulty', String(difficulty));
    fd.append('sort_order', String(exercise?.sort_order ?? sortOrder));

    startTransition(async () => {
      const res = await upsertExerciseAction(fd);
      if (res.success) { showToast('Exercice enregistré', 'success'); onSaved(); }
      else showToast(res.error ?? 'Erreur lors de l\'enregistrement', 'error');
    });
  }

  return (
    <div className="bg-white rounded-2xl border border-navy/10 p-4 space-y-3">
      <p className="text-sm font-semibold text-navy">
        {exercise ? 'Modifier l\'exercice' : 'Nouvel exercice'}
      </p>
      <div>
        <label className="block text-xs font-medium text-text/50 mb-1">
          Difficulté
        </label>
        <div className="flex gap-2">
          {DIFF_OPTIONS.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => setDifficulty(d.value)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                difficulty === d.value
                  ? 'bg-navy text-white'
                  : 'bg-navy/5 text-text/70 hover:bg-navy/10'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-text/50 mb-1">
          Énoncé (Markdown + LaTeX)
        </label>
        <textarea
          value={statement}
          onChange={(e) => setStatement(e.target.value)}
          rows={5}
          placeholder="Soit $f$ une fonction dérivable sur $\mathbb{R}$…"
          className="w-full rounded-xl border border-navy/20 bg-surface px-3 py-2 text-sm text-text font-mono placeholder:text-text/30 focus:outline-none focus:ring-2 focus:ring-turquoise/40 resize-y"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-text/50 mb-1">
          Solution (Markdown + LaTeX)
        </label>
        <textarea
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          rows={5}
          placeholder="**Correction :**\n\nOn pose…"
          className="w-full rounded-xl border border-navy/20 bg-surface px-3 py-2 text-sm text-text font-mono placeholder:text-text/30 focus:outline-none focus:ring-2 focus:ring-turquoise/40 resize-y"
        />
      </div>
      <div className="flex gap-2">
        <Button variant="primary" onClick={handleSave} disabled={isPending} className="flex-1">
          {isPending ? 'Enregistrement…' : 'Enregistrer'}
        </Button>
        <Button variant="outline" onClick={onCancel}>Annuler</Button>
      </div>
    </div>
  );
}

export default function ExerciseEditor({ lesson, exercises: initExercises, onBack }: Props) {
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [exercises, setExercises] = useState(initExercises);
  const [editingEx, setEditingEx] = useState<Exercise | null | 'new'>(null);

  function handleSaved() {
    setEditingEx(null);
    // Reload will happen on next page visit due to revalidatePath
  }

  function handleDelete(id: string) {
    if (!confirm('Supprimer cet exercice ?')) return;
    startTransition(async () => {
      const res = await deleteExerciseAction(id);
      if (res.success) {
        setExercises((prev) => prev.filter((e) => e.id !== id));
        showToast('Exercice supprimé', 'success');
      } else {
        showToast(res.error ?? 'Erreur lors de la suppression', 'error');
      }
    });
  }

  const DIFF_LABELS: Record<number, string> = { 1: '⭐ Facile', 2: '⭐⭐ Moyen', 3: '⭐⭐⭐ Difficile' };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 flex-wrap">
        <button onClick={onBack} className="text-sm text-turquoise hover:underline">
          ← Retour aux chapitres
        </button>
        <span className="text-text/30">/</span>
        <h2 className="text-lg font-bold text-navy">
          Exercices — <span className="font-normal">{lesson.title}</span>
        </h2>
        <Button variant="primary" onClick={() => setEditingEx('new')} className="ml-auto">
          + Nouvel exercice
        </Button>
      </div>

      {/* New exercise form */}
      {editingEx === 'new' && (
        <ExerciseForm
          lessonId={lesson.id}
          sortOrder={exercises.length}
          onSaved={handleSaved}
          onCancel={() => setEditingEx(null)}
        />
      )}

      {/* Exercise list */}
      {exercises.length === 0 && editingEx !== 'new' && (
        <p className="text-center text-text/50 py-12 bg-white rounded-2xl border border-navy/10">
          Aucun exercice pour cette leçon.
        </p>
      )}

      {exercises.map((ex, idx) => (
        <div key={ex.id}>
          {editingEx && typeof editingEx === 'object' && editingEx.id === ex.id ? (
            <ExerciseForm
              exercise={ex}
              lessonId={lesson.id}
              sortOrder={idx}
              onSaved={handleSaved}
              onCancel={() => setEditingEx(null)}
            />
          ) : (
            <div className="bg-white rounded-2xl border border-navy/10 p-4">
              <div className="flex items-start gap-3">
                <span className="text-xs bg-navy/5 text-text/60 rounded-full px-2 py-1 whitespace-nowrap mt-0.5">
                  {DIFF_LABELS[ex.difficulty]}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text font-mono whitespace-pre-wrap line-clamp-3">
                    {ex.statement_md}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setEditingEx(ex)}
                    className="text-xs text-turquoise hover:underline"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(ex.id)}
                    className="text-xs text-coral hover:underline"
                    disabled={isPending}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

