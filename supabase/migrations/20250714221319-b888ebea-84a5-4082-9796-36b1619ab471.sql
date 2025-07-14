-- Add phone number and emergency contact to profiles table
ALTER TABLE public.profiles 
ADD COLUMN phone_number TEXT,
ADD COLUMN emergency_contact_name TEXT,
ADD COLUMN emergency_contact_relationship TEXT,
ADD COLUMN emergency_contact_phone TEXT;

-- Create a table for physician state licenses (supporting multiple states)
CREATE TABLE public.physician_state_licenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  physician_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  state_code TEXT NOT NULL, -- e.g., 'CA', 'NY', 'TX'
  state_name TEXT NOT NULL, -- e.g., 'California', 'New York', 'Texas'
  license_number TEXT NOT NULL,
  issue_date DATE,
  expiration_date DATE NOT NULL,
  license_status TEXT DEFAULT 'active' CHECK (license_status IN ('active', 'expired', 'suspended', 'revoked')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure one license per state per physician
  UNIQUE(physician_id, state_code)
);

-- Enable RLS on the state licenses table
ALTER TABLE public.physician_state_licenses ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for state licenses
CREATE POLICY "Physicians can view their own state licenses" 
ON public.physician_state_licenses 
FOR SELECT 
USING (
  physician_id IN (
    SELECT id FROM public.profiles 
    WHERE id = auth.uid() AND role = 'physician'
  )
);

CREATE POLICY "Physicians can manage their own state licenses" 
ON public.physician_state_licenses 
FOR ALL 
USING (
  physician_id IN (
    SELECT id FROM public.profiles 
    WHERE id = auth.uid() AND role = 'physician' AND verified_physician = TRUE
  )
);

-- Create an index for efficient lookups
CREATE INDEX idx_physician_state_licenses_physician ON public.physician_state_licenses(physician_id);
CREATE INDEX idx_physician_state_licenses_expiration ON public.physician_state_licenses(expiration_date) 
WHERE license_status = 'active';

-- Create a trigger to update the updated_at timestamp
CREATE TRIGGER update_physician_state_licenses_updated_at
BEFORE UPDATE ON public.physician_state_licenses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Update the create_physician_account function to include new fields
CREATE OR REPLACE FUNCTION public.create_physician_account(
  p_email TEXT,
  p_full_name TEXT,
  p_medical_license TEXT,
  p_specialty TEXT,
  p_phone_number TEXT DEFAULT NULL,
  p_emergency_contact_name TEXT DEFAULT NULL,
  p_emergency_contact_relationship TEXT DEFAULT NULL,
  p_emergency_contact_phone TEXT DEFAULT NULL
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
  
  -- Insert into profiles with new fields
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    role,
    medical_license_number,
    specialty,
    phone_number,
    emergency_contact_name,
    emergency_contact_relationship,
    emergency_contact_phone,
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
    p_phone_number,
    p_emergency_contact_name,
    p_emergency_contact_relationship,
    p_emergency_contact_phone,
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

-- Create a function to add state licenses for physicians
CREATE OR REPLACE FUNCTION public.add_physician_state_license(
  p_physician_id UUID,
  p_state_code TEXT,
  p_state_name TEXT,
  p_license_number TEXT,
  p_issue_date DATE DEFAULT NULL,
  p_expiration_date DATE
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Verify the physician exists and is verified
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = p_physician_id AND role = 'physician' AND verified_physician = TRUE
  ) THEN
    RETURN json_build_object(
      'error', TRUE,
      'message', 'Physician not found or not verified'
    );
  END IF;
  
  -- Insert the state license
  INSERT INTO public.physician_state_licenses (
    physician_id,
    state_code,
    state_name,
    license_number,
    issue_date,
    expiration_date
  )
  VALUES (
    p_physician_id,
    UPPER(p_state_code),
    p_state_name,
    p_license_number,
    p_issue_date,
    p_expiration_date
  );
  
  RETURN json_build_object(
    'success', TRUE,
    'message', 'State license added successfully'
  );
EXCEPTION
  WHEN unique_violation THEN
    RETURN json_build_object(
      'error', TRUE,
      'message', 'License for this state already exists for this physician'
    );
  WHEN OTHERS THEN
    RETURN json_build_object(
      'error', TRUE,
      'message', SQLERRM
    );
END;
$$;

-- Create a function to get expiring licenses (for compliance notifications)
CREATE OR REPLACE FUNCTION public.get_expiring_physician_licenses(
  p_days_ahead INTEGER DEFAULT 30
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  expiring_licenses JSON;
BEGIN
  SELECT json_agg(
    json_build_object(
      'physician_id', psl.physician_id,
      'physician_name', p.full_name,
      'physician_email', p.email,
      'physician_phone', p.phone_number,
      'state_code', psl.state_code,
      'state_name', psl.state_name,
      'license_number', psl.license_number,
      'expiration_date', psl.expiration_date,
      'days_until_expiration', psl.expiration_date - CURRENT_DATE
    )
  ) INTO expiring_licenses
  FROM public.physician_state_licenses psl
  JOIN public.profiles p ON psl.physician_id = p.id
  WHERE psl.license_status = 'active'
    AND psl.expiration_date <= CURRENT_DATE + INTERVAL '1 day' * p_days_ahead
    AND psl.expiration_date > CURRENT_DATE
  ORDER BY psl.expiration_date ASC;
  
  RETURN json_build_object(
    'success', TRUE,
    'expiring_licenses', COALESCE(expiring_licenses, '[]'::json)
  );
END;
$$;

-- Update the physician management view to include new fields
DROP VIEW IF EXISTS public.physician_management;
CREATE OR REPLACE VIEW public.physician_management AS
SELECT 
  p.id,
  p.email,
  p.full_name,
  p.medical_license_number,
  p.specialty,
  p.phone_number,
  p.emergency_contact_name,
  p.emergency_contact_relationship,
  p.emergency_contact_phone,
  p.verified_physician,
  p.two_factor_enabled,
  p.created_at,
  p.updated_at,
  COUNT(psl.id) as state_license_count,
  STRING_AGG(psl.state_code, ', ' ORDER BY psl.state_code) as licensed_states
FROM public.profiles p
LEFT JOIN public.physician_state_licenses psl ON p.id = psl.physician_id AND psl.license_status = 'active'
WHERE p.role = 'physician'
GROUP BY p.id, p.email, p.full_name, p.medical_license_number, p.specialty, 
         p.phone_number, p.emergency_contact_name, p.emergency_contact_relationship, 
         p.emergency_contact_phone, p.verified_physician, p.two_factor_enabled, 
         p.created_at, p.updated_at;

-- Grant permissions on new functions
GRANT EXECUTE ON FUNCTION public.add_physician_state_license TO service_role;
GRANT EXECUTE ON FUNCTION public.get_expiring_physician_licenses TO service_role;