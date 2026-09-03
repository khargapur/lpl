-- Revoke direct execution of the trigger function from client roles.
-- This function is only invoked by the database trigger, not via REST RPC.
REVOKE EXECUTE ON FUNCTION public.update_lab_tests_search_vector() FROM anon;
REVOKE EXECUTE ON FUNCTION public.update_lab_tests_search_vector() FROM authenticated;
