import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, User, Shield, CreditCard, FileText, Heart, CheckCircle } from "lucide-react";
import { EnrollmentStep, EnrollmentFormData } from "./types";
import { cn } from "@/lib/utils";

interface ProgressSidebarProps {
  currentStep: EnrollmentStep;
  formData: EnrollmentFormData;
  progress: number;
}

const STEP_CONFIG = {
  'enrollment-type': {
    icon: User,
    title: 'Enrollment Type',
    description: 'Choose your enrollment path'
  },
  'personal-info': {
    icon: User,
    title: 'Personal Information',
    description: 'Your details and contacts'
  },
  'medical-authority': {
    icon: Shield,
    title: 'Medical Authority',
    description: 'Verify decision-making rights'
  },
  'plan-selection': {
    icon: Heart,
    title: 'Plan Selection',
    description: 'Choose your coverage plan'
  },
  'consent': {
    icon: FileText,
    title: 'Consent & Documentation',
    description: 'Legal agreements and signatures'
  },
  'insurance-payment': {
    icon: CreditCard,
    title: 'Insurance & Payment',
    description: 'Coverage and billing details'
  },
  'confirmation': {
    icon: CheckCircle,
    title: 'Confirmation',
    description: 'Review and complete enrollment'
  }
};

export const ProgressSidebar: React.FC<ProgressSidebarProps> = ({
  currentStep,
  formData,
  progress
}) => {
  const getStepStatus = (step: EnrollmentStep): 'completed' | 'current' | 'upcoming' => {
    const steps = Object.keys(STEP_CONFIG) as EnrollmentStep[];
    const currentIndex = steps.indexOf(currentStep);
    const stepIndex = steps.indexOf(step);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  const shouldShowStep = (step: EnrollmentStep): boolean => {
    // All steps are shown in the new flow
    return true;
  };

  return (
    <div className="w-80 bg-muted/30 border-r p-6 space-y-6">
      {/* Overall Progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Enrollment Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="mb-2" />
          <p className="text-sm text-muted-foreground">
            {Math.round(progress)}% Complete
          </p>
        </CardContent>
      </Card>

      {/* Steps */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(Object.keys(STEP_CONFIG) as EnrollmentStep[])
            .filter(shouldShowStep)
            .map((step, index) => {
              const config = STEP_CONFIG[step];
              const status = getStepStatus(step);
              const Icon = config.icon;

              return (
                <div
                  key={step}
                  className={cn(
                    "flex items-start space-x-3 p-3 rounded-lg transition-colors",
                    status === 'current' && "bg-primary/10 border border-primary/20",
                    status === 'completed' && "bg-green-50 border border-green-200",
                    status === 'upcoming' && "opacity-60"
                  )}
                >
                  <div className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                    status === 'completed' && "bg-green-100 text-green-600",
                    status === 'current' && "bg-primary text-primary-foreground",
                    status === 'upcoming' && "bg-muted text-muted-foreground"
                  )}>
                    {status === 'completed' ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={cn(
                      "font-medium text-sm",
                      status === 'current' && "text-primary",
                      status === 'completed' && "text-green-700",
                      status === 'upcoming' && "text-muted-foreground"
                    )}>
                      {config.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {config.description}
                    </p>
                  </div>
                </div>
              );
            })}
        </CardContent>
      </Card>

      {/* Plan Summary */}
      {formData.selectedPlan && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Selected Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{formData.selectedPlan.name}</span>
                <Badge variant="secondary">${formData.selectedPlan.price}/month</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {formData.selectedPlan.description}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enrollment Type Badge */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <Badge variant={formData.enrollmentType === 'self' ? 'default' : 'secondary'} className="mb-2">
              {formData.enrollmentType === 'self' ? 'Self Enrollment' : 'Bystander Enrollment'}
            </Badge>
            <p className="text-xs text-muted-foreground">
              {formData.enrollmentType === 'self' 
                ? 'Enrolling yourself and family'
                : 'Enrolling someone you care for'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};