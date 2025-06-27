
import React, { useState } from 'react';
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
  Crown,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { blandAIService } from '@/services/blandAIService';
import { useAuth } from '@/contexts/AuthContext';

const QuickActionsCard: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

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
    <div className="space-y-6">
      {/* Main Quick Actions */}
      <Card className="p-8 bg-gradient-to-br from-white to-brand-light/30 border-brand-secondary/20 shadow-sm">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-brand-teal mb-2">
            How can we help you today?
          </h2>
          <p className="text-brand-teal/70">
            Your care team is ready to assist you with anything you need
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center max-w-2xl mx-auto">
          {/* Concierge Dropdown */}
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

          {/* Doctor Dropdown */}
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
        </div>

        {isProcessing && (
          <div className="text-center mt-4">
            <div className="inline-flex items-center gap-2 text-brand-teal/70 text-sm">
              <div className="w-4 h-4 border-2 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
              Processing your request...
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default QuickActionsCard;
