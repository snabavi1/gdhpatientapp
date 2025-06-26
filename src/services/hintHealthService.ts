
import { supabase } from '@/integrations/supabase/client';

export interface HintPatient {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  date_of_birth?: string;
  tags?: string[];
  memberships?: any[];
}

export interface FamilyContact {
  name: string;
  relationship: string;
  phone: string;
  permissions: string[];
}

class HintHealthService {
  private apiUrl = 'https://api.hint.com/api/provider';
  private apiKey: string | null = null;

  constructor() {
    this.initApiKey();
  }

  private async initApiKey() {
    try {
      const { data } = await supabase.functions.invoke('get-secret', {
        body: { name: 'HINT_PARTNER_API_KEY' }
      });
      this.apiKey = data?.value;
    } catch (error) {
      console.error('Failed to initialize Hint API key:', error);
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
      throw new Error(`Hint API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async findPatientByEmail(email: string): Promise<HintPatient | null> {
    try {
      const response = await this.makeRequest(`/patients?email=${encodeURIComponent(email)}`);
      return response.data?.[0] || null;
    } catch (error) {
      console.error('Error finding patient by email:', error);
      return null;
    }
  }

  async createPatient(patientData: {
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
    date_of_birth?: string;
  }): Promise<HintPatient> {
    const response = await this.makeRequest('/patients', {
      method: 'POST',
      body: JSON.stringify(patientData),
    });
    return response.data;
  }

  async addFamilyContactToPatient(patientId: string, contact: FamilyContact): Promise<void> {
    const familyTag = `Family:${contact.name} - ${contact.relationship} - ${contact.phone} - ${contact.permissions.join(',')}`;
    
    await this.makeRequest(`/patients/${patientId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        tags: [familyTag]
      }),
    });
  }

  parseFamilyContactsFromTags(tags: string[]): FamilyContact[] {
    return tags
      .filter(tag => tag.startsWith('Family:'))
      .map(tag => {
        const parts = tag.replace('Family:', '').split(' - ');
        return {
          name: parts[0] || '',
          relationship: parts[1] || '',
          phone: parts[2] || '',
          permissions: parts[3]?.split(',') || []
        };
      });
  }

  async syncPatientToSupabase(hintPatient: HintPatient, profileId: string): Promise<void> {
    const { error } = await supabase
      .from('hint_patients')
      .upsert({
        profile_id: profileId,
        hint_patient_id: hintPatient.id,
        email: hintPatient.email,
        phone: hintPatient.phone,
        first_name: hintPatient.first_name,
        last_name: hintPatient.last_name,
        date_of_birth: hintPatient.date_of_birth,
        hint_tags: hintPatient.tags || [],
        verification_status: 'verified',
        last_sync_at: new Date().toISOString()
      }, {
        onConflict: 'hint_patient_id'
      });

    if (error) {
      console.error('Error syncing patient to Supabase:', error);
      throw error;
    }
  }
}

export const hintHealthService = new HintHealthService();
