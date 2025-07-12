import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface ProfileData {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: string;
  created_at: string;
  hint_patients?: {
    hint_patient_id: string;
    first_name: string | null;
    last_name: string | null;
    verification_status: string;
  }[];
  family_contacts?: any[];
}

const ProfileSync = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadUnifiedProfile();
    }
  }, [user]);

  const loadUnifiedProfile = async () => {
    try {
      setLoading(true);
      
      // Get unified profile data from Supabase
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          hint_patients(*),
          family_contacts(*)
        `)
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
      
    } catch (err: any) {
      console.error('Failed to load profile:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="p-4 border rounded-lg">
      <div className="animate-pulse">Loading your healthcare profile...</div>
    </div>
  );

  if (error) return (
    <div className="p-4 border border-red-200 rounded-lg bg-red-50">
      <p className="text-red-600">Error loading profile: {error}</p>
      <button 
        onClick={loadUnifiedProfile}
        className="mt-2 text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
      >
        Retry
      </button>
    </div>
  );

  if (!profile) return (
    <div className="p-4 border rounded-lg">
      <p>No profile found. Try signing up through the unified flow!</p>
    </div>
  );

  const hintPatient = profile.hint_patients?.[0];
  const familyContactCount = profile.family_contacts?.length || 0;

  return (
    <div className="p-4 border rounded-lg bg-green-50">
      <h3 className="font-bold mb-3 text-green-800">🔗 Your Unified Healthcare Profile</h3>
      <div className="space-y-2 text-sm">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><strong>Name:</strong> {profile.full_name || 'Not set'}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone || 'Not set'}</p>
          </div>
          <div>
            <p><strong>Role:</strong> 
              <span className="ml-1 px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                {profile.role}
              </span>
            </p>
            <p><strong>Member Since:</strong> {new Date(profile.created_at).toLocaleDateString()}</p>
            <p><strong>Family Contacts:</strong> {familyContactCount}</p>
          </div>
        </div>
        
        {hintPatient && (
          <div className="mt-3 p-2 bg-blue-50 rounded border-l-4 border-blue-400">
            <p className="text-blue-800"><strong>✅ Connected to Hint Health</strong></p>
            <p className="text-blue-600 text-xs">Patient ID: {hintPatient.hint_patient_id}</p>
            <p className="text-blue-600 text-xs">
              Status: {hintPatient.verification_status}
              {hintPatient.first_name && ` • Name: ${hintPatient.first_name} ${hintPatient.last_name}`}
            </p>
          </div>
        )}
        
        {!hintPatient && (
          <div className="mt-2 p-2 bg-yellow-50 rounded border-l-4 border-yellow-400">
            <p className="text-yellow-800"><strong>⚠️ Not yet connected to Hint Health</strong></p>
            <p className="text-yellow-600 text-xs">Complete signup flow to connect all systems</p>
          </div>
        )}
        
        <div className="mt-3 pt-2 border-t">
          <p className="text-xs text-gray-600">
            🎯 <strong>Systems Integration:</strong> {[
              hintPatient ? 'Hint Health' : null,
              'Supabase Auth',
              familyContactCount > 0 ? 'Family Network' : null
            ].filter(Boolean).join(' + ')} working together
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSync;