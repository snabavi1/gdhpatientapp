
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Heart, Activity, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

const HealthStatusOverview: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="p-6 bg-white border-brand-secondary/20 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-brand-teal">
          Your Health at a Glance
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-brand-blue hover:text-brand-blue/80"
        >
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-brand-teal font-medium">All systems looking great!</span>
        </div>
        
        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <TrendingUp className="h-5 w-5 text-brand-blue" />
          <span className="text-brand-teal">Blood pressure: Excellent trend this month</span>
        </div>
        
        <div className="flex items-center gap-3 p-4 bg-brand-light/50 rounded-xl border border-brand-secondary/20">
          <Activity className="h-5 w-5 text-brand-primary" />
          <span className="text-brand-teal">Activity: You're crushing your goals! 🎯</span>
        </div>
      </div>
      
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-brand-light space-y-3 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-brand-teal">Heart Rate</span>
              </div>
              <p className="text-2xl font-bold text-brand-teal">72 BPM</p>
              <p className="text-sm text-brand-teal/60">Normal range</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-orange-600" />
                <span className="font-medium text-brand-teal">Steps Today</span>
              </div>
              <p className="text-2xl font-bold text-brand-teal">8,247</p>
              <p className="text-sm text-brand-teal/60">Goal: 8,000</p>
            </div>
          </div>
        </div>
      )}
      
      <Button 
        variant="ghost" 
        className="w-full mt-6 text-brand-blue hover:text-brand-blue/80 hover:bg-brand-light/30 rounded-xl py-3"
      >
        View complete health dashboard
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </Card>
  );
};

export default HealthStatusOverview;
