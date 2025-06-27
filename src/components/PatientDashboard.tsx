
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import PersonalWelcomeHero from './PersonalWelcomeHero';
import QuickActionsCard from './QuickActionsCard';
import HealthStatusOverview from './HealthStatusOverview';
import UpcomingCare from './UpcomingCare';
import EmergencySupport from './EmergencySupport';
import PersonalizedCareTips from './PersonalizedCareTips';
import CareStatusCard from './CareStatusCard';
import RecentCommunications from './RecentCommunications';
import CareInstructions from './CareInstructions';
import FamilyContactsSection from './FamilyContactsSection';

export type CareStatus = 
  | 'consultation-scheduled'
  | 'visit-in-progress'
  | 'awaiting-results'
  | 'additional-testing'
  | 'care-plan-updated'
  | 'care-completed';

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  status: 'completed' | 'current' | 'upcoming';
  type: 'appointment' | 'test' | 'result' | 'instruction' | 'followup';
}

interface PatientDashboardProps {
  patientName?: string;
  currentStatus: CareStatus;
  lastUpdated: Date;
  nextAppointment?: Date;
  careInstructions?: string[];
  timelineEvents?: TimelineEvent[];
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
  nextAppointment,
  careInstructions = [],
  timelineEvents = []
}) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [recentCommunications, setRecentCommunications] = useState<CommunicationLog[]>([]);

  useEffect(() => {
    if (user) {
      loadRecentCommunications();
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

  // Extract first name for personalization
  const firstName = patientName.includes(' ') ? patientName.split(' ')[0] : patientName;

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* Personal Welcome Hero */}
      <PersonalWelcomeHero firstName={firstName} />
      
      {/* Quick Actions Card */}
      <QuickActionsCard />
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <HealthStatusOverview />
          <UpcomingCare />
          <EmergencySupport />
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          <PersonalizedCareTips firstName={firstName} />
          <FamilyContactsSection />
          <CareStatusCard
            currentStatus={currentStatus}
            lastUpdated={lastUpdated}
            timelineEvents={timelineEvents}
          />
        </div>
      </div>

      {/* Recent Communications */}
      <RecentCommunications communications={recentCommunications} />

      {/* Care Instructions */}
      <CareInstructions instructions={careInstructions} />
    </div>
  );
};

export default PatientDashboard;
