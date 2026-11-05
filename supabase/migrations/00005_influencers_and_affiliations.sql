
-- ============================================================
-- Migration 00005 — Influencers & Affiliation System (150 FCFA/sub)
-- ============================================================

-- 1. Table des influenceurs / partenaires de parrainage
CREATE TABLE IF NOT EXISTS public.influencers (
  id                          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name                   TEXT NOT NULL,
  phone                       TEXT NOT NULL,
  promo_code                  TEXT UNIQUE NOT NULL,
  commission_per_subscription INT NOT NULL DEFAULT 150, -- 150 FCFA par défaut
  access_key                  TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(16), 'hex'),
  is_active                   BOOLEAN NOT NULL DEFAULT TRUE,
  notes                       TEXT,
  created_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_influencers_promo_code ON public.influencers(promo_code);
CREATE INDEX IF NOT EXISTS idx_influencers_access_key ON public.influencers(access_key);

-- 2. Ajout des colonnes de parrainage dans subscriptions et payments si absentes
ALTER TABLE public.subscriptions
  ADD COLUMN IF NOT EXISTS promo_code TEXT,
  ADD COLUMN IF NOT EXISTS influencer_id UUID REFERENCES public.influencers(id) ON DELETE SET NULL;

ALTER TABLE public.payments
  ADD COLUMN IF NOT EXISTS promo_code TEXT,
  ADD COLUMN IF NOT EXISTS influencer_id UUID REFERENCES public.influencers(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS influencer_commission INT NOT NULL DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_subscriptions_influencer ON public.subscriptions(influencer_id);
CREATE INDEX IF NOT EXISTS idx_payments_influencer ON public.payments(influencer_id);

-- 3. Table des règlements / synthèses mensuelles des commissions (historique inviolable)
CREATE TABLE IF NOT EXISTS public.influencer_payouts (
  id                            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  influencer_id                 UUID NOT NULL REFERENCES public.influencers(id) ON DELETE CASCADE,
  period_month                  TEXT NOT NULL, -- Format 'YYYY-MM', ex: '2026-11'
  validated_subscriptions_count INT NOT NULL DEFAULT 0,
  total_commission_fcfa         INT NOT NULL DEFAULT 0,
  status                        TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'pending_payout', 'paid')),
  paid_at                       TIMESTAMPTZ,
  paid_by                       UUID REFERENCES public.profiles(id),
  payment_reference             TEXT, -- Numéro de transaction Wave ou reçu
  notes                         TEXT,
  created_at                    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(influencer_id, period_month)
);

CREATE INDEX IF NOT EXISTS idx_payouts_influencer_period ON public.influencer_payouts(influencer_id, period_month);

-- 4. RLS
ALTER TABLE public.influencers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.influencer_payouts ENABLE ROW LEVEL SECURITY;

-- Admins ont tous les droits
DROP POLICY IF EXISTS "admin_all_influencers" ON public.influencers;
CREATE POLICY "admin_all_influencers" ON public.influencers
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_all_influencer_payouts" ON public.influencer_payouts;
CREATE POLICY "admin_all_influencer_payouts" ON public.influencer_payouts
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Lecture publique contrôlée des codes promo actifs pour validation lors de l'abonnement
DROP POLICY IF EXISTS "public_read_active_promo_codes" ON public.influencers;
CREATE POLICY "public_read_active_promo_codes" ON public.influencers
  FOR SELECT USING (is_active = TRUE);
