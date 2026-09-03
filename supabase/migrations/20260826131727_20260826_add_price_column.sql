-- Add price column to lab_tests
ALTER TABLE lab_tests ADD COLUMN IF NOT EXISTS price integer;

-- Grant SELECT on the new column to anon and authenticated
GRANT SELECT (price) ON lab_tests TO anon;
GRANT SELECT (price) ON lab_tests TO authenticated;
