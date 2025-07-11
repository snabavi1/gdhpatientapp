import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Clock, Pill, Bell, Calendar, AlertCircle, Check } from 'lucide-react';

const MedicationReminders: React.FC = () => {
  const [dailyReminders, setDailyReminders] = useState(true);
  const [reminderTime, setReminderTime] = useState('09:00');

  // Mock prescription data
  const prescriptions = [
    { name: 'Lisinopril 10mg', nextDose: '9:00 AM', status: 'due', frequency: 'Once daily' },
    { name: 'Metformin 500mg', nextDose: '12:00 PM', status: 'upcoming', frequency: 'Twice daily' },
    { name: 'Vitamin D3', nextDose: 'Tomorrow', status: 'scheduled', frequency: 'Weekly' }
  ];

  const handleReminderToggle = (enabled: boolean) => {
    setDailyReminders(enabled);
    // TODO: Integrate with backend to set up SMS/email reminders
    if (enabled) {
      console.log('Setting up daily medication reminders for', reminderTime);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'due': return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'upcoming': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'scheduled': return <Calendar className="h-4 w-4 text-green-500" />;
      default: return <Check className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'due': return 'bg-orange-100 text-orange-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-white to-primary-peach/5 border-l-4 border-primary-purple shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-primary-purple/10 p-2 rounded-lg mr-3">
            <Pill className="h-6 w-6 text-primary-purple" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-brand-teal">Smart Prescription Manager</h3>
            <p className="text-sm text-brand-teal/60">Your medications at a glance</p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-primary-blue/10 text-primary-blue">
          {prescriptions.length} Active
        </Badge>
      </div>
      
      {/* Current Prescriptions */}
      <div className="space-y-3 mb-6">
        {prescriptions.map((prescription, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-white/70 rounded-lg border border-primary-purple/10">
            <div className="flex items-center space-x-3">
              {getStatusIcon(prescription.status)}
              <div>
                <p className="font-medium text-brand-teal text-sm">{prescription.name}</p>
                <p className="text-xs text-brand-teal/60">{prescription.frequency}</p>
              </div>
            </div>
            <div className="text-right">
              <Badge variant="outline" className={`text-xs ${getStatusColor(prescription.status)}`}>
                {prescription.nextDose}
              </Badge>
            </div>
          </div>
        ))}
      </div>
        
      {/* Reminder Settings */}
      <div className="bg-white/80 p-4 rounded-lg border border-primary-purple/10 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Bell className="h-4 w-4 text-primary-purple" />
            <Label htmlFor="daily-reminders" className="text-sm font-medium text-brand-teal">
              Smart Reminders
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
              Daily Reminder Time
            </Label>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-primary-blue" />
              <input
                id="reminder-time"
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="px-2 py-1 border border-primary-purple/20 rounded text-sm bg-white"
              />
            </div>
            <p className="text-xs text-brand-teal/50">
              Personalized SMS reminders sent daily
            </p>
          </div>
        )}
      </div>
      
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 border-primary-purple/30 text-primary-purple hover:bg-primary-purple/10"
        >
          View All
        </Button>
        <Button 
          size="sm" 
          className="flex-1 bg-primary-purple hover:bg-primary-purple/90"
        >
          Add Prescription
        </Button>
      </div>
    </Card>
  );
};

export default MedicationReminders;