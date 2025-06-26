
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, Trash2 } from 'lucide-react';

export interface FamilyContact {
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

interface ContactCardProps {
  contact: FamilyContact;
  onDelete: (contactId: string) => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({ contact, onDelete }) => {
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
            onClick={() => onDelete(contact.id)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
