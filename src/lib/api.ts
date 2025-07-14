// File: src/lib/api.ts
const API_BASE_URL = 'http://localhost:3000';

export const api = {
  // Enhanced signup endpoint
  completeSignup: async (signupData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/complete-signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    });
    return response.json();
  },

  // Other API endpoints
  createPatient: async (patientData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/patients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientData),
    });
    return response.json();
  },
};

export default api;
// Add to src/lib/api.ts for testing
export const testConnection = async () => {
    try {
      const response = await fetch('http://localhost:3000/health');
      const data = await response.json();
      console.log('Backend connection:', data);
      return data;
    } catch (error) {
      console.error('Backend connection failed:', error);
      return null;
    }
  };