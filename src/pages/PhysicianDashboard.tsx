import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, User, Sun, Moon, Video, Phone, MessageSquare, Clock, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import TrackingBoard from '@/components/physician/TrackingBoard';
import WelcomeStats from '@/components/physician/WelcomeStats';
import NotificationCenter from '@/components/physician/NotificationCenter';

const PhysicianDashboard: React.FC = () => {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeView, setActiveView] = useState<'welcome' | 'tracking'>('welcome');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Mock data - will be replaced with real API calls
  const mockStats = {
    activePatients: 6,
    pendingFollowups: 3,
    consultationsToday: 12,
    urgentAlerts: 2
  };

  const mockNotifications = [
    {
      id: '1',
      type: 'urgent' as const,
      title: 'Patient Backup Due',
      message: 'Michael Torres - 6min wait time',
      timestamp: new Date(Date.now() - 60000),
      patientId: 'P002'
    },
    {
      id: '2',
      type: 'results' as const,
      title: 'Lab Results Available',
      message: 'Lisa Park - CT scan results ready',
      timestamp: new Date(Date.now() - 300000),
      patientId: 'P005'
    }
  ];

  const physicianName = user?.user_metadata?.full_name || 'Dr. Taylor';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Top Navigation */}
      <div className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div>
                <h1 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  CareCommand
                </h1>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Physician Portal
                </p>
              </div>
            </div>

            {/* Center Stats */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-brand-primary" />
                <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {physicianName}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Queue: {mockStats.activePatients}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {currentTime.toLocaleTimeString()}
                </span>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative"
              >
                <Bell className="w-4 h-4" />
                {mockNotifications.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    {mockNotifications.length}
                  </Badge>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar Navigation */}
        <div className={`w-64 min-h-screen border-r transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="p-4 space-y-2">
            <Button
              variant={activeView === 'welcome' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveView('welcome')}
            >
              Welcome Dashboard
            </Button>
            <Button
              variant={activeView === 'tracking' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveView('tracking')}
            >
              Patient Tracking Board
            </Button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {showNotifications && (
            <NotificationCenter
              notifications={mockNotifications}
              onClose={() => setShowNotifications(false)}
              darkMode={darkMode}
            />
          )}

          {activeView === 'welcome' ? (
            <div className="p-6 space-y-6">
              {/* Welcome Header */}
              <Card className={`p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="text-center">
                  <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    🌟 Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}, {physicianName}!
                  </h2>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Ready to provide exceptional care today
                  </p>
                </div>
              </Card>

              {/* Stats Overview */}
              <WelcomeStats stats={mockStats} darkMode={darkMode} />

              {/* Quick Actions */}
              <Card className={`p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => setActiveView('tracking')}
                    className="bg-brand-primary hover:bg-brand-primary/90 text-white p-6 h-auto flex-col"
                  >
                    <AlertTriangle className="w-6 h-6 mb-2" />
                    <span>View Patient Queue</span>
                    <span className="text-xs opacity-80">
                      {mockStats.activePatients} patients waiting
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    className="p-6 h-auto flex-col"
                  >
                    <Video className="w-6 h-6 mb-2" />
                    <span>Start Video Call</span>
                    <span className="text-xs opacity-60">
                      Connect with patient
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    className="p-6 h-auto flex-col"
                  >
                    <MessageSquare className="w-6 h-6 mb-2" />
                    <span>Review Messages</span>
                    <span className="text-xs opacity-60">
                      Check patient communications
                    </span>
                  </Button>
                </div>
              </Card>
            </div>
          ) : (
            <TrackingBoard darkMode={darkMode} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PhysicianDashboard;
