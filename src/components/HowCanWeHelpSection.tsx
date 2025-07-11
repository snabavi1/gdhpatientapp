import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Phone, 
  MessageSquare, 
  Calendar, 
  FileText,
  Shield,
  Pill
} from 'lucide-react';

const HowCanWeHelpSection: React.FC = () => {
  const helpOptions = [
    {
      title: "Talk to Your Doctor",
      description: "Connect with your care team instantly",
      icon: Phone,
      action: "Start Call",
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Send a Message",
      description: "Get answers to quick questions",
      icon: MessageSquare,
      action: "Send Message",
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Schedule Appointment",
      description: "Book your next visit",
      icon: Calendar,
      action: "Schedule",
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "View Records",
      description: "Access your medical history",
      icon: FileText,
      action: "View Records",
      color: "bg-orange-50 text-orange-600"
    },
    {
      title: "Emergency Support",
      description: "Get immediate help",
      icon: Shield,
      action: "Get Help",
      color: "bg-red-50 text-red-600"
    },
    {
      title: "Medication Reminders",
      description: "Never miss a dose",
      icon: Pill,
      action: "Set Reminders",
      color: "bg-indigo-50 text-indigo-600"
    }
  ];

  return (
    <Card className="p-6 bg-white">
      <h2 className="text-xl font-semibold text-brand-teal mb-6">How can we help you today?</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {helpOptions.map((option, index) => {
          const Icon = option.icon;
          
          return (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 border-gray-200 hover:border-brand-secondary"
            >
              <div className={`p-3 rounded-full ${option.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="text-center">
                <p className="font-medium text-sm text-gray-900">{option.title}</p>
                <p className="text-xs text-gray-500">{option.description}</p>
              </div>
            </Button>
          );
        })}
      </div>
    </Card>
  );
};

export default HowCanWeHelpSection;