import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronLeft, ChevronRight, Upload, CreditCard, Shield } from "lucide-react";
import { EnrollmentFormData, InsuranceInfo, PaymentMethod } from "../types";

interface InsurancePaymentStepProps {
  data: EnrollmentFormData;
  onUpdate: (updates: Partial<EnrollmentFormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  isInsuranceOnly?: boolean;
}

export const InsurancePaymentStep: React.FC<InsurancePaymentStepProps> = ({
  data,
  onUpdate,
  onNext,
  onPrevious,
  isInsuranceOnly = false
}) => {
  const [hasInsurance, setHasInsurance] = useState(data.insuranceInfo?.hasInsurance ?? false);
  const [paymentType, setPaymentType] = useState<PaymentMethod['type']>('credit-card');

  const insuranceInfo = data.insuranceInfo || {
    hasInsurance: false,
    primaryInsurance: undefined,
    secondaryInsurance: undefined
  };

  const paymentMethod = data.paymentMethod || {
    type: 'credit-card' as PaymentMethod['type'],
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    }
  };

  const updateInsurance = (updates: Partial<InsuranceInfo>) => {
    onUpdate({
      insuranceInfo: {
        ...insuranceInfo,
        ...updates
      }
    });
  };

  const updatePayment = (updates: Partial<PaymentMethod>) => {
    onUpdate({
      paymentMethod: {
        ...paymentMethod,
        ...updates
      }
    });
  };

  const handleInsuranceToggle = (checked: boolean) => {
    setHasInsurance(checked);
    updateInsurance({ hasInsurance: checked });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, insuranceType: 'primary' | 'secondary') => {
    const files = Array.from(event.target.files || []);
    if (insuranceType === 'primary') {
      updateInsurance({
        primaryInsurance: {
          ...insuranceInfo.primaryInsurance!,
          cardImages: files
        }
      });
    }
  };

  const isValid = () => {
    const hasValidPayment = paymentMethod.billingAddress.street && 
                           paymentMethod.billingAddress.city && 
                           paymentMethod.billingAddress.state && 
                           paymentMethod.billingAddress.zipCode;

    if (paymentType === 'credit-card') {
      return hasValidPayment && paymentMethod.cardNumber && paymentMethod.expiryDate && paymentMethod.cvv;
    }

    return hasValidPayment;
  };

  // Initialize primary insurance if user has insurance
  React.useEffect(() => {
    if (hasInsurance && !insuranceInfo.primaryInsurance) {
      updateInsurance({
        primaryInsurance: {
          companyName: '',
          policyNumber: '',
          groupNumber: '',
          policyHolderName: '',
          policyHolderDob: '',
          relationshipToPatient: 'self',
          cardImages: []
        }
      });
    }
  }, [hasInsurance]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CreditCard className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Insurance & Payment</h2>
        <p className="text-muted-foreground">
          Set up your insurance information and payment method
        </p>
      </div>

      {/* Insurance Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Insurance Information
            <div className="flex items-center space-x-2">
              <Label htmlFor="insurance-toggle" className="text-sm font-normal">
                I have insurance
              </Label>
              <Switch
                id="insurance-toggle"
                checked={hasInsurance}
                onCheckedChange={handleInsuranceToggle}
              />
            </div>
          </CardTitle>
        </CardHeader>

        {hasInsurance && (
          <CardContent className="space-y-6">
            {/* Primary Insurance */}
            <div className="space-y-4">
              <h3 className="font-medium">Primary Insurance</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="insurance-company">Insurance Company *</Label>
                  <Input
                    id="insurance-company"
                    value={insuranceInfo.primaryInsurance?.companyName || ''}
                    onChange={(e) => updateInsurance({
                      primaryInsurance: {
                        ...insuranceInfo.primaryInsurance!,
                        companyName: e.target.value
                      }
                    })}
                    placeholder="e.g., Blue Cross Blue Shield"
                  />
                </div>
                <div>
                  <Label htmlFor="policy-number">Policy Number *</Label>
                  <Input
                    id="policy-number"
                    value={insuranceInfo.primaryInsurance?.policyNumber || ''}
                    onChange={(e) => updateInsurance({
                      primaryInsurance: {
                        ...insuranceInfo.primaryInsurance!,
                        policyNumber: e.target.value
                      }
                    })}
                    placeholder="Policy number"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="group-number">Group Number</Label>
                  <Input
                    id="group-number"
                    value={insuranceInfo.primaryInsurance?.groupNumber || ''}
                    onChange={(e) => updateInsurance({
                      primaryInsurance: {
                        ...insuranceInfo.primaryInsurance!,
                        groupNumber: e.target.value
                      }
                    })}
                    placeholder="Group number (if applicable)"
                  />
                </div>
                <div>
                  <Label htmlFor="policy-holder">Policy Holder Name *</Label>
                  <Input
                    id="policy-holder"
                    value={insuranceInfo.primaryInsurance?.policyHolderName || ''}
                    onChange={(e) => updateInsurance({
                      primaryInsurance: {
                        ...insuranceInfo.primaryInsurance!,
                        policyHolderName: e.target.value
                      }
                    })}
                    placeholder="Policy holder's full name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="relationship">Relationship to Patient *</Label>
                  <Select 
                    value={insuranceInfo.primaryInsurance?.relationshipToPatient || 'self'}
                    onValueChange={(value) => updateInsurance({
                      primaryInsurance: {
                        ...insuranceInfo.primaryInsurance!,
                        relationshipToPatient: value
                      }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="self">Self</SelectItem>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="policy-holder-dob">Policy Holder DOB</Label>
                  <Input
                    id="policy-holder-dob"
                    type="date"
                    value={insuranceInfo.primaryInsurance?.policyHolderDob || ''}
                    onChange={(e) => updateInsurance({
                      primaryInsurance: {
                        ...insuranceInfo.primaryInsurance!,
                        policyHolderDob: e.target.value
                      }
                    })}
                  />
                </div>
              </div>

              {/* Insurance Card Upload */}
              <div className="border-dashed border-2 border-muted-foreground/25 rounded-lg p-4">
                <div className="text-center space-y-2">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="font-medium">Upload Insurance Card</p>
                  <p className="text-sm text-muted-foreground">
                    Upload front and back of your insurance card (JPG, PNG)
                  </p>
                  <Label htmlFor="insurance-card" className="cursor-pointer">
                    <Button variant="outline" size="sm">
                      Choose Files
                    </Button>
                    <input
                      id="insurance-card"
                      type="file"
                      multiple
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e, 'primary')}
                      className="hidden"
                    />
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base font-medium">Payment Type</Label>
            <RadioGroup
              value={paymentType}
              onValueChange={(value) => {
                setPaymentType(value as PaymentMethod['type']);
                updatePayment({ type: value as PaymentMethod['type'] });
              }}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credit-card" id="credit-card" />
                <Label htmlFor="credit-card">Credit/Debit Card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bank-account" id="bank-account" />
                <Label htmlFor="bank-account">Bank Account (ACH)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hsa-fsa" id="hsa-fsa" />
                <Label htmlFor="hsa-fsa">HSA/FSA Card</Label>
              </div>
            </RadioGroup>
          </div>

          {paymentType === 'credit-card' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="card-number">Card Number *</Label>
                <Input
                  id="card-number"
                  value={paymentMethod.cardNumber || ''}
                  onChange={(e) => updatePayment({ cardNumber: e.target.value })}
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry Date *</Label>
                  <Input
                    id="expiry"
                    value={paymentMethod.expiryDate || ''}
                    onChange={(e) => updatePayment({ expiryDate: e.target.value })}
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV *</Label>
                  <Input
                    id="cvv"
                    value={paymentMethod.cvv || ''}
                    onChange={(e) => updatePayment({ cvv: e.target.value })}
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Billing Address */}
          <div className="space-y-4">
            <h3 className="font-medium">Billing Address</h3>
            <div>
              <Label htmlFor="street">Street Address *</Label>
              <Input
                id="street"
                value={paymentMethod.billingAddress.street}
                onChange={(e) => updatePayment({
                  billingAddress: { ...paymentMethod.billingAddress, street: e.target.value }
                })}
                placeholder="123 Main Street"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={paymentMethod.billingAddress.city}
                  onChange={(e) => updatePayment({
                    billingAddress: { ...paymentMethod.billingAddress, city: e.target.value }
                  })}
                  placeholder="City"
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={paymentMethod.billingAddress.state}
                  onChange={(e) => updatePayment({
                    billingAddress: { ...paymentMethod.billingAddress, state: e.target.value }
                  })}
                  placeholder="State"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="zip">ZIP Code *</Label>
                <Input
                  id="zip"
                  value={paymentMethod.billingAddress.zipCode}
                  onChange={(e) => updatePayment({
                    billingAddress: { ...paymentMethod.billingAddress, zipCode: e.target.value }
                  })}
                  placeholder="12345"
                />
              </div>
            </div>
          </div>

          {/* Billing Authorization */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 mb-1">Billing Authorization</p>
                <p className="text-blue-700">
                  I authorize Green Dot Health to charge my selected payment method for monthly membership fees 
                  ({data.selectedPlan?.name} - ${data.selectedPlan?.price}/month) and any applicable co-pays or 
                  deductibles not covered by insurance.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrevious}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        
        <Button onClick={onNext} disabled={!isValid()}>
          Next: Review & Complete
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};