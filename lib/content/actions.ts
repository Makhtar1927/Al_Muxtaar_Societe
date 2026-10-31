'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

// ─── Types ───────────────────────────────────────────────────────────────────

export type ActionResult<T = null> =
  | { success: true; data: T; message?: string }
  | { success: false; error: string };

// ─── Guards ──────────────────────────────────────────────────────────────────

async function requireEditor() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Non authentifié');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || !['admin', 'editor'].includes(profile.role)) {
    throw new Error('Accès refusé');
  }
  return { supabase, user, role: profile.role };
}

// ─── Schemas ─────────────────────────────────────────────────────────────────

const ChapterSchema = z.object({
  title: z.string().min(2).max(200).trim(),
  subject_id: z.string().uuid(),
  sort_order: z.coerce.number().int().min(0).default(0),
  status: z.enum(['draft', 'published']).default('draft'),
});

const LessonSchema = z.object({
  chapter_id: z.string().uuid(),
  title: z.string().min(2).max(200).trim(),
  content_md: z.string().min(1, 'Le contenu ne peut pas être vide'),
  sort_order: z.coerce.number().int().min(0).default(0),
  is_free_preview: z.coerce.boolean().default(false),
  status: z.enum(['draft', 'published']).default('draft'),
});

const ExerciseSchema = z.object({
  lesson_id: z.string().uuid(),
  statement_md: z.string().min(1),
  solution_md: z.string().min(1),
  difficulty: z.coerce.number().int().min(1).max(3).default(1),
  sort_order: z.coerce.number().int().min(0).default(0),
});

const QuizQuestionSchema = z.object({
  quiz_id: z.string().uuid(),
  question_md: z.string().min(1),
  sort_order: z.coerce.number().int().min(0).default(0),
});

const QuizAnswerSchema = z.object({
  question_id: z.string().uuid(),
  answer_text: z.string().min(1),
  is_correct: z.coerce.boolean().default(false),
  explanation_md: z.string().optional(),
});

// ─── Chapter actions ──────────────────────────────────────────────────────────

export async function upsertChapterAction(formData: FormData): Promise<ActionResult> {
  try {
    await requireEditor();
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
  const admin = createAdminClient();

  const id = formData.get('id') as string | null;
  const raw = {
    title: formData.get('title'),
    subject_id: formData.get('subject_id'),
    sort_order: formData.get('sort_order'),
    status: formData.get('status'),
  };

  const parsed = ChapterSchema.safeParse(raw);
  if (!parsed.success) return { success: false, error: parsed.error.errors[0].message };

  const payload = { ...parsed.data, updated_at: new Date().toISOString() };

  const { error } = id
    ? await admin.from('chapters').update(payload).eq('id', id)
    : await admin.from('chapters').insert({ ...payload, id: undefined });

  if (error) return { success: false, error: error.message };

  revalidatePath('/admin/contenu');
  return { success: true, data: null };
}

export async function deleteChapterAction(id: string): Promise<ActionResult> {
  try {
    await requireEditor();
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
  const admin = createAdminClient();
  const { error } = await admin.from('chapters').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/contenu');
  return { success: true, data: null };
}

// ─── Lesson actions ───────────────────────────────────────────────────────────

export async function upsertLessonAction(formData: FormData): Promise<ActionResult> {
  try {
    await requireEditor();
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
  const admin = createAdminClient();

  const id = formData.get('id') as string | null;
  const raw = {
    chapter_id: formData.get('chapter_id'),
    title: formData.get('title'),
    content_md: formData.get('content_md'),
    sort_order: formData.get('sort_order'),
    is_free_preview: formData.get('is_free_preview') === 'true',
    status: formData.get('status'),
  };

  const parsed = LessonSchema.safeParse(raw);
  if (!parsed.success) return { success: false, error: parsed.error.errors[0].message };

  const payload = { ...parsed.data, updated_at: new Date().toISOString() };

  const { error } = id
    ? await admin.from('lessons').update(payload).eq('id', id)
    : await admin.from('lessons').insert({ ...payload, id: undefined });

  if (error) return { success: false, error: error.message };

  revalidatePath('/admin/contenu');
  return { success: true, data: null };
}

export async function deleteLessonAction(id: string): Promise<ActionResult> {
  try {
    await requireEditor();
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
  const admin = createAdminClient();
  const { error } = await admin.from('lessons').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/contenu');
  return { success: true, data: null };
}

// ─── Exercise actions ─────────────────────────────────────────────────────────

export async function upsertExerciseAction(formData: FormData): Promise<ActionResult> {
  try {
    await requireEditor();
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
  const admin = createAdminClient();

  const id = formData.get('id') as string | null;
  const raw = {
    lesson_id: formData.get('lesson_id'),
    statement_md: formData.get('statement_md'),
    solution_md: formData.get('solution_md'),
    difficulty: formData.get('difficulty'),
    sort_order: formData.get('sort_order'),
  };

  const parsed = ExerciseSchema.safeParse(raw);
  if (!parsed.success) return { success: false, error: parsed.error.errors[0].message };

  const { error } = id
    ? await admin.from('exercises').update(parsed.data).eq('id', id)
    : await admin.from('exercises').insert({ ...parsed.data, id: undefined });

  if (error) return { success: false, error: error.message };

  revalidatePath('/admin/contenu');
  return { success: true, data: null };
}

export async function deleteExerciseAction(id: string): Promise<ActionResult> {
  try {
    await requireEditor();
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
  const admin = createAdminClient();
  const { error } = await admin.from('exercises').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/contenu');
  return { success: true, data: null };
}

// ─── Quiz actions ─────────────────────────────────────────────────────────────

export async function upsertQuizQuestionAction(formData: FormData): Promise<ActionResult> {
  try {
    await requireEditor();
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
  const admin = createAdminClient();

  const id = formData.get('id') as string | null;
  const raw = {
    quiz_id: formData.get('quiz_id'),
    question_md: formData.get('question_md'),
    sort_order: formData.get('sort_order'),
  };

  const parsed = QuizQuestionSchema.safeParse(raw);
  if (!parsed.success) return { success: false, error: parsed.error.errors[0].message };

  const { error } = id
    ? await admin.from('quiz_questions').update(parsed.data).eq('id', id)
    : await admin.from('quiz_questions').insert({ ...parsed.data, id: undefined });

  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/contenu');
  return { success: true, data: null };
}

export async function upsertQuizAnswerAction(formData: FormData): Promise<ActionResult> {
  try {
    await requireEditor();
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
  const admin = createAdminClient();

  const id = formData.get('id') as string | null;
  const raw = {
    question_id: formData.get('question_id'),
    answer_text: formData.get('answer_text'),
    is_correct: formData.get('is_correct') === 'true',
    explanation_md: formData.get('explanation_md') ?? undefined,
  };

  const parsed = QuizAnswerSchema.safeParse(raw);
  if (!parsed.success) return { success: false, error: parsed.error.errors[0].message };

  const { error } = id
    ? await admin.from('quiz_answers').update(parsed.data).eq('id', id)
    : await admin.from('quiz_answers').insert({ ...parsed.data, id: undefined });

  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/contenu');
  return { success: true, data: null };
}

// ─── Image upload ─────────────────────────────────────────────────────────────

export async function uploadContentImageAction(formData: FormData): Promise<ActionResult<{ path: string; url: string }>> {
  let uploaderId: string;
  try {
    const { user } = await requireEditor();
    uploaderId = user.id;
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }

  const admin = createAdminClient();
  const file = formData.get('file') as File | null;

  if (!file || file.size === 0) return { success: false, error: 'Aucun fichier fourni' };
  if (file.size > 10 * 1024 * 1024) return { success: false, error: 'Fichier trop lourd (max 10 Mo)' };

  const ext = file.name.split('.').pop() ?? 'png';
  const path = `lessons/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error: uploadErr } = await admin.storage
    .from('content')
    .upload(path, file, { upsert: false });

  if (uploadErr) return { success: false, error: uploadErr.message };

  // Track in media_files table
  await admin.from('media_files').insert({
    uploader_id: uploaderId,
    bucket: 'content',
    path,
    mime_type: file.type,
    size_bytes: file.size,
  });

  const { data: urlData } = admin.storage.from('content').getPublicUrl(path);

  return { success: true, data: { path, url: urlData.publicUrl } };
}

// ─── Reorder helpers ──────────────────────────────────────────────────────────

export async function reorderChaptersAction(orders: { id: string; sort_order: number }[]): Promise<ActionResult> {
  try {
    await requireEditor();
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
  const admin = createAdminClient();

  await Promise.all(
    orders.map(({ id, sort_order }) =>
      admin.from('chapters').update({ sort_order }).eq('id', id),
    ),
  );

  revalidatePath('/admin/contenu');
  return { success: true, data: null };
}

export async function reorderLessonsAction(orders: { id: string; sort_order: number }[]): Promise<ActionResult> {
  try {
    await requireEditor();
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
  const admin = createAdminClient();

  await Promise.all(
    orders.map(({ id, sort_order }) =>
      admin.from('lessons').update({ sort_order }).eq('id', id),
    ),
  );

  revalidatePath('/admin/contenu');
  return { success: true, data: null };
}

