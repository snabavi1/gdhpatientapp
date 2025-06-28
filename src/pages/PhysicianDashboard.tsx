
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, User, Sun, Moon, Clock, Users, CheckCircle, Inbox, ArrowLeft, Hourglass, ClipboardCheck, Phone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import TrackingBoard from '@/components/physician/TrackingBoard';
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
    urgentAlerts: 2,
    awaitingTriage: 4,
    needsDisposition: 2,
    conciergeInbox: 7
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

  const handleCardClick = (cardType: string) => {
    setActiveView('tracking');
  };

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
              {activeView === 'tracking' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveView('welcome')}
                  className="mr-2"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Dashboard
                </Button>
              )}
              <div className="w-8 h-8 bg-healthcare-primary rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div>
                <h1 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Green Dot Health
                </h1>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Physician Portal
                </p>
              </div>
            </div>

            {/* Center Stats */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-healthcare-primary" />
                <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {physicianName}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-green-600" />
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Queue: {mockStats.activePatients}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-green-600" />
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
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-orange-500 text-white text-xs">
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
      <div className="w-full">
        {showNotifications && (
          <NotificationCenter
            notifications={mockNotifications}
            onClose={() => setShowNotifications(false)}
            darkMode={darkMode}
          />
        )}

        {activeView === 'welcome' ? (
          <div className="p-6 space-y-8 max-w-6xl mx-auto">
            {/* Welcome Header */}
            <Card className={`p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="text-center">
                <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  🌟 Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}, {physicianName}!
                </h2>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  You are a boss and a pillar to your community. Care for your community with intention today.
                </p>
              </div>
            </Card>

            {/* Current Priorities - Redesigned for visual hierarchy */}
            <div className="space-y-6">
              <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                ⭐ Current Priorities
              </h3>
              
              {/* Top Priority - Awaiting Triage (Larger, Dark Green) */}
              <Card 
                className={`p-8 cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 border-2 bg-gradient-to-br from-green-800 to-green-700 text-white ${darkMode ? 'hover:from-green-700 hover:to-green-600' : ''}`}
                onClick={() => handleCardClick('triage')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <Hourglass className="w-8 h-8" />
                      <Badge className="bg-white/20 text-white border-white/30">
                        Priority 1
                      </Badge>
                    </div>
                    <p className="text-xl font-semibold mb-2">
                      Awaiting Triage
                    </p>
                    <p className="text-5xl font-bold mb-3">
                      {mockStats.awaitingTriage}
                    </p>
                    <p className="text-green-100 mb-4">Patients waiting for initial assessment</p>
                    <div className="flex items-center text-green-100">
                      <Clock className="w-4 h-4 mr-2" />
                      Click to review and prioritize
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                      <Hourglass className="w-8 h-8" />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Second Priority - Needs Disposition (Medium size, Mint Green) */}
              <Card 
                className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 border-2 bg-gradient-to-br from-green-400 to-green-500 text-white ${darkMode ? 'hover:from-green-300 hover:to-green-400' : ''}`}
                onClick={() => handleCardClick('disposition')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <ClipboardCheck className="w-6 h-6" />
                      <Badge className="bg-white/20 text-white border-white/30">
                        Priority 2
                      </Badge>
                    </div>
                    <p className="text-lg font-semibold mb-2">
                      Ready for Disposition
                    </p>
                    <p className="text-3xl font-bold mb-2">
                      {mockStats.needsDisposition}
                    </p>
                    <p className="text-green-100 mb-3">Complete care and discharge planning</p>
                    <div className="flex items-center text-green-100">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Click to finalize patient care
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                      <ClipboardCheck className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Patient Communications - Clean, Professional */}
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                📬 Patient Communications
              </h3>
              <Card className={`p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-2 border-cyan-200 hover:shadow-md transition-shadow duration-200`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                      <Inbox className="w-6 h-6 text-cyan-600" />
                    </div>
                    <div>
                      <p className={`text-lg font-semibold ${darkMode ? 'text-cyan-300' : 'text-cyan-700'}`}>
                        Concierge Inbox
                      </p>
                      <p className={`text-2xl font-bold ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
                        {mockStats.conciergeInbox}
                      </p>
                      <p className="text-cyan-500 text-sm">Patient inquiries awaiting response</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-cyan-500 text-cyan-600 hover:bg-cyan-50"
                  >
                    Review Messages (Coming Soon)
                  </Button>
                </div>
              </Card>
            </div>

            {/* Follow-ups - Warm, Friendly */}
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                📞 Scheduled Follow-ups
              </h3>
              <Card 
                className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-md ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-amber-50'} border-2 border-amber-200`}
                onClick={() => handleCardClick('followup')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <p className={`text-lg font-semibold ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>
                        Pending Follow-ups
                      </p>
                      <p className={`text-2xl font-bold ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                        {mockStats.pendingFollowups}
                      </p>
                      <p className="text-amber-600 text-sm">Patients to contact today</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-amber-500 text-amber-600 hover:bg-amber-50"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Review Follow-ups
                  </Button>
                </div>
              </Card>
            </div>

            {/* Encouragement Section - Celebration */}
            <Card className={`p-8 border-2 border-emerald-200 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="text-center">
                <div className={`p-6 rounded-xl ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'} border border-emerald-200`}>
                  <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                    🎉 Consultations Completed Today
                  </h3>
                  <p className={`text-5xl font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'} mb-4`}>
                    {mockStats.consultationsToday}
                  </p>
                  <p className={`text-xl font-semibold ${darkMode ? 'text-emerald-300' : 'text-emerald-700'} mb-2`}>
                    Go you! 🌟
                  </p>
                  <p className="text-emerald-600">
                    You're making a real difference in your community
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <TrackingBoard darkMode={darkMode} />
        )}
      </div>
    </div>
  );
};

export default PhysicianDashboard;
