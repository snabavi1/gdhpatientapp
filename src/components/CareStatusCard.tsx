
import React from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle, Clock } from 'lucide-react';
import { CareStatus } from './PatientDashboard';
import GreenDotLogo from './GreenDotLogo';

interface CareStatusCardProps {
  currentStatus: CareStatus;
  lastUpdated: Date;
}

const statusConfig = {
  'consultation-scheduled': {
    icon: CheckCircle,
    title: 'Initial Consultation Scheduled',
    description: 'Your appointment is confirmed and scheduled',
    color: 'text-white',
    bgColor: 'brand-blue-gradient',
    borderColor: 'border-0'
  },
  'visit-in-progress': {
    icon: CheckCircle,
    title: 'Visit In Progress',
    description: 'You are currently in consultation with your provider',
    color: 'text-white',
    bgColor: 'brand-purple-gradient',
    borderColor: 'border-0'
  },
  'additional-testing': {
    icon: Clock,
    title: 'Additional Testing Ordered',
    description: 'Your doctor has ordered additional tests for your care',
    color: 'text-white',
    bgColor: 'brand-peach-gradient',
    borderColor: 'border-0'
  },
  'care-plan-updated': {
    icon: CheckCircle,
    title: 'Care Plan Updated',
    description: 'Your treatment plan has been updated with new instructions',
    color: 'text-white',
    bgColor: 'healthcare-gradient',
    borderColor: 'border-0'
  },
  'care-completed': {
    icon: CheckCircle,
    title: 'Care Completed',
    description: 'Your treatment is complete. Please review your care instructions',
    color: 'text-white',
    bgColor: 'mint-gradient',
    borderColor: 'border-0'
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
    <Card className={`p-6 ${config.bgColor} ${config.borderColor} shadow-lg relative overflow-hidden`}>
      {/* Floating green dot decoration */}
      <div className="absolute top-2 right-2 opacity-20">
        <GreenDotLogo size="md" floating />
      </div>
      
      <div className="flex items-start space-x-4 relative z-10">
        <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
          <IconComponent className={`h-6 w-6 ${config.color}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <GreenDotLogo size="sm" />
            <h2 className={`text-xl font-semibold ${config.color}`}>
              {config.title}
            </h2>
          </div>
          <p className={`${config.color} opacity-90 mb-4`}>
            {config.description}
          </p>
          <div className={`text-sm ${config.color} opacity-75`}>
            Last updated: {formatDate(lastUpdated)}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CareStatusCard;
