import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { User, LogOut, Settings, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface SimplifiedTopNavigationProps {
  physicianName: string;
  darkMode: boolean;
  activeView: 'welcome' | 'tracking' | 'profile';
  onBackToDashboard: () => void;
}

const SimplifiedTopNavigation: React.FC<SimplifiedTopNavigationProps> = ({
  physicianName,
  darkMode,
  activeView,
  onBackToDashboard
}) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/physician/auth';
  };

  const handleProfileClick = () => {
    navigate('/physician/profile');
  };

  return (
    <div className={`sticky top-0 z-50 border-b transition-all duration-300 backdrop-blur-sm ${
      darkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-slate-200'
    }`}>
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Back Button */}
          <div className="flex items-center space-x-4">
            {(activeView === 'tracking' || activeView === 'profile') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBackToDashboard}
                className="mr-3 hover:bg-slate-100 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            )}
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/92af9136-a76a-4635-a03c-4f8172481747.png" 
                alt="Green Dot Health Logo" 
                className="w-10 h-10"
              />
              <h1 className={`text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Green Dot Health
              </h1>
            </div>
          </div>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-3 hover:bg-slate-100 px-4 py-2">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-emerald-600" />
                </div>
                <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {physicianName}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem disabled className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {physicianName}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfileClick} className="flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                View & Edit Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600 flex items-center">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default SimplifiedTopNavigation;