
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { 
  ChevronDown, 
  Pill, 
  HandHeart, 
  RefreshCw, 
  FileText, 
  Hospital, 
  TestTube, 
  MessageSquare,
  Phone,
  MessageCircle,
  Video,
  Heart
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { blandAIService } from '@/services/blandAIService';
import { useAuth } from '@/contexts/AuthContext';

const QuickActionsCard: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();

  const handleConciergeService = async (service: string) => {
    toast({
      title: "Concierge Request",
      description: `We'll help you with ${service.toLowerCase()}. Expect a call shortly.`,
    });
  };

  const handleDoctorCall = async () => {
    try {
      const result = await blandAIService.initiateProviderCall({
        patientId: user?.id || '',
        providerType: 'doctor',
        urgency: 'medium'
      });

      if (result.success) {
        toast({
          title: "Connecting to Doctor",
          description: "Please wait while we connect you with a healthcare provider.",
        });
      } else {
        toast({
          title: "Connection Failed",
          description: "Unable to connect right now. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initiate call. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDoctorMessage = () => {
    toast({
      title: "Message Sent",
      description: "Your message has been sent to your care team. We'll respond soon.",
    });
  };

  const handleVideoVisit = () => {
    toast({
      title: "Video Visit",
      description: "Video consultation feature coming soon!",
    });
  };

  return (
    <Card className="p-8 bg-white border-brand-secondary/20 shadow-lg">
      <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
        {/* Concierge Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              size="lg" 
              className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-4 text-lg font-semibold min-w-[200px]"
            >
              🏥 Concierge
              <ChevronDown className="ml-2 h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 bg-white shadow-xl border-brand-secondary/20">
            <div className="p-2">
              <div className="text-sm font-semibold text-brand-teal mb-2 px-2">
                🏥 Concierge Services
              </div>
              <DropdownMenuItem 
                className="hover:bg-brand-light/50 cursor-pointer p-3"
                onClick={() => handleConciergeService('Medication Refill')}
              >
                <Pill className="mr-3 h-4 w-4 text-brand-secondary" />
                Medication Refill
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-brand-light/50 cursor-pointer p-3"
                onClick={() => handleConciergeService('Care Coordination')}
              >
                <HandHeart className="mr-3 h-4 w-4 text-brand-secondary" />
                Care Coordination
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-brand-light/50 cursor-pointer p-3"
                onClick={() => handleConciergeService('Referrals')}
              >
                <RefreshCw className="mr-3 h-4 w-4 text-brand-secondary" />
                Referrals
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-brand-light/50 cursor-pointer p-3"
                onClick={() => handleConciergeService('Orders')}
              >
                <FileText className="mr-3 h-4 w-4 text-brand-secondary" />
                Orders
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-brand-light/50 cursor-pointer p-3"
                onClick={() => handleConciergeService('Imaging Coordination')}
              >
                <Hospital className="mr-3 h-4 w-4 text-brand-secondary" />
                Imaging Coordination
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-brand-light/50 cursor-pointer p-3"
                onClick={() => handleConciergeService('Lab Work Coordination')}
              >
                <TestTube className="mr-3 h-4 w-4 text-brand-secondary" />
                Lab Work Coordination
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="hover:bg-brand-light/50 cursor-pointer p-3"
                onClick={() => handleConciergeService('Other Non-Urgent Needs')}
              >
                <MessageSquare className="mr-3 h-4 w-4 text-brand-secondary" />
                Other Non-Urgent Needs
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Doctor Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              size="lg" 
              className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-4 text-lg font-semibold min-w-[200px]"
            >
              👩‍⚕️ Doctor
              <ChevronDown className="ml-2 h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white shadow-xl border-brand-secondary/20">
            <div className="p-2">
              <div className="text-sm font-semibold text-brand-teal mb-2 px-2">
                👩‍⚕️ Talk to Your Doctor
              </div>
              <DropdownMenuItem 
                className="hover:bg-brand-light/50 cursor-pointer p-3"
                onClick={handleDoctorCall}
              >
                <Phone className="mr-3 h-4 w-4 text-brand-secondary" />
                Call Now
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-brand-light/50 cursor-pointer p-3"
                onClick={handleDoctorMessage}
              >
                <MessageCircle className="mr-3 h-4 w-4 text-brand-secondary" />
                Send Message
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-brand-light/50 cursor-pointer p-3"
                onClick={handleVideoVisit}
              >
                <Video className="mr-3 h-4 w-4 text-brand-secondary" />
                Video Visit
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="text-center mt-6">
        <p className="text-brand-teal/70">
          Need something else? We're just a tap away →
        </p>
      </div>
    </Card>
  );
};

export default QuickActionsCard;
