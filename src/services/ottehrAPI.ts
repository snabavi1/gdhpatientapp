
// Mock API service for Ottehr/Oystehr integration
// This will be replaced with actual API calls in production

import { Patient } from './mockData';

export interface OttehrResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class OttehrAPIService {
  private baseUrl = 'https://api.ottehr.com/v1'; // Replace with actual Ottehr API URL
  private apiKey: string | null = null;

  constructor() {
    // In production, this would be retrieved from Supabase secrets
    this.apiKey = 'mock-api-key';
  }

  async getActivePatients(): Promise<OttehrResponse<Patient[]>> {
    try {
      // Mock API call - replace with actual Ottehr API
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      
      const { mockPatients } = await import('./mockData');
      return {
        success: true,
        data: mockPatients
      };
    } catch (error) {
      console.error('Error fetching active patients:', error);
      return {
        success: false,
        error: 'Failed to fetch active patients'
      };
    }
  }

  async getPatientDetails(patientId: string): Promise<OttehrResponse<Patient>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const { mockPatients } = await import('./mockData');
      const patient = mockPatients.find(p => p.id === patientId);
      
      if (!patient) {
        return {
          success: false,
          error: 'Patient not found'
        };
      }

      return {
        success: true,
        data: patient
      };
    } catch (error) {
      console.error('Error fetching patient details:', error);
      return {
        success: false,
        error: 'Failed to fetch patient details'
      };
    }
  }

  async getUnreadMessages(): Promise<OttehrResponse<any[]>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Mock message data
      const messages = [
        {
          id: 'msg1',
          patientId: 'P001',
          message: 'My chest pain is getting worse',
          timestamp: new Date(Date.now() - 120000),
          urgent: true
        },
        {
          id: 'msg2',
          patientId: 'P003',
          message: 'When will my lab results be ready?',
          timestamp: new Date(Date.now() - 300000),
          urgent: false
        }
      ];

      return {
        success: true,
        data: messages
      };
    } catch (error) {
      console.error('Error fetching unread messages:', error);
      return {
        success: false,
        error: 'Failed to fetch messages'
      };
    }
  }

  async updatePatientStatus(patientId: string, status: string): Promise<OttehrResponse<boolean>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      console.log(`Updating patient ${patientId} status to: ${status}`);
      
      return {
        success: true,
        data: true
      };
    } catch (error) {
      console.error('Error updating patient status:', error);
      return {
        success: false,
        error: 'Failed to update patient status'
      };
    }
  }
}

export const ottehrAPI = new OttehrAPIService();
