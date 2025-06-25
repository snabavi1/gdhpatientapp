
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, FileText, AlertCircle, Calendar, Heart, MessageSquare, Phone } from 'lucide-react';

export type CareStatus = 
  | 'consultation-scheduled'
  | 'visit-in-progress'
  | 'awaiting-results'
  | 'additional-testing'
  | 'care-plan-updated'
  | 'care-completed';

interface PatientDashboardProps {
  patientName?: string;
  currentStatus: CareStatus;
  lastUpdated: Date;
  nextAppointment?: Date;
  careInstructions?: string[];
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
  careInstructions = []
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

  const handleTalkToDoctor = () => {
    // Scroll to or navigate to the Talk to Doctor section
    const talkToDoctorSection = document.querySelector('[data-section="talk-to-doctor"]');
    if (talkToDoctorSection) {
      talkToDoctorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConcierge = () => {
    window.open('tel:470-470-9108', '_self');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Welcome back, {patientName}
        </h1>
        
        {/* Quick Actions - Primary Focus */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 hover-lift cursor-pointer bg-healthcare-primary/5 border-healthcare-primary/20" onClick={handleTalkToDoctor}>
            <div className="text-center">
              <div className="w-16 h-16 bg-healthcare-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-lg">Talk to Doctor</h4>
              <p className="text-sm text-gray-600">Start a consultation now</p>
            </div>
          </Card>
          
          <Card className="p-6 hover-lift cursor-pointer bg-peach-50 border-peach-200" onClick={handleConcierge}>
            <div className="text-center">
              <div className="w-16 h-16 bg-peach-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-lg">Concierge</h4>
              <p className="text-sm text-gray-600">Non-urgent assistance</p>
            </div>
          </Card>

          {nextAppointment && (
            <Card className="p-6 hover-lift cursor-pointer bg-mint-50 border-mint-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-healthcare-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 text-lg">Next Appointment</h4>
                <p className="text-xs text-gray-600">{formatDate(nextAppointment)}</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Current Status Card */}
      <Card className={`p-6 ${config.bgColor} ${config.borderColor} border-2`}>
        <div className="flex items-start space-x-4">
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
      </Card>

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
