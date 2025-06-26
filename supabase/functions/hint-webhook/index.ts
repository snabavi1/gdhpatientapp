
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const webhookData = await req.json()
    
    // Handle different Hint webhook events
    switch (webhookData.type) {
      case 'patient.created':
      case 'patient.updated':
        await handlePatientEvent(supabase, webhookData)
        break
      case 'membership.created':
      case 'membership.updated':
        await handleMembershipEvent(supabase, webhookData)
        break
      default:
        console.log('Unhandled webhook type:', webhookData.type)
    }

    return new Response(
      JSON.stringify({ received: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

async function handlePatientEvent(supabase: any, webhookData: any) {
  const patient = webhookData.object
  
  // Update or create hint_patients record
  const { error } = await supabase
    .from('hint_patients')
    .upsert({
      hint_patient_id: patient.id,
      email: patient.email,
      phone: patient.phone,
      first_name: patient.first_name,
      last_name: patient.last_name,
      date_of_birth: patient.date_of_birth,
      hint_tags: patient.tags || [],
      verification_status: 'verified',
      last_sync_at: new Date().toISOString()
    }, {
      onConflict: 'hint_patient_id'
    })

  if (error) {
    console.error('Error updating patient:', error)
  }
}

async function handleMembershipEvent(supabase: any, webhookData: any) {
  // Handle membership updates
  console.log('Membership event:', webhookData.type, webhookData.object)
}
