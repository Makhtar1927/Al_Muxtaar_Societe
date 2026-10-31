'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export type ActionResult<T = null> =
  | { success: true; data: T; message?: string }
  | { success: false; error: string };

// ─── Guard: require admin ─────────────────────────────────────────────────────

async function requireAdmin() {
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

  if (profile?.role !== 'admin') {
    throw new Error('Action réservée aux administrateurs');
  }

  return { supabase, user };
}

// ─── Toggle Ban Student ───────────────────────────────────────────────────────

export async function toggleBanStudentAction(
  studentId: string,
  isBanned: boolean,
  reason?: string,
): Promise<ActionResult> {
  let adminUser: { id: string };
  try {
    const auth = await requireAdmin();
    adminUser = auth.user;
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }

  const admin = createAdminClient();

  const { error } = await admin
    .from('profiles')
    .update({ is_banned: isBanned, updated_at: new Date().toISOString() })
    .eq('id', studentId);

  if (error) return { success: false, error: error.message };

  // Log in audit_logs
  await admin.from('audit_logs').insert({
    actor_id: adminUser.id,
    action: isBanned ? 'student.banned' : 'student.unbanned',
    target_type: 'profile',
    target_id: studentId,
    meta: { reason: reason ?? null },
  });

  revalidatePath('/admin/eleves');
  return {
    success: true,
    data: null,
    message: isBanned ? 'Élève suspendu avec succès.' : 'Suspension levée.',
  };
}

// ─── Update User Role ─────────────────────────────────────────────────────────

export async function updateUserRoleAction(
  userId: string,
  newRole: 'student' | 'editor' | 'admin',
): Promise<ActionResult> {
  let adminUser: { id: string };
  try {
    const auth = await requireAdmin();
    adminUser = auth.user;
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }

  const admin = createAdminClient();

  // Prevent admin from demoting themselves accidentally
  if (userId === adminUser.id && newRole !== 'admin') {
    return { success: false, error: 'Vous ne pouvez pas retirer vos propres droits administrateur.' };
  }

  const { error } = await admin
    .from('profiles')
    .update({ role: newRole, updated_at: new Date().toISOString() })
    .eq('id', userId);

  if (error) return { success: false, error: error.message };

  await admin.from('audit_logs').insert({
    actor_id: adminUser.id,
    action: 'user.role_changed',
    target_type: 'profile',
    target_id: userId,
    meta: { new_role: newRole },
  });

  revalidatePath('/admin/eleves');
  return { success: true, data: null, message: `Rôle mis à jour : ${newRole}.` };
}

// ─── Update Plan ──────────────────────────────────────────────────────────────

const UpdatePlanSchema = z.object({
  id: z.string().uuid(),
  price: z.coerce.number().int().min(100),
  name: z.string().min(2).max(100),
  description: z.string().optional(),
  is_active: z.coerce.boolean().default(true),
});

export async function updatePlanAction(formData: FormData): Promise<ActionResult> {
  let adminUser: { id: string };
  try {
    const auth = await requireAdmin();
    adminUser = auth.user;
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }

  const raw = {
    id: formData.get('id'),
    price: formData.get('price'),
    name: formData.get('name'),
    description: formData.get('description') ?? '',
    is_active: formData.get('is_active') === 'true',
  };

  const parsed = UpdatePlanSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message };
  }

  const admin = createAdminClient();
  const { id, price, name, description, is_active } = parsed.data;

  const { error } = await admin
    .from('plans')
    .update({
      price,
      name,
      description: description || null,
      is_active,
    })
    .eq('id', id);

  if (error) return { success: false, error: error.message };

  await admin.from('audit_logs').insert({
    actor_id: adminUser.id,
    action: 'plan.updated',
    target_type: 'plan',
    target_id: id,
    meta: { price, name, is_active },
  });

  revalidatePath('/admin/tarifs');
  revalidatePath('/abonnement');
  revalidatePath('/doc/tarifs');
  return { success: true, data: null, message: 'Tarif mis à jour avec succès.' };
}

