
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, User, Sun, Moon, Video, Phone, MessageSquare, Clock, AlertTriangle, Users, CheckCircle, Inbox } from 'lucide-react';
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
                    You are a boss and a pillar to your community. Care for your community with intention today.
                  </p>
                </div>
              </Card>

              {/* TOP PRIORITY - Critical Patient Metrics */}
              <Card className={`p-6 border-2 border-red-200 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className={`text-lg font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  🚨 TOP PRIORITY
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-red-900/20' : 'bg-red-50'} border border-red-200`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? 'text-red-300' : 'text-red-700'}`}>
                          Awaiting Triage
                        </p>
                        <p className={`text-3xl font-bold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                          {mockStats.awaitingTriage}
                        </p>
                        <p className="text-xs text-red-500">Patients waiting</p>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-red-500" />
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-orange-900/20' : 'bg-orange-50'} border border-orange-200`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? 'text-orange-300' : 'text-orange-700'}`}>
                          Needs Disposition
                        </p>
                        <p className={`text-3xl font-bold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                          {mockStats.needsDisposition}
                        </p>
                        <p className="text-xs text-orange-500">Ready for discharge</p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-orange-500" />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    onClick={() => setActiveView('tracking')}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Go to Patient Tracking Board
                  </Button>
                </div>
              </Card>

              {/* SECOND PRIORITY - Concierge Inbox */}
              <Card className={`p-6 border-2 border-blue-200 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className={`text-lg font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  📬 CONCIERGE INBOX
                </h3>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} border border-blue-200`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                        Unread Messages
                      </p>
                      <p className={`text-3xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        {mockStats.conciergeInbox}
                      </p>
                      <p className="text-xs text-blue-500">Patient inquiries</p>
                    </div>
                    <Inbox className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="w-full border-blue-500 text-blue-600 hover:bg-blue-50"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Review Concierge Messages (Coming Soon)
                  </Button>
                </div>
              </Card>

              {/* THIRD PRIORITY - Pending Follow-ups */}
              <Card className={`p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className={`text-lg font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  📞 PENDING FOLLOW-UPS
                </h3>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'} border border-yellow-200`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${darkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>
                        Follow-ups Due
                      </p>
                      <p className={`text-3xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                        {mockStats.pendingFollowups}
                      </p>
                      <p className="text-xs text-yellow-500">Patients to contact</p>
                    </div>
                    <Phone className="w-8 h-8 text-yellow-500" />
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="w-full border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Review Follow-ups
                  </Button>
                </div>
              </Card>

              {/* ENCOURAGEMENT - Consultations Completed */}
              <Card className={`p-6 border-2 border-green-200 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="text-center">
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-green-900/20' : 'bg-green-50'} border border-green-200`}>
                    <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
                      🎉 Consultations Completed Today
                    </h3>
                    <p className={`text-4xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                      {mockStats.consultationsToday}
                    </p>
                    <p className={`text-lg font-medium ${darkMode ? 'text-green-300' : 'text-green-700'} mt-2`}>
                      Go you! 🌟
                    </p>
                    <p className="text-sm text-green-500 mt-1">
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
    </div>
  );
};

export default PhysicianDashboard;
