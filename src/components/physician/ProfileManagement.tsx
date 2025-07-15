import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Phone, Mail, User, Shield, Calendar, Trash2, Edit3, Save, X, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProfileData {
  full_name: string;
  email: string;
  phone_number: string;
  medical_license_number: string;
  specialty: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  emergency_contact_relationship: string;
}

interface StateLicense {
  id: string;
  state_code: string;
  state_name: string;
  license_number: string;
  expiration_date: string;
  issue_date: string | null;
  license_status: string;
}

// US States data for dropdown
const US_STATES = [
  { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' }, { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' }, { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' }, { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' }, { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' }, { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' }, { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' }, { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' }, { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' }, { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' }, { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' }, { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' }, { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' }, { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' }, { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' }, { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' }, { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' }
];

interface ValidationErrors {
  [key: string]: string;
}

interface ProfileManagementProps {
  darkMode: boolean;
}

const ProfileManagement: React.FC<ProfileManagementProps> = ({ darkMode }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profileData, setProfileData] = useState<ProfileData>({
    full_name: '',
    email: '',
    phone_number: '',
    medical_license_number: '',
    specialty: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    emergency_contact_relationship: ''
  });
  const [stateLicenses, setStateLicenses] = useState<StateLicense[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [newLicense, setNewLicense] = useState({
    state_code: '',
    state_name: '',
    license_number: '',
    expiration_date: '',
    issue_date: ''
  });
  const [showAddLicense, setShowAddLicense] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfileData();
      fetchStateLicenses();
    }
  }, [user]);

  const fetchProfileData = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;

      if (data) {
        setProfileData({
          full_name: data.full_name || '',
          email: data.email || '',
          phone_number: data.phone_number || '',
          medical_license_number: data.medical_license_number || '',
          specialty: data.specialty || '',
          emergency_contact_name: data.emergency_contact_name || '',
          emergency_contact_phone: data.emergency_contact_phone || '',
          emergency_contact_relationship: data.emergency_contact_relationship || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStateLicenses = async () => {
    try {
      const { data, error } = await supabase
        .from('physician_state_licenses')
        .select('*')
        .eq('physician_id', user?.id)
        .order('expiration_date', { ascending: true });

      if (error) throw error;

      setStateLicenses(data || []);
    } catch (error) {
      console.error('Error fetching state licenses:', error);
    }
  };

  const validateProfileData = (): boolean => {
    const errors: ValidationErrors = {};
    
    if (!profileData.full_name.trim()) {
      errors.full_name = 'Full name is required';
    }
    
    if (!profileData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!profileData.phone_number.trim()) {
      errors.phone_number = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(profileData.phone_number)) {
      errors.phone_number = 'Please enter a valid phone number';
    }
    
    if (!profileData.specialty.trim()) {
      errors.specialty = 'Specialty is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProfileUpdate = async () => {
    if (!validateProfileData()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before saving",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user?.id);

      if (error) throw error;

      setIsEditing(false);
      setValidationErrors({});
      toast({
        title: "Success",
        description: "Profile updated successfully",
        duration: 3000
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleStateChange = (stateCode: string) => {
    const selectedState = US_STATES.find(state => state.code === stateCode);
    setNewLicense({
      ...newLicense,
      state_code: stateCode,
      state_name: selectedState?.name || ''
    });
  };

  const validateLicense = (): boolean => {
    if (!newLicense.state_code || !newLicense.license_number || !newLicense.expiration_date) {
      return false;
    }
    
    const expirationDate = new Date(newLicense.expiration_date);
    const today = new Date();
    
    if (expirationDate <= today) {
      toast({
        title: "Validation Error",
        description: "Expiration date must be in the future",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handleAddLicense = async () => {
    if (!validateLicense()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields with valid data",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase.rpc('add_physician_state_license', {
        p_physician_id: user?.id,
        p_state_code: newLicense.state_code,
        p_state_name: newLicense.state_name,
        p_license_number: newLicense.license_number,
        p_expiration_date: newLicense.expiration_date,
        p_issue_date: newLicense.issue_date || null
      });

      if (error) throw error;

      setNewLicense({
        state_code: '',
        state_name: '',
        license_number: '',
        expiration_date: '',
        issue_date: ''
      });
      setShowAddLicense(false);

      fetchStateLicenses();
      toast({
        title: "Success",
        description: "State license added successfully",
        duration: 3000
      });
    } catch (error) {
      console.error('Error adding license:', error);
      toast({
        title: "Error",
        description: "Failed to add state license",
        variant: "destructive"
      });
    }
  };

  const isLicenseExpiringSoon = (expirationDate: string): boolean => {
    const expDate = new Date(expirationDate);
    const today = new Date();
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 90 && diffDays > 0; // Within 90 days
  };

  const isLicenseExpired = (expirationDate: string): boolean => {
    const expDate = new Date(expirationDate);
    const today = new Date();
    return expDate < today;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className={`text-lg ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 py-10 space-y-8 max-w-5xl mx-auto">
      {/* Enhanced Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className={`text-4xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Profile Management
            </h1>
            <p className={`text-lg ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Manage your professional information and medical credentials
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-emerald-500" />
            <span className={`text-sm font-medium ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
              Verified Physician
            </span>
          </div>
        </div>
        
        {/* Profile completion indicator */}
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${Object.values(profileData).filter(value => value && value.trim()).length / Object.keys(profileData).length * 100}%` 
            }}
          ></div>
        </div>
        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          Profile {Math.round(Object.values(profileData).filter(value => value && value.trim()).length / Object.keys(profileData).length * 100)}% complete
        </p>
      </div>

      {/* Personal Information */}
      <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-200'} shadow-lg`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl">Personal Information</span>
                <p className={`text-sm font-normal ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Your basic professional details
                </p>
              </div>
            </CardTitle>
            <Button
              variant={isEditing ? "destructive" : "outline"}
              onClick={() => {
                if (isEditing) {
                  setIsEditing(false);
                  setValidationErrors({});
                } else {
                  setIsEditing(true);
                }
              }}
              className="flex items-center space-x-2"
            >
              {isEditing ? (
                <>
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-4 h-4" />
                  <span>Edit</span>
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="full_name" className="text-sm font-medium">
                Full Name *
              </Label>
              <Input
                id="full_name"
                value={profileData.full_name}
                onChange={(e) => {
                  setProfileData({...profileData, full_name: e.target.value});
                  if (validationErrors.full_name) {
                    setValidationErrors({...validationErrors, full_name: ''});
                  }
                }}
                disabled={!isEditing}
                className={validationErrors.full_name ? 'border-red-500' : ''}
              />
              {validationErrors.full_name && (
                <p className="text-sm text-red-500 flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{validationErrors.full_name}</span>
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => {
                  setProfileData({...profileData, email: e.target.value});
                  if (validationErrors.email) {
                    setValidationErrors({...validationErrors, email: ''});
                  }
                }}
                disabled={!isEditing}
                className={validationErrors.email ? 'border-red-500' : ''}
              />
              {validationErrors.email && (
                <p className="text-sm text-red-500 flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{validationErrors.email}</span>
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone_number" className="text-sm font-medium">
                Phone Number *
              </Label>
              <Input
                id="phone_number"
                value={profileData.phone_number}
                onChange={(e) => {
                  setProfileData({...profileData, phone_number: e.target.value});
                  if (validationErrors.phone_number) {
                    setValidationErrors({...validationErrors, phone_number: ''});
                  }
                }}
                disabled={!isEditing}
                placeholder="+1 (555) 123-4567"
                className={validationErrors.phone_number ? 'border-red-500' : ''}
              />
              {validationErrors.phone_number && (
                <p className="text-sm text-red-500 flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{validationErrors.phone_number}</span>
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialty" className="text-sm font-medium">
                Medical Specialty *
              </Label>
              <Input
                id="specialty"
                value={profileData.specialty}
                onChange={(e) => {
                  setProfileData({...profileData, specialty: e.target.value});
                  if (validationErrors.specialty) {
                    setValidationErrors({...validationErrors, specialty: ''});
                  }
                }}
                disabled={!isEditing}
                placeholder="e.g., Emergency Medicine, Internal Medicine"
                className={validationErrors.specialty ? 'border-red-500' : ''}
              />
              {validationErrors.specialty && (
                <p className="text-sm text-red-500 flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{validationErrors.specialty}</span>
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="medical_license_number" className="text-sm font-medium">
              Primary Medical License Number
            </Label>
            <Input
              id="medical_license_number"
              value={profileData.medical_license_number}
              onChange={(e) => setProfileData({...profileData, medical_license_number: e.target.value})}
              disabled={!isEditing}
              placeholder="Enter your primary license number"
            />
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h4 className="font-semibold text-lg flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Emergency Contact Information</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="emergency_contact_name" className="text-sm font-medium">
                  Contact Name
                </Label>
                <Input
                  id="emergency_contact_name"
                  value={profileData.emergency_contact_name}
                  onChange={(e) => setProfileData({...profileData, emergency_contact_name: e.target.value})}
                  disabled={!isEditing}
                  placeholder="Full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergency_contact_phone" className="text-sm font-medium">
                  Contact Phone
                </Label>
                <Input
                  id="emergency_contact_phone"
                  value={profileData.emergency_contact_phone}
                  onChange={(e) => setProfileData({...profileData, emergency_contact_phone: e.target.value})}
                  disabled={!isEditing}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergency_contact_relationship" className="text-sm font-medium">
                  Relationship
                </Label>
                <Input
                  id="emergency_contact_relationship"
                  value={profileData.emergency_contact_relationship}
                  onChange={(e) => setProfileData({...profileData, emergency_contact_relationship: e.target.value})}
                  disabled={!isEditing}
                  placeholder="e.g., Spouse, Parent"
                />
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex space-x-4 pt-6">
              <Button 
                onClick={handleProfileUpdate} 
                disabled={saving}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* State Licenses */}
      <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-200'} shadow-lg`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl">Medical Licenses</span>
                <p className={`text-sm font-normal ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  State medical licenses and certifications
                </p>
              </div>
            </CardTitle>
            <Button
              onClick={() => setShowAddLicense(!showAddLicense)}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add License</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {stateLicenses.length === 0 ? (
            <div className={`text-center py-12 rounded-lg border-2 border-dashed ${
              darkMode ? 'border-gray-600 bg-gray-700/50' : 'border-slate-300 bg-slate-50'
            }`}>
              <Shield className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-gray-500' : 'text-slate-400'}`} />
              <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                No licenses added yet
              </h3>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'} mb-4`}>
                Add your state medical licenses to complete your profile
              </p>
              <Button onClick={() => setShowAddLicense(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First License
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {stateLicenses.map((license) => {
                const isExpired = isLicenseExpired(license.expiration_date);
                const isExpiringSoon = isLicenseExpiringSoon(license.expiration_date);
                
                return (
                  <div 
                    key={license.id} 
                    className={`p-6 rounded-lg border-l-4 ${
                      isExpired 
                        ? 'border-l-red-500 bg-red-50 dark:bg-red-900/20' 
                        : isExpiringSoon 
                        ? 'border-l-amber-500 bg-amber-50 dark:bg-amber-900/20'
                        : 'border-l-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                    } ${darkMode ? 'bg-gray-700' : 'bg-white'} border border-opacity-20`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                            {license.state_name}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {license.state_code}
                          </Badge>
                        </div>
                        <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                          <span className="font-medium">License #:</span> {license.license_number}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          {license.issue_date && (
                            <span className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                              Issued: {new Date(license.issue_date).toLocaleDateString()}
                            </span>
                          )}
                          <span className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            Expires: {new Date(license.expiration_date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge 
                          variant={
                            isExpired ? 'destructive' : 
                            isExpiringSoon ? 'secondary' : 
                            'default'
                          }
                          className="mb-2"
                        >
                          {isExpired ? 'Expired' : isExpiringSoon ? 'Expiring Soon' : 'Active'}
                        </Badge>
                        {(isExpired || isExpiringSoon) && (
                          <Button size="sm" variant="outline">
                            Renew License
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Add License Form */}
          {showAddLicense && (
            <>
              <Separator className="my-6" />
              <div className="space-y-6">
                <h4 className="font-semibold text-lg">Add New State License</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="state_select" className="text-sm font-medium">
                      State *
                    </Label>
                    <Select
                      value={newLicense.state_code}
                      onValueChange={handleStateChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a state" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {US_STATES.map((state) => (
                          <SelectItem key={state.code} value={state.code}>
                            {state.name} ({state.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="license_number" className="text-sm font-medium">
                      License Number *
                    </Label>
                    <Input
                      id="license_number"
                      value={newLicense.license_number}
                      onChange={(e) => setNewLicense({...newLicense, license_number: e.target.value})}
                      placeholder="Enter license number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="issue_date" className="text-sm font-medium">
                      Issue Date
                    </Label>
                    <Input
                      id="issue_date"
                      type="date"
                      value={newLicense.issue_date}
                      onChange={(e) => setNewLicense({...newLicense, issue_date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiration_date" className="text-sm font-medium">
                      Expiration Date *
                    </Label>
                    <Input
                      id="expiration_date"
                      type="date"
                      value={newLicense.expiration_date}
                      onChange={(e) => setNewLicense({...newLicense, expiration_date: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Button onClick={handleAddLicense} className="flex-1">
                    <Plus className="w-4 h-4 mr-2" />
                    Add License
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowAddLicense(false);
                      setNewLicense({
                        state_code: '',
                        state_name: '',
                        license_number: '',
                        expiration_date: '',
                        issue_date: ''
                      });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileManagement;