
import { Button } from "@/components/ui/button";
import { UserCircle, LogOut } from "lucide-react";
import MobileNavigation from "./MobileNavigation";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
  };

  const handleSignIn = () => {
    navigate('/auth');
  };

  return (
    <header className="bg-white shadow-sm border-b border-mint-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
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
                <div className="hidden sm:flex items-center space-x-3">
                  <span className="text-sm text-gray-600">
                    Welcome, {user.user_metadata?.full_name || user.email}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleSignOut}
                    className="border-healthcare-primary text-healthcare-primary hover:bg-healthcare-primary hover:text-white"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
                
                {/* Mobile user button */}
                <Button variant="ghost" size="icon" className="sm:hidden" onClick={handleSignOut}>
                  <LogOut className="h-5 w-5" />
                </Button>
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
