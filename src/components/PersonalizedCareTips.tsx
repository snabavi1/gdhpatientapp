
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Thermometer, Sun, Moon, ArrowRight, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PersonalizedCareTipsProps {
  firstName?: string;
}

const PersonalizedCareTips: React.FC<PersonalizedCareTipsProps> = ({ 
  firstName = "there" 
}) => {
  const { toast } = useToast();

  const handleReadMessage = (title: string) => {
    toast({
      title: "Opening Message",
      description: `Reading: ${title}`,
    });
  };

  return (
    <Card className="p-6 bg-white border-brand-secondary/20">
      <h3 className="text-xl font-semibold text-brand-teal mb-4">
        Personal care tips just for you, {firstName}
      </h3>
      
      <div className="space-y-4">
        {/* Recent message from doctor */}
        <div className="p-4 bg-brand-light/30 rounded-lg border-l-4 border-brand-primary">
          <div className="flex items-start gap-3">
            <Thermometer className="h-5 w-5 text-brand-primary mt-1" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-brand-teal">From Dr. Martinez</span>
                <span className="text-xs text-brand-teal/60 bg-white px-2 py-1 rounded-full">Today</span>
              </div>
              <p className="text-brand-teal/80 text-sm mb-2">
                "It's flu season in Georgia! Here's how to stay..."
              </p>
              <Button 
                variant="link" 
                size="sm" 
                className="text-brand-blue p-0 h-auto"
                onClick={() => handleReadMessage("Flu season prevention tips")}
              >
                [Read full message]
              </Button>
            </div>
          </div>
        </div>

        {/* Health tip for area */}
        <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
          <div className="flex items-start gap-3">
            <Sun className="h-5 w-5 text-yellow-500 mt-1" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-brand-teal">Health tip for your area</span>
                <span className="text-xs text-brand-teal/60 bg-white px-2 py-1 rounded-full">2 days ago</span>
              </div>
              <p className="text-brand-teal/80 text-sm mb-2">
                "With Atlanta's heat this week, remember to..."
              </p>
              <Button 
                variant="link" 
                size="sm" 
                className="text-brand-blue p-0 h-auto"
                onClick={() => handleReadMessage("Summer heat safety tips")}
              >
                [View summer care tips]
              </Button>
            </div>
          </div>
        </div>

        {/* Weekly wellness focus */}
        <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-brand-blue">
          <div className="flex items-start gap-3">
            <Moon className="h-5 w-5 text-brand-blue mt-1" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-brand-teal">Weekly wellness focus</span>
              </div>
              <p className="text-brand-teal/80 text-sm mb-2">
                "The importance of quality sleep for your health"
              </p>
              <Button 
                variant="link" 
                size="sm" 
                className="text-brand-blue p-0 h-auto"
                onClick={() => handleReadMessage("Better sleep habits guide")}
              >
                [Learn about better sleep habits]
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Button 
        variant="ghost" 
        className="w-full mt-4 text-brand-blue hover:text-brand-blue/80 hover:bg-brand-light/30"
        onClick={() => handleReadMessage("All personalized care messages")}
      >
        See all your personalized care messages
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </Card>
  );
};

export default PersonalizedCareTips;
