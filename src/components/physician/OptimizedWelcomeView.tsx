import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Users, 
  MessageSquare, 
  FileText, 
  ArrowRight, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  Trophy,
  Heart
} from 'lucide-react';

interface MockStats {
  untriagedPatients: number;
  awaitingFullEvaluation: number;
  testsInProgress: number;
  resultsReady: number;
  conciergeMessages: number;
  consultationsToday: number;
}

interface OptimizedWelcomeViewProps {
  physicianName: string;
  mockStats: MockStats;
  darkMode: boolean;
  onCardClick: (cardType: string) => void;
}

const OptimizedWelcomeView: React.FC<OptimizedWelcomeViewProps> = ({
  physicianName,
  mockStats,
  darkMode,
  onCardClick
}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Morning';
    if (hour < 17) return 'Afternoon';
    return 'Evening';
  };

  const inspirationalQuotes = [
    "Healing is a matter of time, but it is sometimes also a matter of opportunity.",
    "The art of medicine consists of amusing the patient while nature cures the disease.",
    "To cure sometimes, to relieve often, to comfort always.",
    "The best doctor gives the least medicines.",
    "Medicine is not only a science; it is also an art."
  ];

  const randomQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];

  // Mock recent patients data
  const recentPatients = [
    { id: 'P001', name: 'Sarah Johnson', age: 34, condition: 'Chest Pain', time: '2 hours ago', status: 'discharged' },
    { id: 'P002', name: 'Michael Torres', age: 45, condition: 'Abdominal Pain', time: '3 hours ago', status: 'unsigned_notes' },
    { id: 'P003', name: 'Lisa Chen', age: 28, condition: 'Migraine', time: '4 hours ago', status: 'follow_up' },
  ];

  const urgentMessages = [
    { id: 'M001', patient: 'Robert Kim', message: 'Follow-up question about discharge instructions', time: '23h left' },
    { id: 'M002', patient: 'Emma Wilson', message: 'Insurance authorization needed', time: '18h left' },
  ];

  return (
    <div className="px-8 py-10 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Header with Inspiration */}
      <div className="text-center space-y-6">
        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
          darkMode ? 'bg-emerald-900/20 text-emerald-300' : 'bg-emerald-50 text-emerald-700'
        }`}>
          <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
          Online & Ready
        </div>
        <h2 className={`text-4xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Good {getGreeting()}, {physicianName}! 👋
        </h2>
        <p className={`text-lg italic max-w-3xl mx-auto leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          "{randomQuote}"
        </p>
        <div className="flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              {mockStats.consultationsToday} patients helped today
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Making a difference
            </span>
          </div>
        </div>
      </div>

      {/* Priority 1: Quick Tracking Board Preview */}
      <div className="space-y-4">
        <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          🎯 Priority Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card 
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-l-4 border-l-red-500 ${
              darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-slate-50'
            }`}
            onClick={() => onCardClick('untriaged')}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      Untriaged Patients
                    </h4>
                    <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Immediate attention needed
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">{mockStats.untriagedPatients}</div>
                  <Badge variant="destructive" className="mt-1">Urgent</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-l-4 border-l-amber-500 ${
              darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-slate-50'
            }`}
            onClick={() => onCardClick('results')}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      Results Ready
                    </h4>
                    <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Lab & imaging results
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-amber-600">{mockStats.resultsReady}</div>
                  <Badge variant="secondary" className="mt-1">Review</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Button 
          onClick={() => onCardClick('tracking')} 
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
        >
          View Full Tracking Board
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Priority 2: Concierge Inbox */}
      <div className="space-y-4">
        <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          💬 Concierge Inbox
        </h3>
        <Card className={`border-l-4 border-l-blue-500 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <span>Urgent Messages</span>
              </CardTitle>
              <Badge variant="outline" className="bg-orange-100 text-orange-700">
                24hr Response Required
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {urgentMessages.map((message) => (
                <div key={message.id} className={`p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        {message.patient}
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {message.message}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {message.time}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => onCardClick('concierge')}
            >
              View All Messages ({mockStats.conciergeMessages})
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Priority 3: Recent Patient Activity */}
      <div className="space-y-4">
        <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          📋 Your Recent Patients
        </h3>
        <Card className={`${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentPatients.map((patient) => (
                <div key={patient.id} className={`flex items-center justify-between p-4 rounded-lg border ${
                  darkMode ? 'bg-gray-700 border-gray-600' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        {patient.name}, {patient.age}
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {patient.condition} • {patient.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {patient.status === 'discharged' && (
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Discharged
                      </Badge>
                    )}
                    {patient.status === 'unsigned_notes' && (
                      <Badge variant="destructive">
                        <FileText className="w-3 h-3 mr-1" />
                        Notes Pending
                      </Badge>
                    )}
                    {patient.status === 'follow_up' && (
                      <Badge variant="secondary">
                        <Clock className="w-3 h-3 mr-1" />
                        Follow-up
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OptimizedWelcomeView;