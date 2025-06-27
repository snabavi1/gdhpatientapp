
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import FamilyContactManager from './FamilyContactManager';

const FamilyContactsSection: React.FC = () => {
  const [showFamilyContacts, setShowFamilyContacts] = useState(false);

  return (
    <Card className="p-6 bg-white border-brand-secondary/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-brand-teal">Your support network</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFamilyContacts(!showFamilyContacts)}
          className="border-brand-secondary text-brand-primary hover:bg-brand-light"
        >
          <Users className="h-4 w-4 mr-2" />
          {showFamilyContacts ? 'Hide' : 'Manage'} Family Contacts
        </Button>
      </div>
      
      {!showFamilyContacts && (
        <div className="text-sm text-brand-teal/70">
          <p className="mb-2">👨‍👩‍👧‍👦 Family contacts who can help coordinate your care:</p>
          <p>• Mike (Husband) - Can call, receives updates</p>
          <p>• Emma (Daughter) - Can call</p>
        </div>
      )}
      
      {showFamilyContacts && <FamilyContactManager />}
    </Card>
  );
};

export default FamilyContactsSection;
