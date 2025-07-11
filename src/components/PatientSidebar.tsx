import React from 'react';
import { 
  Home, 
  Activity, 
  Calendar, 
  FileText, 
  MessageSquare, 
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface PatientSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  hasActiveVisit?: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const PatientSidebar: React.FC<PatientSidebarProps> = ({ 
  activeSection, 
  onSectionChange,
  hasActiveVisit = false,
  isCollapsed,
  onToggleCollapse
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
      alwaysVisible: true,
      requiresActiveVisit: false
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
    <div className={cn(
      "bg-white border-r border-gray-200 h-full transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header with toggle */}
      <div className="p-4 flex items-center justify-between border-b">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold text-brand-teal">Your Health Hub</h2>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="p-1 h-8 w-8"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
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
                    : "text-gray-600 hover:bg-gray-50 hover:text-brand-primary",
                  isCollapsed && "justify-center"
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
                {!isCollapsed && <span className="text-sm">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default PatientSidebar;