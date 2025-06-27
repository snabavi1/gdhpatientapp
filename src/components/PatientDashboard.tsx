import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, FileText, AlertCircle, Calendar, Heart, MessageSquare, Phone, Video, Users, Circle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { blandAIService } from '@/services/blandAIService';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import FamilyContactManager from './FamilyContactManager';
import PersonalWelcomeHero from './PersonalWelcomeHero';
import QuickActionsCard from './QuickActionsCard';
import HealthStatusOverview from './HealthStatusOverview';
import UpcomingCare from './UpcomingCare';
import EmergencySupport from './EmergencySupport';
import PersonalizedCareTips from './PersonalizedCareTips';

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

const statusConfig = {
  'consultation-scheduled': {
    icon: Calendar,
    title: 'Initial Consultation Scheduled',
    description: 'Your appointment is confirmed and scheduled',
    color: 'text-brand-blue',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  'visit-in-progress': {
    icon: Heart,
    title: 'Visit In Progress',
    description: 'You are currently in consultation with your provider',
    color: 'text-brand-primary',
    bgColor: 'bg-brand-light',
    borderColor: 'border-brand-secondary'
  },
  'awaiting-results': {
    icon: Clock,
    title: 'Awaiting Test Results',
    description: 'Your tests have been completed and results are pending',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200'
  },
  'additional-testing': {
    icon: AlertCircle,
    title: 'Additional Testing Ordered',
    description: 'Your doctor has ordered additional tests for your care',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  'care-plan-updated': {
    icon: FileText,
    title: 'Care Plan Updated',
    description: 'Your treatment plan has been updated with new instructions',
    color: 'text-brand-primary',
    bgColor: 'bg-brand-light',
    borderColor: 'border-brand-secondary'
  },
  'care-completed': {
    icon: CheckCircle,
    title: 'Care Completed',
    description: 'Your treatment is complete. Please review your care instructions',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  }
};

const PatientDashboard: React.FC<PatientDashboardProps> = ({
  patientName = 'Patient',
  currentStatus,
  lastUpdated,
  nextAppointment,
  careInstructions = [],
  timelineEvents = []
}) => {
  const config = statusConfig[currentStatus];
  const IconComponent = config.icon;
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [recentCommunications, setRecentCommunications] = useState<CommunicationLog[]>([]);
  const [showFamilyContacts, setShowFamilyContacts] = useState(false);

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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCommunicationIcon = (type: string) => {
    switch (type) {
      case 'voice_call': return Phone;
      case 'sms': return MessageSquare;
      case 'video_call': return Video;
      default: return MessageSquare;
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ${seconds % 60}s`;
  };

  const getTimelineStatusIcon = (status: TimelineEvent['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'current':
        return <Clock className="h-4 w-4 text-brand-primary animate-pulse" />;
      case 'upcoming':
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTimelineStatusColor = (status: TimelineEvent['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-600';
      case 'current':
        return 'bg-brand-primary';
      case 'upcoming':
        return 'bg-gray-400';
    }
  };

  const formatTimelineDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
          
          {/* Family Contact Management */}
          <Card className="p-6 bg-white border-brand-secondary/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-brand-teal">Your support network</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFamilyContacts(!showFamilyContacts)}
                className="border-brand-secondary text-brand-primary hover:bg-brand-light"
              >
                <Users className="h-4 w-4 mr-2" />
                {showFamilyContacts ? 'Hide' : 'Manage'} Family Contacts
              </Button>
            </div>
            
            {!showFamilyContacts && (
              <div className="text-sm text-brand-teal/70">
                <p className="mb-2">👨‍👩‍👧‍👦 Family contacts who can help coordinate your care:</p>
                <p>• Mike (Husband) - Can call, receives updates</p>
                <p>• Emma (Daughter) - Can call</p>
              </div>
            )}
            
            {showFamilyContacts && <FamilyContactManager />}
          </Card>
          
          {/* Current Status Card with Timeline */}
          <Card className={`p-6 ${config.bgColor} ${config.borderColor} border-2`}>
            <div className="flex items-start space-x-4 mb-6">
              <div className={`p-3 rounded-full bg-white ${config.color}`}>
                <IconComponent className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-brand-teal mb-2">
                  {config.title}
                </h2>
                <p className="text-brand-teal/80 mb-4">
                  {config.description}
                </p>
                <div className="text-sm text-brand-teal/60">
                  Last updated: {formatDate(lastUpdated)}
                </div>
              </div>
            </div>

            {/* Care Journey Timeline */}
            {timelineEvents.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-brand-teal mb-4">Your Care Journey</h3>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
                  
                  {timelineEvents.map((event, index) => (
                    <div key={event.id} className="relative flex items-start space-x-4 pb-6 last:pb-0">
                      {/* Timeline dot */}
                      <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 border-white ${getTimelineStatusColor(event.status)}`}>
                        {getTimelineStatusIcon(event.status)}
                      </div>
                      
                      {/* Event content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-semibold text-brand-teal">
                            {event.title}
                          </h4>
                          <span className="text-xs text-brand-teal/60">
                            {formatTimelineDate(event.date)}
                          </span>
                        </div>
                        <p className="text-sm text-brand-teal/70">
                          {event.description}
                        </p>
                        
                        {event.status === 'current' && (
                          <div className="mt-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-primary text-white">
                              In Progress
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Recent Communications */}
      {recentCommunications.length > 0 && (
        <Card className="p-6 bg-white border-brand-secondary/20">
          <div className="flex items-center space-x-3 mb-4">
            <Phone className="h-5 w-5 text-brand-primary" />
            <h3 className="text-lg font-semibold text-brand-teal">Recent Communications</h3>
          </div>
          <div className="space-y-3">
            {recentCommunications.map((comm) => {
              const CommIcon = getCommunicationIcon(comm.communication_type);
              return (
                <div key={comm.id} className="flex items-center justify-between p-3 border border-brand-secondary/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CommIcon className="h-4 w-4 text-brand-secondary" />
                    <div>
                      <span className="text-sm font-medium capitalize text-brand-teal">
                        {comm.communication_type.replace('_', ' ')} - {comm.provider_type}
                      </span>
                      <div className="text-xs text-brand-teal/60">
                        {new Date(comm.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {comm.duration_seconds && (
                      <span className="text-xs text-brand-teal/60">
                        {formatDuration(comm.duration_seconds)}
                      </span>
                    )}
                    <Badge 
                      variant={comm.status === 'completed' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {comm.status}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Care Instructions */}
      {careInstructions.length > 0 && (
        <Card className="p-6 bg-white border-brand-secondary/20">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="h-5 w-5 text-brand-primary" />
            <h3 className="text-lg font-semibold text-brand-teal">Care Instructions</h3>
          </div>
          <div className="space-y-3">
            {careInstructions.map((instruction, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-brand-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-brand-teal/80">{instruction}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button className="flex-1 sm:flex-none bg-brand-primary hover:bg-brand-primary/90">
              Download Full Instructions
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 sm:flex-none border-brand-secondary text-brand-primary hover:bg-brand-light"
            >
              Contact Your Doctor
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PatientDashboard;
