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

  if (!user) return { success: false, error: 'Veuillez vous connecter pour enregistrer votre progression.' };

  try {
    // Check current progress
    const { data: existing, error: fetchErr } = await supabase
      .from('progress')
      .select('id, is_completed')
      .eq('user_id', user.id)
      .eq('lesson_id', lessonId)
      .maybeSingle();

    if (fetchErr) {
      console.warn('Error fetching progress:', fetchErr);
    }

    const isCompleted = existing?.is_completed ?? false;
    const nextCompleted = !isCompleted;

    if (existing) {
      // NOTE: La table progress contient last_read_at (et non updated_at)
      const { error } = await supabase
        .from('progress')
        .update({
          is_completed: nextCompleted,
          last_read_at: new Date().toISOString(),
        })
        .eq('id', existing.id);

      if (error) {
        console.error('Update progress error:', error);
        return { success: false, error: 'Impossible de mettre à jour la leçon. Veuillez réessayer.' };
      }
    } else {
      const { error } = await supabase.from('progress').insert({
        user_id: user.id,
        lesson_id: lessonId,
        is_completed: true,
        last_read_at: new Date().toISOString(),
      });

      if (error) {
        console.error('Insert progress error:', error);
        return { success: false, error: 'Impossible d\'enregistrer la leçon. Veuillez réessayer.' };
      }
    }

    revalidatePath('/cours');
    revalidatePath('/dashboard');

    return {
      success: true,
      data: { completed: nextCompleted },
      message: nextCompleted
        ? '✓ Leçon validée ! Enregistrée dans votre progression Bac S2.'
        : 'Leçon marquée comme non terminée.',
    };
  } catch (err: any) {
    console.error('Toggle lesson exception:', err);
    return { success: false, error: 'Une erreur est survenue lors de l\'enregistrement.' };
  }
}
