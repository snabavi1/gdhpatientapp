
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Heart, AlertTriangle, HeartHandshake } from 'lucide-react';

const EmergencySupport: React.FC = () => {
  const handleEmergencyCall = (number: string, type: string) => {
    window.open(`tel:${number}`, '_self');
  };

  return (
    <Card className="p-6 bg-brand-pink border-brand-pink shadow-lg">
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold text-brand-teal mb-2 flex items-center justify-center gap-2">
          🚨 Emergency Support - You're Never Alone
        </h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="font-medium text-brand-teal mb-3">For immediate emergencies:</p>
          
          <div className="space-y-2">
            <Button 
              variant="outline"
              className="w-full justify-start border-red-200 text-red-700 hover:bg-red-50"
              onClick={() => handleEmergencyCall('911', 'emergency')}
            >
              <Phone className="mr-3 h-4 w-4" />
              🚑 Call 911 - Police, Fire, or Medical Emergency
            </Button>
            
            <Button 
              variant="outline"
              className="w-full justify-start border-blue-200 text-blue-700 hover:bg-blue-50"
              onClick={() => handleEmergencyCall('988', 'crisis')}
            >
              <Heart className="mr-3 h-4 w-4" />
              💙 Call 988 - Suicide & Crisis Lifeline
            </Button>
            
            <Button 
              variant="outline"
              className="w-full justify-start border-purple-200 text-purple-700 hover:bg-purple-50"
              onClick={() => handleEmergencyCall('1-800-715-4225', 'mental-health')}
            >
              <HeartHandshake className="mr-3 h-4 w-4" />
              🧠 Call GCAL - Georgia Mental Health Crisis
            </Button>
          </div>
        </div>
        
        <div className="bg-white/50 p-4 rounded-lg text-center">
          <p className="text-brand-teal font-medium mb-2">
            💚 After help is on the way, call us too!
          </p>
          <p className="text-brand-teal/80 text-sm mb-2">
            We're here to support you through everything.
          </p>
          <p className="text-brand-teal font-medium">
            You're not alone - we've got you! ❤️
          </p>
        </div>
      </div>
    </Card>
  );
};

export default EmergencySupport;
