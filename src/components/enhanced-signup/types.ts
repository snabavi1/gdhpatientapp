// Enrollment Types
export type EnrollmentType = 'self' | 'bystander';
export type PlanType = 'individual' | 'premium' | 'family' | 'student-safe' | 'senior-safe' | 'green-dot-individual';
export type AuthorityType = 'power-of-attorney' | 'guardian' | 'healthcare-proxy' | 'parent-guardian' | 'other';
export type ConsentType = 'hipaa' | 'consent-to-treat' | 'telemedicine' | 'minor-consent' | 'medical-release' | 'emergency-contact';

export type EnrollmentStep = 
  | 'enrollment-type'
  | 'personal-info'
  | 'medical-authority'
  | 'plan-selection'
  | 'consent'
  | 'insurance-payment'
  | 'confirmation';

// Data Interfaces
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
}

export interface PatientInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  relationship: string;
  emergencyContact?: string;
}

export interface FamilyMember {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  relationship: string;
}

export interface MedicalAuthority {
  authorityType: AuthorityType;
  description?: string;
  documents: File[];
  verificationNotes?: string;
}

export interface PlanDetails {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  ageRange?: string;
  category: 'self' | 'bystander';
}

export interface ConsentItem {
  type: ConsentType;
  title: string;
  description: string;
  fullText: string;
  required: boolean;
  agreed: boolean;
  signatureName?: string;
  signatureDate?: string;
  witnessInfo?: {
    name: string;
    signature: string;
    date: string;
  };
}

export interface InsuranceInfo {
  hasInsurance: boolean;
  primaryInsurance?: {
    companyName: string;
    policyNumber: string;
    groupNumber?: string;
    policyHolderName: string;
    policyHolderDob?: string;
    relationshipToPatient: string;
    cardImages: File[];
  };
  secondaryInsurance?: {
    companyName: string;
    policyNumber: string;
    groupNumber?: string;
    policyHolderName: string;
    policyHolderDob?: string;
    relationshipToPatient: string;
    cardImages: File[];
  };
}

export interface PaymentMethod {
  type: 'credit-card' | 'bank-account' | 'hsa-fsa' | 'paypal';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  accountNumber?: string;
  routingNumber?: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface EnrollmentFormData {
  enrollmentType: EnrollmentType;
  personalInfo: PersonalInfo;
  patientInfo: PatientInfo | null;
  familyMembers: FamilyMember[];
  medicalAuthority: MedicalAuthority | null;
  selectedPlan: PlanDetails | null;
  consents: ConsentItem[];
  insuranceInfo: InsuranceInfo | null;
  paymentMethod: PaymentMethod | null;
}

// Plan Data
export const SELF_ENROLLMENT_PLANS: PlanDetails[] = [
  {
    id: 'individual',
    name: 'Individual Plan',
    description: 'Perfect for individuals seeking comprehensive virtual emergency care',
    price: 89,
    features: [
      '24/7 Virtual Emergency Room',
      'Prescription Management',
      'Care Coordination',
      'Mental Health Support'
    ],
    category: 'self'
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    description: 'Enhanced coverage with additional wellness features',
    price: 149,
    features: [
      'Everything in Individual Plan',
      'Preventive Care Guidance',
      'Chronic Condition Management',
      'Priority Support',
      'Wellness Coaching'
    ],
    category: 'self'
  },
  {
    id: 'family',
    name: 'Family Plan',
    description: 'Comprehensive coverage for your entire family',
    price: 249,
    features: [
      'Coverage for up to 6 family members',
      'Pediatric Emergency Care',
      'Family Health Coordination',
      'All Premium Plan features'
    ],
    category: 'self'
  }
];

export const BYSTANDER_ENROLLMENT_PLANS: PlanDetails[] = [
  {
    id: 'student-safe',
    name: 'Student Safe Start',
    description: 'Specialized care for college students and young adults',
    price: 89,
    features: [
      '24/7 Virtual ER Access',
      'Mental Health Support',
      'Prescription Management',
      'Campus Health Coordination'
    ],
    ageRange: 'Ages 18-26, Full-time Students',
    category: 'bystander'
  },
  {
    id: 'senior-safe',
    name: 'Senior Safe Start',
    description: 'Specialized care for seniors with comprehensive support',
    price: 149,
    features: [
      'Chronic Condition Management',
      'Medication Reconciliation',
      'Fall Prevention Support',
      '24/7 Emergency Access'
    ],
    ageRange: 'Ages 65+',
    category: 'bystander'
  },
  {
    id: 'green-dot-individual',
    name: 'Green Dot Individual',
    description: 'Comprehensive virtual emergency care for all ages',
    price: 119,
    features: [
      'Full Virtual ER Services',
      'Care Coordination',
      'Family Communication',
      'Emergency Response'
    ],
    ageRange: 'All Ages',
    category: 'bystander'
  }
];

// Consent Templates
export const CONSENT_TEMPLATES: { [key in ConsentType]: Omit<ConsentItem, 'agreed' | 'signatureName' | 'signatureDate'> } = {
  'hipaa': {
    type: 'hipaa',
    title: 'HIPAA Privacy Authorization',
    description: 'Authorization for use and disclosure of health information',
    fullText: 'I authorize Green Dot Health to use and disclose my health information for treatment, payment, and healthcare operations as outlined in the HIPAA Privacy Notice.',
    required: true
  },
  'consent-to-treat': {
    type: 'consent-to-treat',
    title: 'Consent to Medical Treatment',
    description: 'Consent for medical evaluation and treatment',
    fullText: 'I consent to medical evaluation, treatment, and care by Green Dot Health physicians and healthcare providers.',
    required: true
  },
  'telemedicine': {
    type: 'telemedicine',
    title: 'Telemedicine Consent',
    description: 'Understanding and consent for telemedicine services',
    fullText: 'I understand the benefits and limitations of telemedicine services and consent to receive care through virtual consultations.',
    required: true
  },
  'minor-consent': {
    type: 'minor-consent',
    title: 'Consent to Treat Minor',
    description: 'Parental/guardian consent for minor patient care',
    fullText: 'As the parent/legal guardian, I consent to medical treatment of the minor patient named in this enrollment.',
    required: true
  },
  'medical-release': {
    type: 'medical-release',
    title: 'Medical Information Release',
    description: 'Authorization to coordinate care with other providers',
    fullText: 'I authorize Green Dot Health to coordinate care with the patient\'s other healthcare providers and release necessary medical information.',
    required: true
  },
  'emergency-contact': {
    type: 'emergency-contact',
    title: 'Emergency Contact Authorization',
    description: 'Emergency contact protocols and communication preferences',
    fullText: 'I acknowledge the emergency contact protocols and authorize Green Dot Health to contact designated emergency contacts when necessary.',
    required: true
  }
};

// Helper Functions
export const getRequiredConsents = (enrollmentType: EnrollmentType, hasMinors: boolean, isBystander: boolean): ConsentType[] => {
  const base: ConsentType[] = ['hipaa', 'consent-to-treat', 'telemedicine', 'emergency-contact'];
  
  if (hasMinors) {
    base.push('minor-consent');
  }
  
  if (isBystander) {
    base.push('medical-release');
  }
  
  return base;
};