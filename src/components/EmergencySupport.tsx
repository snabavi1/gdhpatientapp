
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Heart, AlertTriangle, HeartHandshake } from 'lucide-react';

const EmergencySupport: React.FC = () => {
  const handleEmergencyCall = (number: string, type: string) => {
    window.open(`tel:${number}`, '_self');
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-red-50 to-pink-50 border-red-200 shadow-sm">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <AlertTriangle className="h-6 w-6 text-red-600" />
        </div>
        <h3 className="text-xl font-semibold text-brand-teal mb-2">
          Emergency Support
        </h3>
        <p className="text-brand-teal/70 text-sm">
          You're never alone - help is always available
        </p>
      </div>
      
      <div className="space-y-3">
        <Button 
          variant="outline"
          className="w-full justify-start border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 py-4 rounded-xl transition-all duration-200"
          onClick={() => handleEmergencyCall('911', 'emergency')}
        >
          <Phone className="mr-3 h-5 w-5" />
          <div className="flex flex-col items-start">
            <span className="font-medium">🚑 Call 911</span>
            <span className="text-xs opacity-70">Police, Fire, or Medical Emergency</span>
          </div>
        </Button>
        
        <Button 
          variant="outline"
          className="w-full justify-start border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 py-4 rounded-xl transition-all duration-200"
          onClick={() => handleEmergencyCall('988', 'crisis')}
        >
          <Heart className="mr-3 h-5 w-5" />
          <div className="flex flex-col items-start">
            <span className="font-medium">💙 Call 988</span>
            <span className="text-xs opacity-70">Suicide & Crisis Lifeline</span>
          </div>
        </Button>
        
        <Button 
          variant="outline"
          className="w-full justify-start border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 py-4 rounded-xl transition-all duration-200"
          onClick={() => handleEmergencyCall('1-800-715-4225', 'mental-health')}
        >
          <HeartHandshake className="mr-3 h-5 w-5" />
          <div className="flex flex-col items-start">
            <span className="font-medium">🧠 Call GCAL</span>
            <span className="text-xs opacity-70">Georgia Mental Health Crisis</span>
          </div>
        </Button>
      </div>
      
      <div className="bg-gradient-to-r from-brand-light to-white p-4 rounded-xl text-center mt-6 border border-brand-secondary/20">
        <p className="text-brand-teal font-medium mb-1">
          💚 After help is on the way, call us too!
        </p>
        <p className="text-brand-teal/70 text-sm mb-2">
          We're here to support you through everything.
        </p>
        <p className="text-brand-primary font-semibold">
          You're not alone - we've got you! ❤️
        </p>
      </div>
    </Card>
  );
};

export default EmergencySupport;
