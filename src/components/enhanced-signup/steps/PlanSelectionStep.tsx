import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Check, Heart, User, Users } from "lucide-react";
import { EnrollmentFormData, PlanDetails, SELF_ENROLLMENT_PLANS, CARE_FAMILY_ENROLLMENT_PLANS } from "../types";
import { cn } from "@/lib/utils";

interface PlanSelectionStepProps {
  data: EnrollmentFormData;
  onUpdate: (updates: Partial<EnrollmentFormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const PlanSelectionStep: React.FC<PlanSelectionStepProps> = ({
  data,
  onUpdate,
  onNext,
  onPrevious
}) => {
  const availablePlans = data.enrollmentType === 'self' ? SELF_ENROLLMENT_PLANS : CARE_FAMILY_ENROLLMENT_PLANS;

  const handlePlanSelect = (plan: PlanDetails) => {
    onUpdate({ selectedPlan: plan });
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'individual':
        return <User className="w-6 h-6" />;
      case 'family':
        return <Users className="w-6 h-6" />;
      case 'student-safe':
      case 'senior-safe':
      case 'green-dot-individual':
        return <Heart className="w-6 h-6" />;
      default:
        return <User className="w-6 h-6" />;
    }
  };

  const isValid = () => {
    return !!data.selectedPlan;
  };

  const renderPlanSummary = (plan: PlanDetails) => {
    if (plan.summary) {
      return (
        <div className="space-y-2">
          <h4 className="font-medium text-sm">{plan.summary.title}</h4>
          <p className="text-sm text-muted-foreground">
            {plan.summary.description}
          </p>
          <p className="text-xs text-muted-foreground">
            {plan.summary.billing}
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <h3 className="font-semibold">Plan Summary</h3>
        <p className="text-sm text-muted-foreground">
          You've selected <strong>{plan.name}</strong> for{" "}
          <strong>${plan.price}/month</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          Billing will begin after enrollment completion and can be cancelled anytime
        </p>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Your Plan</h2>
        <p className="text-muted-foreground">
          {data.enrollmentType === 'self' 
            ? 'Select the coverage plan that best fits your needs'
            : `Choose the specialized plan for ${data.patientInfo?.firstName || 'your patient'}`
          }
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availablePlans.map((plan) => (
          <Card
            key={plan.id}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-lg border-2 relative",
              data.selectedPlan?.id === plan.id
                ? "border-primary bg-primary/5 shadow-lg"
                : "border-border hover:border-primary/50"
            )}
            onClick={() => handlePlanSelect(plan)}
          >
            {data.selectedPlan?.id === plan.id && (
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                {getPlanIcon(plan.id)}
              </div>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              {plan.ageRange && (
                <Badge variant="secondary" className="mt-2">
                  {plan.ageRange}
                </Badge>
              )}
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  ${plan.price}
                  <span className="text-lg font-normal text-muted-foreground">/month</span>
                </div>
                {plan.id === 'senior-safe' && (
                  <p className="text-xs text-muted-foreground mt-1">
                    First month of move-in, then $85/month
                  </p>
                )}
              </div>

              <p className="text-sm text-muted-foreground text-center">
                {plan.description}
              </p>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">What's included:</h4>
                <ul className="space-y-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {data.selectedPlan?.id === plan.id && (
                <div className="pt-2 text-center">
                  <Badge variant="default">Selected Plan</Badge>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {data.selectedPlan && (
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              {renderPlanSummary(data.selectedPlan)}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrevious}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        
        <Button onClick={onNext} disabled={!isValid()}>
          Next: Payment & Insurance
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};