
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";
import MobileNavigation from "./MobileNavigation";
import ProfileDropdown from "./ProfileDropdown";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  console.log('🚀 Header component rendered'); // Step 2: Verify component rendering
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignIn = () => {
    navigate('/auth');
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    console.log('🔥 CLICK DETECTED!'); // Step 1: Verify click handler
    alert('Click working!'); // Step 1: Immediate feedback
    
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Logo clicked, current location:', location.pathname);
    console.log('About to navigate to /');
    
    // Always navigate to home, regardless of current location
    navigate('/');
    
    console.log('Navigate function called');
  };

  return (
    <header className="bg-white shadow-sm border-b border-mint-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer" 
              onClick={handleLogoClick}
              style={{ 
                pointerEvents: 'auto', 
                zIndex: 1000,
                position: 'relative',
                backgroundColor: 'rgba(255,0,0,0.1)' // Temporary visual indicator
              }}
            >
              <div className="green-dot-logo green-dot-sm">
                <div className="green-dot-rings">
                  <div className="green-dot-center"></div>
                </div>
              </div>
              <span className="ml-3 text-xl font-bold text-foreground">
                Green Dot Health
              </span>
            </div>
          </div>

          {/* Desktop Navigation - Removed as requested */}

          {/* User Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {user ? (
              <>
                <ProfileDropdown />
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="hidden sm:inline-flex border-healthcare-primary text-healthcare-primary hover:bg-healthcare-primary hover:text-white"
                  onClick={handleSignIn}
                >
                  Sign In
                </Button>
                <Button 
                  className="hidden sm:inline-flex bg-healthcare-primary hover:bg-healthcare-primary/90"
                  onClick={handleSignIn}
                >
                  Sign Up
                </Button>
                
                {/* Mobile user button */}
                <Button variant="ghost" size="icon" className="sm:hidden" onClick={handleSignIn}>
                  <UserCircle className="h-5 w-5" />
                </Button>
              </>
            )}
            
            {/* Mobile Navigation - Only show if authenticated */}
            {user && <MobileNavigation />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
