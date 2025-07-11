
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Heart, Activity, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import GreenDotLogo from './GreenDotLogo';

const HealthStatusOverview: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="p-6 bg-white border-brand-secondary/20 shadow-sm hover:shadow-md transition-shadow duration-200 relative overflow-hidden">
      {/* Brand decoration */}
      <div className="absolute top-2 right-2 opacity-5">
        <GreenDotLogo size="lg" />
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <GreenDotLogo size="sm" />
          <h3 className="text-xl font-semibold text-foreground">
            Your Health at a Glance
          </h3>
        </div>
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
        <div className="flex items-center gap-3 p-4 bg-healthcare-calm rounded-xl border border-brand-secondary/20">
          <GreenDotLogo size="sm" />
          <span className="text-foreground font-medium">All systems looking great!</span>
        </div>
        
        <div className="flex items-center gap-3 p-4 brand-blue-gradient rounded-xl border-0 text-white">
          <TrendingUp className="h-5 w-5" />
          <span>Blood pressure: Excellent trend this month</span>
        </div>
        
        <div className="flex items-center gap-3 p-4 brand-peach-gradient rounded-xl border-0 text-white">
          <Activity className="h-5 w-5" />
          <span>Activity: You're crushing your goals! 🎯</span>
        </div>
      </div>
      
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-brand-light space-y-3 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 brand-purple-gradient rounded-xl border-0 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-4 w-4" />
                <span className="font-medium">Heart Rate</span>
              </div>
              <p className="text-2xl font-bold">72 BPM</p>
              <p className="text-sm opacity-80">Normal range</p>
            </div>
            <div className="p-4 bg-healthcare-warm rounded-xl border border-brand-secondary/20">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-foreground" />
                <span className="font-medium text-foreground">Steps Today</span>
              </div>
              <p className="text-2xl font-bold text-foreground">8,247</p>
              <p className="text-sm text-muted-foreground">Goal: 8,000</p>
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
