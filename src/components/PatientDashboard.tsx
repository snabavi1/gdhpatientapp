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
    color: 'text-healthcare-ocean',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  'visit-in-progress': {
    icon: Heart,
    title: 'Visit In Progress',
    description: 'You are currently in consultation with your provider',
    color: 'text-healthcare-primary',
    bgColor: 'bg-mint-50',
    borderColor: 'border-mint-200'
  },
  'awaiting-results': {
    icon: Clock,
    title: 'Awaiting Test Results',
    description: 'Your tests have been completed and results are pending',
    color: 'text-peach-500',
    bgColor: 'bg-peach-50',
    borderColor: 'border-peach-200'
  },
  'additional-testing': {
    icon: AlertCircle,
    title: 'Additional Testing Ordered',
    description: 'Your doctor has ordered additional tests for your care',
    color: 'text-olive-600',
    bgColor: 'bg-olive-50',
    borderColor: 'border-olive-200'
  },
  'care-plan-updated': {
    icon: FileText,
    title: 'Care Plan Updated',
    description: 'Your treatment plan has been updated with new instructions',
    color: 'text-healthcare-primary',
    bgColor: 'bg-mint-50',
    borderColor: 'border-mint-200'
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

  const handleTalkToDoctor = async () => {
    setLoading({ ...loading, doctor: true });
    
    try {
      const result = await blandAIService.initiateProviderCall({
        patientId: user?.id || '',
        providerType: 'doctor',
        urgency: 'medium'
      });

      if (result.success) {
        toast({
          title: "Connecting to Doctor",
          description: "Please wait while we connect you with a healthcare provider.",
        });
        
        // Refresh communications after a delay
        setTimeout(() => {
          loadRecentCommunications();
        }, 2000);
      } else {
        toast({
          title: "Connection Failed",
          description: "Unable to connect right now. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initiate call. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading({ ...loading, doctor: false });
    }
  };

  const handleConcierge = async () => {
    setLoading({ ...loading, concierge: true });
    
    try {
      const result = await blandAIService.sendSMS({
        patientPhone: user?.phone || '',
        message: "Hello! This is Green Dot Health concierge. How can I assist you today?",
        conversationType: 'concierge'
      });

      if (result.success) {
        toast({
          title: "Message Sent",
          description: "Our concierge will respond to you shortly via SMS.",
        });
      } else {
        // Fallback to phone call
        window.open('tel:470-470-9108', '_self');
      }
    } catch (error) {
      // Fallback to phone call
      window.open('tel:470-470-9108', '_self');
    } finally {
      setLoading({ ...loading, concierge: false });
    }
  };

  const handleVideoCall = () => {
    // Integrate with Doxy.me or similar video platform
    toast({
      title: "Video Call",
      description: "Video consultation feature coming soon!",
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
        return <Clock className="h-4 w-4 text-healthcare-primary animate-pulse" />;
      case 'upcoming':
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTimelineStatusColor = (status: TimelineEvent['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-600';
      case 'current':
        return 'bg-healthcare-primary';
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

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Welcome back, {patientName}
        </h1>
        
        {/* Enhanced Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 hover-lift cursor-pointer bg-healthcare-primary/5 border-healthcare-primary/20" onClick={handleTalkToDoctor}>
            <div className="text-center">
              <div className="w-16 h-16 bg-healthcare-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-lg">Talk to Doctor</h4>
              <p className="text-sm text-gray-600">Medical consultation</p>
              {loading.doctor && <div className="mt-2 text-xs text-healthcare-primary">Connecting...</div>}
            </div>
          </Card>
          
          <Card className="p-6 hover-lift cursor-pointer bg-peach-50 border-peach-200" onClick={handleConcierge}>
            <div className="text-center">
              <div className="w-16 h-16 bg-peach-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-lg">Text Concierge</h4>
              <p className="text-sm text-gray-600">Administrative help</p>
              {loading.concierge && <div className="mt-2 text-xs text-peach-500">Sending...</div>}
            </div>
          </Card>

          <Card className="p-6 hover-lift cursor-pointer bg-mint-50 border-mint-200" onClick={handleVideoCall}>
            <div className="text-center">
              <div className="w-16 h-16 bg-healthcare-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-lg">Video Visit</h4>
              <p className="text-sm text-gray-600">Face-to-face consultation</p>
            </div>
          </Card>

          <Card className="p-6 hover-lift cursor-pointer bg-olive-50 border-olive-200" onClick={() => setShowFamilyContacts(!showFamilyContacts)}>
            <div className="text-center">
              <div className="w-16 h-16 bg-olive-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-lg">Family Access</h4>
              <p className="text-sm text-gray-600">Authorized contacts</p>
            </div>
          </Card>

          {nextAppointment && (
            <Card className="p-6 hover-lift cursor-pointer bg-mint-50 border-mint-200 sm:col-span-2 lg:col-span-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-healthcare-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 text-lg">Next Appointment</h4>
                <p className="text-sm text-gray-600">{formatDate(nextAppointment)}</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Family Contact Management */}
      {showFamilyContacts && (
        <FamilyContactManager />
      )}

      {/* Current Status Card with Timeline */}
      <Card className={`p-6 ${config.bgColor} ${config.borderColor} border-2`}>
        <div className="flex items-start space-x-4 mb-6">
          <div className={`p-3 rounded-full bg-white ${config.color}`}>
            <IconComponent className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {config.title}
            </h2>
            <p className="text-gray-700 mb-4">
              {config.description}
            </p>
            <div className="text-sm text-gray-600">
              Last updated: {formatDate(lastUpdated)}
            </div>
          </div>
        </div>

        {/* Care Journey Timeline */}
        {timelineEvents.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Care Journey</h3>
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
                      <h4 className="text-sm font-semibold text-gray-900">
                        {event.title}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {formatTimelineDate(event.date)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {event.description}
                    </p>
                    
                    {event.status === 'current' && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-healthcare-primary text-white">
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

      {/* Recent Communications */}
      {recentCommunications.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Phone className="h-5 w-5 text-healthcare-primary" />
            <h3 className="text-lg font-semibold text-gray-900">Recent Communications</h3>
          </div>
          <div className="space-y-3">
            {recentCommunications.map((comm) => {
              const CommIcon = getCommunicationIcon(comm.communication_type);
              return (
                <div key={comm.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CommIcon className="h-4 w-4 text-gray-500" />
                    <div>
                      <span className="text-sm font-medium capitalize">
                        {comm.communication_type.replace('_', ' ')} - {comm.provider_type}
                      </span>
                      <div className="text-xs text-gray-500">
                        {new Date(comm.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {comm.duration_seconds && (
                      <span className="text-xs text-gray-500">
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
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="h-5 w-5 text-healthcare-primary" />
            <h3 className="text-lg font-semibold text-gray-900">Care Instructions</h3>
          </div>
          <div className="space-y-3">
            {careInstructions.map((instruction, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-healthcare-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700">{instruction}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button className="flex-1 sm:flex-none">
              Download Full Instructions
            </Button>
            <Button variant="outline" className="flex-1 sm:flex-none" onClick={handleTalkToDoctor}>
              Contact Your Doctor
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PatientDashboard;
