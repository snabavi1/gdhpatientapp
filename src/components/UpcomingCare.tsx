
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


      <div className="text-center p-3 bg-brand-light/20 rounded-lg">
        <p className="text-brand-teal/80 text-sm">
          You're all set! We'll send gentle reminders →
        </p>
      </div>
    </Card>
  );
};

export default UpcomingCare;
