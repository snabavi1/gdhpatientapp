
import React from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle, Clock, Circle } from 'lucide-react';
import { CareStatus } from './PatientDashboard';

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  status: 'completed' | 'current' | 'upcoming';
  type: 'appointment' | 'test' | 'result' | 'instruction' | 'followup';
}

interface CareStatusCardProps {
  currentStatus: CareStatus;
  lastUpdated: Date;
  timelineEvents: TimelineEvent[];
}

const statusConfig = {
  'consultation-scheduled': {
    icon: CheckCircle,
    title: 'Initial Consultation Scheduled',
    description: 'Your appointment is confirmed and scheduled',
    color: 'text-brand-blue',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  'visit-in-progress': {
    icon: CheckCircle,
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
    icon: Clock,
    title: 'Additional Testing Ordered',
    description: 'Your doctor has ordered additional tests for your care',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  'care-plan-updated': {
    icon: CheckCircle,
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

const CareStatusCard: React.FC<CareStatusCardProps> = ({
  currentStatus,
  lastUpdated,
  timelineEvents
}) => {
  const config = statusConfig[currentStatus];
  const IconComponent = config.icon;

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

  return (
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
  );
};

export default CareStatusCard;
