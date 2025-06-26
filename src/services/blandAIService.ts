
import { supabase } from '@/integrations/supabase/client';

export interface CallConfig {
  patientId: string;
  providerType: 'doctor' | 'concierge' | 'emergency';
  patientPhone?: string;
  urgency?: 'low' | 'medium' | 'high';
}

export interface SMSConfig {
  patientPhone: string;
  message: string;
  conversationType: 'concierge' | 'appointment' | 'general';
}

class BlandAIService {
  private apiUrl = 'https://api.bland.ai/v1';
  private apiKey: string | null = null;

  constructor() {
    this.initApiKey();
  }

  private async initApiKey() {
    try {
      const { data } = await supabase.functions.invoke('get-secret', {
        body: { name: 'BLAND_AI_API_KEY' }
      });
      this.apiKey = data?.value;
    } catch (error) {
      console.error('Failed to initialize Bland AI API key:', error);
    }
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    if (!this.apiKey) {
      await this.initApiKey();
    }

    const response = await fetch(`${this.apiUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Bland AI API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async initiateProviderCall(config: CallConfig): Promise<{ callId: string; success: boolean }> {
    try {
      const callData = {
        phone_number: this.getProviderNumber(config.providerType),
        task: this.getCallTask(config.providerType, config.patientId),
        webhook: `${window.location.origin}/api/webhooks/bland/call-complete`,
        record: true,
        max_duration: 30,
        request_data: {
          patient_id: config.patientId,
          provider_type: config.providerType,
          urgency: config.urgency || 'medium'
        }
      };

      const response = await this.makeRequest('/calls', {
        method: 'POST',
        body: JSON.stringify(callData)
      });

      // Log the call initiation
      await this.logCommunication({
        profileId: config.patientId,
        type: 'voice_call',
        providerType: config.providerType,
        externalId: response.call_id,
        direction: 'outbound',
        status: 'initiated'
      });

      return {
        callId: response.call_id,
        success: true
      };
    } catch (error) {
      console.error('Error initiating provider call:', error);
      return { callId: '', success: false };
    }
  }

  async sendSMS(config: SMSConfig): Promise<{ success: boolean; conversationId?: string }> {
    try {
      const smsData = {
        user_number: config.patientPhone,
        agent_number: this.getConciergeNumber(),
        agent_message: config.message,
        request_data: {
          conversation_type: config.conversationType
        }
      };

      const response = await this.makeRequest('/sms/send', {
        method: 'POST',
        body: JSON.stringify(smsData)
      });

      return {
        success: true,
        conversationId: response.conversation_id
      };
    } catch (error) {
      console.error('Error sending SMS:', error);
      return { success: false };
    }
  }

  async send2FACode(phoneNumber: string): Promise<{ success: boolean; code?: string }> {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    try {
      await this.sendSMS({
        patientPhone: phoneNumber,
        message: `Your Green Dot Health verification code is: ${code}. This code expires in 10 minutes.`,
        conversationType: 'general'
      });

      return { success: true, code };
    } catch (error) {
      console.error('Error sending 2FA code:', error);
      return { success: false };
    }
  }

  private getProviderNumber(providerType: string): string {
    // In production, these would come from environment variables
    const numbers = {
      doctor: '+1234567890',
      concierge: '+1234567891',
      emergency: '+1234567892'
    };
    return numbers[providerType as keyof typeof numbers] || numbers.concierge;
  }

  private getConciergeNumber(): string {
    return '+1234567891'; // This would come from environment variables
  }

  private getCallTask(providerType: string, patientId: string): string {
    const tasks = {
      doctor: `Connect with patient ${patientId} for medical consultation. Provide professional medical guidance and determine if further care is needed.`,
      concierge: `Assist patient ${patientId} with administrative needs, appointment scheduling, or general healthcare questions.`,
      emergency: `URGENT: Connect with patient ${patientId} for emergency medical assessment. Prioritize immediate medical needs.`
    };
    return tasks[providerType as keyof typeof tasks] || tasks.concierge;
  }

  private async logCommunication(data: {
    profileId: string;
    type: string;
    providerType: string;
    externalId: string;
    direction: string;
    status: string;
  }) {
    try {
      await supabase.from('communication_logs').insert({
        profile_id: data.profileId,
        communication_type: data.type,
        provider_type: data.providerType,
        external_id: data.externalId,
        direction: data.direction,
        status: data.status
      });
    } catch (error) {
      console.error('Error logging communication:', error);
    }
  }
}

export const blandAIService = new BlandAIService();
