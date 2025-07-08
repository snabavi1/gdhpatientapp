
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, Heart, Clock } from "lucide-react";

const WelcomeHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-mint-50 via-white to-peach-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            <span className="text-healthcare-primary">Skip the Waiting Room.</span>{" "}
            <span className="block md:inline">Get Expert Care Wherever you Are.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in">
            Our ER Doctors can not only conduct virtual visits but arrange labs, imaging 
            and care coordination—all at a fraction of the cost of an ER visit.
          </p>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto mb-12 animate-fade-in">
            <p className="text-gray-700 mb-4 font-medium">
              <span className="text-healthcare-primary">Most people don't get to choose who takes care of them.</span> 
              <br />With Green Dot Health, you do.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <span>• Weird rash at 2am?</span>
              <span>• Worried about your parent's symptoms?</span>
              <span>• Need a prescription but can't leave work?</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-scale-in">
            <Button 
              size="lg" 
              className="bg-healthcare-primary hover:bg-healthcare-primary/90 text-white px-8 py-3 text-lg hover-lift"
            >
              Join Green Dot Health
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-healthcare-primary text-healthcare-primary hover:bg-healthcare-primary hover:text-white px-8 py-3 text-lg hover-lift"
            >
              See How It Works
            </Button>
          </div>

          {/* Value Propositions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-mint-200 hover-lift">
              <Clock className="h-12 w-12 text-healthcare-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Skip the Waiting Room</h3>
              <p className="text-gray-600">Get care in minutes, not hours. Perfect for busy professionals who can't afford to wait.</p>
            </Card>
            
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-mint-200 hover-lift">
              <Heart className="h-12 w-12 text-peach-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fraction of ER Costs</h3>
              <p className="text-gray-600">Save hundreds compared to urgent care or ER visits. HSA/FSA eligible for maximum savings.</p>
            </Card>
            
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-mint-200 hover-lift">
              <Shield className="h-12 w-12 text-healthcare-ocean mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Your Doctor</h3>
              <p className="text-gray-600">Build relationships with board-certified ER doctors who know you and your family.</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeHero;
