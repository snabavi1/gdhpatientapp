
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import ConciergeDropdown from './ConciergeDropdown';
import DoctorDropdown from './DoctorDropdown';

const QuickActionsCard: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <div className="space-y-6">
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
