
import React from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle, Circle, Clock } from 'lucide-react';

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  status: 'completed' | 'current' | 'upcoming';
  type: 'appointment' | 'test' | 'result' | 'instruction' | 'followup';
}

interface CareTimelineProps {
  events: TimelineEvent[];
}

const CareTimeline: React.FC<CareTimelineProps> = ({ events }) => {
  const getStatusIcon = (status: TimelineEvent['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'current':
        return <Clock className="h-5 w-5 text-healthcare-primary animate-pulse" />;
      case 'upcoming':
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: TimelineEvent['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-600';
      case 'current':
        return 'bg-healthcare-primary';
      case 'upcoming':
        return 'bg-gray-400';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Care Journey</h3>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
        
        {events.map((event, index) => (
          <div key={event.id} className="relative flex items-start space-x-4 pb-8 last:pb-0">
            {/* Timeline dot */}
            <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 border-white ${getStatusColor(event.status)}`}>
              {getStatusIcon(event.status)}
            </div>
            
            {/* Event content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-semibold text-gray-900">
                  {event.title}
                </h4>
                <span className="text-xs text-gray-500">
                  {formatDate(event.date)}
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
    </Card>
  );
};

export default CareTimeline;
