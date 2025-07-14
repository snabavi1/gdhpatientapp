import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Heart, ArrowRight } from "lucide-react";
import { EnrollmentFormData, EnrollmentType } from "../types";

interface EnrollmentTypeStepProps {
  data: EnrollmentFormData;
  onUpdate: (updates: Partial<EnrollmentFormData>) => void;
  onNext: () => void;
}

export const EnrollmentTypeStep: React.FC<EnrollmentTypeStepProps> = ({
  data,
  onUpdate,
  onNext
}) => {
  const handleTypeSelect = (type: EnrollmentType) => {
    onUpdate({ enrollmentType: type });
    // Auto-advance after selection
    setTimeout(onNext, 300);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Choose Your Enrollment Path</h2>
        <p className="text-muted-foreground">
          Select the option that best describes your situation
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Self Enrollment Option */}
        <Card 
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
            data.enrollmentType === 'self' 
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary/50'
          }`}
          onClick={() => handleTypeSelect('self')}
        >
          <CardContent className="p-8 text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Home className="w-8 h-8 text-primary" />
            </div>
            
            <h3 className="text-xl font-semibold">I'm enrolling myself (and family)</h3>
            
            <div className="space-y-2 text-left">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm">Individual coverage</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm">Add family members</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm">I can provide my own consent</span>
              </div>
            </div>

            {data.enrollmentType === 'self' && (
              <div className="flex items-center justify-center text-primary font-medium">
                <span>Selected</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bystander Enrollment Option */}
        <Card 
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
            data.enrollmentType === 'bystander' 
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary/50'
          }`}
          onClick={() => handleTypeSelect('bystander')}
        >
          <CardContent className="p-8 text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            
            <h3 className="text-xl font-semibold">I'm enrolling someone I care for</h3>
            
            <div className="space-y-2 text-left">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-sm">Student, senior, or individual</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-sm">I have medical authority/proxy</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-sm">Specialized care plans</span>
              </div>
            </div>

            {data.enrollmentType === 'bystander' && (
              <div className="flex items-center justify-center text-primary font-medium">
                <span>Selected</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Manual Next Button (in case auto-advance doesn't work) */}
      {data.enrollmentType && (
        <div className="flex justify-center pt-4">
          <Button onClick={onNext} size="lg" className="px-8">
            Continue to Personal Information
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};