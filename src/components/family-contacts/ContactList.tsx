
import React from 'react';
import { UserPlus } from 'lucide-react';
import { ContactCard, FamilyContact } from './ContactCard';

interface ContactListProps {
  contacts: FamilyContact[];
  onDeleteContact: (contactId: string) => void;
}

export const ContactList: React.FC<ContactListProps> = ({ contacts, onDeleteContact }) => {
  if (contacts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <UserPlus className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No family contacts added yet</p>
        <p className="text-sm">Add a family member or caregiver who can call on your behalf</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onDelete={onDeleteContact}
        />
      ))}
    </div>
  );
};
