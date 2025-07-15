-- Add missing columns to profiles table for physician functionality
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS phone_number TEXT,
ADD COLUMN IF NOT EXISTS medical_license_number TEXT,
ADD COLUMN IF NOT EXISTS specialty TEXT,
ADD COLUMN IF NOT EXISTS emergency_contact_name TEXT,
ADD COLUMN IF NOT EXISTS emergency_contact_phone TEXT,
ADD COLUMN IF NOT EXISTS emergency_contact_relationship TEXT,
ADD COLUMN IF NOT EXISTS full_name TEXT;

-- Create physician_state_licenses table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.physician_state_licenses (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    physician_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    state_code TEXT NOT NULL,
    state_name TEXT NOT NULL,
    license_number TEXT NOT NULL,
    issue_date DATE,
    expiration_date DATE NOT NULL,
    license_status TEXT DEFAULT 'active'::text,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(physician_id, state_code)
);

-- Enable RLS on physician_state_licenses
ALTER TABLE public.physician_state_licenses ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for physician_state_licenses
CREATE POLICY "Physicians can view their own state licenses" 
ON public.physician_state_licenses 
FOR SELECT 
USING (physician_id IN (
    SELECT profiles.id 
    FROM profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'physician'
));

CREATE POLICY "Physicians can manage their own state licenses" 
ON public.physician_state_licenses 
FOR ALL 
USING (physician_id IN (
    SELECT profiles.id 
    FROM profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'physician' AND profiles.verified_physician = true
));

-- Create the add_physician_state_license function
CREATE OR REPLACE FUNCTION public.add_physician_state_license(
    p_physician_id UUID,
    p_state_code TEXT,
    p_state_name TEXT,
    p_license_number TEXT,
    p_expiration_date DATE,
    p_issue_date DATE DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Verify the physician exists and is verified
    IF NOT EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = p_physician_id AND role = 'physician' AND verified_physician = true
    ) THEN
        RETURN json_build_object(
            'error', true,
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
        'success', true,
        'message', 'State license added successfully'
    );
EXCEPTION
    WHEN unique_violation THEN
        RETURN json_build_object(
            'error', true,
            'message', 'License for this state already exists for this physician'
        );
    WHEN OTHERS THEN
        RETURN json_build_object(
            'error', true,
            'message', SQLERRM
        );
END;
$$;

-- Create trigger for updating updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to physician_state_licenses table
DROP TRIGGER IF EXISTS update_physician_state_licenses_updated_at ON public.physician_state_licenses;
CREATE TRIGGER update_physician_state_licenses_updated_at
    BEFORE UPDATE ON public.physician_state_licenses
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();