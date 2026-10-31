'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export type ActionResult<T = null> =
  | { success: true; data: T; message?: string }
  | { success: false; error: string };

export async function toggleLessonCompleteAction(
  lessonId: string,
  chapterId: string,
): Promise<ActionResult<{ completed: boolean }>> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false, error: 'Non authentifié' };

  // Check current progress
  const { data: existing } = await supabase
    .from('progress')
    .select('id, is_completed')
    .eq('student_id', user.id)
    .eq('lesson_id', lessonId)
    .maybeSingle();

  const isCompleted = existing?.is_completed ?? false;
  const nextCompleted = !isCompleted;

  if (existing) {
    const { error } = await supabase
      .from('progress')
      .update({
        is_completed: nextCompleted,
        completed_at: nextCompleted ? new Date().toISOString() : null,
      })
      .eq('id', existing.id);
    if (error) return { success: false, error: error.message };
  } else {
    const { error } = await supabase.from('progress').insert({
      student_id: user.id,
      lesson_id: lessonId,
      chapter_id: chapterId,
      is_completed: true,
      completed_at: new Date().toISOString(),
    });
    if (error) return { success: false, error: error.message };
  }

  revalidatePath('/cours');
  revalidatePath('/dashboard');
  return {
    success: true,
    data: { completed: nextCompleted },
    message: nextCompleted ? 'Leçon marquée comme terminée !' : 'Marquage retiré.',
  };
}

