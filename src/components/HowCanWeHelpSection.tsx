import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Phone, 
  MessageSquare, 
  Calendar,
  Video,
  MessageCircle,
  ChevronDown
} from 'lucide-react';

const HowCanWeHelpSection: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const handleAction = async (action: string, option?: string) => {
    setIsProcessing(action);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(null);
      console.log(`Action: ${action}${option ? ` - ${option}` : ''}`);
    }, 1500);
  };

  return (
    <Card className="p-6 bg-white">
      <h2 className="text-xl font-semibold text-brand-teal mb-6">How can we help you today?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Reach Your Doctor */}
        <div className="flex flex-col space-y-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 border-gray-200 hover:border-brand-secondary"
                disabled={isProcessing === 'doctor'}
              >
                <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                  <Phone className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm text-gray-900">Reach Your Doctor</p>
                  <p className="text-xs text-gray-500">Connect with your care team</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              <DropdownMenuItem onClick={() => handleAction('doctor', 'call')}>
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('doctor', 'text')}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Send Text
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('doctor', 'video')}>
                <Video className="h-4 w-4 mr-2" />
                Video Call Now
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {isProcessing === 'doctor' && (
            <div className="text-center text-sm text-brand-primary">
              Connecting to your doctor...
            </div>
          )}
        </div>

        {/* Reach Your Concierge */}
        <div className="flex flex-col space-y-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 border-gray-200 hover:border-brand-secondary"
                disabled={isProcessing === 'concierge'}
              >
                <div className="p-3 rounded-full bg-green-50 text-green-600">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm text-gray-900">Reach Your Concierge</p>
                  <p className="text-xs text-gray-500">Get assistance and support</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              <DropdownMenuItem onClick={() => handleAction('concierge', 'chat')}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Live Chat
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('concierge', 'call')}>
                <Phone className="h-4 w-4 mr-2" />
                Call Concierge
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('concierge', 'email')}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Send Email
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {isProcessing === 'concierge' && (
            <div className="text-center text-sm text-brand-primary">
              Connecting to concierge...
            </div>
          )}
        </div>

        {/* Schedule Appointment */}
        <div className="flex flex-col space-y-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 border-gray-200 hover:border-brand-secondary"
                disabled={isProcessing === 'appointment'}
              >
                <div className="p-3 rounded-full bg-purple-50 text-purple-600">
                  <Calendar className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm text-gray-900">Schedule Appointment</p>
                  <p className="text-xs text-gray-500">Book your next visit</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              <DropdownMenuItem onClick={() => handleAction('appointment', 'meet-greet')}>
                <Calendar className="h-4 w-4 mr-2" />
                Meet & Greet
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('appointment', 'sick-visit')}>
                <Calendar className="h-4 w-4 mr-2" />
                Sick Visit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('appointment', 'follow-up')}>
                <Calendar className="h-4 w-4 mr-2" />
                Follow Up
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {isProcessing === 'appointment' && (
            <div className="text-center text-sm text-brand-primary">
              Opening scheduler...
            </div>
          )}
        </div>
        
      </div>
    </Card>
  );
};

export default HowCanWeHelpSection;