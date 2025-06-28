
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertTriangle } from 'lucide-react';

interface WaitTimeProps {
  arrivalTimestamp: string;
  isTriageSection: boolean;
  isConciergeSection: boolean;
  darkMode: boolean;
}

const WaitTime: React.FC<WaitTimeProps> = ({ 
  arrivalTimestamp, 
  isTriageSection, 
  isConciergeSection, 
  darkMode 
}) => {
  const waitMins = (Date.now() - new Date(arrivalTimestamp).getTime()) / 60000;
  const waitHours = waitMins / 60;
  const isUrgentWait = isTriageSection && waitMins >= 7;
  const isOverdueMessage = isConciergeSection && waitHours >= 24;

  const getWaitTime = () => {
    if (isConciergeSection) {
      if (waitHours >= 24) {
        const days = Math.floor(waitHours / 24);
        const hours = Math.floor(waitHours % 24);
        return days > 0 ? `${days}d ${hours}h` : `${Math.floor(waitHours)}h`;
      }
      return `${Math.floor(waitHours)}h`;
    }
    
    if (waitMins >= 60) {
      const hours = Math.floor(waitMins / 60);
      const mins = Math.floor(waitMins % 60);
      return `${hours}h ${mins}m`;
    }
    return `${Math.floor(waitMins)}m`;
  };

  const getWaitTimeColor = () => {
    if (isTriageSection) {
      if (waitMins >= 7) return 'text-red-600 font-bold animate-pulse';
      if (waitMins >= 5) return 'text-orange-600 font-semibold';
      if (waitMins >= 3) return 'text-yellow-600 font-medium';
      return 'text-green-600 font-medium';
    }
    if (isConciergeSection) {
      if (waitHours >= 24) return 'text-red-600 font-bold';
      if (waitHours >= 18) return 'text-orange-600 font-semibold';
      return darkMode ? 'text-slate-400' : 'text-slate-600';
    }
    return darkMode ? 'text-slate-400' : 'text-slate-600';
  };

  return (
    <div className="col-span-6 lg:col-span-1 text-center min-w-0">
      <Badge 
        variant="outline" 
        className={`${getWaitTimeColor()} border-current text-xs px-2 py-1 font-semibold bg-white/80 whitespace-nowrap`}
      >
        <Clock className="w-3 h-3 mr-1" />
        {getWaitTime()}
      </Badge>
      {(isUrgentWait || isOverdueMessage) && (
        <div className="text-xs text-red-600 font-semibold mt-1 flex items-center justify-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          <span>Alert</span>
        </div>
      )}
    </div>
  );
};

export default WaitTime;
