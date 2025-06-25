
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Heart, FileText, Calendar, Bell, Clock } from 'lucide-react';

interface MobileNavigationProps {
  currentPage?: string;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ currentPage = 'home' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Dashboard', icon: Heart, path: '/' },
    { id: 'appointments', label: 'Appointments', icon: Calendar, path: '/appointments' },
    { id: 'concierge', label: 'Concierge', icon: FileText, path: '/concierge' },
    { id: 'care', label: 'Care Status', icon: Clock, path: '/care' },
    { id: 'notifications', label: 'Notifications', icon: Bell, path: '/notifications' }
  ];

  return (
    <>
      {/* Mobile Navigation Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 bg-white">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-healthcare-primary rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span className="text-lg font-bold text-gray-900">
                Green Dot Health
              </span>
            </div>
          </div>

          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start h-12 ${
                    isActive 
                      ? 'bg-healthcare-primary text-white' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <IconComponent className="h-5 w-5 mr-3" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="p-4 bg-mint-50 rounded-lg border border-mint-200">
              <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
              <p className="text-sm text-gray-600 mb-3">
                Contact our support team for assistance
              </p>
              <Button size="sm" className="w-full">
                Contact Support
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
        <div className="grid grid-cols-4 gap-1 px-2 py-2">
          {navigationItems.slice(0, 4).map((item) => {
            const IconComponent = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center p-2 h-14 ${
                  isActive ? 'text-healthcare-primary' : 'text-gray-500'
                }`}
              >
                <IconComponent className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;
