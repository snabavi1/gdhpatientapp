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
    <Card className="p-4 sm:p-6 bg-white">
      <h2 className="text-lg sm:text-xl font-semibold text-brand-teal mb-4 sm:mb-6">How can we help you today?</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4">
        
        {/* Reach Your Doctor */}
        <div className="flex flex-col space-y-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-auto p-3 sm:p-4 flex flex-col items-center space-y-2 border-gray-200 hover:border-brand-secondary"
                disabled={isProcessing === 'doctor'}
              >
                <div className="p-2 sm:p-3 rounded-full bg-blue-50 text-blue-600">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-xs sm:text-sm text-gray-900 leading-tight">Reach Your Doctor</p>
                  <p className="text-xs text-gray-500 leading-tight">Connect with your care team</p>
                </div>
                <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-44 sm:w-48">
              <DropdownMenuItem onClick={() => handleAction('doctor', 'call')}>
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-sm">Call Now</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('doctor', 'text')}>
                <MessageCircle className="h-4 w-4 mr-2" />
                <span className="text-sm">Send Text</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('doctor', 'video')}>
                <Video className="h-4 w-4 mr-2" />
                <span className="text-sm">Video Call Now</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {isProcessing === 'doctor' && (
            <div className="text-center text-xs sm:text-sm text-brand-primary">
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
                className="h-auto p-3 sm:p-4 flex flex-col items-center space-y-2 border-gray-200 hover:border-brand-secondary"
                disabled={isProcessing === 'concierge'}
              >
                <div className="p-2 sm:p-3 rounded-full bg-green-50 text-green-600">
                  <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-xs sm:text-sm text-gray-900 leading-tight">Reach Your Concierge</p>
                  <p className="text-xs text-gray-500 leading-tight">Get assistance and support</p>
                </div>
                <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-44 sm:w-48">
              <DropdownMenuItem onClick={() => handleAction('concierge', 'chat')}>
                <MessageSquare className="h-4 w-4 mr-2" />
                <span className="text-sm">Live Chat</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('concierge', 'call')}>
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-sm">Call Concierge</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('concierge', 'email')}>
                <MessageCircle className="h-4 w-4 mr-2" />
                <span className="text-sm">Send Email</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {isProcessing === 'concierge' && (
            <div className="text-center text-xs sm:text-sm text-brand-primary">
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
                className="h-auto p-3 sm:p-4 flex flex-col items-center space-y-2 border-gray-200 hover:border-brand-secondary"
                disabled={isProcessing === 'appointment'}
              >
                <div className="p-2 sm:p-3 rounded-full bg-purple-50 text-purple-600">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-xs sm:text-sm text-gray-900 leading-tight">Schedule Appointment</p>
                  <p className="text-xs text-gray-500 leading-tight">Book your next visit</p>
                </div>
                <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-44 sm:w-48">
              <DropdownMenuItem onClick={() => handleAction('appointment', 'meet-greet')}>
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">Meet & Greet</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('appointment', 'sick-visit')}>
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">Sick Visit</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('appointment', 'follow-up')}>
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">Follow Up</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {isProcessing === 'appointment' && (
            <div className="text-center text-xs sm:text-sm text-brand-primary">
              Opening scheduler...
            </div>
          )}
        </div>
        
      </div>
    </Card>
  );
};

export default HowCanWeHelpSection;