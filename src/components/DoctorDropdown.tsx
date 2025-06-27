
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  ChevronDown, 
  Phone,
  MessageCircle,
  Video,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { blandAIService } from '@/services/blandAIService';
import { useAuth } from '@/contexts/AuthContext';

interface DoctorDropdownProps {
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
}

const DoctorDropdown: React.FC<DoctorDropdownProps> = ({ 
  isProcessing, 
  setIsProcessing 
}) => {
  const { toast } = useToast();
  const { user } = useAuth();

  const handleDoctorCall = async () => {
    setIsProcessing(true);
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
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDoctorText = async () => {
    setIsProcessing(true);
    try {
      const result = await blandAIService.sendSMS({
        patientPhone: user?.phone || '',
        message: "Hello Doctor, I need to speak with you about my health. Please call me when convenient.",
        conversationType: 'general'
      });

      if (result.success) {
        toast({
          title: "Message Sent to Doctor",
          description: "Your doctor will respond as soon as possible.",
        });
      } else {
        toast({
          title: "Message Failed",
          description: "Unable to send message. Please try calling instead.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVideoVisit = () => {
    window.open('https://greendothealth.doxy.me/docnow', '_blank');
    toast({
      title: "Opening Video Visit",
      description: "Redirecting you to your secure video consultation.",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          size="lg" 
          className="bg-brand-blue hover:bg-brand-blue/90 text-white px-8 py-6 text-lg font-medium min-w-[280px] shadow-lg hover:shadow-xl transition-all duration-200"
          disabled={isProcessing}
        >
          👩‍⚕️ Reach Your Doctor Now
          <ChevronDown className="ml-3 h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 bg-white shadow-xl border-brand-secondary/20 p-2">
        <div className="p-3 border-b border-brand-light">
          <div className="text-sm font-semibold text-brand-teal mb-1">
            👩‍⚕️ Connect With Your Doctor
          </div>
          <p className="text-xs text-brand-teal/60">Multiple ways to reach your care team</p>
        </div>
        <div className="p-2 space-y-1">
          <DropdownMenuItem 
            className="hover:bg-brand-light/50 cursor-pointer p-4 rounded-lg"
            onClick={handleDoctorCall}
            disabled={isProcessing}
          >
            <Phone className="mr-3 h-5 w-5 text-brand-blue" />
            <div className="flex flex-col">
              <span className="font-medium text-brand-teal">Call Doctor</span>
              <span className="text-xs text-brand-teal/60">Direct phone consultation</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="hover:bg-brand-light/50 cursor-pointer p-4 rounded-lg"
            onClick={handleDoctorText}
            disabled={isProcessing}
          >
            <MessageCircle className="mr-3 h-5 w-5 text-brand-blue" />
            <div className="flex flex-col">
              <span className="font-medium text-brand-teal">Text Doctor</span>
              <span className="text-xs text-brand-teal/60">Send a secure message</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="hover:bg-brand-light/50 cursor-pointer p-4 rounded-lg"
            onClick={handleVideoVisit}
            disabled={isProcessing}
          >
            <Video className="mr-3 h-5 w-5 text-brand-blue" />
            <div className="flex flex-col">
              <span className="font-medium text-brand-teal">Video Visit</span>
              <span className="text-xs text-brand-teal/60">Face-to-face consultation</span>
            </div>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DoctorDropdown;
