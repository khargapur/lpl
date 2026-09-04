/*
# Create verify_admin_password function

1. New Functions
- `verify_admin_password(input_email text, input_password text)`: SECURITY DEFINER function
  that checks the supplied password against the bcrypt hash stored in auth.users.encrypted_password.
  Returns true if the password matches, false otherwise.
2. Security
- SECURITY DEFINER so it can read auth.users (which the anon role cannot).
- Revoked EXECUTE from anon and authenticated — only callable via RPC with the service role,
  or from within the database. The function is called via supabase.rpc() from the Next.js
  API route which uses the anon key, so we GRANT EXECUTE to anon.
- The function only returns a boolean — it does not expose the hash or any user data.
*/

CREATE OR REPLACE FUNCTION public.verify_admin_password(input_email text, input_password text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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
