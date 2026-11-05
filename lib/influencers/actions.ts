'use server';

import { revalidatePath } from 'next/cache';
import {
  getInfluencerByCode,
  getInfluencerByAccessKey,
  createInfluencer,
  getAllInfluencers,
  getInfluencerMonthlyStats,
  markPayoutAsPaid,
  type Influencer,
  type ActionResult,
} from './service';
import { createClient } from '@/lib/supabase/server';

// ─── Vérification d'un code promo par un élève ───────────────────────────────

export async function verifyPromoCodeAction(
  rawCode: string
): Promise<ActionResult<{ promoCode: string; influencerName: string; discountText: string }>> {
  if (!rawCode || rawCode.trim().length < 2) {
    return { success: false, error: 'Code promo invalide.' };
  }

  const influencer = await getInfluencerByCode(rawCode);
  if (!influencer) {
    return {
      success: false,
      error: 'Code promo introuvable ou inactif. Vérifiez l’orthographe.',
    };
  }

  return {
    success: true,
    data: {
      promoCode: influencer.promo_code,
      influencerName: influencer.full_name,
      discountText: `Code promo officiel activé ! Vous soutenez ${influencer.full_name}.`,
    },
    message: `Code promo officiel activé ! Vous soutenez ${influencer.full_name}.`,
  };
}

// ─── Création d'un influenceur par l'admin ───────────────────────────────────

export async function createInfluencerAction(formData: FormData): Promise<ActionResult<Influencer>> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Non authentifié.' };
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    return { success: false, error: 'Accès réservé aux administrateurs.' };
  }

  const fullName = formData.get('fullName') as string;
  const phone = formData.get('phone') as string;
  const promoCode = formData.get('promoCode') as string;
  const notes = (formData.get('notes') as string) || '';

  if (!fullName || !phone || !promoCode) {
    return { success: false, error: 'Nom, téléphone et code promo sont requis.' };
  }

  const res = await createInfluencer({
    full_name: fullName,
    phone,
    promo_code: promoCode,
    commission_per_subscription: 150, // 150 FCFA
    notes,
  });

  if (res.success) {
    revalidatePath('/admin/influenceurs');
    revalidatePath('/influenceur');
  }

  return res;
}

// ─── Validation d'un virement mensuel Wave par l'admin ──────────────────────

export async function markPayoutPaidAction(formData: FormData): Promise<ActionResult> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false, error: 'Non authentifié.' };

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    return { success: false, error: 'Accès réservé aux administrateurs.' };
  }

  const payoutId = formData.get('payoutId') as string;
  const paymentReference = formData.get('paymentReference') as string;
  const notes = (formData.get('notes') as string) || '';

  if (!payoutId) {
    return { success: false, error: 'Identifiant de relevé manquant.' };
  }

  const res = await markPayoutAsPaid(payoutId, paymentReference, notes);
  if (res.success) {
    revalidatePath('/admin/influenceurs');
    revalidatePath('/influenceur');
  }

  return res;
}

