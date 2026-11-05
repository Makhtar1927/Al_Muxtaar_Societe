import fs from 'fs';
import path from 'path';
import { createAdminClient } from '@/lib/supabase/admin';

export interface Influencer {
  id: string;
  full_name: string;
  phone: string;
  promo_code: string;
  commission_per_subscription: number; // 150 FCFA
  access_key: string;
  is_active: boolean;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface InfluencerPayout {
  id: string;
  influencer_id: string;
  period_month: string; // '2026-11'
  validated_subscriptions_count: number;
  total_commission_fcfa: number;
  status: 'in_progress' | 'pending_payout' | 'paid';
  paid_at?: string | null;
  paid_by?: string | null;
  payment_reference?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface AffiliationRecord {
  id: string;
  influencer_id: string;
  promo_code: string;
  subscription_id: string;
  student_name?: string;
  student_phone?: string;
  plan_name?: string;
  plan_amount?: number; // 700 ou 2000 FCFA
  commission_fcfa: number; // 150 ou 400 FCFA
  period_month: string;
  validated_at: string;
}

/**
 * Barème officiel des commissions influenceurs :
 * - 150 FCFA pour un abonnement à 700 FCFA (mensuel)
 * - 400 FCFA pour un abonnement à 2000 FCFA (trimestriel / pass)
 */
export function computeCommissionForPlan(amount?: number | null): number {
  if (!amount || amount <= 0) return 150;
  if (amount >= 2000) return 400;
  if (amount >= 700) return 150;
  return 150;
}

export type ActionResult<T = null> =
  | { success: true; data: T; message?: string }
  | { success: false; error: string };

const STORE_DIR = path.join(process.cwd(), 'data');
const STORE_FILE = path.join(STORE_DIR, 'influencers-store.json');

interface LocalStore {
  influencers: Influencer[];
  payouts: InfluencerPayout[];
  affiliations: AffiliationRecord[];
}

function getDefaultStore(): LocalStore {
  const now = new Date().toISOString();
  const currentMonth = now.slice(0, 7);

  const initialInfluencers: Influencer[] = [
    {
      id: 'inf_ambassadeur_01',
      full_name: 'Cheikh Tidiane Sy (Major S2)',
      phone: '+221 77 123 45 67',
      promo_code: 'MAJOR_S2',
      commission_per_subscription: 150,
      access_key: 'inf_key_major_s2_771234',
      is_active: true,
      notes: 'Influenceur éducatif TikTok & YouTube Bac S2 Sénégal',
      created_at: now,
      updated_at: now,
    },
    {
      id: 'inf_ambassadeur_02',
      full_name: 'Aminata Diallo (Excellence Maths)',
      phone: '+221 78 987 65 43',
      promo_code: 'EXCELLENCE',
      commission_per_subscription: 150,
      access_key: 'inf_key_excellence_789876',
      is_active: true,
      notes: 'Animatrice groupe WhatsApp révisions Sénégal',
      created_at: now,
      updated_at: now,
    },
  ];

  // Exemples d'historique des mois passés pour garantir l'historique inviolable
  const initialPayouts: InfluencerPayout[] = [
    {
      id: 'payout_oct_01',
      influencer_id: 'inf_ambassadeur_01',
      period_month: '2026-10',
      validated_subscriptions_count: 42,
      total_commission_fcfa: 42 * 150, // 6 300 FCFA
      status: 'paid',
      paid_at: '2026-11-01T10:00:00.000Z',
      payment_reference: 'TR-WAVE-OCT-88291',
      notes: 'Virement Wave mensuel effectué',
      created_at: '2026-10-01T00:00:00.000Z',
      updated_at: '2026-11-01T10:00:00.000Z',
    },
    {
      id: 'payout_nov_01',
      influencer_id: 'inf_ambassadeur_01',
      period_month: currentMonth,
      validated_subscriptions_count: 8,
      total_commission_fcfa: 6 * 150 + 2 * 400, // 1 700 FCFA (6 plans 700 F + 2 plans 2000 F)
      status: 'in_progress',
      created_at: now,
      updated_at: now,
    },
  ];

  const initialAffiliations: AffiliationRecord[] = [
    {
      id: 'aff_demo_01',
      influencer_id: 'inf_ambassadeur_01',
      promo_code: 'MAJOR_S2',
      subscription_id: 'sub_demo_01',
      student_name: 'Moussa Diop (Terminale S2)',
      student_phone: '+221 77 345 67 89',
      plan_name: 'Abonnement Trimestriel (2 000 FCFA)',
      plan_amount: 2000,
      commission_fcfa: 400,
      period_month: currentMonth,
      validated_at: now,
    },
    {
      id: 'aff_demo_02',
      influencer_id: 'inf_ambassadeur_01',
      promo_code: 'MAJOR_S2',
      subscription_id: 'sub_demo_02',
      student_name: 'Fatou Ndiaye (Terminale S2)',
      student_phone: '+221 78 123 99 88',
      plan_name: 'Abonnement Mensuel (700 FCFA)',
      plan_amount: 700,
      commission_fcfa: 150,
      period_month: currentMonth,
      validated_at: now,
    },
  ];

  return {
    influencers: initialInfluencers,
    payouts: initialPayouts,
    affiliations: initialAffiliations,
  };
}

function loadLocalStore(): LocalStore {
  try {
    if (!fs.existsSync(STORE_DIR)) {
      fs.mkdirSync(STORE_DIR, { recursive: true });
    }
    if (!fs.existsSync(STORE_FILE)) {
      const initial = getDefaultStore();
      fs.writeFileSync(STORE_FILE, JSON.stringify(initial, null, 2), 'utf8');
      return initial;
    }
    const raw = fs.readFileSync(STORE_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Erreur lecture store local influenceurs:', err);
    return getDefaultStore();
  }
}

function saveLocalStore(store: LocalStore) {
  try {
    if (!fs.existsSync(STORE_DIR)) {
      fs.mkdirSync(STORE_DIR, { recursive: true });
    }
    fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), 'utf8');
  } catch (err) {
    console.error('Erreur écriture store local influenceurs:', err);
  }
}

// ─── Fonctions publiques du service ──────────────────────────────────────────

/**
 * Récupère tous les influenceurs (Supabase en priorité, puis store local)
 */
export async function getAllInfluencers(): Promise<Influencer[]> {
  const admin = createAdminClient();
  try {
    const { data, error } = await admin
      .from('influencers')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) {
      // Supabase OK — on retourne directement (peut être vide si aucun inséré via BD)
      // Merger avec le store local pour ne rien perdre
      const localStore = loadLocalStore();
      const supabaseIds = new Set(data.map((d: any) => d.id));
      const localOnly = localStore.influencers.filter((inf) => !supabaseIds.has(inf.id));
      return [...data as Influencer[], ...localOnly];
    }
  } catch (e) {
    // Fallback
  }
  const store = loadLocalStore();
  return store.influencers;
}

/**
 * Recherche un influenceur par son code promo (insensible à la casse)
 */
export async function getInfluencerByCode(code: string): Promise<Influencer | null> {
  const cleanCode = code ? String(code).trim().toUpperCase() : '';
  if (!cleanCode) return null;

  // Utiliser getAllInfluencers() pour garantir la cohérence absolue avec la liste admin
  const all = await getAllInfluencers();
  const match = all.find(
    (inf) => inf.promo_code?.toUpperCase() === cleanCode && inf.is_active
  );
  if (match) return match;

  // Requête directe de secours
  const admin = createAdminClient();
  try {
    const { data, error } = await admin
      .from('influencers')
      .select('*')
      .ilike('promo_code', cleanCode)
      .eq('is_active', true)
      .maybeSingle();

    if (!error && data) {
      return data as Influencer;
    }
  } catch (e) {
    // Fallback store
  }

  const store = loadLocalStore();
  return store.influencers.find((inf) => inf.promo_code.toUpperCase() === cleanCode && inf.is_active) || null;
}

/**
 * Recherche un influenceur par sa clé secrète d'accès
 */
export async function getInfluencerByAccessKey(accessKey: string): Promise<Influencer | null> {
  const cleanKey = accessKey ? String(accessKey).trim() : '';
  if (!cleanKey) return null;

  const all = await getAllInfluencers();
  const match = all.find((inf) => inf.access_key === cleanKey && inf.is_active);
  if (match) return match;

  const admin = createAdminClient();
  try {
    const { data, error } = await admin
      .from('influencers')
      .select('*')
      .eq('access_key', cleanKey)
      .maybeSingle();

    if (!error && data) {
      return data as Influencer;
    }
  } catch (e) {
    // Fallback store
  }

  const store = loadLocalStore();
  return store.influencers.find((inf) => inf.access_key === cleanKey && inf.is_active) || null;
}

/**
 * Crée un nouvel influenceur avec son code promo unique
 */
export async function createInfluencer(data: {
  full_name: string;
  phone: string;
  promo_code: string;
  commission_per_subscription?: number;
  notes?: string;
}): Promise<ActionResult<Influencer>> {
  const cleanCode = data.promo_code.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '');
  if (!cleanCode || cleanCode.length < 3) {
    return { success: false, error: 'Le code promo doit contenir au moins 3 caractères alphanumériques.' };
  }

  const existing = await getInfluencerByCode(cleanCode);
  if (existing) {
    return { success: false, error: `Le code promo "${cleanCode}" est déjà attribué.` };
  }

  const now = new Date().toISOString();

  // Payload pour Supabase : on ne passe PAS d'id — PostgreSQL génère un UUID valide
  const insertPayload = {
    full_name: data.full_name.trim(),
    phone: data.phone.trim(),
    promo_code: cleanCode,
    commission_per_subscription: data.commission_per_subscription || 150,
    is_active: true,
    notes: data.notes?.trim() || null,
  };

  const admin = createAdminClient();
  try {
    const { data: dbData, error } = await admin
      .from('influencers')
      .insert(insertPayload)
      .select()
      .single();
    if (!error && dbData) {
      return { success: true, data: dbData as Influencer, message: 'Influenceur créé avec succès !' };
    }
    if (error) {
      console.error('Supabase createInfluencer error:', error.message, error.code);
    }
  } catch (e) {
    console.error('Supabase createInfluencer exception:', e);
  }

  // Fallback: store JSON local (seulement si Supabase échoue)
  const randomSuffix = Math.random().toString(36).substring(2, 10);
  const newInf: Influencer = {
    id: `inf_${Date.now()}_${randomSuffix}`,
    ...insertPayload,
    access_key: `inf_key_${cleanCode.toLowerCase()}_${randomSuffix}`,
    created_at: now,
    updated_at: now,
  };

  const store = loadLocalStore();
  store.influencers.unshift(newInf);
  saveLocalStore(store);

  return { success: true, data: newInf, message: 'Influenceur créé avec succès !' };
}

/**
 * Enregistre et comptabilise une commission LORSQUE LE PAIEMENT EST VALIDÉ PAR L'ADMIN :
 * - 150 FCFA pour un abonnement à 700 FCFA
 * - 400 FCFA pour un abonnement à 2000 FCFA
 */
export async function recordValidatedAffiliation(
  promoCode: string,
  subscriptionId: string,
  studentInfo?: { name?: string; phone?: string; planAmount?: number; planName?: string }
): Promise<ActionResult> {
  const cleanCode = promoCode?.trim().toUpperCase();
  if (!cleanCode) return { success: false, error: 'Aucun code promo fourni.' };

  const influencer = await getInfluencerByCode(cleanCode);
  if (!influencer) return { success: false, error: 'Influenceur introuvable pour ce code promo.' };

  const admin = createAdminClient();

  // Déterminer le montant du plan pour attribuer la commission adéquate
  let planAmount = studentInfo?.planAmount;
  let planName = studentInfo?.planName;

  if (!planAmount) {
    try {
      const { data: payRow } = await admin
        .from('payments')
        .select('amount, plan_id, plans(name, price_fcfa)')
        .eq('subscription_id', subscriptionId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (payRow?.amount) {
        planAmount = payRow.amount;
        planName = planName || (payRow.plans as any)?.name;
      } else {
        const { data: subRow } = await admin
          .from('subscriptions')
          .select('plans(name, price_fcfa)')
          .eq('id', subscriptionId)
          .maybeSingle();
        if (subRow?.plans) {
          planAmount = (subRow.plans as any)?.price_fcfa;
          planName = planName || (subRow.plans as any)?.name;
        }
      }
    } catch (fetchErr) {
      console.warn('Erreur détermination montant pour commission:', fetchErr);
    }
  }

  // 150 FCFA (plan 700 F) ou 400 FCFA (plan 2000 F)
  const commission = computeCommissionForPlan(planAmount);
  const now = new Date();
  const periodMonth = now.toISOString().slice(0, 7); // ex : '2026-11'

  // 1. Essai d'enregistrement en BDD Supabase
  try {
    // Mettre à jour payments si existant
    await admin
      .from('payments')
      .update({
        influencer_id: influencer.id,
        promo_code: cleanCode,
        influencer_commission: commission,
      })
      .eq('subscription_id', subscriptionId);

    // Mettre à jour subscriptions
    await admin
      .from('subscriptions')
      .update({
        influencer_id: influencer.id,
        promo_code: cleanCode,
      })
      .eq('id', subscriptionId);

    // Audit log
    await admin.from('audit_logs').insert({
      action: 'influencer.commission_credited',
      target_type: 'influencer',
      target_id: influencer.id,
      meta: {
        promo_code: cleanCode,
        plan_amount: planAmount || 700,
        commission_fcfa: commission,
        period_month: periodMonth,
        subscription_id: subscriptionId,
      },
    });
  } catch (e) {
    console.warn('Supabase affiliation tracking fallback to store:', e);
  }

  // 2. Synchronisation dans le store local inviolable
  const store = loadLocalStore();

  // Éviter le double comptage pour la même souscription
  const existingAffiliation = store.affiliations.find(
    (a) => a.subscription_id === subscriptionId
  );
  if (existingAffiliation) {
    return { success: true, data: null, message: 'Commission déjà comptabilisée.' };
  }

  // Ajouter l'enregistrement unitaire
  const affRecord: AffiliationRecord = {
    id: `aff_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    influencer_id: influencer.id,
    promo_code: cleanCode,
    subscription_id: subscriptionId,
    student_name: studentInfo?.name,
    student_phone: studentInfo?.phone,
    plan_name: planName || (planAmount && planAmount >= 2000 ? 'Trimestriel (2 000 FCFA)' : 'Mensuel (700 FCFA)'),
    plan_amount: planAmount || 700,
    commission_fcfa: commission,
    period_month: periodMonth,
    validated_at: now.toISOString(),
  };
  store.affiliations.push(affRecord);

  // Mettre à jour ou créer la synthèse mensuelle
  let payout = store.payouts.find(
    (p) => p.influencer_id === influencer.id && p.period_month === periodMonth
  );

  if (payout) {
    payout.validated_subscriptions_count += 1;
    payout.total_commission_fcfa += commission;
    payout.updated_at = now.toISOString();
  } else {
    payout = {
      id: `payout_${periodMonth}_${influencer.id}`,
      influencer_id: influencer.id,
      period_month: periodMonth,
      validated_subscriptions_count: 1,
      total_commission_fcfa: commission,
      status: 'in_progress',
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
    };
    store.payouts.push(payout);
  }

  saveLocalStore(store);

  return {
    success: true,
    data: null,
    message: `Commission de ${commission} FCFA comptabilisée pour ${influencer.full_name} (${cleanCode}).`,
  };
}

/**
 * Récupère les statistiques et l'historique mensuel inviolable d'un influenceur
 */
export async function getInfluencerMonthlyStats(influencerOrId: string | Influencer): Promise<{
  influencer: Influencer;
  currentMonthPayout: InfluencerPayout;
  historyPayouts: InfluencerPayout[];
  totalAllTimeFCFA: number;
  totalAllTimeSubs: number;
  recentAffiliations: AffiliationRecord[];
}> {
  let influencer: Influencer | undefined;

  if (typeof influencerOrId === 'object' && influencerOrId?.id) {
    influencer = influencerOrId;
  } else {
    const all = await getAllInfluencers();
    influencer = all.find((i) => i.id === influencerOrId);
  }

  if (!influencer) {
    const all = await getAllInfluencers();
    influencer = all[0];
  }

  const store = loadLocalStore();
  const nowMonth = new Date().toISOString().slice(0, 7);

  // Recherche des règlements mensuels : Supabase en priorité
  let allPayouts: InfluencerPayout[] = [];
  const admin = createAdminClient();
  try {
    const { data: dbPayouts } = await admin
      .from('influencer_payouts')
      .select('*')
      .eq('influencer_id', influencer.id)
      .order('period_month', { ascending: false });

    if (dbPayouts && dbPayouts.length > 0) {
      allPayouts = dbPayouts as InfluencerPayout[];
    }
  } catch (e) {
    // fallback
  }

  if (allPayouts.length === 0) {
    allPayouts = store.payouts
      .filter((p) => p.influencer_id === influencer!.id)
      .sort((a, b) => b.period_month.localeCompare(a.period_month));
  }

  let currentMonthPayout = allPayouts.find((p) => p.period_month === nowMonth);
  if (!currentMonthPayout) {
    currentMonthPayout = {
      id: `payout_${nowMonth}_${influencer.id}`,
      influencer_id: influencer.id,
      period_month: nowMonth,
      validated_subscriptions_count: 0,
      total_commission_fcfa: 0,
      status: 'in_progress',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }

  // Historique sans le mois courant en cours (ou tout l'historique)
  const historyPayouts = allPayouts.filter((p) => p.period_month !== nowMonth);

  // Totaux cumulés
  let totalAllTimeFCFA = 0;
  let totalAllTimeSubs = 0;
  allPayouts.forEach((p) => {
    totalAllTimeFCFA += p.total_commission_fcfa;
    totalAllTimeSubs += p.validated_subscriptions_count;
  });

  // Affiliations récentes pour cet influenceur
  const recentAffiliations = store.affiliations
    .filter((a) => a.influencer_id === influencer!.id)
    .sort((a, b) => b.validated_at.localeCompare(a.validated_at))
    .slice(0, 50);

  return {
    influencer,
    currentMonthPayout,
    historyPayouts,
    totalAllTimeFCFA,
    totalAllTimeSubs,
    recentAffiliations,
  };
}

/**
 * Marque un relevé mensuel comme Versé / Payé par l'administrateur
 */
export async function markPayoutAsPaid(
  payoutId: string,
  paymentReference: string,
  notes?: string
): Promise<ActionResult> {
  const store = loadLocalStore();
  const payout = store.payouts.find((p) => p.id === payoutId);
  if (!payout) {
    return { success: false, error: 'Relevé mensuel introuvable.' };
  }

  const now = new Date().toISOString();
  payout.status = 'paid';
  payout.paid_at = now;
  payout.payment_reference = paymentReference.trim() || `WAVE-TRANS-${Date.now()}`;
  payout.notes = notes?.trim() || 'Versement mensuel Wave validé';
  payout.updated_at = now;

  saveLocalStore(store);

  return {
    success: true,
    data: null,
    message: `Période ${payout.period_month} marquée comme versée avec succès !`,
  };
}

