-- ============================================================
-- Migration 00003 — Payments & Audit Logs
-- ============================================================

-- ─── payments ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS payments (
  id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id   uuid        NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
  student_id        uuid        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  plan_id           uuid        NOT NULL REFERENCES plans(id),
  amount            integer     NOT NULL CHECK (amount > 0),            -- FCFA
  provider          text        NOT NULL CHECK (provider IN ('wave','orange_money','free_money','other')),
  transaction_code  text        NOT NULL,
  proof_image_url   text,                                               -- Supabase Storage path
  status            text        NOT NULL DEFAULT 'pending'
                                CHECK (status IN ('pending','confirmed','rejected')),
  notes             text,
  reviewed_by       uuid        REFERENCES profiles(id),
  reviewed_at       timestamptz,
  created_at        timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_payments_student    ON payments(student_id);
CREATE INDEX IF NOT EXISTS idx_payments_status     ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at DESC);

-- ─── audit_logs ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS audit_logs (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id    uuid        REFERENCES profiles(id),
  action      text        NOT NULL,   -- e.g. 'subscription.activated', 'subscription.rejected'
  target_type text        NOT NULL,   -- e.g. 'subscription', 'payment', 'profile'
  target_id   uuid,
  meta        jsonb,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_actor     ON audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action    ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created   ON audit_logs(created_at DESC);

-- ─── notifications ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type        text        NOT NULL,   -- 'subscription_requested','subscription_activated','subscription_rejected','subscription_expiring','subscription_expired'
  title       text        NOT NULL,
  body        text        NOT NULL,
  read        boolean     NOT NULL DEFAULT false,
  meta        jsonb,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notif_user_unread ON notifications(user_id, read) WHERE read = false;
CREATE INDEX IF NOT EXISTS idx_notif_created    ON notifications(created_at DESC);

-- ─── RLS ──────────────────────────────────────────────────────
ALTER TABLE payments       ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs     ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications  ENABLE ROW LEVEL SECURITY;

-- payments: student sees own, admin sees all
CREATE POLICY "student own payments"
  ON payments FOR SELECT
  USING (student_id = auth.uid());

CREATE POLICY "student insert own payment"
  ON payments FOR INSERT
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "admin all payments"
  ON payments FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- audit_logs: admin only
CREATE POLICY "admin all audit_logs"
  ON audit_logs FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- notifications: user sees own
CREATE POLICY "user own notifications select"
  ON notifications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "user own notifications update"
  ON notifications FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "service insert notifications"
  ON notifications FOR INSERT
  WITH CHECK (true);  -- service_role bypasses RLS; this allows admin actions via service_role

-- ─── helper: expire overdue subscriptions ─────────────────────
CREATE OR REPLACE FUNCTION expire_overdue_subscriptions()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  expired_count integer;
BEGIN
  UPDATE subscriptions
  SET    status = 'expired'
  WHERE  status = 'active'
    AND  ends_at < now();
  GET DIAGNOSTICS expired_count = ROW_COUNT;
  RETURN expired_count;
END;
$$;

