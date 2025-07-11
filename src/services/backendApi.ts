// Backend API service for unified signup
const API_BASE_URL = 'http://localhost:3000'; // Your Cursor backend

export interface UnifiedSignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  planId: string;
  userType: 'patient' | 'physician'; // Add user type
}

export interface SignupResponse {
  success: boolean;
  message: string;
  userId: string;
  hintPatientId: string;
  oystehrPatientId: string | null;
  membershipPlan: string;
}

// Unified signup that creates user in all systems
export const completeUnifiedSignup = async (signupData: UnifiedSignupData): Promise<SignupResponse> => {
  try {
    console.log('🔗 Calling unified signup API:', API_BASE_URL);
    
    const response = await fetch(`${API_BASE_URL}/api/complete-signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(signupData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Signup failed');
    }

    const result = await response.json();
    console.log('✅ Unified signup successful:', result);
    return result;
    
  } catch (error) {
    console.error('❌ Unified signup failed:', error);
    throw error;
  }
};

// Get user profile with all related data
export const getUserProfileData = async (userId: string) => {
  const { supabase } = await import('../integrations/supabase/client');
  
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      *,
      family_contacts(*),
      hint_patients(*),
      communication_logs(*),
      sms_conversations(*)
    `)
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};