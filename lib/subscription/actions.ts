'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createClient as createServerClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

// ─── Schemas ─────────────────────────────────────────────────────────────────

const RequestSubscriptionSchema = z.object({
  plan_id: z.string().uuid('Plan invalide'),
  provider: z.enum(['wave', 'orange_money', 'free_money', 'other'], {
    errorMap: () => ({ message: 'Opérateur invalide' }),
  }),
  transaction_code: z
    .string()
    .min(4, 'Code de transaction trop court')
    .max(100, 'Code de transaction trop long')
    .trim(),
});

const ReviewSubscriptionSchema = z.object({
  subscription_id: z.string().uuid(),
  action: z.enum(['activate', 'reject', 'suspend']),
  notes: z.string().max(500).optional(),
});

// ─── Types ───────────────────────────────────────────────────────────────────

export type ActionResult<T = null> =
  | { success: true; data: T; message?: string }
  | { success: false; error: string };

// ─── requestSubscriptionAction ────────────────────────────────────────────────

export async function requestSubscriptionAction(
  formData: FormData,
): Promise<ActionResult> {
  const supabase = createServerClient();

  // Auth check
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Non authentifié' };

  // Parse + validate
  const raw = {
    plan_id: formData.get('plan_id'),
    provider: formData.get('provider'),
    transaction_code: formData.get('transaction_code'),
  };

  const parsed = RequestSubscriptionSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.errors[0];
    return { success: false, error: first.message };
  }
  const { plan_id, provider, transaction_code } = parsed.data;

  // Fetch plan
  const { data: plan, error: planErr } = await supabase
    .from('plans')
    .select('id, duration_months, price')
    .eq('id', plan_id)
    .single();
  if (planErr || !plan) return { success: false, error: 'Plan introuvable' };

  // Check for existing active/pending subscription
  const { data: existing } = await supabase
    .from('subscriptions')
    .select('id, status')
    .eq('student_id', user.id)
    .in('status', ['active', 'pending'])
    .maybeSingle();

  if (existing?.status === 'active') {
    return {
      success: false,
      error: 'Tu as déjà un abonnement actif.',
    };
  }
  if (existing?.status === 'pending') {
    return {
      success: false,
      error: 'Une demande est déjà en cours de traitement.',
    };
  }

  // Handle proof image upload if provided (optional)
  let proof_image_url: string | null = null;
  const proofFile = formData.get('proof_image') as File | null;
  if (proofFile && proofFile.size > 0) {
    if (proofFile.size > 5 * 1024 * 1024) {
      return { success: false, error: 'Image trop lourde (max 5 Mo)' };
    }
    const ext = proofFile.name.split('.').pop() ?? 'jpg';
    const path = `proofs/${user.id}/${Date.now()}.${ext}`;
    const { error: uploadErr } = await supabase.storage
      .from('payments')
      .upload(path, proofFile, { upsert: false });
    if (uploadErr) {
      return { success: false, error: "Erreur lors de l'envoi de l'image" };
    }
    proof_image_url = path;
  }

  // Create subscription (pending)
  const starts_at = new Date().toISOString();
  const ends_at = new Date();
  ends_at.setMonth(ends_at.getMonth() + plan.duration_months);

  const { data: sub, error: subErr } = await supabase
    .from('subscriptions')
    .insert({
      student_id: user.id,
      plan_id,
      status: 'pending',
      starts_at,
      ends_at: ends_at.toISOString(),
    })
    .select('id')
    .single();

  if (subErr || !sub) {
    return { success: false, error: "Erreur lors de la création de l'abonnement" };
  }

  // Create payment record
  const { error: payErr } = await supabase.from('payments').insert({
    subscription_id: sub.id,
    student_id: user.id,
    plan_id,
    amount: plan.price,
    provider,
    transaction_code,
    proof_image_url,
    status: 'pending',
  });

  if (payErr) {
    return { success: false, error: 'Erreur lors de la soumission du paiement' };
  }

  // Notify admin (via notification for admin users — simplified)
  // In production, trigger webhook or edge function
  revalidatePath('/abonnement');
  return {
    success: true,
    data: null,
    message: 'Demande envoyée ! L\'admin va vérifier ton paiement sous 24h.',
  };
}

// ─── activateSubscriptionAction (admin) ──────────────────────────────────────

export async function activateSubscriptionAction(
  formData: FormData,
): Promise<ActionResult> {
  const supabase = createServerClient();
  const admin = createAdminClient();

  // Auth + role check
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Non authentifié' };

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  if (profile?.role !== 'admin') return { success: false, error: 'Accès refusé' };

  const parsed = ReviewSubscriptionSchema.safeParse({
    subscription_id: formData.get('subscription_id'),
    action: formData.get('action'),
    notes: formData.get('notes'),
  });
  if (!parsed.success) return { success: false, error: 'Données invalides' };

  const { subscription_id, action, notes } = parsed.data;

  // Fetch subscription
  const { data: sub } = await admin
    .from('subscriptions')
    .select('id, student_id, plan_id, ends_at')
    .eq('id', subscription_id)
    .single();
  if (!sub) return { success: false, error: 'Abonnement introuvable' };

  let newStatus: string;
  let auditAction: string;

  switch (action) {
    case 'activate':
      newStatus = 'active';
      auditAction = 'subscription.activated';
      break;
    case 'reject':
      newStatus = 'rejected';
      auditAction = 'subscription.rejected';
      break;
    case 'suspend':
      newStatus = 'suspended';
      auditAction = 'subscription.suspended';
      break;
    default:
      return { success: false, error: 'Action invalide' };
  }

  // Update subscription
  const { error: updateErr } = await admin
    .from('subscriptions')
    .update({ status: newStatus })
    .eq('id', subscription_id);
  if (updateErr) return { success: false, error: 'Erreur mise à jour abonnement' };

  // Update payment status
  await admin
    .from('payments')
    .update({
      status: action === 'activate' ? 'confirmed' : 'rejected',
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString(),
      notes: notes ?? null,
    })
    .eq('subscription_id', subscription_id)
    .eq('status', 'pending');

  // Audit log
  await admin.from('audit_logs').insert({
    actor_id: user.id,
    action: auditAction,
    target_type: 'subscription',
    target_id: subscription_id,
    meta: { notes, student_id: sub.student_id },
  });

  // Notification to student
  const notifBody =
    action === 'activate'
      ? 'Ton abonnement a été activé. Bonne étude !'
      : action === 'reject'
      ? 'Ta demande a été rejetée. Contacte le support si besoin.'
      : 'Ton abonnement a été suspendu. Contacte le support.';

  await admin.from('notifications').insert({
    user_id: sub.student_id,
    type:
      action === 'activate'
        ? 'subscription_activated'
        : action === 'reject'
        ? 'subscription_rejected'
        : 'subscription_suspended',
    title:
      action === 'activate'
        ? 'Abonnement activé ✅'
        : action === 'reject'
        ? 'Demande rejetée ❌'
        : 'Abonnement suspendu ⚠️',
    body: notifBody,
    meta: { subscription_id, plan_id: sub.plan_id },
  });

  revalidatePath('/admin/abonnements');
  return { success: true, data: null, message: 'Action effectuée avec succès.' };
}

// ─── extendSubscriptionAction (admin) ────────────────────────────────────────

export async function extendSubscriptionAction(
  formData: FormData,
): Promise<ActionResult> {
  const supabase = createServerClient();
  const admin = createAdminClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Non authentifié' };

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  if (profile?.role !== 'admin') return { success: false, error: 'Accès refusé' };

  const subscription_id = formData.get('subscription_id') as string;
  const months = parseInt(formData.get('months') as string, 10);

  if (!subscription_id || isNaN(months) || months < 1 || months > 12) {
    return { success: false, error: 'Données invalides' };
  }

  const { data: sub } = await admin
    .from('subscriptions')
    .select('id, ends_at, student_id')
    .eq('id', subscription_id)
    .single();
  if (!sub) return { success: false, error: 'Abonnement introuvable' };

  const newEndsAt = new Date(sub.ends_at);
  newEndsAt.setMonth(newEndsAt.getMonth() + months);

  const { error } = await admin
    .from('subscriptions')
    .update({ ends_at: newEndsAt.toISOString(), status: 'active' })
    .eq('id', subscription_id);
  if (error) return { success: false, error: 'Erreur prolongation' };

  await admin.from('audit_logs').insert({
    actor_id: user.id,
    action: 'subscription.extended',
    target_type: 'subscription',
    target_id: subscription_id,
    meta: { months, new_ends_at: newEndsAt.toISOString(), student_id: sub.student_id },
  });

  await admin.from('notifications').insert({
    user_id: sub.student_id,
    type: 'subscription_activated',
    title: 'Abonnement prolongé 🎉',
    body: `Ton abonnement a été prolongé de ${months} mois.`,
    meta: { subscription_id },
  });

  revalidatePath('/admin/abonnements');
  return { success: true, data: null, message: `Abonnement prolongé de ${months} mois.` };
}

// ─── expireOverdueSubscriptions (cron / admin) ────────────────────────────────

export async function expireOverdueSubscriptions(): Promise<ActionResult<number>> {
  const admin = createAdminClient();

  const { data, error } = await admin.rpc('expire_overdue_subscriptions');
  if (error) return { success: false, error: 'Erreur lors de l\'expiration automatique' };

  return { success: true, data: data as number };
}

// ─── getMySubscription ────────────────────────────────────────────────────────

export async function signOutRedirect() {
  const supabase = createServerClient();
  await supabase.auth.signOut();
  redirect('/connexion');
}

