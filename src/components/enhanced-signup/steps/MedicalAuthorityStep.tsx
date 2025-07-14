import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronLeft, ChevronRight, Upload, Shield, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { EnrollmentFormData, AuthorityType, MedicalAuthority } from "../types";

interface MedicalAuthorityStepProps {
  data: EnrollmentFormData;
  onUpdate: (updates: Partial<EnrollmentFormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const AUTHORITY_TYPES = [
  {
    value: 'power-of-attorney' as AuthorityType,
    label: 'Medical Power of Attorney (POA)',
    description: 'Legal document granting medical decision authority'
  },
  {
    value: 'guardian' as AuthorityType,
    label: 'Court-Appointed Medical Guardian',
    description: 'Court-appointed authority for medical decisions'
  },
  {
    value: 'healthcare-proxy' as AuthorityType,
    label: 'Healthcare Proxy/Surrogate',
    description: 'Designated healthcare decision-maker'
  },
  {
    value: 'parent-guardian' as AuthorityType,
    label: 'Parent/Legal Guardian (for minors)',
    description: 'Natural or legal guardian of minor patient'
  },
  {
    value: 'other' as AuthorityType,
    label: 'Other Legal Authority',
    description: 'Other legally recognized authority'
  }
];

export const MedicalAuthorityStep: React.FC<MedicalAuthorityStepProps> = ({
  data,
  onUpdate,
  onNext,
  onPrevious
}) => {
  const medicalAuthority = data.medicalAuthority || {
    authorityType: 'power-of-attorney' as AuthorityType,
    description: '',
    documents: [],
    verificationNotes: ''
  };

  const updateMedicalAuthority = (updates: Partial<MedicalAuthority>) => {
    onUpdate({
      medicalAuthority: {
        ...medicalAuthority,
        ...updates
      }
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    updateMedicalAuthority({
      documents: [...medicalAuthority.documents, ...files]
    });
  };

  const removeDocument = (index: number) => {
    const updatedDocs = medicalAuthority.documents.filter((_, i) => i !== index);
    updateMedicalAuthority({ documents: updatedDocs });
  };

  const isValid = () => {
    return medicalAuthority.authorityType && medicalAuthority.documents.length > 0;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Medical Decision Authority</h2>
        <p className="text-muted-foreground">
          To ensure proper care coordination, please confirm your legal authority to make medical decisions for {data.patientInfo?.firstName}.
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          We will verify this authority with the patient and/or family members as part of our enrollment process.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Authority Type</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={medicalAuthority.authorityType}
            onValueChange={(value) => updateMedicalAuthority({ authorityType: value as AuthorityType })}
            className="space-y-4"
          >
            {AUTHORITY_TYPES.map((type) => (
              <div key={type.value} className="flex items-start space-x-3 p-4 border rounded-lg">
                <RadioGroupItem value={type.value} id={type.value} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={type.value} className="font-medium cursor-pointer">
                    {type.label}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {type.description}
                  </p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {medicalAuthority.authorityType === 'other' && (
        <Card>
          <CardHeader>
            <CardTitle>Authority Description</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Please describe your legal authority to make medical decisions..."
              value={medicalAuthority.description || ''}
              onChange={(e) => updateMedicalAuthority({ description: e.target.value })}
              rows={3}
            />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Supporting Documentation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-dashed border-2 border-muted-foreground/25 rounded-lg p-6 text-center">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <div className="space-y-2">
              <p className="font-medium">Upload Supporting Documents</p>
              <p className="text-sm text-muted-foreground">
                Upload documents that verify your authority (PDF, JPG, PNG up to 10MB each)
              </p>
              <Label htmlFor="authority-docs" className="cursor-pointer">
                <Button variant="outline" className="mt-2">
                  Choose Files
                </Button>
                <input
                  id="authority-docs"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </Label>
            </div>
          </div>

          {medicalAuthority.documents.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Uploaded Documents:</h4>
              {medicalAuthority.documents.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <Upload className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDocument(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Notes (Optional)</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Any additional information about your authority or special circumstances..."
            value={medicalAuthority.verificationNotes || ''}
            onChange={(e) => updateMedicalAuthority({ verificationNotes: e.target.value })}
            rows={3}
          />
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrevious}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        
        <Button onClick={onNext} disabled={!isValid()}>
          Next: Plan Selection
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};