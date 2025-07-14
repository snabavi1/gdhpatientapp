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