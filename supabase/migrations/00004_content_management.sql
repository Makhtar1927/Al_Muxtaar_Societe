-- ============================================================
-- Migration 00004 — Content management helpers
-- ============================================================

-- ─── images stored in Supabase Storage ───────────────────────
-- Bucket "content" is created manually in Supabase dashboard.
-- This migration only adds the media_files tracking table.

CREATE TABLE IF NOT EXISTS media_files (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  uploader_id  uuid        NOT NULL REFERENCES profiles(id),
  bucket       text        NOT NULL DEFAULT 'content',
  path         text        NOT NULL,                -- storage object path
  mime_type    text,
  size_bytes   integer,
  alt_text     text,
  created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_media_uploader ON media_files(uploader_id);

ALTER TABLE media_files ENABLE ROW LEVEL SECURITY;

-- editors and admins can manage media
DROP POLICY IF EXISTS "editor manage media" ON media_files;
CREATE POLICY "editor manage media"
  ON media_files FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'editor')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'editor')
    )
  );

-- ─── chapter ordering helper ──────────────────────────────────
-- Add sort_order column if not already present (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'chapters' AND column_name = 'sort_order'
  ) THEN
    ALTER TABLE chapters ADD COLUMN sort_order integer NOT NULL DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'lessons' AND column_name = 'sort_order'
  ) THEN
    ALTER TABLE lessons ADD COLUMN sort_order integer NOT NULL DEFAULT 0;
  END IF;
END;
$$;

