
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

interface CareInstructionsProps {
  instructions: string[];
}

const CareInstructions: React.FC<CareInstructionsProps> = ({
  instructions
}) => {
  if (instructions.length === 0) {
    return null;
  }

  return (
    <Card className="p-6 bg-white border-brand-secondary/20">
      <div className="flex items-center space-x-3 mb-4">
        <FileText className="h-5 w-5 text-brand-primary" />
        <h3 className="text-lg font-semibold text-brand-teal">Care Instructions</h3>
      </div>
      <div className="space-y-3">
        {instructions.map((instruction, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-brand-primary rounded-full mt-2 flex-shrink-0" />
            <p className="text-brand-teal/80">{instruction}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Button className="flex-1 sm:flex-none bg-brand-primary hover:bg-brand-primary/90">
          Download Full Instructions
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 sm:flex-none border-brand-secondary text-brand-primary hover:bg-brand-light"
        >
          Contact Your Doctor
        </Button>
      </div>
    </Card>
  );
};

export default CareInstructions;
