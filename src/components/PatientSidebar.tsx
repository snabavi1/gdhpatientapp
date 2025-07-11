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
import GreenDotLogo from './GreenDotLogo';

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
      "bg-sidebar border-sidebar-border border-r h-full transition-all duration-300 ease-in-out flex flex-col backdrop-blur-sm",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header with toggle */}
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        {!isCollapsed ? (
          <div className="flex items-center gap-2 animate-fade-in">
            <GreenDotLogo size="sm" />
            <h2 className="text-lg font-semibold text-sidebar-foreground">Your Health Hub</h2>
          </div>
        ) : (
          <GreenDotLogo size="sm" className="mx-auto" />
        )}
        {!isCollapsed && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="p-1 h-8 w-8 hover:bg-sidebar-accent text-sidebar-foreground button-press"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        {isCollapsed && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="absolute -right-3 top-4 p-1 h-6 w-6 bg-sidebar border border-sidebar-border hover:bg-sidebar-accent text-sidebar-foreground button-press rounded-full shadow-md"
          >
            <ChevronRight className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <nav className="space-y-1">
          {visibleItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full flex items-center px-3 py-3 text-left rounded-lg transition-all duration-200 group animate-fade-in",
                  isActive 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isCollapsed && "justify-center"
                )}
                style={{ animationDelay: `${index * 0.05}s` }}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className={cn(
                  "h-5 w-5 transition-colors duration-200",
                  isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground group-hover:text-sidebar-accent-foreground",
                  !isCollapsed && "mr-3"
                )} />
                {!isCollapsed && (
                  <span className="text-sm font-medium transition-all duration-200">{item.label}</span>
                )}
                {isActive && !isCollapsed && (
                  <div className="ml-auto">
                    <GreenDotLogo size="sm" className="opacity-60" />
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default PatientSidebar;