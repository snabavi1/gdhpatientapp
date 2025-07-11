
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { getUserProfileData } from '../services/backendApi';
import PersonalWelcomeHero from './PersonalWelcomeHero';
import QuickActionsCard from './QuickActionsCard';
import HealthStatusOverview from './HealthStatusOverview';
import UpcomingCare from './UpcomingCare';
import EmergencySupport from './EmergencySupport';
import PersonalizedCareTips from './PersonalizedCareTips';
import CareStatusCard from './CareStatusCard';
import RecentCommunications from './RecentCommunications';
import FamilyContactsSection from './FamilyContactsSection';

export type CareStatus = 
  | 'consultation-scheduled'
  | 'visit-in-progress'
  | 'additional-testing'
  | 'care-plan-updated'
  | 'care-completed';

interface PatientDashboardProps {
  patientName?: string;
  currentStatus: CareStatus;
  lastUpdated: Date;
  nextAppointment?: Date;
}

interface CommunicationLog {
  id: string;
  communication_type: string;
  provider_type: string;
  status: string;
  created_at: string;
  duration_seconds?: number;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({
  patientName = 'Patient',
  currentStatus,
  lastUpdated,
  nextAppointment
}) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [recentCommunications, setRecentCommunications] = useState<CommunicationLog[]>([]);
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    if (user) {
      loadRecentCommunications();
      loadProfileData();
    }
  }, [user]);

  const loadRecentCommunications = async () => {
    try {
      const { data, error } = await supabase
        .from('communication_logs')
        .select('*')
        .eq('profile_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setRecentCommunications(data || []);
    } catch (error) {
      console.error('Error loading communications:', error);
    }
  };

  const loadProfileData = async () => {
    try {
      if (user?.id) {
        const data = await getUserProfileData(user.id);
        setProfileData(data);
      }
    } catch (error) {
      console.error('Failed to load profile data:', error);
    }
  };

  // Extract first name for personalization
  const firstName = patientName.includes(' ') ? patientName.split(' ')[0] : patientName;

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8 bg-gray-50 min-h-screen">
      {/* Personal Welcome Hero - Top Priority */}
      <PersonalWelcomeHero firstName={firstName} />
      
      {/* Quick Actions - Most Important Feature */}
      <QuickActionsCard />
      
      {/* Main Content - Organized in Priority Order */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Primary Column - Most Important Information */}
        <div className="xl:col-span-2 space-y-8">
          {/* Health Status - Key Information */}
          <HealthStatusOverview />
          
          {/* Care Status */}
          <CareStatusCard
            currentStatus={currentStatus}
            lastUpdated={lastUpdated}
          />
          
          {/* Recent Communications - Secondary Priority */}
          <RecentCommunications communications={recentCommunications} />
          
          {/* Healthcare Profile - Unified Data */}
          {profileData && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Your Healthcare Profile</h3>
              <div className="space-y-2">
                <p><strong>Name:</strong> {profileData.full_name || `${profileData.first_name || ''} ${profileData.last_name || ''}`.trim()}</p>
                <p><strong>Email:</strong> {profileData.email}</p>
                {profileData.phone && <p><strong>Phone:</strong> {profileData.phone}</p>}
                {profileData.date_of_birth && <p><strong>Date of Birth:</strong> {new Date(profileData.date_of_birth).toLocaleDateString()}</p>}
                <p><strong>Role:</strong> {profileData.role}</p>
                {profileData.hint_patients?.[0]?.hint_patient_id && (
                  <p><strong>Hint Patient ID:</strong> {profileData.hint_patients[0].hint_patient_id}</p>
                )}
                {profileData.hint_patients?.[0]?.verification_status && (
                  <p><strong>Verification Status:</strong> {profileData.hint_patients[0].verification_status}</p>
                )}
                <p><strong>Family Contacts:</strong> {profileData.family_contacts?.length || 0}</p>
                <p><strong>Profile Created:</strong> {new Date(profileData.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Secondary Column - Support and Additional Info */}
        <div className="space-y-8">
          {/* Upcoming Care - Important but Secondary */}
          <UpcomingCare />
          
          {/* Personalized Tips - Helpful Content */}
          <PersonalizedCareTips firstName={firstName} />
          
          {/* Family Contacts - Support Network */}
          <FamilyContactsSection />
        </div>
      </div>
      
      {/* Emergency Support - Moved to Bottom */}
      <div className="mt-8">
        <EmergencySupport />
      </div>
    </div>
  );
};

export default PatientDashboard;
