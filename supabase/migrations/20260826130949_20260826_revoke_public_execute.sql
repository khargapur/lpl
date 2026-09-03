-- Revoke PUBLIC execute access on the trigger function.
-- The function is only called by the database trigger, never via REST RPC.
REVOKE EXECUTE ON FUNCTION public.update_lab_tests_search_vector() FROM PUBLIC;
