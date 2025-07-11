
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import ConciergeDropdown from './ConciergeDropdown';
import DoctorDropdown from './DoctorDropdown';
import GreenDotLogo from './GreenDotLogo';

const QuickActionsCard: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <div className="space-y-6">
      <Card className="p-8 brand-mixed-gradient border-0 shadow-lg relative overflow-hidden">
        {/* Floating decorations */}
        <div className="absolute -top-4 -right-4 opacity-10">
          <GreenDotLogo size="lg" floating />
        </div>
        <div className="absolute -bottom-2 -left-2 opacity-5">
          <GreenDotLogo size="md" />
        </div>
        
        <div className="text-center mb-6 relative z-10">
          <div className="flex items-center justify-center mb-4">
            <GreenDotLogo size="sm" className="mr-2" />
            <h2 className="text-2xl font-semibold text-foreground">
              How can we help you today?
            </h2>
          </div>
          <p className="text-foreground/80">
            Your care team is ready to assist you with anything you need
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center max-w-2xl mx-auto">
          <ConciergeDropdown 
            isProcessing={isProcessing} 
            setIsProcessing={setIsProcessing} 
          />
          <DoctorDropdown 
            isProcessing={isProcessing} 
            setIsProcessing={setIsProcessing} 
          />
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
