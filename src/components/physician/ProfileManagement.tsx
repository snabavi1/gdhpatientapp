import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Plus, Phone, Mail, User, Shield, Calendar, Trash2 } from 'lucide-react';
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
  const [newLicense, setNewLicense] = useState({
    state_code: '',
    state_name: '',
    license_number: '',
    expiration_date: '',
    issue_date: ''
  });

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

  const handleProfileUpdate = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user?.id);

      if (error) throw error;

      setIsEditing(false);
      toast({
        title: "Success",
        description: "Profile updated successfully"
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    }
  };

  const handleAddLicense = async () => {
    if (!newLicense.state_code || !newLicense.license_number || !newLicense.expiration_date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
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

      fetchStateLicenses();
      toast({
        title: "Success",
        description: "State license added successfully"
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

  if (loading) {
    return <div className="p-8">Loading profile...</div>;
  }

  return (
    <div className="px-8 py-10 space-y-8 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Profile Management
        </h1>
        <p className={`text-lg ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          Manage your professional information and credentials
        </p>
      </div>

      {/* Personal Information */}
      <Card className={`${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Personal Information</span>
            </CardTitle>
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={profileData.full_name}
                onChange={(e) => setProfileData({...profileData, full_name: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                value={profileData.phone_number}
                onChange={(e) => setProfileData({...profileData, phone_number: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="specialty">Specialty</Label>
              <Input
                id="specialty"
                value={profileData.specialty}
                onChange={(e) => setProfileData({...profileData, specialty: e.target.value})}
                disabled={!isEditing}
              />
            </div>
          </div>

          <Separator />

          <h4 className="font-semibold">Emergency Contact</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="emergency_contact_name">Name</Label>
              <Input
                id="emergency_contact_name"
                value={profileData.emergency_contact_name}
                onChange={(e) => setProfileData({...profileData, emergency_contact_name: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="emergency_contact_phone">Phone</Label>
              <Input
                id="emergency_contact_phone"
                value={profileData.emergency_contact_phone}
                onChange={(e) => setProfileData({...profileData, emergency_contact_phone: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="emergency_contact_relationship">Relationship</Label>
              <Input
                id="emergency_contact_relationship"
                value={profileData.emergency_contact_relationship}
                onChange={(e) => setProfileData({...profileData, emergency_contact_relationship: e.target.value})}
                disabled={!isEditing}
              />
            </div>
          </div>

          {isEditing && (
            <Button onClick={handleProfileUpdate} className="w-full">
              Save Changes
            </Button>
          )}
        </CardContent>
      </Card>

      {/* State Licenses */}
      <Card className={`${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Medical Licenses</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {stateLicenses.map((license) => (
            <div key={license.id} className={`p-4 rounded-lg border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {license.state_name} ({license.state_code})
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    License: {license.license_number}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Expires: {new Date(license.expiration_date).toLocaleDateString()}
                  </p>
                </div>
                <Badge variant={license.license_status === 'active' ? 'default' : 'secondary'}>
                  {license.license_status}
                </Badge>
              </div>
            </div>
          ))}

          <Separator />

          <h4 className="font-semibold">Add New State License</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="state_code">State Code</Label>
              <Input
                id="state_code"
                placeholder="CA"
                value={newLicense.state_code}
                onChange={(e) => setNewLicense({...newLicense, state_code: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="state_name">State Name</Label>
              <Input
                id="state_name"
                placeholder="California"
                value={newLicense.state_name}
                onChange={(e) => setNewLicense({...newLicense, state_name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="license_number">License Number</Label>
              <Input
                id="license_number"
                value={newLicense.license_number}
                onChange={(e) => setNewLicense({...newLicense, license_number: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="expiration_date">Expiration Date</Label>
              <Input
                id="expiration_date"
                type="date"
                value={newLicense.expiration_date}
                onChange={(e) => setNewLicense({...newLicense, expiration_date: e.target.value})}
              />
            </div>
          </div>
          <Button onClick={handleAddLicense} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add License
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileManagement;