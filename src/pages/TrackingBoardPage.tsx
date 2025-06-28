
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import TrackingBoard from '@/components/physician/TrackingBoard';
import TopNavigation from '@/components/physician/TopNavigation';

const TrackingBoardPage: React.FC = () => {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);

  const physicianName = user?.user_metadata?.full_name || 'Dr. Taylor';

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-slate-50'
    }`}>
      {/* Top Navigation */}
      <TopNavigation
        physicianName={physicianName}
        currentTime={new Date()}
        darkMode={darkMode}
        showNotifications={showNotifications}
        untriagedPatients={0}
        notificationCount={0}
        activeView="tracking"
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onToggleNotifications={() => setShowNotifications(!showNotifications)}
        onBackToDashboard={() => window.history.back()}
      />

      {/* Tracking Board */}
      <TrackingBoard darkMode={darkMode} />
    </div>
  );
};

export default TrackingBoardPage;
