import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { UserPlus, Phone, Mail, Trash2 } from 'lucide-react';

interface FamilyContact {
  id: string;
  full_name: string;
  relationship: string;
  phone_number: string;
  email?: string;
  permissions: {
    may_call: boolean;
    may_receive_updates: boolean;
  };
  verification_status: string;
}

const FamilyContactManager = () => {
  const [contacts, setContacts] = useState<FamilyContact[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const [newContact, setNewContact] = useState({
    full_name: '',
    relationship: '',
    phone_number: '',
    email: '',
    may_call: false,
    may_receive_updates: false
  });

  useEffect(() => {
    if (user) {
      loadFamilyContacts();
    }
  }, [user]);

  const loadFamilyContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('family_contacts')
        .select('*')
        .eq('profile_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our FamilyContact interface
      const transformedContacts: FamilyContact[] = (data || []).map(contact => ({
        ...contact,
        permissions: typeof contact.permissions === 'string' 
          ? JSON.parse(contact.permissions)
          : contact.permissions || { may_call: false, may_receive_updates: false }
      }));
      
      setContacts(transformedContacts);
    } catch (error) {
      console.error('Error loading family contacts:', error);
      toast({
        title: "Error",
        description: "Failed to load family contacts",
        variant: "destructive",
      });
    }
  };

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('family_contacts')
        .insert({
          profile_id: user?.id,
          full_name: newContact.full_name,
          relationship: newContact.relationship,
          phone_number: newContact.phone_number,
          email: newContact.email || null,
          permissions: {
            may_call: newContact.may_call,
            may_receive_updates: newContact.may_receive_updates
          },
          verification_status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Family contact added successfully",
      });

      // Reset form and reload contacts
      setNewContact({
        full_name: '',
        relationship: '',
        phone_number: '',
        email: '',
        may_call: false,
        may_receive_updates: false
      });
      setShowAddForm(false);
      loadFamilyContacts();
    } catch (error) {
      console.error('Error adding family contact:', error);
      toast({
        title: "Error",
        description: "Failed to add family contact",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContact = async (contactId: string) => {
    try {
      const { error } = await supabase
        .from('family_contacts')
        .delete()
        .eq('id', contactId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Family contact removed",
      });

      loadFamilyContacts();
    } catch (error) {
      console.error('Error deleting family contact:', error);
      toast({
        title: "Error",
        description: "Failed to remove family contact",
        variant: "destructive",
      });
    }
  };

  const getPermissionBadges = (permissions: FamilyContact['permissions']) => {
    const badges = [];
    if (permissions.may_call) {
      badges.push(<Badge key="call" variant="secondary" className="text-xs">May Call</Badge>);
    }
    if (permissions.may_receive_updates) {
      badges.push(<Badge key="updates" variant="outline" className="text-xs">Receives Updates</Badge>);
    }
    return badges;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Family & Authorized Contacts
          </CardTitle>
          <Button 
            onClick={() => setShowAddForm(!showAddForm)}
            size="sm"
            variant="outline"
          >
            {showAddForm ? 'Cancel' : 'Add Contact'}
          </Button>
        </div>
        <p className="text-sm text-gray-600">
          Add family members or caregivers who can call on your behalf
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {showAddForm && (
          <Card className="border-dashed">
            <CardContent className="pt-6">
              <form onSubmit={handleAddContact} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input
                      id="full_name"
                      value={newContact.full_name}
                      onChange={(e) => setNewContact({...newContact, full_name: e.target.value})}
                      required
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="relationship">Relationship *</Label>
                    <Select 
                      value={newContact.relationship} 
                      onValueChange={(value) => setNewContact({...newContact, relationship: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spouse">Spouse</SelectItem>
                        <SelectItem value="child">Child</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="sibling">Sibling</SelectItem>
                        <SelectItem value="caregiver">Caregiver</SelectItem>
                        <SelectItem value="friend">Friend</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone_number">Phone Number *</Label>
                    <Input
                      id="phone_number"  
                      type="tel"
                      value={newContact.phone_number}
                      onChange={(e) => setNewContact({...newContact, phone_number: e.target.value})}
                      required
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email (optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newContact.email}
                      onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Permissions</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="may_call"
                        checked={newContact.may_call}
                        onCheckedChange={(checked) => 
                          setNewContact({...newContact, may_call: checked as boolean})
                        }
                      />
                      <Label htmlFor="may_call" className="text-sm">
                        May call on my behalf
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="may_receive_updates"
                        checked={newContact.may_receive_updates}
                        onCheckedChange={(checked) => 
                          setNewContact({...newContact, may_receive_updates: checked as boolean})
                        }
                      />
                      <Label htmlFor="may_receive_updates" className="text-sm">
                        May receive updates about my care
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="bg-healthcare-primary hover:bg-healthcare-primary/90"
                  >
                    Add Contact
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {contacts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <UserPlus className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No family contacts added yet</p>
            <p className="text-sm">Add a family member or caregiver who can call on your behalf</p>
          </div>
        ) : (
          <div className="space-y-3">
            {contacts.map((contact) => (
              <Card key={contact.id} className="border-l-4 border-l-healthcare-primary">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{contact.full_name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {contact.relationship}
                        </Badge>
                        {contact.verification_status === 'verified' && (
                          <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                            Verified
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          <span>{contact.phone_number}</span>
                        </div>
                        {contact.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            <span>{contact.email}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-1">
                        {getPermissionBadges(contact.permissions)}
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteContact(contact.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FamilyContactManager;
