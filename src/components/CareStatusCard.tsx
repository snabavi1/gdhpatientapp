
import React from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle, Clock } from 'lucide-react';
import { CareStatus } from './PatientDashboard';

interface CareStatusCardProps {
  currentStatus: CareStatus;
  lastUpdated: Date;
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
  lastUpdated
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

  return (
    <Card className={`p-6 ${config.bgColor} ${config.borderColor} border-2`}>
      <div className="flex items-start space-x-4">
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
    </Card>
  );
};

export default CareStatusCard;
