'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createClient as createServerClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

// ─── Schemas ─────────────────────────────────────────────────────────────────

const RequestSubscriptionSchema = z.object({
  plan_id: z.string().uuid('Plan invalide'),
  phone_sender: z.string().optional(),
  notes: z.string().max(255).optional(),
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
  if (!user) return { success: false, error: 'Vous devez être connecté pour souscrire.' };

  // Parse + validate
  const raw = {
    plan_id: formData.get('plan_id'),
    phone_sender: formData.get('phone_sender') || undefined,
    notes: formData.get('notes') || undefined,
  };

  const parsed = RequestSubscriptionSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.errors[0];
    return { success: false, error: first.message };
  }
  const { plan_id, phone_sender, notes } = parsed.data;

  // Récupérer le profil de l'élève
  const { data: profile } = await supabase
    .from('profiles')
    .select('first_name, last_name, phone')
    .eq('id', user.id)
    .single();

  // Fetch plan
  const { data: plan, error: planErr } = await supabase
    .from('plans')
    .select('id, name, duration_days, price_fcfa')
    .eq('id', plan_id)
    .single();
  if (planErr || !plan) return { success: false, error: 'Formule introuvable' };

  // Vérifier si une souscription active ou en attente existe déjà
  const { data: existing } = await supabase
    .from('subscriptions')
    .select('id, status')
    .eq('user_id', user.id)
    .in('status', ['active', 'pending'])
    .maybeSingle();

  if (existing?.status === 'active') {
    return {
      success: false,
      error: 'Vous avez déjà un abonnement actif en cours.',
    };
  }
  if (existing?.status === 'pending') {
    return {
      success: false,
      error: 'Une demande de paiement est déjà en attente de validation.',
    };
  }

  const admin = createAdminClient();

  // Créer l'abonnement au statut pending (via admin pour contourner tout blocage RLS)
  const { data: sub, error: subErr } = await admin
    .from('subscriptions')
    .insert({
      user_id: user.id,
      plan_id,
      status: 'pending',
    })
    .select('id')
    .single();

  if (subErr || !sub) {
    return { success: false, error: "Erreur lors de l'enregistrement de la demande" };
  }

  // Enregistrer le paiement Wave (sans exigence de capture d'écran)
  const studentPhone = profile?.phone ?? user.email ?? 'Non renseigné';
  const senderNumber = phone_sender?.trim() || studentPhone;
  const studentFullName = profile ? `${profile.first_name} ${profile.last_name}` : 'Élève';

  const { error: payErr } = await admin.from('payments').insert({
    subscription_id: sub.id,
    student_id: user.id,
    plan_id,
    amount: plan.price_fcfa,
    provider: 'wave',
    transaction_code: `WAVE-${senderNumber}`,
    notes: notes?.trim() || `Paiement Wave de ${studentFullName} (${senderNumber})`,
    status: 'pending',
  });

  if (payErr) {
    return { success: false, error: 'Erreur lors de la confirmation du paiement' };
  }

  revalidatePath('/abonnement');
  return {
    success: true,
    data: null,
    message: 'Demande transmise avec succès ! Votre accès sera activé dès constatation du transfert Wave.',
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

  // Récupérer l'abonnement et la durée du plan
  const { data: sub } = await admin
    .from('subscriptions')
    .select('id, user_id, plan_id, plans(duration_days)')
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

  // Calcul des dates si activation
  const updateData: Record<string, unknown> = {
    status: newStatus,
    updated_at: new Date().toISOString(),
  };

  if (action === 'activate') {
    const startDate = new Date();
    const durationDays = (sub.plans as { duration_days?: number })?.duration_days || 30;
    const endDate = new Date(startDate.getTime() + durationDays * 24 * 60 * 60 * 1000);

    updateData.start_date = startDate.toISOString();
    updateData.end_date = endDate.toISOString();
    updateData.activated_by = user.id;
  }

  // Mettre à jour l'abonnement
  const { error: updateErr } = await admin
    .from('subscriptions')
    .update(updateData)
    .eq('id', subscription_id);
  if (updateErr) return { success: false, error: 'Erreur lors de la mise à jour' };

  // Mettre à jour le paiement
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

  // Journal d'audit (sécurisé)
  try {
    await admin.from('audit_logs').insert({
      actor_id: user.id,
      action: auditAction,
      target_type: 'subscription',
      target_id: subscription_id,
      meta: { notes, user_id: sub.user_id },
    });
  } catch (logErr) {
    console.warn('Audit log write error:', logErr);
  }

  // Notification à l'élève (sécurisée)
  try {
    const notifBody =
      action === 'activate'
        ? 'Votre abonnement Al Muxtaar Doc a été activé avec succès ! Bonne révision.'
        : action === 'reject'
        ? 'Votre demande a été refusée. Veuillez contacter le support WhatsApp pour plus de détails.'
        : 'Votre abonnement a été suspendu par l’administration.';

    await admin.from('notifications').insert({
      user_id: sub.user_id,
      type:
        action === 'activate'
          ? 'subscription_activated'
          : action === 'reject'
          ? 'subscription_rejected'
          : 'subscription_suspended',
      title:
        action === 'activate'
          ? 'Abonnement activé'
          : action === 'reject'
          ? 'Demande refusée'
          : 'Abonnement suspendu',
      body: notifBody,
      meta: { subscription_id, plan_id: sub.plan_id },
    });
  } catch (notifErr) {
    console.warn('Notification insert error:', notifErr);
  }

  revalidatePath('/admin/abonnements');
  revalidatePath('/abonnement');
  revalidatePath('/dashboard');
  revalidatePath('/cours');
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
  const days = parseInt(formData.get('days') as string, 10) || 30;

  const { data: sub } = await admin
    .from('subscriptions')
    .select('id, end_date, user_id')
    .eq('id', subscription_id)
    .single();
  if (!sub) return { success: false, error: 'Abonnement introuvable' };

  const currentEnd = sub.end_date ? new Date(sub.end_date) : new Date();
  const newEndDate = new Date(currentEnd.getTime() + days * 24 * 60 * 60 * 1000);

  const { error } = await admin
    .from('subscriptions')
    .update({ end_date: newEndDate.toISOString(), status: 'active' })
    .eq('id', subscription_id);
  if (error) return { success: false, error: 'Erreur prolongation' };

  try {
    await admin.from('audit_logs').insert({
      actor_id: user.id,
      action: 'subscription.extended',
      target_type: 'subscription',
      target_id: subscription_id,
      meta: { days, new_end_date: newEndDate.toISOString(), user_id: sub.user_id },
    });
  } catch (logErr) {
    console.warn('Audit log write error:', logErr);
  }

  try {
    await admin.from('notifications').insert({
      user_id: sub.user_id,
      type: 'subscription_activated',
      title: 'Abonnement prolongé',
      body: `Votre abonnement a été prolongé de ${days} jours.`,
      meta: { subscription_id },
    });
  } catch (notifErr) {
    console.warn('Notification write error:', notifErr);
  }

  revalidatePath('/admin/abonnements');
  revalidatePath('/abonnement');
  revalidatePath('/dashboard');
  return { success: true, data: null, message: `Abonnement prolongé de ${days} jours.` };
}

// ─── expireOverdueSubscriptions (cron / admin) ────────────────────────────────

export async function expireOverdueSubscriptions(): Promise<ActionResult<number>> {
  const admin = createAdminClient();

  const { data, error } = await admin.rpc('expire_overdue_subscriptions');
  if (error) return { success: false, error: 'Erreur lors de l\'expiration automatique' };

  return { success: true, data: data as number };
}

// ─── signOutRedirect ─────────────────────────────────────────────────────────

export async function signOutRedirect() {
  const supabase = createServerClient();
  await supabase.auth.signOut();
  redirect('/connexion');
}
