'use client';

import React, { useState, useTransition } from 'react';
import { useToast } from '@/components/ui/toast';
import { toggleLessonCompleteAction } from '@/lib/progress/actions';
import StudyIcon from '@/components/ui/study-icon';

interface LessonCompleteButtonProps {
  lessonId: string;
  chapterId: string;
  initialCompleted: boolean;
}

export default function LessonCompleteButton({
  lessonId,
  chapterId,
  initialCompleted,
}: LessonCompleteButtonProps) {
  const { showToast } = useToast();
  const [completed, setCompleted] = useState(initialCompleted);
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    if (completed) {
      showToast(
        'Cette leçon est déjà terminée et validée dans votre progression Bac S2.',
        'info',
        'Leçon terminée ✓'
      );
      return;
    }

    startTransition(async () => {
      const res = await toggleLessonCompleteAction(lessonId, chapterId);
      if (res.success) {
        setCompleted(true);
        showToast(
          'Félicitations ! Cette leçon est validée dans votre tableau de bord.',
          'success',
          'Leçon terminée ✓'
        );
      } else {
        showToast(res.error, 'error', 'Erreur d\'enregistrement');
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className={`inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 border shadow-sm active:scale-95 ${
        completed
          ? 'bg-emerald-50 border-emerald-400/80 text-emerald-900 hover:bg-emerald-100/70'
          : 'bg-navy hover:bg-[#0B6477] border-transparent text-white'
      } ${isPending ? 'opacity-60 cursor-wait' : ''}`}
    >
      <StudyIcon
        name={completed ? 'correct' : 'diplome_bac'}
        size={18}
        className="shrink-0"
      />
      <span>{completed ? '✓ Leçon terminée' : 'Marquer comme terminée'}</span>
    </button>
  );
}
