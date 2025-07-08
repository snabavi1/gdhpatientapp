
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
              Board-certified ER doctors in your pocket. Get expert emergency care 
              without the wait, cost, or stress of traditional urgent care visits.
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
            <h3 className="text-lg font-semibold mb-4">Expert Care</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-healthcare-primary transition-colors">Instant Consultations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-healthcare-primary transition-colors">Prescriptions & Refills</a></li>
              <li><a href="#" className="text-gray-400 hover:text-healthcare-primary transition-colors">Lab & Imaging Orders</a></li>
              <li><a href="#" className="text-gray-400 hover:text-healthcare-primary transition-colors">Care Coordination</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get Started</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Board-Certified ER Doctors</li>
              <li><a href="#" className="text-gray-400 hover:text-healthcare-primary transition-colors">Call or Text Anytime</a></li>
              <li><a href="#" className="text-gray-400 hover:text-healthcare-primary transition-colors">HSA/FSA Eligible</a></li>
              <li className="text-gray-400">Fraction of ER Costs</li>
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
