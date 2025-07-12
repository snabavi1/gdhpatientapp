export const unifiedSignup = async (signupData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  planId: string;
  userType: 'patient' | 'physician';
}) => {
  try {
    // Call your working unified backend
    const response = await fetch('http://localhost:3000/api/complete-signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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