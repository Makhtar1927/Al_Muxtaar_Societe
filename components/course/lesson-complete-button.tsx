'use client';

import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { toggleLessonCompleteAction } from '@/lib/progress/actions';

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
    startTransition(async () => {
      const res = await toggleLessonCompleteAction(lessonId, chapterId);
      if (res.success) {
        setCompleted(res.data.completed);
        showToast(res.message ?? 'Progression mise à jour', 'success');
      } else {
        showToast(res.error, 'error');
      }
    });
  }

  return (
    <Button
      type="button"
      variant={completed ? 'secondary' : 'primary'}
      onClick={handleToggle}
      disabled={isPending}
      className="flex items-center gap-2"
    >
      <span>{completed ? '✓ Leçon terminée' : 'Marquer comme terminée'}</span>
    </Button>
  );
}

