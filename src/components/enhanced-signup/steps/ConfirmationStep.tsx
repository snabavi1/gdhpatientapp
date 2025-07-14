import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, CheckCircle, User, Heart, FileText, CreditCard, Loader2 } from "lucide-react";
import { EnrollmentFormData } from "../types";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ConfirmationStepProps {
  data: EnrollmentFormData;
  onPrevious: () => void;
}

export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  data,
  onPrevious
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signUpWithUnifiedBackend } = useAuth();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Prepare enrollment data
      const enrollmentData = {
        // Basic user info
        email: data.personalInfo.email,
        password: 'TempPassword123!', // In real implementation, user would set this
        firstName: data.personalInfo.firstName,
        lastName: data.personalInfo.lastName,
        dateOfBirth: data.personalInfo.dateOfBirth,
        phone: data.personalInfo.phone,
        planId: data.selectedPlan?.id || '',
        userType: 'patient' as const,
        
        // Additional enrollment data
        enrollmentType: data.enrollmentType,
        patientInfo: data.patientInfo,
        familyMembers: data.familyMembers,
        medicalAuthority: data.medicalAuthority,
        selectedPlan: data.selectedPlan,
        consents: data.consents,
        insuranceInfo: data.insuranceInfo,
        paymentMethod: data.paymentMethod
      };

      // Create account and enrollment
      await signUpWithUnifiedBackend(enrollmentData);

      toast({
        title: "Enrollment Complete! 🎉",
        description: "Your account has been created and enrollment is being processed.",
      });

      // Redirect to dashboard
      navigate('/');
      
    } catch (error) {
      console.error('Enrollment failed:', error);
      toast({
        title: "Enrollment Failed",
        description: "There was an error processing your enrollment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatAddress = (address: any) => {
    if (!address) return 'Not provided';
    return `${address.street}, ${address.city}, ${address.state} ${address.zipCode}`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Review & Complete Enrollment</h2>
        <p className="text-muted-foreground">
          Please review your information before completing your enrollment
        </p>
      </div>

      {/* Enrollment Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Enrollment Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Enrollment Type:</span>
            <Badge variant={data.enrollmentType === 'self' ? 'default' : 'secondary'}>
              {data.enrollmentType === 'self' ? 'Self Enrollment' : 'Bystander Enrollment'}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-medium">Primary Contact:</span>
            <span>{data.personalInfo.firstName} {data.personalInfo.lastName}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-medium">Email:</span>
            <span>{data.personalInfo.email}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-medium">Phone:</span>
            <span>{data.personalInfo.phone}</span>
          </div>

          {data.patientInfo && (
            <>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-medium">Patient:</span>
                <span>{data.patientInfo.firstName} {data.patientInfo.lastName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Relationship:</span>
                <span className="capitalize">{data.patientInfo.relationship}</span>
              </div>
            </>
          )}

          {data.familyMembers.length > 0 && (
            <>
              <Separator />
              <div>
                <span className="font-medium">Family Members:</span>
                <ul className="mt-2 space-y-1">
                  {data.familyMembers.map((member, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {member.firstName} {member.lastName} ({member.relationship})
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Plan Details */}
      {data.selectedPlan && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-5 h-5" />
              <span>Selected Plan</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">{data.selectedPlan.name}</span>
              <Badge variant="outline">${data.selectedPlan.price}/month</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{data.selectedPlan.description}</p>
            <div>
              <span className="font-medium text-sm">Includes:</span>
              <ul className="mt-1 space-y-1">
                {data.selectedPlan.features.map((feature, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Consents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Consents & Documentation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {data.consents.map((consent, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">{consent.title}</span>
                {consent.required && <Badge variant="outline" className="text-xs">Required</Badge>}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Digital signature: {data.consents[0]?.signatureName} on {new Date().toLocaleDateString()}
          </p>
        </CardContent>
      </Card>

      {/* Payment & Insurance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>Payment & Insurance</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.insuranceInfo?.hasInsurance ? (
            <div>
              <span className="font-medium">Primary Insurance:</span>
              <p className="text-sm text-muted-foreground">
                {data.insuranceInfo.primaryInsurance?.companyName} - Policy: {data.insuranceInfo.primaryInsurance?.policyNumber}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No insurance provided</p>
          )}
          
          <Separator />
          
          <div>
            <span className="font-medium">Payment Method:</span>
            <p className="text-sm text-muted-foreground capitalize">
              {data.paymentMethod?.type?.replace('-', ' ')} ending in ****
            </p>
            <p className="text-xs text-muted-foreground">
              Billing: {formatAddress(data.paymentMethod?.billingAddress)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Final Authorization */}
      <Card className="border-2 border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="text-center space-y-3">
            <h3 className="font-semibold">Final Authorization</h3>
            <p className="text-sm text-muted-foreground">
              By clicking "Complete Enrollment" below, I confirm that all information provided is accurate 
              and I agree to all consents and terms outlined in this enrollment process.
            </p>
            <p className="text-xs text-muted-foreground">
              Monthly billing of ${data.selectedPlan?.price} will begin immediately upon enrollment completion.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrevious} disabled={isSubmitting}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting}
          size="lg"
          className="px-8"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            'Complete Enrollment'
          )}
        </Button>
      </div>
    </div>
  );
};