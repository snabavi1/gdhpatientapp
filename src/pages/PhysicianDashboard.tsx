
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import TrackingBoard from '@/components/physician/TrackingBoard';
import NotificationCenter from '@/components/physician/NotificationCenter';
import SimplifiedTopNavigation from '@/components/physician/SimplifiedTopNavigation';
import OptimizedWelcomeView from '@/components/physician/OptimizedWelcomeView';
import ProfileManagement from '@/components/physician/ProfileManagement';

const PhysicianDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeView, setActiveView] = useState<'welcome' | 'tracking' | 'profile'>('welcome');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Updated mock data to reflect new workflow
  const mockStats = {
    activePatients: 8,
    untriagedPatients: 3,
    awaitingFullEvaluation: 1,
    testsInProgress: 1,
    resultsReady: 1,
    conciergeMessages: 2,
    consultationsToday: 12,
    urgentAlerts: 2
  };

  // Mock data - will be replaced with real API calls
  const mockNotifications = [
    {
      id: '1',
      type: 'urgent' as const,
      title: 'Patient Urgent Wait Time',
      message: 'Michael Torres - 9min wait time in triage',
      timestamp: new Date(Date.now() - 60000),
      patientId: 'P002'
    },
    {
      id: '2',
      type: 'results' as const,
      title: 'Test Results Available',
      message: 'Lisa Park - CT scan results ready for review',
      timestamp: new Date(Date.now() - 300000),
      patientId: 'P006'
    }
  ];

  const physicianName = user?.user_metadata?.full_name || 'Dr. Taylor';

  const handleCardClick = (cardType: string) => {
    if (cardType === 'tracking') {
      setActiveView('tracking');
    } else {
      navigate('/physician/trackingboard');
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-slate-50'
    }`}>
      {/* Simplified Top Navigation */}
      <SimplifiedTopNavigation
        physicianName={physicianName}
        darkMode={darkMode}
        activeView={activeView}
        onBackToDashboard={() => setActiveView('welcome')}
      />

      {/* Main Content */}
      <div className="w-full">
        {showNotifications && (
          <NotificationCenter
            notifications={mockNotifications}
            onClose={() => setShowNotifications(false)}
            darkMode={darkMode}
          />
        )}

        {activeView === 'welcome' && (
          <OptimizedWelcomeView
            physicianName={physicianName}
            mockStats={mockStats}
            darkMode={darkMode}
            onCardClick={handleCardClick}
          />
        )}
        
        {activeView === 'tracking' && (
          <TrackingBoard darkMode={darkMode} />
        )}
        
        {activeView === 'profile' && (
          <ProfileManagement darkMode={darkMode} />
        )}
      </div>
    </div>
  );
};

export default PhysicianDashboard;
