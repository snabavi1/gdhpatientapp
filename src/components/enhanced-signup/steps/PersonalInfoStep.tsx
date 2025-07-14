import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import { EnrollmentFormData, PersonalInfo, PatientInfo, FamilyMember } from "../types";

interface PersonalInfoStepProps {
  data: EnrollmentFormData;
  onUpdate: (updates: Partial<EnrollmentFormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const RELATIONSHIPS = [
  'spouse', 'parent', 'child', 'sibling', 'grandparent', 
  'grandchild', 'guardian', 'other'
];

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  data,
  onUpdate,
  onNext,
  onPrevious
}) => {
  const [showFamilyMembers, setShowFamilyMembers] = useState(data.familyMembers.length > 0);

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    onUpdate({
      personalInfo: {
        ...data.personalInfo,
        [field]: value
      }
    });
  };

  const updatePatientInfo = (field: keyof PatientInfo, value: string) => {
    onUpdate({
      patientInfo: {
        ...data.patientInfo!,
        [field]: value
      }
    });
  };

  const addFamilyMember = () => {
    const newMember: FamilyMember = {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      relationship: 'spouse'
    };
    onUpdate({
      familyMembers: [...data.familyMembers, newMember]
    });
  };

  const updateFamilyMember = (index: number, field: keyof FamilyMember, value: string) => {
    const updatedMembers = data.familyMembers.map((member, i) => 
      i === index ? { ...member, [field]: value } : member
    );
    onUpdate({ familyMembers: updatedMembers });
  };

  const removeFamilyMember = (index: number) => {
    const updatedMembers = data.familyMembers.filter((_, i) => i !== index);
    onUpdate({ familyMembers: updatedMembers });
  };

  const handleFamilyToggle = (enabled: boolean) => {
    setShowFamilyMembers(enabled);
    if (!enabled) {
      onUpdate({ familyMembers: [] });
    } else {
      addFamilyMember();
    }
  };

  const isValid = () => {
    const personalValid = data.personalInfo.firstName && 
                         data.personalInfo.lastName && 
                         data.personalInfo.email && 
                         data.personalInfo.phone && 
                         data.personalInfo.dateOfBirth;

    if (data.enrollmentType === 'bystander') {
      const patientValid = data.patientInfo?.firstName && 
                          data.patientInfo?.lastName && 
                          data.patientInfo?.dateOfBirth && 
                          data.patientInfo?.relationship;
      return personalValid && patientValid;
    }

    return personalValid;
  };

  // Initialize patient info for bystander enrollment
  React.useEffect(() => {
    if (data.enrollmentType === 'bystander' && !data.patientInfo) {
      onUpdate({
        patientInfo: {
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          relationship: 'child',
          emergencyContact: ''
        }
      });
    }
  }, [data.enrollmentType]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
        <p className="text-muted-foreground">
          {data.enrollmentType === 'self' 
            ? 'Tell us about yourself and your family'
            : 'Tell us about yourself and the person you\'re enrolling'
          }
        </p>
      </div>

      {/* Your Information */}
      <Card>
        <CardHeader>
          <CardTitle>Your Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={data.personalInfo.firstName}
                onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={data.personalInfo.lastName}
                onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={data.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={data.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={data.personalInfo.dateOfBirth}
                onChange={(e) => updatePersonalInfo('dateOfBirth', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient Information for Bystander Enrollment */}
      {data.enrollmentType === 'bystander' && (
        <Card>
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="patientFirstName">Patient's First Name *</Label>
                <Input
                  id="patientFirstName"
                  value={data.patientInfo?.firstName || ''}
                  onChange={(e) => updatePatientInfo('firstName', e.target.value)}
                  placeholder="Enter patient's first name"
                />
              </div>
              <div>
                <Label htmlFor="patientLastName">Patient's Last Name *</Label>
                <Input
                  id="patientLastName"
                  value={data.patientInfo?.lastName || ''}
                  onChange={(e) => updatePatientInfo('lastName', e.target.value)}
                  placeholder="Enter patient's last name"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="patientDob">Patient's Date of Birth *</Label>
                <Input
                  id="patientDob"
                  type="date"
                  value={data.patientInfo?.dateOfBirth || ''}
                  onChange={(e) => updatePatientInfo('dateOfBirth', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="relationship">Your Relationship *</Label>
                <Select 
                  value={data.patientInfo?.relationship || ''} 
                  onValueChange={(value) => updatePatientInfo('relationship', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    {RELATIONSHIPS.map(rel => (
                      <SelectItem key={rel} value={rel}>
                        {rel.charAt(0).toUpperCase() + rel.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="emergencyContact">Emergency Contact (optional)</Label>
              <Input
                id="emergencyContact"
                value={data.patientInfo?.emergencyContact || ''}
                onChange={(e) => updatePatientInfo('emergencyContact', e.target.value)}
                placeholder="Backup emergency contact"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Family Members for Self Enrollment */}
      {data.enrollmentType === 'self' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Family Members
              <div className="flex items-center space-x-2">
                <Label htmlFor="family-toggle" className="text-sm font-normal">
                  Add family members?
                </Label>
                <Switch
                  id="family-toggle"
                  checked={showFamilyMembers}
                  onCheckedChange={handleFamilyToggle}
                />
              </div>
            </CardTitle>
          </CardHeader>
          
          {showFamilyMembers && (
            <CardContent className="space-y-4">
              {data.familyMembers.map((member, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Family Member {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFamilyMember(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>First Name</Label>
                      <Input
                        value={member.firstName}
                        onChange={(e) => updateFamilyMember(index, 'firstName', e.target.value)}
                        placeholder="First name"
                      />
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <Input
                        value={member.lastName}
                        onChange={(e) => updateFamilyMember(index, 'lastName', e.target.value)}
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Date of Birth</Label>
                      <Input
                        type="date"
                        value={member.dateOfBirth}
                        onChange={(e) => updateFamilyMember(index, 'dateOfBirth', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Relationship</Label>
                      <Select 
                        value={member.relationship} 
                        onValueChange={(value) => updateFamilyMember(index, 'relationship', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {RELATIONSHIPS.map(rel => (
                            <SelectItem key={rel} value={rel}>
                              {rel.charAt(0).toUpperCase() + rel.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button 
                type="button" 
                variant="outline" 
                onClick={addFamilyMember}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another Family Member
              </Button>
            </CardContent>
          )}
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrevious}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        
        <Button onClick={onNext} disabled={!isValid()}>
          Next: {data.enrollmentType === 'bystander' ? 'Medical Authority' : 'Plan Selection'}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};