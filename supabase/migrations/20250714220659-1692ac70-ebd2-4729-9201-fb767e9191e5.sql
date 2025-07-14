-- Add physician-specific columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN medical_license_number TEXT,
ADD COLUMN specialty TEXT,
ADD COLUMN verified_physician BOOLEAN DEFAULT FALSE,
ADD COLUMN two_factor_enabled BOOLEAN DEFAULT FALSE,
ADD COLUMN two_factor_secret TEXT,
ADD COLUMN backup_codes TEXT[];

-- Create an index for physician lookups
CREATE INDEX idx_profiles_physician ON public.profiles(verified_physician, role) 
WHERE verified_physician = TRUE AND role = 'physician';

-- Create a function to manually create physician accounts
CREATE OR REPLACE FUNCTION public.create_physician_account(
  p_email TEXT,
  p_full_name TEXT,
  p_medical_license TEXT,
  p_specialty TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_user_id UUID;
  temp_password TEXT;
  result JSON;
BEGIN
  -- Generate a secure temporary password
  temp_password := encode(gen_random_bytes(12), 'base64');
  
  -- Insert into auth.users (this simulates admin user creation)
  -- Note: In production, you'd use Supabase Admin API for this
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    role,
    medical_license_number,
    specialty,
    verified_physician,
    two_factor_enabled
  )
  VALUES (
    gen_random_uuid(),
    p_email,
    p_full_name,
    'physician',
    p_medical_license,
    p_specialty,
    TRUE,
    FALSE
  )
  RETURNING id INTO new_user_id;
  
  -- Return the details for manual setup
  result := json_build_object(
    'user_id', new_user_id,
    'email', p_email,
    'temporary_password', temp_password,
    'message', 'Physician account created. Manual password setup required in Supabase Auth.'
  );
  
  RETURN result;
EXCEPTION
  WHEN OTHERS THEN
    RETURN json_build_object(
      'error', TRUE,
      'message', SQLERRM
    );
END;
$$;

-- Create a function to enable 2FA for physicians
CREATE OR REPLACE FUNCTION public.enable_physician_2fa(
  p_user_id UUID,
  p_secret TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  backup_codes TEXT[];
  i INTEGER;
BEGIN
  -- Generate 10 backup codes
  FOR i IN 1..10 LOOP
    backup_codes := array_append(backup_codes, encode(gen_random_bytes(6), 'hex'));
  END LOOP;
  
  -- Update the physician profile with 2FA settings
  UPDATE public.profiles 
  SET 
    two_factor_enabled = TRUE,
    two_factor_secret = p_secret,
    backup_codes = backup_codes,
    updated_at = NOW()
  WHERE id = p_user_id AND role = 'physician' AND verified_physician = TRUE;
  
  IF NOT FOUND THEN
    RETURN json_build_object(
      'error', TRUE,
      'message', 'Physician not found or not verified'
    );
  END IF;
  
  RETURN json_build_object(
    'success', TRUE,
    'backup_codes', backup_codes,
    'message', '2FA enabled successfully'
  );
END;
$$;

-- Create RLS policies for physician management
CREATE POLICY "Physicians can view their own 2FA settings" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id AND role = 'physician');

CREATE POLICY "Only verified physicians can update their 2FA" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id AND role = 'physician' AND verified_physician = TRUE);

-- Create a view for physician management (admin use)
CREATE OR REPLACE VIEW public.physician_management AS
SELECT 
  id,
  email,
  full_name,
  medical_license_number,
  specialty,
  verified_physician,
  two_factor_enabled,
  created_at,
  updated_at
FROM public.profiles 
WHERE role = 'physician';

-- Grant access to the service role for admin functions
GRANT EXECUTE ON FUNCTION public.create_physician_account TO service_role;
GRANT EXECUTE ON FUNCTION public.enable_physician_2fa TO service_role;