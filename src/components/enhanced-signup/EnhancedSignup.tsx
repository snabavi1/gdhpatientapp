import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EnrollmentFormData, EnrollmentStep } from "./types";
import { EnrollmentTypeStep } from "./steps/EnrollmentTypeStep";
import { PersonalInfoStep } from "./steps/PersonalInfoStep";
import { MedicalAuthorityStep } from "./steps/MedicalAuthorityStep";
import { PlanSelectionStep } from "./steps/PlanSelectionStep";
import { ConsentStep } from "./steps/ConsentStep";
import { InsurancePaymentStep } from "./steps/InsurancePaymentStep";
import { ConfirmationStep } from "./steps/ConfirmationStep";
import { ProgressSidebar } from "./ProgressSidebar";

const STEPS: EnrollmentStep[] = [
  'enrollment-type',
  'personal-info',
  'medical-authority',
  'plan-selection',
  'consent',
  'insurance-payment',
  'confirmation'
];

const EnhancedSignup: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<EnrollmentStep>('enrollment-type');
  const [formData, setFormData] = useState<EnrollmentFormData>({
    enrollmentType: 'self',
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: ''
    },
    patientInfo: null,
    familyMembers: [],
    medicalAuthority: null,
    selectedPlan: null,
    consents: [],
    insuranceInfo: null,
    paymentMethod: null
  });

  const currentStepIndex = STEPS.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

  const updateFormData = (updates: Partial<EnrollmentFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < STEPS.length) {
      // Skip medical authority step for self-enrollment
      if (STEPS[nextIndex] === 'medical-authority' && formData.enrollmentType === 'self') {
        setCurrentStep(STEPS[nextIndex + 1]);
      } else {
        setCurrentStep(STEPS[nextIndex]);
      }
    }
  };

  const handlePrevious = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      // Skip medical authority step for self-enrollment when going back
      if (STEPS[prevIndex] === 'medical-authority' && formData.enrollmentType === 'self') {
        setCurrentStep(STEPS[prevIndex - 1]);
      } else {
        setCurrentStep(STEPS[prevIndex]);
      }
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'enrollment-type':
        return (
          <EnrollmentTypeStep
            data={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
          />
        );
      case 'personal-info':
        return (
          <PersonalInfoStep
            data={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 'medical-authority':
        return (
          <MedicalAuthorityStep
            data={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 'plan-selection':
        return (
          <PlanSelectionStep
            data={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 'consent':
        return (
          <ConsentStep
            data={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 'insurance-payment':
        return (
          <InsurancePaymentStep
            data={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 'confirmation':
        return (
          <ConfirmationStep
            data={formData}
            onPrevious={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="flex min-h-screen">
        {/* Progress Sidebar */}
        <ProgressSidebar
          currentStep={currentStep}
          formData={formData}
          progress={progress}
        />

        {/* Main Content */}
        <div className="flex-1 p-6 lg:p-8">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome to Your Virtual Emergency Physician
              </h1>
              <p className="text-muted-foreground text-lg">
                Emergency physicians managing urgent care remotely - avoiding unnecessary ER visits
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>Step {currentStepIndex + 1} of {STEPS.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
            </div>

            {/* Step Content */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                {renderCurrentStep()}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSignup;