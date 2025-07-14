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