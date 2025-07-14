import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, FileText, Eye, CheckCircle } from "lucide-react";
import { EnrollmentFormData, ConsentItem, CONSENT_TEMPLATES, getRequiredConsents } from "../types";

interface ConsentStepProps {
  data: EnrollmentFormData;
  onUpdate: (updates: Partial<EnrollmentFormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const ConsentStep: React.FC<ConsentStepProps> = ({
  data,
  onUpdate,
  onNext,
  onPrevious
}) => {
  const [signatureName, setSignatureName] = useState(
    `${data.personalInfo.firstName} ${data.personalInfo.lastName}`
  );

  // Determine required consents based on enrollment data
  const hasMinors = data.familyMembers.some(member => {
    if (!member.dateOfBirth) return false;
    const age = new Date().getFullYear() - new Date(member.dateOfBirth).getFullYear();
    return age < 18;
  }) || (data.patientInfo && data.patientInfo.dateOfBirth && 
    new Date().getFullYear() - new Date(data.patientInfo.dateOfBirth).getFullYear() < 18);

  const requiredConsentTypes = getRequiredConsents(
    data.enrollmentType,
    hasMinors,
    data.enrollmentType === 'bystander'
  );

  // Initialize consents if not already done
  React.useEffect(() => {
    if (data.consents.length === 0) {
      const initialConsents = requiredConsentTypes.map(type => ({
        ...CONSENT_TEMPLATES[type],
        agreed: false
      }));
      onUpdate({ consents: initialConsents });
    }
  }, [requiredConsentTypes.length]);

  const updateConsent = (index: number, updates: Partial<ConsentItem>) => {
    const updatedConsents = data.consents.map((consent, i) => 
      i === index ? { ...consent, ...updates } : consent
    );
    onUpdate({ consents: updatedConsents });
  };

  const handleConsentAgreement = (index: number, agreed: boolean) => {
    const updates: Partial<ConsentItem> = { agreed };
    
    if (agreed) {
      updates.signatureName = signatureName;
      updates.signatureDate = new Date().toISOString();
    } else {
      updates.signatureName = undefined;
      updates.signatureDate = undefined;
    }
    
    updateConsent(index, updates);
  };

  const getConsentIcon = (type: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'hipaa': '📄',
      'consent-to-treat': '🏥',
      'telemedicine': '👨‍⚕️',
      'minor-consent': '👶',
      'medical-release': '🔐',
      'emergency-contact': '⚠️'
    };
    return icons[type] || '📋';
  };

  const isValid = () => {
    return data.consents.every(consent => !consent.required || consent.agreed) &&
           signatureName.trim().length > 0;
  };

  const allRequiredAgreed = data.consents.filter(c => c.required).every(c => c.agreed);
  const totalConsents = data.consents.length;
  const agreedConsents = data.consents.filter(c => c.agreed).length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Consent & Documentation</h2>
        <p className="text-muted-foreground">
          Please review and agree to the required legal documents and consents
        </p>
      </div>

      {/* Progress */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Consent Progress</h3>
              <p className="text-sm text-muted-foreground">
                {agreedConsents} of {totalConsents} consents completed
              </p>
            </div>
            <div className="text-right">
              {allRequiredAgreed ? (
                <CheckCircle className="w-8 h-8 text-green-500" />
              ) : (
                <div className="w-8 h-8 rounded-full border-2 border-muted-foreground flex items-center justify-center text-sm font-medium">
                  {agreedConsents}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Digital Signature */}
      <Card>
        <CardHeader>
          <CardTitle>Digital Signature</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="signature">Full Legal Name for Digital Signature *</Label>
            <Input
              id="signature"
              value={signatureName}
              onChange={(e) => setSignatureName(e.target.value)}
              placeholder="Enter your full legal name"
            />
            <p className="text-xs text-muted-foreground">
              By typing your name above, you agree that this constitutes a legal digital signature
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Consent Items */}
      <div className="space-y-4">
        {data.consents.map((consent, index) => (
          <Card key={consent.type} className={consent.agreed ? "border-green-200 bg-green-50/50" : ""}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getConsentIcon(consent.type)}</span>
                  <div>
                    <CardTitle className="text-lg">{consent.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{consent.description}</p>
                  </div>
                </div>
                {consent.required && (
                  <Badge variant="destructive" className="text-xs">Required</Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm">{consent.fullText}</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="p-0 h-auto text-primary">
                      <Eye className="w-4 h-4 mr-1" />
                      View Full Document
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle>{consent.title}</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-96">
                      <div className="p-4 space-y-4">
                        <p>{consent.fullText}</p>
                        {/* In a real app, this would contain the full legal text */}
                        <div className="text-sm text-muted-foreground space-y-2">
                          <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>
                          <p><strong>Version:</strong> 1.0</p>
                          <p>This is a simplified version for demonstration. The full legal document would contain comprehensive terms and conditions.</p>
                        </div>
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`consent-${index}`}
                  checked={consent.agreed}
                  onCheckedChange={(checked) => handleConsentAgreement(index, !!checked)}
                />
                <Label htmlFor={`consent-${index}`} className="cursor-pointer">
                  {consent.required ? "I agree to this required consent *" : "I agree to this consent"}
                </Label>
              </div>

              {consent.agreed && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-green-700">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Agreed</span>
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    Signed by: {consent.signatureName} on {new Date(consent.signatureDate!).toLocaleString()}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrevious}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        
        <Button onClick={onNext} disabled={!isValid()}>
          Next: Insurance & Payment
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};