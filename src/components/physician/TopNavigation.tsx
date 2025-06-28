
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, User, Sun, Moon, Clock, Users, ArrowLeft } from 'lucide-react';

interface TopNavigationProps {
  physicianName: string;
  currentTime: Date;
  darkMode: boolean;
  showNotifications: boolean;
  untriagedPatients: number;
  notificationCount: number;
  activeView: 'welcome' | 'tracking';
  onToggleDarkMode: () => void;
  onToggleNotifications: () => void;
  onBackToDashboard: () => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({
  physicianName,
  currentTime,
  darkMode,
  showNotifications,
  untriagedPatients,
  notificationCount,
  activeView,
  onToggleDarkMode,
  onToggleNotifications,
  onBackToDashboard
}) => {
  return (
    <div className={`sticky top-0 z-50 border-b transition-all duration-300 backdrop-blur-sm ${
      darkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-slate-200'
    }`}>
      <div className="px-8 py-5">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            {activeView === 'tracking' && (
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
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <div className="w-5 h-5 bg-white rounded-full"></div>
            </div>
            <div>
              <h1 className={`text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Green Dot Health
              </h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                Emergency Medicine Portal
              </p>
            </div>
          </div>

          {/* Center Stats */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-emerald-600" />
              </div>
              <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {physicianName}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>Untriaged</span>
                <div className={`text-sm font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {untriagedPatients}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>Time</span>
                <div className={`text-sm font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleNotifications}
              className="relative hover:bg-slate-100 transition-colors duration-200"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-orange-500 text-white text-xs animate-pulse">
                  {notificationCount}
                </Badge>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleDarkMode}
              className="hover:bg-slate-100 transition-colors duration-200"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
