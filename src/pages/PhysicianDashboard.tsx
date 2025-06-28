
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
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-slate-50'
    }`}>
      {/* Top Navigation */}
      <div className={`sticky top-0 z-50 border-b transition-all duration-300 backdrop-blur-sm ${
        darkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-slate-200'
      }`}>
        <div className="px-8 py-5">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              {activeView === 'tracking' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveView('welcome')}
                  className="mr-3 hover:bg-slate-100 transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              )}
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <div className="w-5 h-5 bg-white rounded-full"></div>
              </div>
              <div>
                <h1 className={`text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Green Dot Health
                </h1>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                  Physician Portal
                </p>
              </div>
            </div>

            {/* Center Stats */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-emerald-600" />
                </div>
                <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {physicianName}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>Queue</span>
                  <div className={`text-sm font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {mockStats.activePatients}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>Time</span>
                  <div className={`text-sm font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative hover:bg-slate-100 transition-colors duration-200"
              >
                <Bell className="w-5 h-5" />
                {mockNotifications.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-orange-500 text-white text-xs animate-pulse">
                    {mockNotifications.length}
                  </Badge>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDarkMode(!darkMode)}
                className="hover:bg-slate-100 transition-colors duration-200"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
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
          <div className="px-8 py-10 space-y-12 max-w-7xl mx-auto">
            {/* Welcome Header */}
            <div className="text-center space-y-6">
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                darkMode ? 'bg-emerald-900/20 text-emerald-300' : 'bg-emerald-50 text-emerald-700'
              }`}>
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                Online & Ready
              </div>
              <h2 className={`text-4xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}, {physicianName}! 👋
              </h2>
              <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                You are a pillar to your community. Let's provide exceptional care with intention today.
              </p>
            </div>

            {/* Priority Focus Area */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  ⭐ Your Focus Areas
                </h3>
                <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Prioritized by urgency and wait time
                </div>
              </div>
              
              {/* Priority Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Awaiting Triage - Highest Priority (Takes 3 columns) */}
                <Card 
                  className={`lg:col-span-3 p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border-l-8 border-l-emerald-700 ${
                    darkMode 
                      ? 'bg-gradient-to-br from-emerald-900/10 to-emerald-800/5 hover:from-emerald-900/20 hover:to-emerald-800/10 border-slate-700' 
                      : 'bg-gradient-to-br from-emerald-50 to-emerald-25 hover:from-emerald-100 hover:to-emerald-50 border-emerald-100 shadow-emerald-100/50'
                  } animate-fade-in`}
                  onClick={() => handleCardClick('triage')}
                >
                  <div className="flex items-start justify-between h-full">
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <Hourglass className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <Badge className="bg-emerald-700 text-white border-0 text-sm px-3 py-1">
                            Priority 1
                          </Badge>
                          <h4 className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                            Awaiting Triage
                          </h4>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-baseline space-x-3">
                          <span className={`text-6xl font-bold ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                            {mockStats.awaitingTriage}
                          </span>
                          <span className={`text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            patients
                          </span>
                        </div>
                        
                        <p className={`text-lg ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          New patients ready for initial assessment
                        </p>
                        
                        <div className={`flex items-center space-x-2 text-emerald-600 font-medium`}>
                          <Clock className="w-5 h-5" />
                          <span>Target: &lt;7 minutes</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-4">
                      <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Highest Priority
                      </div>
                      <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Hourglass className="w-12 h-12 text-emerald-600" />
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Needs Disposition - Second Priority (Takes 2 columns) */}
                <Card 
                  className={`lg:col-span-2 p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-l-6 border-l-mint-500 ${
                    darkMode 
                      ? 'bg-gradient-to-br from-mint-900/10 to-mint-800/5 hover:from-mint-900/20 hover:to-mint-800/10 border-slate-700' 
                      : 'bg-gradient-to-br from-mint-50 to-mint-25 hover:from-mint-100 hover:to-mint-50 border-mint-100 shadow-mint-100/50'
                  } animate-fade-in`}
                  onClick={() => handleCardClick('disposition')}
                  style={{ animationDelay: '0.1s' }}
                >
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-mint-500 rounded-xl flex items-center justify-center shadow-md">
                        <ClipboardCheck className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="bg-mint-600 text-white border-0 px-3 py-1">
                        Priority 2
                      </Badge>
                    </div>
                    
                    <div>
                      <h4 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        Ready for Disposition
                      </h4>
                      <div className="flex items-baseline space-x-2 mb-3">
                        <span className={`text-4xl font-bold ${darkMode ? 'text-mint-300' : 'text-mint-600'}`}>
                          {mockStats.needsDisposition}
                        </span>
                        <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          patients
                        </span>
                      </div>
                      <p className={`text-sm mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        Complete care and discharge planning
                      </p>
                      <div className={`flex items-center text-mint-600 text-sm font-medium`}>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Click to finalize care plans
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Secondary Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Patient Communications */}
              <Card className={`p-8 transition-all duration-300 hover:shadow-lg border-l-4 border-l-sky-400 ${
                darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-sky-25 shadow-sky-100/30'
              } animate-fade-in`} style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center shadow-md">
                      <Inbox className="w-8 h-8 text-sky-600" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <h4 className={`text-xl font-bold ${darkMode ? 'text-sky-300' : 'text-sky-700'}`}>
                          Concierge Inbox
                        </h4>
                        <Badge className="bg-sky-100 text-sky-700 border-sky-200">
                          New Messages
                        </Badge>
                      </div>
                      <div className="flex items-baseline space-x-2">
                        <span className={`text-3xl font-bold ${darkMode ? 'text-sky-400' : 'text-sky-600'}`}>
                          {mockStats.conciergeInbox}
                        </span>
                        <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          patient inquiries
                        </span>
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        Messages awaiting your response
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-sky-300 text-sky-700 hover:bg-sky-50 transition-colors duration-200"
                    disabled
                  >
                    Coming Soon
                  </Button>
                </div>
              </Card>

              {/* Follow-ups */}
              <Card 
                className={`p-8 cursor-pointer transition-all duration-300 hover:shadow-lg border-l-4 border-l-amber-400 ${
                  darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-amber-25 shadow-amber-100/30'
                } animate-fade-in`}
                onClick={() => handleCardClick('followup')}
                style={{ animationDelay: '0.3s' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center shadow-md">
                      <Phone className="w-8 h-8 text-amber-600" />
                    </div>
                    <div className="space-y-2">
                      <h4 className={`text-xl font-bold ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>
                        Scheduled Follow-ups
                      </h4>
                      <div className="flex items-baseline space-x-2">
                        <span className={`text-3xl font-bold ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                          {mockStats.pendingFollowups}
                        </span>
                        <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          due today
                        </span>
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        Patients to contact for check-ins
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-amber-300 text-amber-700 hover:bg-amber-50 transition-colors duration-200"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Review
                  </Button>
                </div>
              </Card>
            </div>

            {/* Today's Achievement */}
            <Card className={`p-10 border-0 ${
              darkMode 
                ? 'bg-gradient-to-r from-emerald-900/20 via-teal-900/20 to-cyan-900/20' 
                : 'bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50'
            } animate-fade-in`} style={{ animationDelay: '0.4s' }}>
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-2xl">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className={`text-3xl font-bold mb-3 ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                    🎉 Consultations Completed Today
                  </h3>
                  <div className={`text-6xl font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'} mb-4`}>
                    {mockStats.consultationsToday}
                  </div>
                  <p className={`text-xl font-semibold ${darkMode ? 'text-emerald-300' : 'text-emerald-700'} mb-2`}>
                    Outstanding work! 🌟
                  </p>
                  <p className={`text-lg ${darkMode ? 'text-slate-300' : 'text-slate-600'} max-w-md mx-auto`}>
                    You're making a real difference in your community with every patient interaction
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
