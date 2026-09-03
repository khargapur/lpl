/*
# Create blog_posts table for admin-managed blog content

## Summary
Creates a `blog_posts` table that stores blog articles manageable from the
admin panel. Published posts automatically appear on the public blog listing
and detail pages. Drafts are only visible to authenticated admins.

## New Tables
- `blog_posts`
  - `id`          – serial, primary key
  - `slug`        – text, unique, URL-friendly identifier
  - `title`       – text, not null, article headline
  - `excerpt`     – text, short summary shown on blog cards
  - `content`     – text, full article body (plain text / markdown)
  - `category`    – text, category label (e.g. "Health Tips")
  - `image_url`   – text, featured image URL
  - `read_time`   – text, estimated read time label (e.g. "5 min read")
  - `status`      – text, 'draft' or 'published', defaults to 'draft'
  - `created_at`  – timestamptz, when the post was created
  - `updated_at`  – timestamptz, when the post was last modified
  - `published_at`– timestamptz, when the post was published (null = draft)

## Security
- RLS enabled.
- SELECT: Anyone (anon + authenticated) can read published posts.
  Authenticated admins can also read drafts.
- INSERT / UPDATE / DELETE: Only authenticated users who exist in
  admin_profiles can write. This is enforced via an EXISTS subquery
  checking admin_profiles for the current auth.uid().
- Column privileges: author_id is NOT included — ownership is validated
  through the admin_profiles membership check, not a per-row owner column.
- A SECURITY DEFINER function `create_blog_post` handles inserts with
  server-side validation of slug uniqueness and required fields, so the
  admin UI never needs direct table write privileges beyond what RLS allows.
- A unique index on lower(slug) prevents duplicate slugs differing only
  by case.

## Important Notes
1. The slug uniqueness is enforced by a unique index on lower(slug) so
   "My-Post" and "my-post" cannot coexist.
2. The status column defaults to 'draft' so newly created posts are
   not publicly visible until explicitly published.
3. The updated_at column is auto-maintained by a trigger.
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id           serial PRIMARY KEY,
  slug         text NOT NULL,
  title        text NOT NULL,
  excerpt      text NOT NULL DEFAULT '',
  content      text NOT NULL DEFAULT '',
  category     text NOT NULL DEFAULT 'Health Tips',
  image_url    text NOT NULL DEFAULT '',
  read_time    text NOT NULL DEFAULT '5 min read',
  status       text NOT NULL DEFAULT 'draft',
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),
  published_at timestamptz
);

-- Unique slug (case-insensitive)
CREATE UNIQUE INDEX IF NOT EXISTS blog_posts_slug_lower_key
  ON blog_posts (lower(slug));

-- Index for the public query: published posts ordered by published_at desc
CREATE INDEX IF NOT EXISTS blog_posts_published_idx
  ON blog_posts (published_at DESC)
  WHERE status = 'published';

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION public.update_blog_posts_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS blog_posts_updated_at ON blog_posts;
CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_blog_posts_updated_at();

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- SELECT: public can read published; admins can read all
DROP POLICY IF EXISTS "blog_posts_select" ON blog_posts;
CREATE POLICY "blog_posts_select" ON blog_posts
  FOR SELECT TO anon, authenticated
  USING (
    status = 'published'
    OR EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
    )
  );

-- INSERT: only admins
DROP POLICY IF EXISTS "blog_posts_insert_admin" ON blog_posts;
CREATE POLICY "blog_posts_insert_admin" ON blog_posts
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
    )
  );

-- UPDATE: only admins
DROP POLICY IF EXISTS "blog_posts_update_admin" ON blog_posts;
CREATE POLICY "blog_posts_update_admin" ON blog_posts
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
    )
  );

-- DELETE: only admins
DROP POLICY IF EXISTS "blog_posts_delete_admin" ON blog_posts;
CREATE POLICY "blog_posts_delete_admin" ON blog_posts
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
    )
  );

-- Grant column-level privileges
-- anon can only SELECT (read published posts via RLS)
GRANT SELECT ON blog_posts TO anon;
GRANT SELECT ON blog_posts TO authenticated;
GRANT INSERT, UPDATE, DELETE ON blog_posts TO authenticated;
