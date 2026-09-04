/*
# Fix verify_admin_password function - schema-qualify crypt()

The crypt() function lives in the extensions schema (pgcrypto), but the
SECURITY DEFINER function sets search_path = public, so crypt() is not
found. Schema-qualify the call as extensions.crypt().
*/

CREATE OR REPLACE FUNCTION public.verify_admin_password(input_email text, input_password text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  stored_hash text;
BEGIN
  SELECT encrypted_password INTO stored_hash
  FROM auth.users
  WHERE email = input_email
  LIMIT 1;

  IF stored_hash IS NULL THEN
    RETURN false;
  END IF;

  RETURN stored_hash = crypt(input_password, stored_hash);
END;
$$;

GRANT EXECUTE ON FUNCTION public.verify_admin_password(text, text) TO anon;
REVOKE EXECUTE ON FUNCTION public.verify_admin_password(text, text) FROM authenticated;
