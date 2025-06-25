
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-healthcare-primary rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span className="ml-3 text-xl font-bold">Green Dot Health</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Providing compassionate, convenient healthcare services through innovative 
              technology and personalized care. Your health is our priority.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-healthcare-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-healthcare-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-healthcare-primary transition-colors">Concierge Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-healthcare-primary transition-colors">Video Consultations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-healthcare-primary transition-colors">Prescription Refills</a></li>
              <li><a href="#" className="text-gray-400 hover:text-healthcare-primary transition-colors">Care Coordination</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">24/7 Support Available</li>
              <li><a href="#" className="text-gray-400 hover:text-healthcare-primary transition-colors">help@greendothealth.com</a></li>
              <li><a href="#" className="text-gray-400 hover:text-healthcare-primary transition-colors">1-800-GREENDOT</a></li>
              <li className="text-gray-400">HIPAA Compliant Platform</li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Green Dot Health. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Licensed Healthcare Provider • HIPAA Compliant
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
