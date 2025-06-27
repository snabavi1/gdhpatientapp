
import React, { useState } from 'react';
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
  TestTube, 
  MessageSquare,
  Phone,
  MessageCircle,
  Crown,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { blandAIService } from '@/services/blandAIService';
import { useAuth } from '@/contexts/AuthContext';

interface ConciergeDropdownProps {
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
}

const ConciergeDropdown: React.FC<ConciergeDropdownProps> = ({ 
  isProcessing, 
  setIsProcessing 
}) => {
  const { toast } = useToast();
  const { user } = useAuth();

  const handleConciergeCall = async () => {
    setIsProcessing(true);
    try {
      const result = await blandAIService.initiateProviderCall({
        patientId: user?.id || '',
        providerType: 'concierge',
        urgency: 'medium'
      });

      if (result.success) {
        toast({
          title: "Connecting to Concierge",
          description: "Please wait while we connect you with your personal concierge.",
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

  const handleConciergeText = async () => {
    setIsProcessing(true);
    try {
      const result = await blandAIService.sendSMS({
        patientPhone: user?.phone || '',
        message: "Hello! I'd like to connect with my concierge for assistance.",
        conversationType: 'concierge'
      });

      if (result.success) {
        toast({
          title: "Message Sent",
          description: "Your concierge will respond shortly via text.",
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

  const handleConciergeService = async (service: string) => {
    setIsProcessing(true);
    try {
      const result = await blandAIService.sendSMS({
        patientPhone: user?.phone || '',
        message: `I need assistance with: ${service}. Please contact me at your earliest convenience.`,
        conversationType: 'concierge'
      });

      if (result.success) {
        toast({
          title: "Request Submitted",
          description: `Your ${service.toLowerCase()} request has been sent. We'll be in touch soon.`,
        });
      } else {
        toast({
          title: "Request Failed",
          description: "Please try calling your concierge directly.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          size="lg" 
          className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-6 text-lg font-medium min-w-[280px] shadow-lg hover:shadow-xl transition-all duration-200"
          disabled={isProcessing}
        >
          <Crown className="mr-3 h-6 w-6" />
          Your Personal Concierge
          <ChevronDown className="ml-3 h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 bg-white shadow-xl border-brand-secondary/20 p-2">
        <div className="p-3 border-b border-brand-light">
          <div className="text-sm font-semibold text-brand-teal mb-1 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-brand-primary" />
            Premium Concierge Services
          </div>
          <p className="text-xs text-brand-teal/60">Your dedicated healthcare assistant</p>
        </div>
        
        {/* Direct Contact Options */}
        <div className="p-2 space-y-1">
          <DropdownMenuItem 
            className="hover:bg-brand-light/50 cursor-pointer p-3 rounded-lg"
            onClick={handleConciergeCall}
            disabled={isProcessing}
          >
            <Phone className="mr-3 h-5 w-5 text-brand-primary" />
            <div className="flex flex-col">
              <span className="font-medium text-brand-teal">Call Now</span>
              <span className="text-xs text-brand-teal/60">Speak directly with your concierge</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="hover:bg-brand-light/50 cursor-pointer p-3 rounded-lg"
            onClick={handleConciergeText}
            disabled={isProcessing}
          >
            <MessageCircle className="mr-3 h-5 w-5 text-brand-primary" />
            <div className="flex flex-col">
              <span className="font-medium text-brand-teal">Send Text</span>
              <span className="text-xs text-brand-teal/60">Quick message to your concierge</span>
            </div>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="my-2" />
        
        {/* Service Categories */}
        <div className="p-2 space-y-1">
          <DropdownMenuItem 
            className="hover:bg-brand-light/50 cursor-pointer p-3 rounded-lg"
            onClick={() => handleConciergeService('Medication Refill')}
            disabled={isProcessing}
          >
            <Pill className="mr-3 h-4 w-4 text-brand-secondary" />
            <span className="text-brand-teal">Medication Refill</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="hover:bg-brand-light/50 cursor-pointer p-3 rounded-lg"
            onClick={() => handleConciergeService('Care Coordination')}
            disabled={isProcessing}
          >
            <HandHeart className="mr-3 h-4 w-4 text-brand-secondary" />
            <span className="text-brand-teal">Care Coordination</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="hover:bg-brand-light/50 cursor-pointer p-3 rounded-lg"
            onClick={() => handleConciergeService('Referrals')}
            disabled={isProcessing}
          >
            <RefreshCw className="mr-3 h-4 w-4 text-brand-secondary" />
            <span className="text-brand-teal">Referrals</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="hover:bg-brand-light/50 cursor-pointer p-3 rounded-lg"
            onClick={() => handleConciergeService('Lab Work Coordination')}
            disabled={isProcessing}
          >
            <TestTube className="mr-3 h-4 w-4 text-brand-secondary" />
            <span className="text-brand-teal">Lab Work Coordination</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-2" />
          <DropdownMenuItem 
            className="hover:bg-brand-light/50 cursor-pointer p-3 rounded-lg"
            onClick={() => handleConciergeService('Need Something Else')}
            disabled={isProcessing}
          >
            <MessageSquare className="mr-3 h-4 w-4 text-brand-secondary" />
            <span className="text-brand-teal">Need Something Else?</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ConciergeDropdown;
