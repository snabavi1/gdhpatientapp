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
    <Card className="p-4 sm:p-6 bg-healthcare-calm/50 backdrop-blur-sm border-0 shadow-lg card-hover">
      <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6 text-center">How can we help you today?</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4">
        
        {/* Reach Your Doctor */}
        <div className="flex flex-col space-y-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-auto p-3 sm:p-4 flex flex-col items-center space-y-3 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 bg-card/80 button-press group"
                disabled={isProcessing === 'doctor'}
              >
                <div className="p-2 sm:p-3 rounded-full bg-healthcare-info/10 text-healthcare-info group-hover:scale-110 transition-transform duration-200">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-xs sm:text-sm text-foreground leading-tight">Reach Your Doctor</p>
                  <p className="text-xs text-muted-foreground leading-tight">Connect with your care team</p>
                </div>
                <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-44 sm:w-48 bg-card/95 backdrop-blur-sm border-primary/20 shadow-xl animate-scale-in">
              <DropdownMenuItem onClick={() => handleAction('doctor', 'call')} className="hover:bg-primary/10 transition-colors duration-150">
                <Phone className="h-4 w-4 mr-3 text-primary" />
                <span className="text-sm font-medium">Call Now</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('doctor', 'text')} className="hover:bg-primary/10 transition-colors duration-150">
                <MessageCircle className="h-4 w-4 mr-3 text-primary" />
                <span className="text-sm font-medium">Send Text</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('doctor', 'video')} className="hover:bg-primary/10 transition-colors duration-150">
                <Video className="h-4 w-4 mr-3 text-primary" />
                <span className="text-sm font-medium">Video Call Now</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {isProcessing === 'doctor' && (
            <div className="text-center text-xs sm:text-sm text-primary font-medium animate-pulse-soft">
              Connecting to your doctor...
            </div>
          )}
        </div>

        {/* Reach Your Concierge */}
        <div className="flex flex-col space-y-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-auto p-3 sm:p-4 flex flex-col items-center space-y-3 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 bg-card/80 button-press group"
                disabled={isProcessing === 'concierge'}
              >
                <div className="p-2 sm:p-3 rounded-full bg-healthcare-success/10 text-healthcare-success group-hover:scale-110 transition-transform duration-200">
                  <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-xs sm:text-sm text-foreground leading-tight">Reach Your Concierge</p>
                  <p className="text-xs text-muted-foreground leading-tight">Get assistance and support</p>
                </div>
                <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-44 sm:w-48 bg-card/95 backdrop-blur-sm border-primary/20 shadow-xl animate-scale-in">
              <DropdownMenuItem onClick={() => handleAction('concierge', 'chat')} className="hover:bg-primary/10 transition-colors duration-150">
                <MessageSquare className="h-4 w-4 mr-3 text-primary" />
                <span className="text-sm font-medium">Live Chat</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('concierge', 'call')} className="hover:bg-primary/10 transition-colors duration-150">
                <Phone className="h-4 w-4 mr-3 text-primary" />
                <span className="text-sm font-medium">Call Concierge</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('concierge', 'email')} className="hover:bg-primary/10 transition-colors duration-150">
                <MessageCircle className="h-4 w-4 mr-3 text-primary" />
                <span className="text-sm font-medium">Send Email</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {isProcessing === 'concierge' && (
            <div className="text-center text-xs sm:text-sm text-primary font-medium animate-pulse-soft">
              Connecting to concierge...
            </div>
          )}
        </div>

        {/* Schedule Appointment */}
        <div className="flex flex-col space-y-2 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-auto p-3 sm:p-4 flex flex-col items-center space-y-3 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 bg-card/80 button-press group"
                disabled={isProcessing === 'appointment'}
              >
                <div className="p-2 sm:p-3 rounded-full bg-healthcare-warning/10 text-healthcare-warning group-hover:scale-110 transition-transform duration-200">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-xs sm:text-sm text-foreground leading-tight">Schedule Appointment</p>
                  <p className="text-xs text-muted-foreground leading-tight">Book your next visit</p>
                </div>
                <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-44 sm:w-48 bg-card/95 backdrop-blur-sm border-primary/20 shadow-xl animate-scale-in">
              <DropdownMenuItem onClick={() => handleAction('appointment', 'meet-greet')} className="hover:bg-primary/10 transition-colors duration-150">
                <Calendar className="h-4 w-4 mr-3 text-primary" />
                <span className="text-sm font-medium">Meet & Greet</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('appointment', 'sick-visit')} className="hover:bg-primary/10 transition-colors duration-150">
                <Calendar className="h-4 w-4 mr-3 text-primary" />
                <span className="text-sm font-medium">Sick Visit</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('appointment', 'follow-up')} className="hover:bg-primary/10 transition-colors duration-150">
                <Calendar className="h-4 w-4 mr-3 text-primary" />
                <span className="text-sm font-medium">Follow Up</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {isProcessing === 'appointment' && (
            <div className="text-center text-xs sm:text-sm text-primary font-medium animate-pulse-soft">
              Opening scheduler...
            </div>
          )}
        </div>
        
      </div>
    </Card>
  );
};

export default HowCanWeHelpSection;