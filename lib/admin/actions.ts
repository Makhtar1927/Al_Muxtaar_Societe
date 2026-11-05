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
      price_fcfa: price,
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

// ─── Test Error Logger Action ────────────────────────────────────────────────

export async function createTestErrorAction(
  message?: string,
  severity: 'critical' | 'error' | 'warning' = 'error'
): Promise<ActionResult> {
  let adminUser: { id: string };
  try {
    const auth = await requireAdmin();
    adminUser = auth.user;
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }

  const admin = createAdminClient();
  const testMsg =
    message?.trim() ||
    "Test d'exception simulée : Erreur de communication passerelle Wave (Code 502)";

  await admin.from('audit_logs').insert({
    actor_id: adminUser.id,
    action: `error.${severity}`,
    target_type: 'exception',
    meta: {
      message: testMsg,
      context: 'system_exception',
      severity,
      stack:
        'Error: Connection timeout at WaveAPI.verifyPayment (actions.ts:118)\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)',
      path: '/abonnement/wave-callback',
      timestamp: new Date().toISOString(),
    },
  });

  revalidatePath('/admin/journal');
  return {
    success: true,
    data: null,
    message: "Événement d'erreur de test enregistré avec succès !",
  };
}

// ─── Validate Student Registration & Activate Access ─────────────────────────

export async function validateStudentRegistrationAction(
  studentId: string,
  planId?: string,
  customDays?: number,
  notes?: string,
): Promise<ActionResult> {
  let adminUser: { id: string };
  try {
    const auth = await requireAdmin();
    adminUser = auth.user;
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }

  const admin = createAdminClient();

  // 1. Profil de l'élève
  const { data: student, error: studentError } = await admin
    .from('profiles')
    .select('id, first_name, last_name, phone, email')
    .eq('id', studentId)
    .single();

  if (studentError || !student) {
    return { success: false, error: 'Profil élève introuvable.' };
  }

  // 2. Détermination du Plan et de la durée
  let durationDays = customDays || 30;
  let selectedPlanId = planId;
  let planPrice = 700;
  let planName = 'Abonnement Mensuel';

  if (selectedPlanId) {
    const { data: plan } = await admin
      .from('plans')
      .select('id, name, duration_days, price_fcfa')
      .eq('id', selectedPlanId)
      .single();
    if (plan) {
      durationDays = plan.duration_days || customDays || 30;
      planPrice = plan.price_fcfa || 700;
      planName = plan.name || planName;
    }
  } else {
    // Premier plan actif par défaut
    const { data: defaultPlan } = await admin
      .from('plans')
      .select('id, name, duration_days, price_fcfa')
      .eq('is_active', true)
      .order('price_fcfa', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (defaultPlan) {
      selectedPlanId = defaultPlan.id;
      durationDays = defaultPlan.duration_days || 30;
      planPrice = defaultPlan.price_fcfa || 700;
      planName = defaultPlan.name;
    }
  }

  const startDate = new Date();
  const endDate = new Date(startDate.getTime() + durationDays * 24 * 60 * 60 * 1000);

  // 3. Vérification souscription existante
  const { data: existingSub } = await admin
    .from('subscriptions')
    .select('id, status, plan_id')
    .eq('user_id', studentId)
    .in('status', ['pending', 'active'])
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  let subscriptionId: string;

  if (existingSub) {
    subscriptionId = existingSub.id;
    const { error: updateSubErr } = await admin
      .from('subscriptions')
      .update({
        plan_id: selectedPlanId || existingSub.plan_id,
        status: 'active',
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        activated_by: adminUser.id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', subscriptionId);

    if (updateSubErr) {
      return { success: false, error: "Erreur lors de l'activation : " + updateSubErr.message };
    }

    // Valider tout paiement en attente lié
    await admin
      .from('payments')
      .update({
        status: 'confirmed',
        reviewed_by: adminUser.id,
        reviewed_at: new Date().toISOString(),
        notes: notes || "Inscription et accès validés manuellement par l'administrateur",
      })
      .eq('subscription_id', subscriptionId)
      .eq('status', 'pending');
  } else {
    if (!selectedPlanId) {
      return { success: false, error: 'Aucune formule d’abonnement active configurée.' };
    }

    const { data: newSub, error: insertSubErr } = await admin
      .from('subscriptions')
      .insert({
        user_id: studentId,
        plan_id: selectedPlanId,
        status: 'active',
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        activated_by: adminUser.id,
      })
      .select('id')
      .single();

    if (insertSubErr || !newSub) {
      return { success: false, error: "Erreur création abonnement : " + (insertSubErr?.message || '') };
    }

    subscriptionId = newSub.id;

    // Enregistrement de paiement d'activation
    const studentFullName = `${student.first_name || ''} ${student.last_name || ''}`.trim() || 'Élève';
    await admin.from('payments').insert({
      subscription_id: subscriptionId,
      student_id: studentId,
      plan_id: selectedPlanId,
      amount: planPrice,
      provider: 'other',
      transaction_code: `VAL-ADMIN-${Date.now().toString(36).toUpperCase()}`,
      status: 'confirmed',
      notes: notes || `Inscription validée manuellement pour ${studentFullName}`,
      reviewed_by: adminUser.id,
      reviewed_at: new Date().toISOString(),
    });
  }

  // 4. Journal d'audit
  await admin.from('audit_logs').insert({
    actor_id: adminUser.id,
    action: 'student.registration_validated',
    target_type: 'profile',
    target_id: studentId,
    meta: {
      subscription_id: subscriptionId,
      duration_days: durationDays,
      plan_name: planName,
      end_date: endDate.toISOString(),
      notes: notes || null,
    },
  });

  // 5. Notification à l'élève
  try {
    await admin.from('notifications').insert({
      user_id: studentId,
      type: 'subscription_activated',
      title: 'Inscription et Accès Validés !',
      body: `Félicitations ! Votre inscription a été validée par l'administration. Votre accès complet est actif jusqu'au ${endDate.toLocaleDateString('fr-FR')}.`,
      meta: { subscription_id: subscriptionId },
    });
  } catch (notifErr) {
    console.warn('Erreur notification élève:', notifErr);
  }

  revalidatePath('/admin/eleves');
  revalidatePath('/admin/abonnements');
  revalidatePath('/admin');
  revalidatePath('/dashboard');
  revalidatePath('/cours');
  revalidatePath('/abonnement');

  return {
    success: true,
    data: null,
    message: `Inscription validée ! Accès complet activé (${durationDays} jours).`,
  };
}

// ─── Extend Student Access (from Admin Élèves) ───────────────────────────────

export async function extendStudentAccessFromElevesAction(
  studentId: string,
  days: number = 30,
): Promise<ActionResult> {
  let adminUser: { id: string };
  try {
    const auth = await requireAdmin();
    adminUser = auth.user;
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }

  const admin = createAdminClient();

  const { data: sub } = await admin
    .from('subscriptions')
    .select('id, end_date, user_id, status')
    .eq('user_id', studentId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!sub) {
    return validateStudentRegistrationAction(studentId, undefined, days, 'Prolongation/Activation directe');
  }

  const currentEnd = sub.end_date && new Date(sub.end_date) > new Date()
    ? new Date(sub.end_date)
    : new Date();
  const newEndDate = new Date(currentEnd.getTime() + days * 24 * 60 * 60 * 1000);

  const { error } = await admin
    .from('subscriptions')
    .update({
      end_date: newEndDate.toISOString(),
      status: 'active',
      updated_at: new Date().toISOString(),
    })
    .eq('id', sub.id);

  if (error) return { success: false, error: 'Erreur lors de la prolongation : ' + error.message };

  await admin.from('audit_logs').insert({
    actor_id: adminUser.id,
    action: 'subscription.extended',
    target_type: 'subscription',
    target_id: sub.id,
    meta: { days, new_end_date: newEndDate.toISOString(), user_id: studentId },
  });

  try {
    await admin.from('notifications').insert({
      user_id: studentId,
      type: 'subscription_activated',
      title: 'Abonnement prolongé',
      body: `Votre abonnement a été prolongé de ${days} jours jusqu'au ${newEndDate.toLocaleDateString('fr-FR')}.`,
      meta: { subscription_id: sub.id },
    });
  } catch (notifErr) {
    console.warn('Erreur notification prolongation:', notifErr);
  }

  revalidatePath('/admin/eleves');
  revalidatePath('/admin/abonnements');
  revalidatePath('/dashboard');
  revalidatePath('/cours');

  return {
    success: true,
    data: null,
    message: `Abonnement prolongé de ${days} jours (fin : ${newEndDate.toLocaleDateString('fr-FR')}).`,
  };
}

// ─── Suspend Student Access ──────────────────────────────────────────────────

export async function suspendStudentAccessAction(
  studentId: string,
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
    .from('subscriptions')
    .update({
      status: 'suspended',
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', studentId)
    .eq('status', 'active');

  if (error) return { success: false, error: error.message };

  await admin.from('audit_logs').insert({
    actor_id: adminUser.id,
    action: 'subscription.suspended',
    target_type: 'profile',
    target_id: studentId,
    meta: { reason: reason || 'Suspension manuelle par admin' },
  });

  revalidatePath('/admin/eleves');
  revalidatePath('/admin/abonnements');
  revalidatePath('/dashboard');
  revalidatePath('/cours');

  return { success: true, data: null, message: 'Accès abonnement suspendu avec succès.' };
}



