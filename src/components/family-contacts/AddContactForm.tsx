
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface AddContactFormProps {
  onContactAdded: () => void;
  onCancel: () => void;
}

export const AddContactForm: React.FC<AddContactFormProps> = ({ onContactAdded, onCancel }) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
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

      // Reset form
      setNewContact({
        full_name: '',
        relationship: '',
        phone_number: '',
        email: '',
        may_call: false,
        may_receive_updates: false
      });

      onContactAdded();
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

  return (
    <Card className="border-dashed">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
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
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
