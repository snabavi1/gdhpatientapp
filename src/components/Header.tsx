import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";
import MobileNavigation from "./MobileNavigation";
import ProfileDropdown from "./ProfileDropdown";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignIn = () => {
    navigate('/auth');
  };

  const handleSignUp = () => {
    navigate('/signup'); // Route to enhanced signup
  };

  // Only enable logo navigation on patient-facing routes (not physician routes)
  const isPatientRoute = !location.pathname.startsWith('/physician');
  
  const handleLogoClick = () => {
    if (!isPatientRoute) return; // Disable on physician routes
    
    if (location.pathname !== '/') {
      // Navigate to dashboard if not already there
      navigate('/');
    } else {
      // Already on dashboard, scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-mint-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div 
              className={`flex-shrink-0 flex items-center ${isPatientRoute ? 'cursor-pointer' : 'cursor-default'}`}
              onClick={handleLogoClick}
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

          {/* User Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {user ? (
              <>
                <ProfileDropdown />
              </>
            ) : (
              <>
                {/* Only show patient auth buttons on patient routes */}
                {isPatientRoute && (
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
                      onClick={handleSignUp}
                    >
                      Sign Up
                    </Button>
                    
                    {/* Mobile user button */}
                    <Button variant="ghost" size="icon" className="sm:hidden" onClick={handleSignIn}>
                      <UserCircle className="h-5 w-5" />
                    </Button>
                  </>
                )}
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