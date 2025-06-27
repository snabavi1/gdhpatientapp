
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Heart, AlertTriangle, Brain } from 'lucide-react';

const EmergencySupport: React.FC = () => {
  const handleEmergencyCall = (number: string, type: string) => {
    window.open(`tel:${number}`, '_self');
  };

  const handleWebsiteLink = () => {
    window.open('https://www.georgiacollaborative.com', '_blank');
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
      
      <div className="space-y-4">
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
        
        {/* Improved GCAL Section */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-200">
          <div className="flex items-start space-x-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-full">
              <Brain className="h-5 w-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-brand-teal mb-2">
                Need Immediate Mental Health Help?
              </h4>
              <p className="text-brand-teal/80 text-sm mb-3">
                📞 Call GCAL: Georgia Crisis and Access Line
              </p>
              <p className="text-brand-teal/70 text-sm mb-4">
                If you or someone you know is experiencing a mental health crisis, substance use concern, or emotional distress, help is available 24/7.
              </p>
              
              <div className="grid grid-cols-1 gap-2 mb-4 text-sm text-brand-teal/70">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Free and confidential support
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Trained professionals available anytime
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Help for children, adults, or caregivers
                </div>
              </div>
              
              <div className="space-y-3">
                <Button 
                  variant="outline"
                  className="w-full justify-start border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 py-3 rounded-lg"
                  onClick={() => handleEmergencyCall('1-800-715-4225', 'mental-health')}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  📱 Call or Text: 1-800-715-4225
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full justify-start border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 py-3 rounded-lg"
                  onClick={handleWebsiteLink}
                >
                  <span className="mr-2">💬</span>
                  Chat Online: georgiacollaborative.com
                </Button>
              </div>
            </div>
          </div>
        </div>
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
