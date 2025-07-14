import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CreatePhysicianRequest {
  email: string
  fullName: string
  medicalLicense: string
  specialty: string
  phoneNumber?: string
  emergencyContactName?: string
  emergencyContactRelationship?: string
  emergencyContactPhone?: string
}

interface AddStateLicenseRequest {
  physicianId: string
  stateCode: string
  stateName: string
  licenseNumber: string
  expirationDate: string
  issueDate?: string
}

interface Enable2FARequest {
  userId: string
  secret: string
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const url = new URL(req.url)
    const action = url.searchParams.get('action')

    console.log(`Physician management action: ${action}`)

    switch (action) {
      case 'create_physician': {
        if (req.method !== 'POST') {
          throw new Error('Method not allowed for create_physician')
        }

        const body: CreatePhysicianRequest = await req.json()
        const { 
          email, 
          fullName, 
          medicalLicense, 
          specialty, 
          phoneNumber, 
          emergencyContactName, 
          emergencyContactRelationship, 
          emergencyContactPhone 
        } = body

        if (!email || !fullName || !medicalLicense || !specialty) {
          throw new Error('Missing required fields: email, fullName, medicalLicense, specialty')
        }

        console.log(`Creating physician account for: ${email}`)

        // Call the database function to create physician profile
        const { data: profileResult, error: profileError } = await supabaseClient
          .rpc('create_physician_account', {
            p_email: email,
            p_full_name: fullName,
            p_medical_license: medicalLicense,
            p_specialty: specialty,
            p_phone_number: phoneNumber,
            p_emergency_contact_name: emergencyContactName,
            p_emergency_contact_relationship: emergencyContactRelationship,
            p_emergency_contact_phone: emergencyContactPhone
          })

        if (profileError) {
          console.error('Profile creation error:', profileError)
          throw profileError
        }

        if (profileResult.error) {
          throw new Error(profileResult.message)
        }

        // Create the auth user using Admin API
        const { data: authUser, error: authError } = await supabaseClient.auth.admin.createUser({
          email: email,
          password: profileResult.temporary_password,
          email_confirm: true,
          user_metadata: {
            full_name: fullName,
            role: 'physician',
            medical_license: medicalLicense,
            specialty: specialty
          }
        })

        if (authError) {
          console.error('Auth user creation error:', authError)
          throw authError
        }

        // Update the profile with the correct auth user ID
        const { error: updateError } = await supabaseClient
          .from('profiles')
          .update({ id: authUser.user.id })
          .eq('id', profileResult.user_id)

        if (updateError) {
          console.error('Profile update error:', updateError)
          throw updateError
        }

        console.log(`Physician account created successfully: ${authUser.user.id}`)

        return new Response(
          JSON.stringify({
            success: true,
            user_id: authUser.user.id,
            email: email,
            temporary_password: profileResult.temporary_password,
            message: 'Physician account created successfully. Please share the temporary password securely.'
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        )
      }

      case 'enable_2fa': {
        if (req.method !== 'POST') {
          throw new Error('Method not allowed for enable_2fa')
        }

        const body: Enable2FARequest = await req.json()
        const { userId, secret } = body

        if (!userId || !secret) {
          throw new Error('Missing required fields: userId, secret')
        }

        console.log(`Enabling 2FA for physician: ${userId}`)

        // Call the database function to enable 2FA
        const { data: result, error } = await supabaseClient
          .rpc('enable_physician_2fa', {
            p_user_id: userId,
            p_secret: secret
          })

        if (error) {
          console.error('2FA enablement error:', error)
          throw error
        }

        if (result.error) {
          throw new Error(result.message)
        }

        console.log(`2FA enabled successfully for physician: ${userId}`)

        return new Response(
          JSON.stringify({
            success: true,
            backup_codes: result.backup_codes,
            message: '2FA enabled successfully. Please save these backup codes securely.'
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        )
      }

      case 'list_physicians': {
        if (req.method !== 'GET') {
          throw new Error('Method not allowed for list_physicians')
        }

        console.log('Fetching physician list')

        const { data: physicians, error } = await supabaseClient
          .from('physician_management')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Physician list error:', error)
          throw error
        }

        return new Response(
          JSON.stringify({
            success: true,
            physicians: physicians || []
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        )
      }

      case 'add_state_license': {
        if (req.method !== 'POST') {
          throw new Error('Method not allowed for add_state_license')
        }

        const body: AddStateLicenseRequest = await req.json()
        const { physicianId, stateCode, stateName, licenseNumber, expirationDate, issueDate } = body

        if (!physicianId || !stateCode || !stateName || !licenseNumber || !expirationDate) {
          throw new Error('Missing required fields: physicianId, stateCode, stateName, licenseNumber, expirationDate')
        }

        console.log(`Adding state license for physician: ${physicianId}, state: ${stateCode}`)

        // Call the database function to add state license
        const { data: result, error } = await supabaseClient
          .rpc('add_physician_state_license', {
            p_physician_id: physicianId,
            p_state_code: stateCode,
            p_state_name: stateName,
            p_license_number: licenseNumber,
            p_expiration_date: expirationDate,
            p_issue_date: issueDate || null
          })

        if (error) {
          console.error('State license addition error:', error)
          throw error
        }

        if (result.error) {
          throw new Error(result.message)
        }

        console.log(`State license added successfully for physician: ${physicianId}`)

        return new Response(
          JSON.stringify({
            success: true,
            message: result.message
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        )
      }

      case 'get_expiring_licenses': {
        if (req.method !== 'GET') {
          throw new Error('Method not allowed for get_expiring_licenses')
        }

        const daysAhead = parseInt(url.searchParams.get('days') || '30')

        console.log(`Getting licenses expiring in ${daysAhead} days`)

        const { data: result, error } = await supabaseClient
          .rpc('get_expiring_physician_licenses', {
            p_days_ahead: daysAhead
          })

        if (error) {
          console.error('Expiring licenses error:', error)
          throw error
        }

        return new Response(
          JSON.stringify({
            success: true,
            expiring_licenses: result.expiring_licenses || []
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        )
      }

      case 'verify_2fa': {
        if (req.method !== 'POST') {
          throw new Error('Method not allowed for verify_2fa')
        }

        const body = await req.json()
        const { userId, token } = body

        if (!userId || !token) {
          throw new Error('Missing required fields: userId, token')
        }

        console.log(`Verifying 2FA token for physician: ${userId}`)

        // Get the physician's 2FA secret
        const { data: profile, error: profileError } = await supabaseClient
          .from('profiles')
          .select('two_factor_secret, backup_codes')
          .eq('id', userId)
          .eq('role', 'physician')
          .eq('verified_physician', true)
          .single()

        if (profileError || !profile) {
          throw new Error('Physician not found or not verified')
        }

        // In a real implementation, you would verify the TOTP token here
        // For now, we'll simulate verification
        const isValidToken = token.length === 6 && /^\d+$/.test(token)
        const isBackupCode = profile.backup_codes?.includes(token)

        if (!isValidToken && !isBackupCode) {
          throw new Error('Invalid 2FA token')
        }

        // If it's a backup code, remove it from the list
        if (isBackupCode) {
          const updatedBackupCodes = profile.backup_codes.filter(code => code !== token)
          await supabaseClient
            .from('profiles')
            .update({ backup_codes: updatedBackupCodes })
            .eq('id', userId)
        }

        return new Response(
          JSON.stringify({
            success: true,
            message: '2FA verification successful'
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        )
      }

      default:
        throw new Error(`Unknown action: ${action}`)
    }

  } catch (error) {
    console.error('Physician management error:', error)
    return new Response(
      JSON.stringify({
        error: true,
        message: error.message || 'An unexpected error occurred'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})