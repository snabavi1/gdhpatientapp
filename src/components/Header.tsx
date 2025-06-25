
import { Button } from "@/components/ui/button";
import { UserCircle, Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-mint-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-healthcare-primary rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">
                Green Dot Health
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-healthcare-primary transition-colors duration-200">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-healthcare-primary transition-colors duration-200">
              Services
            </a>
            <a href="#" className="text-gray-700 hover:text-healthcare-primary transition-colors duration-200">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-healthcare-primary transition-colors duration-200">
              Contact
            </a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-healthcare-primary text-healthcare-primary hover:bg-healthcare-primary hover:text-white">
              Sign In
            </Button>
            <Button className="bg-healthcare-primary hover:bg-healthcare-primary/90">
              Sign Up
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
