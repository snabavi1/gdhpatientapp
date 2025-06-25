
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, Heart, Clock } from "lucide-react";

const WelcomeHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-mint-50 via-white to-peach-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Welcome to{" "}
            <span className="text-healthcare-primary">Green Dot Health</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in">
            Your trusted healthcare partner providing convenient, compassionate care 
            when you need it most. Experience the future of healthcare with our 
            comprehensive digital health platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-scale-in">
            <Button 
              size="lg" 
              className="bg-healthcare-primary hover:bg-healthcare-primary/90 text-white px-8 py-3 text-lg hover-lift"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-healthcare-primary text-healthcare-primary hover:bg-healthcare-primary hover:text-white px-8 py-3 text-lg hover-lift"
            >
              Learn More
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-mint-200 hover-lift">
              <Shield className="h-12 w-12 text-healthcare-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">HIPAA Compliant</h3>
              <p className="text-gray-600">Your health information is protected with enterprise-grade security</p>
            </Card>
            
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-mint-200 hover-lift">
              <Heart className="h-12 w-12 text-peach-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Compassionate Care</h3>
              <p className="text-gray-600">Experienced healthcare professionals dedicated to your wellbeing</p>
            </Card>
            
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-mint-200 hover-lift">
              <Clock className="h-12 w-12 text-healthcare-ocean mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Available</h3>
              <p className="text-gray-600">Access care whenever you need it, day or night</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeHero;
