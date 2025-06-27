
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Pill, Clock, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UpcomingCare: React.FC = () => {
  const { toast } = useToast();

  const handleReschedule = () => {
    toast({
      title: "Reschedule Request",
      description: "We'll contact you to reschedule your appointment.",
    });
  };

  const handleAddToCalendar = () => {
    toast({
      title: "Added to Calendar",
      description: "Your appointment has been added to your calendar.",
    });
  };

  const handleRefillRequest = () => {
    toast({
      title: "Refill Requested",
      description: "We'll process your prescription refill request.",
    });
  };

  const handleSetReminders = () => {
    toast({
      title: "Reminders Set",
      description: "You'll receive automatic refill reminders.",
    });
  };

  return (
    <Card className="p-6 bg-white border-brand-secondary/20">
      <h3 className="text-xl font-semibold text-brand-teal mb-4">
        We've got you covered
      </h3>
      
      {/* Next Appointment */}
      <div className="mb-6 p-4 bg-brand-light/30 rounded-lg">
        <div className="flex items-start gap-3 mb-3">
          <Calendar className="h-5 w-5 text-brand-primary mt-1" />
          <div className="flex-1">
            <p className="font-medium text-brand-teal">Next appointment: March 15, 2:30 PM</p>
            <p className="text-brand-teal/70 text-sm">Annual checkup with Dr. Martinez</p>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <Button 
            variant="outline" 
            size="sm"
            className="border-brand-secondary text-brand-primary hover:bg-brand-light"
            onClick={handleReschedule}
          >
            Reschedule if needed
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="border-brand-secondary text-brand-primary hover:bg-brand-light"
            onClick={handleAddToCalendar}
          >
            Add to Calendar
          </Button>
        </div>
      </div>

      {/* Prescription Reminders */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Pill className="h-5 w-5 text-brand-primary" />
          <h4 className="font-medium text-brand-teal">Prescription reminders:</h4>
        </div>
        
        <div className="space-y-3 ml-7">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-brand-teal font-medium">• Metformin - Take with breakfast</p>
            <Button 
              variant="link" 
              size="sm" 
              className="text-brand-blue p-0 h-auto text-sm"
              onClick={handleSetReminders}
            >
              📱 Set up automatic refill reminders
            </Button>
          </div>
          
          <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <p className="text-brand-teal font-medium">• Lisinopril - Refill needed by March 20</p>
            <Button 
              variant="link" 
              size="sm" 
              className="text-brand-blue p-0 h-auto text-sm"
              onClick={handleRefillRequest}
            >
              [Request refill through Concierge]
            </Button>
          </div>
        </div>
      </div>

      <div className="text-center p-3 bg-brand-light/20 rounded-lg">
        <p className="text-brand-teal/80 text-sm">
          You're all set! We'll send gentle reminders →
        </p>
      </div>
    </Card>
  );
};

export default UpcomingCare;
