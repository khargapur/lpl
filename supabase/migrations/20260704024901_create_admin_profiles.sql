/*
# Create admin_profiles table

## Summary
Creates an `admin_profiles` table that stores which Supabase Auth users are
approved admins.  Only users whose `auth.uid()` exists in this table can access
the /admin area.

## New Tables
- `admin_profiles`
  - `id`         – uuid, primary key, references auth.users(id) ON DELETE CASCADE
  - `email`      – text, the admin's email (for display)
  - `created_at` – timestamptz, when the admin was added

## Security
- RLS enabled.
- SELECT: authenticated user can read their own row (used to verify admin status).
- INSERT / UPDATE / DELETE: no policies → only the service-role key (server-side) or
  a Supabase dashboard superuser can add/remove admins.  This prevents any
  authenticated user from self-promoting.
*/

CREATE TABLE IF NOT EXISTS admin_profiles (
  id         uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email      text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Allow an authenticated user to read ONLY their own row.
-- Used server-side to confirm the signed-in user is an approved admin.
DROP POLICY IF EXISTS "admin_select_own" ON admin_profiles;
CREATE POLICY "admin_select_own" ON admin_profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id);
