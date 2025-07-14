import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import { EnrollmentFormData, PersonalInfo, PatientInfo, FamilyMember, EmergencyContact } from "../types";

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

  const updateEmergencyContact = (updates: Partial<EmergencyContact>) => {
    const currentEmergencyContact = data.patientInfo?.emergencyContact || {
      isSelf: false,
      name: '',
      relationship: '',
      phone: ''
    };

    const updatedEmergencyContact = {
      ...currentEmergencyContact,
      ...updates
    };

    // If "I am the emergency contact" is checked, populate with personal info
    if (updates.isSelf) {
      updatedEmergencyContact.name = `${data.personalInfo.firstName} ${data.personalInfo.lastName}`;
      updatedEmergencyContact.phone = data.personalInfo.phone;
      updatedEmergencyContact.relationship = data.patientInfo?.relationship || '';
    }

    onUpdate({
      patientInfo: {
        ...data.patientInfo!,
        emergencyContact: updatedEmergencyContact
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

    if (data.enrollmentType === 'Care Family') {
      const patientValid = data.patientInfo?.firstName && 
                          data.patientInfo?.lastName && 
                          data.patientInfo?.dateOfBirth && 
                          data.patientInfo?.relationship;
      
      // Emergency contact validation
      const emergencyContactValid = data.patientInfo?.emergencyContact && 
        (data.patientInfo.emergencyContact.isSelf || 
         (data.patientInfo.emergencyContact.name && 
          data.patientInfo.emergencyContact.relationship && 
          data.patientInfo.emergencyContact.phone));

      return personalValid && patientValid && emergencyContactValid;
    }

    return personalValid;
  };

  // Initialize patient info for Care Family enrollment
  React.useEffect(() => {
    if (data.enrollmentType === 'Care Family' && !data.patientInfo) {
      onUpdate({
        patientInfo: {
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          relationship: 'child',
          emergencyContact: {
            isSelf: false,
            name: '',
            relationship: '',
            phone: ''
          }
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

      {/* Patient Information for Care Family Enrollment */}
      {data.enrollmentType === 'Care Family' && (
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

            {/* Emergency Contact Section */}
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Emergency Contact *</h4>
              
              {/* Self as Emergency Contact Checkbox */}
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id="selfEmergencyContact"
                  checked={data.patientInfo?.emergencyContact?.isSelf || false}
                  onCheckedChange={(checked) => updateEmergencyContact({ isSelf: !!checked })}
                />
                <Label htmlFor="selfEmergencyContact" className="cursor-pointer">
                  I am the emergency contact
                </Label>
              </div>

              {/* Emergency Contact Details - Only show if not self */}
              {!data.patientInfo?.emergencyContact?.isSelf && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="emergencyContactName">Emergency Contact Name *</Label>
                    <Input
                      id="emergencyContactName"
                      value={data.patientInfo?.emergencyContact?.name || ''}
                      onChange={(e) => updateEmergencyContact({ name: e.target.value })}
                      placeholder="Full name of emergency contact"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="emergencyContactRelationship">Relationship to Patient *</Label>
                      <Select 
                        value={data.patientInfo?.emergencyContact?.relationship || ''} 
                        onValueChange={(value) => updateEmergencyContact({ relationship: value })}
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
                    <div>
                      <Label htmlFor="emergencyContactPhone">Phone Number *</Label>
                      <Input
                        id="emergencyContactPhone"
                        type="tel"
                        value={data.patientInfo?.emergencyContact?.phone || ''}
                        onChange={(e) => updateEmergencyContact({ phone: e.target.value })}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Show confirmation when self is selected */}
              {data.patientInfo?.emergencyContact?.isSelf && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-green-800">
                    ✓ You will be listed as the emergency contact: {data.personalInfo.firstName} {data.personalInfo.lastName} - {data.personalInfo.phone}
                  </p>
                </div>
              )}
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
          Next: {data.enrollmentType === 'Care Family' ? 'Medical Authority' : 'Plan Selection'}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};