
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { getUserProfileData } from '../services/backendApi';
import PersonalWelcomeHero from './PersonalWelcomeHero';
import PatientSidebar from './PatientSidebar';
import HowCanWeHelpSection from './HowCanWeHelpSection';
import UpcomingCare from './UpcomingCare';
import EmergencySupport from './EmergencySupport';

import CareStatusCard from './CareStatusCard';
import RecentCommunications from './RecentCommunications';
import FamilyContactsSection from './FamilyContactsSection';
import MedicationReminders from './MedicationReminders';
import ProfileSync from './ProfileSync';

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
  console.log('PatientDashboard component initializing...');
  const { toast } = useToast();
  const { user } = useAuth();
  const [recentCommunications, setRecentCommunications] = useState<CommunicationLog[]>([]);
  const [profileData, setProfileData] = useState<any>(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
  console.log('PatientDashboard rendering with firstName:', firstName);

  const renderDashboardContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <>
            {/* Personal Welcome Hero */}
            <PersonalWelcomeHero firstName={firstName} />
            
            {/* How Can We Help Today */}
            <HowCanWeHelpSection />
            
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Primary Column */}
              <div className="xl:col-span-2 space-y-8">
                {/* Care Status */}
                <CareStatusCard
                  currentStatus={currentStatus}
                  lastUpdated={lastUpdated}
                />
                
                {/* Recent Communications */}
                <RecentCommunications communications={recentCommunications} />
                
              </div>
              
              {/* Secondary Column */}
              <div className="space-y-8">
                {/* Upcoming Care */}
                <UpcomingCare />
                
                {/* Smart Prescription Manager */}
                <MedicationReminders />
                
                {/* Unified Profile Data */}
                <ProfileSync />
              </div>
            </div>
          </>
        );
      
      case 'care-status':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-brand-teal">Care Status</h1>
            {currentStatus === 'visit-in-progress' ? (
              <CareStatusCard currentStatus={currentStatus} lastUpdated={lastUpdated} />
            ) : (
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-2 text-brand-teal">Current Status</h3>
                <p className="text-gray-600">You have no active visits with us right now.</p>
                <p className="text-sm text-gray-500 mt-2">
                  When you start a visit with us, your care status will appear here.
                </p>
              </div>
            )}
            <RecentCommunications communications={recentCommunications} />
          </div>
        );
      
      case 'appointments':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-brand-teal">Appointments</h1>
            <UpcomingCare />
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500">Appointment scheduling integration coming soon...</p>
            </div>
          </div>
        );
      
      case 'medical-records':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-brand-teal">Medical Records</h1>
            <div className="grid gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-2">Lab Results</h3>
                <p className="text-gray-500">No recent lab results available</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-2">Imaging Results</h3>
                <p className="text-gray-500">No recent imaging results available</p>
              </div>
            </div>
          </div>
        );
      
      case 'updates':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-brand-teal">Green Dot Post Updates</h1>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Wellness Tips</h3>
              <p className="text-gray-500">New physician advice and wellness updates coming soon...</p>
            </div>
          </div>
        );
      
      case 'support-network':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-brand-teal">Your Support Network</h1>
            <FamilyContactsSection />
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Emergency Consent Management</h3>
              <p className="text-gray-500 mb-4">
                Control who can be contacted and what information they can receive during medical emergencies.
              </p>
              <button className="text-brand-primary hover:underline text-sm">
                Manage Emergency Contacts & Permissions
              </button>
            </div>
          </div>
        );
      
      default:
        return <div>Section not found</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <PatientSidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        hasActiveVisit={currentStatus === 'visit-in-progress'}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      {/* Main Content */}
      <div className="flex-1 p-6 space-y-8">
        {renderDashboardContent()}
        
        {/* Emergency Support - Always Available */}
        {activeSection === 'dashboard' && (
          <div className="mt-8">
            <EmergencySupport />
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
