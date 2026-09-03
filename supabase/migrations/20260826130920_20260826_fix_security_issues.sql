-- ============================================================
-- Fix all security issues identified by advisor + posture audit
-- ============================================================

-- 1. lab_tests: Remove public write access (INSERT/UPDATE/DELETE)
--    The app only ever READS lab_tests via the anon key (server-side).
--    Writes should only happen via the service-role key (admin import).
DROP POLICY IF EXISTS "anon_insert_lab_tests" ON lab_tests;
DROP POLICY IF EXISTS "anon_update_lab_tests" ON lab_tests;
DROP POLICY IF EXISTS "anon_delete_lab_tests" ON lab_tests;

-- Revoke write privileges from anon and authenticated on lab_tests
REVOKE INSERT, UPDATE, DELETE ON lab_tests FROM anon;
REVOKE INSERT, UPDATE, DELETE ON lab_tests FROM authenticated;

-- 2. admin_profiles: Lock down grants
--    Only authenticated users should be able to SELECT their own row.
--    No anon access at all. No INSERT/UPDATE/DELETE for any client role.
REVOKE SELECT, INSERT, UPDATE, DELETE ON admin_profiles FROM anon;
REVOKE INSERT, UPDATE, DELETE ON admin_profiles FROM authenticated;
GRANT SELECT ON admin_profiles TO authenticated;

-- 3. Fix mutable search_path on trigger function
--    Recreate with explicit SET search_path to prevent privilege escalation.
CREATE OR REPLACE FUNCTION public.update_lab_tests_search_vector()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.test_name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.test_code, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(array_to_string(NEW.aliases, ' '), '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.components, '')), 'C');
  RETURN NEW;
END;
$$;

-- 4. Move pg_trgm extension from public to extensions schema
--    Drop and recreate in the proper schema.
DROP INDEX IF EXISTS public.idx_lab_tests_name_trgm;
DROP EXTENSION IF EXISTS pg_trgm CASCADE;
CREATE SCHEMA IF NOT EXISTS extensions;
CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA extensions;

-- Recreate the trigram index with the correct schema-qualified operator class
CREATE INDEX IF NOT EXISTS idx_lab_tests_name_trgm
  ON lab_tests USING GIN (test_name extensions.gin_trgm_ops);
