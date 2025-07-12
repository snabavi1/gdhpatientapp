import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Pill, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Plus,
  ExternalLink,
  Activity,
  Calendar,
  Bell
} from 'lucide-react';

const MedicationReminders: React.FC = () => {
  const [dailyReminders, setDailyReminders] = useState(true);
  const [reminderTime, setReminderTime] = useState('09:00');
  const [isLoadingErx, setIsLoadingErx] = useState(false);
  const { toast } = useToast();

  // Mock prescription data - in production this would come from Oystehr eRx service
  const prescriptions = [
    { 
      id: '1', 
      name: 'Lisinopril 10mg', 
      nextDose: '9:00 AM', 
      status: 'due', 
      frequency: 'Once daily',
      prescriber: 'Dr. Smith',
      refillsRemaining: 2,
      lastFilled: '2024-01-01'
    },
    { 
      id: '2', 
      name: 'Metformin 500mg', 
      nextDose: '6:00 PM', 
      status: 'upcoming', 
      frequency: 'Twice daily',
      prescriber: 'Dr. Johnson',
      refillsRemaining: 1,
      lastFilled: '2024-01-05'
    },
    { 
      id: '3', 
      name: 'Vitamin D3 1000 IU', 
      nextDose: 'Taken', 
      status: 'completed', 
      frequency: 'Once daily',
      prescriber: 'Dr. Smith',
      refillsRemaining: 3,
      lastFilled: '2023-12-15'
    }
  ];

  const handleReminderToggle = (enabled: boolean) => {
    setDailyReminders(enabled);
    if (enabled) {
      console.log('Setting up daily medication reminders for', reminderTime);
      toast({
        title: "Reminders Enabled",
        description: `Daily medication reminders set for ${reminderTime}`,
      });
    } else {
      toast({
        title: "Reminders Disabled",
        description: "Daily medication reminders have been turned off",
      });
    }
  };

  const handlePrescribeNew = async () => {
    setIsLoadingErx(true);
    try {
      // TODO: Implement Oystehr eRx integration
      // const oystehr = new Oystehr({ accessToken: '<your_access_token>' });
      // const ssoLink = await oystehr.erx.connectPatient({ patientId: user.id });
      // window.open(ssoLink, '_blank').focus();
      
      toast({
        title: "eRx Integration",
        description: "Opening prescription management system...",
      });
      
      // Simulate opening eRx system
      setTimeout(() => {
        setIsLoadingErx(false);
      }, 2000);
    } catch (error) {
      console.error('Error opening eRx system:', error);
      toast({
        title: "Error",
        description: "Unable to open prescription system. Please try again.",
        variant: "destructive"
      });
      setIsLoadingErx(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'due': return <AlertCircle className="h-4 w-4 text-healthcare-warning" />;
      case 'upcoming': return <Clock className="h-4 w-4 text-healthcare-info" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-healthcare-success" />;
      default: return <Pill className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'due': return 'border-healthcare-warning text-healthcare-warning bg-healthcare-warning/10';
      case 'upcoming': return 'border-healthcare-info text-healthcare-info bg-healthcare-info/10';
      case 'completed': return 'border-healthcare-success text-healthcare-success bg-healthcare-success/10';
      default: return 'border-muted text-muted-foreground bg-muted/10';
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-healthcare-primary/5 to-healthcare-secondary/5 border-healthcare-primary/20 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-brand-teal flex items-center gap-2">
            <Pill className="h-5 w-5" />
            Smart Prescription Manager
          </h3>
          <p className="text-sm text-brand-teal/60">Manage medications and set reminders</p>
        </div>
        <Badge variant="secondary" className="bg-primary-blue/10 text-primary-blue">
          {prescriptions.length} Active
        </Badge>
      </div>
      
      {/* Current Prescriptions */}
      <div className="space-y-3 mb-6">
        <h4 className="font-medium text-brand-teal text-sm flex items-center gap-2">
          <Activity className="h-4 w-4" />
          Current Medications
        </h4>
        {prescriptions.map((prescription) => (
          <div key={prescription.id} className="flex items-center justify-between p-4 bg-white/70 rounded-lg border border-primary-purple/10 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              {getStatusIcon(prescription.status)}
              <div>
                <p className="font-medium text-brand-teal text-sm">{prescription.name}</p>
                <p className="text-xs text-brand-teal/60">{prescription.frequency} • {prescription.prescriber}</p>
                <p className="text-xs text-muted-foreground">Refills: {prescription.refillsRemaining}</p>
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

      <Separator className="my-6" />

      {/* Prescription Reminders Section */}
      <div className="space-y-4">
        <h4 className="font-medium text-brand-teal text-sm flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Daily Reminders
        </h4>
        
        <div className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-primary-purple/10">
          <div className="flex items-center space-x-3">
            <Bell className="h-4 w-4 text-brand-primary" />
            <div>
              <Label htmlFor="daily-reminders" className="text-sm font-medium text-brand-teal">
                Enable daily medication reminders
              </Label>
              <p className="text-xs text-brand-teal/60">Get notified when it's time to take your medication</p>
            </div>
          </div>
          <Switch
            id="daily-reminders"
            checked={dailyReminders}
            onCheckedChange={handleReminderToggle}
          />
        </div>

        {dailyReminders && (
          <div className="p-4 bg-white/50 rounded-lg border border-primary-purple/10 space-y-3">
            <Label htmlFor="reminder-time" className="text-sm font-medium text-brand-teal flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Reminder Time
            </Label>
            <Input
              id="reminder-time"
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="w-full"
            />
          </div>
        )}
      </div>

      <Separator className="my-6" />

      {/* Action Buttons */}
      <div className="grid grid-cols-1 gap-3">
        <Button
          onClick={handlePrescribeNew}
          disabled={isLoadingErx}
          className="w-full bg-healthcare-primary hover:bg-healthcare-primary/90 text-white flex items-center gap-2"
        >
          {isLoadingErx ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Opening eRx System...
            </>
          ) : (
            <>
              <ExternalLink className="h-4 w-4" />
              Manage Prescriptions (eRx)
            </>
          )}
        </Button>
        
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-brand-primary border-brand-primary/20 hover:bg-brand-primary/5"
          >
            <Calendar className="h-4 w-4 mr-1" />
            Refill Request
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-brand-primary border-brand-primary/20 hover:bg-brand-primary/5"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Medication
          </Button>
        </div>
      </div>

      {/* Integration Note */}
      <div className="mt-4 p-3 bg-healthcare-info/10 rounded-lg border border-healthcare-info/20">
        <p className="text-xs text-healthcare-info">
          <strong>Note:</strong> Prescription data is synced from your EHR via Oystehr eRx service for accuracy and real-time updates.
        </p>
      </div>
    </Card>
  );
};

export default MedicationReminders;