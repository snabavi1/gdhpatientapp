import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import SimplifiedTopNavigation from '@/components/physician/SimplifiedTopNavigation';
import ProfileManagement from '@/components/physician/ProfileManagement';

const PhysicianProfile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [darkMode] = useState(false); // You can implement dark mode toggle later

  useEffect(() => {
    if (!user) {
      navigate('/physician/auth');
    }
  }, [user, navigate]);

  const handleBackToDashboard = () => {
    navigate('/physician');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-lg text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-slate-50'}`}>
      <SimplifiedTopNavigation
        physicianName={user.user_metadata?.full_name || user.email || 'Physician'}
        darkMode={darkMode}
        activeView="profile"
        onBackToDashboard={handleBackToDashboard}
      />
      <ProfileManagement darkMode={darkMode} />
    </div>
  );
};

export default PhysicianProfile;