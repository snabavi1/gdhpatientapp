
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Heart, Activity, ArrowRight } from 'lucide-react';

const HealthStatusOverview: React.FC = () => {
  return (
    <Card className="p-6 bg-white border-brand-secondary/20">
      <h3 className="text-xl font-semibold text-brand-teal mb-4">
        Your Health Snapshot
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-brand-teal">All good! Your recent vitals look great</span>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
          <TrendingUp className="h-5 w-5 text-brand-blue" />
          <span className="text-brand-teal">Blood pressure: Excellent trend this month</span>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-brand-light/50 rounded-lg">
          <Activity className="h-5 w-5 text-brand-primary" />
          <span className="text-brand-teal">Activity: You're crushing your goals!</span>
        </div>
      </div>
      
      <Button 
        variant="ghost" 
        className="w-full mt-4 text-brand-blue hover:text-brand-blue/80 hover:bg-brand-light/30"
      >
        View full health summary
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </Card>
  );
};

export default HealthStatusOverview;
