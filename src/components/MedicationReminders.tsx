import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Clock, Pill, Bell } from 'lucide-react';

const MedicationReminders: React.FC = () => {
  const [dailyReminders, setDailyReminders] = useState(false);
  const [reminderTime, setReminderTime] = useState('09:00');

  const handleReminderToggle = (enabled: boolean) => {
    setDailyReminders(enabled);
    // TODO: Integrate with backend to set up SMS/email reminders
    if (enabled) {
      console.log('Setting up daily medication reminders for', reminderTime);
    }
  };

  return (
    <Card className="p-6 bg-white border-brand-secondary/20">
      <div className="flex items-center mb-4">
        <Pill className="h-6 w-6 text-brand-primary mr-3" />
        <h3 className="text-lg font-semibold text-brand-teal">Prescription Reminders</h3>
      </div>
      
      <div className="space-y-4">
        <p className="text-sm text-brand-teal/70">
          We've got you covered with medication management and reminders to help you stay on track with your prescriptions.
        </p>
        
        <div className="bg-brand-light p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4 text-brand-primary" />
              <Label htmlFor="daily-reminders" className="text-sm font-medium">
                Daily Medication Reminders
              </Label>
            </div>
            <Switch
              id="daily-reminders"
              checked={dailyReminders}
              onCheckedChange={handleReminderToggle}
            />
          </div>
          
          {dailyReminders && (
            <div className="space-y-2">
              <Label htmlFor="reminder-time" className="text-xs text-brand-teal/70">
                Reminder Time
              </Label>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-brand-primary" />
                <input
                  id="reminder-time"
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="px-2 py-1 border border-brand-secondary/30 rounded text-sm"
                />
              </div>
              <p className="text-xs text-brand-teal/50">
                You'll receive a daily text reminder at this time
              </p>
            </div>
          )}
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full border-brand-secondary text-brand-primary hover:bg-brand-light"
        >
          View All Prescriptions
        </Button>
      </div>
    </Card>
  );
};

export default MedicationReminders;