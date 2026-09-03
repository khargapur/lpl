/*
# Create lab_tests table for Dr. Lal PathLabs test reference guide

1. Purpose
   - Stores all 1,825 diagnostic tests extracted from the Dr. Lal PathLabs Test Reference Guide PDF.
   - Each row represents a single test with its code, name, components, specimen requirements, method, comments, and reporting schedule.

2. New Tables
   - `lab_tests`
     - `id` (uuid, primary key) — auto-generated
     - `test_code` (text, unique, not null) — e.g. "Z785", "H022", the lab's internal code
     - `test_name` (text, not null) — full test name, e.g. "ABORTION PANEL"
     - `slug` (text, unique, not null) — URL-friendly slug for SEO pages, e.g. "abortion-panel"
     - `components` (text) — components/parameters measured by the test
     - `specimen` (text) — sample type and collection instructions
     - `method` (text) — analytical method, e.g. "Flow Cytometry, CLIA, PCR"
     - `comments` (text) — additional clinical/preparation notes
     - `report` (text) — reporting schedule, e.g. "Daily", "Sample by Mon 4 pm; Report Wed"
     - `aliases` (text[]) — alternative names and abbreviations for search, e.g. {"CBC", "Complete Blood Count", "Hemogram"}
     - `category` (text) — test category for filtering, e.g. "Hematology", "Biochemistry"
     - `search_vector` (tsvector) — full-text search vector for fast searching
     - `created_at` (timestamptz) — record creation timestamp

3. Indexes
   - `idx_lab_tests_slug` — unique index on slug for fast lookups
   - `idx_lab_tests_test_code` — unique index on test_code
   - `idx_lab_tests_search` — GIN index on search_vector for full-text search
   - `idx_lab_tests_name_trgm` — GIN trigram index on test_name for fuzzy/partial matching
   - `idx_lab_tests_category` — index on category for filtering

4. Security
   - RLS enabled on `lab_tests`.
   - This is a no-auth public reference catalog — all tests are publicly readable.
   - SELECT policy: `TO anon, authenticated USING (true)` — anyone can browse tests.
   - INSERT/UPDATE/DELETE: `TO anon, authenticated WITH CHECK (true)` — open for admin import scripts.
   - (No user-specific data; this is a shared public catalog.)

5. Full-Text Search
   - `search_vector` column is a tsvector combining test_name, test_code, components, and aliases.
   - A trigger updates search_vector on INSERT/UPDATE automatically.
   - Supports partial matching, abbreviation search, and typo-tolerant queries via trigram + tsvector.
*/

-- Enable trigram extension first (needed for gin_trgm_ops)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TABLE IF NOT EXISTS lab_tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  test_code text UNIQUE NOT NULL,
  test_name text NOT NULL,
  slug text UNIQUE NOT NULL,
  components text DEFAULT '',
  specimen text DEFAULT '',
  method text DEFAULT '',
  comments text DEFAULT '',
  report text DEFAULT '',
  aliases text[] DEFAULT '{}',
  category text DEFAULT '',
  search_vector tsvector,
  created_at timestamptz DEFAULT now()
);

-- Indexes for fast lookups and search
CREATE INDEX IF NOT EXISTS idx_lab_tests_slug ON lab_tests (slug);
CREATE INDEX IF NOT EXISTS idx_lab_tests_test_code ON lab_tests (test_code);
CREATE INDEX IF NOT EXISTS idx_lab_tests_search ON lab_tests USING GIN (search_vector);
CREATE INDEX IF NOT EXISTS idx_lab_tests_name_trgm ON lab_tests USING GIN (test_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_lab_tests_category ON lab_tests (category);

-- Function to auto-update search_vector from test_name, test_code, components, and aliases
CREATE OR REPLACE FUNCTION update_lab_tests_search_vector()
RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.test_name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.test_code, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(array_to_string(NEW.aliases, ' '), '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.components, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to keep search_vector updated
DROP TRIGGER IF EXISTS trg_lab_tests_search_vector ON lab_tests;
CREATE TRIGGER trg_lab_tests_search_vector
BEFORE INSERT OR UPDATE ON lab_tests
FOR EACH ROW EXECUTE FUNCTION update_lab_tests_search_vector();

-- Enable RLS
ALTER TABLE lab_tests ENABLE ROW LEVEL SECURITY;

-- Public read access (no-auth app, shared catalog)
DROP POLICY IF EXISTS "anon_select_lab_tests" ON lab_tests;
CREATE POLICY "anon_select_lab_tests" ON lab_tests FOR SELECT
  TO anon, authenticated USING (true);

-- Open write access for admin import (no-auth app)
DROP POLICY IF EXISTS "anon_insert_lab_tests" ON lab_tests;
CREATE POLICY "anon_insert_lab_tests" ON lab_tests FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_lab_tests" ON lab_tests;
CREATE POLICY "anon_update_lab_tests" ON lab_tests FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_lab_tests" ON lab_tests;
CREATE POLICY "anon_delete_lab_tests" ON lab_tests FOR DELETE
  TO anon, authenticated USING (true);
