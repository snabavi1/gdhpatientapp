
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
    
    // Handle Bland AI webhook events
    if (webhookData.call_id) {
      await handleCallComplete(supabase, webhookData)
    } else if (webhookData.conversation_id) {
      await handleSMSUpdate(supabase, webhookData)
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

async function handleCallComplete(supabase: any, data: any) {
  // Update communication log with call completion data
  const { error } = await supabase
    .from('communication_logs')
    .update({
      status: 'completed',
      duration_seconds: data.call_length,
      summary: data.summary,
      metadata: {
        analysis: data.analysis,
        transcript: data.transcript
      },
      updated_at: new Date().toISOString()
    })
    .eq('external_id', data.call_id)

  if (error) {
    console.error('Error updating call log:', error)
  }
}

async function handleSMSUpdate(supabase: any, data: any) {
  // Handle SMS conversation updates
  const { error } = await supabase
    .from('sms_messages')
    .insert({
      conversation_id: data.conversation_id,
      external_message_id: data.message_id,
      direction: 'inbound',
      message_content: data.user_message,
      sender_phone: data.user_number,
      recipient_phone: data.agent_number,
      status: 'delivered',
      metadata: data.metadata || {}
    })

  if (error) {
    console.error('Error logging SMS:', error)
  }
}
