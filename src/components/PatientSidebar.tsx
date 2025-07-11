import React from 'react';
import { 
  Home, 
  Activity, 
  Calendar, 
  FileText, 
  MessageSquare, 
  Users 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PatientSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  hasActiveVisit?: boolean;
}

const PatientSidebar: React.FC<PatientSidebarProps> = ({ 
  activeSection, 
  onSectionChange,
  hasActiveVisit = false 
}) => {
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      alwaysVisible: true
    },
    {
      id: 'care-status',
      label: 'Care Status',
      icon: Activity,
      alwaysVisible: false,
      requiresActiveVisit: true
    },
    {
      id: 'appointments',
      label: 'Appointments',
      icon: Calendar,
      alwaysVisible: true
    },
    {
      id: 'medical-records',
      label: 'Medical Records',
      icon: FileText,
      alwaysVisible: true
    },
    {
      id: 'updates',
      label: 'Green Dot Post Updates',
      icon: MessageSquare,
      alwaysVisible: true
    },
    {
      id: 'support-network',
      label: 'Your Support Network',
      icon: Users,
      alwaysVisible: true
    }
  ];

  const visibleItems = navigationItems.filter(item => 
    item.alwaysVisible || (item.requiresActiveVisit && hasActiveVisit)
  );

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-brand-teal mb-6">Your Health Hub</h2>
        <nav className="space-y-2">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors",
                  isActive 
                    ? "bg-brand-light text-brand-primary font-medium" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-brand-primary"
                )}
              >
                <Icon className="h-5 w-5 mr-3" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default PatientSidebar;