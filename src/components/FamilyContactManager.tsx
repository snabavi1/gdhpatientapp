
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { UserPlus } from 'lucide-react';
import { AddContactForm } from './family-contacts/AddContactForm';
import { ContactList } from './family-contacts/ContactList';
import { FamilyContact } from './family-contacts/ContactCard';

const FamilyContactManager = () => {
  const [contacts, setContacts] = useState<FamilyContact[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

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

  const handleContactAdded = () => {
    setShowAddForm(false);
    loadFamilyContacts();
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
          <AddContactForm
            onContactAdded={handleContactAdded}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        <ContactList
          contacts={contacts}
          onDeleteContact={handleDeleteContact}
        />
      </CardContent>
    </Card>
  );
};

export default FamilyContactManager;
